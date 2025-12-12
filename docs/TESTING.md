# 테스트 가이드

## 개요

이 프로젝트는 **Vitest**와 **Testing Library**를 사용하여 컴포넌트 테스트를 수행합니다.

## 테스트 실행

```bash
# 감시 모드 (개발 중 사용)
npm run test

# 단일 실행
npm run test:run

# 커버리지 리포트 생성
npm run test:coverage

# Vitest UI (브라우저에서 테스트 결과 확인)
npm run test:ui
```

## 테스트 구조

### 디렉토리 구조

```
src/
├── test/
│   ├── setup.ts          # 전역 테스트 설정
│   └── utils/
│       └── render.tsx    # 커스텀 렌더 유틸리티
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.module.css
│   │   └── Button.test.tsx   # 테스트 파일
│   └── ...
```

### 테스트 파일 명명 규칙

- 컴포넌트와 같은 디렉토리에 `ComponentName.test.tsx` 형식으로 작성

## 테스트 작성 가이드

### 기본 구조

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(<ComponentName>내용</ComponentName>);
      expect(screen.getByText('내용')).toBeInTheDocument();
    });
  });

  describe('인터랙션', () => {
    it('클릭 이벤트가 정상 동작함', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<ComponentName onClick={handleClick}>클릭</ComponentName>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('접근성', () => {
    it('a11y 위반 사항이 없음', async () => {
      const { container } = render(<ComponentName>접근성 테스트</ComponentName>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
```

### 테스트 카테고리

각 컴포넌트 테스트는 다음 카테고리로 구성합니다:

| 카테고리 | 설명 | 예시 |
|---------|------|------|
| 렌더링 | 기본 렌더링, props 적용 확인 | children, className |
| variants | variant별 렌더링 확인 | primary, secondary, error |
| sizes | size별 렌더링 확인 | sm, md, lg |
| 인터랙션 | 사용자 상호작용 테스트 | click, hover, focus |
| 상태 | 컴포넌트 상태 변화 | disabled, loading, error |
| 접근성 | a11y 검증, 키보드 네비게이션 | axe 검사, Tab/Enter/Space |
| Ref 전달 | forwardRef 동작 확인 | ref.current 접근 |
| HTML 속성 | 기본 HTML 속성 전달 | data-*, aria-*, id |

## 주요 테스트 패턴

### 1. 사용자 이벤트

```typescript
import userEvent from '@testing-library/user-event';

it('클릭 테스트', async () => {
  const user = userEvent.setup();
  render(<Button onClick={handleClick}>버튼</Button>);

  await user.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalled();
});
```

### 2. 비동기 상태 변화

```typescript
import { waitFor } from '@testing-library/react';

it('비동기 동작 테스트', async () => {
  render(<AsyncComponent />);

  await waitFor(() => {
    expect(screen.getByText('로딩 완료')).toBeInTheDocument();
  });
});
```

### 3. 타이머 테스트 (Toast 등)

```typescript
import { vi, beforeEach, afterEach } from 'vitest';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

it('자동 닫기 테스트', () => {
  const onClose = vi.fn();
  render(<Toast duration={3000} onClose={onClose} />);

  vi.advanceTimersByTime(3000);
  expect(onClose).toHaveBeenCalled();
});
```

### 4. 접근성 테스트

```typescript
import { axe } from 'vitest-axe';

it('a11y 위반 없음', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

it('키보드 네비게이션', async () => {
  const user = userEvent.setup();
  render(<Component />);

  await user.tab();
  expect(screen.getByRole('button')).toHaveFocus();

  await user.keyboard('{Enter}');
  // 동작 확인
});
```

### 5. 제어/비제어 컴포넌트

```typescript
// 제어 컴포넌트
it('제어 컴포넌트 테스트', async () => {
  const ControlledComponent = () => {
    const [value, setValue] = React.useState('');
    return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
  };

  render(<ControlledComponent />);
  // 테스트 로직
});

// 비제어 컴포넌트
it('비제어 컴포넌트 테스트', () => {
  render(<Input defaultValue="초기값" />);
  // 테스트 로직
});
```

## 모킹

### 브라우저 API 모킹 (setup.ts)

다음 API들은 `src/test/setup.ts`에서 전역으로 모킹됩니다:

- `ResizeObserver`
- `IntersectionObserver`
- `matchMedia`
- `scrollTo`
- `scrollIntoView`
- `requestAnimationFrame`
- `cancelAnimationFrame`

### 함수 모킹

```typescript
const mockFn = vi.fn();
mockFn.mockReturnValue('반환값');
mockFn.mockImplementation(() => '구현');
```

## 커버리지 목표

| 메트릭 | 목표 |
|--------|------|
| Line Coverage | 80% |
| Branch Coverage | 75% |
| Function Coverage | 85% |
| Statement Coverage | 80% |

## 테스트된 컴포넌트 목록

현재 15개 핵심 컴포넌트에 대한 테스트가 완료되었습니다:

| 컴포넌트 | 테스트 파일 | 테스트 수 |
|---------|------------|----------|
| Button | Button.test.tsx | 34 |
| Input | Input.test.tsx | 43 |
| Checkbox | Checkbox.test.tsx | 25 |
| Radio | Radio.test.tsx | 26 |
| Toggle | Toggle.test.tsx | 24 |
| Select | Select.test.tsx | 34 |
| Modal | Modal.test.tsx | 29 |
| Alert | Alert.test.tsx | 15 |
| Toast | Toast.test.tsx | 17 |
| Card | Card.test.tsx | 28 |
| Tabs | Tabs.test.tsx | 22 |
| Badge | Badge.test.tsx | 20 |
| Tag | Tag.test.tsx | 29 |
| Progress | Progress.test.tsx | 44 |
| Pagination | Pagination.test.tsx | 32 |

**총 422개 테스트**

## 문제 해결

### Canvas 관련 경고

```
Not implemented: HTMLCanvasElement's getContext() method
```

이 경고는 jsdom 환경의 제한으로 발생하며, 테스트 결과에 영향을 주지 않습니다.

### CSS Modules 클래스

테스트에서 CSS Module 클래스를 확인할 때는 `vitest.config.ts`의 `classNameStrategy: 'non-scoped'` 설정으로 인해 원본 클래스명을 사용합니다:

```typescript
expect(element).toHaveClass('button-primary'); // O
expect(element).toHaveClass('_button-primary_abc123'); // X
```
