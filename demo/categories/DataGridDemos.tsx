import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '../../src/components/Button';
import { Badge } from '../../src/components/Badge';
import { DataGrid, DataGridColumn } from '../../src/components/DataGrid';

// DataGrid sample data
interface DeviceData {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'warning';
  location: string;
  lastUpdate: string;
  temperature: number;
  humidity: number;
  uptime: number;
}

const dataGridData: DeviceData[] = [
  { id: '1', name: 'Temperature Sensor A1', type: 'Sensor', status: 'online', location: 'Building A, Floor 1', lastUpdate: '2024-12-11 10:30', temperature: 23.5, humidity: 45, uptime: 99.9 },
  { id: '2', name: 'Humidity Sensor A2', type: 'Sensor', status: 'online', location: 'Building A, Floor 2', lastUpdate: '2024-12-11 10:28', temperature: 22.1, humidity: 52, uptime: 98.5 },
  { id: '3', name: 'HVAC Controller B1', type: 'Controller', status: 'warning', location: 'Building B, Floor 1', lastUpdate: '2024-12-11 10:15', temperature: 25.8, humidity: 38, uptime: 95.2 },
  { id: '4', name: 'Light Controller B2', type: 'Controller', status: 'offline', location: 'Building B, Floor 2', lastUpdate: '2024-12-11 09:45', temperature: 21.0, humidity: 55, uptime: 0 },
  { id: '5', name: 'Pressure Sensor C1', type: 'Sensor', status: 'online', location: 'Building C, Floor 1', lastUpdate: '2024-12-11 10:32', temperature: 24.2, humidity: 48, uptime: 99.7 },
  { id: '6', name: 'Motion Detector C2', type: 'Detector', status: 'online', location: 'Building C, Floor 2', lastUpdate: '2024-12-11 10:31', temperature: 23.8, humidity: 50, uptime: 99.1 },
  { id: '7', name: 'Air Quality Monitor D1', type: 'Monitor', status: 'warning', location: 'Building D, Floor 1', lastUpdate: '2024-12-11 10:20', temperature: 26.5, humidity: 42, uptime: 87.3 },
  { id: '8', name: 'Smart Thermostat D2', type: 'Controller', status: 'online', location: 'Building D, Floor 2', lastUpdate: '2024-12-11 10:29', temperature: 22.5, humidity: 47, uptime: 99.8 },
  { id: '9', name: 'CO2 Sensor E1', type: 'Sensor', status: 'online', location: 'Building E, Floor 1', lastUpdate: '2024-12-11 10:30', temperature: 23.0, humidity: 49, uptime: 98.9 },
  { id: '10', name: 'Water Leak Detector E2', type: 'Detector', status: 'online', location: 'Building E, Floor 2', lastUpdate: '2024-12-11 10:25', temperature: 21.5, humidity: 60, uptime: 99.5 },
  { id: '11', name: 'Fire Alarm System F1', type: 'Alarm', status: 'online', location: 'Building F, Floor 1', lastUpdate: '2024-12-11 10:33', temperature: 22.8, humidity: 44, uptime: 100 },
  { id: '12', name: 'Security Camera F2', type: 'Camera', status: 'offline', location: 'Building F, Floor 2', lastUpdate: '2024-12-11 08:00', temperature: 20.5, humidity: 58, uptime: 0 },
];

// Tree structure data for hierarchical demo
interface TreeNode {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'warning';
  children?: TreeNode[];
}

const treeData: TreeNode[] = [
  {
    id: '1',
    name: 'Building A',
    type: 'Building',
    status: 'online',
    children: [
      {
        id: '1-1',
        name: 'Floor 1',
        type: 'Floor',
        status: 'online',
        children: [
          { id: '1-1-1', name: 'Sensor A1-1', type: 'Sensor', status: 'online' },
          { id: '1-1-2', name: 'Sensor A1-2', type: 'Sensor', status: 'warning' },
          { id: '1-1-3', name: 'Controller A1-3', type: 'Controller', status: 'online' },
        ],
      },
      {
        id: '1-2',
        name: 'Floor 2',
        type: 'Floor',
        status: 'warning',
        children: [
          { id: '1-2-1', name: 'Sensor A2-1', type: 'Sensor', status: 'warning' },
          { id: '1-2-2', name: 'Monitor A2-2', type: 'Monitor', status: 'online' },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Building B',
    type: 'Building',
    status: 'warning',
    children: [
      {
        id: '2-1',
        name: 'Floor 1',
        type: 'Floor',
        status: 'offline',
        children: [
          { id: '2-1-1', name: 'Sensor B1-1', type: 'Sensor', status: 'offline' },
          { id: '2-1-2', name: 'Alarm B1-2', type: 'Alarm', status: 'online' },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Building C',
    type: 'Building',
    status: 'online',
    children: [
      { id: '3-1', name: 'Sensor C-1', type: 'Sensor', status: 'online' },
      { id: '3-2', name: 'Controller C-2', type: 'Controller', status: 'online' },
    ],
  },
];

const treeColumns: DataGridColumn<TreeNode>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name', size: 250 },
  { id: 'type', header: 'Type', accessorKey: 'type', size: 120 },
  {
    id: 'status', header: 'Status', accessorKey: 'status', size: 100,
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const color = status === 'online' ? 'var(--color-success-500)' : status === 'warning' ? 'var(--color-warning-500)' : 'var(--color-error-500)';
      return <span style={{ color, fontWeight: 500 }}>{status}</span>;
    },
  },
];

// Pre-generate large dataset for virtualization demo
const largeDataGridData: DeviceData[] = Array.from({ length: 10000 }, (_, i) => ({
  id: String(i + 1),
  name: `Device ${String(i + 1).padStart(5, '0')}`,
  type: ['Sensor', 'Controller', 'Monitor', 'Detector', 'Alarm'][i % 5],
  status: ['online', 'offline', 'warning'][i % 3] as 'online' | 'offline' | 'warning',
  location: `Building ${String.fromCharCode(65 + (i % 6))}, Floor ${(i % 10) + 1}`,
  lastUpdate: `2024-12-${String((i % 28) + 1).padStart(2, '0')} ${String((i % 24)).padStart(2, '0')}:${String((i % 60)).padStart(2, '0')}`,
  temperature: 20 + (i % 100) / 10,
  humidity: 40 + (i % 30),
  uptime: 85 + (i % 15),
}));

const dataGridColumns: DataGridColumn<DeviceData>[] = [
  { id: 'name', header: 'Device Name', accessorKey: 'name', size: 200, minSize: 150, enablePinning: true },
  { id: 'type', header: 'Type', accessorKey: 'type', size: 120, minSize: 80 },
  {
    id: 'status', header: 'Status', accessorKey: 'status', size: 100, minSize: 80,
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const variant = status === 'online' ? 'success' : status === 'warning' ? 'warning' : 'error';
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  { id: 'location', header: 'Location', accessorKey: 'location', size: 180, minSize: 120 },
  { id: 'temperature', header: 'Temp (°C)', accessorKey: 'temperature', size: 120, minSize: 100, align: 'right', cell: ({ getValue }) => `${getValue()}°C` },
  { id: 'humidity', header: 'Humidity', accessorKey: 'humidity', size: 120, minSize: 100, align: 'right', cell: ({ getValue }) => `${getValue()}%` },
  {
    id: 'uptime', header: 'Uptime', accessorKey: 'uptime', size: 120, minSize: 100, align: 'right',
    cell: ({ getValue }) => {
      const value = getValue() as number;
      const color = value >= 99 ? 'var(--color-success-500)' : value >= 90 ? 'var(--color-warning-500)' : 'var(--color-error-500)';
      return <span style={{ color, fontWeight: 500 }}>{value.toFixed(1)}%</span>;
    },
  },
  { id: 'lastUpdate', header: 'Last Update', accessorKey: 'lastUpdate', size: 160, minSize: 130 },
];

// Columns with advanced filter types
const advancedFilterColumns: DataGridColumn<DeviceData>[] = [
  { id: 'name', header: 'Device Name', accessorKey: 'name', size: 200, minSize: 150, filterType: 'text' },
  {
    id: 'type', header: 'Type', accessorKey: 'type', size: 130, minSize: 100,
    filterType: 'select',
    filterOptions: [
      { value: 'Sensor', label: 'Sensor' },
      { value: 'Controller', label: 'Controller' },
      { value: 'Monitor', label: 'Monitor' },
      { value: 'Detector', label: 'Detector' },
      { value: 'Alarm', label: 'Alarm' },
      { value: 'Camera', label: 'Camera' },
    ],
  },
  {
    id: 'status', header: 'Status', accessorKey: 'status', size: 120, minSize: 100,
    filterType: 'multi-select',
    filterOptions: [
      { value: 'online', label: 'Online' },
      { value: 'offline', label: 'Offline' },
      { value: 'warning', label: 'Warning' },
    ],
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const variant = status === 'online' ? 'success' : status === 'warning' ? 'warning' : 'error';
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  { id: 'location', header: 'Location', accessorKey: 'location', size: 180, minSize: 120, filterType: 'select' },
  { id: 'temperature', header: 'Temp (°C)', accessorKey: 'temperature', size: 130, minSize: 110, filterType: 'number', align: 'right', cell: ({ getValue }) => `${getValue()}°C` },
  { id: 'humidity', header: 'Humidity', accessorKey: 'humidity', size: 120, minSize: 100, filterType: 'number', align: 'right', cell: ({ getValue }) => `${getValue()}%` },
  { id: 'lastUpdate', header: 'Last Update', accessorKey: 'lastUpdate', size: 180, minSize: 150, filterType: 'date-range' },
];

export default function DataGridDemos() {
  return (
    <section className="demo-section">
      <h2>DataGrid (TanStack Table)</h2>
      <p className="demo-note" style={{ marginBottom: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
        Enterprise-grade data grid built on TanStack Table. Features include sorting, filtering, pagination,
        column resizing/pinning/visibility, row selection/expansion, cell editing, and virtualization for large datasets.
      </p>

      {/* Basic DataGrid */}
      <div className="demo-item full-width" style={{ marginBottom: '32px' }}>
        <h3>Basic DataGrid with All Features</h3>
        <DataGrid
          data={dataGridData}
          columns={dataGridColumns}
          enableRowSelection
          enableSorting
          enableFiltering
          enableColumnResizing
          enableColumnPinning
          enableColumnVisibility
          enablePagination
          enableExpanding
          pageSizeOptions={[5, 10, 20]}
          height={400}
          striped
          hoverable
          renderExpandedRow={(row) => (
            <div style={{ padding: '16px', background: 'var(--surface-tertiary)' }}>
              <h4 style={{ margin: '0 0 12px 0' }}>Device Details: {row.name}</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <div><strong>ID:</strong> {row.id}</div>
                <div><strong>Type:</strong> {row.type}</div>
                <div><strong>Status:</strong> {row.status}</div>
                <div><strong>Location:</strong> {row.location}</div>
                <div><strong>Temperature:</strong> {row.temperature}°C</div>
                <div><strong>Humidity:</strong> {row.humidity}%</div>
                <div><strong>Uptime:</strong> {row.uptime}%</div>
                <div><strong>Last Update:</strong> {row.lastUpdate}</div>
              </div>
            </div>
          )}
        />
      </div>

      {/* Compact Mode */}
      <div className="demo-item full-width" style={{ marginBottom: '32px' }}>
        <h3>Compact Mode (No Filtering)</h3>
        <DataGrid
          data={dataGridData.slice(0, 6)}
          columns={dataGridColumns.slice(0, 5)}
          enableSorting
          enablePagination={false}
          enableFiltering={false}
          enableColumnResizing
          height={250}
          compact
          bordered
        />
      </div>

      {/* Selection Demo */}
      <div className="demo-item full-width" style={{ marginBottom: '32px' }}>
        <h3>Row Selection (Single & Multi)</h3>
        <p className="demo-note">Select rows using checkboxes. Use the global search to filter data.</p>
        <DataGrid
          data={dataGridData}
          columns={[
            { id: 'name', header: 'Device Name', accessorKey: 'name', size: 200 },
            { id: 'type', header: 'Type', accessorKey: 'type', size: 100 },
            { id: 'status', header: 'Status', accessorKey: 'status', size: 100,
              cell: ({ getValue }) => {
                const status = getValue() as string;
                const color = status === 'online' ? 'var(--color-success-500)' : status === 'warning' ? 'var(--color-warning-500)' : 'var(--color-error-500)';
                return <span style={{ color, fontWeight: 500 }}>{status}</span>;
              }
            },
            { id: 'location', header: 'Location', accessorKey: 'location', size: 180 },
          ]}
          enableRowSelection
          enableMultiRowSelection
          enableSorting
          enableGlobalFilter
          enableFiltering={false}
          enablePagination
          pageSizeOptions={[5, 10]}
          height={320}
          hoverable
        />
      </div>

      {/* Single Selection (Radio) Demo */}
      <div className="demo-item full-width" style={{ marginBottom: '32px' }}>
        <h3>Single Selection (Radio Style)</h3>
        <p className="demo-note">Use radio buttons for single row selection. Only one row can be selected at a time.</p>
        <DataGrid
          data={dataGridData}
          columns={[
            { id: 'name', header: 'Device Name', accessorKey: 'name', size: 200 },
            { id: 'type', header: 'Type', accessorKey: 'type', size: 100 },
            { id: 'status', header: 'Status', accessorKey: 'status', size: 100,
              cell: ({ getValue }) => {
                const status = getValue() as string;
                const color = status === 'online' ? 'var(--color-success-500)' : status === 'warning' ? 'var(--color-warning-500)' : 'var(--color-error-500)';
                return <span style={{ color, fontWeight: 500 }}>{status}</span>;
              }
            },
            { id: 'location', header: 'Location', accessorKey: 'location', size: 180 },
          ]}
          enableRowSelection
          selectionMode="single"
          enableSorting
          enableGlobalFilter
          enableFiltering={false}
          enablePagination
          pageSizeOptions={[5, 10]}
          height={320}
          hoverable
        />
      </div>

      {/* Conditional Selection Demo */}
      <div className="demo-item full-width" style={{ marginBottom: '32px' }}>
        <h3>Conditional Selection</h3>
        <p className="demo-note">Only <strong>online</strong> devices can be selected. Offline and warning devices are disabled.</p>
        <DataGrid
          data={dataGridData}
          columns={[
            { id: 'name', header: 'Device Name', accessorKey: 'name', size: 200 },
            { id: 'type', header: 'Type', accessorKey: 'type', size: 100 },
            { id: 'status', header: 'Status', accessorKey: 'status', size: 100,
              cell: ({ getValue }) => {
                const status = getValue() as string;
                const color = status === 'online' ? 'var(--color-success-500)' : status === 'warning' ? 'var(--color-warning-500)' : 'var(--color-error-500)';
                return <span style={{ color, fontWeight: 500 }}>{status}</span>;
              }
            },
            { id: 'location', header: 'Location', accessorKey: 'location', size: 180 },
          ]}
          enableRowSelection
          enableMultiRowSelection
          getRowCanSelect={(row) => row.status === 'online'}
          enableSorting
          enableGlobalFilter
          enableFiltering={false}
          enablePagination
          pageSizeOptions={[5, 10]}
          height={320}
          hoverable
        />
      </div>

      {/* Page Selection Mode Demo */}
      <div className="demo-item full-width" style={{ marginBottom: '32px' }}>
        <h3>Page-Only Selection</h3>
        <p className="demo-note">Header checkbox toggles only the current page rows. Change pages and use header checkbox to see the difference.</p>
        <DataGrid
          data={dataGridData}
          columns={[
            { id: 'name', header: 'Device Name', accessorKey: 'name', size: 200 },
            { id: 'type', header: 'Type', accessorKey: 'type', size: 100 },
            { id: 'status', header: 'Status', accessorKey: 'status', size: 100,
              cell: ({ getValue }) => {
                const status = getValue() as string;
                const color = status === 'online' ? 'var(--color-success-500)' : status === 'warning' ? 'var(--color-warning-500)' : 'var(--color-error-500)';
                return <span style={{ color, fontWeight: 500 }}>{status}</span>;
              }
            },
            { id: 'location', header: 'Location', accessorKey: 'location', size: 180 },
          ]}
          enableRowSelection
          enableMultiRowSelection
          selectAllMode="page"
          enableSorting
          enableFiltering={false}
          enablePagination
          pageSizeOptions={[3, 5, 10]}
          height={280}
          hoverable
        />
      </div>

      {/* Advanced Filters Demo */}
      <div className="demo-item full-width" style={{ marginBottom: '32px' }}>
        <h3>Advanced Filters (Select, Multi-Select, Date Range)</h3>
        <p className="demo-note">
          <strong>Type:</strong> Single select dropdown &nbsp;|&nbsp;
          <strong>Status:</strong> Multi-select checkboxes &nbsp;|&nbsp;
          <strong>Location:</strong> Auto-generated select from data &nbsp;|&nbsp;
          <strong>Temp/Humidity:</strong> Number range (min-max) &nbsp;|&nbsp;
          <strong>Last Update:</strong> Date range picker
        </p>
        <DataGrid
          data={dataGridData}
          columns={advancedFilterColumns}
          enableSorting
          enableFiltering
          enablePagination
          pageSizeOptions={[5, 10, 20]}
          height={400}
          striped
          hoverable
        />
      </div>

      {/* Column Pinning Demo */}
      <div className="demo-item full-width" style={{ marginBottom: '32px' }}>
        <h3>Column Pinning & Resizing</h3>
        <p className="demo-note">Pin columns by clicking the pin icon. Drag column borders to resize.</p>
        <DataGrid
          data={dataGridData}
          columns={dataGridColumns}
          enableColumnPinning
          enableColumnResizing
          enableColumnVisibility
          enableSorting
          enableFiltering={false}
          enablePagination={false}
          height={350}
          columnPinning={{ left: ['name'] }}
        />
      </div>

      {/* Tree Structure Demo */}
      <div className="demo-item full-width" style={{ marginBottom: '32px' }}>
        <h3>Tree Structure (Hierarchical Data)</h3>
        <p className="demo-note">
          Display hierarchical data with <code>getSubRows</code>. Click expand icons to show child rows.
          Use expand/collapse buttons in toolbar to toggle all rows.
        </p>
        <DataGrid
          data={treeData}
          columns={treeColumns}
          getSubRows={(row) => row.children}
          enableExpandAll
          defaultExpanded={true}
          enableSorting={false}
          enableFiltering={false}
          enablePagination={false}
          height={400}
          hoverable
        />
      </div>

      {/* Keyboard Navigation Demo */}
      <div className="demo-item full-width" style={{ marginBottom: '32px' }}>
        <h3>Keyboard Navigation</h3>
        <p className="demo-note">
          Click on any cell to focus it, then use keyboard to navigate:
          <br />
          • <strong>Arrow keys:</strong> Move between cells
          <br />
          • <strong>Tab / Shift+Tab:</strong> Move to next/previous cell
          <br />
          • <strong>Home / End:</strong> Jump to first/last cell in row
          <br />
          • <strong>Enter:</strong> Edit cell (if editable) or toggle selection
          <br />
          • <strong>Space:</strong> Toggle row selection
        </p>
        <DataGrid
          data={dataGridData.slice(0, 6)}
          columns={[
            { id: 'name', header: 'Device Name', accessorKey: 'name', editable: true },
            { id: 'type', header: 'Type', accessorKey: 'type' },
            { id: 'status', header: 'Status', accessorKey: 'status',
              cell: ({ getValue }) => {
                const status = getValue() as string;
                const color = status === 'online' ? 'var(--color-success-500)' : status === 'warning' ? 'var(--color-warning-500)' : 'var(--color-error-500)';
                return <span style={{ color, fontWeight: 500 }}>{status}</span>;
              }
            },
            { id: 'location', header: 'Location', accessorKey: 'location', editable: true },
            { id: 'temperature', header: 'Temp (°C)', accessorKey: 'temperature', align: 'right' },
          ]}
          enableKeyboardNavigation
          enableCellEditing
          enableRowSelection
          onCellEdit={(rowId, columnId, value) => {
            console.log(`Edited: Row ${rowId}, Column ${columnId}, Value: ${value}`);
          }}
          enableSorting={false}
          enableFiltering={false}
          enablePagination={false}
          height={280}
          hoverable
        />
      </div>

      {/* Loading State */}
      <div className="demo-item full-width" style={{ marginBottom: '32px' }}>
        <h3>Loading & Empty States</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <h4 style={{ marginBottom: '12px', fontWeight: 500 }}>Loading State</h4>
            <DataGrid
              data={dataGridData.slice(0, 3)}
              columns={dataGridColumns.slice(0, 4)}
              height={200}
              loading
              enableSorting={false}
              enableFiltering={false}
              enablePagination={false}
            />
          </div>
          <div>
            <h4 style={{ marginBottom: '12px', fontWeight: 500 }}>Empty State</h4>
            <DataGrid
              data={[]}
              columns={dataGridColumns.slice(0, 4)}
              height={200}
              emptyMessage="No devices found matching your criteria"
              enableSorting={false}
              enableFiltering={false}
              enablePagination={false}
            />
          </div>
        </div>
      </div>

      {/* Minimal Config */}
      <div className="demo-item full-width" style={{ marginBottom: '32px' }}>
        <h3>Minimal Configuration</h3>
        <p className="demo-note">DataGrid with minimum required props - just data and columns.</p>
        <DataGrid
          data={dataGridData.slice(0, 5)}
          columns={[
            { id: 'name', header: 'Name', accessorKey: 'name' },
            { id: 'type', header: 'Type', accessorKey: 'type' },
            { id: 'status', header: 'Status', accessorKey: 'status' },
          ]}
          height={250}
          enableFiltering={false}
          enablePagination={false}
          showToolbar={false}
        />
      </div>

      {/* Row Grouping Demo */}
      <div className="demo-item full-width" style={{ marginBottom: '32px' }}>
        <h3>Row Grouping with Aggregation</h3>
        <p className="demo-note">Group rows by Type. Shows count aggregation for grouped rows.</p>
        <DataGrid
          data={dataGridData}
          columns={[
            { id: 'type', header: 'Type', accessorKey: 'type', enableGrouping: true },
            { id: 'name', header: 'Device Name', accessorKey: 'name' },
            { id: 'status', header: 'Status', accessorKey: 'status',
              cell: ({ getValue }) => {
                const status = getValue() as string;
                const color = status === 'online' ? 'var(--color-success-500)' : status === 'warning' ? 'var(--color-warning-500)' : 'var(--color-error-500)';
                return <span style={{ color, fontWeight: 500 }}>{status}</span>;
              }
            },
            { id: 'temperature', header: 'Temp (°C)', accessorKey: 'temperature', align: 'right',
              aggregationFn: 'mean',
              aggregatedCell: ({ getValue }) => <span style={{ fontWeight: 600 }}>Avg: {(getValue() as number).toFixed(1)}°C</span>
            },
            { id: 'uptime', header: 'Uptime (%)', accessorKey: 'uptime', align: 'right',
              aggregationFn: 'mean',
              aggregatedCell: ({ getValue }) => <span style={{ fontWeight: 600 }}>Avg: {(getValue() as number).toFixed(1)}%</span>
            },
          ]}
          enableGrouping
          grouping={['type']}
          enableSorting
          enableFiltering={false}
          enablePagination={false}
          height={400}
        />
      </div>

      {/* Cell Editing Demo */}
      <div className="demo-item full-width" style={{ marginBottom: '32px' }}>
        <h3>Cell Editing</h3>
        <p className="demo-note">Double-click on Name or Location cells to edit. Press Enter to save, Escape to cancel.</p>
        <DataGrid
          data={dataGridData.slice(0, 6)}
          columns={[
            { id: 'name', header: 'Device Name', accessorKey: 'name', editable: true },
            { id: 'type', header: 'Type', accessorKey: 'type' },
            { id: 'status', header: 'Status', accessorKey: 'status' },
            { id: 'location', header: 'Location', accessorKey: 'location', editable: true },
            { id: 'temperature', header: 'Temp (°C)', accessorKey: 'temperature', align: 'right' },
          ]}
          enableCellEditing
          onCellEdit={(rowId, columnId, value) => {
            console.log(`Cell edited - Row: ${rowId}, Column: ${columnId}, Value: ${value}`);
          }}
          enableSorting
          enableFiltering={false}
          enablePagination={false}
          height={300}
        />
      </div>

      {/* Advanced Cell Editing Demo */}
      <div className="demo-item full-width" style={{ marginBottom: '32px' }}>
        <h3>Advanced Cell Editing (Validation & Editor Types)</h3>
        <p className="demo-note">
          Double-click to edit. Different editor types: Text (with validation), Number, Select dropdown.
          <br />
          • <strong>Name:</strong> Must be at least 3 characters
          <br />
          • <strong>Temperature:</strong> Number editor, must be between -50 and 100
          <br />
          • <strong>Status:</strong> Select dropdown editor
        </p>
        <DataGrid
          data={dataGridData.slice(0, 6)}
          columns={[
            {
              id: 'name',
              header: 'Device Name',
              accessorKey: 'name',
              editable: true,
              editorType: 'text',
              validateCell: (value) => {
                if (typeof value !== 'string' || value.length < 3) {
                  return 'Name must be at least 3 characters';
                }
                return null;
              },
            },
            { id: 'type', header: 'Type', accessorKey: 'type' },
            {
              id: 'status',
              header: 'Status',
              accessorKey: 'status',
              editable: true,
              editorType: 'select',
              editorOptions: [
                { value: 'online', label: 'Online' },
                { value: 'offline', label: 'Offline' },
                { value: 'warning', label: 'Warning' },
              ],
              cell: ({ getValue }) => {
                const status = getValue() as string;
                const color = status === 'online' ? 'var(--color-success-500)' : status === 'warning' ? 'var(--color-warning-500)' : 'var(--color-error-500)';
                return <span style={{ color, fontWeight: 500 }}>{status}</span>;
              },
            },
            { id: 'location', header: 'Location', accessorKey: 'location' },
            {
              id: 'temperature',
              header: 'Temp (°C)',
              accessorKey: 'temperature',
              align: 'right',
              editable: true,
              editorType: 'number',
              validateCell: (value) => {
                const num = Number(value);
                if (isNaN(num)) return 'Must be a number';
                if (num < -50 || num > 100) return 'Must be between -50 and 100';
                return null;
              },
            },
          ]}
          enableCellEditing
          onCellEdit={(rowId, columnId, value) => {
            console.log(`Advanced edit - Row: ${rowId}, Column: ${columnId}, Value: ${value}`);
          }}
          enableSorting={false}
          enableFiltering={false}
          enablePagination={false}
          height={300}
        />
      </div>

      {/* Row Pinning Demo */}
      <div className="demo-item full-width" style={{ marginBottom: '32px' }}>
        <h3>Row Pinning</h3>
        <p className="demo-note">
          Hover over a row to see pin buttons. Pin rows to top or bottom to keep them visible while scrolling.
          Click the pin icon on a pinned row to unpin it.
        </p>
        <DataGrid
          data={dataGridData}
          columns={[
            { id: 'name', header: 'Device Name', accessorKey: 'name' },
            { id: 'type', header: 'Type', accessorKey: 'type' },
            { id: 'status', header: 'Status', accessorKey: 'status',
              cell: ({ getValue }) => {
                const status = getValue() as string;
                const color = status === 'online' ? 'var(--color-success-500)' : status === 'warning' ? 'var(--color-warning-500)' : 'var(--color-error-500)';
                return <span style={{ color, fontWeight: 500 }}>{status}</span>;
              }
            },
            { id: 'location', header: 'Location', accessorKey: 'location' },
            { id: 'temperature', header: 'Temp (°C)', accessorKey: 'temperature', align: 'right' },
          ]}
          enableRowPinning
          enableSorting
          enableFiltering={false}
          enablePagination={false}
          height={350}
          hoverable
        />
      </div>

      {/* Virtualization Demo */}
      <div className="demo-item full-width" style={{ marginBottom: '32px' }}>
        <h3>Virtualization (10,000 Rows)</h3>
        <p className="demo-note">
          Efficient rendering of large datasets using virtual scrolling. Only ~50-100 visible rows are rendered at a time,
          allowing smooth scrolling through all 10,000 rows without performance issues. Scroll down to see more data load dynamically.
        </p>
        <DataGrid
          data={largeDataGridData}
          columns={[
            { id: 'id', header: 'ID', accessorKey: 'id', size: 80 },
            { id: 'name', header: 'Device Name', accessorKey: 'name', size: 150 },
            { id: 'type', header: 'Type', accessorKey: 'type', size: 100 },
            { id: 'status', header: 'Status', accessorKey: 'status', size: 100,
              cell: ({ getValue }) => {
                const status = getValue() as string;
                const color = status === 'online' ? 'var(--color-success-500)' : status === 'warning' ? 'var(--color-warning-500)' : 'var(--color-error-500)';
                return <span style={{ color }}>{status}</span>;
              }
            },
            { id: 'location', header: 'Location', accessorKey: 'location', size: 180 },
            { id: 'temperature', header: 'Temp', accessorKey: 'temperature', size: 80, align: 'right',
              cell: ({ getValue }) => `${(getValue() as number).toFixed(1)}°C`
            },
            { id: 'uptime', header: 'Uptime', accessorKey: 'uptime', size: 80, align: 'right',
              cell: ({ getValue }) => `${(getValue() as number).toFixed(1)}%`
            },
          ]}
          enableVirtualization
          estimateRowHeight={40}
          overscan={10}
          enableSorting
          enableGlobalFilter
          enableFiltering={false}
          enablePagination={false}
          height={400}
        />
      </div>

      {/* Horizontal Scroll Demo */}
      <div className="demo-item full-width" style={{ marginBottom: '32px' }}>
        <h3>Horizontal Scroll (Many Columns)</h3>
        <p className="demo-note">
          DataGrid with many columns showing horizontal scroll capability. Useful for data with many fields.
        </p>
        <DataGrid
          data={dataGridData}
          columns={[
            { id: 'id', header: 'ID', accessorKey: 'id', size: 60 },
            { id: 'name', header: 'Device Name', accessorKey: 'name', size: 180 },
            { id: 'type', header: 'Type', accessorKey: 'type', size: 100 },
            { id: 'status', header: 'Status', accessorKey: 'status', size: 100,
              cell: ({ getValue }) => {
                const status = getValue() as string;
                const variant = status === 'online' ? 'success' : status === 'warning' ? 'warning' : 'error';
                return <Badge variant={variant}>{status}</Badge>;
              }
            },
            { id: 'location', header: 'Location', accessorKey: 'location', size: 180 },
            { id: 'temperature', header: 'Temperature (°C)', accessorKey: 'temperature', size: 140, align: 'right',
              cell: ({ getValue }) => `${getValue()}°C`
            },
            { id: 'humidity', header: 'Humidity (%)', accessorKey: 'humidity', size: 120, align: 'right',
              cell: ({ getValue }) => `${getValue()}%`
            },
            { id: 'uptime', header: 'Uptime (%)', accessorKey: 'uptime', size: 120, align: 'right',
              cell: ({ getValue }) => {
                const value = getValue() as number;
                const color = value >= 99 ? 'var(--color-success-500)' : value >= 90 ? 'var(--color-warning-500)' : 'var(--color-error-500)';
                return <span style={{ color, fontWeight: 500 }}>{value.toFixed(1)}%</span>;
              }
            },
            { id: 'lastUpdate', header: 'Last Update', accessorKey: 'lastUpdate', size: 160 },
            { id: 'extra1', header: 'Extra Field 1', accessorFn: () => 'Value 1', size: 120 },
            { id: 'extra2', header: 'Extra Field 2', accessorFn: () => 'Value 2', size: 120 },
          ]}
          enableSorting
          enableFiltering={false}
          enablePagination={false}
          height={350}
        />
      </div>

      {/* Custom Footer Demo */}
      <div className="demo-item full-width" style={{ marginBottom: '32px' }}>
        <h3>Custom Footer with Totals</h3>
        <p className="demo-note">Footer row showing column totals and averages.</p>
        <DataGrid
          data={dataGridData}
          columns={[
            { id: 'name', header: 'Device Name', accessorKey: 'name', footer: 'Total:' },
            { id: 'type', header: 'Type', accessorKey: 'type', footer: `${dataGridData.length} devices` },
            { id: 'temperature', header: 'Temp (°C)', accessorKey: 'temperature', align: 'right',
              cell: ({ getValue }) => `${getValue()}°C`,
              footer: () => `Avg: ${(dataGridData.reduce((sum, d) => sum + d.temperature, 0) / dataGridData.length).toFixed(1)}°C`
            },
            { id: 'humidity', header: 'Humidity (%)', accessorKey: 'humidity', align: 'right',
              cell: ({ getValue }) => `${getValue()}%`,
              footer: () => `Avg: ${(dataGridData.reduce((sum, d) => sum + d.humidity, 0) / dataGridData.length).toFixed(1)}%`
            },
            { id: 'uptime', header: 'Uptime (%)', accessorKey: 'uptime', align: 'right',
              cell: ({ getValue }) => `${(getValue() as number).toFixed(1)}%`,
              footer: () => `Avg: ${(dataGridData.reduce((sum, d) => sum + d.uptime, 0) / dataGridData.length).toFixed(1)}%`
            },
          ]}
          enableSorting
          enableFiltering={false}
          enablePagination={false}
          showFooter
          height={400}
        />
      </div>

      {/* Export Demo */}
      <div className="demo-item full-width">
        <h3>CSV Export & Ref Methods</h3>
        <p className="demo-note">Use the Export button to download data as CSV.</p>
        <div style={{ marginBottom: '12px' }}>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const headers = ['name', 'type', 'status', 'location', 'temperature', 'humidity', 'uptime'];
              const csvRows = [
                headers.join(','),
                ...dataGridData.map(row =>
                  headers.map(h => {
                    const val = row[h as keyof typeof row];
                    return typeof val === 'string' && val.includes(',') ? `"${val}"` : String(val);
                  }).join(',')
                )
              ];
              const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'devices.csv';
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            <Download size={14} style={{ marginRight: '6px' }} />
            Export to CSV
          </Button>
        </div>
        <DataGrid
          data={dataGridData}
          columns={[
            { id: 'name', header: 'Device Name', accessorKey: 'name' },
            { id: 'type', header: 'Type', accessorKey: 'type' },
            { id: 'status', header: 'Status', accessorKey: 'status' },
            { id: 'location', header: 'Location', accessorKey: 'location' },
            { id: 'temperature', header: 'Temp (°C)', accessorKey: 'temperature', align: 'right' },
            { id: 'humidity', header: 'Humidity (%)', accessorKey: 'humidity', align: 'right' },
            { id: 'uptime', header: 'Uptime (%)', accessorKey: 'uptime', align: 'right' },
          ]}
          enableSorting
          enableFiltering={false}
          enablePagination
          pageSizeOptions={[5, 10]}
          height={320}
        />
      </div>

      {/* Row Drag & Drop Demo */}
      <RowDragDemo />
    </section>
  );
}

// Separate component for Row Drag Demo to manage local state
function RowDragDemo() {
  const [dragData, setDragData] = React.useState<DeviceData[]>(() => dataGridData.slice(0, 6));

  return (
    <div className="demo-item full-width">
      <h3>Row Drag & Drop Reordering</h3>
      <p className="demo-note">
        Drag the grip handle (⋮⋮) on the left of each row to reorder.
        The order is saved locally and logged to console.
      </p>
      <DataGrid
        data={dragData}
        columns={[
          { id: 'name', header: 'Device Name', accessorKey: 'name' },
          { id: 'type', header: 'Type', accessorKey: 'type' },
          { id: 'status', header: 'Status', accessorKey: 'status',
            cell: ({ getValue }) => {
              const status = getValue() as string;
              return (
                <Badge
                  variant={status === 'online' ? 'success' : status === 'warning' ? 'warning' : 'error'}
                >
                  {status}
                </Badge>
              );
            }
          },
          { id: 'location', header: 'Location', accessorKey: 'location' },
          { id: 'temperature', header: 'Temp (°C)', accessorKey: 'temperature', align: 'right' },
        ]}
        enableRowOrdering
        onRowOrderChange={(fromIndex, toIndex, newData) => {
          console.log(`Row moved from index ${fromIndex} to ${toIndex}`);
          setDragData(newData);
        }}
        enableSorting={false}
        enableFiltering={false}
        enablePagination={false}
        height={320}
        showToolbar={false}
      />
    </div>
  );
}
