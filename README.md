# ui-component
Frontend UI 개발을 위해 필수로 알아야 할 컴포넌트 모음 
Frontend 요소와 용어를 이해하고 차기 프로젝트에 각 엘리먼트들을
손쉽게 적용할 수 있는 Frontend 포트폴리오 및 데모 사이트를 구축

## 통합 컴포넌트 페이지 (UI Kit Playground)

> 🔗 **라이브**: https://claude-code-expert.github.io/ui-component/

> 📖 **구조·워크플로·배포 전체 가이드**: [docs/PROJECT_GUIDE.md](docs/PROJECT_GUIDE.md)

루트의 `index.html`을 브라우저로 **그대로 열면**(빌드·서버 불필요) 89개 컴포넌트를
미리보기 + HTML/CSS/JS 코드(구문 강조) + 소스별 복사 + 전체 `.html` 다운로드로 제공한다.

```bash
open index.html   # macOS
```

좌측 사이드바 5개 그룹:

| 그룹 | 개수 | 내용 |
|---|---|---|
| 기본 컴포넌트 · Vanilla | 32 | 순수 HTML/CSS/JS 기본 UI 요소 |
| 기본 컴포넌트 · Tailwind + Lucide | 32 | Tailwind 유틸리티 + Lucide 아이콘 |
| 공통 모달 시스템 | 6 | 경고 · 확인 · 알림 · 토스트 · 스낵바 · 바텀시트 |
| 피드백 · 알림 패턴 | 10 | 배너 · 인라인 · 슬라이드오버 · 커맨드바 등 |
| 프로토타입 · 디자인 시스템 | 9 | 컬러 피커 · 프로필 팔레트 · Tika 라벨/칩 시스템 |

각 항목의 미리보기·복사·다운로드는 모두 동일한 자기완결형 HTML 문서에서 나오므로,
받은 코드는 의존성 없이 그대로 동작한다(Tailwind 항목만 CDN 자동 포함).

### 구조

- `index.html` — 셸(모듈 로드 순서 지정), 루트에서 실행
- `data/*.js` — 컴포넌트 데이터(`window.UIKIT.*`)
- `js/{builders,app}.js` — 문서 빌더 + 정규화/렌더
- `styles/app.css` — UI 스타일
- `docs/resource/*.html` — 통합 전 원본 프로토타입(참고 문서)

## 배포 (GitHub Pages)

빌드 도구가 없는 정적 사이트라 그대로 게시된다. 모든 자산이 **상대경로**라 프로젝트 페이지 서브경로(`/<repo>/`)에서도 깨지지 않는다.

### 방법 1 — GitHub Actions (권장, 이미 설정됨)

`.github/workflows/deploy.yml`이 `main` 푸시마다 **앱 파일만**(`index.html` + `styles/js/data`) 모아 자동 배포한다(`Prompt.md`·`CLAUDE.md`·`docs/resource`는 웹에 노출되지 않음).

1. 코드를 `main`에 푸시
2. GitHub 저장소 **Settings → Pages → Build and deployment → Source: `GitHub Actions`** 선택
3. 푸시 시 워크플로가 자동 실행 → 배포 URL: `https://<사용자>.github.io/<repo>/`
   (이 저장소: `https://claude-code-expert.github.io/ui-component/`)

### 방법 2 — 브랜치에서 직접 배포

워크플로 없이 쓰려면 **Settings → Pages → Source: `Deploy from a branch` → `main` / `/ (root)`** 선택. 루트의 `.nojekyll`이 Jekyll 처리를 비활성화한다. 이 경우 저장소 루트 전체가 게시되므로, 내부 문서 노출을 피하려면 방법 1을 쓴다.

### 최초 배포 전 (앱이 아직 커밋되지 않았다면)

```bash
git add index.html styles js data .nojekyll .github README.md CLAUDE.md
git commit -m "feat: 통합 UI 컴포넌트 페이지 + Pages 배포 설정"
git push origin main
```
