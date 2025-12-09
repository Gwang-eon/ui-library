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
import { Progress, ProgressBar } from '../src/components/Progress';
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
import { Tabs, TabsList, Tab, TabPanel } from '../src/components/Tabs';
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
                <Card variant="elevated" hoverable>
                  <Card.Header>
                    <Card.Title>Device Status</Card.Title>
                  </Card.Header>
                  <Card.Content>
                    <p>Card content goes here. This is a simple card component with proper structure.</p>
                  </Card.Content>
                  <Card.Footer>
                    <Button size="sm" variant="ghost">View Details</Button>
                  </Card.Footer>
                </Card>
              </div>

              <div className="demo-item">
                <h3>Badge</h3>
                <div className="demo-row">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                </div>
              </div>

              <div className="demo-item">
                <h3>Avatar</h3>
                <div className="demo-row">
                  <Avatar size="sm" initials="AB" color="primary" />
                  <Avatar size="md" initials="JD" color="success" />
                  <Avatar size="lg" src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
                  <Avatar size="xl" initials="JS" color="warning" />
                </div>
              </div>

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
                <Progress>
                  <ProgressBar value={30} variant="primary" />
                </Progress>
                <Progress>
                  <ProgressBar value={60} variant="success" />
                </Progress>
                <Progress>
                  <ProgressBar value={100} variant="warning" striped />
                </Progress>
                <Progress>
                  <ProgressBar value={70} variant="error" />
                </Progress>
              </div>

              <div className="demo-item full-width">
                <h3>Divider</h3>
                <Divider />
                <Divider>Section Title</Divider>
                <Divider textAlign="left">Left Aligned</Divider>
                <Divider textAlign="right">Right Aligned</Divider>
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
                <Alert variant="info">This is an info alert</Alert>
                <Alert variant="success">Operation successful!</Alert>
                <Alert variant="warning">Warning: Please check your input</Alert>
                <Alert variant="error">Error: Something went wrong</Alert>
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
                  description="Your request has been processed."
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
                <Tabs defaultValue="1">
                  <TabsList>
                    <Tab value="1">Tab 1</Tab>
                    <Tab value="2">Tab 2</Tab>
                    <Tab value="3">Tab 3</Tab>
                  </TabsList>
                  <TabPanel value="1"><p>Content of Tab 1</p></TabPanel>
                  <TabPanel value="2"><p>Content of Tab 2</p></TabPanel>
                  <TabPanel value="3"><p>Content of Tab 3</p></TabPanel>
                </Tabs>
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
                <Accordion>
                  <Accordion.Item title="Section 1">Content for section 1</Accordion.Item>
                  <Accordion.Item title="Section 2">Content for section 2</Accordion.Item>
                  <Accordion.Item title="Section 3">Content for section 3</Accordion.Item>
                </Accordion>
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
                  label="Temperature"
                  value="23.5°C"
                  change={{ type: 'positive', text: '+2.3°C' }}
                  icon={Thermometer}
                />
              </div>

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
