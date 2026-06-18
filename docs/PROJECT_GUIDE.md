# UI Kit Playground — 프로젝트 가이드

내 사이트에 **복사-붙여넣기**로 바로 쓰는 UI 컴포넌트 레퍼런스 페이지. 이 문서는 전체 구조 · 핵심 파일 · 작업 워크플로 · 배포를 한곳에 정리한 온보딩/레퍼런스 가이드다. (Claude Code용 규칙은 루트 [`CLAUDE.md`](../CLAUDE.md) 참조)

- **라이브 사이트**: https://claude-code-expert.github.io/ui-component/
- **컴포넌트 수**: 89개 (Vanilla 32 · Tailwind 32 · 공통 모달 6 · 피드백 10 · 프로토타입 9)
- **빌드 도구 없음**: 정적 HTML/CSS/JS. 루트 `index.html`을 브라우저로 그대로 연다.

---

## 1. 디렉터리 구조 & 핵심 파일

```
/                              저장소 루트 = 사이트 루트
├─ index.html                  셸: 폰트 + Prism(one-light) + Lucide CDN, 모듈 로드 순서 지정
├─ styles/
│  └─ app.css                  라이트 모드 · shadcn 스타일 셸 UI + Prism 테마 override
├─ js/
│  ├─ builders.js              UIKIT.builders = { esc, fnBody, FONTS, docPage, alertPage }
│  └─ app.js                   정규화 5루프 + GROUPS + buildMenu/openItem/makeFrame/copy/download
│                              + Prism 하이라이트 + Lucide(renderIcons) + boot
├─ data/                       컴포넌트 데이터 (각 파일이 window.UIKIT.* 에 할당)
│  ├─ catalog.js               UIKIT.catalog    (Vanilla 32)    + 레거시 전역 escapeHtml
│  ├─ uixbase.js               UIKIT.uixbase    (Tailwind 32)
│  ├─ feedback.js              UIKIT.feedback   (피드백 10)      + UIKIT.alertCss (문자열)
│  ├─ modals.js                UIKIT.modals     (공통 모달 6)
│  └─ prototypes.js            UIKIT.prototypes (9: colorpicker, personal-palette, label-chip 7) — LC_CSS 공유
├─ docs/
│  ├─ resource/*.html          통합 전 원본 프로토타입 8종 (참고/데이터 추출 소스)
│  └─ PROJECT_GUIDE.md         이 문서
├─ .github/workflows/deploy.yml  main 푸시 → GitHub Pages 자동 배포
├─ .nojekyll                   Jekyll 비활성화
├─ CLAUDE.md / README.md / LICENSE
└─ extract-my-prompts.sh / Prompt.md   세션 프롬프트 추출 스크립트 & 누적 기록(수기 수정 보존, 개발 보조)
```

### 파일별 책임 요약

| 파일 | 한 줄 책임 |
|---|---|
| `index.html` | 셸 마크업 + CDN(폰트/Prism/Lucide) + **모듈 로드 순서**(builders → data/* → app) |
| `js/builders.js` | 순수 헬퍼 + **standalone 문서 빌더**(`docPage`/`alertPage`). `build()`의 단일 출처 |
| `js/app.js` | 데이터 5종을 `items[]`로 정규화 → 사이드바/상세 렌더, 복사/다운로드, Prism·Lucide 호출 |
| `data/*.js` | 컴포넌트 원본 코드(html/css/js). 앱 로직과 분리된 순수 데이터 |
| `styles/app.css` | 셸(사이드바/헤더/탭/코드패널) 스타일. 컴포넌트 프리뷰엔 영향 없음(iframe 격리) |

---

## 2. 아키텍처

### 2.1 모듈 로딩 — 전역 네임스페이스 (`window.UIKIT.*`)

ES Module `import`는 `file://`에서 CORS로 막힌다. 그래서 각 데이터 파일은 평범한 `<script src>`로 로드되어 전역 `window.UIKIT`에 자기 데이터를 얹는다. 덕분에 **로컬 서버 없이 더블클릭으로 열린다.**

```js
// data/catalog.js
window.UIKIT = window.UIKIT || {};
UIKIT.catalog = [ /* … */ ];
```

> **로딩 순서가 곧 의존성이다.** `index.html`의 `<script>` 순서: 폰트 → Prism → Lucide → `builders.js` → `data/*.js`(5개) → `app.js`. `app.js`의 boot가 데이터에 의존하므로 순서가 깨지면 빈 화면이 된다.

### 2.2 5개 데이터 소스 → 하나의 `items[]`

`app.js`가 형태가 제각각인 5개 소스를 균일한 `item`으로 흡수한다:
`{ group, sub, key, name, nameKo, desc, htmlSrc, cssSrc, jsSrc, deps, build() }`

| 데이터 | 전역 | key 접두사 | 그룹(사이드바) | 의존성 |
|---|---|---|---|---|
| catalog | `UIKIT.catalog` (32) | `v-` | 기본 · Vanilla | 없음 |
| uixbase | `UIKIT.uixbase` (32) | `t-` | 기본 · Tailwind+Lucide | Tailwind+Lucide CDN |
| modals | `UIKIT.modals` (6) | `m-` | 공통 모달 시스템 | 없음 |
| feedback | `UIKIT.feedback` (10) | `a-` | 피드백 · 알림 패턴 | 없음(엔진 구동) |
| prototypes | `UIKIT.prototypes` (9) | `p-` | 프로토타입 · 디자인 시스템 | 없음(폰트만) |

사이드바 그룹/순서/아이콘은 `app.js`의 `GROUPS` 배열에서 정의(아이콘: box·wind·layers·bell·palette).

### 2.3 단일 출처 불변식 — `build()` ★가장 중요한 계약

각 item의 `build()`는 **완성형 standalone HTML 문서 문자열**을 반환한다. 이 하나가 세 경로를 모두 구동한다:

```
            ┌─ Preview  : iframe.srcdoc = it.build()
it.build() ─┼─ Download : new Blob([it.build()]) → <key>.html
            └─ Copy All : navigator.clipboard.writeText(it.build())
```

→ **`preview === download === copy-all`.** 사용자가 화면에서 보는 것과 받는 파일이 항상 동일하다. 컴포넌트를 추가/수정할 때 별도 직렬화 경로를 만들지 말고 `build()`(→ `docPage`/`alertPage`)에 흘려보낼 것.

### 2.4 Prism 하이라이트 — 표시 전용, raw 보장

`openItem`이 코드 패널 `<code class="language-…">`를 주입한 뒤 `Prism.highlightElement`를 호출한다.
- 가드: `if (window.Prism && Prism.highlightElement)` → CDN 실패/오프라인 시 비강조 평문으로 graceful degrade.
- **복사/다운로드는 DOM이 아니라 원본 문자열(`it.htmlSrc/cssSrc/jsSrc`, `it.build()`)에서 읽는다** → 하이라이트 토큰 마크업이 산출물에 절대 섞이지 않는다. (이 분리를 깨지 말 것)

### 2.5 Lucide 아이콘 — 셸 전반

브랜드·검색·그룹 헤더·크럼·다운로드·복사 등 셸 UI 아이콘은 Lucide(`<i data-lucide="…">`)로 통일. 마크업을 새로 주입한 직후(`buildMenu`/`openItem` 끝) `renderIcons()`(= `lucide.createIcons()`)를 호출해야 SVG로 변환된다. 아이콘은 `currentColor`를 따르므로 active 항목에선 자동으로 accent 색이 된다.

---

## 3. 핵심 워크플로우

### 3.1 로컬 실행

```bash
open index.html                     # 가장 간단 (file://)
# 또는 실제 호스팅과 동일한 http:// 환경:
python3 -m http.server 8000         # → http://localhost:8000/
```

### 3.2 동작 검증 (빌드/테스트 스크립트가 없으므로)

```bash
node --check js/app.js              # JS 구문 검사

# 헤드리스 Chrome으로 렌더 검증 (메뉴/그룹/아이콘 카운트 등)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --dump-dom "file://$PWD/index.html" \
  | grep -c 'class="uk-item-name"'   # → 89
```

> 상호작용(모달 클릭, 스와치 선택 등) 검증은 `build()` 산출물에 자동 클릭 스크립트를 주입하고 `--virtual-time-budget`으로 타이머를 진행시켜 결과 DOM을 덤프하는 방식으로 했다.

### 3.3 컴포넌트 추가

1. 성격에 맞는 데이터 모듈에 레코드 추가:
   - 의존성 없음 → `data/catalog.js`(`cat: input|nav|info|container` 지정)
   - Tailwind/Lucide → `data/uixbase.js`
   - 차단형/레이어 모달 → `data/modals.js`
   - 비차단 피드백 → `data/feedback.js`
   - 디자인 시스템/도구 → `data/prototypes.js`
2. 기존 스키마(2.2 표)를 그대로 따른다. 한글 `nameKo`/`desc`가 콘텐츠 언어.
3. 보통 `app.js`는 수정 불필요 — 형태만 맞으면 자동으로 `items[]`·사이드바·미리보기에 반영. **새 데이터 파일을 만들었다면** `index.html`에 로드 순서대로 `<script src>` 추가 + `app.js`에 정규화 루프/`GROUPS` 항목 추가.

### 3.4 프로토타입 데이터 재생성 (`docs/resource/` → `data/prototypes.js`)

`prototypes.js`는 원본 프로토타입 HTML을 라인 범위로 슬라이스해 생성했다. 재생성 시 **템플릿 리터럴 안전 이스케이프** 필수:

```python
def tlit(s):  # 무손실: 저장 문자열 값이 원본과 동일
    return s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
```

label-chip 7종은 Tika 토큰 스타일시트(`LC_CSS`) 하나를 공유(concern별 슬라이싱 누락 위험 0). colorpicker/personal-palette JS는 백틱·`${}`를 포함하므로 이스케이프가 특히 중요.

### 3.5 배포 (GitHub Pages)

- `.github/workflows/deploy.yml`이 `main` 푸시마다 **앱 파일만**(`index.html`+`styles/js/data`)을 `_site`에 모아 게시. `Prompt.md`·`CLAUDE.md`·`docs/`는 웹에 노출 안 됨.
- 최초 1회: **Settings → Pages → Source: `GitHub Actions`** 선택. (이 설정 전엔 워크플로의 deploy 단계가 실패하는 게 정상)
- 모든 자산이 **상대경로**라 프로젝트 페이지 서브경로(`/ui-component/`)에서도 안전.

```bash
gh run watch                                            # 배포 진행 확인
gh api repos/claude-code-expert/ui-component/pages --jq .html_url
```

---

## 4. 관례 & 함정 (Gotchas)

- **`build()` 불변식**: preview/download/copy-all은 같은 `build()`에서 파생. 새 빌더 만들지 말 것.
- **Prism raw 보장**: copy/download가 JS 문자열에서 읽는 구조를 절대 `code.textContent`로 바꾸지 말 것.
- **복사 버튼 함정**: `copy()`는 버튼 안 `<span class="lbl">` 텍스트만 토글한다. 복사 버튼에 Lucide 아이콘을 넣을 땐 라벨을 `.lbl`로 감싸야 `textContent` 교체가 아이콘 `<svg>`를 지우지 않는다.
- **로딩 순서**: data/builders가 app보다 먼저(`index.html` 태그 순서로만 보장).
- **alert 직렬화**: 정규화 시 `render()`를 임시 div에 호출해 마크업을 뽑고, 함수는 `.toString()`으로 직렬화(`alertPage`).
- **이스케이프**: 대용량 데이터에 원본 코드를 담을 땐 `\`·`` ` ``·`${` 무손실 이스케이프.
- **출력 언어는 한국어**: `nameKo`/`desc`/사이드바/설명 모두 한글 기본.
- **컴포넌트 자기완결성**: 사용자가 복사해 붙이는 산출물이므로 클래스 접두사로 충돌 예방, 전역 오염 금지.
- **서브경로 안전**: 내부 참조는 항상 상대경로. 절대 `/styles/...`(도메인 루트) 쓰지 말 것.

---

## 5. 개발 히스토리 (이번 작업 요약)

1. **`/init`** → 한글 `CLAUDE.md` 생성, 정본 식별.
2. **계획 수립** → 모듈화 + 공통 모달 6종 + Prism + 프로토타입 3종 통합으로 합의.
3. **Phase 1** — 단일 파일 `ui-kit-playground.html`(74종)을 데이터/빌더/앱/스타일 모듈로 분리(동작 보존 parity).
4. **Phase 2** — Prism 코드 구문 강조(표시 전용).
5. **Phase 3** — 공통 모달 6종(경고·확인·알림·토스트·스낵바·바텀시트) 신규 구현.
6. **Phase 4–5** — 프로토타입 통합: colorpicker, personal-palette, label-chip 7종 분해 → 89종.
7. **Phase 6** — 카운트/문서 정리.
8. **루트 이동** — 앱 소스를 `docs/` 밖 루트로 옮겨 루트 실행 + `docs/`는 문서 전용.
9. **라이트 리디자인** — 다크 셸 → 라이트 shadcn 테마 + Lucide 아이콘 통일 + Prism one-light.
10. **GitHub Pages 배포** — Actions 워크플로 + `.nojekyll`, 서브경로 검증 후 게시.

---

## 6. 참고

- 컴포넌트 분류 출처: CareerFoundry [UI element glossary](https://careerfoundry.com/en/blog/ui-design/ui-element-glossary/)
- 원본 프로토타입(`docs/resource/`): `ui-kit-playground.html`(단일파일 원형), `ui-component.html`/`ui-components-32-catalog.html`(Tailwind/Vanilla 원본), `alert-ui-showcase.html`(피드백), `label-chip-system.html`(Tika 라벨/칩), `colorpicker.html`·`color-personal-card.html`(컬러 도구), `component-portfolio.html`(초기 포트폴리오)
- CDN: Prism 1.29.0(one-light), Lucide(latest), Tailwind(Tailwind 컴포넌트 프리뷰용), Google Fonts(Inter/JetBrains Mono/Noto Sans KR)
