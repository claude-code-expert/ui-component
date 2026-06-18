# Claude Code 프롬프트 모음

- 프로젝트: `/Users/codevillain/Claude-Code-Expert/ui-component`
- 범위: cwd 전체 합본
- 추출 시각: 2026-06-18 18:25:26
- 세션 수: 5 / 프롬프트 수: 24

---

### 1. 2026-06-14

https://careerfoundry.com/en/blog/ui-design/ui-element-glossary/ 를 기반으로 32가지 UI 컴포넌트와 컴포넌트의 미리보기, HTML, CSS, Javascript(있을경우) 코드 영역에 해당 코드들이 로드되어야 하고, 코드 하일라이트 기본적인 기능들이 적용되어야 해. 각 소스마다 복사하기 버튼을 통해 해당 요소를 복사해서 내 사이트에 붙여넣기 하는 컴포넌트 페이지를 만드는거야.

촤측에는 UI  요소 리스트와 UX에 필요한 기본적인 공통 모달(경고, 확인, 알림, 토스트, 스낵바, 바텀 시트 등 사이트에 꼭 필요한 알림등 레이어 처리 관련 컴포넌트)들을 포함해서 해당 리스트를 누르면 우측 메인 컨텐츠 영역에 클릭한 컴포넌트 명 - 정의와 설명이 나오고 하단에는 미리보기 html, css, js 탭들이 나와서 각각의 기능을 수항하면 돼 

참고해야 할 리소스는 @docs/resource/component-portfolio.html 구조를 비롯해서 @docs/resource/ui-component.html  @docs/resource/ui-components-32-catalog.html  이고 @docs/resource/label-chip-system.html @docs/resource/alert-ui-showcase.html 이고 @docs/resource/ 에 참고할 자료들들을 업로드 해놨어. 

이를 바탕으로 /init 을 실행해서 기본적인 CLAUDE.md를 비롯한 초기화 작업 진행해

### 2. 2026-06-14

현재 프로젝트에서 진행되는 프롬프트 모두 Prompt.md 라는 파일을 만들어서 기록해야해. 훅을 만들어주고 @extract-my-prompts.sh 스크립트를 활용해서 프롬프트 기록하는 기능을 만들어줘

### 3. 2026-06-14

내 사이트에 붙여넣기 하는 컴포넌트 페이지를 만드는거야.

촤측에는 UI  요소 리스트와 UX에 필요한 기본적인 공통 모달(경고, 확인, 알림, 토스트, 스낵바, 바텀 시트 등 사이트에 꼭 필요한 알림등 레이어 처리 관련 컴포넌트)들을 포함해서 해당 리스트를 누르면 우측 메인 컨텐츠 영역에 클릭한 컴포넌트 명 - 정의와 설명이 나오고 하단에는 미리보기 html, css, js 탭들이 나와서 각각의 기능을 수항하면 돼 

참고해야 할 리소스는 @docs/resource/component-portfolio.html 구조를 비롯해서 @docs/resource/ui-component.html  @docs/resource/ui-components-32-catalog.html  이고 @docs/resource/label-chip-system.html @docs/resource/alert-ui-showcase.html 이고 @docs/resource/ 에 참고할 자료들들을 업로드 해놨어. 

이를 바탕으로 /init 을 실행해서 기본적인 CLAUDE.md를 비롯한 초기화 작업 진행하고 CLAUDE.md는 한글로 작성해

### 4. 2026-06-14

각 요소들에 대한 개발 계획을 세우고, 단계별로 개발을 진행해.

### 5. 2026-06-14

소스 폴더가 docs 하위에 위치하는데 docs는 문서 전용 디렉토리야. /momory 로 CLAUDE.md에 갱신해주고, 소스가 root 에서 실행될수있도록 구조를 잡아줘

### 6. 2026-06-14

서버 실행해서 웹페이지를 띄워줘

### 7. 2026-06-14

[Request interrupted by user]

### 8. 2026-06-14

계속 진행해

### 9. 2026-06-14

좋아. 요구사항은 충실히 반영된거 같은데, 화면이 전체적으로 어둡고 컨텐츠는 밝아서 눈으로 확인할 때 피로감이 있고 각 컴포넌트의 구성이 밋밋해. 

다음의 작업을 진행해야해 
- 아이콘은 lucid로 통일하여 적용
- shadcn 혹은 tailwind 라이브러리 구조를 반영한 스타일 적용 
- 전체적인 룩앤필은 라이트 모드로 적용하고 아이콘이나 컨텐츠 텍스트, 백그라운드도 라이트 모드에 어울리는 색으로 적용

### 10. 2026-06-14

이제 github pages에 이 프로젝트를 배포할 수 있게 준비해줘

### 11. 2026-06-14

메인에 푸시 완료했어. github pages 설정 안내 해줘

### 12. 2026-06-14

설정완료해서 github pages 까지 게시 완료했어. 지금까지 작업한 모든 핵심 워크플로우와 핵심 파일에 대한 가이드를 정리해서 md로 docs 밑에 만들어줘

### 13. 2026-06-14

<task-notification>
<task-id>bzaupfngs</task-id>
<tool-use-id>toolu_01Cm6xMuDDB8V6V79ZBtbMjc</tool-use-id>
<output-file>/private/tmp/claude-501/-Users-codevillain-Claude-Code-Expert-ui-component/1c32857a-f959-496b-a3fc-9bcfd4db954f/tasks/bzaupfngs.output</output-file>
<status>killed</status>
<summary>Background command "Start static HTTP server at repo root (background)" was stopped</summary>
</task-notification>

### 14. 2026-06-16

깃허브 페이지에 게시하는 절차와 트러블 슈팅 정리해서 @docs/TOUBLE_SHOOTING.md 에 업데이트해

### 15. 2026-06-18

현재 프로젝트 최초 프롬프트 입력한 시점의 로컬 소스 기준으로  init 브랜치를 만들어서 푸시해줘. 그 시점에는 docs/resource하위에 html과 readmd, prompt.md , extract-my-prompts.sh, gitignore 의 구조와 .claude 껍데기 폴더만 있었을거야. 버전확인해서 브랜치 새로 만들어서 푸시해

### 16. 2026-06-18

init 브랜치에 커밋하고 푸시해

### 17. 2026-06-18

페이지 확인할 수 있게 서버 띄워줘

### 18. 2026-06-18

서버 띄우는 명령어 알려줘

### 19. 2026-06-18

서버 강제 종료하고 실행하는 명령어로 알려줘

### 20. 2026-06-18

<task-notification>
<task-id>bg38150ym</task-id>
<tool-use-id>toolu_01DVS2ekgoyHVFtD9Gnwcf4H</tool-use-id>
<output-file>/private/tmp/claude-501/-Users-codevillain-Claude-Code-Expert-ui-component/1c32857a-f959-496b-a3fc-9bcfd4db954f/tasks/bg38150ym.output</output-file>
<status>killed</status>
<summary>Background command "Start static HTTP server at repo root (background)" was stopped</summary>
</task-notification>

### 21. 2026-06-18

좌측 엘리먼트 리스트에 기본 바닐라 스타일 요소는 삭제 해주고, 섹션별 구분 타이틀 영역은 테두리로 강조 효과를 줘서 구분을 할수 있도록 해(예, 공통 모달 시스템, 피드백 알림패턴 등) 전체 항목들을 tailwind 방식으로 통일해서 보여줘. 엘리먼트 버튼 클릭시 좌측에 blockquote 테두리가 나오는데 이거는 anti ai slop 에 위배되, 해당 테두리 삭제하고 그냥 클릭시 선택효과만 1px 로 테두리 씌워

### 22. 2026-06-18

Uncaught TypeError: Cannot read properties of undefined (reading 'forEach')
    at app.js:15:11
    at app.js:237:3

### 23. 2026-06-18

notification과 toast 테두리 역시 ai slop  효과가 적용된 상태야. 제거하고 테두리 색 강조효과만 적용해

### 24. 2026-06-18

여전히 노티피케이션과 토스트 등에 라디우스 효과와 알약같은 좌측 테두리가 적용되어있어 모든 페이지 요소에서 이 디자인 요소 제외해 @.claude/rules/anti-ai-slop.md  다시 업데이트 했으니까 참고해서 패치해

