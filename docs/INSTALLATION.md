# 설치 가이드

@gractor/ui 라이브러리를 프로젝트에 설치하는 방법을 안내합니다.

## 📋 사전 요구사항

설치하기 전에 다음 사항을 확인하세요:

- **Node.js**: 18.0.0 이상
- **npm**: 9.0.0 이상 (또는 yarn 1.22.0 이상)
- **Git**: 2.0.0 이상 (Git 설치가 필요한 경우)
- **React**: 18.0.0 이상 또는 19.0.0 이상

### Node.js 및 npm 버전 확인

```bash
node --version   # v18.0.0 이상
npm --version    # 9.0.0 이상
```

### Git 설치 확인

```bash
git --version    # 2.0.0 이상
```

Git이 설치되어 있지 않다면 아래 링크에서 설치하세요:
- **Windows**: https://git-scm.com/download/win
- **macOS**: `brew install git` 또는 https://git-scm.com/download/mac
- **Linux (Ubuntu/Debian)**: `sudo apt-get install git`
- **Linux (CentOS/Fedora)**: `sudo yum install git`

## 🚀 설치 방법

### 방법 1: GitHub에서 직접 설치 (권장)

가장 간단한 방법입니다. npm이 자동으로 GitHub 저장소에서 패키지를 다운로드합니다.

```bash
# 최신 main 브랜치 설치
npm install github:Gwang-eon/ui-library

# 또는 HTTPS URL 사용
npm install git+https://github.com/Gwang-eon/ui-library.git
```

**장점:**
- ✅ 빠르고 간편한 설치
- ✅ 항상 최신 버전 사용
- ✅ package.json에 자동 등록

**단점:**
- ❌ 소스 코드 수정 불가
- ❌ 로컬 개발 시 실시간 반영 불가

### 방법 2: 특정 브랜치/태그 설치

특정 버전이나 브랜치를 설치할 수 있습니다.

```bash
# 특정 브랜치 설치
npm install github:Gwang-eon/ui-library#develop

# 특정 태그/릴리스 설치
npm install github:Gwang-eon/ui-library#v1.2.2

# 특정 커밋 해시 설치
npm install github:Gwang-eon/ui-library#b37917c
```

### 방법 3: Git Clone 후 로컬 설치 (개발용)

라이브러리를 수정하거나 기여하려는 경우 이 방법을 사용하세요.

#### 1) 저장소 클론

```bash
# HTTPS 클론
git clone https://github.com/Gwang-eon/ui-library.git

# 또는 SSH 클론 (GitHub SSH 키 설정 필요)
git clone git@github.com:Gwang-eon/ui-library.git

# 클론한 디렉토리로 이동
cd ui-library
```

#### 2) 의존성 설치 및 빌드

```bash
# 의존성 설치
npm install

# 라이브러리 빌드
npm run build

# 데모 실행 (선택 사항)
npm run dev:demo
```

#### 3) 프로젝트에 로컬 경로로 연결

```bash
# ui-library의 절대 경로 확인
pwd   # 예: /Users/yourname/projects/ui-library

# 프로젝트 디렉토리로 이동
cd /path/to/your-project

# 로컬 경로로 설치
npm install /Users/yourname/projects/ui-library

# 또는 상대 경로 사용
npm install ../ui-library
```

**장점:**
- ✅ 소스 코드 직접 수정 가능
- ✅ 실시간 개발 및 테스트
- ✅ 라이브러리 기여 가능

**단점:**
- ❌ 설정 및 빌드 과정 필요
- ❌ 변경 시마다 재빌드 필요

### 방법 4: npm link 사용 (개발용 - 고급)

라이브러리를 여러 프로젝트에서 동시에 개발할 때 유용합니다.

```bash
# 1. ui-library 디렉토리에서
cd /path/to/ui-library
npm link

# 2. 프로젝트 디렉토리에서
cd /path/to/your-project
npm link @gractor/ui

# 링크 해제
npm unlink @gractor/ui
```

## 📦 설치 후 설정

### 1. CSS 파일 임포트

프로젝트의 진입점 파일(예: `app/layout.tsx`, `pages/_app.tsx`, `main.tsx`)에서 CSS를 임포트하세요.

**Next.js App Router:**
```tsx
// app/layout.tsx
import '@gractor/ui/dist/styles/all.css';  // 디자인 토큰 + 기본 스타일
import '@gractor/ui/dist/ui.css';          // 컴포넌트 스타일

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
```

**Next.js Pages Router:**
```tsx
// pages/_app.tsx
import '@gractor/ui/dist/styles/all.css';
import '@gractor/ui/dist/ui.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

**Vite/Create React App:**
```tsx
// main.tsx 또는 index.tsx
import '@gractor/ui/dist/styles/all.css';
import '@gractor/ui/dist/ui.css';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
```

⚠️ **중요**: CSS 파일 임포트 순서를 반드시 지켜주세요. `all.css`를 먼저, `ui.css`를 나중에 임포트해야 합니다.

### 2. 컴포넌트 사용

```tsx
import { Button, Input, Card, DataGrid, Badge } from '@gractor/ui';

function MyComponent() {
  return (
    <Card>
      <Input placeholder="검색..." />
      <Button variant="primary">제출</Button>
      <Badge variant="success">활성</Badge>
    </Card>
  );
}
```

### 3. TypeScript 설정 (선택 사항)

TypeScript 프로젝트의 경우 타입 정의가 자동으로 제공됩니다.

```tsx
import type { ButtonProps, InputProps } from '@gractor/ui';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## 🔧 트러블슈팅

### 문제 1: "Cannot find module '@gractor/ui'"

**원인**: 패키지가 제대로 설치되지 않았거나 node_modules가 손상됨

**해결책:**
```bash
# node_modules 및 package-lock.json 삭제
rm -rf node_modules package-lock.json

# 캐시 정리
npm cache clean --force

# 재설치
npm install
npm install github:Gwang-eon/ui-library
```

### 문제 2: "Git is not installed" 에러

**원인**: Git이 시스템에 설치되지 않음

**해결책:**
1. Git 설치: https://git-scm.com/downloads
2. 설치 후 터미널 재시작
3. `git --version`으로 설치 확인
4. npm install 재실행

### 문제 3: CSS 스타일이 적용되지 않음

**원인**: CSS 파일 임포트가 누락되었거나 순서가 잘못됨

**해결책:**
```tsx
// 올바른 순서로 임포트
import '@gractor/ui/dist/styles/all.css';  // 1번째
import '@gractor/ui/dist/ui.css';          // 2번째
```

### 문제 4: GitHub 접근 권한 에러 (Private Repo)

**원인**: Private 저장소에 접근하려면 인증이 필요함

**해결책:**
```bash
# Personal Access Token (PAT) 생성
# 1. GitHub > Settings > Developer settings > Personal access tokens
# 2. Generate new token (classic)
# 3. repo 권한 선택

# PAT를 사용한 설치
npm install git+https://<TOKEN>@github.com/Gwang-eon/ui-library.git
```

### 문제 5: 빌드 에러 - "dist 폴더를 찾을 수 없음"

**원인**: GitHub에서 설치한 패키지에 dist 폴더가 포함되지 않음

**해결책:**
```bash
# 방법 1: dist 폴더가 포함된 릴리스 태그 사용
npm install github:Gwang-eon/ui-library#v1.2.2

# 방법 2: 로컬 클론 후 빌드
git clone https://github.com/Gwang-eon/ui-library.git
cd ui-library
npm install
npm run build
cd /path/to/your-project
npm install /path/to/ui-library
```

### 문제 6: React 버전 충돌

**원인**: Peer dependency 불일치

**해결책:**
```bash
# React 버전 확인
npm list react

# React 18 또는 19로 업그레이드
npm install react@18 react-dom@18

# 또는 강제 설치 (권장하지 않음)
npm install --legacy-peer-deps
```

## 🔄 업데이트 방법

### GitHub 패키지 업데이트

```bash
# 최신 버전으로 업데이트
npm update @gractor/ui

# 또는 완전히 재설치
npm uninstall @gractor/ui
npm install github:Gwang-eon/ui-library
```

### 로컬 패키지 업데이트

```bash
# ui-library 디렉토리에서
cd /path/to/ui-library

# 최신 코드 가져오기
git pull origin main

# 의존성 업데이트
npm install

# 재빌드
npm run build
```

## 📚 다음 단계

설치가 완료되었다면:

1. 📖 [사용 가이드](./USAGE_GUIDE.md) - 컴포넌트 사용법
2. 🎨 [디자인 토큰](../README.md#디자인-토큰) - 색상, 간격, 타이포그래피
3. 🚀 [데모 실행](../README.md#데모-실행) - 인터랙티브 컴포넌트 데모
4. 🤝 [기여 가이드](../CONTRIBUTING.md) - 라이브러리 기여 방법

## 💬 문의

설치 중 문제가 발생하면:
- GitHub Issues: https://github.com/Gwang-eon/ui-library/issues
- 관련 정보 포함: Node.js 버전, npm 버전, OS, 에러 메시지
