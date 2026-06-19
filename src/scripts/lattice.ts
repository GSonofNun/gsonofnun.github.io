/**
 * "Structure" — the hero's animated architectural lattice.
 *
 * A space-frame of precise lines and nodes on a tilted plane, its surface
 * displaced by a smooth evolving field, drifting with restraint and parallaxing
 * to the cursor. It reads as engineering, not decoration.
 *
 * Discipline applied (mirrors the work it showcases):
 *  - Hot path is zero-allocation: topology + base coordinates are precomputed,
 *    the per-frame loop writes vertex positions in place into a pooled
 *    Float32Array. No object/array allocation inside tick().
 *  - Two draw calls total (LineSegments + Points), both sharing one position
 *    buffer via an index buffer.
 *  - Rendering pauses when the hero is offscreen or the tab is hidden.
 *  - DPR is capped; the renderer is disposed cleanly on teardown.
 *
 * This module is only ever dynamically imported (so three.js stays in its own
 * lazy chunk) and only when motion is allowed and the device can carry it.
 */
import {
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  Fog,
  LineBasicMaterial,
  LineSegments,
  Points,
  PointsMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

export interface LatticeHandle {
  dispose(): void;
}

const COLS = 24;
const ROWS = 14;
const SPAN_X = 48;
const SPAN_Y = 30;

/** A soft round dot, so nodes read as points of light rather than square sprites. */
function makeDotTexture(): CanvasTexture {
  const s = 64;
  const cv = document.createElement('canvas');
  cv.width = cv.height = s;
  const ctx = cv.getContext('2d')!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.45, 'rgba(255,255,255,0.85)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new CanvasTexture(cv);
  return tex;
}

export function initLattice(mount: HTMLElement): LatticeHandle {
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setClearColor(0x000000, 0);
  const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
  renderer.setPixelRatio(dpr);

  const canvas = renderer.domElement;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  mount.appendChild(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(42, 1, 0.1, 200);
  camera.position.set(0, 0, 38);
  camera.lookAt(0, 0, 0);

  // ---- theme colours (read from CSS, kept in sync) ----------------------
  const lineColor = new Color();
  const nodeColor = new Color();
  const fogColor = new Color();
  function readTheme() {
    const cs = getComputedStyle(document.documentElement);
    lineColor.set(cs.getPropertyValue('--accent').trim() || '#93b6d6');
    nodeColor.set(cs.getPropertyValue('--ink').trim() || '#ece7dc');
    fogColor.set(cs.getPropertyValue('--bg').trim() || '#14130f');
  }
  readTheme();
  scene.fog = new Fog(fogColor.getHex(), 34, 96);

  // ---- geometry: precomputed topology + base coordinates ----------------
  const count = COLS * ROWS;
  const positions = new Float32Array(count * 3);
  const baseX = new Float32Array(count);
  const baseY = new Float32Array(count);

  for (let j = 0; j < ROWS; j++) {
    for (let i = 0; i < COLS; i++) {
      const idx = j * COLS + i;
      const x = (i / (COLS - 1) - 0.5) * SPAN_X;
      const y = (j / (ROWS - 1) - 0.5) * SPAN_Y;
      baseX[idx] = x;
      baseY[idx] = y;
      positions[idx * 3] = x;
      positions[idx * 3 + 1] = y;
      positions[idx * 3 + 2] = 0;
    }
  }

  // index buffer — line pairs: right, down, sparse diagonal brace
  const indices: number[] = [];
  for (let j = 0; j < ROWS; j++) {
    for (let i = 0; i < COLS; i++) {
      const a = j * COLS + i;
      if (i + 1 < COLS) indices.push(a, a + 1);
      if (j + 1 < ROWS) indices.push(a, a + COLS);
      if (i + 1 < COLS && j + 1 < ROWS && (i + j) % 3 === 0)
        indices.push(a, a + COLS + 1);
    }
  }

  const posAttr = new BufferAttribute(positions, 3);
  posAttr.setUsage(0x88e8); // DYNAMIC_DRAW

  const lineGeo = new BufferGeometry();
  lineGeo.setAttribute('position', posAttr);
  lineGeo.setIndex(indices);

  const lineMat = new LineBasicMaterial({
    color: lineColor,
    transparent: true,
    opacity: 0.62,
  });
  const lines = new LineSegments(lineGeo, lineMat);
  scene.add(lines);

  // points share the SAME position buffer (no duplication)
  const dotTex = makeDotTexture();
  const pointGeo = new BufferGeometry();
  pointGeo.setAttribute('position', posAttr);
  const pointMat = new PointsMaterial({
    color: nodeColor,
    map: dotTex,
    size: 1.05,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
  });
  const nodes = new Points(pointGeo, pointMat);
  scene.add(nodes);

  // ---- interaction state (scalars only; no per-frame allocation) --------
  let pointerX = 0;
  let pointerY = 0;
  let targetRotX = 0.34;
  let targetRotY = 0;
  let rotX = 0.34;
  let rotY = 0;
  let scrollFade = 1;

  function onPointer(e: PointerEvent) {
    pointerX = (e.clientX / window.innerWidth) * 2 - 1;
    pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    targetRotY = pointerX * 0.18;
    targetRotX = 0.34 - pointerY * 0.12;
  }
  function onScroll() {
    // fade + sink the lattice as the hero leaves; cheap, no layout read beyond scrollY
    const h = window.innerHeight || 1;
    scrollFade = Math.max(0, 1 - window.scrollY / (h * 0.9));
  }
  window.addEventListener('pointermove', onPointer, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- sizing -----------------------------------------------------------
  function resize() {
    const w = mount.clientWidth || window.innerWidth;
    const h = mount.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(mount);

  // ---- theme reactivity -------------------------------------------------
  const themeObserver = new MutationObserver(() => {
    readTheme();
    lineMat.color.copy(lineColor);
    pointMat.color.copy(nodeColor);
    if (scene.fog) (scene.fog as Fog).color.copy(fogColor);
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  // ---- run/pause gating -------------------------------------------------
  let running = false;
  let onscreen = true;
  let rafId = 0;
  let startTime = -1;
  let live = false;

  const io = new IntersectionObserver(
    (entries) => {
      onscreen = entries[0]?.isIntersecting ?? true;
      updateRunning();
    },
    { threshold: 0 },
  );
  io.observe(mount);

  function onVisibility() {
    updateRunning();
  }
  document.addEventListener('visibilitychange', onVisibility);

  function updateRunning() {
    const shouldRun = onscreen && !document.hidden;
    if (shouldRun && !running) {
      running = true;
      rafId = requestAnimationFrame(tick);
    } else if (!shouldRun && running) {
      running = false;
      cancelAnimationFrame(rafId);
    }
  }

  // ---- the hot path: zero allocation ------------------------------------
  function tick(now: number) {
    if (!running) return;
    if (startTime < 0) startTime = now;
    const t = (now - startTime) * 0.001;

    // spring-ease rotation toward pointer target
    rotX += (targetRotX - rotX) * 0.045;
    rotY += (targetRotY - rotY) * 0.045;
    lines.rotation.x = rotX;
    lines.rotation.y = rotY;
    nodes.rotation.x = rotX;
    nodes.rotation.y = rotY;

    // evolving displacement field — write Z in place
    const arr = positions;
    for (let k = 0; k < count; k++) {
      const x = baseX[k]!;
      const y = baseY[k]!;
      const z =
        2.1 * Math.sin(x * 0.15 + t * 0.42) +
        1.7 * Math.cos(y * 0.19 + t * 0.36) +
        0.9 * Math.sin((x + y) * 0.1 - t * 0.28);
      arr[k * 3 + 2] = z;
    }
    posAttr.needsUpdate = true;

    // scroll-driven fade + sink
    const op = scrollFade;
    lineMat.opacity = 0.62 * op;
    pointMat.opacity = 0.85 * op;
    lines.position.y = (1 - op) * -6;
    nodes.position.y = (1 - op) * -6;

    renderer.render(scene, camera);

    if (!live) {
      live = true;
      mount.parentElement?.setAttribute('data-live', 'true');
    }
    rafId = requestAnimationFrame(tick);
  }

  updateRunning();

  // ---- teardown ---------------------------------------------------------
  function dispose() {
    running = false;
    cancelAnimationFrame(rafId);
    io.disconnect();
    ro.disconnect();
    themeObserver.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('pointermove', onPointer);
    window.removeEventListener('scroll', onScroll);
    lineGeo.dispose();
    pointGeo.dispose();
    lineMat.dispose();
    pointMat.dispose();
    dotTex.dispose();
    renderer.dispose();
    canvas.remove();
    mount.parentElement?.removeAttribute('data-live');
  }

  return { dispose };
}
