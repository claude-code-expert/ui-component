# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

내 사이트에 **복사-붙여넣기**로 바로 쓰는 UI 컴포넌트 레퍼런스 페이지를 만드는 저장소다. 좌측 사이드바에 UI 요소 목록 + 공통 모달 시스템(경고·확인·알림·토스트·스낵바·바텀시트) + 피드백 패턴을 두고, 항목을 클릭하면 우측 메인에 **컴포넌트명 + 정의/설명**과 하단 **Preview / HTML / CSS / JS 탭**(Prism 코드 하이라이트 + 소스별 복사 버튼 + 전체 .html 다운로드)이 표시된다. 분류 출처는 CareerFoundry의 [UI element glossary](https://careerfoundry.com/en/blog/ui-design/ui-element-glossary/).

**저장소 루트의 `index.html`이 정본(canonical build target)이다 — 모듈 분리 구조의 통합 앱, 총 89개 컴포넌트.** 앱 소스(`index.html` + `data/` + `js/` + `styles/`)는 **루트에서 직접 실행**된다. 단일 파일 프로토타입 `docs/resource/ui-kit-playground.html`을 데이터/빌더/앱/스타일 모듈로 쪼개 만든 것이며, 이후 작업은 루트의 모듈을 확장한다. **`docs/`는 문서 전용 디렉터리**로, `docs/resource/`에 앱에 흡수된 **원본 프로토타입(참고 자료)** 만 둔다.

빌드 도구·번들러·패키지 매니저가 없다. 모듈은 ES import가 아니라 **전역 네임스페이스(`window.UIKIT.*`)에 할당하는 평범한 `<script src>`** 라서, 로컬 서버 없이 루트 `index.html`을 브라우저로 더블클릭하면 바로 열린다(ES Module은 `file://` CORS로 막히므로 의도적으로 피함).

## 개발 명령

```bash
# 정본(통합 앱)을 브라우저로 열기 (macOS) — 루트에서 실행, 서버 불필요
open index.html

# 헤드리스 렌더로 동작 검증 (예: 메뉴/그룹 카운트, 상호작용)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --dump-dom "file://$PWD/index.html"

# 모듈 JS 구문 검사
node --check js/app.js

# 세션 프롬프트를 Markdown으로 추출 (jq 불필요, python3 사용)
./extract-my-prompts.sh --append   # 기존 Prompt.md 보존 + 신규 프롬프트만 이어붙임(증분, 훅이 쓰는 모드)
./extract-my-prompts.sh --all      # 전체 재생성(덮어쓰기) — 수기 수정분이 사라지는 복구용 escape hatch
```

- 테스트/린트/빌드 스크립트는 없다. 검증은 **브라우저(또는 헤드리스 Chrome)로 직접 열어 동작 확인** + `node --check` 구문 검사로 한다.
- 매 턴 종료 시 `Stop` 훅이 `extract-my-prompts.sh --append`를 실행해 `Prompt.md`에 **신규 프롬프트만 누적**한다(기존 내용·수기 수정분은 덮어쓰지 않음). 어디까지 기록했는지는 사이드카 `Prompt.md.state`(JSON, gitignore)의 timestamp 워터마크로 추적한다. 훅 정의는 `.claude/settings.local.json`(gitignore, 이 머신 전용)에 있다. 처음부터 전체를 다시 만들려면 `--all`(덮어쓰기).

## 아키텍처 — 정본(루트)

루트의 `index.html`(셸)이 정해진 순서로 모듈을 로드하고, 각 데이터 모듈은 `window.UIKIT`에 자기 데이터를 얹는다. `js/app.js`(IIFE)가 5개 소스를 균일한 `items[]`로 정규화해 렌더한다. 총 89개 = Vanilla 32 + Tailwind 32 + 공통 모달 6 + 피드백 10 + 프로토타입 9.

```
index.html              셸: head(폰트 + Prism CDN) + body(.uk-app) + 순서 지정 <script src>
styles/app.css          .uk-* UI 스타일 + Prism 테마 override
js/builders.js          UIKIT.builders = { esc, fnBody, FONTS, docPage, alertPage }
js/app.js               정규화 5루프 + GROUPS + buildMenu/openItem/makeFrame/copy/download + Prism + boot
data/catalog.js         UIKIT.catalog    (Vanilla 32)    + 레거시 전역 escapeHtml
data/uixbase.js         UIKIT.uixbase    (Tailwind 32)
data/feedback.js        UIKIT.feedback   (ALERT_DEMOS 10) + UIKIT.alertCss (문자열)
data/modals.js          UIKIT.modals     (공통 모달 6)
data/prototypes.js      UIKIT.prototypes (colorpicker, personal-palette + label-chip 7) — LC_CSS 공유
docs/resource/          (문서 전용) 통합 전 원본 프로토타입 8종. ui-kit-playground.html = 단일파일 정본의 원형
```

**로딩 순서(필수)**: 폰트 → Prism → `builders.js` → `data/*.js`(5개) → `app.js`. `app.js` boot의 `openItem(items[0].key)`가 데이터에 의존하므로 순서가 깨지면 빈 화면이 된다. 순서는 `index.html`의 `<script>` 태그 순서로만 보장된다. (자산 경로는 전부 루트 기준 상대경로 `styles/`·`js/`·`data/`.)

### 1. 5개 데이터 소스 → 하나의 `items[]`로 정규화

`app.js`가 각 소스를 균일한 `item`(`{ group, sub, key, name, nameKo, desc, htmlSrc, cssSrc, jsSrc, deps, build() }`)으로 흡수한다.

| 데이터 모듈 | 전역 | 형태 | `key` | 그룹 / 의존성 |
|---|---|---|---|---|
| `data/catalog.js` | `UIKIT.catalog` (32) | `{id,num,name,nameKo,cat,desc,html,css,js}` | `v-` | vanilla / 없음 |
| `data/uixbase.js` | `UIKIT.uixbase` (32) | `{id,name,desc,html,css,script(fn)}` | `t-` | tailwind / Tailwind+Lucide CDN |
| `data/feedback.js` | `UIKIT.feedback` (10) | `{title,desc,url,render(fn),fire/toggle(fn),code}` | `a-` | alert / 엔진 구동 |
| `data/modals.js` | `UIKIT.modals` (6) | `{id,name,nameKo,desc,html,css,js}` | `m-` | modal / 없음 |
| `data/prototypes.js` | `UIKIT.prototypes` (9) | `{id,name,nameKo,sub,desc,html,css,js,head}` | `p-` | prototype / 없음(폰트만) |

- Vanilla `cat`(`input|nav|info|container`)은 `CAT_LABEL`로 한글 서브그룹에 매핑·정렬된다.
- Tailwind 항목은 `script` 함수 본문을 `fnBody()`로 추출하고 `lucide.createIcons()`를 덧붙인다.
- **Alert는 마크업을 저장하지 않는다**: 정규화 시점에 `render()`를 임시 `<div>`에 호출해 `innerHTML`을 뽑고, JS는 데모 객체 함수를 `toString()`으로 직렬화한다. 공통 CSS는 `UIKIT.alertCss`.
- 사이드바 그룹/순서는 `GROUPS` 배열: vanilla → tailwind → modal → alert → prototype. (그룹 카운트 표시는 `g.tag`가 아니라 실제 `list.length`를 쓴다.)

### 2. 단일 출처 불변식 — `build()`

각 item의 `build()`는 **완성형 standalone HTML 문서 문자열**을 반환하며, 이 하나가 세 경로를 모두 구동한다:

- **Preview**: `makeFrame()`이 `iframe.srcdoc = it.build()`로 렌더(sandbox `allow-scripts allow-same-origin allow-modals allow-popups allow-forms`, onload 높이 자동 맞춤)
- **다운로드**: `it.build()` Blob → `<item.key>.html`
- **전체 복사**: `it.build()` 문자열을 클립보드로

문서 조립은 `builders.js`의 `docPage(o)`(vanilla/modal/prototype 공용, `o.head`로 폰트 주입)와 `alertPage(k, demos, css)`(alert 전용, 함수 재직렬화)가 단일 출처로 담당한다. **`preview === download === copy-all`이 핵심 계약 — 별도 직렬화 경로를 만들지 말 것.**

### 3. Prism 하이라이트 (표시 전용, raw 보장)

`openItem`이 코드 패널 `<code class="language-markup|css|javascript">`를 주입한 뒤 `Prism.highlightElement`를 호출한다(`window.Prism && Prism.highlightElement` 가드 → CDN 실패/오프라인 시 비강조로 graceful degrade). **복사/다운로드는 절대 DOM이 아니라 원본 문자열(`it.htmlSrc/cssSrc/jsSrc`, `it.build()`)에서 읽는다** — 그래서 하이라이트 토큰 마크업이 산출물에 섞이지 않는다. 이 분리를 깨지 말 것.

### 컴포넌트 추가 방법

1. 성격에 맞는 데이터 모듈에 레코드 추가 — 의존성 없으면 `data/catalog.js`(`cat` 지정), Tailwind/Lucide면 `data/uixbase.js`, 차단형/레이어 모달이면 `data/modals.js`, 비차단 피드백 패턴이면 `data/feedback.js`, 디자인 시스템/도구 프로토타입이면 `data/prototypes.js`.
2. 해당 모듈의 기존 스키마(위 표)를 그대로 따른다. 한글 `nameKo`/`desc`가 콘텐츠 언어다.
3. `js/app.js` 정규화 루프는 대개 수정 불필요 — 모듈 형태만 맞으면 자동으로 `items[]`·사이드바·미리보기에 반영된다. 새 데이터 모듈 파일을 추가했다면 루트 `index.html`에 로드 순서대로 `<script src>`를 끼워 넣는다.

## 원본 프로토타입 (`docs/resource/`)

루트 앱에 흡수된 소스/레거시(참고 자료). 패턴 참고 출처로 본다(직접 수정하지 않는다). `data/*.js` 재생성 시 이 파일들을 라인 범위로 슬라이스한다.

- `ui-kit-playground.html` — 단일 파일 정본의 원형(74종). 루트로 분리되기 전의 레거시.
- `ui-component.html` / `ui-components-32-catalog.html` — `UIXBASE` / `CATALOG`의 원본
- `alert-ui-showcase.html` — `ALERT_DEMOS`(피드백 10종)의 원본, 다크 테마
- `label-chip-system.html` — Tika 라벨/칩 시스템 → `data/prototypes.js`의 `lc-*` 7종으로 분해
- `colorpicker.html`, `color-personal-card.html` — `data/prototypes.js`의 `colorpicker`/`personal-palette`
- `component-portfolio.html` — 초기 39슬롯 포트폴리오(다수 미구현 TODO)

## 관례

- **출력 언어는 한국어** — `nameKo`/`desc`, 사이드바, 설명 모두 한글이 기본.
- 사용자가 복사해 붙이는 산출물이므로 **각 컴포넌트는 외부 상태 없이 자기완결적으로 동작**해야 한다(클래스 접두사로 충돌 예방, 전역 오염 금지).
- 대용량 데이터 모듈(catalog/feedback/prototypes)에 원본 코드를 담을 때 **템플릿 리터럴 안전 이스케이프**(`\` `` ` `` `${` → 이스케이프)를 지킨다. 특히 ALERT_CSS·프로토타입 JS는 백틱/`${}`를 포함하므로 무손실 이스케이프 필수.
- 코드를 `<pre><code>`에 표시할 때는 `esc()`로 이스케이프(그 위에 Prism이 토큰화).
- **셸 UI는 라이트 모드 · shadcn 스타일**(neutral slate + indigo primary, `styles/app.css`). Prism도 라이트 테마 `prism-one-light`. 셸 아이콘은 **Lucide**(`<i data-lucide="...">`)로 통일하며, 마크업을 새로 주입한 직후(`buildMenu`/`openItem` 끝) `renderIcons()`(=`lucide.createIcons()`)를 호출해야 SVG로 변환된다.
- **복사 버튼 함정**: `copy()`는 버튼 안 `<span class="lbl">` 텍스트만 "복사됨!"으로 토글한다(`.lbl`이 없으면 버튼 전체 텍스트). 복사 버튼에 Lucide 아이콘을 넣을 땐 라벨을 반드시 `.lbl`로 감싸야 `textContent` 교체가 아이콘 `<svg>`를 지우지 않는다.
