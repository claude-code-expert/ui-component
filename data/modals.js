/* ──────────────────────────────────────────────────────────────
   modals.js — 공통 모달 시스템 6종 (순수 CSS/JS, 의존성 없음)
   경고 · 확인 · 알림 · 토스트 · 스낵바 · 바텀시트.
   각 항목은 트리거 + 컨테이너 + 엔진 JS가 한 벌인 자기완결형이라
   복사해서 그대로 붙여넣으면 동작한다. (클래스 접두사로 충돌 예방)
────────────────────────────────────────────────────────────── */
window.UIKIT = window.UIKIT || {};
UIKIT.modals = [

  /* ── 1. 경고 (Alert) ── */
  { id:'alert', name:'Alert', nameKo:'경고',
    desc:'단일 메시지를 사용자에게 확인시키는 차단형 다이얼로그. 확인 버튼·ESC·배경 클릭으로 닫는다. 결과 분기가 없는 “알리고 끝”인 경우에 쓴다.',
    html:`<button class="al-open">경고 모달 열기</button>
<div class="al-backdrop" id="al-bd">
  <div class="al-box" role="alertdialog" aria-modal="true" aria-labelledby="al-title" aria-describedby="al-desc">
    <div class="al-icon">!</div>
    <h3 class="al-title" id="al-title">저장하지 못했습니다</h3>
    <p class="al-text" id="al-desc">네트워크 연결을 확인한 뒤 다시 시도해주세요.</p>
    <div class="al-actions"><button class="al-ok">확인</button></div>
  </div>
</div>`,
    css:`.al-open{background:#6366f1;color:#fff;border:none;padding:9px 16px;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit}
.al-backdrop{display:none;position:fixed;inset:0;background:rgba(15,23,42,.45);align-items:center;justify-content:center;padding:20px;z-index:1000}
.al-backdrop.open{display:flex}
.al-box{background:#fff;border-radius:12px;padding:24px;width:320px;max-width:100%;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,.25);animation:al-pop .18s ease}
@keyframes al-pop{from{opacity:0;transform:translateY(8px) scale(.97)}to{opacity:1;transform:none}}
.al-icon{width:44px;height:44px;border-radius:50%;background:#fee2e2;color:#dc2626;font-size:24px;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 14px}
.al-title{font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px}
.al-text{font-size:13px;color:#64748b;margin:0 0 20px;line-height:1.5}
.al-actions{display:flex;justify-content:center}
.al-ok{background:#6366f1;color:#fff;border:none;padding:9px 28px;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit}
.al-ok:hover{background:#4f46e5}`,
    js:`(function(){
  var bd = document.getElementById('al-bd');
  function open(){ bd.classList.add('open'); }
  function close(){ bd.classList.remove('open'); }
  document.querySelector('.al-open').addEventListener('click', open);
  document.querySelector('.al-ok').addEventListener('click', close);
  bd.addEventListener('click', function(e){ if (e.target === bd) close(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });
})();` },

  /* ── 2. 확인 (Confirm) ── */
  { id:'confirm', name:'Confirm', nameKo:'확인',
    desc:'사용자에게 진행/취소를 묻고 선택에 따라 분기하는 차단형 다이얼로그. 삭제처럼 되돌릴 수 없는 액션 직전에 쓴다.',
    html:`<button class="cf-open">계정 삭제</button>
<p class="cf-result" id="cf-result" aria-live="polite"></p>
<div class="cf-backdrop" id="cf-bd">
  <div class="cf-box" role="alertdialog" aria-modal="true" aria-labelledby="cf-title">
    <h3 class="cf-title" id="cf-title">계정을 삭제할까요?</h3>
    <p class="cf-text">계정과 모든 데이터가 영구적으로 삭제되며 되돌릴 수 없습니다.</p>
    <div class="cf-actions">
      <button class="cf-btn cf-cancel">취소</button>
      <button class="cf-btn cf-confirm">삭제</button>
    </div>
  </div>
</div>`,
    css:`.cf-open{background:#f43f5e;color:#fff;border:none;padding:9px 16px;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit}
.cf-result{font-size:13px;color:#0f172a;margin:12px 0 0;min-height:18px;font-weight:600}
.cf-backdrop{display:none;position:fixed;inset:0;background:rgba(15,23,42,.45);align-items:center;justify-content:center;padding:20px;z-index:1000}
.cf-backdrop.open{display:flex}
.cf-box{background:#fff;border-radius:12px;padding:24px;width:340px;max-width:100%;box-shadow:0 20px 50px rgba(0,0,0,.25);animation:cf-pop .18s ease}
@keyframes cf-pop{from{opacity:0;transform:translateY(8px) scale(.97)}to{opacity:1;transform:none}}
.cf-title{font-size:16px;font-weight:700;color:#0f172a;margin:0 0 8px}
.cf-text{font-size:13px;color:#64748b;margin:0 0 20px;line-height:1.5}
.cf-actions{display:flex;gap:8px;justify-content:flex-end}
.cf-btn{padding:8px 16px;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;border:1px solid transparent}
.cf-cancel{background:#fff;color:#0f172a;border-color:#e2e8f0}
.cf-cancel:hover{background:#f8fafc}
.cf-confirm{background:#f43f5e;color:#fff}
.cf-confirm:hover{background:#e11d48}`,
    js:`(function(){
  var bd = document.getElementById('cf-bd');
  var result = document.getElementById('cf-result');
  var cb = null;
  function ask(onResult){ cb = onResult; bd.classList.add('open'); }
  function settle(ok){ bd.classList.remove('open'); if (cb) cb(ok); cb = null; }
  document.querySelector('.cf-open').addEventListener('click', function(){
    ask(function(ok){ result.textContent = ok ? '삭제되었습니다.' : '취소했습니다.'; });
  });
  document.querySelector('.cf-confirm').addEventListener('click', function(){ settle(true); });
  document.querySelector('.cf-cancel').addEventListener('click', function(){ settle(false); });
  bd.addEventListener('click', function(e){ if (e.target === bd) settle(false); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && bd.classList.contains('open')) settle(false); });
})();` },

  /* ── 3. 알림 (Notification) ── */
  { id:'notification', name:'Notification', nameKo:'알림',
    desc:'새 이벤트를 우상단 카드로 알리는 비차단형 알림. 제목+설명+아이콘을 담고 일정 시간 후 자동으로 사라지며 여러 개가 쌓인다.',
    html:`<button class="nt-trigger">알림 띄우기</button>
<div class="nt-stack" id="nt-stack"></div>`,
    css:`.nt-trigger{background:#6366f1;color:#fff;border:none;padding:9px 16px;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit}
.nt-stack{position:fixed;top:16px;right:16px;display:flex;flex-direction:column;gap:10px;z-index:1000;max-width:300px}
.nt-card{display:flex;gap:10px;align-items:flex-start;background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:12px 14px;animation:nt-in .25s ease}
@keyframes nt-in{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:none}}
.nt-ic{width:24px;height:24px;border-radius:50%;background:#eef2ff;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0}
.nt-body{flex:1;min-width:0}
.nt-title{font-size:13px;font-weight:700;color:#0f172a}
.nt-desc{font-size:12px;color:#64748b;margin-top:2px;line-height:1.45}
.nt-close{background:none;border:none;color:#94a3b8;cursor:pointer;font-size:15px;line-height:1;padding:0 2px}
.nt-close:hover{color:#0f172a}`,
    js:`(function(){
  var stack = document.getElementById('nt-stack');
  var msgs = [
    { t:'새 댓글', d:'홍길동님이 회원님의 글에 댓글을 남겼습니다.' },
    { t:'배포 완료', d:'main 브랜치가 프로덕션에 반영되었습니다.' },
    { t:'결제 완료', d:'Pro 플랜 구독이 갱신되었습니다.' }
  ];
  var i = 0;
  document.querySelector('.nt-trigger').addEventListener('click', function(){
    var m = msgs[i++ % msgs.length];
    var el = document.createElement('div');
    el.className = 'nt-card';
    el.innerHTML = '<div class="nt-ic">🔔</div><div class="nt-body"><div class="nt-title">' + m.t + '</div><div class="nt-desc">' + m.d + '</div></div><button class="nt-close" aria-label="닫기">×</button>';
    el.querySelector('.nt-close').addEventListener('click', function(){ el.remove(); });
    stack.appendChild(el);
    setTimeout(function(){ el.remove(); }, 4500);
  });
})();` },

  /* ── 4. 토스트 (Toast) ── */
  { id:'toast', name:'Toast', nameKo:'토스트',
    desc:'짧은 한 줄 메시지를 화면 구석에 잠깐 띄웠다가 타이머로 자동 소멸시키는 비차단형 피드백. 큐로 쌓이고 진행 바로 남은 시간을 보여준다.',
    html:`<button class="ts-trigger">토스트 띄우기</button>
<div class="ts-stack" id="ts-stack"></div>`,
    css:`.ts-trigger{background:#6366f1;color:#fff;border:none;padding:9px 16px;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit}
.ts-stack{position:fixed;bottom:18px;right:18px;display:flex;flex-direction:column;gap:8px;align-items:flex-end;z-index:1000}
.ts-toast{display:flex;align-items:center;gap:8px;background:#0f172a;color:#fff;font-size:13px;padding:10px 14px;border-radius:8px;border:1px solid #334155;position:relative;overflow:hidden;animation:ts-in .25s ease;min-width:200px}
@keyframes ts-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.ts-toast .ts-ic{color:#34d399;font-weight:700}
.ts-bar{position:absolute;left:0;bottom:0;height:2px;background:#34d399;animation:ts-bar 2.5s linear forwards}
@keyframes ts-bar{from{width:100%}to{width:0}}`,
    js:`(function(){
  var stack = document.getElementById('ts-stack');
  var n = 0;
  document.querySelector('.ts-trigger').addEventListener('click', function(){
    n++;
    var el = document.createElement('div');
    el.className = 'ts-toast';
    el.innerHTML = '<span class="ts-ic">✓</span><span>저장되었습니다 (' + n + ')</span><span class="ts-bar"></span>';
    stack.appendChild(el);
    setTimeout(function(){ el.remove(); }, 2500);
  });
})();` },

  /* ── 5. 스낵바 (Snackbar) ── */
  { id:'snackbar', name:'Snackbar', nameKo:'스낵바',
    desc:'하단 중앙에 한 번에 하나만 띄우는 메시지 바. “실행취소” 같은 액션 버튼을 함께 제공해, 방금 한 작업을 되돌릴 기회를 준다.',
    html:`<button class="sb-trigger">메일 보관</button>
<div class="sb-host" id="sb-host"></div>`,
    css:`.sb-trigger{background:#6366f1;color:#fff;border:none;padding:9px 16px;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit}
.sb-host{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:1000}
.sb-bar{display:flex;align-items:center;gap:16px;background:#0f172a;color:#fff;border-radius:8px;padding:12px 14px 12px 16px;box-shadow:0 8px 24px rgba(0,0,0,.3);animation:sb-in .25s ease;min-width:280px}
@keyframes sb-in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
.sb-msg{font-size:13px;flex:1}
.sb-action{background:none;border:none;color:#a5b4fc;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;padding:2px 4px}
.sb-action:hover{color:#c7d2fe}`,
    js:`(function(){
  var host = document.getElementById('sb-host');
  var timer;
  function show(msg, actionLabel, onAction){
    clearTimeout(timer);
    host.innerHTML = '';
    var bar = document.createElement('div');
    bar.className = 'sb-bar';
    bar.innerHTML = '<span class="sb-msg">' + msg + '</span><button class="sb-action">' + actionLabel + '</button>';
    bar.querySelector('.sb-action').addEventListener('click', function(){ clearTimeout(timer); host.innerHTML = ''; if (onAction) onAction(); });
    host.appendChild(bar);
    timer = setTimeout(function(){ host.innerHTML = ''; }, 4000);
  }
  document.querySelector('.sb-trigger').addEventListener('click', function(){
    show('메일을 보관처리했습니다.', '실행취소', function(){ show('보관을 취소했습니다.', '확인', null); });
  });
})();` },

  /* ── 6. 바텀시트 (Bottom Sheet) ── */
  { id:'bottomsheet', name:'Bottom Sheet', nameKo:'바텀시트',
    desc:'화면 하단에서 위로 슬라이드되어 올라오는 패널. 모바일에서 액션 목록·옵션 선택에 쓰며, 핸들 바·배경 딤·ESC/배경 클릭 닫기를 갖춘다.',
    html:`<button class="bs-open">공유하기</button>
<div class="bs-backdrop" id="bs-bd">
  <div class="bs-sheet" role="dialog" aria-modal="true" aria-labelledby="bs-title">
    <div class="bs-handle"></div>
    <h3 class="bs-title" id="bs-title">공유</h3>
    <div class="bs-list">
      <button class="bs-item"><span class="bs-ic">🔗</span> 링크 복사</button>
      <button class="bs-item"><span class="bs-ic">💬</span> 메시지로 보내기</button>
      <button class="bs-item"><span class="bs-ic">✉️</span> 이메일</button>
    </div>
    <button class="bs-cancel">취소</button>
  </div>
</div>`,
    css:`.bs-open{background:#6366f1;color:#fff;border:none;padding:9px 16px;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit}
.bs-backdrop{display:none;position:fixed;inset:0;background:rgba(15,23,42,.45);z-index:1000}
.bs-backdrop.open{display:block}
.bs-sheet{position:fixed;left:0;right:0;bottom:0;background:#fff;border-radius:16px 16px 0 0;padding:10px 18px 18px;box-shadow:0 -8px 30px rgba(0,0,0,.2);transform:translateY(100%);transition:transform .3s cubic-bezier(.16,1,.3,1)}
.bs-backdrop.open .bs-sheet{transform:translateY(0)}
.bs-handle{width:40px;height:4px;border-radius:2px;background:#cbd5e1;margin:6px auto 14px}
.bs-title{font-size:15px;font-weight:700;color:#0f172a;margin:0 0 12px;text-align:center}
.bs-list{display:flex;flex-direction:column;gap:4px;margin-bottom:12px}
.bs-item{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:none;border:none;padding:11px 10px;border-radius:8px;font-size:14px;color:#0f172a;cursor:pointer;font-family:inherit}
.bs-item:hover{background:#f1f5f9}
.bs-ic{font-size:16px}
.bs-cancel{width:100%;background:#f1f5f9;color:#0f172a;border:none;padding:11px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit}
.bs-cancel:hover{background:#e2e8f0}`,
    js:`(function(){
  var bd = document.getElementById('bs-bd');
  function open(){ bd.classList.add('open'); }
  function close(){ bd.classList.remove('open'); }
  document.querySelector('.bs-open').addEventListener('click', open);
  document.querySelector('.bs-cancel').addEventListener('click', close);
  Array.prototype.forEach.call(document.querySelectorAll('.bs-item'), function(b){ b.addEventListener('click', close); });
  bd.addEventListener('click', function(e){ if (e.target === bd) close(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });
})();` },

];
