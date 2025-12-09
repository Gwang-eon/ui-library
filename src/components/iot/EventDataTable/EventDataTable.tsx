import React, { useState } from 'react';
import { Search, Filter, AlertCircle, AlertTriangle, Download, ChevronsUpDown, Eye, MoreHorizontal } from 'lucide-react';
import styles from './EventDataTable.module.css';

export interface EventData {
  id: string;
  time: string;
  severity: 'critical' | 'warning' | 'info';
  eventType: {
    icon: string;
    label: string;
  };
  device: {
    id: string;
    type: string;
  };
  message: string;
  location: string;
}

export interface EventDataTableProps {
  /** Array of event data */
  events: EventData[];
  /** Enable search functionality */
  searchable?: boolean;
  /** Enable filtering by severity */
  filterable?: boolean;
  /** Enable export functionality */
  exportable?: boolean;
  /** Enable row selection */
  selectable?: boolean;
  /** Callback when row is selected */
  onSelect?: (selectedIds: string[]) => void;
  /** Callback when view button is clicked */
  onView?: (event: EventData) => void;
  /** Callback when export is clicked */
  onExport?: () => void;
  /** Custom class name */
  className?: string;
}

export const EventDataTable: React.FC<EventDataTableProps> = ({
  events,
  searchable = true,
  filterable = true,
  exportable = true,
  selectable = true,
  onSelect,
  onView,
  onExport,
  className,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [sortColumn, setSortColumn] = useState<'time' | 'severity' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filter events
  const filteredEvents = events.filter((event) => {
    const matchesSearch = searchQuery === '' ||
      event.eventType.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.device.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = selectedFilter === 'all' || event.severity === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (!sortColumn) return 0;

    if (sortColumn === 'time') {
      return sortDirection === 'asc'
        ? a.time.localeCompare(b.time)
        : b.time.localeCompare(a.time);
    }

    if (sortColumn === 'severity') {
      const severityOrder = { critical: 3, warning: 2, info: 1 };
      return sortDirection === 'asc'
        ? severityOrder[a.severity] - severityOrder[b.severity]
        : severityOrder[b.severity] - severityOrder[a.severity];
    }

    return 0;
  });

  const handleSort = (column: 'time' | 'severity') => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(sortedEvents.map(e => e.id)));
      onSelect?.(sortedEvents.map(e => e.id));
    } else {
      setSelectedIds(new Set());
      onSelect?.([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedIds);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedIds(newSelected);
    onSelect?.(Array.from(newSelected));
  };

  const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
      case 'critical': return styles.badgeError;
      case 'warning': return styles.badgeWarning;
      case 'info': return styles.badgeSuccess;
      default: return '';
    }
  };

  return (
    <div className={`${styles.eventDataTable} ${className || ''}`}>
      {/* Table Controls */}
      {(searchable || filterable || exportable) && (
        <div className={styles.tableControls}>
          <div className={styles.tableControlsLeft}>
            {searchable && (
              <div className={styles.searchGroup}>
                <Search className={styles.searchIcon} size={16} />
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className={styles.tableControlsRight}>
            {filterable && (
              <div className={styles.filterGroup}>
                <button
                  className={`${styles.filterBtn} ${selectedFilter === 'all' ? styles.filterBtnActive : ''}`}
                  onClick={() => setSelectedFilter('all')}
                >
                  <Filter size={14} />
                  All Events
                </button>
                <button
                  className={`${styles.filterBtn} ${selectedFilter === 'critical' ? styles.filterBtnActive : ''}`}
                  onClick={() => setSelectedFilter('critical')}
                >
                  <AlertCircle size={14} />
                  Errors
                </button>
                <button
                  className={`${styles.filterBtn} ${selectedFilter === 'warning' ? styles.filterBtnActive : ''}`}
                  onClick={() => setSelectedFilter('warning')}
                >
                  <AlertTriangle size={14} />
                  Warnings
                </button>
              </div>
            )}
            {exportable && (
              <button className={styles.exportBtn} onClick={onExport}>
                <Download size={14} />
                Export
              </button>
            )}
          </div>
        </div>
      )}

      {/* Event Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {selectable && (
                <th className={styles.checkboxCell}>
                  <input
                    type="checkbox"
                    checked={selectedIds.size === sortedEvents.length && sortedEvents.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
              )}
              <th className={styles.sortableHeader} onClick={() => handleSort('time')}>
                <div className={styles.headerContent}>
                  <span>Time</span>
                  <ChevronsUpDown size={14} />
                </div>
              </th>
              <th className={styles.sortableHeader} onClick={() => handleSort('severity')}>
                <div className={styles.headerContent}>
                  <span>Severity</span>
                  <ChevronsUpDown size={14} />
                </div>
              </th>
              <th>Event Type</th>
              <th>Device</th>
              <th>Message</th>
              <th>Location</th>
              <th className={styles.actionsHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedEvents.map((event) => (
              <tr key={event.id}>
                {selectable && (
                  <td className={styles.checkboxCell}>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(event.id)}
                      onChange={(e) => handleSelectRow(event.id, e.target.checked)}
                    />
                  </td>
                )}
                <td>{event.time}</td>
                <td>
                  <span className={`${styles.badge} ${getSeverityBadgeClass(event.severity)}`}>
                    {event.severity.charAt(0).toUpperCase() + event.severity.slice(1)}
                  </span>
                </td>
                <td>
                  <div className={styles.eventType}>
                    <span className={styles.eventIcon}>
                      {/* Icon placeholder - in real use, render actual icon */}
                      {event.eventType.icon}
                    </span>
                    <span>{event.eventType.label}</span>
                  </div>
                </td>
                <td>
                  <div className={styles.deviceInfo}>
                    <div className={styles.deviceId}>{event.device.id}</div>
                    <div className={styles.deviceType}>{event.device.type}</div>
                  </div>
                </td>
                <td>{event.message}</td>
                <td>{event.location}</td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.actionBtn}
                      onClick={() => onView?.(event)}
                      aria-label="View details"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      className={styles.actionBtn}
                      aria-label="More options"
                    >
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventDataTable;
