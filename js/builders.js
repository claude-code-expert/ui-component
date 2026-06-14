/* ──────────────────────────────────────────────────────────────
   builders.js — standalone 문서 빌더 (단일 출처)
   preview(iframe srcdoc) === download(.html) === copy-all 의 근거.
   각 item.build()가 여기서 정의한 docPage/alertPage를 호출한다.
   순수 헬퍼이므로 데이터·CSS는 인자로 주입받는다(클로저 의존 없음).
────────────────────────────────────────────────────────────── */
window.UIKIT = window.UIKIT || {};
UIKIT.builders = (function(){
  'use strict';
  var FONTS = '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+KR:wght@400;500;700&display=swap" rel="stylesheet">';

  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function fnBody(fn){ var s = fn.toString(); return s.slice(s.indexOf('{')+1, s.lastIndexOf('}')).replace(/^\n+/,'').replace(/\s+$/,''); }

  // ---- standalone document builders (preview === download === copy-all) ----
  function docPage(o){
    o = o || {};
    return [
      '<!doctype html>','<html lang="ko">','<head>','<meta charset="utf-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
      FONTS, (o.head||''),
      (o.css ? '<style>\n'+o.css+'\n</style>' : ''),
      '<style>html,body{margin:0}body{padding:28px;font-family:Inter,"Noto Sans KR",system-ui,sans-serif;background:#ffffff;color:#0f172a}</style>',
      '</head>','<body>', (o.body||''),
      (o.js ? '<script>\n'+o.js+'\n<\/script>' : ''),
      '</body>','</html>'
    ].join('\n');
  }

  function alertPage(k, ALERT_DEMOS, ALERT_CSS){
    var d = ALERT_DEMOS[k];
    var fns = [];
    for (var key in d){ if (typeof d[key] === 'function') fns.push(d[key].toString()); }
    var demosSrc = "const demos = { '"+k+"': {\n      "+fns.join(',\n      ')+"\n    } };";
    return [
      '<!doctype html>','<html lang="ko">','<head>','<meta charset="utf-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
      FONTS, '<style>\n'+ALERT_CSS+'\n</style>',
      '<style>html,body{margin:0}.main{padding:0}.demo-area{margin:0}</style>',
      '</head>','<body>',
      '<main class="main"><div class="demo-area">',
      '<div class="demo-toolbar"><div class="demo-dot"></div><div class="demo-dot"></div><div class="demo-dot"></div><div class="demo-url">'+(d.url||'preview')+'</div></div>',
      '<div class="demo-body" id="demoBody"></div>',
      '</div></main>',
      '<script>\n'+demosSrc+'\ndemos[\''+k+'\'].render(document.getElementById(\'demoBody\'));\n<\/script>',
      '</body>','</html>'
    ].join('\n');
  }

  return { esc:esc, fnBody:fnBody, FONTS:FONTS, docPage:docPage, alertPage:alertPage };
})();
