/**
 * Project catalogue. Copy is written in the subject's register — precise,
 * technical, no marketing fluff. Engineering hooks are the point of each entry.
 *
 * Authoritative source is the brief (§4); README details enrich but never
 * override it. Each card carries its own accent (cards "bloom"); the site chrome
 * stays neutral.
 */

export type Tier = 'flagship' | 'application' | 'professional';

export interface Shot {
  /** "<Project>/<File>" key resolved by src/lib/images.ts */
  key: string;
  /** Real, descriptive alt text. Never decorative-empty for content images. */
  alt: string;
  /** Short caption shown under the image in the detail view. */
  caption: string;
}

export interface Project {
  id: string;
  name: string;
  aka?: string;
  tier: Tier;
  /** One-line "what it is". */
  oneLiner: string;
  /** The engineering hook — what makes it worth showing an engineer. */
  hook: string;
  /** Accent for this card. Light/dark variants kept legible against both bases. */
  accent: { base: string; soft: string };
  /** Platform/runtime line, e.g. "WinUI 3 · .NET 9". */
  platform: string;
  /** Distribution status, shown as a quiet badge when present. */
  status?: string;
  tech: string[];
  shots: Shot[];
  /** Detail-view narrative. Each string is a paragraph. */
  story: string[];
  /** Optional outbound link (e.g. Microsoft Store). */
  link?: { label: string; href: string };
}

export const projects: Project[] = [
  {
    id: 'jericode',
    name: 'Jericode',
    tier: 'flagship',
    oneLiner: 'A native agentic IDE for Windows.',
    hook:
      'Five CLI agents — Claude, Codex, Grok, Pi, and Copilot — each run as a subprocess over redirected stdin/stdout and normalized from its own wire protocol into one streaming UI. Message text, Mermaid diagrams, and the code editor are all drawn by hand in Win2D — nothing in the UI is a browser control.',
    accent: { base: '#FB923C', soft: '#F8B97E' },
    platform: 'WinUI 3 · .NET 9 · Win2D',
    status: 'Microsoft Store',
    tech: ['WinUI 3', '.NET 9', 'Win2D', 'SQLite (WAL + FTS5)', 'JSON-RPC 2.0 / ACP', 'TextMate grammars'],
    shots: [
      {
        key: 'Jericode/MainWindow_Session.png',
        alt: 'Jericode IDE during an active agent session: source-control panel on the right, a streaming markdown conversation in the center, and a task list at lower right.',
        caption: 'An active session — agent transcript, live source control, and the working task list.',
      },
      {
        key: 'Jericode/MainWindow_NewSession.png',
        alt: 'Jericode new-session view with the agent picker and recent sessions list.',
        caption: 'Starting fresh. Sessions persist to SQLite with full-text search.',
      },
      {
        key: 'Jericode/Code_Editor.png',
        alt: 'Jericode code editor showing a C# file with TextMate-grammar syntax highlighting and a file tree.',
        caption: 'The editor: a piece table over a red-black tree, TextMate-grammar highlighting.',
      },
      {
        key: 'Jericode/Diff_Viewer_SBS.png',
        alt: 'Jericode side-by-side diff viewer with additions and deletions aligned across two panes.',
        caption: 'Side-by-side diff — Myers with a histogram fallback.',
      },
      {
        key: 'Jericode/Diff_Viewer_Inline.png',
        alt: 'Jericode inline diff viewer showing changes within a single column.',
        caption: 'The same change, inline.',
      },
    ],
    story: [
      'Jericode is a coding agent that lives where the work does — a real Windows application, not a browser pretending to be one. It runs each agent CLI as a child process in a structured, non-interactive mode and reads newline-delimited JSON off its pipes. Those five tools don’t agree on much: Claude speaks a bespoke polymorphic control protocol, Pi a custom JSON dialect, and Codex, Grok, and Copilot each a JSON-RPC 2.0 / ACP variant. Jericode reconciles all of them into one consistent interface, with the agent loop and the UI running independently so neither blocks the other.',
      'The conversation transcript — every user, assistant, and thinking message — is drawn by hand on Win2D rather than composed from XAML text controls. It’s a custom markdown renderer built to stream: tokens land and lay out incrementally, with no reflow flash. Diagrams are rendered the same way — no HTML, no web view. A native Sugiyama engine lays out a dozen Mermaid types — flowchart, sequence, state, class, ER, gantt and more — through a real pipeline: network-simplex ranking, barycenter crossing reduction, perimeter-aware port routing, drawn straight to the canvas. Its layout is validated in tests against MSAGL as an oracle, but ships with no external layout dependency. The surrounding chrome — tool-call cards, panels, source control — is standard WinUI.',
      'The editor stores text in a piece table indexed by a red-black tree, with TextMate-grammar highlighting and a Win2D renderer that only paints the visible viewport. The “Constellation” is a custom progress indicator that animates the agent’s working state with a real spring solver — Hooke’s-law forces, velocity integration — and respects reduced-motion. Every session — each message, tool call, and diff — persists to SQLite in WAL mode behind an FTS5 index, so the full history is searchable and replayable. The whole thing is covered by roughly 2,900 tests.',
    ],
    link: { label: 'Microsoft Store', href: 'https://apps.microsoft.com/store/detail/9N3W6PQ7X087?cid=DevShareMCLPCS' },
  },

  {
    id: 'sefer',
    name: 'Sefer',
    tier: 'application',
    oneLiner: 'A premium, contemplative markdown reader.',
    hook:
      'A Win2D-backed renderer that draws real, bundled font faces directly to the canvas — Spectral for the body, EB Garamond for display italics, a true small-caps cut — no WebView, no RichTextBlock — inside a letterpress "Atelier" language.',
    accent: { base: '#CF8B6E', soft: '#E0AE97' },
    platform: 'WinUI 3 · .NET 9 · Win2D',
    status: 'Microsoft Store',
    tech: ['WinUI 3', '.NET 9', 'Win2D', 'Markdig', 'Spectral (bundled)', 'EB Garamond (bundled)'],
    shots: [
      {
        key: 'Sefer/sefer-main.png',
        alt: 'Sefer home screen on warm cream paper: a serif "Drop a markdown here" prompt on the left and a "Lately read" list of classic books on the right.',
        caption: 'First launch opens onto a shelf — a bundled public-domain library.',
      },
      {
        key: 'Sefer/sefer-editor.png',
        alt: 'Sefer reading view rendering a markdown document in a Spectral serif with editorial typography.',
        caption: 'Body text set in real Spectral faces, drawn to Win2D — not a web view.',
      },
      {
        key: 'Sefer/sefer-theme.png',
        alt: 'Sefer in its alternate theme, showing the oxblood and terracotta palette on a darker ground.',
        caption: 'The Atelier palette: oxblood and terracotta on warm ground.',
      },
    ],
    story: [
      'Sefer is for reading, not for managing. It opens onto a shelf — a bundled public-domain library — so the first launch already has something worth your attention. There is no telemetry and no AI, by design.',
      'The renderer is the whole argument. Markdown is parsed with Markdig, then composed and drawn to a Win2D canvas using real, bundled font faces — Spectral for the body, EB Garamond for the display italics, and a true small-caps cut — not synthetic slants and algorithmic bolding faked by a control. No WebView, no RichTextBlock. The result is letterpress-grade typography that holds together at any zoom.',
      'The "Atelier" visual language — oxblood on warm cream by day, terracotta on deep coffee by night — treats the page as a printed object. Restraint is the feature.',
    ],
    link: { label: 'Microsoft Store', href: 'https://apps.microsoft.com/store/detail/9NT0TWVRF882?cid=DevShareMCLPCS' },
  },

  {
    id: 'jeriread',
    name: 'JeriRead',
    aka: 'FastReader',
    tier: 'application',
    oneLiner: 'A PDF engine built from the spec up.',
    hook:
      'An engine built to ISO 32000, whose TileCache rearchitecture — a union render-target with a slice model — interprets a tile-block once and slices each tile out in ~0.2 ms, dropping the marginal cost of a tile ~600× (from ~127 ms re-interpreting the whole page per tile).',
    accent: { base: '#3DA0F2', soft: '#7FC1F7' },
    platform: 'Win2D / Direct2D · .NET 9',
    tech: ['Win2D', 'Direct2D', '.NET 9', 'ComputeSharp D2D', 'memory-mapped I/O'],
    shots: [
      {
        key: 'PdfReader/Continuous_ShowsProgressiveBlurHeader.png',
        alt: 'JeriRead in continuous scroll mode rendering a textbook page, with a progressive-blur header fading the chrome above the document.',
        caption: 'Continuous scroll with a progressive-blur header.',
      },
      {
        key: 'PdfReader/Horizontal_Reading.png',
        alt: 'JeriRead in horizontal paging mode showing a single crisp document page.',
        caption: 'Horizontal paging. The metric that matters is time-to-crisp.',
      },
      {
        key: 'PdfReader/Side-by-side_Reading.png',
        alt: 'JeriRead in two-up side-by-side reading mode showing facing pages.',
        caption: 'Two-up, facing pages.',
      },
    ],
    story: [
      'JeriRead renders PDFs with an engine written against ISO 32000 directly — stream filters, the font model, blend and transparency via ComputeSharp D2D shaders — rather than wrapping someone else’s viewer.',
      'The defining work was the tile cache. Instead of re-interpreting the whole page per tile (~127 ms each), the rearchitected TileCache interprets a tile-block once over a single union render-target and slices each tile out of it in ~0.2 ms — the marginal cost of a tile dropped roughly 600×, collapsing a multi-second viewport fill to a couple hundred milliseconds. The guiding metric is "time-to-crisp": how long after you stop scrolling until the page is sharp, helped along by viewport-center-first scheduling and a parallel render pool.',
      'The surround is "Lumen" — a cool near-black ground with an azure accent — chosen so the document, not the chrome, is the brightest thing on screen.',
    ],
  },

  {
    id: 'gitsmarter',
    name: 'GitSmarter',
    tier: 'application',
    oneLiner: 'A native C++ Git client for Windows.',
    hook:
      'A native C++20 Git client — no libgit2, no git.exe shell-out — with the object database, pack format, and Smart HTTP v2 protocol reimplemented from scratch. A lock-free parallel clone hits git-CLI parity on the Linux kernel: 289 s vs git’s 275 s over 11.3M objects.',
    accent: { base: '#4D8DF6', soft: '#86B4FA' },
    platform: 'C++20 · Direct2D',
    tech: ['C++20', 'Direct2D', 'WinHTTP', 'zlib-ng (vendored)', 'Win32 threads'],
    shots: [
      {
        key: 'GitSmarter/Repo_View_With_SBS_Diff.png',
        alt: 'GitSmarter repository view with the file list on the left and a side-by-side diff with green additions on the right.',
        caption: 'Repository view with a side-by-side diff.',
      },
      {
        key: 'GitSmarter/Command_Palette.png',
        alt: 'GitSmarter command palette listing Git operations such as Stage All, Fetch, Push, and Stash with keyboard shortcuts.',
        caption: 'A command palette over the full Git surface.',
      },
      {
        key: 'GitSmarter/Launch_View.png',
        alt: 'GitSmarter launch screen for opening or cloning a repository.',
        caption: 'Launch — open or clone.',
      },
    ],
    story: [
      'GitSmarter is a native C++20 Git client for Windows — no libgit2, no git.exe shell-out, no package manager. The full object database, pack format, and Smart HTTP v2 protocol are reimplemented from scratch; the only third-party code is zlib-ng, vendored as a submodule and built from source — a single ~200 KB exe against the Windows SDK. The UI is drawn in Direct2D, networking is WinHTTP, and it builds as a unity translation unit, keeping the whole program in front of the compiler at once.',
      'Cloning is the headline. A lock-free parallel clone hits git-CLI parity on the Linux kernel — 289 s against git’s 275 s over 11.3M objects, 9.15M deltas, a 6 GB pack and 92K files. The pack streams direct-to-disk and generates its .idx straight from the stream rather than exploding loose objects (a 78 s → 47 ms write phase), while delta resolution runs over a lock-free Treiber-stack work queue with CAS push/pop on a pre-allocated node pool. A sharded LRU object cache — 16 shards, a lock per shard, routed by obj_index & 0xF — cuts contention from ~100% to ~6% at 32 threads, and the index is assembled during parallel checkout from synthetic metadata, eliminating 4N stat calls. SHA-1 chunking works around BCryptHashData’s 32-bit length limit for packs over 4 GB, and the whole client runs native on ARM64 with NEON.',
      'The signature open animations — the command palette and context menu — are driven by a closed-form damped-spring solver: it branches on damping ratio (under/critically/overdamped) and evaluates the analytical solution at the current timestamp rather than Euler-integrating, so they stay correct on any refresh rate. Underneath, a self-driving frame clock times itself off QueryPerformanceCounter deltas and re-detects variable refresh via DwmGetCompositionTimingInfo, idling at near-zero CPU.',
    ],
  },

  {
    id: 'verity',
    name: 'Verity',
    tier: 'application',
    oneLiner: 'A WinUI 3 web browser.',
    hook:
      'A WebView2 core wrapped in an AI-powered widget system: point it at any page and it discovers extractable data, builds a CSS-selector recipe, and renders a live, auto-refreshing widget driven by a headless WebView2 — in card, metric, or dashboard layouts.',
    accent: { base: '#5CB89A', soft: '#8FD3BC' },
    platform: 'WinUI 3 · .NET 8 · WebView2',
    tech: ['WinUI 3', '.NET 8', 'WebView2', 'ComputeSharp', 'SQLite'],
    shots: [
      {
        key: 'Verity/New_Tab_View.png',
        alt: 'Verity new-tab page with a centered "Good afternoon" greeting and search field over a soft green ambient gradient.',
        caption: 'The new-tab page over a GPU-shaded ambient gradient.',
      },
      {
        key: 'Verity/Main_View.png',
        alt: 'Verity browser displaying a web page with its tab strip and address bar.',
        caption: 'Browsing — native chrome around a WebView2 core.',
      },
      {
        key: 'Verity/Bookmarks.png',
        alt: 'Verity bookmarks view organized into groups.',
        caption: 'Bookmarks and groups.',
      },
      {
        key: 'Verity/Now_Playing_Widget.png',
        alt: 'Verity now-playing media widget showing playback controls for the active tab.',
        caption: 'A native now-playing widget for media tabs.',
      },
    ],
    story: [
      'Verity puts a real WinUI 3 application around a WebView2 rendering core, with native Fluent chrome and GPU-composited ambient surfaces. Its standout feature is an AI-powered widget system: point it at any page and it discovers extractable data, builds a CSS-selector recipe, and renders a live, auto-refreshing widget driven by a headless WebView2 — in card, metric, or dashboard layouts. A companion system learns per-site media controls (play/pause/next) with confidence scoring, surfacing a now-playing panel with shader-blurred artwork.',
      'The chrome is GPU-composited: three ComputeSharp HLSL pixel shaders — an animated morphing gradient, a crossfade, and procedural noise — feed Win2D effect graphs for the background and accent surfaces, recolored live on theme switch.',
      'State lives in a single SQLite database with WAL journaling and a versioned migration system. Windows, tabs, groups, and history are write-through persisted; closing a window soft-deletes its session rather than erasing it, so nothing you had open is ever gone. Two themes, "Clarity" and "Nocturne", are driven entirely through theme resources for an instant, complete switch.',
    ],
  },

  {
    id: 'finstry',
    name: 'Finstry',
    tier: 'application',
    oneLiner: 'A personal budgeting app.',
    hook:
      'A WinUI 3 budgeting app over a SQLCipher database (AES-256, key sealed to the Windows user via DPAPI), with a trigger-enforced audit log that captures every writer — GUI or CLI — and rolls back any change by id.',
    accent: { base: '#2FBF8F', soft: '#74D7B6' },
    platform: 'WinUI 3 · SQLite',
    tech: ['WinUI 3', 'SQLite', 'SQLCipher', 'DPAPI', 'System.CommandLine'],
    shots: [
      {
        key: 'Finstry/Budget_View.jpg',
        alt: 'Finstry budget view: a month timeline across the top, income and budget-balance summaries, category cards for Housing, Entertainment, Utilities and more, and a recent-transactions list on the right.',
        caption: 'A month at a glance — categories, balances, and recent transactions.',
      },
    ],
    story: [
      'Finstry is a budgeting app that respects both the GUI and the terminal — a WinUI 3 front end and a CLI sharing one extracted Finstry.Core data layer, so the CLI isn’t a reimplementation but the same repositories. The database is SQLCipher, transparently AES-256-encrypted at rest; its key is a 256-bit random value sealed to the Windows user with DPAPI, so there’s no password prompt, but the file is unreadable if copied to another machine or account.',
      'The audit trail is enforced at the database level — SQLite triggers on every table capture any writer identically, whether the change came from the GUI, a per-command CLI call, or a bulk import, and any change can be rolled back by id even on rows a given client never touched.',
      'The companion CLI makes the data programmable. A bulk command reads NDJSON from stdin and applies the batch in one transaction on a pre-allocated connection — one bulk call instead of 31 separate CLI invocations, each otherwise paying its own startup cost. Per-line errors are reported individually; fail-fast is opt-in via --stop-on-error. A --dry-run wraps the mutations in an always-rolled-back transaction but still returns the would-be row ids. Under MSIX, the CLI resolves the packaged database path automatically, refusing to run when multiple installed packages are ambiguous.',
    ],
  },

  {
    id: 'vibesonic',
    name: 'VibeSonic',
    tier: 'application',
    oneLiner: 'C++ vibration-analysis tooling.',
    hook:
      'Real-time waveform, FFT (radix-2 Cooley-Tukey, up to 16K points), PSD, and STFT spectrogram in a tiling split-pane workspace, drawn from a 7-level decimation LOD pyramid that preserves per-pixel min/max at every zoom.',
    accent: { base: '#3DD8E0', soft: '#82E7EC' },
    platform: 'C++20 · Direct2D',
    tech: ['C++20', 'Direct2D', 'WIC', 'memory-mapped I/O', 'Windows Thread Pool'],
    shots: [
      {
        key: 'VibeSonic/Waveform_FFT_PSD.png',
        alt: 'VibeSonic showing three synchronized panes: a multi-channel time-domain waveform on the left, an FFT magnitude spectrum top-right, and a power spectral density plot bottom-right, with channels colored cyan, magenta and green.',
        caption: 'Time, FFT, and PSD — three synchronized views over a multi-channel signal.',
      },
    ],
    story: [
      'VibeSonic visualizes sound and vibration recordings in real time — time-domain waveform, FFT magnitude, PSD, and STFT spectrogram — in a tiling split-pane workspace with a linked cursor that tracks the same time/frequency position across every pane. A binary-tree layout engine (HSplit/VSplit nodes, draggable splitters, pane split and collapse) drives the workspace; a reverse-engineered VFW reader (a MATLAB Level-4 MAT variant) makes it a vibration tool, not just an audio viewer.',
      'The transform is a radix-2 Cooley-Tukey FFT up to 16K points, with selectable windows (Hann, Hamming, Blackman, flat-top) and RMS or peak-hold averaging, computed on background threads via the Windows Thread Pool with progressive UI updates. The spectrogram offers four colormaps (Viridis, Jet, Grayscale, Hot) with dB conversion, drawn from a Direct2D bitmap texture. Large captures are read through memory-mapped I/O and drawn from a 7-level decimation LOD pyramid — persisted to a custom .lodx cache file and memory-mapped back on reopen — where every level stores per-pixel min and max, so peaks never vanish when you zoom out. Built from scratch on raw Win32 + Direct2D as a single ~400 KB binary with no third-party dependencies.',
    ],
  },

  {
    id: 'observview',
    name: 'ObserVIEW',
    tier: 'professional',
    oneLiner: 'Real-time vibration analysis at Vibration Research.',
    hook:
      'Professional work: live streaming from multiple hardware DAQ devices with sub-millisecond processing, a native C++ DSP engine (FFT, SRS/FDS, SDOF, order tracking) bridged to .NET, and a GPU-accelerated charting pipeline that scales past 1,000 simultaneous channels.',
    accent: { base: '#2E8BC0', soft: '#6FB4DA' },
    platform: 'WPF · .NET 8 · C++',
    tech: ['C#', '.NET 8', 'WPF', 'C++ DSP', 'GPU charting', 'WebView2', 'P/Invoke interop'],
    shots: [
      {
        key: 'ObserVIEW/3D_Spectrogram.png',
        alt: 'ObserVIEW rendering a tachometer-based 3D spectrogram of an engine ramp-up, with frequency and RPM axes and an amplitude color scale.',
        caption: 'A tachometer-based 3D spectrogram of an engine ramp-up.',
      },
      {
        key: 'ObserVIEW/FFT_With_Cursors.png',
        alt: 'ObserVIEW FFT plot with measurement cursors marking specific frequencies.',
        caption: 'FFT with measurement cursors.',
      },
      {
        key: 'ObserVIEW/Home_Screen.png',
        alt: 'ObserVIEW home screen with analysis tools and recent projects.',
        caption: 'The analysis home.',
      },
      {
        key: 'ObserVIEW/Map_Video_Playback.png',
        alt: 'ObserVIEW showing synchronized GPS map and video playback alongside a data trace.',
        caption: 'Map and video, synchronized to the data trace.',
      },
    ],
    story: [
      'ObserVIEW is the vibration-analysis platform I work on at Vibration Research. It captures, analyzes, and visualizes vibration and shock test data from hardware data-acquisition devices — streaming live measurements off connected IOBox hardware, running intensive signal processing (FFT, SRS/FDS, SDOF, order tracking, transfer functions), and rendering the results through a GPU-accelerated charting pipeline that handles 1,000+ simultaneous channels, including the real-time 3D spectrogram and synchronized map-and-video playback shown here.',
      'It’s built on a WPF front end over a native C++ DSP engine, bridged through managed/native interop, with performance-critical paths tuned for extreme channel counts and the heavy work kept off the UI thread. The application is organized around a modular, feature-based architecture: pluggable analysis modules, a dependency-aware computation graph that cascades trace updates, full project and session lifecycle management, software licensing, and automated batch report generation.',
      'This entry stays at the level that’s publicly visible — it’s my employer’s product, and the details here come from its public description.',
    ],
  },
];

export const flagship = projects.find((p) => p.tier === 'flagship')!;
export const applications = projects.filter((p) => p.tier === 'application');
export const professional = projects.filter((p) => p.tier === 'professional');
