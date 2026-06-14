/* ──────────────────────────────────────────────────────────────
   prototypes.js — 디자인 시스템 / 컬러 도구 프로토타입
   colorpicker · personal-palette + label-chip 분해 7종.
   label-chip 항목은 Tika 토큰 스타일시트(LC_CSS)를 공유한다
   (디자인 시스템 쇼케이스라 전체 토큰 CSS 노출이 자연스럽고,
    concern별 슬라이싱 누락 위험 없이 정확히 렌더된다).
────────────────────────────────────────────────────────────── */
window.UIKIT = window.UIKIT || {};
(function(){
var LC_CSS = `:root {
  --font-display:'Plus Jakarta Sans','Noto Sans KR',sans-serif;
  --font-body:'Noto Sans KR','Plus Jakarta Sans',sans-serif;
  --font-mono:'JetBrains Mono',monospace;
  --bg:#F0F2F5;
  --card:#FFFFFF;
  --border:#E2E6EC;
  --border-strong:#CDD3DC;
  --text-primary:#1E2D3D;
  --text-secondary:#4A5C6E;
  --text-muted:#8A96A4;
  --accent:#629584;
  --accent-hover:#527D6F;
  --accent-light:#E8F5F0;
}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html,body{font-family:var(--font-body);font-size:14px;color:var(--text-primary);background:var(--bg);-webkit-font-smoothing:antialiased}

.page{max-width:960px;margin:0 auto;padding:40px 24px 80px}

/* ── Page Header ── */
.page-header{margin-bottom:40px}
.page-title{font-family:var(--font-display);font-size:24px;font-weight:700;color:var(--text-primary);margin-bottom:6px}
.page-sub{font-size:13px;color:var(--text-muted);line-height:1.6}
.tika-tag{display:inline-flex;align-items:center;gap:4px;height:20px;padding:0 8px;border-radius:4px;background:var(--accent-light);color:var(--accent);font-size:11px;font-weight:600;margin-bottom:10px}

/* ── Section ── */
.section{background:var(--card);border-radius:12px;border:1px solid var(--border);padding:28px;margin-bottom:20px}
.section-title{font-family:var(--font-display);font-size:13px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.8px;margin-bottom:20px;display:flex;align-items:center;gap:8px}
.section-title::after{content:'';flex:1;height:1px;background:var(--border)}

/* ── CHIP BASE ── */
.chip{
  display:inline-flex;align-items:center;gap:5px;
  padding:0 10px;border-radius:5px;
  font-family:var(--font-body);font-weight:600;
  white-space:nowrap;cursor:default;
  transition:filter .15s, transform .1s;
  border:none;
  line-height:1;
}
.chip:hover{filter:brightness(.93);transform:translateY(-1px)}
.chip-sm{height:20px;font-size:10px;padding:0 7px;border-radius:4px;gap:4px}
.chip-md{height:24px;font-size:11px;padding:0 9px;border-radius:5px}
.chip-lg{height:28px;font-size:12px;padding:0 11px;border-radius:6px}

/* Remove button */
.chip-rm{
  width:13px;height:13px;display:inline-flex;align-items:center;justify-content:center;
  border:none;background:rgba(0,0,0,0.18);border-radius:50%;
  color:inherit;cursor:pointer;flex-shrink:0;
  font-style:normal;font-size:9px;line-height:1;padding:0;
  transition:background .12s;
}
.chip-rm:hover{background:rgba(0,0,0,0.38)}
/* light-bg chips need darker rm */
.chip.light .chip-rm{background:rgba(0,0,0,0.12)}
.chip.light .chip-rm:hover{background:rgba(0,0,0,0.25)}

/* dot icon */
.chip-dot{width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.7;flex-shrink:0}

/* ── Color grid ── */
.color-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px}
.color-card{
  border:1px solid var(--border);border-radius:10px;overflow:hidden;
  transition:box-shadow .15s,transform .15s;cursor:default;
}
.color-card:hover{box-shadow:0 4px 16px rgba(0,0,0,.1);transform:translateY(-2px)}
.cc-swatch{height:52px;display:flex;align-items:center;justify-content:center;gap:6px;padding:0 12px}
.cc-info{padding:10px 12px;border-top:1px solid var(--border);background:var(--card)}
.cc-name{font-size:12px;font-weight:600;color:var(--text-primary);margin-bottom:2px}
.cc-hex{font-family:var(--font-mono);font-size:10px;color:var(--text-muted)}
.cc-text-hex{font-family:var(--font-mono);font-size:10px;color:var(--text-muted);margin-top:1px}

/* ── Sizes row ── */
.sizes-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.size-label{font-size:11px;color:var(--text-muted);font-weight:500;min-width:32px}

/* ── Chip group ── */
.chip-group{display:flex;flex-wrap:wrap;gap:8px;align-items:center}

/* ── State demo ── */
.state-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.state-card{border:1px solid var(--border);border-radius:8px;padding:14px}
.state-name{font-size:11px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px}

/* ── Usage example ── */
.ticket-mock{
  border:1px solid var(--border);border-radius:8px;padding:14px 16px;
  background:var(--card);box-shadow:0 1px 4px rgba(0,0,0,.06);
}
.ticket-top{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:10px}
.ticket-title-mock{font-size:13px;font-weight:600;color:var(--text-primary);line-height:1.4}
.ticket-chips{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px}
.ticket-footer{display:flex;align-items:center;justify-content:space-between;font-size:11px;color:var(--text-muted)}
.priority-badge{display:inline-flex;align-items:center;gap:4px;height:20px;padding:0 7px;border-radius:4px;font-size:10px;font-weight:600}

/* ── Palette swatch strip ── */
.swatch-strip{display:flex;gap:6px;flex-wrap:wrap}
.swatch{
  width:36px;height:36px;border-radius:8px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:transform .12s,box-shadow .12s;
  border:2px solid transparent;
  position:relative;
}
.swatch:hover{transform:scale(1.15);box-shadow:0 4px 12px rgba(0,0,0,.2)}
.swatch.selected::after{
  content:'✓';position:absolute;font-size:14px;font-weight:700;
  color:inherit;
}

/* ── Priority badge ── */
.priority-icon-demo{display:flex;align-items:center;justify-content:center}
.priority-badge-demo{
  display:inline-flex;align-items:center;height:22px;padding:0 9px;
  border-radius:5px;font-size:11px;font-weight:700;letter-spacing:.2px;
}
/* pbadge = priority badge with icon */
.pbadge{
  display:inline-flex;align-items:center;gap:4px;
  font-weight:700;border-radius:5px;letter-spacing:.2px;white-space:nowrap;
  cursor:default;
}
.pbadge-sm{height:20px;font-size:10px;padding:0 6px;gap:3px}
.pbadge-md{height:24px;font-size:11px;padding:0 8px;gap:4px}
.pbadge-lg{height:28px;font-size:12px;padding:0 10px;gap:5px}
.picon{
  flex-shrink:0;fill:none;stroke:currentColor;
  stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;
}
.pbadge-sm .picon{width:10px;height:10px}
.pbadge-md .picon{width:11px;height:11px}
.pbadge-lg .picon{width:13px;height:13px}
/* icon-only circle */
.picon-only{
  width:28px;height:28px;border-radius:7px;
  display:inline-flex;align-items:center;justify-content:center;
  cursor:default;transition:filter .15s,transform .12s;
}
.picon-only:hover{filter:brightness(.9);transform:scale(1.1)}
.picon-only svg{width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}

/* ── Priority Select mock (trigger closed) ── */
.psel-mock{
  display:flex;align-items:center;justify-content:space-between;
  height:32px;padding:0 10px;
  border:1px solid var(--border);border-radius:6px;
  background:#F4F6F9;cursor:pointer;
}
.psel-mock.psel-open{
  border-color:var(--accent);background:#fff;
  box-shadow:0 0 0 3px var(--accent-light);
}

/* ── Priority Select interactive wrap ── */
.psel-wrap{position:relative;width:100%}
.psel-trigger{
  width:100%;height:32px;padding:0 10px;
  display:flex;align-items:center;justify-content:space-between;gap:6px;
  border:1px solid var(--border);border-radius:6px;
  background:#F4F6F9;cursor:pointer;transition:all .15s;
}
.psel-trigger:hover{border-color:var(--border-strong);background:#EAEDF1}
.psel-wrap.ps-open .psel-trigger{
  border-color:var(--accent);background:#fff;
  box-shadow:0 0 0 3px var(--accent-light);
}
.psel-chevron{color:var(--text-muted);flex-shrink:0;transition:transform .18s}
.psel-wrap.ps-open .psel-chevron{transform:rotate(180deg)}

.psel-menu{
  display:none;position:absolute;top:calc(100% + 4px);left:0;right:0;
  background:#fff;border:1px solid var(--border);border-radius:8px;
  box-shadow:0 6px 20px rgba(0,0,0,.12);padding:4px;z-index:50;
}
.psel-wrap.ps-open .psel-menu{display:block;animation:pdrop .14s ease-out}
@keyframes pdrop{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}

.psel-item{
  width:100%;padding:5px 6px;display:flex;align-items:center;
  border:none;background:transparent;cursor:pointer;border-radius:5px;
  transition:background .12s;
}
.psel-item:hover{background:#F0F4F8}
.psel-item.psel-item-sel{background:var(--accent-light)}

/* ── Open state static diagram ── */
.psel-menu-static{
  background:#fff;border:1px solid var(--border);border-radius:8px;
  box-shadow:0 6px 20px rgba(0,0,0,.12);padding:4px;width:160px;
}
.psel-item-static{
  padding:5px 6px;display:flex;align-items:center;justify-content:space-between;
  border-radius:5px;
}
.psel-item-active{background:var(--accent-light)}

/* ── Priority select demo ── */
.meta-select-demo{
  width:100%;height:34px;padding:0 10px;
  border:1px solid var(--border);border-radius:6px;
  font-family:var(--font-body);font-size:13px;color:var(--text-primary);
  background:#F4F6F9;outline:none;cursor:pointer;
  -webkit-appearance:none;appearance:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238A96A4' stroke-width='2.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat:no-repeat;background-position:right 10px center;padding-right:28px;
}
.meta-select-demo:focus{border-color:var(--accent);background:#fff;box-shadow:0 0 0 3px var(--accent-light)}
.sel-opt-preview{
  display:flex;align-items:center;gap:6px;
  padding:3px 0;font-size:12px;
}
.sel-opt-label{font-weight:500;color:var(--text-primary);flex:1}
.sel-opt-hex{font-family:var(--font-mono);font-size:10px;color:var(--text-muted)}

/* ── Token table ── */
.token-table{width:100%;border-collapse:collapse;font-size:12px}
.token-table th{text-align:left;padding:8px 10px;font-size:10px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--border)}
.token-table td{padding:9px 10px;border-bottom:1px solid var(--border);vertical-align:middle}
.token-table tr:last-child td{border-bottom:none}
.token-table tr:hover td{background:#F8FAFC}
.mono{font-family:var(--font-mono);font-size:11px;color:var(--text-secondary)}
.swatch-sm{width:14px;height:14px;border-radius:3px;display:inline-block;flex-shrink:0;vertical-align:middle;margin-right:6px}`;

UIKIT.prototypes = [
  { id:'colorpicker', name:'Color Picker', nameKo:'컬러 피커', sub:'컬러 도구',
    desc:'Atlassian 스타일 색상 팔레트 피커. 명도 단계 × 색상 열 그리드에서 색을 고르면 미리보기와 HEX가 갱신되고, 직접 HEX 입력과 클립보드 복사를 지원한다.',
    deps:'순수 CSS/JS — 폰트만 CDN', head:`  <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Pretendard:wght@400;500;600&display=swap" rel="stylesheet" />`,
    html:`
<div class="wrapper">
  <header>
    <h1>Atlassian Design System</h1>
    <p>Color Picker</p>
  </header>

  <div class="preview-bar">
    <div class="preview-swatch" id="previewSwatch"></div>
    <div class="preview-info">
      <div class="preview-label" id="previewLabel">기본 텍스트 회색</div>
      <div class="preview-hex" id="previewHex">#172B4D</div>
    </div>
    <button class="copy-btn" id="copyBtn" onclick="copyColor()">COPY HEX</button>
  </div>

  <div class="picker-panel">
    <div class="row-labels">
      <div></div>
      <div class="col-label">회색</div>
      <div class="col-label">빨간</div>
      <div class="col-label">주황</div>
      <div class="col-label">노란</div>
      <div class="col-label">라임</div>
      <div class="col-label">녹색</div>
      <div class="col-label">청록</div>
      <div class="col-label">파란</div>
      <div class="col-label">분홍</div>
      <div class="col-label">보라</div>
    </div>

    <div class="color-grid" id="colorGrid"></div>

    <div class="divider"></div>

    <div class="input-row">
      <label>#</label>
      <input class="hex-input" id="hexInput" type="text" maxlength="6" placeholder="172B4D" oninput="onHexInput(this)" />
    </div>
  </div>
</div>

<div class="toast" id="toast">클립보드에 복사되었습니다!</div>`, css:`    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #0F0F13;
      --surface: #1A1A22;
      --border: #2E2E3A;
      --text: #E8E8F0;
      --text-muted: #6B6B80;
      --radius: 12px;
    }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Pretendard', sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 32px 16px;
    }

    .wrapper {
      width: 100%;
      max-width: 560px;
    }

    header {
      margin-bottom: 28px;
    }

    header h1 {
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 6px;
    }

    header p {
      font-size: 22px;
      font-weight: 600;
      color: var(--text);
    }

    /* Preview Bar */
    .preview-bar {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 20px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .preview-swatch {
      width: 52px;
      height: 52px;
      border-radius: 10px;
      flex-shrink: 0;
      background: #172B4D;
      transition: background 0.2s ease;
      box-shadow: 0 4px 16px rgba(0,0,0,0.4);
    }

    .preview-info {
      flex: 1;
      min-width: 0;
    }

    .preview-label {
      font-size: 14px;
      font-weight: 500;
      color: var(--text);
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .preview-hex {
      font-family: 'DM Mono', monospace;
      font-size: 13px;
      color: var(--text-muted);
    }

    .copy-btn {
      background: none;
      border: 1px solid var(--border);
      color: var(--text-muted);
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.08em;
      padding: 8px 14px;
      border-radius: 7px;
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .copy-btn:hover {
      border-color: #555;
      color: var(--text);
    }

    .copy-btn.copied {
      border-color: #22A06B;
      color: #22A06B;
    }

    /* Grid */
    .picker-panel {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 20px;
    }

    .row-labels {
      display: grid;
      grid-template-columns: 80px repeat(10, 1fr);
      gap: 5px;
      margin-bottom: 8px;
      padding: 0 2px;
    }

    .col-label {
      font-size: 10px;
      color: var(--text-muted);
      text-align: center;
      letter-spacing: 0.04em;
    }

    .color-grid {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .color-row {
      display: grid;
      grid-template-columns: 80px repeat(10, 1fr);
      gap: 5px;
      align-items: center;
    }

    .row-label {
      font-size: 10px;
      color: var(--text-muted);
      text-align: right;
      padding-right: 10px;
      line-height: 1.3;
    }

    .swatch {
      aspect-ratio: 1;
      border-radius: 7px;
      cursor: pointer;
      position: relative;
      transition: transform 0.12s ease, box-shadow 0.12s ease;
      border: 2px solid transparent;
    }

    .swatch:hover {
      transform: scale(1.15);
      z-index: 10;
      box-shadow: 0 4px 14px rgba(0,0,0,0.5);
    }

    .swatch.active {
      border-color: rgba(255,255,255,0.7);
      transform: scale(1.12);
      box-shadow: 0 0 0 3px rgba(255,255,255,0.15);
    }

    /* White swatch special border */
    .swatch[data-hex="#FFFFFF"] {
      border-color: var(--border);
    }

    /* Divider */
    .divider {
      height: 1px;
      background: var(--border);
      margin: 16px 0;
    }

    /* Hex input */
    .input-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .input-row label {
      font-family: 'DM Mono', monospace;
      font-size: 12px;
      color: var(--text-muted);
    }

    .hex-input {
      flex: 1;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 7px;
      color: var(--text);
      font-family: 'DM Mono', monospace;
      font-size: 13px;
      padding: 9px 12px;
      outline: none;
      transition: border-color 0.15s;
    }

    .hex-input:focus {
      border-color: #555;
    }

    /* Toast */
    .toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(60px);
      background: #22A06B;
      color: #fff;
      font-size: 13px;
      font-weight: 500;
      padding: 10px 20px;
      border-radius: 999px;
      opacity: 0;
      transition: all 0.25s ease;
      pointer-events: none;
      white-space: nowrap;
    }

    .toast.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }`, js:`  const ROWS = [
    {
      label: '가장\\n진한',
      colors: [
        { hex: '#172B4D', name: '기본 텍스트 회색' },
        { hex: '#5D1F1A', name: '가장 진한 빨간색' },
        { hex: '#702E00', name: '가장 진한 주황색' },
        { hex: '#533F04', name: '가장 진한 노란색' },
        { hex: '#37471F', name: '가장 진한 라임색' },
        { hex: '#164B35', name: '가장 진한 녹색' },
        { hex: '#164555', name: '가장 진한 청록색' },
        { hex: '#09326C', name: '가장 진한 파란색' },
        { hex: '#50253F', name: '가장 진한 분홍색' },
        { hex: '#352C63', name: '가장 진한 보라색' },
      ]
    },
    {
      label: '더\\n진한',
      colors: [
        { hex: '#44546F', name: '더 진한 회색' },
        { hex: '#AE2E24', name: '더 진한 빨간색' },
        { hex: '#A54800', name: '더 진한 주황색' },
        { hex: '#946F00', name: '더 진한 노란색' },
        { hex: '#4C6B1F', name: '더 진한 라임색' },
        { hex: '#216E4E', name: '더 진한 녹색' },
        { hex: '#206A83', name: '더 진한 청록색' },
        { hex: '#0055CC', name: '더 진한 파란색' },
        { hex: '#943D73', name: '더 진한 분홍색' },
        { hex: '#5E4DB2', name: '더 진한 보라색' },
      ]
    },
    {
      label: '중간',
      colors: [
        { hex: '#626F86', name: '회색' },
        { hex: '#C9372C', name: '빨간색' },
        { hex: '#C25100', name: '주황색' },
        { hex: '#CF9F02', name: '노란색' },
        { hex: '#5B7F24', name: '라임색' },
        { hex: '#1F845A', name: '녹색' },
        { hex: '#227D9B', name: '청록색' },
        { hex: '#0C66E4', name: '파란색' },
        { hex: '#AE4787', name: '분홍색' },
        { hex: '#6E5DC6', name: '보라색' },
      ]
    },
    {
      label: '연한',
      colors: [
        { hex: '#8590A2', name: '연한 회색' },
        { hex: '#F87168', name: '연한 빨간색' },
        { hex: '#FEA362', name: '연한 주황색' },
        { hex: '#F5CD47', name: '연한 노란색' },
        { hex: '#6A9A23', name: '연한 라임색' },
        { hex: '#22A06B', name: '연한 녹색' },
        { hex: '#2898BD', name: '연한 청록색' },
        { hex: '#1D7AFC', name: '연한 파란색' },
        { hex: '#CD519D', name: '연한 분홍색' },
        { hex: '#8270DB', name: '연한 보라색' },
      ]
    },
    {
      label: '가장\\n연한',
      colors: [
        { hex: '#FFFFFF', name: '가장 연한 회색 (흰색)' },
        { hex: '#FFD5D2', name: '가장 연한 빨간색' },
        { hex: '#FEDEC8', name: '가장 연한 주황색' },
        { hex: '#F8E6A0', name: '가장 연한 노란색' },
        { hex: '#D3F1A7', name: '가장 연한 라임색' },
        { hex: '#BAF3DB', name: '가장 연한 녹색' },
        { hex: '#C6EDFB', name: '가장 연한 청록색' },
        { hex: '#CCE0FF', name: '가장 연한 파란색' },
        { hex: '#FDD0EC', name: '가장 연한 분홍색' },
        { hex: '#DFD8FD', name: '가장 연한 보라색' },
      ]
    }
  ];

  let selectedHex = '#172B4D';
  let selectedName = '기본 텍스트 회색';

  function buildGrid() {
    const grid = document.getElementById('colorGrid');
    ROWS.forEach(row => {
      const rowEl = document.createElement('div');
      rowEl.className = 'color-row';

      const labelEl = document.createElement('div');
      labelEl.className = 'row-label';
      labelEl.textContent = row.label;
      rowEl.appendChild(labelEl);

      row.colors.forEach(c => {
        const swatch = document.createElement('div');
        swatch.className = 'swatch';
        swatch.style.background = c.hex;
        swatch.dataset.hex = c.hex;
        swatch.dataset.name = c.name;
        swatch.title = c.name;
        swatch.addEventListener('click', () => selectColor(c.hex, c.name, swatch));
        rowEl.appendChild(swatch);
      });

      grid.appendChild(rowEl);
    });

    // activate first
    const first = grid.querySelector('.swatch');
    if (first) selectColor(first.dataset.hex, first.dataset.name, first);
  }

  function selectColor(hex, name, el) {
    document.querySelectorAll('.swatch.active').forEach(s => s.classList.remove('active'));
    if (el) el.classList.add('active');

    selectedHex = hex;
    selectedName = name;

    document.getElementById('previewSwatch').style.background = hex;
    document.getElementById('previewLabel').textContent = name;
    document.getElementById('previewHex').textContent = hex;
    document.getElementById('hexInput').value = hex.replace('#', '');
    document.getElementById('copyBtn').classList.remove('copied');
    document.getElementById('copyBtn').textContent = 'COPY HEX';
  }

  function onHexInput(input) {
    let val = input.value.replace(/[^0-9a-fA-F]/g, '');
    input.value = val;
    if (val.length === 6) {
      const hex = '#' + val.toUpperCase();
      document.getElementById('previewSwatch').style.background = hex;
      document.getElementById('previewHex').textContent = hex;
      document.getElementById('previewLabel').textContent = '커스텀 색상';
      selectedHex = hex;
      selectedName = '커스텀 색상';
      document.querySelectorAll('.swatch.active').forEach(s => s.classList.remove('active'));
    }
  }

  function copyColor() {
    navigator.clipboard.writeText(selectedHex).then(() => {
      const btn = document.getElementById('copyBtn');
      btn.textContent = 'COPIED!';
      btn.classList.add('copied');

      const toast = document.getElementById('toast');
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
        btn.textContent = 'COPY HEX';
        btn.classList.remove('copied');
      }, 2000);
    });
  }

  buildGrid();` },

  { id:'personal-palette', name:'Profile Color Palette', nameKo:'프로필 배경색 팔레트', sub:'컬러 도구',
    desc:'색상환을 균등 분배한 20가지 프로필 식별 색상 팔레트. 그리드/리스트 보기 전환과 카드 클릭 시 HEX 클립보드 복사를 제공한다.',
    deps:'순수 CSS/JS (의존성 없음)', head:'',
    html:`<div style="max-width:860px;margin:0 auto">
  <div style="font-size:11px;color:#555;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px">Profile Identity System</div>
  <h1>프로필 배경색 팔레트</h1>
  <p>색상환 전체 균등 분배 · 인접색 혼동 최소화 · 20가지 고유 식별 색상</p>

  <div class="tabs">
    <button class="tab active" onclick="switchView('grid',this)">그리드</button>
    <button class="tab" onclick="switchView('list',this)">리스트</button>
  </div>

  <div id="view-grid" class="grid"></div>
  <div id="view-list" class="list hidden"></div>
</div>
<div class="toast" id="toast">HEX 복사됨 ✓</div>`, css:`  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0f0f11; font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; padding: 32px 20px; color: #f0f0f0; }
  h1 { font-size: 22px; font-weight: 800; margin-bottom: 6px; }
  p { font-size: 12px; color: #666; margin-bottom: 28px; }
  .tabs { display: flex; gap: 8px; margin-bottom: 24px; }
  .tab { padding: 6px 18px; border-radius: 20px; border: none; cursor: pointer; font-size: 12px; font-weight: 600; transition: all .2s; }
  .tab.active { background: #fff; color: #000; }
  .tab:not(.active) { background: #1e1e22; color: #888; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 12px; }
  .card { border-radius: 16px; padding: 16px 10px 12px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px; transition: transform .15s; }
  .card:hover { transform: scale(1.04); }
  .avatar { width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.25); display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 700; }
  .cname { font-size: 11px; font-weight: 700; text-align: center; }
  .chex { font-size: 10px; font-family: monospace; opacity: .7; }
  .list { display: flex; flex-direction: column; gap: 6px; }
  .row { display: flex; align-items: center; gap: 14px; padding: 10px 16px; background: #16161a; border-radius: 12px; border: 1px solid #2a2a30; cursor: pointer; transition: border-color .2s; }
  .row:hover { border-color: var(--c); }
  .num { width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; flex-shrink: 0; }
  .rname { font-size: 13px; font-weight: 700; color: #eee; }
  .ren { font-size: 11px; color: #555; }
  .swatch { width: 56px; height: 18px; border-radius: 4px; flex-shrink: 0; }
  .rhex { font-family: monospace; font-size: 11px; color: #666; width: 68px; }
  .rhsl { font-family: monospace; font-size: 10px; color: #444; }
  .copied { color: #6fbf6f !important; }
  .toast { position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: #fff; color: #000; padding: 8px 20px; border-radius: 20px; font-size: 12px; font-weight: 600; opacity: 0; transition: opacity .3s; pointer-events: none; z-index: 99; }
  .toast.show { opacity: 1; }
  .hidden { display: none; }`, js:`const COLORS = [
  { id:1,  name:"크림슨",   en:"Crimson Red",  hex:"#E8392A", hsl:"hsl(4,82%,56%)" },
  { id:2,  name:"탠저린",   en:"Tangerine",    hex:"#F5671A", hsl:"hsl(25,90%,55%)" },
  { id:3,  name:"앰버",     en:"Amber",        hex:"#F5A008", hsl:"hsl(38,95%,52%)" },
  { id:4,  name:"골드",     en:"Gold",         hex:"#F0C800", hsl:"hsl(52,95%,48%)" },
  { id:5,  name:"라임",     en:"Lime",         hex:"#7AB518", hsl:"hsl(80,70%,42%)" },
  { id:6,  name:"포레스트", en:"Forest",       hex:"#279957", hsl:"hsl(140,60%,38%)" },
  { id:7,  name:"에메랄드", en:"Emerald",      hex:"#18A870", hsl:"hsl(162,72%,40%)" },
  { id:8,  name:"틸",       en:"Teal",         hex:"#0F9DA0", hsl:"hsl(178,75%,38%)" },
  { id:9,  name:"스카이",   en:"Sky",          hex:"#19A3D4", hsl:"hsl(200,80%,50%)" },
  { id:10, name:"코발트",   en:"Cobalt",       hex:"#2B72D8", hsl:"hsl(218,78%,52%)" },
  { id:11, name:"인디고",   en:"Indigo",       hex:"#4B52DB", hsl:"hsl(238,72%,55%)" },
  { id:12, name:"바이올렛", en:"Violet",       hex:"#7048D8", hsl:"hsl(258,68%,56%)" },
  { id:13, name:"퍼플",     en:"Purple",       hex:"#9030C4", hsl:"hsl(278,65%,52%)" },
  { id:14, name:"마젠타",   en:"Magenta",      hex:"#B825B8", hsl:"hsl(298,68%,50%)" },
  { id:15, name:"로즈",     en:"Rose",         hex:"#E82C7A", hsl:"hsl(330,78%,55%)" },
  { id:16, name:"시에나",   en:"Sienna",       hex:"#B5521C", hsl:"hsl(18,60%,44%)" },
  { id:17, name:"올리브",   en:"Olive",        hex:"#8A9B18", hsl:"hsl(68,55%,38%)" },
  { id:18, name:"스틸블루", en:"Steel Blue",   hex:"#3B7EA0", hsl:"hsl(208,45%,45%)" },
  { id:19, name:"슬레이트", en:"Slate",        hex:"#5A5898", hsl:"hsl(248,30%,48%)" },
  { id:20, name:"딥로즈",   en:"Hot Pink",     hex:"#F0324A", hsl:"hsl(348,80%,58%)" },
];
const NAMES = ["김민준","이서연","박지호","최수아","정하은","윤도윤","강나연","임준서","한소희","오태양","신유나","백준혁","류아영","전민서","남윤호","곽다인","황재원","문소율","조현우","송이레"];

function contrast(hex) {
  const r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
  return (0.299*r+0.587*g+0.114*b)/255 > 0.55 ? "#1a1a1a" : "#ffffff";
}

function copyHex(hex) {
  navigator.clipboard?.writeText(hex);
  const t = document.getElementById('toast');
  t.textContent = hex + ' 복사됨 ✓';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1600);
}

// Grid
const grid = document.getElementById('view-grid');
COLORS.forEach((c, i) => {
  const fg = contrast(c.hex);
  const el = document.createElement('div');
  el.className = 'card';
  el.style.cssText = \`background:\${c.hex};box-shadow:0 4px 18px \${c.hex}55\`;
  el.onclick = () => copyHex(c.hex);
  el.innerHTML = \`
    <div class="avatar" style="color:\${fg}">\${NAMES[i][0]}</div>
    <div class="cname" style="color:\${fg}">\${c.name}</div>
    <div class="chex" style="color:\${fg}">\${c.hex}</div>\`;
  grid.appendChild(el);
});

// List
const list = document.getElementById('view-list');
COLORS.forEach((c, i) => {
  const fg = contrast(c.hex);
  const el = document.createElement('div');
  el.className = 'row';
  el.style.setProperty('--c', c.hex);
  el.onclick = () => copyHex(c.hex);
  el.innerHTML = \`
    <div class="num" style="background:\${c.hex};color:\${fg};box-shadow:0 2px 10px \${c.hex}55">\${i+1}</div>
    <div style="flex:1"><div class="rname">\${c.name}</div><div class="ren">\${c.en}</div></div>
    <div class="swatch" style="background:\${c.hex}"></div>
    <div class="rhex">\${c.hex}</div>
    <div class="rhsl">\${c.hsl}</div>\`;
  list.appendChild(el);
});

function switchView(v, btn) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('view-grid').classList.toggle('hidden', v !== 'grid');
  document.getElementById('view-list').classList.toggle('hidden', v !== 'list');
}` },

  { id:'lc-colors', name:'Label Color Palette', nameKo:'라벨 컬러 팔레트', sub:'라벨 & 칩 시스템',
    desc:'Tika 라벨에 쓰는 17색 팔레트. 각 색상의 배경/폰트 HEX와 칩 프리뷰를 카드로 정리했다.',
    deps:'순수 CSS/JS · Tika 디자인 시스템 토큰 스타일시트 공유', head:'', css:LC_CSS,
    html:`  <div class="section">
    <div class="section-title">전체 컬러 팔레트 (17 Colors)</div>
    <div class="color-grid">

      <!-- Preset 6 -->
      <div class="color-card">
        <div class="cc-swatch" style="background:#2b7fff">
          <span class="chip chip-md" style="background:#2b7fff;color:#fff">프론트엔드</span>
        </div>
        <div class="cc-info">
          <div class="cc-name">Frontend</div>
          <div class="cc-hex">BG #2b7fff</div>
          <div class="cc-text-hex">TXT #FFFFFF</div>
        </div>
      </div>

      <div class="color-card">
        <div class="cc-swatch" style="background:#00c950">
          <span class="chip chip-md" style="background:#00c950;color:#fff">백엔드</span>
        </div>
        <div class="cc-info">
          <div class="cc-name">Backend</div>
          <div class="cc-hex">BG #00c950</div>
          <div class="cc-text-hex">TXT #FFFFFF</div>
        </div>
      </div>

      <div class="color-card">
        <div class="cc-swatch" style="background:#ad46ff">
          <span class="chip chip-md" style="background:#ad46ff;color:#fff">디자인</span>
        </div>
        <div class="cc-info">
          <div class="cc-name">Design</div>
          <div class="cc-hex">BG #ad46ff</div>
          <div class="cc-text-hex">TXT #FFFFFF</div>
        </div>
      </div>

      <div class="color-card">
        <div class="cc-swatch" style="background:#fb2c36">
          <span class="chip chip-md" style="background:#fb2c36;color:#fff">버그</span>
        </div>
        <div class="cc-info">
          <div class="cc-name">Bug</div>
          <div class="cc-hex">BG #fb2c36</div>
          <div class="cc-text-hex">TXT #FFFFFF</div>
        </div>
      </div>

      <div class="color-card">
        <div class="cc-swatch" style="background:#ffac6d">
          <span class="chip chip-md" style="background:#ffac6d;color:#3D2200">문서</span>
        </div>
        <div class="cc-info">
          <div class="cc-name">Docs</div>
          <div class="cc-hex">BG #ffac6d</div>
          <div class="cc-text-hex">TXT #3D2200</div>
        </div>
      </div>

      <div class="color-card">
        <div class="cc-swatch" style="background:#615fff">
          <span class="chip chip-md" style="background:#615fff;color:#fff">인프라</span>
        </div>
        <div class="cc-info">
          <div class="cc-name">Infra</div>
          <div class="cc-hex">BG #615fff</div>
          <div class="cc-text-hex">TXT #FFFFFF</div>
        </div>
      </div>

      <!-- Extended 11 -->
      <div class="color-card">
        <div class="cc-swatch" style="background:#ff29d3">
          <span class="chip chip-md" style="background:#ff29d3;color:#fff">마케팅</span>
        </div>
        <div class="cc-info">
          <div class="cc-name">c7 — Hot Pink</div>
          <div class="cc-hex">BG #ff29d3</div>
          <div class="cc-text-hex">TXT #FFFFFF</div>
        </div>
      </div>

      <div class="color-card">
        <div class="cc-swatch" style="background:#a0628c">
          <span class="chip chip-md" style="background:#a0628c;color:#fff">보안</span>
        </div>
        <div class="cc-info">
          <div class="cc-name">c8 — Mauve</div>
          <div class="cc-hex">BG #a0628c</div>
          <div class="cc-text-hex">TXT #FFFFFF</div>
        </div>
      </div>

      <div class="color-card">
        <div class="cc-swatch" style="background:#89d0f0">
          <span class="chip chip-md" style="background:#89d0f0;color:#1A3D4D">리서치</span>
        </div>
        <div class="cc-info">
          <div class="cc-name">c9 — Sky</div>
          <div class="cc-hex">BG #89d0f0</div>
          <div class="cc-text-hex">TXT #1A3D4D</div>
        </div>
      </div>

      <div class="color-card">
        <div class="cc-swatch" style="background:#71e4bf">
          <span class="chip chip-md" style="background:#71e4bf;color:#0A3D2A">QA</span>
        </div>
        <div class="cc-info">
          <div class="cc-name">c10 — Mint</div>
          <div class="cc-hex">BG #71e4bf</div>
          <div class="cc-text-hex">TXT #0A3D2A</div>
        </div>
      </div>

      <div class="color-card">
        <div class="cc-swatch" style="background:#46e264">
          <span class="chip chip-md" style="background:#46e264;color:#0D3A14">테스트</span>
        </div>
        <div class="cc-info">
          <div class="cc-name">c11 — Lime Green</div>
          <div class="cc-hex">BG #46e264</div>
          <div class="cc-text-hex">TXT #0D3A14</div>
        </div>
      </div>

      <div class="color-card">
        <div class="cc-swatch" style="background:#caee68">
          <span class="chip chip-md" style="background:#caee68;color:#3A4200">데이터</span>
        </div>
        <div class="cc-info">
          <div class="cc-name">c12 — Yellow-Green</div>
          <div class="cc-hex">BG #caee68</div>
          <div class="cc-text-hex">TXT #3A4200</div>
        </div>
      </div>

      <div class="color-card">
        <div class="cc-swatch" style="background:#fffe92">
          <span class="chip chip-md" style="background:#fffe92;color:#4A4500">기획</span>
        </div>
        <div class="cc-info">
          <div class="cc-name">c13 — Pale Yellow</div>
          <div class="cc-hex">BG #fffe92</div>
          <div class="cc-text-hex">TXT #4A4500</div>
        </div>
      </div>

      <div class="color-card">
        <div class="cc-swatch" style="background:#f7d1d1">
          <span class="chip chip-md" style="background:#f7d1d1;color:#5C1A1A">검토</span>
        </div>
        <div class="cc-info">
          <div class="cc-name">c14 — Blush</div>
          <div class="cc-hex">BG #f7d1d1</div>
          <div class="cc-text-hex">TXT #5C1A1A</div>
        </div>
      </div>

      <div class="color-card">
        <div class="cc-swatch" style="background:#f7a2ff">
          <span class="chip chip-md" style="background:#f7a2ff;color:#4A0050">이벤트</span>
        </div>
        <div class="cc-info">
          <div class="cc-name">c15 — Lavender Pink</div>
          <div class="cc-hex">BG #f7a2ff</div>
          <div class="cc-text-hex">TXT #4A0050</div>
        </div>
      </div>

      <div class="color-card">
        <div class="cc-swatch" style="background:#c1d1ff">
          <span class="chip chip-md" style="background:#c1d1ff;color:#1A2A5C">배포</span>
        </div>
        <div class="cc-info">
          <div class="cc-name">c16 — Periwinkle</div>
          <div class="cc-hex">BG #c1d1ff</div>
          <div class="cc-text-hex">TXT #1A2A5C</div>
        </div>
      </div>

      <div class="color-card">
        <div class="cc-swatch" style="background:#c5dbdc">
          <span class="chip chip-md" style="background:#c5dbdc;color:#2A3D3E">운영</span>
        </div>
        <div class="cc-info">
          <div class="cc-name">c17 — Sage</div>
          <div class="cc-hex">BG #c5dbdc</div>
          <div class="cc-text-hex">TXT #2A3D3E</div>
        </div>
      </div>

    </div>
  </div>`, js:`` },

  { id:'lc-chip', name:'Chip — Size & State', nameKo:'칩 — 크기 & 상태', sub:'라벨 & 칩 시스템',
    desc:'라벨 칩의 3단계 크기(SM/MD/LG)와 기본·삭제 가능·점 아이콘·아웃라인·연한 배경·비활성 등 상태 변형.',
    deps:'순수 CSS/JS · Tika 디자인 시스템 토큰 스타일시트 공유', head:'', css:LC_CSS,
    html:`  <div class="section">
    <div class="section-title">크기 (Size)</div>

    <div style="display:flex;flex-direction:column;gap:20px">
      <div>
        <div style="font-size:11px;font-weight:600;color:var(--text-muted);margin-bottom:10px">Small — 20px height · 10px font</div>
        <div class="chip-group">
          <span class="chip chip-sm" style="background:#2b7fff;color:#fff">프론트엔드</span>
          <span class="chip chip-sm" style="background:#00c950;color:#fff">백엔드</span>
          <span class="chip chip-sm" style="background:#ad46ff;color:#fff">디자인</span>
          <span class="chip chip-sm" style="background:#fb2c36;color:#fff">버그</span>
          <span class="chip chip-sm" style="background:#ffac6d;color:#3D2200">문서</span>
          <span class="chip chip-sm" style="background:#615fff;color:#fff">인프라</span>
          <span class="chip chip-sm" style="background:#89d0f0;color:#1A3D4D">리서치</span>
        </div>
      </div>

      <div>
        <div style="font-size:11px;font-weight:600;color:var(--text-muted);margin-bottom:10px">Medium — 24px height · 11px font <span style="background:var(--accent-light);color:var(--accent);padding:2px 7px;border-radius:4px;font-size:10px;margin-left:6px">Default</span></div>
        <div class="chip-group">
          <span class="chip chip-md" style="background:#2b7fff;color:#fff">프론트엔드</span>
          <span class="chip chip-md" style="background:#00c950;color:#fff">백엔드</span>
          <span class="chip chip-md" style="background:#ad46ff;color:#fff">디자인</span>
          <span class="chip chip-md" style="background:#fb2c36;color:#fff">버그</span>
          <span class="chip chip-md" style="background:#ffac6d;color:#3D2200">문서</span>
          <span class="chip chip-md" style="background:#615fff;color:#fff">인프라</span>
          <span class="chip chip-md" style="background:#89d0f0;color:#1A3D4D">리서치</span>
        </div>
      </div>

      <div>
        <div style="font-size:11px;font-weight:600;color:var(--text-muted);margin-bottom:10px">Large — 28px height · 12px font</div>
        <div class="chip-group">
          <span class="chip chip-lg" style="background:#2b7fff;color:#fff">프론트엔드</span>
          <span class="chip chip-lg" style="background:#00c950;color:#fff">백엔드</span>
          <span class="chip chip-lg" style="background:#ad46ff;color:#fff">디자인</span>
          <span class="chip chip-lg" style="background:#fb2c36;color:#fff">버그</span>
          <span class="chip chip-lg" style="background:#ffac6d;color:#3D2200">문서</span>
          <span class="chip chip-lg" style="background:#615fff;color:#fff">인프라</span>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">상태 및 변형 (States & Variants)</div>
    <div class="state-grid">

      <!-- Default -->
      <div class="state-card">
        <div class="state-name">기본 (Default)</div>
        <div class="chip-group">
          <span class="chip chip-md" style="background:#2b7fff;color:#fff">프론트엔드</span>
          <span class="chip chip-md" style="background:#71e4bf;color:#0A3D2A">QA</span>
          <span class="chip chip-md" style="background:#fffe92;color:#4A4500">기획</span>
        </div>
      </div>

      <!-- With Remove -->
      <div class="state-card">
        <div class="state-name">삭제 가능 (Removable)</div>
        <div class="chip-group">
          <span class="chip chip-md" style="background:#2b7fff;color:#fff">프론트엔드 <button class="chip-rm" onclick="this.parentElement.remove()">✕</button></span>
          <span class="chip chip-md" style="background:#fb2c36;color:#fff">버그 <button class="chip-rm" onclick="this.parentElement.remove()">✕</button></span>
          <span class="chip chip-md light" style="background:#c1d1ff;color:#1A2A5C">배포 <button class="chip-rm" onclick="this.parentElement.remove()">✕</button></span>
        </div>
      </div>

      <!-- With Dot -->
      <div class="state-card">
        <div class="state-name">점 아이콘 (With Dot)</div>
        <div class="chip-group">
          <span class="chip chip-md" style="background:#2b7fff;color:#fff"><span class="chip-dot"></span>프론트엔드</span>
          <span class="chip chip-md" style="background:#00c950;color:#fff"><span class="chip-dot"></span>백엔드</span>
          <span class="chip chip-md light" style="background:#f7d1d1;color:#5C1A1A"><span class="chip-dot"></span>검토</span>
        </div>
      </div>

      <!-- Outline style -->
      <div class="state-card">
        <div class="state-name">아웃라인 (Outlined)</div>
        <div class="chip-group">
          <span class="chip chip-md" style="background:transparent;color:#2b7fff;border:1.5px solid #2b7fff">프론트엔드</span>
          <span class="chip chip-md" style="background:transparent;color:#fb2c36;border:1.5px solid #fb2c36">버그</span>
          <span class="chip chip-md" style="background:transparent;color:#ad46ff;border:1.5px solid #ad46ff">디자인</span>
        </div>
      </div>

      <!-- Subtle (light bg) style -->
      <div class="state-card">
        <div class="state-name">연한 배경 (Subtle)</div>
        <div class="chip-group">
          <span class="chip chip-md" style="background:#EFF6FF;color:#1D4ED8">프론트엔드</span>
          <span class="chip chip-md" style="background:#F0FDF4;color:#166534">백엔드</span>
          <span class="chip chip-md" style="background:#FDF4FF;color:#7E22CE">디자인</span>
          <span class="chip chip-md" style="background:#FFF7ED;color:#C2410C">문서</span>
        </div>
      </div>

      <!-- Disabled -->
      <div class="state-card">
        <div class="state-name">비활성 (Disabled)</div>
        <div class="chip-group">
          <span class="chip chip-md" style="background:#2b7fff;color:#fff;opacity:.35;cursor:not-allowed;filter:none;transform:none">프론트엔드</span>
          <span class="chip chip-md" style="background:#00c950;color:#fff;opacity:.35;cursor:not-allowed;filter:none;transform:none">백엔드</span>
          <span class="chip chip-md" style="background:#ad46ff;color:#fff;opacity:.35;cursor:not-allowed;filter:none;transform:none">디자인</span>
        </div>
      </div>

    </div>
  </div>`, js:`` },

  { id:'lc-swatch', name:'Swatch Picker', nameKo:'스와치 피커', sub:'라벨 & 칩 시스템',
    desc:'라벨 생성/수정 시 색상 선택 UI. 스와치를 클릭하면 우측 칩 프리뷰(SM/MD/LG)의 색이 실시간으로 바뀐다.',
    deps:'순수 CSS/JS · Tika 디자인 시스템 토큰 스타일시트 공유', head:'', css:LC_CSS,
    html:`  <div class="section">
    <div class="section-title">색상 선택 팔레트 (Swatch Picker)</div>
    <p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">라벨 생성/수정 시 색상 선택 UI에서 사용됩니다. 색상 클릭 시 프리뷰가 업데이트됩니다.</p>

    <div style="display:flex;gap:24px;align-items:flex-start;flex-wrap:wrap">
      <div>
        <div style="font-size:11px;font-weight:600;color:var(--text-muted);margin-bottom:10px">17 Color Swatches</div>
        <div class="swatch-strip" id="swatchStrip">
          <div class="swatch selected" style="background:#fb2c36;color:#fff" onclick="selectSwatch(this,'#fb2c36','#fff')"></div>
          <div class="swatch" style="background:#615fff;color:#fff" onclick="selectSwatch(this,'#615fff','#fff')"></div>
          <div class="swatch" style="background:#00c950;color:#fff" onclick="selectSwatch(this,'#00c950','#fff')"></div>
          <div class="swatch" style="background:#2b7fff;color:#fff" onclick="selectSwatch(this,'#2b7fff','#fff')"></div>
          <div class="swatch" style="background:#ad46ff;color:#fff" onclick="selectSwatch(this,'#ad46ff','#fff')"></div>
          <div class="swatch" style="background:#ff29d3;color:#fff" onclick="selectSwatch(this,'#ff29d3','#fff')"></div>
          <div class="swatch" style="background:#a0628c;color:#fff" onclick="selectSwatch(this,'#a0628c','#fff')"></div>
          <div class="swatch" style="background:#89d0f0;color:#1A3D4D" onclick="selectSwatch(this,'#89d0f0','#1A3D4D')"></div>
          <div class="swatch" style="background:#71e4bf;color:#0A3D2A" onclick="selectSwatch(this,'#71e4bf','#0A3D2A')"></div>
          <div class="swatch" style="background:#46e264;color:#0D3A14" onclick="selectSwatch(this,'#46e264','#0D3A14')"></div>
          <div class="swatch" style="background:#caee68;color:#3A4200" onclick="selectSwatch(this,'#caee68','#3A4200')"></div>
          <div class="swatch" style="background:#fffe92;color:#4A4500" onclick="selectSwatch(this,'#fffe92','#4A4500')"></div>
          <div class="swatch" style="background:#ffac6d;color:#3D2200" onclick="selectSwatch(this,'#ffac6d','#3D2200')"></div>
          <div class="swatch" style="background:#f7d1d1;color:#5C1A1A" onclick="selectSwatch(this,'#f7d1d1','#5C1A1A')"></div>
          <div class="swatch" style="background:#f7a2ff;color:#4A0050" onclick="selectSwatch(this,'#f7a2ff','#4A0050')"></div>
          <div class="swatch" style="background:#c1d1ff;color:#1A2A5C" onclick="selectSwatch(this,'#c1d1ff','#1A2A5C')"></div>
          <div class="swatch" style="background:#c5dbdc;color:#2A3D3E" onclick="selectSwatch(this,'#c5dbdc','#2A3D3E')"></div>
        </div>
      </div>
      <div>
        <div style="font-size:11px;font-weight:600;color:var(--text-muted);margin-bottom:10px">프리뷰</div>
        <div style="display:flex;flex-direction:column;gap:8px">
          <span class="chip chip-sm" id="previewSm" style="background:#fb2c36;color:#fff">라벨 이름</span>
          <span class="chip chip-md" id="previewMd" style="background:#fb2c36;color:#fff">라벨 이름</span>
          <span class="chip chip-lg" id="previewLg" style="background:#fb2c36;color:#fff">라벨 이름 <button class="chip-rm">✕</button></span>
        </div>
      </div>
    </div>
  </div>`, js:`function selectSwatch(el, bg, txt) {
  document.querySelectorAll('#swatchStrip .swatch').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
  ['previewSm','previewMd','previewLg'].forEach(id => {
    const el2 = document.getElementById(id);
    el2.style.background = bg;
    el2.style.color = txt;
  });
}` },

  { id:'lc-ticket', name:'Ticket Card', nameKo:'티켓 카드', sub:'라벨 & 칩 시스템',
    desc:'칩과 우선순위 배지를 조합한 실제 사용 예시. 칸반/이슈 트래커의 티켓 카드 레이아웃.',
    deps:'순수 CSS/JS · Tika 디자인 시스템 토큰 스타일시트 공유', head:'', css:LC_CSS,
    html:`  <div class="section">
    <div class="section-title">사용 예시 — 티켓 카드</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">

      <div class="ticket-mock">
        <div class="ticket-chips">
          <span class="chip chip-sm" style="background:#2b7fff;color:#fff">프론트엔드</span>
          <span class="chip chip-sm" style="background:#ad46ff;color:#fff">디자인</span>
        </div>
        <div class="ticket-title-mock">로그인 화면 UI 구현</div>
        <div class="ticket-footer" style="margin-top:10px">
          <span class="priority-badge" style="background:#FFEDD5;color:#C2410C">↑ 높음</span>
          <span>2월 28일</span>
        </div>
      </div>

      <div class="ticket-mock">
        <div class="ticket-chips">
          <span class="chip chip-sm" style="background:#00c950;color:#fff">백엔드</span>
          <span class="chip chip-sm" style="background:#fb2c36;color:#fff">버그</span>
          <span class="chip chip-sm" style="background:#615fff;color:#fff">인프라</span>
        </div>
        <div class="ticket-title-mock">DB 연결 타임아웃 오류 수정</div>
        <div class="ticket-footer" style="margin-top:10px">
          <span class="priority-badge" style="background:#FEE2E2;color:#DC2626">!! 긴급</span>
          <span style="color:#DC2626">⚠ 2월 22일</span>
        </div>
      </div>

      <div class="ticket-mock">
        <div class="ticket-chips">
          <span class="chip chip-sm" style="background:#89d0f0;color:#1A3D4D">리서치</span>
          <span class="chip chip-sm" style="background:#fffe92;color:#4A4500">기획</span>
        </div>
        <div class="ticket-title-mock">경쟁사 칸반 UX 벤치마킹</div>
        <div class="ticket-footer" style="margin-top:10px">
          <span class="priority-badge" style="background:#FEF9C3;color:#A16207">— 중간</span>
          <span>3월 10일</span>
        </div>
      </div>

      <div class="ticket-mock">
        <div class="ticket-chips">
          <span class="chip chip-sm" style="background:#71e4bf;color:#0A3D2A">QA</span>
          <span class="chip chip-sm" style="background:#ffac6d;color:#3D2200">문서</span>
          <span class="chip chip-sm" style="background:#c1d1ff;color:#1A2A5C">배포</span>
        </div>
        <div class="ticket-title-mock">API 테스트 케이스 작성 및 Swagger 업데이트</div>
        <div class="ticket-footer" style="margin-top:10px">
          <span class="priority-badge" style="background:#F3F4F6;color:#6B7280">↓ 낮음</span>
          <span>3월 15일</span>
        </div>
      </div>

    </div>
  </div>`, js:`` },

  { id:'lc-select', name:'Priority Select', nameKo:'우선순위 Select', sub:'라벨 & 칩 시스템',
    desc:'색상 이모지로 우선순위를 구분하는 네이티브 select. 기본 4단계·확장 팔레트·라벨 색상 연동 3종.',
    deps:'순수 CSS/JS · Tika 디자인 시스템 토큰 스타일시트 공유', head:'', css:LC_CSS,
    html:`  <div class="section">
    <div class="section-title">우선순위 Select (Priority Select)</div>
    <p style="font-size:12px;color:var(--text-muted);margin-bottom:20px">색상 이모지로 우선순위를 직관적으로 구분하는 네이티브 select 컴포넌트입니다.</p>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;align-items:start">

      <!-- 기본 4단계 -->
      <div>
        <div style="font-size:11px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px">기본 4단계</div>
        <select class="meta-select-demo">
          <option value="critical">🔴 긴급 (Critical)</option>
          <option value="high" selected>🟠 높음 (High)</option>
          <option value="medium">🟡 중간 (Medium)</option>
          <option value="low">⚪ 낮음 (Low)</option>
        </select>
        <div style="margin-top:10px;display:flex;flex-direction:column;gap:5px">
          <div class="sel-opt-preview"><span>🔴</span><span class="sel-opt-label">긴급</span><span class="sel-opt-hex">#DC2626</span></div>
          <div class="sel-opt-preview"><span>🟠</span><span class="sel-opt-label">높음</span><span class="sel-opt-hex">#C2410C</span></div>
          <div class="sel-opt-preview"><span>🟡</span><span class="sel-opt-label">중간</span><span class="sel-opt-hex">#A16207</span></div>
          <div class="sel-opt-preview"><span>⚪</span><span class="sel-opt-label">낮음</span><span class="sel-opt-hex">#6B7280</span></div>
        </div>
      </div>

      <!-- 확장 — 원형 이모지 팔레트 -->
      <div>
        <div style="font-size:11px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px">확장 색상 팔레트</div>
        <select class="meta-select-demo">
          <option value="c1">🔴 빨강</option>
          <option value="c2">🟠 주황</option>
          <option value="c3">🟡 노랑</option>
          <option value="c4">🟢 초록</option>
          <option value="c5">🔵 파랑</option>
          <option value="c6">🟣 보라</option>
          <option value="c7">🟤 갈색</option>
          <option value="c8">⚫ 검정</option>
          <option value="c9" selected>⚪ 흰색</option>
          <option value="c10">🔶 진한주황</option>
          <option value="c11">🔷 진한파랑</option>
          <option value="c12">🔸 연한주황</option>
          <option value="c13">🔹 연한파랑</option>
          <option value="c14">🟥 빨강사각</option>
          <option value="c15">🟧 주황사각</option>
          <option value="c16">🟨 노랑사각</option>
          <option value="c17">🟩 초록사각</option>
          <option value="c18">🟦 파랑사각</option>
          <option value="c19">🟪 보라사각</option>
          <option value="c20">🟫 갈색사각</option>
        </select>
        <div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:4px">
          <span style="font-size:20px" title="🔴 빨강">🔴</span>
          <span style="font-size:20px" title="🟠 주황">🟠</span>
          <span style="font-size:20px" title="🟡 노랑">🟡</span>
          <span style="font-size:20px" title="🟢 초록">🟢</span>
          <span style="font-size:20px" title="🔵 파랑">🔵</span>
          <span style="font-size:20px" title="🟣 보라">🟣</span>
          <span style="font-size:20px" title="🟤 갈색">🟤</span>
          <span style="font-size:20px" title="⚫ 검정">⚫</span>
          <span style="font-size:20px" title="⚪ 흰색">⚪</span>
          <span style="font-size:20px" title="🔶 진한주황">🔶</span>
          <span style="font-size:20px" title="🔷 진한파랑">🔷</span>
          <span style="font-size:20px" title="🔸 연한주황">🔸</span>
          <span style="font-size:20px" title="🔹 연한파랑">🔹</span>
          <span style="font-size:20px" title="🟥">🟥</span>
          <span style="font-size:20px" title="🟧">🟧</span>
          <span style="font-size:20px" title="🟨">🟨</span>
          <span style="font-size:20px" title="🟩">🟩</span>
          <span style="font-size:20px" title="🟦">🟦</span>
          <span style="font-size:20px" title="🟪">🟪</span>
          <span style="font-size:20px" title="🟫">🟫</span>
        </div>
      </div>

      <!-- 라벨 색상 연동 -->
      <div>
        <div style="font-size:11px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px">라벨 색상 연동</div>
        <select class="meta-select-demo">
          <option value="fe">🔵 프론트엔드</option>
          <option value="be">🟢 백엔드</option>
          <option value="ui">🟣 디자인</option>
          <option value="bug" selected>🔴 버그</option>
          <option value="doc">🟠 문서</option>
          <option value="inf">🟣 인프라</option>
          <option value="c7">🟣 마케팅</option>
          <option value="c8">🟤 보안</option>
          <option value="c9">🔵 리서치</option>
          <option value="c10">🟢 QA</option>
          <option value="c11">🟢 테스트</option>
          <option value="c12">🟡 데이터</option>
          <option value="c13">🟡 기획</option>
          <option value="c14">🔴 검토</option>
          <option value="c15">🟣 이벤트</option>
          <option value="c16">🔵 배포</option>
          <option value="c17">⚪ 운영</option>
        </select>
        <div style="margin-top:10px;display:flex;flex-direction:column;gap:5px">
          <div class="sel-opt-preview"><span>🔵</span><span class="sel-opt-label">프론트엔드</span><span class="sel-opt-hex">#2b7fff</span></div>
          <div class="sel-opt-preview"><span>🟢</span><span class="sel-opt-label">백엔드</span><span class="sel-opt-hex">#00c950</span></div>
          <div class="sel-opt-preview"><span>🟣</span><span class="sel-opt-label">디자인</span><span class="sel-opt-hex">#ad46ff</span></div>
          <div class="sel-opt-preview"><span>🔴</span><span class="sel-opt-label">버그</span><span class="sel-opt-hex">#fb2c36</span></div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:2px">+ 13개 더…</div>
        </div>
      </div>

    </div>
  </div>`, js:`` },

  { id:'lc-token', name:'Token Reference', nameKo:'토큰 레퍼런스 테이블', sub:'라벨 & 칩 시스템',
    desc:'라벨 색상 토큰(배경/폰트 HEX + CSS Key)을 표로 정리한 COLOR.json 레퍼런스.',
    deps:'순수 CSS/JS · Tika 디자인 시스템 토큰 스타일시트 공유', head:'', css:LC_CSS,
    html:`  <div class="section">
    <div class="section-title">토큰 레퍼런스 (COLOR.json)</div>
    <table class="token-table">
      <thead>
        <tr>
          <th>라벨명</th>
          <th>배경색</th>
          <th>폰트색</th>
          <th>프리뷰</th>
          <th>CSS Key</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>프론트엔드</td><td><span class="swatch-sm" style="background:#2b7fff"></span><span class="mono">#2b7fff</span></td><td><span class="swatch-sm" style="background:#FFFFFF;border:1px solid #ddd"></span><span class="mono">#FFFFFF</span></td><td><span class="chip chip-sm" style="background:#2b7fff;color:#fff">Frontend</span></td><td><span class="mono">fe</span></td></tr>
        <tr><td>백엔드</td><td><span class="swatch-sm" style="background:#00c950"></span><span class="mono">#00c950</span></td><td><span class="swatch-sm" style="background:#FFFFFF;border:1px solid #ddd"></span><span class="mono">#FFFFFF</span></td><td><span class="chip chip-sm" style="background:#00c950;color:#fff">Backend</span></td><td><span class="mono">be</span></td></tr>
        <tr><td>디자인</td><td><span class="swatch-sm" style="background:#ad46ff"></span><span class="mono">#ad46ff</span></td><td><span class="swatch-sm" style="background:#FFFFFF;border:1px solid #ddd"></span><span class="mono">#FFFFFF</span></td><td><span class="chip chip-sm" style="background:#ad46ff;color:#fff">Design</span></td><td><span class="mono">ui</span></td></tr>
        <tr><td>버그</td><td><span class="swatch-sm" style="background:#fb2c36"></span><span class="mono">#fb2c36</span></td><td><span class="swatch-sm" style="background:#FFFFFF;border:1px solid #ddd"></span><span class="mono">#FFFFFF</span></td><td><span class="chip chip-sm" style="background:#fb2c36;color:#fff">Bug</span></td><td><span class="mono">bug</span></td></tr>
        <tr><td>문서</td><td><span class="swatch-sm" style="background:#ffac6d"></span><span class="mono">#ffac6d</span></td><td><span class="swatch-sm" style="background:#3D2200"></span><span class="mono">#3D2200</span></td><td><span class="chip chip-sm" style="background:#ffac6d;color:#3D2200">Docs</span></td><td><span class="mono">doc</span></td></tr>
        <tr><td>인프라</td><td><span class="swatch-sm" style="background:#615fff"></span><span class="mono">#615fff</span></td><td><span class="swatch-sm" style="background:#FFFFFF;border:1px solid #ddd"></span><span class="mono">#FFFFFF</span></td><td><span class="chip chip-sm" style="background:#615fff;color:#fff">Infra</span></td><td><span class="mono">inf</span></td></tr>
        <tr><td>—</td><td><span class="swatch-sm" style="background:#ff29d3"></span><span class="mono">#ff29d3</span></td><td><span class="swatch-sm" style="background:#FFFFFF;border:1px solid #ddd"></span><span class="mono">#FFFFFF</span></td><td><span class="chip chip-sm" style="background:#ff29d3;color:#fff">c7</span></td><td><span class="mono">c7</span></td></tr>
        <tr><td>—</td><td><span class="swatch-sm" style="background:#a0628c"></span><span class="mono">#a0628c</span></td><td><span class="swatch-sm" style="background:#FFFFFF;border:1px solid #ddd"></span><span class="mono">#FFFFFF</span></td><td><span class="chip chip-sm" style="background:#a0628c;color:#fff">c8</span></td><td><span class="mono">c8</span></td></tr>
        <tr><td>—</td><td><span class="swatch-sm" style="background:#89d0f0"></span><span class="mono">#89d0f0</span></td><td><span class="swatch-sm" style="background:#1A3D4D"></span><span class="mono">#1A3D4D</span></td><td><span class="chip chip-sm" style="background:#89d0f0;color:#1A3D4D">c9</span></td><td><span class="mono">c9</span></td></tr>
        <tr><td>—</td><td><span class="swatch-sm" style="background:#71e4bf"></span><span class="mono">#71e4bf</span></td><td><span class="swatch-sm" style="background:#0A3D2A"></span><span class="mono">#0A3D2A</span></td><td><span class="chip chip-sm" style="background:#71e4bf;color:#0A3D2A">c10</span></td><td><span class="mono">c10</span></td></tr>
        <tr><td>—</td><td><span class="swatch-sm" style="background:#46e264"></span><span class="mono">#46e264</span></td><td><span class="swatch-sm" style="background:#0D3A14"></span><span class="mono">#0D3A14</span></td><td><span class="chip chip-sm" style="background:#46e264;color:#0D3A14">c11</span></td><td><span class="mono">c11</span></td></tr>
        <tr><td>—</td><td><span class="swatch-sm" style="background:#caee68"></span><span class="mono">#caee68</span></td><td><span class="swatch-sm" style="background:#3A4200"></span><span class="mono">#3A4200</span></td><td><span class="chip chip-sm" style="background:#caee68;color:#3A4200">c12</span></td><td><span class="mono">c12</span></td></tr>
        <tr><td>—</td><td><span class="swatch-sm" style="background:#fffe92"></span><span class="mono">#fffe92</span></td><td><span class="swatch-sm" style="background:#4A4500"></span><span class="mono">#4A4500</span></td><td><span class="chip chip-sm" style="background:#fffe92;color:#4A4500">c13</span></td><td><span class="mono">c13</span></td></tr>
        <tr><td>—</td><td><span class="swatch-sm" style="background:#f7d1d1"></span><span class="mono">#f7d1d1</span></td><td><span class="swatch-sm" style="background:#5C1A1A"></span><span class="mono">#5C1A1A</span></td><td><span class="chip chip-sm" style="background:#f7d1d1;color:#5C1A1A">c14</span></td><td><span class="mono">c14</span></td></tr>
        <tr><td>—</td><td><span class="swatch-sm" style="background:#f7a2ff"></span><span class="mono">#f7a2ff</span></td><td><span class="swatch-sm" style="background:#4A0050"></span><span class="mono">#4A0050</span></td><td><span class="chip chip-sm" style="background:#f7a2ff;color:#4A0050">c15</span></td><td><span class="mono">c15</span></td></tr>
        <tr><td>—</td><td><span class="swatch-sm" style="background:#c1d1ff"></span><span class="mono">#c1d1ff</span></td><td><span class="swatch-sm" style="background:#1A2A5C"></span><span class="mono">#1A2A5C</span></td><td><span class="chip chip-sm" style="background:#c1d1ff;color:#1A2A5C">c16</span></td><td><span class="mono">c16</span></td></tr>
        <tr><td>—</td><td><span class="swatch-sm" style="background:#c5dbdc"></span><span class="mono">#c5dbdc</span></td><td><span class="swatch-sm" style="background:#2A3D3E"></span><span class="mono">#2A3D3E</span></td><td><span class="chip chip-sm" style="background:#c5dbdc;color:#2A3D3E">c17</span></td><td><span class="mono">c17</span></td></tr>
      </tbody>
    </table>
  </div>`, js:`` },

  { id:'lc-badge', name:'Priority Badge', nameKo:'우선순위 배지', sub:'라벨 & 칩 시스템',
    desc:'아이콘+텍스트로 긴급/높음/중간/낮음을 표현하는 우선순위 배지. 크기별·아이콘 단독 변형 포함.',
    deps:'순수 CSS/JS · Tika 디자인 시스템 토큰 스타일시트 공유', head:'', css:LC_CSS,
    html:`  <div class="section">
    <div class="section-title">우선순위 배지 (Priority Badge)</div>
    <!-- 4종 카드 그리드 -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:28px">

      <!-- Critical -->
      <div class="color-card">
        <div class="cc-swatch" style="background:#FEE2E2;gap:8px">
          <span class="priority-icon-demo" style="color:#DC2626">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 9v4"/><path d="M12 17h.01"/>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            </svg>
          </span>
          <span class="priority-badge-demo" style="background:#FEE2E2;color:#DC2626">긴급</span>
        </div>
        <div class="cc-info">
          <div class="cc-name">Critical · 긴급</div>
          <div class="cc-hex">BG #FEE2E2</div>
          <div class="cc-text-hex">TXT #DC2626</div>
        </div>
      </div>

      <!-- High -->
      <div class="color-card">
        <div class="cc-swatch" style="background:#FFEDD5;gap:8px">
          <span class="priority-icon-demo" style="color:#C2410C">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="m18 15-6-6-6 6"/>
            </svg>
          </span>
          <span class="priority-badge-demo" style="background:#FFEDD5;color:#C2410C">높음</span>
        </div>
        <div class="cc-info">
          <div class="cc-name">High · 높음</div>
          <div class="cc-hex">BG #FFEDD5</div>
          <div class="cc-text-hex">TXT #C2410C</div>
        </div>
      </div>

      <!-- Medium -->
      <div class="color-card">
        <div class="cc-swatch" style="background:#FEF9C3;gap:8px">
          <span class="priority-icon-demo" style="color:#A16207">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"/>
            </svg>
          </span>
          <span class="priority-badge-demo" style="background:#FEF9C3;color:#A16207">중간</span>
        </div>
        <div class="cc-info">
          <div class="cc-name">Medium · 중간</div>
          <div class="cc-hex">BG #FEF9C3</div>
          <div class="cc-text-hex">TXT #A16207</div>
        </div>
      </div>

      <!-- Low -->
      <div class="color-card">
        <div class="cc-swatch" style="background:#F3F4F6;gap:8px">
          <span class="priority-icon-demo" style="color:#6B7280">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </span>
          <span class="priority-badge-demo" style="background:#F3F4F6;color:#6B7280">낮음</span>
        </div>
        <div class="cc-info">
          <div class="cc-name">Low · 낮음</div>
          <div class="cc-hex">BG #F3F4F6</div>
          <div class="cc-text-hex">TXT #6B7280</div>
        </div>
      </div>

    </div>

    <!-- 크기별 배지 -->
    <div style="font-size:11px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:14px">크기별 프리뷰</div>
    <div style="display:flex;flex-direction:column;gap:16px">

      <div>
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px">Small — 20px</div>
        <div class="chip-group">
          <span class="pbadge pbadge-sm" style="background:#FEE2E2;color:#DC2626">
            <svg class="picon" viewBox="0 0 24 24"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
            긴급
          </span>
          <span class="pbadge pbadge-sm" style="background:#FFEDD5;color:#C2410C">
            <svg class="picon" viewBox="0 0 24 24"><path d="m18 15-6-6-6 6"/></svg>
            높음
          </span>
          <span class="pbadge pbadge-sm" style="background:#FEF9C3;color:#A16207">
            <svg class="picon" viewBox="0 0 24 24"><path d="M5 12h14"/></svg>
            중간
          </span>
          <span class="pbadge pbadge-sm" style="background:#F3F4F6;color:#6B7280">
            <svg class="picon" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
            낮음
          </span>
        </div>
      </div>

      <div>
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px">Medium — 24px <span style="background:var(--accent-light);color:var(--accent);padding:2px 7px;border-radius:4px;font-size:10px;margin-left:6px">Default</span></div>
        <div class="chip-group">
          <span class="pbadge pbadge-md" style="background:#FEE2E2;color:#DC2626">
            <svg class="picon" viewBox="0 0 24 24"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
            긴급
          </span>
          <span class="pbadge pbadge-md" style="background:#FFEDD5;color:#C2410C">
            <svg class="picon" viewBox="0 0 24 24"><path d="m18 15-6-6-6 6"/></svg>
            높음
          </span>
          <span class="pbadge pbadge-md" style="background:#FEF9C3;color:#A16207">
            <svg class="picon" viewBox="0 0 24 24"><path d="M5 12h14"/></svg>
            중간
          </span>
          <span class="pbadge pbadge-md" style="background:#F3F4F6;color:#6B7280">
            <svg class="picon" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
            낮음
          </span>
        </div>
      </div>

      <div>
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px">Large — 28px</div>
        <div class="chip-group">
          <span class="pbadge pbadge-lg" style="background:#FEE2E2;color:#DC2626">
            <svg class="picon" viewBox="0 0 24 24"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
            긴급
          </span>
          <span class="pbadge pbadge-lg" style="background:#FFEDD5;color:#C2410C">
            <svg class="picon" viewBox="0 0 24 24"><path d="m18 15-6-6-6 6"/></svg>
            높음
          </span>
          <span class="pbadge pbadge-lg" style="background:#FEF9C3;color:#A16207">
            <svg class="picon" viewBox="0 0 24 24"><path d="M5 12h14"/></svg>
            중간
          </span>
          <span class="pbadge pbadge-lg" style="background:#F3F4F6;color:#6B7280">
            <svg class="picon" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
            낮음
          </span>
        </div>
      </div>

    </div>

    <!-- 아이콘 단독 -->
    <div style="margin-top:24px">
      <div style="font-size:11px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:12px">아이콘 단독 (Icon Only)</div>
      <div class="chip-group" style="gap:6px">
        <span class="picon-only" style="background:#FEE2E2;color:#DC2626" title="긴급">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
        </span>
        <span class="picon-only" style="background:#FFEDD5;color:#C2410C" title="높음">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
        </span>
        <span class="picon-only" style="background:#FEF9C3;color:#A16207" title="중간">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
        </span>
        <span class="picon-only" style="background:#F3F4F6;color:#6B7280" title="낮음">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </span>
      </div>
    </div>
  </div>`, js:`` },

];
})();
