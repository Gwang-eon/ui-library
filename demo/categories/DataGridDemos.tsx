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
  { id: 'name', header: 'Device Name', accessorKey: 'name', size: 180, enablePinning: true },
  { id: 'type', header: 'Type', accessorKey: 'type', size: 100 },
  {
    id: 'status', header: 'Status', accessorKey: 'status', size: 100,
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const variant = status === 'online' ? 'success' : status === 'warning' ? 'warning' : 'error';
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  { id: 'location', header: 'Location', accessorKey: 'location', size: 160 },
  { id: 'temperature', header: 'Temp (°C)', accessorKey: 'temperature', size: 100, align: 'right', cell: ({ getValue }) => `${getValue()}°C` },
  { id: 'humidity', header: 'Humidity (%)', accessorKey: 'humidity', size: 110, align: 'right', cell: ({ getValue }) => `${getValue()}%` },
  {
    id: 'uptime', header: 'Uptime (%)', accessorKey: 'uptime', size: 100, align: 'right',
    cell: ({ getValue }) => {
      const value = getValue() as number;
      const color = value >= 99 ? 'var(--color-success-500)' : value >= 90 ? 'var(--color-warning-500)' : 'var(--color-error-500)';
      return <span style={{ color, fontWeight: 500 }}>{value.toFixed(1)}%</span>;
    },
  },
  { id: 'lastUpdate', header: 'Last Update', accessorKey: 'lastUpdate', size: 150 },
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

      {/* Virtualization Demo */}
      <div className="demo-item full-width" style={{ marginBottom: '32px' }}>
        <h3>Virtualization (10,000 Rows)</h3>
        <p className="demo-note">Efficient rendering of large datasets using virtual scrolling. Only visible rows are rendered.</p>
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
          overscan={5}
          enableSorting
          enableGlobalFilter
          enableFiltering={false}
          enablePagination={false}
          height={400}
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
    </section>
  );
}
