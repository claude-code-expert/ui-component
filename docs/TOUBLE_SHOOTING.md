# GitHub Pages 게시 절차 & 트러블슈팅

이 프로젝트(무빌드 정적 사이트)를 GitHub Pages에 올리는 절차와, 막혔을 때의 증상별 해결법.

- 이 저장소 라이브: **https://claude-code-expert.github.io/ui-component/**
- 배포 워크플로: [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) — `main` 푸시마다 **앱 파일만**(`index.html` + `styles/js/data`)을 `_site`로 모아 게시
- 아래에서 `<user>`/`<repo>`는 본인 값으로 치환(이 저장소는 `claude-code-expert` / `ui-component`)

---

## 1. 게시 절차 (정상 흐름)

1. **앱이 `main`에 푸시돼 있어야 한다** — `index.html`, `styles/`, `js/`, `data/`, `.github/workflows/deploy.yml`, `.nojekyll`.
   ```bash
   git add index.html styles js data .nojekyll .github
   git commit -m "deploy: GitHub Pages 게시"
   git push origin main
   ```
2. **최초 1회만**: 저장소 **Settings → Pages → Build and deployment → Source** 를 **`GitHub Actions`** 로 선택.
   - 직접 URL: `https://github.com/<user>/<repo>/settings/pages`
   - (이 설정 전에는 워크플로의 `deploy-pages` 단계가 실패하는 게 정상이다 — §2-A 참고)
3. `main` 푸시 시 워크플로가 자동 실행 → **success** 가 되면 약 1분 뒤 게시.
4. 접속: `https://<user>.github.io/<repo>/`

### CLI로 한 번에 (선택)
```bash
# Pages를 GitHub Actions 소스로 활성화 (UI의 'Source: GitHub Actions'와 동일)
gh api -X POST repos/<user>/<repo>/pages -f build_type=workflow

# 실패했던 최신 실행 재시도
gh run rerun "$(gh run list -L1 --json databaseId --jq '.[0].databaseId')"

# 진행 확인 & 최종 URL
gh run watch
gh api repos/<user>/<repo>/pages --jq .html_url
```

---

## 2. 트러블슈팅 (증상 → 원인 → 해결)

### A. 워크플로가 실패(failure)한다 — 특히 첫 실행 ★가장 흔함
- **원인**: Pages가 아직 "GitHub Actions" 소스로 활성화되지 않음. 워크플로는 푸시 즉시 돌지만, Pages 활성화가 첫 실행을 트리거하지 않아 `deploy-pages` 단계가 실패한다.
- **해결**:
  1. Settings → Pages → Source → **`GitHub Actions`** 선택(저장 시 활성화).
  2. 실패한 워크플로 재실행: **Actions 탭 → "Deploy to GitHub Pages" → 실패한 실행 → 우측 상단 `Re-run all jobs`** (또는 `main`에 아무 커밋이나 재푸시).
  3. 초록색(success) → 약 1분 뒤 게시.

### B. `deploy-pages` 단계 403 / "Resource not accessible by integration" / "Pages site not found"
- **원인**: Pages 미활성, 또는 워크플로 권한 부족.
- **해결**:
  - Source를 `GitHub Actions`로(§A).
  - 워크플로에 권한이 있는지 확인(이미 설정됨): `permissions: pages: write, id-token: write`.
  - 조직 저장소면 **Settings → Actions → General → Workflow permissions** 가 막혀있지 않은지 확인.

### C. 사이트는 뜨는데 스타일/스크립트가 안 먹어 깨져 보인다 (흰 화면, 콘솔 404)
- **원인**: **절대경로**(`/styles/app.css`) 사용. 프로젝트 페이지는 `https://<user>.github.io/<repo>/` 서브경로라, 절대경로는 도메인 루트로 가서 404가 난다.
- **해결**: 내부 참조를 **상대경로**(`styles/app.css`, `js/...`, `data/...`)로. 이 프로젝트는 이미 상대경로라 안전. 의심되면 점검:
  ```bash
  grep -rnE '(href|src)="/[^/]' index.html js data   # 결과 없어야 정상
  ```

### D. 빈 화면 (사이드바가 비어있음)
- **원인**: 모듈 **로드 순서**가 깨졌거나(데이터가 `app.js`보다 늦게 로드) `data/*.js` 중 구문 오류.
- **해결**:
  - `index.html`의 `<script>` 순서 확인: 폰트 → Prism → Lucide → `builders.js` → `data/*.js` → `app.js`.
  - 브라우저 콘솔(F12) 에러 확인.
  - 구문 검사: `node --check js/app.js && for f in data/*.js; do node --check "$f"; done`.

### E. 페이지 자체가 404 (Pages URL이 안 열림)
- **원인**: 첫 배포가 아직 안 끝남 / Source 미설정 / 게시물 루트에 `index.html`이 없음.
- **해결**: 워크플로 success 확인 후 1~2분 대기. Source가 Actions인지 확인. `deploy.yml`의 assemble 단계가 `index.html`을 `_site/`에 넣는지 확인(현재 그렇게 돼 있음).

### F. 변경을 푸시했는데 사이트가 그대로다 (옛 화면)
- **원인**: 브라우저/CDN 캐시, 또는 워크플로가 실제로는 실패.
- **해결**: 하드 리프레시 **Cmd+Shift+R**(Win: Ctrl+F5). `gh run list`로 최신 실행이 success인지 확인. 전파에 1~2분 걸릴 수 있음.

### G. Jekyll이 일부 파일을 무시하거나 빌드 경고
- **원인**: Pages 기본 Jekyll 처리(`_`로 시작하는 파일/폴더 무시 등).
- **해결**: 루트 `.nojekyll` 존재 확인(이미 있음). Actions 배포는 아티팩트를 Jekyll로 처리하지 않지만, 브랜치 배포로 전환할 때를 위한 안전망.

### H. 컴포넌트 프리뷰가 비어 보임 (Tailwind/Lucide/Prism)
- **원인**: CDN 차단/오프라인.
- **해결**: 온라인 확인. Prism(코드 강조)·Lucide(셸 아이콘)는 가드가 있어 없어도 앱은 동작(비강조/아이콘 미표시). **Tailwind 그룹 컴포넌트**는 `cdn.tailwindcss.com`이 필요하므로 차단 시 스타일이 빠진다.

### I. 클립보드 "복사"가 로컬에선 안 되는데 배포본에선 된다
- **설명**: `navigator.clipboard`는 **보안 컨텍스트(https 또는 localhost)** 에서만 동작. GitHub Pages는 https라 정상. `file://`로 직접 열면 `execCommand` 폴백으로 동작하거나 제한될 수 있다. → 정상 동작 확인은 배포본 또는 `http://localhost`에서.

---

## 3. 빠른 점검 체크리스트

- [ ] `main`에 앱 파일 + `.github/workflows/deploy.yml` + `.nojekyll` 푸시됨
- [ ] Settings → Pages → **Source = GitHub Actions**
- [ ] Actions의 최신 "Deploy to GitHub Pages" 실행 = **success**
- [ ] 내부 경로가 전부 **상대경로** (`grep` 결과 없음)
- [ ] `node --check`로 `js/*.js`·`data/*.js` 구문 통과
- [ ] 하드 리프레시로 캐시 배제 후 확인

---

## 4. 진단에 쓰는 gh 명령 모음

```bash
gh run list -L 5                                  # 최근 워크플로 실행/상태
gh run view <run-id> --log-failed                 # 실패 로그만
gh run rerun <run-id>                             # 재실행
gh api repos/<user>/<repo>/pages                  # Pages 설정(404면 미활성)
gh api repos/<user>/<repo>/pages --jq .html_url   # 게시 URL
curl -s -o /dev/null -w '%{http_code}\n' https://<user>.github.io/<repo>/   # 라이브 응답 코드
```
