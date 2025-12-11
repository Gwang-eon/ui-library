import { useState, useRef } from 'react';
import './App.css';

// Lucide Icons
import {
  Plus,
  Save,
  Trash2,
  Edit,
  Search,
  Settings,
  User,
  Mail,
  Lock,
  Bell,
  Heart,
  Star,
  Download,
  Upload,
  RefreshCw,
  ChevronRight,
  ChevronDown,
  Home,
  Folder,
  File,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Wifi,
  WifiOff,
  Thermometer,
  Activity,
  Zap,
  Sun,
  Moon,
  ExternalLink,
  BookOpen,
  Code2,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Copy,
  Share,
  Archive,
  Power,
  Gauge,
  Droplets,
  Wind,
  Eye,
  Lightbulb,
  Fan,
  AirVent,
  LayoutGrid,
  List as ListIcon,
  LayoutList,
  TrendingUp,
  TrendingDown,
  Server,
  Database,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  Shield,
  Play,
  Pause,
  SkipForward,
  Volume2,
  Image as ImageIcon,
  FileText,
  Users,
  Building,
  Layers,
  Box,
  Package,
  Tag as TagIcon,
  Bookmark,
  Filter,
  SlidersHorizontal,
  BarChart3,
  PieChart,
  LineChart,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Menu as MenuIcon,
  X,
  Check,
  Minus,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Grid,
  Smartphone,
} from 'lucide-react';

// ============================================
// Form Components
// ============================================
import { Button } from '../src/components/Button';
import { Input } from '../src/components/Input';
import { Select } from '../src/components/Select';
import { Checkbox } from '../src/components/Checkbox';
import { Radio } from '../src/components/Radio';
import { Toggle } from '../src/components/Toggle';
import { Textarea } from '../src/components/Textarea';
import { Slider } from '../src/components/Slider';
import { Rating } from '../src/components/Rating';
import { ColorPicker } from '../src/components/ColorPicker';
import { Autocomplete } from '../src/components/Autocomplete';
import { FileUpload } from '../src/components/FileUpload';
import { CascadeSelect } from '../src/components/CascadeSelect';
import { TreeSelect } from '../src/components/TreeSelect';
import { Transfer } from '../src/components/Transfer';

// ============================================
// Data Display Components
// ============================================
import { Card } from '../src/components/Card';
import { Badge } from '../src/components/Badge';
import { Avatar } from '../src/components/Avatar';
import { Tag } from '../src/components/Tag';
import { Statistic } from '../src/components/Statistic';
import { Progress, ProgressBar } from '../src/components/Progress';
import { Divider } from '../src/components/Divider';
import { Table } from '../src/components/Table';
import { List } from '../src/components/List';
import { Descriptions } from '../src/components/Descriptions';
import { Timeline } from '../src/components/Timeline';
import { Tree } from '../src/components/Tree';
import { Image } from '../src/components/Image';
import { Carousel } from '../src/components/Carousel';
import { DeviceCard } from '../src/components/DeviceCard';
import { Knob } from '../src/components/Knob';

// ============================================
// Feedback Components
// ============================================
import { Alert } from '../src/components/Alert';
import { Skeleton } from '../src/components/Skeleton';
import { Spin } from '../src/components/Spin';
import { Result } from '../src/components/Result';
import { EmptyState } from '../src/components/EmptyState';
import { Toast } from '../src/components/Toast';
import { Message } from '../src/components/Message';
import { Drawer } from '../src/components/Drawer';
import { Popover, PopoverContent, PopoverHeader, PopoverTitle } from '../src/components/Popover';
import { Popconfirm } from '../src/components/Popconfirm';
import { Tour } from '../src/components/Tour';

// ============================================
// Navigation Components
// ============================================
import { Breadcrumb } from '../src/components/Breadcrumb';
import { Pagination } from '../src/components/Pagination';
import { Tabs, TabsList, Tab, TabPanel } from '../src/components/Tabs';
import { Steps } from '../src/components/Steps';
import { Tooltip } from '../src/components/Tooltip';
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from '../src/components/Modal';
import { Accordion } from '../src/components/Accordion';
import { Segmented } from '../src/components/Segmented';
import { Menu, MenuItem, MenuDivider } from '../src/components/Menu';
import { ButtonGroup } from '../src/components/ButtonGroup';
import { SplitButton } from '../src/components/SplitButton';
import { Toolbar, ToolbarSection, ToolbarDivider } from '../src/components/Toolbar';
import { BackTop } from '../src/components/BackTop';
import { Anchor } from '../src/components/Anchor';

// ============================================
// IoT Components
// ============================================
import { StatusBadge } from '../src/components/iot/StatusBadge';
import { ConnectionIndicator, SignalIndicator } from '../src/components/iot/ConnectionIndicator';
import { MetricCard, MiniChart } from '../src/components/iot/MetricCard';
import { KpiCard } from '../src/components/iot/KpiCard';
import DeviceList from '../src/components/iot/DeviceList';
import SensorPanel from '../src/components/iot/SensorPanel';
import { AlarmPanel, AlarmItem } from '../src/components/iot/AlarmPanel';
import { DeviceControlCard, ControlItem, TemperatureControl } from '../src/components/iot/DeviceControlPanel';
import { EventDataTable } from '../src/components/iot/EventDataTable';
import { EventTimeline, EventItem } from '../src/components/iot/EventTimeline';
import { LogContainer, LogEntry, ActivityLogItem } from '../src/components/iot/ActivityLog';
import { StatusCard } from '../src/components/iot/StatusCard';
import { StatWidget, ListWidget, StatusWidget } from '../src/components/iot/DashboardWidget';
import { AutomationRule } from '../src/components/iot/AutomationRules';

// ============================================
// Mobile Components
// ============================================
import { ActionSheet } from '../src/components/mobile/ActionSheet';
import { BottomSheet } from '../src/components/mobile/BottomSheet';
import { FAB, SpeedDialFAB } from '../src/components/mobile/FAB';
import { MobileNavBar } from '../src/components/mobile/MobileNavBar';
import { SearchBar } from '../src/components/mobile/SearchBar';
import { Stepper } from '../src/components/mobile/Stepper';

// ============================================
// Types & Data
// ============================================
type Category = 'form' | 'display' | 'feedback' | 'navigation' | 'iot' | 'mobile' | 'all';

const categories: { id: Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'form', label: 'Form' },
  { id: 'display', label: 'Data Display' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'iot', label: 'IoT' },
  { id: 'mobile', label: 'Mobile' },
];

// Sample Data
const autocompleteOptions = [
  { value: 'temp-01', label: 'Temperature Sensor', category: 'Sensors', icon: <Thermometer size={14} /> },
  { value: 'humid-01', label: 'Humidity Sensor', category: 'Sensors', icon: <Droplets size={14} /> },
  { value: 'press-01', label: 'Pressure Sensor', category: 'Sensors', icon: <Gauge size={14} /> },
  { value: 'light-01', label: 'Light Controller', category: 'Controllers', icon: <Lightbulb size={14} /> },
  { value: 'hvac-01', label: 'HVAC System', category: 'Controllers', icon: <AirVent size={14} /> },
  { value: 'fan-01', label: 'Fan Controller', category: 'Controllers', icon: <Fan size={14} /> },
];

const cascadeOptions = [
  {
    label: 'Building A',
    value: 'building-a',
    children: [
      {
        label: 'Floor 1',
        value: 'floor-1',
        children: [
          { label: 'Zone A', value: 'zone-a' },
          { label: 'Zone B', value: 'zone-b' },
        ],
      },
      {
        label: 'Floor 2',
        value: 'floor-2',
        children: [
          { label: 'Zone C', value: 'zone-c' },
          { label: 'Zone D', value: 'zone-d' },
        ],
      },
    ],
  },
  {
    label: 'Building B',
    value: 'building-b',
    children: [
      {
        label: 'Floor 1',
        value: 'b-floor-1',
        children: [{ label: 'Zone E', value: 'zone-e' }],
      },
    ],
  },
];

const treeSelectData = [
  {
    value: 'devices',
    label: 'Devices',
    icon: <Server size={14} />,
    children: [
      { value: 'sensors', label: 'Sensors', icon: <Thermometer size={14} /> },
      { value: 'controllers', label: 'Controllers', icon: <SlidersHorizontal size={14} /> },
      { value: 'gateways', label: 'Gateways', icon: <Network size={14} /> },
    ],
  },
  {
    value: 'systems',
    label: 'Systems',
    icon: <Layers size={14} />,
    children: [
      { value: 'hvac', label: 'HVAC', icon: <AirVent size={14} /> },
      { value: 'lighting', label: 'Lighting', icon: <Lightbulb size={14} /> },
      { value: 'security', label: 'Security', icon: <Shield size={14} /> },
    ],
  },
];

const transferData = [
  { key: '1', label: 'Temperature Sensor 1' },
  { key: '2', label: 'Temperature Sensor 2' },
  { key: '3', label: 'Humidity Sensor 1' },
  { key: '4', label: 'Pressure Sensor 1' },
  { key: '5', label: 'Light Sensor 1' },
  { key: '6', label: 'Motion Sensor 1' },
];

const tableData = [
  { id: '1', name: 'Temperature Sensor', status: 'online', location: 'Building A', lastUpdate: '2 min ago' },
  { id: '2', name: 'Humidity Sensor', status: 'online', location: 'Building A', lastUpdate: '5 min ago' },
  { id: '3', name: 'Pressure Sensor', status: 'warning', location: 'Building B', lastUpdate: '10 min ago' },
  { id: '4', name: 'Light Controller', status: 'offline', location: 'Building C', lastUpdate: '1 hour ago' },
];

const treeData = [
  {
    key: 'building-a',
    label: 'Building A',
    icon: <Building size={14} />,
    children: [
      {
        key: 'floor-1',
        label: 'Floor 1',
        icon: <Layers size={14} />,
        children: [
          { key: 'room-101', label: 'Room 101', icon: <Box size={14} /> },
          { key: 'room-102', label: 'Room 102', icon: <Box size={14} /> },
        ],
      },
      {
        key: 'floor-2',
        label: 'Floor 2',
        icon: <Layers size={14} />,
        children: [
          { key: 'room-201', label: 'Room 201', icon: <Box size={14} /> },
        ],
      },
    ],
  },
];

const sampleDevices = [
  {
    id: 'dev-001',
    name: 'Temperature Sensor',
    type: 'Sensor',
    status: 'online' as const,
    icon: Thermometer,
    iconGradient: 'primary' as const,
    stats: [
      { label: 'Temperature', value: '23.5°C' },
      { label: 'Humidity', value: '45%' },
    ],
    meta: [
      { icon: Wifi, label: 'Connected' },
      { icon: MapPin, label: 'Building A' },
    ],
  },
  {
    id: 'dev-002',
    name: 'HVAC Controller',
    type: 'Controller',
    status: 'online' as const,
    icon: AirVent,
    iconGradient: 'success' as const,
    stats: [
      { label: 'Mode', value: 'Cooling' },
      { label: 'Set Point', value: '22°C' },
    ],
    meta: [
      { icon: Wifi, label: 'Connected' },
      { icon: MapPin, label: 'Building A' },
    ],
  },
  {
    id: 'dev-003',
    name: 'Motion Sensor',
    type: 'Sensor',
    status: 'warning' as const,
    icon: Eye,
    iconGradient: 'warning' as const,
    stats: [{ label: 'Status', value: 'Low Battery' }],
    meta: [{ icon: MapPin, label: 'Building B' }],
  },
  {
    id: 'dev-004',
    name: 'Gateway',
    type: 'Gateway',
    status: 'offline' as const,
    icon: Network,
    iconGradient: 'error' as const,
    stats: [{ label: 'Status', value: 'Disconnected' }],
    meta: [{ icon: MapPin, label: 'Building C' }],
  },
];

const sampleEvents = [
  {
    id: 'evt-001',
    time: '2024-01-15 10:30:00',
    severity: 'critical' as const,
    eventType: { icon: '⚠️', label: 'Critical Alert' },
    device: { id: 'dev-001', type: 'Sensor' },
    message: 'Temperature exceeded critical threshold',
    location: 'Building A, Floor 1',
  },
  {
    id: 'evt-002',
    time: '2024-01-15 10:25:00',
    severity: 'warning' as const,
    eventType: { icon: '⚡', label: 'Warning' },
    device: { id: 'dev-003', type: 'Sensor' },
    message: 'Motion sensor battery low',
    location: 'Building B, Floor 2',
  },
  {
    id: 'evt-003',
    time: '2024-01-15 10:20:00',
    severity: 'info' as const,
    eventType: { icon: 'ℹ️', label: 'Info' },
    device: { id: 'dev-002', type: 'Controller' },
    message: 'HVAC mode changed to cooling',
    location: 'Building A, Floor 1',
  },
];

const tourSteps = [
  {
    target: '#demo-header',
    title: 'Welcome to @gractor/ui',
    content: 'This is the component library demo. Use the navigation to explore different components.',
    placement: 'bottom' as const,
  },
  {
    target: '#demo-nav',
    title: 'Category Navigation',
    content: 'Click on categories to filter components by type.',
    placement: 'bottom' as const,
  },
];

// ============================================
// Main App Component
// ============================================
function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [darkMode, setDarkMode] = useState(false);

  // Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerPlacement, setDrawerPlacement] = useState<'left' | 'right' | 'top' | 'bottom'>('right');

  // Popover & Menu States
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const popoverTriggerRef = useRef<HTMLButtonElement>(null);

  // Toast & Message States
  const [toastVisible, setToastVisible] = useState(false);
  const [toastVariant, setToastVariant] = useState<'info' | 'success' | 'warning' | 'error'>('info');
  const [messageVisible, setMessageVisible] = useState(false);

  // Tour State
  const [tourOpen, setTourOpen] = useState(false);

  // Mobile States
  const [actionSheetOpen, setActionSheetOpen] = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  // Form States
  const [transferTargetKeys, setTransferTargetKeys] = useState<string[]>(['1', '2']);
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [knobValue, setKnobValue] = useState(65);
  const [stepperValue, setStepperValue] = useState(1);
  const [deviceListView, setDeviceListView] = useState<'grid' | 'list' | 'compact'>('grid');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    // 기존 데모 스타일용
    document.body.classList.toggle('dark-mode', newDarkMode);
    // 컴포넌트 다크 테마용
    document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const showCategory = (cat: Category) => activeCategory === 'all' || activeCategory === cat;

  const showToast = (variant: 'info' | 'success' | 'warning' | 'error') => {
    setToastVariant(variant);
    setToastVisible(true);
  };

  return (
    <div className="demo-app">
      {/* Header */}
      <header id="demo-header" className="demo-header">
        <div className="demo-header-left">
          <h1>@gractor/ui</h1>
          <p>IoT Platform UI Component Library</p>
        </div>
        <div className="demo-header-right">
          <div className="demo-header-links">
            <a
              href="https://design-system-wheat-beta.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="demo-header-link"
            >
              <BookOpen size={14} />
              Storybook
              <ExternalLink size={12} />
            </a>
            <a
              href="https://pure-html-ui-kit.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="demo-header-link"
            >
              <Code2 size={14} />
              Pure HTML
              <ExternalLink size={12} />
            </a>
          </div>
          <div className="demo-header-actions">
            <Button variant="ghost" size="sm" onClick={() => setTourOpen(true)}>
              Tour
            </Button>
            <Button
              variant={darkMode ? 'primary' : 'outline'}
              size="sm"
              icon={darkMode ? <Moon size={16} /> : <Sun size={16} />}
              onClick={toggleDarkMode}
            >
              {darkMode ? 'Dark' : 'Light'}
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav id="demo-nav" className="demo-nav">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`demo-nav-item ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      <main className="demo-content">
        {/* ==================== FORM COMPONENTS ==================== */}
        {showCategory('form') && (
          <section className="demo-section">
            <h2>Form Components</h2>
            <div className="demo-grid">
              {/* Button */}
              <div className="demo-item">
                <h3>Button</h3>
                <div className="demo-row">
                  <Button variant="primary" icon={<Plus size={16} />}>Create</Button>
                  <Button variant="secondary" icon={<Save size={16} />}>Save</Button>
                  <Button variant="outline" icon={<Edit size={16} />}>Edit</Button>
                  <Button variant="ghost" icon={<Settings size={16} />}>Settings</Button>
                  <Button variant="danger" icon={<Trash2 size={16} />}>Delete</Button>
                </div>
                <div className="demo-row">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              {/* Input */}
              <div className="demo-item">
                <h3>Input</h3>
                <Input placeholder="Search..." prefix={<Search size={16} />} />
                <Input placeholder="Enter email" label="Email" prefix={<Mail size={16} />} />
                <Input placeholder="Password" type="password" prefix={<Lock size={16} />} />
                <Input placeholder="Error state" status="error" statusMessage="Invalid input" />
              </div>

              {/* Select */}
              <div className="demo-item">
                <h3>Select</h3>
                <Select
                  label="Device Type"
                  options={[
                    { value: 'sensor', label: 'Sensor' },
                    { value: 'controller', label: 'Controller' },
                    { value: 'gateway', label: 'Gateway' },
                  ]}
                  placeholder="Select type"
                />
              </div>

              {/* ColorPicker */}
              <div className="demo-item">
                <h3>ColorPicker</h3>
                <ColorPicker
                  label="Theme Color"
                  value={selectedColor}
                  onChange={setSelectedColor}
                />
              </div>

              {/* Autocomplete */}
              <div className="demo-item">
                <h3>Autocomplete</h3>
                <Autocomplete
                  options={autocompleteOptions}
                  placeholder="Search devices..."
                  label="Device"
                />
              </div>

              {/* Checkbox & Radio */}
              <div className="demo-item">
                <h3>Checkbox</h3>
                <Checkbox label="Enable notifications" />
                <Checkbox label="Auto-sync data" defaultChecked />
                <Checkbox label="Disabled option" disabled />
              </div>

              <div className="demo-item">
                <h3>Radio</h3>
                <Radio name="status" label="Online" defaultChecked />
                <Radio name="status" label="Offline" />
                <Radio name="status" label="Maintenance" disabled />
              </div>

              {/* Toggle */}
              <div className="demo-item">
                <h3>Toggle</h3>
                <Toggle label="Enable alerts" />
                <Toggle label="Dark mode" defaultChecked />
                <Toggle label="Disabled" disabled />
              </div>

              {/* Textarea */}
              <div className="demo-item">
                <h3>Textarea</h3>
                <Textarea placeholder="Enter device description..." rows={3} label="Description" />
              </div>

              {/* Slider */}
              <div className="demo-item">
                <h3>Slider</h3>
                <Slider defaultValue={50} min={0} max={100} />
                <Slider defaultValue={[20, 80]} range min={0} max={100} />
              </div>

              {/* Rating */}
              <div className="demo-item">
                <h3>Rating</h3>
                <Rating defaultValue={3} />
                <Rating defaultValue={4} size="lg" />
              </div>

              {/* Knob */}
              <div className="demo-item">
                <h3>Knob</h3>
                <div className="demo-row">
                  <Knob value={knobValue} onChange={setKnobValue} min={0} max={100} size={80} />
                  <span>{knobValue}%</span>
                </div>
              </div>

              {/* CascadeSelect */}
              <div className="demo-item">
                <h3>CascadeSelect</h3>
                <CascadeSelect
                  options={cascadeOptions}
                  placeholder="Select location"
                />
              </div>

              {/* TreeSelect */}
              <div className="demo-item">
                <h3>TreeSelect</h3>
                <TreeSelect
                  data={treeSelectData}
                  placeholder="Select category"
                />
              </div>

              {/* FileUpload */}
              <div className="demo-item full-width">
                <h3>FileUpload</h3>
                <FileUpload
                  accept="image/*,.pdf"
                  maxFiles={3}
                  multiple
                />
              </div>

              {/* Transfer */}
              <div className="demo-item full-width">
                <h3>Transfer</h3>
                <Transfer
                  dataSource={transferData}
                  targetKeys={transferTargetKeys}
                  onChange={(keys) => setTransferTargetKeys(keys)}
                  sourceTitle="Available"
                  targetTitle="Selected"
                  showSearch
                />
              </div>
            </div>
          </section>
        )}

        {/* ==================== DATA DISPLAY COMPONENTS ==================== */}
        {showCategory('display') && (
          <section className="demo-section">
            <h2>Data Display Components</h2>
            <div className="demo-grid">
              {/* Card */}
              <div className="demo-item">
                <h3>Card</h3>
                <Card variant="elevated" hoverable>
                  <Card.Header>
                    <Card.Title>Device Status</Card.Title>
                  </Card.Header>
                  <Card.Content>
                    <p>Card content with device information and status details.</p>
                  </Card.Content>
                  <Card.Footer>
                    <Button size="sm" variant="ghost">View Details</Button>
                  </Card.Footer>
                </Card>
              </div>

              {/* Badge */}
              <div className="demo-item">
                <h3>Badge</h3>
                <div className="demo-row">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Online</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Offline</Badge>
                </div>
              </div>

              {/* Avatar */}
              <div className="demo-item">
                <h3>Avatar</h3>
                <div className="demo-row">
                  <Avatar size="sm" initials="AB" color="primary" />
                  <Avatar size="md" initials="JD" color="success" />
                  <Avatar size="lg" src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
                  <Avatar size="xl" initials="JS" color="warning" />
                </div>
              </div>

              {/* Tag */}
              <div className="demo-item">
                <h3>Tag</h3>
                <div className="demo-row">
                  <Tag>Default</Tag>
                  <Tag variant="primary" icon={<Star size={12} />}>Featured</Tag>
                  <Tag variant="success" icon={<Wifi size={12} />}>Online</Tag>
                  <Tag variant="warning" icon={<Clock size={12} />}>Pending</Tag>
                  <Tag variant="error" icon={<WifiOff size={12} />}>Offline</Tag>
                </div>
              </div>

              {/* Statistic */}
              <div className="demo-item">
                <h3>Statistic</h3>
                <div className="demo-row">
                  <Statistic title="Active Devices" value={1234} />
                  <Statistic title="Alerts" value={42} suffix=" new" />
                  <Statistic title="Uptime" value={99.9} suffix="%" precision={1} />
                </div>
              </div>

              {/* Progress */}
              <div className="demo-item">
                <h3>Progress</h3>
                <Progress>
                  <ProgressBar value={30} variant="primary" />
                </Progress>
                <Progress>
                  <ProgressBar value={60} variant="success" />
                </Progress>
                <Progress>
                  <ProgressBar value={85} variant="warning" striped />
                </Progress>
                <Progress>
                  <ProgressBar value={95} variant="error" />
                </Progress>
              </div>

              {/* DeviceCard */}
              <div className="demo-item">
                <h3>DeviceCard</h3>
                <DeviceCard
                  icon={<Thermometer />}
                  name="Temperature Sensor"
                  status="online"
                  value="23.5°C"
                  subtitle="Building A, Floor 1"
                />
              </div>

              {/* Divider */}
              <div className="demo-item full-width">
                <h3>Divider</h3>
                <Divider />
                <Divider>Section Title</Divider>
                <Divider textAlign="left">Left Aligned</Divider>
              </div>

              {/* Table */}
              <div className="demo-item full-width">
                <h3>Table</h3>
                <Table striped>
                  <Table.Head>
                    <Table.Row>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Status</Table.HeaderCell>
                      <Table.HeaderCell>Location</Table.HeaderCell>
                      <Table.HeaderCell>Last Update</Table.HeaderCell>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    {tableData.map((row) => (
                      <Table.Row key={row.id}>
                        <Table.Cell>{row.name}</Table.Cell>
                        <Table.Cell>
                          <Badge variant={row.status === 'online' ? 'success' : row.status === 'warning' ? 'warning' : 'error'}>
                            {row.status}
                          </Badge>
                        </Table.Cell>
                        <Table.Cell>{row.location}</Table.Cell>
                        <Table.Cell>{row.lastUpdate}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>

              {/* List */}
              <div className="demo-item">
                <h3>List</h3>
                <List variant="divided">
                  <List.Item>
                    <div className="demo-row">
                      <Thermometer size={16} />
                      <div>
                        <div>Temperature Sensor</div>
                        <small style={{ color: 'var(--text-tertiary)' }}>Building A, Floor 1</small>
                      </div>
                    </div>
                  </List.Item>
                  <List.Item>
                    <div className="demo-row">
                      <Droplets size={16} />
                      <div>
                        <div>Humidity Sensor</div>
                        <small style={{ color: 'var(--text-tertiary)' }}>Building A, Floor 2</small>
                      </div>
                    </div>
                  </List.Item>
                  <List.Item>
                    <div className="demo-row">
                      <Gauge size={16} />
                      <div>
                        <div>Pressure Sensor</div>
                        <small style={{ color: 'var(--text-tertiary)' }}>Building B, Floor 1</small>
                      </div>
                    </div>
                  </List.Item>
                </List>
              </div>

              {/* Descriptions */}
              <div className="demo-item">
                <h3>Descriptions</h3>
                <Descriptions title="Device Info">
                  <Descriptions.Item label="Name">Temperature Sensor</Descriptions.Item>
                  <Descriptions.Item label="Status">Online</Descriptions.Item>
                  <Descriptions.Item label="Location">Building A</Descriptions.Item>
                  <Descriptions.Item label="Last Update">2 min ago</Descriptions.Item>
                </Descriptions>
              </div>

              {/* Timeline */}
              <div className="demo-item">
                <h3>Timeline</h3>
                <Timeline>
                  <Timeline.Item color="green">Device connected</Timeline.Item>
                  <Timeline.Item color="blue">Configuration updated</Timeline.Item>
                  <Timeline.Item color="orange">Warning triggered</Timeline.Item>
                  <Timeline.Item color="red">Alert resolved</Timeline.Item>
                </Timeline>
              </div>

              {/* Tree */}
              <div className="demo-item">
                <h3>Tree</h3>
                <Tree data={treeData} defaultExpandedKeys={['building-a', 'floor-1']} />
              </div>

              {/* Image */}
              <div className="demo-item">
                <h3>Image</h3>
                <Image
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop"
                  alt="Technology"
                  width={200}
                  height={150}
                  preview
                />
              </div>

              {/* Carousel */}
              <div className="demo-item full-width">
                <h3>Carousel</h3>
                <Carousel>
                  <div style={{ background: 'var(--color-primary-100)', padding: '40px', textAlign: 'center' }}>
                    Slide 1: Dashboard Overview
                  </div>
                  <div style={{ background: 'var(--color-success-100)', padding: '40px', textAlign: 'center' }}>
                    Slide 2: Device Analytics
                  </div>
                  <div style={{ background: 'var(--color-warning-100)', padding: '40px', textAlign: 'center' }}>
                    Slide 3: Alert Summary
                  </div>
                </Carousel>
              </div>
            </div>
          </section>
        )}

        {/* ==================== FEEDBACK COMPONENTS ==================== */}
        {showCategory('feedback') && (
          <section className="demo-section">
            <h2>Feedback Components</h2>
            <div className="demo-grid">
              {/* Alert */}
              <div className="demo-item full-width">
                <h3>Alert</h3>
                <Alert variant="info">This is an informational alert message.</Alert>
                <Alert variant="success">Operation completed successfully!</Alert>
                <Alert variant="warning">Warning: Please check your configuration.</Alert>
                <Alert variant="error">Error: Connection failed. Please retry.</Alert>
              </div>

              {/* Skeleton */}
              <div className="demo-item">
                <h3>Skeleton</h3>
                <Skeleton width="100%" height={20} />
                <Skeleton width="80%" height={20} />
                <Skeleton width="60%" height={20} />
                <div className="demo-row">
                  <Skeleton variant="circle" width={50} height={50} />
                  <div>
                    <Skeleton width={150} height={16} />
                    <Skeleton width={100} height={14} />
                  </div>
                </div>
              </div>

              {/* Spin */}
              <div className="demo-item">
                <h3>Spin</h3>
                <div className="demo-row">
                  <Spin size="sm" />
                  <Spin size="md" />
                  <Spin size="lg" />
                </div>
              </div>

              {/* Result */}
              <div className="demo-item">
                <h3>Result</h3>
                <Result
                  status="success"
                  title="Operation Successful"
                  description="Your changes have been saved."
                />
              </div>

              {/* EmptyState */}
              <div className="demo-item">
                <h3>EmptyState</h3>
                <EmptyState
                  title="No Devices Found"
                  description="Add your first device to get started."
                />
              </div>

              {/* Toast */}
              <div className="demo-item">
                <h3>Toast</h3>
                <div className="demo-row">
                  <Button size="sm" onClick={() => showToast('info')}>Info</Button>
                  <Button size="sm" variant="secondary" onClick={() => showToast('success')}>Success</Button>
                  <Button size="sm" variant="outline" onClick={() => showToast('warning')}>Warning</Button>
                  <Button size="sm" variant="danger" onClick={() => showToast('error')}>Error</Button>
                </div>
                {toastVisible && (
                  <Toast
                    variant={toastVariant}
                    message={`This is a ${toastVariant} toast message`}
                    onClose={() => setToastVisible(false)}
                    duration={3000}
                  />
                )}
              </div>

              {/* Message */}
              <div className="demo-item">
                <h3>Message</h3>
                <Button onClick={() => setMessageVisible(true)}>Show Message</Button>
                {messageVisible && (
                  <Message
                    type="success"
                    title="Settings saved successfully"
                    closable
                    onClose={() => setMessageVisible(false)}
                  />
                )}
              </div>

              {/* Modal */}
              <div className="demo-item">
                <h3>Modal</h3>
                <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
                <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                  <ModalHeader onClose={() => setModalOpen(false)}>
                    <ModalTitle>Device Configuration</ModalTitle>
                  </ModalHeader>
                  <ModalBody>
                    <p>Configure your device settings here.</p>
                    <Input label="Device Name" placeholder="Enter name" />
                  </ModalBody>
                  <ModalFooter>
                    <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => setModalOpen(false)}>Save</Button>
                  </ModalFooter>
                </Modal>
              </div>

              {/* Drawer */}
              <div className="demo-item">
                <h3>Drawer</h3>
                <div className="demo-row">
                  <Button size="sm" onClick={() => { setDrawerPlacement('left'); setDrawerOpen(true); }}>Left</Button>
                  <Button size="sm" onClick={() => { setDrawerPlacement('right'); setDrawerOpen(true); }}>Right</Button>
                  <Button size="sm" onClick={() => { setDrawerPlacement('top'); setDrawerOpen(true); }}>Top</Button>
                  <Button size="sm" onClick={() => { setDrawerPlacement('bottom'); setDrawerOpen(true); }}>Bottom</Button>
                </div>
                <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} placement={drawerPlacement}>
                  <Drawer.Header>
                    <h3>Drawer Title</h3>
                  </Drawer.Header>
                  <Drawer.Body>
                    <p>Drawer content goes here. This drawer opens from the {drawerPlacement}.</p>
                  </Drawer.Body>
                  <Drawer.Footer>
                    <Button variant="outline" onClick={() => setDrawerOpen(false)}>Close</Button>
                  </Drawer.Footer>
                </Drawer>
              </div>

              {/* Tooltip */}
              <div className="demo-item">
                <h3>Tooltip</h3>
                <div className="demo-row">
                  <Tooltip content="This is a tooltip">
                    <Button>Hover me</Button>
                  </Tooltip>
                </div>
              </div>

              {/* Popover */}
              <div className="demo-item">
                <h3>Popover</h3>
                <Button ref={popoverTriggerRef} onClick={() => setPopoverOpen(!popoverOpen)}>
                  Toggle Popover
                </Button>
                <Popover open={popoverOpen} onClose={() => setPopoverOpen(false)} triggerRef={popoverTriggerRef}>
                  <PopoverHeader>
                    <PopoverTitle>Device Info</PopoverTitle>
                  </PopoverHeader>
                  <PopoverContent>
                    <p>Temperature: 23.5°C</p>
                    <p>Humidity: 45%</p>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Popconfirm */}
              <div className="demo-item">
                <h3>Popconfirm</h3>
                <Popconfirm
                  title="Delete this device?"
                  description="This action cannot be undone."
                  onConfirm={() => alert('Deleted!')}
                  okText="Delete"
                  okType="danger"
                >
                  <Button variant="danger">Delete Device</Button>
                </Popconfirm>
              </div>

              {/* Tour */}
              <div className="demo-item">
                <h3>Tour</h3>
                <Button onClick={() => setTourOpen(true)}>Start Tour</Button>
                <Tour
                  open={tourOpen}
                  steps={tourSteps}
                  onClose={() => setTourOpen(false)}
                  onFinish={() => setTourOpen(false)}
                />
              </div>
            </div>
          </section>
        )}

        {/* ==================== NAVIGATION COMPONENTS ==================== */}
        {showCategory('navigation') && (
          <section className="demo-section">
            <h2>Navigation Components</h2>
            <div className="demo-grid">
              {/* Breadcrumb */}
              <div className="demo-item full-width">
                <h3>Breadcrumb</h3>
                <Breadcrumb
                  items={[
                    { label: 'Home', href: '#' },
                    { label: 'Devices', href: '#' },
                    { label: 'Sensors', href: '#' },
                    { label: 'Temperature' },
                  ]}
                />
              </div>

              {/* Pagination */}
              <div className="demo-item full-width">
                <h3>Pagination</h3>
                <Pagination
                  currentPage={currentPage}
                  totalPages={10}
                  onPageChange={setCurrentPage}
                />
              </div>

              {/* Tabs */}
              <div className="demo-item full-width">
                <h3>Tabs</h3>
                <Tabs defaultValue="overview">
                  <TabsList>
                    <Tab value="overview">Overview</Tab>
                    <Tab value="analytics">Analytics</Tab>
                    <Tab value="settings">Settings</Tab>
                  </TabsList>
                  <TabPanel value="overview"><p>Device overview and status information.</p></TabPanel>
                  <TabPanel value="analytics"><p>Analytics and performance metrics.</p></TabPanel>
                  <TabPanel value="settings"><p>Device configuration settings.</p></TabPanel>
                </Tabs>
              </div>

              {/* Steps */}
              <div className="demo-item full-width">
                <h3>Steps</h3>
                <Steps
                  current={1}
                  items={[
                    { title: 'Select Device', description: 'Choose device type' },
                    { title: 'Configure', description: 'Set parameters' },
                    { title: 'Deploy', description: 'Activate device' },
                  ]}
                />
              </div>

              {/* Accordion */}
              <div className="demo-item full-width">
                <h3>Accordion</h3>
                <Accordion>
                  <Accordion.Item title="Device Information">
                    Basic device details and identification.
                  </Accordion.Item>
                  <Accordion.Item title="Connection Settings">
                    Network and communication configuration.
                  </Accordion.Item>
                  <Accordion.Item title="Alert Rules">
                    Threshold and notification settings.
                  </Accordion.Item>
                </Accordion>
              </div>

              {/* Segmented */}
              <div className="demo-item">
                <h3>Segmented</h3>
                <Segmented
                  options={[
                    { label: 'Hour', value: 'hour' },
                    { label: 'Day', value: 'day' },
                    { label: 'Week', value: 'week' },
                    { label: 'Month', value: 'month' },
                  ]}
                  defaultValue="day"
                />
              </div>

              {/* Menu */}
              <div className="demo-item">
                <h3>Menu</h3>
                <Menu
                  trigger={<Button icon={<MoreHorizontal size={16} />}>Actions</Button>}
                  open={menuOpen}
                  onOpenChange={setMenuOpen}
                >
                  <MenuItem icon={<Edit size={14} />}>Edit</MenuItem>
                  <MenuItem icon={<Copy size={14} />}>Duplicate</MenuItem>
                  <MenuItem icon={<Share size={14} />}>Share</MenuItem>
                  <MenuDivider />
                  <MenuItem icon={<Archive size={14} />}>Archive</MenuItem>
                  <MenuItem icon={<Trash2 size={14} />} danger>Delete</MenuItem>
                </Menu>
              </div>

              {/* ButtonGroup */}
              <div className="demo-item">
                <h3>ButtonGroup</h3>
                <ButtonGroup>
                  <Button variant="outline">Left</Button>
                  <Button variant="outline">Center</Button>
                  <Button variant="outline">Right</Button>
                </ButtonGroup>
              </div>

              {/* SplitButton */}
              <div className="demo-item">
                <h3>SplitButton</h3>
                <SplitButton
                  label="Save"
                  icon={<Save size={16} />}
                  items={[
                    { label: 'Save as Draft', onClick: () => {} },
                    { label: 'Save and Close', onClick: () => {} },
                    { label: 'Save as Template', onClick: () => {} },
                  ]}
                />
              </div>

              {/* Toolbar */}
              <div className="demo-item full-width">
                <h3>Toolbar</h3>
                <Toolbar>
                  <ToolbarSection>
                    <Button size="sm" variant="ghost" icon={<Plus size={16} />} />
                    <Button size="sm" variant="ghost" icon={<Edit size={16} />} />
                    <Button size="sm" variant="ghost" icon={<Trash2 size={16} />} />
                  </ToolbarSection>
                  <ToolbarDivider />
                  <ToolbarSection>
                    <Button size="sm" variant="ghost" icon={<ZoomIn size={16} />} />
                    <Button size="sm" variant="ghost" icon={<ZoomOut size={16} />} />
                  </ToolbarSection>
                  <div style={{ flex: 1 }} />
                  <ToolbarSection>
                    <Button size="sm" variant="ghost" icon={<Settings size={16} />} />
                  </ToolbarSection>
                </Toolbar>
              </div>

              {/* Anchor */}
              <div className="demo-item">
                <h3>Anchor</h3>
                <Anchor
                  items={[
                    { key: 'overview', title: 'Overview', href: '#overview' },
                    { key: 'features', title: 'Features', href: '#features' },
                    { key: 'api', title: 'API', href: '#api' },
                  ]}
                />
              </div>

              {/* BackTop */}
              <div className="demo-item">
                <h3>BackTop</h3>
                <p>Scroll down to see the BackTop button appear.</p>
                <BackTop />
              </div>
            </div>
          </section>
        )}

        {/* ==================== IOT COMPONENTS ==================== */}
        {showCategory('iot') && (
          <section className="demo-section">
            <h2>IoT Components</h2>
            <div className="demo-grid">
              {/* StatusBadge */}
              <div className="demo-item">
                <h3>StatusBadge</h3>
                <div className="demo-row">
                  <StatusBadge status="online" />
                  <StatusBadge status="offline" />
                  <StatusBadge status="warning" />
                  <StatusBadge status="error" />
                  <StatusBadge status="maintenance" />
                </div>
              </div>

              {/* ConnectionIndicator */}
              <div className="demo-item">
                <h3>ConnectionIndicator</h3>
                <div className="demo-row">
                  <ConnectionIndicator status="connected" />
                  <ConnectionIndicator status="disconnected" />
                  <ConnectionIndicator status="connecting" />
                </div>
                <div className="demo-row" style={{ marginTop: '8px' }}>
                  <SignalIndicator strength="excellent" />
                  <SignalIndicator strength="good" />
                  <SignalIndicator strength="fair" />
                  <SignalIndicator strength="poor" />
                </div>
              </div>

              {/* MetricCard */}
              <div className="demo-item">
                <h3>MetricCard</h3>
                <MetricCard
                  label="Temperature"
                  value="23.5°C"
                  change={{ type: 'positive', text: '+2.3°C' }}
                  icon={Thermometer}
                />
              </div>

              {/* KpiCard */}
              <div className="demo-item">
                <h3>KpiCard</h3>
                <KpiCard
                  label="System Uptime"
                  value="99.9%"
                  trend="positive"
                  trendValue="+0.1%"
                  trendDescription="vs. last month"
                  icon={Activity}
                />
              </div>

              {/* SensorPanel */}
              <div className="demo-item">
                <h3>SensorPanel</h3>
                <SensorPanel
                  label="Temperature"
                  value={23.5}
                  unit="°C"
                  status="normal"
                  threshold={{
                    currentValue: 23.5,
                    maxValue: 30,
                    minValue: 15,
                    percentage: 56,
                  }}
                />
              </div>

              {/* StatusCard */}
              <div className="demo-item">
                <h3>StatusCard</h3>
                <StatusCard
                  title="System Health"
                  items={[
                    { icon: Cpu, label: 'CPU', value: '45%', status: 'success' },
                    { icon: MemoryStick, label: 'Memory', value: '72%', status: 'warning' },
                    { icon: HardDrive, label: 'Storage', value: '28%', status: 'success' },
                  ]}
                />
              </div>

              {/* DeviceList */}
              <div className="demo-item full-width">
                <h3>DeviceList</h3>
                <div className="demo-row" style={{ marginBottom: '12px' }}>
                  <Segmented
                    options={[
                      { label: 'Grid', value: 'grid', icon: <LayoutGrid size={14} /> },
                      { label: 'List', value: 'list', icon: <ListIcon size={14} /> },
                      { label: 'Compact', value: 'compact', icon: <LayoutList size={14} /> },
                    ]}
                    value={deviceListView}
                    onChange={(v) => setDeviceListView(v as 'grid' | 'list' | 'compact')}
                  />
                </div>
                <DeviceList
                  devices={sampleDevices}
                  view={deviceListView}
                />
              </div>

              {/* DeviceControlCard */}
              <div className="demo-item">
                <h3>DeviceControlPanel</h3>
                <DeviceControlCard
                  icon={Lightbulb}
                  name="Living Room Light"
                  deviceId="light-001"
                />
              </div>

              {/* TemperatureControl */}
              <div className="demo-item">
                <h3>TemperatureControl</h3>
                <TemperatureControl
                  label="Room Temperature"
                  defaultValue={22}
                  min={16}
                  max={30}
                />
              </div>

              {/* AlarmPanel */}
              <div className="demo-item full-width">
                <h3>AlarmPanel</h3>
                <AlarmPanel
                  title="Active Alarms"
                  summary={{ critical: 2, warning: 5, info: 3 }}
                >
                  <AlarmItem
                    icon={AlertTriangle}
                    severity="critical"
                    title="High Temperature Alert"
                    description="Temperature exceeded 35°C threshold"
                    isNew
                  />
                  <AlarmItem
                    icon={AlertTriangle}
                    severity="warning"
                    title="Low Battery"
                    description="Motion sensor battery below 20%"
                  />
                  <AlarmItem
                    icon={Info}
                    severity="info"
                    title="Maintenance Due"
                    description="HVAC filter replacement scheduled"
                    isAcknowledged
                  />
                </AlarmPanel>
              </div>

              {/* EventDataTable */}
              <div className="demo-item full-width">
                <h3>EventDataTable</h3>
                <EventDataTable
                  events={sampleEvents}
                  searchable
                  filterable
                />
              </div>

              {/* EventTimeline */}
              <div className="demo-item">
                <h3>EventTimeline</h3>
                <EventTimeline>
                  <EventItem
                    type="error"
                    title="Critical Alert"
                    description="Temperature exceeded threshold"
                    time="10:30 AM"
                  />
                  <EventItem
                    type="warning"
                    title="Warning"
                    description="Battery level low"
                    time="10:25 AM"
                  />
                  <EventItem
                    type="success"
                    title="Resolved"
                    description="Connection restored"
                    time="10:20 AM"
                  />
                  <EventItem
                    type="info"
                    title="Info"
                    description="Configuration updated"
                    time="10:15 AM"
                  />
                </EventTimeline>
              </div>

              {/* ActivityLog */}
              <div className="demo-item">
                <h3>ActivityLog</h3>
                <LogContainer title="Recent Activity" maxHeight="250px">
                  <LogEntry
                    icon={CheckCircle}
                    level="success"
                    message="Device connected successfully"
                    timestamp="10:30:45"
                  />
                  <LogEntry
                    icon={AlertTriangle}
                    level="warning"
                    message="High memory usage detected"
                    timestamp="10:28:12"
                  />
                  <LogEntry
                    icon={Info}
                    level="info"
                    message="Configuration updated"
                    timestamp="10:25:00"
                  />
                  <LogEntry
                    icon={XCircle}
                    level="error"
                    message="Connection timeout"
                    timestamp="10:20:33"
                  />
                </LogContainer>
              </div>

              {/* Dashboard Widgets */}
              <div className="demo-item">
                <h3>StatWidget</h3>
                <StatWidget
                  label="Active Sensors"
                  value={42}
                  icon={Thermometer}
                  trend={{ type: 'positive', value: '+5', period: 'this week' }}
                />
              </div>

              <div className="demo-item">
                <h3>StatusWidget</h3>
                <StatusWidget
                  title="Device Status"
                  items={[
                    { label: 'Online', value: 45, color: 'success' },
                    { label: 'Warning', value: 8, color: 'warning' },
                    { label: 'Offline', value: 3, color: 'error' },
                  ]}
                />
              </div>

              {/* AutomationRule */}
              <div className="demo-item full-width">
                <h3>AutomationRule</h3>
                <AutomationRule
                  icon={Zap}
                  name="Temperature Alert Rule"
                  description="Trigger notification when temperature exceeds threshold"
                  status="active"
                  steps={[
                    { label: 'When', content: 'Temperature > 30°C' },
                    { label: 'Then', content: 'Send Email Alert' },
                  ]}
                  meta={[
                    { icon: Clock, label: 'Last Run', value: '5 min ago' },
                    { icon: Activity, label: 'Triggered', value: '12 times' },
                  ]}
                />
              </div>
            </div>
          </section>
        )}

        {/* ==================== MOBILE COMPONENTS ==================== */}
        {showCategory('mobile') && (
          <section className="demo-section">
            <h2>Mobile Components</h2>
            <p className="demo-note">These components are optimized for mobile devices. Resize your browser or use mobile view to see them in action.</p>

            <div className="demo-grid">
              {/* ActionSheet */}
              <div className="demo-item">
                <h3>ActionSheet</h3>
                <Button onClick={() => setActionSheetOpen(true)}>Open ActionSheet</Button>
                <ActionSheet
                  open={actionSheetOpen}
                  onClose={() => setActionSheetOpen(false)}
                  title="Device Actions"
                  actions={[
                    { icon: Edit, label: 'Edit Device', onAction: () => setActionSheetOpen(false) },
                    { icon: Copy, label: 'Duplicate', onAction: () => setActionSheetOpen(false) },
                    { icon: Share, label: 'Share', onAction: () => setActionSheetOpen(false) },
                    { icon: Trash2, label: 'Delete', onAction: () => setActionSheetOpen(false), danger: true },
                  ]}
                />
              </div>

              {/* BottomSheet */}
              <div className="demo-item">
                <h3>BottomSheet</h3>
                <Button onClick={() => setBottomSheetOpen(true)}>Open BottomSheet</Button>
                <BottomSheet
                  open={bottomSheetOpen}
                  onClose={() => setBottomSheetOpen(false)}
                  title="Device Details"
                  height="half"
                >
                  <div style={{ padding: '16px' }}>
                    <p>Device Name: Temperature Sensor</p>
                    <p>Status: Online</p>
                    <p>Location: Building A, Floor 1</p>
                    <p>Last Update: 2 minutes ago</p>
                  </div>
                </BottomSheet>
              </div>

              {/* FAB */}
              <div className="demo-item">
                <h3>FAB (Floating Action Button)</h3>
                <div style={{ position: 'relative', height: '150px', background: 'var(--surface-secondary)', borderRadius: '8px' }}>
                  <FAB
                    icon={Plus}
                    label="Add"
                    position="bottom-right"
                    onClick={() => alert('FAB clicked!')}
                  />
                </div>
              </div>

              {/* SpeedDialFAB */}
              <div className="demo-item">
                <h3>SpeedDial FAB</h3>
                <div style={{ position: 'relative', height: '200px', background: 'var(--surface-secondary)', borderRadius: '8px' }}>
                  <SpeedDialFAB
                    icon={Plus}
                    actions={[
                      { icon: Thermometer, label: 'Add Sensor', onClick: () => {} },
                      { icon: Lightbulb, label: 'Add Controller', onClick: () => {} },
                      { icon: Network, label: 'Add Gateway', onClick: () => {} },
                    ]}
                  />
                </div>
              </div>

              {/* MobileNavBar */}
              <div className="demo-item full-width">
                <h3>MobileNavBar</h3>
                <div style={{ background: 'var(--surface-secondary)', borderRadius: '8px', overflow: 'hidden' }}>
                  <MobileNavBar
                    items={[
                      { icon: Home, label: 'Home' },
                      { icon: Search, label: 'Search' },
                      { icon: Bell, label: 'Alerts', badge: 3 },
                      { icon: Settings, label: 'Settings' },
                    ]}
                    activeIndex={0}
                  />
                </div>
              </div>

              {/* SearchBar */}
              <div className="demo-item full-width">
                <h3>SearchBar</h3>
                <SearchBar
                  placeholder="Search devices..."
                  onSearch={(value) => console.log('Search:', value)}
                />
              </div>

              {/* Stepper */}
              <div className="demo-item">
                <h3>Stepper</h3>
                <div className="demo-row">
                  <Stepper
                    value={stepperValue}
                    onChange={setStepperValue}
                    min={0}
                    max={10}
                  />
                  <span>Value: {stepperValue}</span>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="demo-footer">
        <p>@gractor/ui v1.0.0 - {categories.length - 1} categories, 70+ components</p>
      </footer>
    </div>
  );
}

export default App;
