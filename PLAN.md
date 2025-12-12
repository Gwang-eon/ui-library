# Demo Page Update Plan

## Scope: Full (50+ components, including Mobile)

## Current Status
- **Total components in library:** 70+
- **Components in demo:** 33 (47%)
- **Missing components:** 50+ (53%)

### Current Categories in Demo
1. Form (9 components)
2. Data Display (7 components)
3. Feedback (7 components)
4. Navigation (6 components)
5. IoT (4 components)

### Missing by Category
| Category | In Demo | Total | Missing |
|----------|---------|-------|---------|
| Form | 9 | 16 | ColorPicker, DatePicker, Autocomplete, FileUpload, CascadeSelect, TreeSelect, Transfer |
| Data Display | 7 | 18 | Table, List, Descriptions, Timeline, Tree, Image, ImageViewer, Carousel, OrderList, DeviceCard, Knob |
| Feedback/Overlay | 7 | 12 | Toast, Message, Drawer, Popover, Popconfirm, NotificationCenter, Tour |
| Navigation | 6 | 13 | Menu, Navbar, Sidebar, Sidemenu, Anchor, BackTop, Affix, ButtonGroup, SplitButton, Toolbar |
| IoT | 4 | 19 | DeviceList, SensorPanel, AlarmPanel, DeviceControlPanel, EventDataTable, EventTimeline, ActivityLog, StatusCard, RealTimeMonitor, MapView, DeviceAnalytics, DashboardWidget, AutomationRules, ActivityCard, DeviceListItem |
| Mobile | 0 | 11 | ActionSheet, BottomSheet, FAB, MobileNavBar, PullToRefresh, SwipeActions, InfiniteScroll, VirtualList, Picker, SearchBar, Stepper |
| Utility | 0 | 2 | Watermark |

---

## Implementation Plan

### Phase 1: Restructure Categories
Update category navigation to include all component types:

```typescript
const categories = [
  { id: 'all', label: 'All' },
  { id: 'form', label: 'Form' },
  { id: 'display', label: 'Data Display' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'iot', label: 'IoT' },
  { id: 'mobile', label: 'Mobile' },
];
```

### Phase 2: Add Missing Form Components
**Files to modify:** `demo/App.tsx`

1. **ColorPicker** - Color selection with presets, HEX input, RGB sliders
2. **DatePicker** - Date selection (requires react-datepicker peer dep)
3. **Autocomplete** - Search with suggestions, category grouping
4. **FileUpload** - Drag & drop, preview, progress
5. **CascadeSelect** - Hierarchical selection (locations/categories)
6. **TreeSelect** - Tree structure selection
7. **Transfer** - Dual-list transfer

### Phase 3: Add Missing Data Display Components
1. **Table** - With sorting, expandable rows, selection, empty state
2. **List** - Basic list component
3. **Descriptions** - Key-value pairs display
4. **Timeline** - Event timeline
5. **Tree** - Hierarchical tree view
6. **Image/ImageViewer** - Image display with preview
7. **Carousel** - Image/content carousel
8. **DeviceCard** - IoT device card
9. **Knob** - Rotary control

### Phase 4: Add Missing Feedback/Overlay Components
1. **Toast** - Toast notifications (demo with trigger buttons)
2. **Message** - Full-page messages
3. **Drawer** - Side drawer (left/right/top/bottom)
4. **Popover** - Popover with content
5. **Popconfirm** - Confirmation popover
6. **NotificationCenter** - Full notification system
7. **Tour** - Feature tour guide

### Phase 5: Add Missing Navigation Components
1. **Menu** - Dropdown menu
2. **Navbar** - Top navigation bar
3. **Sidebar** - Side navigation
4. **Sidemenu** - Collapsible side menu
5. **Anchor** - Page anchor navigation
6. **BackTop** - Scroll to top button
7. **ButtonGroup/SplitButton** - Button groups
8. **Toolbar** - Toolbar component

### Phase 6: Expand IoT Section
1. **DeviceList** - Grid/list/compact views with sample devices
2. **SensorPanel** - Sensor data display with thresholds
3. **AlarmPanel** - Alarm list with severity filters
4. **DeviceControlPanel** - Controls (switches, sliders, modes)
5. **EventDataTable** - Event data table with sorting/filtering
6. **EventTimeline** - Event timeline
7. **ActivityLog** - Activity logging
8. **StatusCard** - Status cards with progress
9. **RealTimeMonitor** - Real-time data display
10. **DashboardWidget** - Various widget types
11. **AutomationRules** - Rule display

### Phase 7: Add Mobile Section
1. **ActionSheet** - Bottom action sheet
2. **BottomSheet** - Draggable bottom sheet
3. **FAB** - Floating action button
4. **MobileNavBar** - Mobile navigation
5. **PullToRefresh** - Pull to refresh
6. **SwipeActions** - Swipe gestures
7. **SearchBar** - Mobile search
8. **Stepper** - Mobile stepper

---

## Sample Data Required

### IoT Device Data
```typescript
const sampleDevices = [
  {
    id: 'dev-001',
    name: 'Temperature Sensor',
    type: 'sensor',
    status: 'online',
    stats: [{ label: 'Temperature', value: '23.5°C' }],
    meta: [{ icon: Wifi, label: 'Connected' }]
  },
  // ... more devices
];
```

### Event Data
```typescript
const sampleEvents = [
  {
    id: 'evt-001',
    time: '2024-01-15 10:30:00',
    severity: 'warning',
    eventType: { icon: 'alert', label: 'Threshold Alert' },
    device: { id: 'dev-001', type: 'sensor' },
    message: 'Temperature exceeded threshold',
    location: 'Building A, Floor 1'
  },
  // ... more events
];
```

### Alarm Data
```typescript
const sampleAlarms = [
  {
    icon: AlertTriangle,
    severity: 'critical',
    title: 'High Temperature Alert',
    description: 'Sensor reading above safe threshold',
    isNew: true,
    isAcknowledged: false
  },
  // ... more alarms
];
```

---

## Files to Modify

1. **`demo/App.tsx`** - Main demo file
   - Add all missing component imports
   - Add sample data generators
   - Add new category sections
   - Add interactive state management

2. **`demo/App.css`** - Styling updates
   - Mobile demo container styles
   - IoT component showcase styles
   - Any additional layout adjustments

3. **`demo/main.tsx`** - No changes needed

---

## Estimated Scope
- ~50 new component demos
- ~500-800 lines of sample data
- ~1500-2000 lines of new demo code
- 7 new/expanded sections

---

## Implementation Order
1. **Phase 1**: Form components (ColorPicker, DatePicker, Autocomplete, FileUpload, CascadeSelect, TreeSelect, Transfer)
2. **Phase 2**: Data Display (Table, List, Descriptions, Timeline, Tree, Image, Carousel, DeviceCard, Knob)
3. **Phase 3**: Feedback/Overlay (Toast, Message, Drawer, Popover, Popconfirm, NotificationCenter, Tour)
4. **Phase 4**: Navigation (Menu, Navbar, Sidebar, Sidemenu, Anchor, BackTop, ButtonGroup, SplitButton, Toolbar)
5. **Phase 5**: IoT components (DeviceList, SensorPanel, AlarmPanel, DeviceControlPanel, EventDataTable, EventTimeline, ActivityLog, StatusCard, RealTimeMonitor, DashboardWidget, AutomationRules)
6. **Phase 6**: Mobile components (ActionSheet, BottomSheet, FAB, MobileNavBar, PullToRefresh, SwipeActions, SearchBar, Stepper)

## Critical Files
- `/mnt/h/platform/ui-library/demo/App.tsx` - Main demo application
- `/mnt/h/platform/ui-library/demo/App.css` - Demo styles
- `/mnt/h/platform/ui-library/src/components/` - Component sources
