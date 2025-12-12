# 컴포넌트 API 문서

## 개요

이 라이브러리는 **98개의 재사용 가능한 React 컴포넌트**를 제공합니다.
모든 컴포넌트는 TypeScript로 작성되었으며, CSS Modules을 사용합니다.

---

## 컴포넌트 목록

### 기본 컴포넌트

| 컴포넌트 | 설명 | 테스트 |
|---------|------|-------|
| [Button](#button) | 버튼 | ✅ |
| [Input](#input) | 텍스트 입력 | ✅ |
| [Checkbox](#checkbox) | 체크박스 | ✅ |
| [Radio](#radio) | 라디오 버튼 | ✅ |
| [Toggle](#toggle) | 토글 스위치 | ✅ |
| [Select](#select) | 드롭다운 선택 | ✅ |
| [Textarea](#textarea) | 멀티라인 텍스트 |  |

### 피드백 컴포넌트

| 컴포넌트 | 설명 | 테스트 |
|---------|------|-------|
| [Alert](#alert) | 알림 메시지 | ✅ |
| [Toast](#toast) | 토스트 알림 | ✅ |
| [Modal](#modal) | 모달 다이얼로그 | ✅ |
| [Progress](#progress) | 진행률 표시 | ✅ |
| Spin | 로딩 스피너 |  |
| Message | 메시지 |  |
| Result | 결과 상태 |  |

### 네비게이션 컴포넌트

| 컴포넌트 | 설명 | 테스트 |
|---------|------|-------|
| [Tabs](#tabs) | 탭 네비게이션 | ✅ |
| [Pagination](#pagination) | 페이지네이션 | ✅ |
| Menu | 메뉴 |  |
| Breadcrumb | 브레드크럼 |  |
| Steps | 단계 표시 |  |
| Navbar | 상단 네비게이션 |  |
| Sidemenu | 사이드 메뉴 |  |

### 데이터 표시 컴포넌트

| 컴포넌트 | 설명 | 테스트 |
|---------|------|-------|
| [Card](#card) | 카드 레이아웃 | ✅ |
| [Badge](#badge) | 배지 | ✅ |
| [Tag](#tag) | 태그 | ✅ |
| Table | 테이블 |  |
| DataGrid | 데이터 그리드 |  |
| List | 리스트 |  |
| Descriptions | 설명 목록 |  |
| Statistic | 통계 수치 |  |
| Timeline | 타임라인 |  |

### 기타 컴포넌트

| 컴포넌트 | 설명 |
|---------|------|
| Accordion | 아코디언 |
| Avatar | 아바타 |
| Carousel | 캐러셀 |
| ColorPicker | 색상 선택기 |
| DatePicker | 날짜 선택기 |
| Divider | 구분선 |
| Drawer | 드로어 |
| EmptyState | 빈 상태 |
| FileUpload | 파일 업로드 |
| Image | 이미지 |
| Popover | 팝오버 |
| Popconfirm | 확인 팝오버 |
| Rating | 별점 |
| Skeleton | 스켈레톤 |
| Slider | 슬라이더 |
| Tooltip | 툴팁 |
| Transfer | 전송 |
| Tree | 트리 |
| TreeSelect | 트리 선택 |
| Watermark | 워터마크 |

---

## 핵심 컴포넌트 API

### Button

버튼 컴포넌트.

```tsx
import { Button } from '@/components';

<Button variant="primary" size="md" loading={false}>
  저장
</Button>
```

#### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger' \| 'success' \| 'warning' \| 'error'` | `'primary'` | 버튼 스타일 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | 버튼 크기 |
| `loading` | `boolean` | `false` | 로딩 상태 |
| `icon` | `ReactNode` | - | 아이콘 |
| `iconOnly` | `boolean` | `false` | 아이콘 전용 버튼 |
| `disabled` | `boolean` | `false` | 비활성화 |
| `className` | `string` | - | 추가 클래스 |

#### 예제

```tsx
// 기본 버튼
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>

// 로딩 상태
<Button loading>저장 중...</Button>

// 아이콘 버튼
<Button icon={<PlusIcon />}>추가</Button>
<Button iconOnly aria-label="설정"><SettingsIcon /></Button>

// 크기
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

---

### Input

텍스트 입력 컴포넌트.

```tsx
import { Input } from '@/components';

<Input label="이메일" placeholder="example@email.com" />
```

#### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 입력 크기 |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | 상태 |
| `variant` | `'outlined' \| 'filled' \| 'underline' \| 'flush'` | `'outlined'` | 스타일 |
| `label` | `string` | - | 라벨 텍스트 |
| `labelPosition` | `'top' \| 'horizontal'` | `'top'` | 라벨 위치 |
| `helperText` | `string` | - | 도움말 텍스트 |
| `errorMessage` | `string` | - | 에러 메시지 |
| `successMessage` | `string` | - | 성공 메시지 |
| `warningMessage` | `string` | - | 경고 메시지 |
| `required` | `boolean` | `false` | 필수 표시 |
| `fullWidth` | `boolean` | `false` | 전체 너비 |
| `leftIcon` | `ReactNode` | - | 왼쪽 아이콘 |
| `rightIcon` | `ReactNode` | - | 오른쪽 아이콘 |

#### 예제

```tsx
// 기본 입력
<Input label="이름" placeholder="이름을 입력하세요" />

// 에러 상태
<Input
  label="이메일"
  state="error"
  errorMessage="유효한 이메일을 입력하세요"
/>

// 아이콘과 함께
<Input
  label="검색"
  leftIcon={<SearchIcon />}
  placeholder="검색어 입력..."
/>

// 필수 입력
<Input label="비밀번호" type="password" required />
```

---

### Checkbox

체크박스 컴포넌트.

```tsx
import { Checkbox } from '@/components';

<Checkbox label="동의합니다" />
```

#### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `label` | `string` | - | 라벨 텍스트 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 크기 |
| `indeterminate` | `boolean` | `false` | 부분 선택 상태 |
| `disabled` | `boolean` | `false` | 비활성화 |
| `checked` | `boolean` | - | 선택 상태 (제어) |
| `defaultChecked` | `boolean` | - | 기본 선택 상태 |
| `onChange` | `(e: ChangeEvent) => void` | - | 변경 핸들러 |

#### 예제

```tsx
// 기본 체크박스
<Checkbox label="이용약관에 동의합니다" />

// 부분 선택 상태
<Checkbox label="전체 선택" indeterminate />

// 제어 컴포넌트
const [checked, setChecked] = useState(false);
<Checkbox
  label="알림 받기"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>
```

---

### Radio

라디오 버튼 컴포넌트.

```tsx
import { Radio, RadioGroup } from '@/components';

<RadioGroup name="size" value="md" onChange={handleChange}>
  <Radio value="sm" label="Small" />
  <Radio value="md" label="Medium" />
  <Radio value="lg" label="Large" />
</RadioGroup>
```

#### RadioGroup Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `name` | `string` | - | 그룹 이름 |
| `value` | `string` | - | 선택된 값 |
| `defaultValue` | `string` | - | 기본 선택 값 |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | 방향 |
| `onChange` | `(value: string) => void` | - | 변경 핸들러 |
| `disabled` | `boolean` | `false` | 전체 비활성화 |

#### Radio Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `value` | `string` | - | 값 |
| `label` | `string` | - | 라벨 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 크기 |
| `disabled` | `boolean` | `false` | 비활성화 |

---

### Toggle

토글 스위치 컴포넌트.

```tsx
import { Toggle } from '@/components';

<Toggle label="알림" />
```

#### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `label` | `string` | - | 라벨 텍스트 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 크기 |
| `checked` | `boolean` | - | 상태 (제어) |
| `defaultChecked` | `boolean` | - | 기본 상태 |
| `disabled` | `boolean` | `false` | 비활성화 |
| `onChange` | `(e: ChangeEvent) => void` | - | 변경 핸들러 |

#### 예제

```tsx
// 기본 토글
<Toggle label="다크 모드" />

// 제어 컴포넌트
const [enabled, setEnabled] = useState(false);
<Toggle
  label="자동 저장"
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
/>
```

---

### Select

드롭다운 선택 컴포넌트.

```tsx
import { Select } from '@/components';

<Select
  label="국가"
  options={[
    { value: 'kr', label: '한국' },
    { value: 'us', label: '미국' },
    { value: 'jp', label: '일본' },
  ]}
/>
```

#### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `label` | `string` | - | 라벨 |
| `options` | `SelectOption[]` | `[]` | 옵션 목록 |
| `groups` | `SelectOptionGroup[]` | `[]` | 그룹화된 옵션 |
| `value` | `string` | - | 선택된 값 (제어) |
| `defaultValue` | `string` | `''` | 기본 선택 값 |
| `placeholder` | `string` | `'Select an option...'` | 플레이스홀더 |
| `state` | `'default' \| 'error'` | `'default'` | 상태 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 크기 |
| `disabled` | `boolean` | `false` | 비활성화 |
| `required` | `boolean` | `false` | 필수 표시 |
| `fullWidth` | `boolean` | `false` | 전체 너비 |
| `helperText` | `string` | - | 도움말 |
| `errorMessage` | `string` | - | 에러 메시지 |
| `onChange` | `(value, option) => void` | - | 변경 핸들러 |

#### SelectOption

```typescript
interface SelectOption {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}
```

#### 예제

```tsx
// 기본 사용
<Select
  label="카테고리"
  options={[
    { value: 'tech', label: '기술' },
    { value: 'design', label: '디자인' },
  ]}
  onChange={(value) => console.log(value)}
/>

// 그룹화
<Select
  label="지역"
  groups={[
    {
      label: '아시아',
      options: [
        { value: 'kr', label: '한국' },
        { value: 'jp', label: '일본' },
      ],
    },
    {
      label: '유럽',
      options: [
        { value: 'de', label: '독일' },
        { value: 'fr', label: '프랑스' },
      ],
    },
  ]}
/>
```

---

### Modal

모달 다이얼로그 컴포넌트.

```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle } from '@/components';

<Modal open={isOpen} onClose={() => setIsOpen(false)}>
  <ModalHeader onClose={() => setIsOpen(false)}>
    <ModalTitle>제목</ModalTitle>
  </ModalHeader>
  <ModalBody>내용</ModalBody>
  <ModalFooter>
    <Button onClick={() => setIsOpen(false)}>확인</Button>
  </ModalFooter>
</Modal>
```

#### Modal Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `open` | `boolean` | - | 열림 상태 |
| `onClose` | `() => void` | - | 닫기 핸들러 |
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | 크기 |
| `closeOnOverlayClick` | `boolean` | `true` | 오버레이 클릭 시 닫기 |
| `closeOnEscape` | `boolean` | `true` | Escape 키로 닫기 |

#### 기능

- 포커스 트랩 (Tab 키)
- Escape 키로 닫기
- 오버레이 클릭으로 닫기
- body 스크롤 방지
- 이전 포커스 복원

---

### Alert

알림 메시지 컴포넌트.

```tsx
import { Alert } from '@/components';

<Alert variant="info" title="알림" closable>
  새로운 업데이트가 있습니다.
</Alert>
```

#### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | 스타일 |
| `title` | `string` | - | 제목 |
| `icon` | `ReactNode` | - | 커스텀 아이콘 |
| `closable` | `boolean` | `false` | 닫기 버튼 표시 |
| `onClose` | `() => void` | - | 닫기 핸들러 |

---

### Toast

토스트 알림 컴포넌트.

```tsx
import { Toast } from '@/components';

<Toast
  variant="success"
  message="저장되었습니다"
  duration={3000}
  onClose={() => {}}
/>
```

#### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | 스타일 |
| `message` | `string` | - | 메시지 |
| `duration` | `number` | `3000` | 자동 닫힘 시간 (ms) |
| `position` | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'top-right'` | 위치 |
| `closable` | `boolean` | `true` | 닫기 버튼 |
| `onClose` | `() => void` | - | 닫기 핸들러 |

---

### Tabs

탭 네비게이션 컴포넌트.

```tsx
import { Tabs, TabsList, Tab, TabContent, TabPanel } from '@/components';

<Tabs defaultValue="tab1">
  <TabsList>
    <Tab value="tab1">탭 1</Tab>
    <Tab value="tab2">탭 2</Tab>
  </TabsList>
  <TabContent>
    <TabPanel value="tab1">패널 1 내용</TabPanel>
    <TabPanel value="tab2">패널 2 내용</TabPanel>
  </TabContent>
</Tabs>
```

#### Tabs Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `value` | `string` | - | 선택된 탭 (제어) |
| `defaultValue` | `string` | - | 기본 선택 탭 |
| `variant` | `'line' \| 'contained' \| 'pills'` | `'line'` | 스타일 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 크기 |
| `onChange` | `(value: string) => void` | - | 변경 핸들러 |

#### Tab Props

| Prop | 타입 | 설명 |
|------|------|------|
| `value` | `string` | 탭 값 |
| `disabled` | `boolean` | 비활성화 |

#### TabPanel Props

| Prop | 타입 | 설명 |
|------|------|------|
| `value` | `string` | 패널 값 |
| `keepMounted` | `boolean` | 비활성 시에도 DOM 유지 |

---

### Card

카드 레이아웃 컴포넌트.

```tsx
import { Card, CardHeader, CardBody, CardFooter, CardTitle, CardDescription } from '@/components';

<Card>
  <CardHeader>
    <CardTitle>카드 제목</CardTitle>
    <CardDescription>설명</CardDescription>
  </CardHeader>
  <CardBody>내용</CardBody>
  <CardFooter>
    <Button>액션</Button>
  </CardFooter>
</Card>
```

#### Card Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `variant` | `'elevated' \| 'outlined' \| 'filled'` | `'elevated'` | 스타일 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 패딩 크기 |
| `clickable` | `boolean` | `false` | 클릭 가능 |
| `selected` | `boolean` | `false` | 선택 상태 |

---

### Badge

배지 컴포넌트.

```tsx
import { Badge } from '@/components';

<Badge variant="primary">New</Badge>
<Badge variant="success">완료</Badge>
```

#### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'primary'` | 스타일 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 크기 |
| `rounded` | `boolean` | `false` | 둥근 모양 |
| `dot` | `boolean` | `false` | 점 형태 |

---

### Tag

태그 컴포넌트.

```tsx
import { Tag } from '@/components';

<Tag>기본</Tag>
<Tag variant="primary" closable onClose={() => {}}>삭제 가능</Tag>
```

#### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `variant` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | 스타일 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 크기 |
| `closable` | `boolean` | `false` | 닫기 버튼 |
| `icon` | `ReactNode` | - | 아이콘 |
| `onClose` | `() => void` | - | 닫기 핸들러 |

---

### Progress

진행률 표시 컴포넌트.

```tsx
import { Progress, ProgressBar, ProgressCircular, ProgressSpinner } from '@/components';

// 막대 형태
<Progress>
  <ProgressBar value={75} aria-label="진행률" />
</Progress>

// 원형
<ProgressCircular value={50} aria-label="진행률" />

// 스피너
<ProgressSpinner aria-label="로딩 중" />
```

#### ProgressBar Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `value` | `number` | `0` | 진행률 (0-100) |
| `variant` | `'primary' \| 'success' \| 'warning' \| 'error'` | `'primary'` | 색상 |
| `indeterminate` | `boolean` | `false` | 불확정 상태 |
| `striped` | `boolean` | `false` | 줄무늬 |
| `animated` | `boolean` | `false` | 애니메이션 |

#### ProgressCircular Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `value` | `number` | `0` | 진행률 |
| `variant` | `'primary' \| 'success' \| 'warning' \| 'error'` | `'primary'` | 색상 |
| `showLabel` | `boolean` | `true` | 라벨 표시 |

#### ProgressSpinner Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 크기 |
| `variant` | `'primary' \| 'success' \| 'warning' \| 'error' \| 'danger'` | `'primary'` | 색상 |

---

### Pagination

페이지네이션 컴포넌트.

```tsx
import { Pagination, SimplePagination } from '@/components';

// 기본
<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => setPage(page)}
/>

// 간단한 형태
<SimplePagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => setPage(page)}
/>
```

#### Pagination Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `currentPage` | `number` | - | 현재 페이지 |
| `totalPages` | `number` | - | 전체 페이지 수 |
| `onPageChange` | `(page: number) => void` | - | 변경 핸들러 |
| `showFirstLast` | `boolean` | `false` | 처음/마지막 버튼 |
| `showPrevNext` | `boolean` | `true` | 이전/다음 버튼 |

#### SimplePagination Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `currentPage` | `number` | - | 현재 페이지 |
| `totalPages` | `number` | - | 전체 페이지 수 |
| `onPageChange` | `(page: number) => void` | - | 변경 핸들러 |
| `showInfo` | `boolean` | `true` | 페이지 정보 표시 |
| `prevLabel` | `string` | `'Previous'` | 이전 버튼 라벨 |
| `nextLabel` | `string` | `'Next'` | 다음 버튼 라벨 |

---

## 공통 패턴

### forwardRef

모든 입력 컴포넌트는 `forwardRef`를 지원합니다:

```tsx
const inputRef = useRef<HTMLInputElement>(null);
<Input ref={inputRef} />
```

### 제어/비제어

대부분의 상태를 가진 컴포넌트는 제어/비제어 모드를 모두 지원합니다:

```tsx
// 비제어 (defaultValue)
<Input defaultValue="초기값" />

// 제어 (value + onChange)
const [value, setValue] = useState('');
<Input value={value} onChange={(e) => setValue(e.target.value)} />
```

### className

모든 컴포넌트는 추가 `className`을 받습니다:

```tsx
<Button className="my-custom-class">버튼</Button>
```

### HTML 속성

대부분의 컴포넌트는 기본 HTML 속성을 전달받습니다:

```tsx
<Button data-testid="submit-btn" aria-label="제출">
  제출
</Button>
```

---

## IoT 컴포넌트

IoT 대시보드용 특화 컴포넌트:

| 컴포넌트 | 설명 |
|---------|------|
| ActivityCard | 활동 카드 |
| ActivityLog | 활동 로그 |
| AlarmPanel | 알람 패널 |
| AutomationRules | 자동화 규칙 |
| ConnectionIndicator | 연결 상태 |
| DashboardWidget | 대시보드 위젯 |
| DeviceAnalytics | 디바이스 분석 |
| DeviceControlPanel | 디바이스 제어 |
| DeviceList | 디바이스 목록 |
| EventTimeline | 이벤트 타임라인 |
| KpiCard | KPI 카드 |
| MapView | 지도 뷰 |
| MetricCard | 메트릭 카드 |
| RealTimeMonitor | 실시간 모니터 |
| SensorPanel | 센서 패널 |
| StatusBadge | 상태 배지 |
| StatusCard | 상태 카드 |

---

## 모바일 컴포넌트

모바일 최적화 컴포넌트:

| 컴포넌트 | 설명 |
|---------|------|
| ActionSheet | 액션 시트 |
| BottomSheet | 바텀 시트 |
| FAB | 플로팅 액션 버튼 |
| InfiniteScroll | 무한 스크롤 |
| MobileNavBar | 모바일 네비게이션 |
| Picker | 피커 |
| PullToRefresh | 당겨서 새로고침 |
| SearchBar | 검색바 |
| Stepper | 스테퍼 |
| SwipeActions | 스와이프 액션 |
| VirtualList | 가상화 리스트 |

---

## 접근성

모든 컴포넌트는 WAI-ARIA 가이드라인을 따릅니다:

- 적절한 ARIA 속성
- 키보드 네비게이션 지원
- 포커스 관리
- 스크린 리더 호환

```tsx
// 자동 접근성 지원
<Modal open={isOpen}>...</Modal>  // role="dialog", aria-modal="true"
<Tabs>...</Tabs>                  // role="tablist", "tab", "tabpanel"
<Select>...</Select>              // role="combobox", "listbox", "option"
```
