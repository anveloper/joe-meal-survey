# 급식 만족도 조사 프로그램

## 사용 방법

### 웹 브라우저로 바로 실행
`index.html` 파일을 더블클릭하여 브라우저에서 바로 실행할 수 있습니다.

### GitHub Pages로 온라인 배포
1. GitHub에 저장소 생성
2. 이 프로젝트를 push
3. Settings > Pages > Source를 "main branch"로 설정
4. `https://<username>.github.io/joe-meal-survey/` 주소로 접속

### EXE 파일로 만들기 (네트워크 없는 환경)

Electron을 사용하여 독립 실행형 exe 파일로 변환할 수 있습니다.

#### 1단계: Node.js 설치
https://nodejs.org 에서 Node.js를 다운로드하여 설치합니다.

#### 2단계: 프로젝트 초기화

```bash
# 현재 폴더에서 실행
npm init -y
```

#### 3단계: Electron 및 빌드 도구 설치

```bash
npm install --save-dev electron electron-builder
```

#### 4단계: package.json 수정

`package.json` 파일을 열어서 다음 내용으로 교체:

```json
{
  "name": "meal-survey",
  "version": "1.0.0",
  "description": "급식 만족도 조사 프로그램",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "build": "electron-builder --win --x64"
  },
  "build": {
    "appId": "com.meal.survey",
    "productName": "급식만족도조사",
    "win": {
      "target": "nsis",
      "icon": "icon.ico"
    },
    "files": [
      "main.js",
      "index.html"
    ],
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true
    }
  },
  "devDependencies": {
    "electron": "latest",
    "electron-builder": "latest"
  }
}
```

#### 5단계: main.js 파일 생성

아래 명령어로 `main.js` 파일을 생성합니다 (또는 제공된 파일 사용).

#### 6단계: 빌드 실행

```bash
npm run build
```

빌드가 완료되면 `dist` 폴더에 설치 파일(.exe)이 생성됩니다.

## 더 간단한 방법: Portable 실행 파일

Electron 대신 더 가벼운 방법으로 **nw.js**를 사용할 수도 있습니다:

1. https://nwjs.io 에서 nw.js 다운로드
2. `index.html` 파일 사용 (이미 준비됨)
3. `package.json` 생성 (간단한 설정)
4. nw.js와 함께 패키징

## 프로그램 기능

1. **초기 설정**: 메뉴 이름과 관리자 비밀번호 설정
2. **투표 화면**: 학생들이 "예/아니요" 버튼으로 투표
3. **결과 보기**: 우측 하단 아이콘 클릭 → 비밀번호 입력 → 결과 확인
4. **실시간 카운팅**: 투표 즉시 카운트 (데이터는 세션 내에만 유지)

## 참고사항

- 데이터는 브라우저/앱을 닫으면 초기화됩니다
- 영구 저장이 필요한 경우 localStorage 또는 파일 저장 기능 추가 가능
