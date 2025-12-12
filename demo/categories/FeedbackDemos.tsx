import { useState, useRef } from 'react';

import { Button } from '../../src/components/Button';
import { Input } from '../../src/components/Input';
import { Alert } from '../../src/components/Alert';
import { Skeleton } from '../../src/components/Skeleton';
import { Spin } from '../../src/components/Spin';
import { Result } from '../../src/components/Result';
import { EmptyState } from '../../src/components/EmptyState';
import { Toast } from '../../src/components/Toast';
import { Message } from '../../src/components/Message';
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from '../../src/components/Modal';
import { Drawer } from '../../src/components/Drawer';
import { Tooltip } from '../../src/components/Tooltip';
import { Popover, PopoverContent, PopoverHeader, PopoverTitle } from '../../src/components/Popover';
import { Popconfirm } from '../../src/components/Popconfirm';
import { Tour } from '../../src/components/Tour';
import { Watermark } from '../../src/components/Watermark';
import { Card } from '../../src/components/Card';
import { Slider } from '../../src/components/Slider';

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

export default function FeedbackDemos() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerPlacement, setDrawerPlacement] = useState<'left' | 'right' | 'top' | 'bottom'>('right');
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverTriggerRef = useRef<HTMLButtonElement>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastVariant, setToastVariant] = useState<'info' | 'success' | 'warning' | 'error'>('info');
  const [messageVisible, setMessageVisible] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);

  // Watermark interactive controls
  const [wmText, setWmText] = useState('Custom Watermark');
  const [wmOpacity, setWmOpacity] = useState(0.08);
  const [wmRotate, setWmRotate] = useState(-45);
  const [wmFontSize, setWmFontSize] = useState(16);
  const [wmGap, setWmGap] = useState(100);

  const showToast = (variant: 'info' | 'success' | 'warning' | 'error') => {
    setToastVariant(variant);
    setToastVisible(true);
  };

  return (
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

        {/* Watermark */}
        <div className="demo-item full-width">
          <h3>Watermark</h3>

          {/* Preset Examples */}
          <Card variant="outlined" className="mb-6">
            <Card.Header>
              <Card.Title>Preset Examples</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="demo-grid-auto">
                <Watermark content="IoT Platform" opacity={0.08}>
                  <div className="demo-box">
                    <h4>Confidential Document</h4>
                    <p>Basic watermark with default settings.</p>
                  </div>
                </Watermark>

                <Watermark content="CONFIDENTIAL" opacity={0.1} rotate={-30}>
                  <div className="demo-box">
                    <h4>High Security</h4>
                    <p>Custom rotation angle (-30°).</p>
                  </div>
                </Watermark>

                <Watermark content="DRAFT" opacity={0.15} fontSize={20}>
                  <div className="demo-box">
                    <h4>Draft Version</h4>
                    <p>Larger font size (20px) and higher opacity.</p>
                  </div>
                </Watermark>

                <Watermark content={['Internal Use Only', 'Do Not Distribute']} opacity={0.1}>
                  <div className="demo-box">
                    <h4>Multi-line Watermark</h4>
                    <p>Multiple lines of text.</p>
                  </div>
                </Watermark>
              </div>
            </Card.Content>
          </Card>

          {/* Interactive Customization */}
          <Card variant="outlined">
            <Card.Header>
              <Card.Title>Interactive Customization</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="demo-grid-2">
                {/* Controls */}
                <div className="flex flex-col gap-4">
                  <Input
                    label="Watermark Text"
                    value={wmText}
                    onChange={(e) => setWmText(e.target.value)}
                    placeholder="Enter watermark text"
                  />
                  <Slider
                    label="Opacity"
                    min={0.02}
                    max={0.3}
                    step={0.02}
                    value={wmOpacity}
                    onChange={setWmOpacity}
                    showValue
                    formatValue={(v) => v.toFixed(2)}
                  />
                  <Slider
                    label="Rotation"
                    min={-90}
                    max={90}
                    step={5}
                    value={wmRotate}
                    onChange={setWmRotate}
                    showValue
                    formatValue={(v) => `${v}°`}
                  />
                  <Slider
                    label="Font Size"
                    min={12}
                    max={32}
                    step={2}
                    value={wmFontSize}
                    onChange={setWmFontSize}
                    showValue
                    formatValue={(v) => `${v}px`}
                  />
                  <Slider
                    label="Gap"
                    min={50}
                    max={200}
                    step={10}
                    value={wmGap}
                    onChange={setWmGap}
                    showValue
                    formatValue={(v) => `${v}px`}
                  />
                </div>

                {/* Preview */}
                <Watermark
                  content={wmText}
                  opacity={wmOpacity}
                  rotate={wmRotate}
                  fontSize={wmFontSize}
                  gap={wmGap}
                >
                  <div className="demo-box demo-preview-lg">
                    <h4>Preview</h4>
                    <p>Use the controls on the left to customize the watermark appearance.</p>
                    <p>Adjust text, opacity, rotation angle, font size, and gap between watermarks.</p>
                    <p>The watermark is designed to protect content while maintaining readability.</p>
                  </div>
                </Watermark>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </section>
  );
}
