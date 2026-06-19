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
  },

  {
    id: 'sefer',
    name: 'Sefer',
    tier: 'application',
    oneLiner: 'A premium, contemplative markdown reader.',
    hook:
      'A Win2D-backed renderer that draws real, bundled Spectral font faces directly to the canvas — no WebView, no RichTextBlock — inside a letterpress "Atelier" language.',
    accent: { base: '#CF8B6E', soft: '#E0AE97' },
    platform: 'WinUI 3 · .NET 9 · Win2D',
    tech: ['WinUI 3', '.NET 9', 'Win2D', 'Markdig', 'Spectral (bundled)'],
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
      'The renderer is the whole argument. Markdown is parsed with Markdig and then composed and drawn to a Win2D canvas using real, bundled Spectral font faces — the genuine optical sizes, not a web font approximated by a control. No WebView, no RichTextBlock. The result is letterpress-grade typography that holds together at any zoom.',
      'The "Atelier" visual language — oxblood and terracotta on warm cream — treats the page as a printed object. Restraint is the feature.',
    ],
  },

  {
    id: 'jeriread',
    name: 'JeriRead',
    aka: 'FastReader',
    tier: 'application',
    oneLiner: 'A PDF engine built from the spec up.',
    hook:
      'An ISO 32000-compliant renderer whose TileCache rearchitecture — a union render-target with a slice model — cut per-tile cost from ~127 ms to ~0.2 ms. Roughly 600×.',
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
      'The defining work was the tile cache. The original per-tile path cost about 127 ms; a rearchitected TileCache built on a single union render-target with a slice model brought that to roughly 0.2 ms — about a 600× reduction. The guiding metric is "time-to-crisp": how long after you stop scrolling until the page is sharp.',
      'The surround is "Lumen" — a cool near-black ground with an azure accent — chosen so the document, not the chrome, is the brightest thing on screen.',
    ],
  },

  {
    id: 'gitsmarter',
    name: 'GitSmarter',
    tier: 'application',
    oneLiner: 'A native C++ Git client for Windows.',
    hook:
      'Zero dependencies, Direct2D rendering, and a closed-form analytical spring system — frame-rate-independent animation that is solved, not Euler-integrated.',
    accent: { base: '#4D8DF6', soft: '#86B4FA' },
    platform: 'C++20 · Direct2D',
    tech: ['C++20', 'Direct2D', 'WinHTTP', 'zlib-ng', 'Win32 thread pool'],
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
      'GitSmarter is a Git client with no third-party dependencies. The UI is drawn in Direct2D; networking is WinHTTP; decompression is zlib-ng. It is built as a unity translation unit, which keeps the whole program in front of the compiler at once.',
      'Cloning is direct-to-disk: the pack streams to a temp file while a 64 MB sliding-window memory-mapped view feeds decompression concurrently, so a large clone never balloons in memory. Delta resolution runs over a lock-free work queue — a Treiber stack with CAS push/pop over a pre-allocated node pool.',
      'Motion is solved in closed form. Instead of integrating a spring every frame and accumulating error, GitSmarter evaluates the analytical solution at the current time — frame-rate-independent by construction, smooth on a variable-refresh display.',
    ],
  },

  {
    id: 'verity',
    name: 'Verity',
    tier: 'application',
    oneLiner: 'A WinUI 3 web browser.',
    hook:
      'A WebView2 core wrapped in a native widget system with PWA install support, GPU pixel-shader chrome, and a soft-delete session model — closing a window never loses your tabs.',
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
      'Verity puts a real WinUI 3 application around a WebView2 rendering core: a native chrome, a widget system, and PWA install support, with GPU pixel shaders (ComputeSharp) for the ambient surfaces.',
      'State is durable. Windows, tabs, and groups live in SQLite with a soft-delete model — a closed window is marked closed, not erased — so nothing you had open is ever actually gone. A single repository manager serializes writes behind a semaphore, and cross-window tab drag-and-drop is coordinated by a window manager.',
      'Two themes, "Clarity" and "Nocturne", are driven entirely through theme resources so the switch is instant and complete.',
    ],
  },

  {
    id: 'finstry',
    name: 'Finstry',
    tier: 'application',
    oneLiner: 'A personal budgeting app.',
    hook:
      'A WinUI 3 desktop app with a scripting CLI: NDJSON piped over stdin and applied in a single transaction, DPAPI-encrypted at rest, with an audit log you can roll back by id.',
    accent: { base: '#2FBF8F', soft: '#74D7B6' },
    platform: 'WinUI 3 · SQLite',
    status: 'Microsoft Store',
    tech: ['WinUI 3', 'SQLite', 'DPAPI', 'System.CommandLine'],
    shots: [
      {
        key: 'Finstry/Budget_View.jpg',
        alt: 'Finstry budget view: a month timeline across the top, income and budget-balance summaries, category cards for Housing, Entertainment, Utilities and more, and a recent-transactions list on the right.',
        caption: 'A month at a glance — categories, balances, and recent transactions.',
      },
    ],
    story: [
      'Finstry is a budgeting app that respects both the GUI and the terminal. The desktop app is WinUI 3 over SQLite; the database is encrypted at rest with DPAPI, tied to the Windows user.',
      'The companion CLI makes the data programmable. A bulk command reads NDJSON from stdin and applies the whole batch inside one transaction on a pre-allocated connection — a 31-item budget that took minutes of clicking lands in under a second. Every mutation is written to an audit log, and any change can be undone by id.',
    ],
  },

  {
    id: 'vibesonic',
    name: 'VibeSonic',
    tier: 'application',
    oneLiner: 'C++ vibration-analysis tooling.',
    hook:
      'Real-time FFT (radix-2 Cooley-Tukey, up to 16K points) over memory-mapped data, with an 8-level decimation LOD cache that preserves per-pixel min/max at every zoom.',
    accent: { base: '#3DD8E0', soft: '#82E7EC' },
    platform: 'C++20 · Direct2D',
    tech: ['C++20', 'Direct2D', 'WIC', 'memory-mapped I/O'],
    shots: [
      {
        key: 'VibeSonic/Waveform_FFT_PSD.png',
        alt: 'VibeSonic showing three synchronized panes: a multi-channel time-domain waveform on the left, an FFT magnitude spectrum top-right, and a power spectral density plot bottom-right, with channels colored cyan, magenta and green.',
        caption: 'Time, FFT, and PSD — three synchronized views over a multi-channel signal.',
      },
    ],
    story: [
      'VibeSonic analyzes sound and vibration recordings in real time: time-domain waveforms, FFT magnitude, and power spectral density, side by side and synchronized.',
      'The transform is a radix-2 Cooley-Tukey FFT up to 16K points, with selectable windows (Hann, Hamming, Blackman, flat-top) and RMS or peak-hold averaging. Large captures are read through memory-mapped I/O and drawn from an 8-level decimation LOD cache — and critically, every level preserves the per-pixel min and max, so peaks never vanish when you zoom out.',
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
