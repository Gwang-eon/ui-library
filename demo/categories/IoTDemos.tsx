import { useState } from 'react';
import {
  Thermometer,
  Wifi,
  MapPin,
  AirVent,
  Eye,
  Network,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Cpu,
  MemoryStick,
  HardDrive,
  Lightbulb,
  Clock,
  Activity,
  Zap,
  LayoutGrid,
  List as ListIcon,
  LayoutList,
} from 'lucide-react';

import { Segmented } from '../../src/components/Segmented';
import { StatusBadge } from '../../src/components/iot/StatusBadge';
import { ConnectionIndicator, SignalIndicator } from '../../src/components/iot/ConnectionIndicator';
import { MetricCard } from '../../src/components/iot/MetricCard';
import { KpiCard } from '../../src/components/iot/KpiCard';
import DeviceList from '../../src/components/iot/DeviceList';
import SensorPanel from '../../src/components/iot/SensorPanel';
import { AlarmPanel, AlarmItem } from '../../src/components/iot/AlarmPanel';
import { DeviceControlCard, TemperatureControl } from '../../src/components/iot/DeviceControlPanel';
import { EventDataTable } from '../../src/components/iot/EventDataTable';
import { EventTimeline, EventItem } from '../../src/components/iot/EventTimeline';
import { LogContainer, LogEntry } from '../../src/components/iot/ActivityLog';
import { StatusCard } from '../../src/components/iot/StatusCard';
import { StatWidget, StatusWidget } from '../../src/components/iot/DashboardWidget';
import { AutomationRule } from '../../src/components/iot/AutomationRules';

// Sample data
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

export default function IoTDemos() {
  const [deviceListView, setDeviceListView] = useState<'grid' | 'list' | 'compact'>('grid');

  return (
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
  );
}
