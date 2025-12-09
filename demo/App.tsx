import { useState } from 'react';
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
} from 'lucide-react';

// Form Components
import { Button } from '../src/components/Button';
import { Input } from '../src/components/Input';
import { Select } from '../src/components/Select';
import { Checkbox } from '../src/components/Checkbox';
import { Radio } from '../src/components/Radio';
import { Toggle } from '../src/components/Toggle';
import { Textarea } from '../src/components/Textarea';
import { Slider } from '../src/components/Slider';
import { Rating } from '../src/components/Rating';

// Data Display Components
import { Card } from '../src/components/Card';
import { Badge } from '../src/components/Badge';
import { Avatar } from '../src/components/Avatar';
import { Tag } from '../src/components/Tag';
import { Statistic } from '../src/components/Statistic';
import { Progress } from '../src/components/Progress';
import { Divider } from '../src/components/Divider';

// Feedback Components
import { Alert } from '../src/components/Alert';
import { Skeleton } from '../src/components/Skeleton';
import { Spin } from '../src/components/Spin';
import { Result } from '../src/components/Result';
import { EmptyState } from '../src/components/EmptyState';

// Navigation Components
import { Breadcrumb } from '../src/components/Breadcrumb';
import { Pagination } from '../src/components/Pagination';
import { Tabs } from '../src/components/Tabs';
import { Steps } from '../src/components/Steps';

// Overlay Components
import { Tooltip } from '../src/components/Tooltip';
import { Modal } from '../src/components/Modal';

// Layout Components
import { Accordion } from '../src/components/Accordion';
import { Segmented } from '../src/components/Segmented';

// IoT Components
import { StatusBadge } from '../src/components/iot/StatusBadge';
import { ConnectionIndicator } from '../src/components/iot/ConnectionIndicator';
import { MetricCard } from '../src/components/iot/MetricCard';
import { KpiCard } from '../src/components/iot/KpiCard';

type Category = 'form' | 'display' | 'feedback' | 'navigation' | 'iot' | 'all';

const categories: { id: Category; label: string }[] = [
  { id: 'all', label: 'All Components' },
  { id: 'form', label: 'Form' },
  { id: 'display', label: 'Data Display' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'iot', label: 'IoT' },
];

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [darkMode, setDarkMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const showCategory = (cat: Category) => activeCategory === 'all' || activeCategory === cat;

  return (
    <div className="demo-app">
      <header className="demo-header">
        <h1>@gractor/ui</h1>
        <p>IoT Platform UI Component Library</p>
        <div className="demo-header-actions">
          <Button
            variant={darkMode ? 'primary' : 'outline'}
            size="sm"
            icon={darkMode ? <Moon size={16} /> : <Sun size={16} />}
            onClick={toggleDarkMode}
          >
            {darkMode ? 'Dark' : 'Light'}
          </Button>
        </div>
      </header>

      <nav className="demo-nav">
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
        {/* Form Components */}
        {showCategory('form') && (
          <section className="demo-section">
            <h2>Form Components</h2>
            <div className="demo-grid">
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
                  <Button size="sm" icon={<Download size={14} />}>Small</Button>
                  <Button size="md" icon={<Upload size={16} />}>Medium</Button>
                  <Button size="lg" icon={<RefreshCw size={18} />}>Large</Button>
                </div>
              </div>

              <div className="demo-item">
                <h3>Input</h3>
                <Input placeholder="Search..." prefix={<Search size={16} />} />
                <Input placeholder="Enter email" label="Email" prefix={<Mail size={16} />} />
                <Input placeholder="Password" type="password" prefix={<Lock size={16} />} />
                <Input placeholder="Error state" status="error" statusMessage="Invalid input" />
              </div>

              <div className="demo-item">
                <h3>Select</h3>
                <Select
                  options={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                    { value: '3', label: 'Option 3' },
                  ]}
                  placeholder="Select an option"
                />
              </div>

              <div className="demo-item">
                <h3>Checkbox</h3>
                <Checkbox label="Default checkbox" />
                <Checkbox label="Checked" defaultChecked />
                <Checkbox label="Disabled" disabled />
              </div>

              <div className="demo-item">
                <h3>Radio</h3>
                <Radio name="demo" label="Option A" defaultChecked />
                <Radio name="demo" label="Option B" />
                <Radio name="demo" label="Option C" disabled />
              </div>

              <div className="demo-item">
                <h3>Toggle</h3>
                <Toggle label="Enable notifications" />
                <Toggle label="Dark mode" defaultChecked />
                <Toggle label="Disabled" disabled />
              </div>

              <div className="demo-item">
                <h3>Textarea</h3>
                <Textarea placeholder="Enter your message..." rows={3} />
              </div>

              <div className="demo-item">
                <h3>Slider</h3>
                <Slider defaultValue={50} min={0} max={100} />
                <Slider defaultValue={[25, 75]} range min={0} max={100} />
              </div>

              <div className="demo-item">
                <h3>Rating</h3>
                <Rating defaultValue={3} />
                <Rating defaultValue={4} size="lg" />
              </div>
            </div>
          </section>
        )}

        {/* Data Display Components */}
        {showCategory('display') && (
          <section className="demo-section">
            <h2>Data Display Components</h2>
            <div className="demo-grid">
              <div className="demo-item">
                <h3>Card</h3>
                <Card
                  title="Card Title"
                  subtitle="Card subtitle"
                >
                  <p>Card content goes here. This is a simple card component.</p>
                </Card>
              </div>

              <div className="demo-item">
                <h3>Badge</h3>
                <div className="demo-row">
                  <Badge count={5}>
                    <div style={{ width: 40, height: 40, background: 'var(--surface-secondary)', borderRadius: 8 }} />
                  </Badge>
                  <Badge count={99}>
                    <div style={{ width: 40, height: 40, background: 'var(--surface-secondary)', borderRadius: 8 }} />
                  </Badge>
                  <Badge dot>
                    <div style={{ width: 40, height: 40, background: 'var(--surface-secondary)', borderRadius: 8 }} />
                  </Badge>
                </div>
              </div>

              <div className="demo-item">
                <h3>Avatar</h3>
                <div className="demo-row">
                  <Avatar size="sm" />
                  <Avatar size="md" name="John Doe" />
                  <Avatar size="lg" src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
                  <Avatar size="xl" name="Jane Smith" />
                </div>
              </div>

              <div className="demo-item">
                <h3>Tag</h3>
                <div className="demo-row">
                  <Tag>Default</Tag>
                  <Tag color="primary" icon={<Star size={12} />}>Featured</Tag>
                  <Tag color="success" icon={<Wifi size={12} />}>Online</Tag>
                  <Tag color="warning" icon={<Clock size={12} />}>Pending</Tag>
                  <Tag color="danger" icon={<WifiOff size={12} />}>Offline</Tag>
                </div>
              </div>

              <div className="demo-item">
                <h3>Statistic</h3>
                <div className="demo-row">
                  <Statistic title="Active Users" value={1234} />
                  <Statistic title="Revenue" value={5678.90} prefix="$" precision={2} />
                  <Statistic title="Growth" value={12.5} suffix="%" />
                </div>
              </div>

              <div className="demo-item">
                <h3>Progress</h3>
                <Progress percent={30} />
                <Progress percent={60} status="active" />
                <Progress percent={100} status="success" />
                <Progress percent={70} status="error" />
              </div>

              <div className="demo-item full-width">
                <h3>Divider</h3>
                <Divider />
                <Divider>With Text</Divider>
                <Divider orientation="left">Left</Divider>
              </div>
            </div>
          </section>
        )}

        {/* Feedback Components */}
        {showCategory('feedback') && (
          <section className="demo-section">
            <h2>Feedback Components</h2>
            <div className="demo-grid">
              <div className="demo-item full-width">
                <h3>Alert</h3>
                <Alert type="info" message="This is an info alert" />
                <Alert type="success" message="Operation successful!" />
                <Alert type="warning" message="Warning: Please check your input" />
                <Alert type="error" message="Error: Something went wrong" />
              </div>

              <div className="demo-item">
                <h3>Skeleton</h3>
                <Skeleton width="100%" height={20} />
                <Skeleton width="80%" height={20} />
                <Skeleton width="60%" height={20} />
                <Skeleton variant="circle" width={50} height={50} />
              </div>

              <div className="demo-item">
                <h3>Spin</h3>
                <div className="demo-row">
                  <Spin size="sm" />
                  <Spin size="md" />
                  <Spin size="lg" />
                </div>
              </div>

              <div className="demo-item">
                <h3>Result</h3>
                <Result
                  status="success"
                  title="Operation Successful"
                  subTitle="Your request has been processed."
                />
              </div>

              <div className="demo-item">
                <h3>EmptyState</h3>
                <EmptyState
                  title="No Data"
                  description="There is no data to display."
                />
              </div>

              <div className="demo-item">
                <h3>Modal</h3>
                <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
                <Modal
                  open={modalOpen}
                  onClose={() => setModalOpen(false)}
                  title="Modal Title"
                >
                  <p>This is the modal content. You can put any content here.</p>
                </Modal>
              </div>

              <div className="demo-item">
                <h3>Tooltip</h3>
                <div className="demo-row">
                  <Tooltip content="This is a tooltip">
                    <Button>Hover me</Button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Navigation Components */}
        {showCategory('navigation') && (
          <section className="demo-section">
            <h2>Navigation Components</h2>
            <div className="demo-grid">
              <div className="demo-item full-width">
                <h3>Breadcrumb</h3>
                <Breadcrumb
                  items={[
                    { label: 'Home', href: '#' },
                    { label: 'Products', href: '#' },
                    { label: 'Electronics', href: '#' },
                    { label: 'Smartphones' },
                  ]}
                />
              </div>

              <div className="demo-item full-width">
                <h3>Pagination</h3>
                <Pagination total={100} pageSize={10} current={1} />
              </div>

              <div className="demo-item full-width">
                <h3>Tabs</h3>
                <Tabs
                  items={[
                    { key: '1', label: 'Tab 1', children: <p>Content of Tab 1</p> },
                    { key: '2', label: 'Tab 2', children: <p>Content of Tab 2</p> },
                    { key: '3', label: 'Tab 3', children: <p>Content of Tab 3</p> },
                  ]}
                />
              </div>

              <div className="demo-item full-width">
                <h3>Steps</h3>
                <Steps
                  current={1}
                  items={[
                    { title: 'Step 1', description: 'First step' },
                    { title: 'Step 2', description: 'Second step' },
                    { title: 'Step 3', description: 'Third step' },
                  ]}
                />
              </div>

              <div className="demo-item full-width">
                <h3>Accordion</h3>
                <Accordion
                  items={[
                    { key: '1', title: 'Section 1', content: 'Content for section 1' },
                    { key: '2', title: 'Section 2', content: 'Content for section 2' },
                    { key: '3', title: 'Section 3', content: 'Content for section 3' },
                  ]}
                />
              </div>

              <div className="demo-item">
                <h3>Segmented</h3>
                <Segmented
                  options={[
                    { label: 'Daily', value: 'daily' },
                    { label: 'Weekly', value: 'weekly' },
                    { label: 'Monthly', value: 'monthly' },
                  ]}
                  defaultValue="weekly"
                />
              </div>
            </div>
          </section>
        )}

        {/* IoT Components */}
        {showCategory('iot') && (
          <section className="demo-section">
            <h2>IoT Components</h2>
            <div className="demo-grid">
              <div className="demo-item">
                <h3>StatusBadge</h3>
                <div className="demo-row">
                  <StatusBadge status="online" />
                  <StatusBadge status="offline" />
                  <StatusBadge status="warning" />
                  <StatusBadge status="error" />
                </div>
              </div>

              <div className="demo-item">
                <h3>ConnectionIndicator</h3>
                <div className="demo-row">
                  <ConnectionIndicator status="connected" />
                  <ConnectionIndicator status="disconnected" />
                  <ConnectionIndicator status="connecting" />
                </div>
              </div>

              <div className="demo-item">
                <h3>MetricCard</h3>
                <MetricCard
                  title="Temperature"
                  value={23.5}
                  unit="C"
                  trend="up"
                  trendValue={2.3}
                  icon={<Thermometer size={20} />}
                />
              </div>

              <div className="demo-item">
                <h3>KpiCard</h3>
                <KpiCard
                  title="System Uptime"
                  value="99.9%"
                  description="Last 30 days"
                  trend="up"
                  icon={<Activity size={20} />}
                />
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="demo-footer">
        <p>@gractor/ui v1.0.0</p>
      </footer>
    </div>
  );
}

export default App;
