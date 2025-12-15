import { useState } from 'react';
import './App.css';

// Only core icons needed for shell
import {
  Sun,
  Moon,
  ExternalLink,
  BookOpen,
  Code2,
  FileText,
} from 'lucide-react';

// Core components for shell only
import { Button } from '../src/components/Button';
import { Select } from '../src/components/Select';
import { Tour } from '../src/components/Tour';

// Lazy-loaded category components
import { CategoryLoader } from './components/CategoryLoader';
import { DocsModal } from './components/DocsModal';
import {
  FormDemos,
  DisplayDemos,
  DataGridDemos,
  FeedbackDemos,
  NavigationDemos,
  IoTDemos,
  MobileDemos,
  TokensDemos,
} from './categories';

// ============================================
// Types & Data
// ============================================
type Category = 'tokens' | 'form' | 'display' | 'datagrid' | 'feedback' | 'navigation' | 'iot' | 'mobile';

const categories: { id: Category; label: string }[] = [
  { id: 'tokens', label: 'Design Tokens' },
  { id: 'form', label: 'Form' },
  { id: 'display', label: 'Data Display' },
  { id: 'datagrid', label: 'DataGrid' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'iot', label: 'IoT' },
  { id: 'mobile', label: 'Mobile' },
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
  const [activeCategory, setActiveCategory] = useState<Category>('tokens');
  const [darkMode, setDarkMode] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);
  const [baseFontSize, setBaseFontSize] = useState(14);

  const handleFontSizeChange = (size: number) => {
    setBaseFontSize(size);
    document.documentElement.style.setProperty('--font-size-body-medium', `${size}px`);
    document.documentElement.style.setProperty('--font-size-body-small', `${size - 2}px`);
    document.documentElement.style.setProperty('--font-size-body-large', `${size + 2}px`);
    document.documentElement.style.setProperty('--font-size-body', `${size}px`);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle('dark-mode', newDarkMode);
    document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const renderCategory = () => {
    switch (activeCategory) {
      case 'tokens':
        return <CategoryLoader><TokensDemos /></CategoryLoader>;
      case 'form':
        return <CategoryLoader><FormDemos /></CategoryLoader>;
      case 'display':
        return <CategoryLoader><DisplayDemos /></CategoryLoader>;
      case 'datagrid':
        return <CategoryLoader><DataGridDemos /></CategoryLoader>;
      case 'feedback':
        return <CategoryLoader><FeedbackDemos /></CategoryLoader>;
      case 'navigation':
        return <CategoryLoader><NavigationDemos /></CategoryLoader>;
      case 'iot':
        return <CategoryLoader><IoTDemos /></CategoryLoader>;
      case 'mobile':
        return <CategoryLoader><MobileDemos /></CategoryLoader>;
      default:
        return <CategoryLoader><TokensDemos /></CategoryLoader>;
    }
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
            <button
              className="demo-header-link"
              onClick={() => setDocsOpen(true)}
            >
              <FileText size={14} />
              Docs
            </button>
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
            <Select
              value={String(baseFontSize)}
              onChange={(v) => handleFontSizeChange(Number(v))}
              options={[
                { value: '12', label: '12px' },
                { value: '14', label: '14px' },
                { value: '16', label: '16px' },
                { value: '18', label: '18px' },
              ]}
              size="sm"
              style={{ width: '85px' }}
            />
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
        {renderCategory()}
      </main>

      <footer className="demo-footer">
        <p>@gractor/ui v1.1.0 - {categories.length} categories, 70+ components</p>
      </footer>

      {/* Tour */}
      <Tour
        open={tourOpen}
        steps={tourSteps}
        onClose={() => setTourOpen(false)}
        onFinish={() => setTourOpen(false)}
      />

      {/* Docs Modal */}
      <DocsModal open={docsOpen} onClose={() => setDocsOpen(false)} />
    </div>
  );
}

export default App;
