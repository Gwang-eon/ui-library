import { useState } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Copy,
  Share,
  Home,
  Search,
  Bell,
  Settings,
  Thermometer,
  Lightbulb,
  Network,
} from 'lucide-react';

import { Button } from '../../src/components/Button';
import { ActionSheet } from '../../src/components/mobile/ActionSheet';
import { BottomSheet } from '../../src/components/mobile/BottomSheet';
import { FAB, SpeedDialFAB } from '../../src/components/mobile/FAB';
import { MobileNavBar } from '../../src/components/mobile/MobileNavBar';
import { SearchBar } from '../../src/components/mobile/SearchBar';
import { Stepper } from '../../src/components/mobile/Stepper';

export default function MobileDemos() {
  const [actionSheetOpen, setActionSheetOpen] = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [stepperValue, setStepperValue] = useState(1);

  return (
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
  );
}
