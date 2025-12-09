# @gractor/ui

IoT Platform UI Component Library

## 설치

```bash
# npm
npm install @gractor/ui

# 로컬 경로로 설치 (개발용)
npm install ../ui-library
```

## 사용법

### 기본 사용

```tsx
import { Button, Alert, Select } from '@gractor/ui';
import '@gractor/ui/styles';

function App() {
  return (
    <div>
      <Button variant="primary">클릭</Button>
      <Alert variant="success">성공!</Alert>
    </div>
  );
}
```

### 디자인 토큰 사용

```tsx
import { tokens, colors, spacing } from '@gractor/ui/tokens';

// 색상
const primary = colors.palette.blue[500];
const buttonBg = colors.component.button.primary.bg;

// 간격
const padding = spacing.spacing[4]; // '16px'
```

### CSS 스타일

```tsx
// 전체 스타일 (design-tokens + base + atomic)
import '@gractor/ui/styles';
```

## 컴포넌트 목록

### 폼 컴포넌트
| 컴포넌트 | 설명 |
|----------|------|
| `Button` | 버튼 |
| `ButtonGroup` | 버튼 그룹 |
| `Input` | 텍스트 입력 |
| `Select` | 선택 박스 |
| `Checkbox` | 체크박스 |
| `Radio` | 라디오 버튼 |
| `Toggle` | 토글 스위치 |
| `Textarea` | 텍스트 영역 |
| `FileUpload` | 파일 업로드 |
| `Slider` | 슬라이더 |
| `Rating` | 평점 |
| `ColorPicker` | 색상 선택 |
| `DatePicker` | 날짜 선택 |
| `Autocomplete` | 자동완성 |
| `CascadeSelect` | 계층 선택 |
| `TreeSelect` | 트리 선택 |
| `Transfer` | 전송 |
| `Knob` | 노브 컨트롤 |

### 데이터 표시
| 컴포넌트 | 설명 |
|----------|------|
| `Card` | 카드 |
| `List` | 리스트 |
| `Table` | 테이블 |
| `Tree` | 트리 |
| `Badge` | 뱃지 |
| `Avatar` | 아바타 |
| `Tag` | 태그 |
| `Descriptions` | 설명 목록 |
| `Statistic` | 통계 |
| `Timeline` | 타임라인 |
| `Carousel` | 캐러셀 |
| `Image` | 이미지 |
| `ImageViewer` | 이미지 뷰어 |

### 피드백
| 컴포넌트 | 설명 |
|----------|------|
| `Alert` | 알림 |
| `Toast` | 토스트 |
| `Message` | 메시지 |
| `Modal` | 모달 |
| `Drawer` | 드로어 |
| `Progress` | 진행률 |
| `Skeleton` | 스켈레톤 |
| `Spin` | 로딩 스피너 |
| `Result` | 결과 |
| `EmptyState` | 빈 상태 |
| `Popconfirm` | 팝업 확인 |

### 네비게이션
| 컴포넌트 | 설명 |
|----------|------|
| `Menu` | 메뉴 |
| `Navbar` | 내비게이션 바 |
| `Sidemenu` | 사이드 메뉴 |
| `Breadcrumb` | 브레드크럼 |
| `Pagination` | 페이지네이션 |
| `Tabs` | 탭 |
| `Steps` | 스텝 |
| `Anchor` | 앵커 |
| `BackTop` | 맨 위로 |
| `Affix` | 고정 |

### 오버레이
| 컴포넌트 | 설명 |
|----------|------|
| `Tooltip` | 툴팁 |
| `Popover` | 팝오버 |
| `Tour` | 투어 |

### 레이아웃
| 컴포넌트 | 설명 |
|----------|------|
| `Divider` | 구분선 |
| `Accordion` | 아코디언 |
| `Segmented` | 세그먼트 |
| `SplitButton` | 분할 버튼 |
| `Toolbar` | 툴바 |
| `Watermark` | 워터마크 |

### IoT 컴포넌트
| 컴포넌트 | 설명 |
|----------|------|
| `DeviceCard` | 디바이스 카드 |
| `StatusCard` | 상태 카드 |
| `KpiCard` | KPI 카드 |
| `MetricCard` | 메트릭 카드 |
| `ActivityCard` | 활동 카드 |
| `ConnectionIndicator` | 연결 표시기 |
| `StatusBadge` | 상태 뱃지 |
| `DeviceList` | 디바이스 목록 |
| `DeviceListItem` | 디바이스 목록 항목 |
| `DeviceControlPanel` | 디바이스 제어판 |
| `DeviceAnalytics` | 디바이스 분석 |
| `DashboardWidget` | 대시보드 위젯 |
| `SensorPanel` | 센서 패널 |
| `AlarmPanel` | 알람 패널 |
| `ActivityLog` | 활동 로그 |
| `EventTimeline` | 이벤트 타임라인 |
| `EventDataTable` | 이벤트 데이터 테이블 |
| `AutomationRules` | 자동화 규칙 |
| `RealTimeMonitor` | 실시간 모니터 |
| `MapView` | 맵 뷰 |

### 모바일 컴포넌트
| 컴포넌트 | 설명 |
|----------|------|
| `ActionSheet` | 액션 시트 |
| `BottomSheet` | 바텀 시트 |
| `FAB` | 플로팅 액션 버튼 |
| `MobileNavBar` | 모바일 내비게이션 |
| `PullToRefresh` | 당겨서 새로고침 |
| `SwipeActions` | 스와이프 액션 |

## 다크모드 지원

라이브러리는 다크모드를 완벽 지원합니다. 다음 두 가지 방식으로 다크모드를 활성화할 수 있습니다:

### 1. 시스템 설정 자동 감지
```css
/* 자동으로 prefers-color-scheme: dark 감지 */
@media (prefers-color-scheme: dark) {
  /* 다크모드 스타일 자동 적용 */
}
```

### 2. 수동 클래스 토글
```tsx
// body에 dark-mode 클래스 추가
document.body.classList.add('dark-mode');

// 또는 data-theme 속성 사용
document.documentElement.setAttribute('data-theme', 'dark');
```

```tsx
// 토글 예시
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    document.body.classList.toggle('dark-mode');
    setIsDark(!isDark);
  };

  return <Button onClick={toggleTheme}>{isDark ? '라이트' : '다크'} 모드</Button>;
}
```

## 데모 실행

```bash
npm install
npm run dev     # 개발 서버 실행 (브라우저 자동 열림)
npm run build   # 프로덕션 빌드
npm run preview # 빌드된 결과물 미리보기
```

## 빌드

```bash
npm install
npm run build
```

## 의존성

- React 18+ 또는 19+
- lucide-react (아이콘)

## 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

## 접근성

- 키보드 네비게이션 지원
- ARIA 속성 지원
- `prefers-reduced-motion` 지원
- 고대비 모드 지원 (`prefers-contrast: high`)

## 라이선스

MIT
