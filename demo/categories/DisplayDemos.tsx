import {
  Star,
  Wifi,
  WifiOff,
  Clock,
  Thermometer,
  Droplets,
  Gauge,
  Building,
  Layers,
  Box,
} from 'lucide-react';

import { Button } from '../../src/components/Button';
import { Card } from '../../src/components/Card';
import { Badge } from '../../src/components/Badge';
import { Avatar } from '../../src/components/Avatar';
import { Tag } from '../../src/components/Tag';
import { Statistic } from '../../src/components/Statistic';
import { Progress, ProgressBar } from '../../src/components/Progress';
import { Divider } from '../../src/components/Divider';
import { Table } from '../../src/components/Table';
import { List } from '../../src/components/List';
import { Descriptions } from '../../src/components/Descriptions';
import { Timeline } from '../../src/components/Timeline';
import { Tree } from '../../src/components/Tree';
import { Image } from '../../src/components/Image';
import { Carousel } from '../../src/components/Carousel';
import { DeviceCard } from '../../src/components/DeviceCard';

// Sample Data
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

export default function DisplayDemos() {
  return (
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
            <Avatar size="lg" src="https://api.dicebear.com/7.x/notionists/svg?seed=felix" />
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
          <DeviceCard>
            <DeviceCard.Header>
              <DeviceCard.Icon background="linear-gradient(135deg, #3b82f6, #1d4ed8)">
                <Thermometer size={20} />
              </DeviceCard.Icon>
              <DeviceCard.TitleSection
                title="Temperature Sensor"
                subtitle="Building A, Floor 1"
              />
            </DeviceCard.Header>
            <DeviceCard.Body>
              <DeviceCard.Metrics>
                <DeviceCard.Metric label="Temperature" value="23.5°C" />
                <DeviceCard.Metric label="Status" value="Online" />
              </DeviceCard.Metrics>
            </DeviceCard.Body>
          </DeviceCard>
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
  );
}
