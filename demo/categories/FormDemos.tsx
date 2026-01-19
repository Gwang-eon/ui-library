import { useState } from 'react';
import {
  Plus,
  Save,
  Trash2,
  Edit,
  Search,
  Settings,
  Mail,
  Lock,
  Thermometer,
  Droplets,
  Gauge,
  Lightbulb,
  AirVent,
  Fan,
  Server,
  Network,
  Layers,
  Shield,
  SlidersHorizontal,
} from 'lucide-react';

import { Button } from '../../src/components/Button';
import { Input } from '../../src/components/Input';
import { Select } from '../../src/components/Select';
import { Checkbox } from '../../src/components/Checkbox';
import { Radio } from '../../src/components/Radio';
import { Toggle } from '../../src/components/Toggle';
import { Textarea } from '../../src/components/Textarea';
import { Slider } from '../../src/components/Slider';
import { Rating } from '../../src/components/Rating';
import { ColorPicker } from '../../src/components/ColorPicker';
import { Autocomplete } from '../../src/components/Autocomplete';
import { FileUpload } from '../../src/components/FileUpload';
import { CascadeSelect } from '../../src/components/CascadeSelect';
import { TreeSelect } from '../../src/components/TreeSelect';
import { Transfer } from '../../src/components/Transfer';
import { Knob } from '../../src/components/Knob';
import {
  DatePicker,
  DateRangePicker,
  TimePicker,
  DateTimePicker,
} from '../../src/components/Calendar';

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

export default function FormDemos() {
  const [transferTargetKeys, setTransferTargetKeys] = useState<string[]>(['1', '2']);
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [knobValue, setKnobValue] = useState(65);

  return (
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
          <Input placeholder="Error state" state="error" errorMessage="Invalid input" />
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

        {/* DatePicker */}
        <div className="demo-item">
          <h3>DatePicker</h3>
          <DatePicker placeholder="날짜 선택" />
          <DatePicker placeholder="날짜 선택" size="sm" />
        </div>

        {/* TimePicker */}
        <div className="demo-item">
          <h3>TimePicker</h3>
          <TimePicker placeholder="시간 선택" />
          <TimePicker placeholder="30분 간격" timeIntervals={30} />
        </div>

        {/* DateTimePicker */}
        <div className="demo-item">
          <h3>DateTimePicker</h3>
          <DateTimePicker placeholder="날짜/시간 선택" />
        </div>

        {/* DateRangePicker */}
        <div className="demo-item full-width">
          <h3>DateRangePicker</h3>
          <DateRangePicker
            showPresets
            clearable
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
  );
}
