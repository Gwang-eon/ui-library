import React, { useState, memo, useMemo, useCallback } from 'react';
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
  events: EventData[];
  searchable?: boolean;
  filterable?: boolean;
  exportable?: boolean;
  selectable?: boolean;
  onSelect?: (selectedIds: string[]) => void;
  onView?: (event: EventData) => void;
  onExport?: () => void;
  className?: string;
}

// Severity badge class mapping
const severityBadgeClasses: Record<string, string> = {
  critical: styles.badgeError,
  warning: styles.badgeWarning,
  info: styles.badgeSuccess,
};

// Event Row Component
interface EventRowProps {
  event: EventData;
  selectable: boolean;
  isSelected: boolean;
  onSelectRow: (id: string, checked: boolean) => void;
  onView?: (event: EventData) => void;
}

const EventRow = memo<EventRowProps>(({ event, selectable, isSelected, onSelectRow, onView }) => {
  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectRow(event.id, e.target.checked);
  }, [event.id, onSelectRow]);

  const handleViewClick = useCallback(() => {
    onView?.(event);
  }, [event, onView]);

  const badgeClassName = useMemo(() =>
    `${styles.badge} ${severityBadgeClasses[event.severity] || ''}`,
    [event.severity]
  );

  const severityLabel = useMemo(() =>
    event.severity.charAt(0).toUpperCase() + event.severity.slice(1),
    [event.severity]
  );

  return (
    <tr>
      {selectable && (
        <td className={styles.checkboxCell}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
          />
        </td>
      )}
      <td>{event.time}</td>
      <td>
        <span className={badgeClassName}>
          {severityLabel}
        </span>
      </td>
      <td>
        <div className={styles.eventType}>
          <span className={styles.eventIcon}>
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
            onClick={handleViewClick}
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
  );
});

EventRow.displayName = 'EventDataTable.Row';

// Filter Button Component
interface FilterButtonProps {
  filter: 'all' | 'critical' | 'warning';
  currentFilter: 'all' | 'critical' | 'warning' | 'info';
  onClick: (filter: 'all' | 'critical' | 'warning' | 'info') => void;
  icon: React.ReactNode;
  label: string;
}

const FilterButton = memo<FilterButtonProps>(({ filter, currentFilter, onClick, icon, label }) => {
  const handleClick = useCallback(() => {
    onClick(filter);
  }, [filter, onClick]);

  const className = useMemo(() =>
    `${styles.filterBtn} ${currentFilter === filter ? styles.filterBtnActive : ''}`,
    [currentFilter, filter]
  );

  return (
    <button className={className} onClick={handleClick}>
      {icon}
      {label}
    </button>
  );
});

FilterButton.displayName = 'EventDataTable.FilterButton';

// Main Component
export const EventDataTable = memo<EventDataTableProps>(({
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

  // Memoized filtered events
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = searchQuery === '' ||
        event.eventType.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.device.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.message.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter = selectedFilter === 'all' || event.severity === selectedFilter;

      return matchesSearch && matchesFilter;
    });
  }, [events, searchQuery, selectedFilter]);

  // Memoized sorted events
  const sortedEvents = useMemo(() => {
    if (!sortColumn) return filteredEvents;

    const severityOrder = { critical: 3, warning: 2, info: 1 };

    return [...filteredEvents].sort((a, b) => {
      if (sortColumn === 'time') {
        return sortDirection === 'asc'
          ? a.time.localeCompare(b.time)
          : b.time.localeCompare(a.time);
      }

      if (sortColumn === 'severity') {
        return sortDirection === 'asc'
          ? severityOrder[a.severity] - severityOrder[b.severity]
          : severityOrder[b.severity] - severityOrder[a.severity];
      }

      return 0;
    });
  }, [filteredEvents, sortColumn, sortDirection]);

  // Handlers
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleFilterChange = useCallback((filter: 'all' | 'critical' | 'warning' | 'info') => {
    setSelectedFilter(filter);
  }, []);

  const handleSortTime = useCallback(() => {
    if (sortColumn === 'time') {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn('time');
      setSortDirection('desc');
    }
  }, [sortColumn]);

  const handleSortSeverity = useCallback(() => {
    if (sortColumn === 'severity') {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn('severity');
      setSortDirection('desc');
    }
  }, [sortColumn]);

  const handleSelectAll = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = new Set(sortedEvents.map(ev => ev.id));
      setSelectedIds(allIds);
      onSelect?.(Array.from(allIds));
    } else {
      setSelectedIds(new Set());
      onSelect?.([]);
    }
  }, [sortedEvents, onSelect]);

  const handleSelectRow = useCallback((id: string, checked: boolean) => {
    setSelectedIds(prev => {
      const newSelected = new Set(prev);
      if (checked) {
        newSelected.add(id);
      } else {
        newSelected.delete(id);
      }
      onSelect?.(Array.from(newSelected));
      return newSelected;
    });
  }, [onSelect]);

  // Memoized values
  const containerClassName = useMemo(() =>
    `${styles.eventDataTable} ${className || ''}`,
    [className]
  );

  const isAllSelected = useMemo(() =>
    selectedIds.size === sortedEvents.length && sortedEvents.length > 0,
    [selectedIds.size, sortedEvents.length]
  );

  return (
    <div className={containerClassName}>
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
                  onChange={handleSearchChange}
                />
              </div>
            )}
          </div>

          <div className={styles.tableControlsRight}>
            {filterable && (
              <div className={styles.filterGroup}>
                <FilterButton
                  filter="all"
                  currentFilter={selectedFilter}
                  onClick={handleFilterChange}
                  icon={<Filter size={14} />}
                  label="All Events"
                />
                <FilterButton
                  filter="critical"
                  currentFilter={selectedFilter}
                  onClick={handleFilterChange}
                  icon={<AlertCircle size={14} />}
                  label="Errors"
                />
                <FilterButton
                  filter="warning"
                  currentFilter={selectedFilter}
                  onClick={handleFilterChange}
                  icon={<AlertTriangle size={14} />}
                  label="Warnings"
                />
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
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              <th className={styles.sortableHeader} onClick={handleSortTime}>
                <div className={styles.headerContent}>
                  <span>Time</span>
                  <ChevronsUpDown size={14} />
                </div>
              </th>
              <th className={styles.sortableHeader} onClick={handleSortSeverity}>
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
              <EventRow
                key={event.id}
                event={event}
                selectable={selectable}
                isSelected={selectedIds.has(event.id)}
                onSelectRow={handleSelectRow}
                onView={onView}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

EventDataTable.displayName = 'EventDataTable';

export default EventDataTable;
