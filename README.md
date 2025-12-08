<img src="https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=북커버 생성 웹 서비스 (Book Cover Generator)&fontSize=28" />

## 📘프로젝트 소개
```
-  사용자가 책 커버를 직접 생성하고 수정할 수 있는 웹 기반 북 커버 제작 서비스입니다.
-  로그인 후 책 목록을 확인하고, 원하는 책을 선택하여 커버 생성·수정·상세 확인까지 모든 과정을 웹에서 편리하게 처리할 수 있습니다.
-  Next.js · TypeScript · Tailwind · MUI로 제작되었으며, Vercel을 통해 배포됩니다.
```
---
## 🔗 데모 링크
> 배포 URL: [배포 주소 입력하세요.](http://waad.iptime.org)
(배포 후 링크를 입력하세요)
---
## 🚀 기술 스택 (Tech Stack)
✨
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MaterialUI](https://img.shields.io/badge/Material%20UI-%23FFFFFF?style=for-the-badge&logo=MUI&logoColor=#007FFF)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
✨
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI**: Tailwind CSS, MUI (Material UI)
- **Package Manager**: npm
- **Deployment**: Vercel
---

## 📄 주요 페이지 (Pages)

### 1. 🔐 로그인 페이지
- 사용자 인증 기능 제공
- 로그인 후 책 목록 페이지로 이동
<img width="2545" height="1338" alt="image" src="https://github.com/user-attachments/assets/2392d5dd-37d7-4cd4-8d01-3aafc0e66454" />

### 2. 📚 책 목록 페이지
- 생성된 책 목록 조회
- 책 상세 페이지로 이동 가능
- 새 책 커버 생성 버튼 제공
<img width="2553" height="1339" alt="image" src="https://github.com/user-attachments/assets/c7521d73-02fb-4f9f-85db-256591922e6b" />

### 3. 🎨 책 커버 생성 페이지
- 기본 템플릿 기반 커버 생성
- 커버 스타일 선택, 제목/저자 입력
- 생성된 커버는 후보 3개 중에 1개 이미지 선택하여 저장
<img width="2555" height="1345" alt="image" src="https://github.com/user-attachments/assets/d23e7c3b-0afe-4152-9b12-c5e314e67a45" />
<img width="2550" height="1348" alt="image" src="https://github.com/user-attachments/assets/dfb91bbb-8313-4c32-8125-fb401eeeb97c" />

### 4. ✏️ 책 커버 수정 페이지
- 기존 커버 데이터 불러오기
- 텍스트/색상/레이아웃 수정 가능
- 수정 후 다시 저장하거나 미리보기 가능
<img width="2549" height="1343" alt="image" src="https://github.com/user-attachments/assets/33e45eb2-2693-41b7-882a-34aa55fd553c" />
<img width="2555" height="1347" alt="image" src="https://github.com/user-attachments/assets/5272a127-7caf-4376-8d1d-c44891dd39ef" />

### 5. 📘 책 상세 페이지
- 책 정보 + 생성된 커버 이미지 보여줌
- 수정 페이지 이동 및 삭 버튼 제공
<img width="2532" height="1344" alt="image" src="https://github.com/user-attachments/assets/d3485877-f057-45e3-b75e-abb267057113" />

---
## ⭐우리 프롬프트의 독자적 매력
<br/>

| 특징                      | 설명                            |
| ----------------------- | ----------------------------- |
| **스토리 기반 추상 그래픽 변환**    | 텍스트 → 감정 → 색감/형태로 변환하는 독창적 구조 |
| **상단 25% 공백 룰**         | 실제 북 커버 UI에 최적화된 고유 규칙        |
| **절대 금지 요소 시스템**        | 3D, 텍스트, 모형 출력 문제를 완전히 차단     |
| **순수 2D 추상 그래픽**        | 즉시 출판·디자인에 쓰기 적합              |
| **장르 분위기 최우선 반영**       | 추상적이지만 주제성 유지                 |
| **사용자 요청은 ‘추상 요소’만 반영** | 안정적인 결과 + 사용자 커스터마이징 가능       |

<br/>

---
## ⚙️ 설치 및 실행 (Installation & Setup)
1. 저장소 클론
```bash
git clone https://github.com/NoMoreChaos/mini-4th-frontend.git
cd mini-4th-frontend
```
2. 패키지 설치
```
npm install
```
3. 환경 변수 설정
- .env.local파일 생성 후 아래와 같이 입력:
```
NEXT_PUBLIC_API_BASE_URL=
OPENAI_API_KEY=
```
4. 개발 서버 실행
```
npm run dev
```
<br/>

## 🛠️ API 구조 (예시)
| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| POST   | /api/user/login     | **계정 로그**   |
| GET    | /api/books     | **책 목록 조회**   |
| POST   | /api/books     | **새 책 등록**     |
| GET    | /api/books/detail | **책 상세 조회**   |
| GET   | /api/books/modify/{book id} | **책 정보 수정**   |
| PUT    |/api/books/modify/{book id} | **책 정보 수정**   |
| DELETE | /api/books/delete | **책 삭제**        |

<br/>

## 📂 프로젝트 폴더 구조

```
src/
├── api/
│
├── app/
│   ├── api/            # Next.js API Routes
│   ├── bookCreate/     # 책 커버 생성 페이지
│   ├── bookEdit/       # 책 커버 수정 페이지
│   ├── components/     # 재사용 가능 UI 컴포넌트
│   ├── data/           # 더미 데이터 / 정적 데이터
│   ├── detail/         # 책 상세 페이지
│   ├── login/          # 로그인 페이지
│   ├── favicon.ico
│   ├── globals.css     # 전역 스타일(Tailwind 포함)
│   ├── layout.tsx      # 공통 레이아웃 및 Provider 설정
│   ├── page.tsx        # 홈 페이지 (목록)
│   └── providers.tsx   # MUI 등 전역 Provider 모음
│
├── hooks/              # 커스텀 React Hooks
└── types/              # TypeScript 타입 정의
```
