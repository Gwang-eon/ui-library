# Contributing to @gractor/ui

@gractor/ui에 기여해 주셔서 감사합니다!

## 개발 환경 설정

### 요구 사항

- Node.js 18.0.0 이상
- npm 9.0.0 이상

### 설치

```bash
# 저장소 클론
git clone https://github.com/Gwang-eon/ui-library.git
cd ui-library

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 개발 워크플로우

### 브랜치 전략

```
main          # 프로덕션 배포 브랜치
├── feat/*    # 새 기능
├── fix/*     # 버그 수정
├── docs/*    # 문서 수정
└── refactor/* # 리팩토링
```

### 커밋 메시지 컨벤션

[Conventional Commits](https://www.conventionalcommits.org/) 스펙을 따릅니다:

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅 (기능 변경 없음)
refactor: 코드 리팩토링
test: 테스트 추가/수정
chore: 빌드, 설정 파일 수정
```

예시:
```bash
git commit -m "feat(Button): add loading state"
git commit -m "fix(Modal): resolve focus trap issue"
git commit -m "docs: update installation guide"
```

## 새 컴포넌트 추가하기

### 1. 디렉토리 구조

```
src/components/ComponentName/
├── ComponentName.tsx        # 컴포넌트 구현
├── ComponentName.module.css # 스타일
└── index.ts                 # 내보내기
```

### 2. 컴포넌트 템플릿

```tsx
import React from 'react';
import styles from './ComponentName.module.css';

export interface ComponentNameProps {
  /** 설명 */
  prop?: string;
  /** 추가 클래스 */
  className?: string;
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  prop,
  className = '',
}) => {
  return (
    <div className={`${styles.componentName} ${className}`}>
      {/* 구현 */}
    </div>
  );
};

ComponentName.displayName = 'ComponentName';
```

### 3. 스타일 가이드라인

- CSS Modules 사용
- 디자인 토큰 변수 사용 (`var(--color-primary-500)`)
- 다크 모드 지원 필수
- `prefers-reduced-motion` 지원

```css
/* 다크 모드 */
@media (prefers-color-scheme: dark) {
  .component {
    background: var(--palette-gray-900);
  }
}

/* 모션 감소 */
@media (prefers-reduced-motion: reduce) {
  .component {
    transition: none;
  }
}
```

### 4. 접근성 (a11y)

- 적절한 ARIA 속성 사용
- 키보드 네비게이션 지원
- 포커스 상태 시각적 표시

```tsx
<button
  aria-label="Close"
  aria-expanded={isOpen}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
```

### 5. 내보내기

`src/index.ts`에 컴포넌트 추가:

```ts
export * from './components/ComponentName';
```

## Pull Request 가이드

### PR 체크리스트

- [ ] `npm run build` 성공
- [ ] TypeScript 에러 없음
- [ ] 다크 모드 지원
- [ ] 모바일 반응형 지원
- [ ] 접근성 속성 추가
- [ ] README 업데이트 (필요시)

### PR 템플릿

```markdown
## 변경 사항

- 변경 1
- 변경 2

## 스크린샷 (UI 변경 시)

## 테스트 방법

1. ...
2. ...
```

## 코드 스타일

### TypeScript

- `interface` 사용 (type보다 선호)
- Props 인터페이스에 JSDoc 주석
- 명시적 반환 타입 (복잡한 경우)

### React

- 함수형 컴포넌트 사용
- `forwardRef` 지원 (폼 요소)
- `displayName` 설정

## 질문 및 지원

- GitHub Issues: 버그 리포트, 기능 요청
- Discussions: 질문, 아이디어 논의

감사합니다!
