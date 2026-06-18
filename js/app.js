(function(){
  'use strict';
  var B = UIKIT.builders;
  var esc = B.esc, fnBody = B.fnBody, docPage = B.docPage, alertPage = B.alertPage;
  var UIXBASE = UIKIT.uixbase, ALERT_DEMOS = UIKIT.feedback;
  var ALERT_CSS = UIKIT.alertCss;
  var TW = 'https://cdn.tailwindcss.com';
  var LU = 'https://unpkg.com/lucide@latest';

  // ---- normalize all sources into one item list ----
  var items = [];

  // 1) Tailwind / Lucide set
  UIXBASE.forEach(function(c){
    var jsBody = c.script ? fnBody(c.script) : '';
    items.push({
      group:'tailwind', sub:'Tailwind + Lucide',
      key:'t-'+c.id, name:c.name, nameKo:'', desc:c.desc||'',
      htmlSrc:c.html||'',
      cssSrc:(c.css && c.css.trim()) ? c.css.trim() : '/* Tailwind 유틸리티 클래스만 사용 — 별도 CSS 불필요 */',
      jsSrc:(jsBody ? jsBody+'\n\n' : '') + 'lucide.createIcons(); // 아이콘 렌더',
      deps:'Tailwind CSS + Lucide (CDN 자동 포함)',
      build:function(){
        return docPage({
          head:'<script src="'+TW+'"><\/script>\n<script src="'+LU+'"><\/script>',
          body:this.htmlSrc,
          js:(jsBody ? jsBody+'\n' : '') + 'lucide.createIcons();'
        });
      }
    });
  });

  // 2) Feedback / alert patterns (engine-driven, no deps)
  Object.keys(ALERT_DEMOS).forEach(function(k){
    var d = ALERT_DEMOS[k];
    var tmp = document.createElement('div');
    try { d.render(tmp); } catch(e){}
    var markup = tmp.innerHTML.trim();
    var fnsrc = [];
    for (var key in d){ if (typeof d[key] === 'function') fnsrc.push('// ['+k+'] '+key+'\n'+d[key].toString()); }
    items.push({
      group:'alert', sub:'Feedback & Notification',
      key:'a-'+k, name:d.title, nameKo:'', desc:d.desc||'',
      htmlSrc:'<!-- 트리거 + 컨테이너 마크업. 아래 JS(엔진)와 함께 동작합니다 -->\n'+markup,
      cssSrc:ALERT_CSS,
      jsSrc:fnsrc.join('\n\n'),
      deps:'순수 CSS/JS (의존성 없음) — 아래 CSS와 JS 엔진을 함께 사용',
      build:function(){ return alertPage(k, ALERT_DEMOS, ALERT_CSS); }
    });
  });

  // 3) 공통 모달 시스템 (순수 CSS/JS, 의존성 없음)
  (UIKIT.modals || []).forEach(function(c){
    items.push({
      group:'modal', sub:'공통 모달 시스템',
      key:'m-'+c.id, name:c.name, nameKo:c.nameKo||'', desc:c.desc||'',
      htmlSrc:c.html||'', cssSrc:c.css||'', jsSrc:c.js||'',
      deps:'순수 CSS/JS (의존성 없음) — 트리거+컨테이너+엔진이 한 벌',
      build:function(){ return docPage({ css:this.cssSrc, body:this.htmlSrc, js:this.jsSrc }); }
    });
  });

  // 4) 프로토타입 / 디자인 시스템 (순수 CSS/JS) — head로 폰트 등 주입 가능
  (UIKIT.prototypes || []).forEach(function(c){
    items.push({
      group:'prototype', sub:c.sub||'프로토타입',
      key:'p-'+c.id, name:c.name, nameKo:c.nameKo||'', desc:c.desc||'',
      htmlSrc:c.html||'', cssSrc:c.css||'', jsSrc:c.js||'', headSrc:c.head||'',
      deps:c.deps||'순수 CSS/JS (의존성 없음)',
      build:function(){ return docPage({ head:this.headSrc, css:this.cssSrc, body:this.htmlSrc, js:this.jsSrc }); }
    });
  });

  // ---- sidebar ----
  var GROUPS = [
    { id:'tailwind', label:'기본 컴포넌트 · Tailwind + Lucide', tag:'32', icon:'wind' },
    { id:'modal',    label:'공통 모달 시스템', tag:'6', icon:'layers' },
    { id:'alert',    label:'피드백 · 알림 패턴 (다이얼로그 외)', tag:'10', icon:'bell' },
    { id:'prototype', label:'프로토타입 · 디자인 시스템', tag:'9', icon:'palette' }
  ];
  var menu = document.getElementById('uk-menu');
  var current = null;

  // lucide 아이콘 렌더 — 마크업을 새로 주입한 직후 호출(미변환 [data-lucide]만 SVG로 교체)
  function renderIcons(){ if (window.lucide && lucide.createIcons) lucide.createIcons(); }

  function buildMenu(query){
    query = (query||'').trim().toLowerCase();
    menu.innerHTML = '';
    GROUPS.forEach(function(g){
      var list = items.filter(function(it){
        if (it.group !== g.id) return false;
        if (!query) return true;
        return (it.name+' '+it.nameKo+' '+it.sub).toLowerCase().indexOf(query) >= 0;
      });
      if (!list.length) return;
      var gh = document.createElement('div');
      gh.className = 'uk-group';
      gh.innerHTML = (g.icon?'<i data-lucide="'+g.icon+'"></i>':'')+'<span>'+esc(g.label)+'</span><span class="uk-group-tag">'+list.length+'</span>';
      menu.appendChild(gh);
      list.forEach(function(it){
        var b = document.createElement('button');
        b.className = 'uk-item' + (current && current.key === it.key ? ' active' : '');
        b.dataset.key = it.key;
        b.innerHTML = '<span class="uk-item-name">'+esc(it.name)+'</span>'+(it.nameKo?'<span class="uk-item-ko">'+esc(it.nameKo)+'</span>':'');
        b.addEventListener('click', function(){ openItem(it.key); });
        menu.appendChild(b);
      });
    });
    renderIcons();
  }

  // ---- main view ----
  var view = document.getElementById('uk-view');
  var activeTab = 'preview';

  function openItem(key){
    var it = items.filter(function(x){ return x.key === key; })[0];
    if (!it) return;
    current = it;
    activeTab = 'preview';
    Array.prototype.forEach.call(menu.querySelectorAll('.uk-item'), function(b){
      b.classList.toggle('active', b.dataset.key === key);
    });
    var groupLabel = (GROUPS.filter(function(g){return g.id===it.group;})[0]||{}).label || '';
    view.innerHTML =
      '<div class="uk-head">'
      + '<div class="uk-crumb">'+esc(groupLabel)+'<i data-lucide="chevron-right" class="uk-crumb-sep"></i>'+esc(it.sub)+'</div>'
      + '<div class="uk-title-row"><h1>'+esc(it.name)+'</h1>'+(it.nameKo?'<span class="uk-title-ko">'+esc(it.nameKo)+'</span>':'')+'</div>'
      + '<p class="uk-desc">'+esc(it.desc)+'</p>'
      + (it.deps?'<div class="uk-deps"><i data-lucide="link-2" class="uk-deps-ic"></i>'+esc(it.deps)+'</div>':'')
      + '<div class="uk-actions">'
      +   '<button class="uk-btn primary" id="uk-dl"><i data-lucide="download"></i> 전체 .html 다운로드</button>'
      +   '<button class="uk-btn" id="uk-copyall"><i data-lucide="clipboard-list"></i> <span class="lbl">전체 코드 복사</span></button>'
      + '</div>'
      + '</div>'
      + '<div class="uk-tabs">'
      +   '<button class="uk-tab active" data-tab="preview">Preview</button>'
      +   '<button class="uk-tab" data-tab="html">HTML</button>'
      +   '<button class="uk-tab" data-tab="css">CSS</button>'
      +   '<button class="uk-tab" data-tab="js">JS</button>'
      + '</div>'
      + '<div class="uk-panels">'
      +   '<div class="uk-panel active" data-panel="preview"><div class="uk-preview" id="uk-preview"></div></div>'
      +   '<div class="uk-panel" data-panel="html"><div class="uk-code"><button class="uk-copy" data-c="html"><i data-lucide="copy"></i><span class="lbl">복사</span></button><pre><code class="language-markup">'+esc(it.htmlSrc)+'</code></pre></div></div>'
      +   '<div class="uk-panel" data-panel="css"><div class="uk-code"><button class="uk-copy" data-c="css"><i data-lucide="copy"></i><span class="lbl">복사</span></button><pre><code class="language-css">'+esc(it.cssSrc)+'</code></pre></div></div>'
      +   '<div class="uk-panel" data-panel="js"><div class="uk-code"><button class="uk-copy" data-c="js"><i data-lucide="copy"></i><span class="lbl">복사</span></button><pre><code class="language-javascript">'+esc(it.jsSrc||'/* JS 없음 */')+'</code></pre></div></div>'
      + '</div>';

    document.getElementById('uk-preview').appendChild(makeFrame(it));

    // 코드 패널 구문 강조(표시 전용) — 복사/다운로드는 raw 소스에서 읽으므로 영향 없음.
    if (window.Prism && Prism.highlightElement) view.querySelectorAll('pre code[class*="language-"]').forEach(function(el){ Prism.highlightElement(el); });

    renderIcons(); // 헤더/탭/액션의 lucide 아이콘 렌더

    Array.prototype.forEach.call(view.querySelectorAll('.uk-tab'), function(t){
      t.addEventListener('click', function(){
        activeTab = t.dataset.tab;
        Array.prototype.forEach.call(view.querySelectorAll('.uk-tab'), function(x){ x.classList.remove('active'); });
        Array.prototype.forEach.call(view.querySelectorAll('.uk-panel'), function(p){ p.classList.remove('active'); });
        t.classList.add('active');
        view.querySelector('[data-panel="'+activeTab+'"]').classList.add('active');
      });
    });
    Array.prototype.forEach.call(view.querySelectorAll('.uk-copy'), function(btn){
      btn.addEventListener('click', function(){
        var map = { html:it.htmlSrc, css:it.cssSrc, js:it.jsSrc };
        copy(map[btn.dataset.c]||'', btn);
      });
    });
    document.getElementById('uk-dl').addEventListener('click', function(){ download(it); });
    document.getElementById('uk-copyall').addEventListener('click', function(e){ copy(it.build(), e.currentTarget); });
  }

  function makeFrame(it){
    var ifr = document.createElement('iframe');
    ifr.className = 'uk-frame';
    ifr.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-modals allow-popups allow-forms');
    ifr.srcdoc = it.build();
    function fit(){ try { var h = ifr.contentDocument.body.scrollHeight; if (h > 40) ifr.style.height = Math.min(Math.max(h + 36, 380), 980) + 'px'; } catch(e){} }
    ifr.addEventListener('load', function(){ fit(); setTimeout(fit, 400); setTimeout(fit, 1000); });
    return ifr;
  }

  function copy(text, btn){
    // 라벨 span(.lbl)이 있으면 그 텍스트만 토글해 아이콘(svg)을 보존, 없으면 버튼 전체 텍스트 토글
    var lbl = btn ? (btn.querySelector('.lbl') || btn) : null;
    var done = function(){ if(!lbl) return; var o = lbl.textContent; lbl.textContent = '복사됨!'; btn.classList.add('ok'); setTimeout(function(){ lbl.textContent = o; btn.classList.remove('ok'); }, 1400); };
    if (navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(done, function(){ fallback(text); done(); });
    } else { fallback(text); done(); }
  }
  function fallback(text){ var ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); try{ document.execCommand('copy'); }catch(e){} document.body.removeChild(ta); }

  function download(it){
    var blob = new Blob([it.build()], { type:'text/html;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = it.key + '.html';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
  }

  // ---- search ----
  var search = document.getElementById('uk-search');
  search.addEventListener('input', function(){ buildMenu(search.value); });

  // ---- boot ----
  buildMenu('');
  openItem(items[0].key);
})();
