import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Search } from 'lucide-react';
import styles from './AlarmPanel.module.css';

type IconType = LucideIcon;

// ==================== Alarm Panel ====================

export type AlarmSeverity = 'critical' | 'warning' | 'info';

export interface AlarmSummary {
  critical: number;
  warning: number;
  info: number;
}

export interface AlarmPanelProps {
  title?: string;
  summary?: AlarmSummary;
  actions?: React.ReactNode;
  filters?: React.ReactNode;
  children: React.ReactNode;
  compact?: boolean;
  viewAllLink?: string;
  onViewAll?: () => void;
  className?: string;
}

export const AlarmPanel: React.FC<AlarmPanelProps> = ({
  title = 'Active Alarms',
  summary,
  actions,
  filters,
  children,
  compact = false,
  viewAllLink,
  onViewAll,
  className = '',
}) => {
  return (
    <div className={`${styles.alarmPanel} ${compact ? styles.alarmPanelCompact : ''} ${className}`}>
      <div className={styles.alarmPanelHeader}>
        <h3 className={styles.alarmPanelTitle}>{title}</h3>
        {summary && !actions && !viewAllLink && (
          <div className={styles.alarmPanelSummary}>
            <span className={`${styles.alarmCount} ${styles.alarmCountCritical}`}>
              <span className={styles.alarmCountBadge}>{summary.critical}</span>
              <span className={styles.alarmCountLabel}>Critical</span>
            </span>
            <span className={`${styles.alarmCount} ${styles.alarmCountWarning}`}>
              <span className={styles.alarmCountBadge}>{summary.warning}</span>
              <span className={styles.alarmCountLabel}>Warning</span>
            </span>
            <span className={`${styles.alarmCount} ${styles.alarmCountInfo}`}>
              <span className={styles.alarmCountBadge}>{summary.info}</span>
              <span className={styles.alarmCountLabel}>Info</span>
            </span>
          </div>
        )}
        {actions && <div className={styles.alarmPanelActions}>{actions}</div>}
        {viewAllLink && (
          <a
            href={viewAllLink}
            className={styles.alarmPanelLink}
            onClick={(e) => {
              if (onViewAll) {
                e.preventDefault();
                onViewAll();
              }
            }}
          >
            View All →
          </a>
        )}
      </div>
      {filters}
      <div className={styles.alarmPanelBody}>{children}</div>
    </div>
  );
};

// ==================== Alarm Panel Filters ====================

export interface AlarmFilter {
  severity: 'all' | AlarmSeverity;
  label: string;
  count: number;
}

export interface AlarmPanelFiltersProps {
  filters: AlarmFilter[];
  activeFilter: string;
  onFilterChange: (severity: string) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  className?: string;
}

export const AlarmPanelFilters: React.FC<AlarmPanelFiltersProps> = ({
  filters,
  activeFilter,
  onFilterChange,
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search alarms...',
  className = '',
}) => {
  return (
    <div className={`${styles.alarmPanelFilters} ${className}`}>
      <div className={styles.alarmFilterGroup}>
        {filters.map((filter) => (
          <button
            key={filter.severity}
            className={`${styles.alarmFilterBtn} ${
              activeFilter === filter.severity ? styles.alarmFilterActive : ''
            }`}
            onClick={() => onFilterChange(filter.severity)}
          >
            <span>{filter.label}</span>
            <span className={styles.alarmFilterCount}>{filter.count}</span>
          </button>
        ))}
      </div>
      {onSearchChange && (
        <div className={styles.alarmSearch}>
          <Search className={styles.alarmSearchIcon} size={16} />
          <input
            type="text"
            className={styles.alarmSearchInput}
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

// ==================== Alarm Item ====================

export interface AlarmMetaItem {
  icon: IconType;
  text: string;
}

export interface AlarmItemProps {
  icon: IconType;
  severity: AlarmSeverity;
  title: string;
  description: string;
  meta?: AlarmMetaItem[];
  badge?: string;
  isNew?: boolean;
  isAcknowledged?: boolean;
  isResolved?: boolean;
  actions?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const AlarmItem: React.FC<AlarmItemProps> = ({
  icon: Icon,
  severity,
  title,
  description,
  meta,
  badge,
  isNew = false,
  isAcknowledged = false,
  isResolved = false,
  actions,
  onClick,
  className = '',
}) => {
  const itemClassName = [
    styles.alarmItem,
    styles[`alarmItem${severity.charAt(0).toUpperCase() + severity.slice(1)}`],
    isNew ? styles.alarmItemNew : '',
    isAcknowledged ? styles.alarmItemAcknowledged : '',
    isResolved ? styles.alarmItemResolved : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={itemClassName} onClick={onClick}>
      <div className={styles.alarmSeverity}>
        <Icon className={styles.alarmIcon} />
      </div>
      <div className={styles.alarmContent}>
        {badge ? (
          <div className={styles.alarmHeader}>
            <h4 className={styles.alarmTitle}>{title}</h4>
            <span className={styles.alarmBadge}>{badge}</span>
          </div>
        ) : (
          <h4 className={styles.alarmTitle}>{title}</h4>
        )}
        <p className={styles.alarmDescription}>{description}</p>
        {meta && meta.length > 0 && (
          <div className={styles.alarmMeta}>
            {meta.map((item, index) => (
              <span key={index} className={styles.alarmMetaItem}>
                <item.icon />
                <span>{item.text}</span>
              </span>
            ))}
          </div>
        )}
      </div>
      {actions && <div className={styles.alarmActions}>{actions}</div>}
    </div>
  );
};

// ==================== Alarm Item Compact ====================

export interface AlarmItemCompactProps {
  icon: IconType;
  severity: AlarmSeverity;
  title: string;
  time: string;
  action?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const AlarmItemCompact: React.FC<AlarmItemCompactProps> = ({
  icon: Icon,
  severity,
  title,
  time,
  action,
  onClick,
  className = '',
}) => {
  const itemClassName = [
    styles.alarmItemCompact,
    styles[`alarmItemCompact${severity.charAt(0).toUpperCase() + severity.slice(1)}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={itemClassName} onClick={onClick}>
      <div className={styles.alarmCompactLeft}>
        <Icon className={styles.alarmCompactIcon} />
        <div className={styles.alarmCompactContent}>
          <h5 className={styles.alarmCompactTitle}>{title}</h5>
          <p className={styles.alarmCompactTime}>{time}</p>
        </div>
      </div>
      {action}
    </div>
  );
};

// ==================== Main Export ====================

export default {
  AlarmPanel,
  AlarmPanelFilters,
  AlarmItem,
  AlarmItemCompact,
};
