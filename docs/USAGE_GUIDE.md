# @gractor/ui 사용 가이드

IoT 플랫폼을 위한 React UI 컴포넌트 라이브러리입니다.

## 설치

### GitHub에서 직접 설치 (Vercel 배포용)

```bash
npm install github:Gwang-eon/ui-library
```

### 로컬 개발 환경

```bash
npm install /path/to/ui-library
```

## CSS 설정

### 필수 CSS 임포트

`layout.tsx` 또는 앱 진입점에서 다음 두 CSS 파일을 반드시 임포트해야 합니다:

```tsx
// src/app/layout.tsx
import "@gractor/ui/dist/styles/all.css";  // 디자인 토큰 + 기본 스타일
import "@gractor/ui/dist/ui.css";          // 컴포넌트 스타일 (CSS Modules)
```

### CSS 파일 설명

| 파일 | 크기 | 내용 |
|------|------|------|
| `all.css` | ~79KB | CSS 변수 (디자인 토큰), 기본 스타일, 리셋 |
| `ui.css` | ~528KB | 컴포넌트별 CSS Modules 스타일 (해시된 클래스명) |

## 컴포넌트 사용

### 기본 임포트

```tsx
import { Button, Input, Card, Table, Modal, Badge } from '@gractor/ui';
```

### 사용 예시

```tsx
'use client';

import { Button, Input, Card, Table, Badge, Modal } from '@gractor/ui';
import { Search, Plus } from 'lucide-react';

export default function ExamplePage() {
  return (
    <div>
      {/* 검색 입력 */}
      <Input
        size="sm"
        placeholder="검색..."
        leftIcon={<Search size={16} />}
      />

      {/* 버튼 */}
      <Button variant="primary" size="sm">
        <Plus size={16} />
        추가
      </Button>

      {/* 테이블 */}
      <Card>
        <Table.Container>
          <Table striped>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>이름</Table.HeaderCell>
                <Table.HeaderCell>상태</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              <Table.Row>
                <Table.Cell>항목 1</Table.Cell>
                <Table.Cell>
                  <Badge variant="success">활성</Badge>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Table.Container>
      </Card>
    </div>
  );
}
```

## 주요 컴포넌트

### Form 컴포넌트
- `Button` - 버튼 (variant: primary, secondary, outline, ghost, danger)
- `Input` - 텍스트 입력 (size: sm, md, lg)
- `Select` - 드롭다운 선택
- `Checkbox` - 체크박스
- `Radio` - 라디오 버튼
- `Toggle` - 토글 스위치
- `Textarea` - 텍스트 영역
- `DatePicker` - 날짜 선택

### Data Display 컴포넌트
- `Table` - 테이블 (Table.Head, Table.Body, Table.Row, Table.Cell, Table.EmptyState)
- `Card` - 카드 컨테이너
- `Badge` - 상태 배지 (variant: default, success, warning, error, info)
- `Tag` - 태그
- `Avatar` - 아바타
- `Statistic` - 통계 표시

### Feedback 컴포넌트
- `Modal` - 모달 다이얼로그
- `Drawer` - 슬라이드 패널
- `Alert` - 알림 메시지
- `Toast` - 토스트 알림
- `Spin` - 로딩 스피너
- `Progress` - 진행 표시줄
- `Skeleton` - 스켈레톤 로딩

### Navigation 컴포넌트
- `Menu` - 메뉴
- `Tabs` - 탭
- `Breadcrumb` - 경로 표시
- `Pagination` - 페이지네이션
- `Steps` - 단계 표시

## 알려진 이슈 및 해결책

### Table.EmptyState absolute positioning 이슈

`Table.EmptyState`는 내부적으로 `position: absolute`를 사용합니다. 이로 인해 EmptyState가 페이지의 다른 요소를 덮을 수 있습니다.

**해결책**: Card를 `position: relative`가 적용된 wrapper로 감싸세요.

```css
/* shared.module.css */
.tableWrapper {
  position: relative;
  min-height: 400px;
}
```

```tsx
{/* 테이블 */}
<div className={styles.tableWrapper}>
  <Card>
    <Table.Container>
      {data.length > 0 ? (
        <Table>...</Table>
      ) : (
        <Table.EmptyState
          icon={<Building2 size={64} />}
          title="데이터가 없습니다"
          description="새로운 항목을 추가해주세요."
        />
      )}
    </Table.Container>
  </Card>
</div>
```

## 디자인 토큰

CSS 변수로 제공되는 디자인 토큰을 활용하세요:

```css
/* 색상 */
var(--color-primary-500)
var(--color-gray-500)
var(--color-success-500)
var(--color-warning-500)
var(--color-error-500)

/* 간격 */
var(--spacing-1)  /* 4px */
var(--spacing-2)  /* 8px */
var(--spacing-3)  /* 12px */
var(--spacing-4)  /* 16px */
var(--spacing-6)  /* 24px */
var(--spacing-8)  /* 32px */

/* 폰트 */
var(--font-size-sm)
var(--font-size-md)
var(--font-size-lg)
var(--font-weight-medium)
var(--font-weight-semibold)

/* 표면 색상 */
var(--surface-primary)
var(--surface-secondary)
```

## TypeScript 지원

모든 컴포넌트는 TypeScript로 작성되었으며, 타입 정의가 포함되어 있습니다:

```tsx
import type { ButtonProps, InputProps, SelectProps } from '@gractor/ui';
```

## 배포 시 주의사항

1. **dist 폴더 필수**: GitHub 저장소에 `dist/` 폴더가 포함되어 있어야 합니다
2. **CSS 임포트 순서**: `all.css`를 먼저, 그 다음 `ui.css`를 임포트하세요
3. **클라이언트 컴포넌트**: 대부분의 UI 컴포넌트는 클라이언트 사이드에서 동작하므로 `'use client'` 지시문이 필요할 수 있습니다

## 문의

문제가 발생하면 이슈를 등록해주세요.
