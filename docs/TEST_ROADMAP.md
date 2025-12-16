# 테스트 로드맵

## 현재 상태

### 완료된 테스트 (50개 컴포넌트, 1720개 테스트)

#### Phase 1: 기본 컴포넌트 (15개, 422개 테스트)

| 컴포넌트 | 테스트 수 | 커버리지 |
|---------|----------|---------|
| Button | 34 | 100% |
| Input | 43 | 100% (95% branch) |
| Checkbox | 25 | 100% |
| Radio | 26 | 100% |
| Toggle | 24 | 100% |
| Select | 34 | 96% |
| Modal | 29 | 83% |
| Alert | 15 | 100% |
| Toast | 17 | 100% |
| Card | 28 | 100% |
| Tabs | 22 | 97% |
| Badge | 20 | 100% |
| Tag | 29 | 100% |
| Progress | 44 | 100% |
| Pagination | 32 | 100% |

#### Phase 2-1: 폼 컴포넌트 (3개, 161개 테스트)

| 컴포넌트 | 테스트 수 | 커버리지 |
|---------|----------|---------|
| Textarea | 50 | 100% |
| Slider | 54 | 100% |
| Rating | 57 | 89% |

#### Phase 2-2: 네비게이션 컴포넌트 (5개, 190개 테스트)

| 컴포넌트 | 테스트 수 | 커버리지 |
|---------|----------|---------|
| Menu | 36 | 100% |
| Breadcrumb | 30 | 100% |
| Steps | 38 | 97% |
| Navbar | 41 | 95% |
| Sidemenu | 45 | 97% |

#### Phase 2-3: 데이터 표시 컴포넌트 (5개, 182개 테스트)

| 컴포넌트 | 테스트 수 | 커버리지 |
|---------|----------|---------|
| List | 28 | 100% |
| Statistic | 39 | 100% |
| Descriptions | 28 | 100% |
| Timeline | 40 | 100% |
| Table | 47 | 100% |

#### Phase 2-4: 오버레이 컴포넌트 (4개, 139개 테스트)

| 컴포넌트 | 테스트 수 | 커버리지 |
|---------|----------|---------|
| Drawer | 34 | 100% |
| Popover | 30 | 100% |
| Popconfirm | 41 | 100% |
| Tooltip | 34 | 100% |

#### Phase 2-5: 기타 컴포넌트 (8개, 234개 테스트)

| 컴포넌트 | 테스트 수 | 커버리지 |
|---------|----------|---------|
| Accordion | 26 | 100% |
| Avatar | 40 | 100% |
| Carousel | 30 | 100% |
| Divider | 31 | 100% |
| EmptyState | 19 | 100% |
| Skeleton | 22 | 100% |
| Spin | 32 | 100% |
| Result | 34 | 100% |

**전체 커버리지**: 96%+ Statements / 92%+ Branch / 99%+ Functions

---

## Phase 2: 추가 테스트 계획

### 우선순위 1: 폼 컴포넌트 (3개)

| 컴포넌트 | 복잡도 | 테스트 포인트 |
|---------|--------|-------------|
| **Textarea** | 낮음 | resize, maxLength, rows, disabled |
| **Slider** | 중간 | value, range, step, marks, tooltip |
| **Rating** | 낮음 | value, half stars, readonly, hover |

예상 테스트 수: 60-80개

### 우선순위 2: 네비게이션 컴포넌트 (5개)

| 컴포넌트 | 복잡도 | 테스트 포인트 |
|---------|--------|-------------|
| **Menu** | 높음 | nested items, keyboard nav, submenu |
| **Breadcrumb** | 낮음 | items, separator, current page |
| **Steps** | 중간 | current step, status, clickable |
| **Navbar** | 중간 | responsive, menu toggle, active link |
| **Sidemenu** | 중간 | collapse, active item, submenu |

예상 테스트 수: 120-150개

### 우선순위 3: 데이터 표시 컴포넌트 (5개)

| 컴포넌트 | 복잡도 | 테스트 포인트 |
|---------|--------|-------------|
| **Table** | 높음 | sorting, filtering, pagination, selection |
| **List** | 낮음 | items, loading, empty state |
| **Descriptions** | 낮음 | items, layout, columns |
| **Statistic** | 낮음 | value, prefix, suffix, trend |
| **Timeline** | 중간 | items, mode, pending |

예상 테스트 수: 100-130개

### ~~우선순위 4: 오버레이 컴포넌트~~ ✅ 완료

Phase 2-4 섹션 참조 (4개 컴포넌트, 139개 테스트)

### ~~우선순위 5: 기타 컴포넌트~~ ✅ 완료

Phase 2-5 섹션 참조 (8개 컴포넌트, 234개 테스트)

#### Phase 3: 고급 컴포넌트 (10개, 390개 테스트)

| 컴포넌트 | 테스트 수 | 커버리지 |
|---------|----------|---------|
| ColorPicker | 44 | 100% |
| FileUpload | 39 | 100% |
| Autocomplete | 50 | 100% |
| CascadeSelect | 28 | 100% |
| DataGrid | 58 | 100% |
| Tree | 34 | 100% |
| TreeSelect | 41 | 100% |
| DatePicker | 42 | 100% |
| DateRangePicker | 37 | 100% |
| PresetRanges | 17 | 100% |

> **Note**: DatePicker 고도화 완료 - DateRangePicker, PresetRanges 추가

---

## Phase 4: 특화 컴포넌트

### IoT 컴포넌트 (17개)

| 컴포넌트 | 복잡도 | 우선순위 |
|---------|--------|---------|
| StatusCard | 낮음 | 높음 |
| MetricCard | 낮음 | 높음 |
| StatusBadge | 낮음 | 높음 |
| DeviceList | 중간 | 중간 |
| DeviceListItem | 낮음 | 중간 |
| ConnectionIndicator | 낮음 | 중간 |
| SensorPanel | 중간 | 중간 |
| ActivityLog | 중간 | 낮음 |
| EventTimeline | 중간 | 낮음 |
| 기타 8개 | 다양 | 낮음 |

예상 테스트 수: 150-200개

### 모바일 컴포넌트 (11개)

| 컴포넌트 | 복잡도 | 우선순위 |
|---------|--------|---------|
| BottomSheet | 중간 | 높음 |
| ActionSheet | 중간 | 높음 |
| SwipeActions | 높음 | 중간 |
| PullToRefresh | 높음 | 중간 |
| InfiniteScroll | 높음 | 중간 |
| 기타 6개 | 다양 | 낮음 |

예상 테스트 수: 100-150개

---

## 테스트 작성 우선순위 가이드

### 1. 사용 빈도 기준
- 가장 자주 사용되는 컴포넌트 우선
- API 문서에 포함된 컴포넌트 우선

### 2. 복잡도 기준
- 상태 관리가 복잡한 컴포넌트 우선
- 사용자 인터랙션이 많은 컴포넌트 우선
- 접근성 요구사항이 높은 컴포넌트 우선

### 3. 위험도 기준
- 데이터 입력/수정 컴포넌트 우선
- 폼 제출 관련 컴포넌트 우선
- 보안 민감 기능 우선

---

## 예상 일정

| Phase | 컴포넌트 수 | 테스트 수 |
|-------|-----------|--------------|
| Phase 1: 기본 컴포넌트 | 15 | 422 |
| Phase 2-1: 폼 컴포넌트 | 3 | 161 |
| Phase 2-2: 네비게이션 컴포넌트 | 5 | 190 |
| Phase 2-3: 데이터 표시 컴포넌트 | 5 | 182 |
| Phase 2-4: 오버레이 컴포넌트 | 4 | 139 |
| Phase 2-5: 기타 컴포넌트 | 8 | 234 |
| **완료 합계** | **40** | **1,328** |
| Phase 3: 고급 컴포넌트 | 8 | 예상 290-380 |
| Phase 4: 특화 컴포넌트 | 28 | 예상 250-350 |
| **총 목표** | **76** | **~1,900-2,100** |

---

## 테스트 품질 목표

### 커버리지 목표

| 메트릭 | 현재 | 목표 |
|--------|------|------|
| Line Coverage | 96% | 90%+ 유지 |
| Branch Coverage | 92% | 85%+ 유지 |
| Function Coverage | 99% | 95%+ 유지 |

### 테스트 유형 비율

| 유형 | 비율 |
|------|------|
| 렌더링 테스트 | 30% |
| 인터랙션 테스트 | 35% |
| 접근성 테스트 | 15% |
| 엣지 케이스 | 20% |

---

## 테스트 파일 템플릿

```typescript
/**
 * [ComponentName] 컴포넌트 테스트
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(<ComponentName />);
      expect(screen.getByRole('...')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    const variants = ['...'] as const;
    variants.forEach((variant) => {
      it(`${variant} variant가 정상 렌더링됨`, () => {
        // ...
      });
    });
  });

  describe('인터랙션', () => {
    it('클릭 이벤트가 정상 동작함', async () => {
      const user = userEvent.setup();
      // ...
    });
  });

  describe('접근성', () => {
    it('a11y 위반 사항이 없음', async () => {
      const { container } = render(<ComponentName />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
```

---

## 다음 단계

1. **Phase 3 시작**: ColorPicker, FileUpload, Autocomplete, CascadeSelect 테스트 작성 (DatePicker 제외 - 별도 고도화 필요)
2. **커버리지 모니터링**: CI에서 커버리지 리포트 자동화
3. **테스트 문서 업데이트**: 새 테스트 추가 시 TESTING.md 업데이트
