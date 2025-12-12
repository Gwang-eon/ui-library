import { useState } from 'react';
import {
  Plus,
  Save,
  Edit,
  Trash2,
  Settings,
  MoreHorizontal,
  Copy,
  Share,
  Archive,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

import { Button } from '../../src/components/Button';
import { Breadcrumb } from '../../src/components/Breadcrumb';
import { Pagination } from '../../src/components/Pagination';
import { Tabs, TabsList, Tab, TabPanel } from '../../src/components/Tabs';
import { Steps } from '../../src/components/Steps';
import { Accordion } from '../../src/components/Accordion';
import { Segmented } from '../../src/components/Segmented';
import { Menu, MenuItem, MenuDivider } from '../../src/components/Menu';
import { ButtonGroup } from '../../src/components/ButtonGroup';
import { SplitButton } from '../../src/components/SplitButton';
import { Toolbar, ToolbarSection, ToolbarDivider } from '../../src/components/Toolbar';
import { BackTop } from '../../src/components/BackTop';
import { Anchor } from '../../src/components/Anchor';

export default function NavigationDemos() {
  const [currentPage, setCurrentPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
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
            <div className="demo-spacer" />
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
  );
}
