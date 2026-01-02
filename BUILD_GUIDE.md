# EXE 파일 빌드 가이드

## 방법 1: Electron Builder (권장)

### 준비사항
- Windows PC (exe 빌드를 위해)
- 인터넷 연결 (설치 시에만 필요)

### 단계별 설명

**1. Node.js 설치**
- https://nodejs.org 접속
- LTS 버전 다운로드 및 설치
- 설치 확인: 명령 프롬프트에서 `node -v` 입력

**2. 프로젝트 폴더로 이동**
```bash
cd joe-meal-survey
```

**3. 필요한 패키지 설치**
```bash
npm install
```
처음 한 번만 실행하면 됩니다. (약 5-10분 소요)

**4. 개발 모드로 테스트**
```bash
npm start
```
앱이 실행되는지 확인합니다.

**5. EXE 파일 빌드**
```bash
npm run build
```
빌드 완료 후 `dist` 폴더에 설치 파일이 생성됩니다.

**6. 결과물**
- `dist/급식만족도조사 Setup 1.0.0.exe` - 설치 프로그램
- 이 파일을 네트워크 없는 PC에 복사하여 설치 가능

---

## 방법 2: 더 간단한 Portable 앱 (Electron 없이)

### 도구: Nw.js Portable Builder

**1. Nw.js 다운로드**
- https://nwjs.io/downloads/ 접속
- "SDK" 버전의 Windows (x64) 다운로드

**2. 파일 구성**
```
my-app/
  ├── index.html (이미 준비됨)
  └── package.json (아래 내용으로 생성)
```

**package.json 내용:**
```json
{
  "name": "meal-survey",
  "main": "index.html",
  "window": {
    "title": "급식 만족도 조사",
    "width": 800,
    "height": 900,
    "toolbar": false
  }
}
```

**3. 패키징**
- Nw.js 압축 해제
- `my-app` 폴더 전체를 ZIP으로 압축하고 확장자를 `.nw`로 변경
- `.nw` 파일을 nw.js 폴더에 복사
- `nw.exe my-app.nw`로 실행

**4. 단일 EXE 만들기**
```bash
copy /b nw.exe+my-app.nw meal-survey.exe
```

---

## 방법 3: HTML을 EXE로 변환 (가장 간단)

### 도구: HTML Compiler

**1. HTML Compiler 다운로드**
- https://www.htmlcompiler.net/ (무료 버전 사용 가능)

**2. 변환 과정**
- HTML Compiler 실행
- `index.html` 파일 추가
- "Build" 버튼 클릭
- EXE 파일 생성 완료

**장점:**
- 설치 없이 단일 EXE 파일
- 크기가 작음 (약 10-20MB)
- 인터넷 연결 불필요

---

## 추천 방법 비교

| 방법 | 난이도 | 파일 크기 | 장점 |
|------|--------|-----------|------|
| Electron | 중 | 약 150MB | 전문적, 확장성 좋음 |
| Nw.js | 중 | 약 100MB | Electron보다 가벼움 |
| HTML Compiler | 쉬움 | 약 15MB | 빠르고 간단함 |

**영양사용 단일 페이지**에는 **HTML Compiler** 방법을 추천드립니다.

---

## 아이콘 파일 만들기 (선택사항)

원하는 이미지를 준비하여 아이콘으로 변환:

**온라인 변환기 사용:**
- https://convertio.co/kr/png-ico/
- PNG/JPG 파일을 ICO 형식으로 변환
- `icon.ico` 파일명으로 저장

---

## 문제 해결

**Q: npm install이 느려요**
- 인터넷 연결 확인
- npm 캐시 삭제: `npm cache clean --force`

**Q: 빌드 시 권한 오류**
- 관리자 권한으로 명령 프롬프트 실행

**Q: EXE가 백신에서 차단됨**
- 디지털 서명이 없는 앱은 경고가 뜰 수 있음
- "추가 정보" → "실행" 클릭

**Q: 더 작은 파일을 원해요**
- HTML Compiler 방법 사용
- 또는 온라인에서 실행 (GitHub Pages 등)
