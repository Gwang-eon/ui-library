import React from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './ActivityLog.module.css';

type IconType = LucideIcon;

// ==================== Activity Log ====================

export type LogLevel = 'info' | 'success' | 'warning' | 'error';

export interface LogContainerProps {
  title?: string;
  icon?: IconType;
  filters?: React.ReactNode;
  children: React.ReactNode;
  maxHeight?: number | string;
  className?: string;
}

export const LogContainer: React.FC<LogContainerProps> = ({
  title = 'Recent Activity',
  icon: Icon,
  filters,
  children,
  maxHeight = 500,
  className = '',
}) => {
  const maxHeightValue = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;

  return (
    <div className={`${styles.logContainer} ${className}`}>
      <div className={styles.logHeader}>
        <div className={styles.logTitle}>
          {Icon && <Icon />}
          <span>{title}</span>
        </div>
        {filters && <div className={styles.logFilters}>{filters}</div>}
      </div>
      <div className={styles.logBody} style={{ maxHeight: maxHeightValue }}>
        {children}
      </div>
    </div>
  );
};

// ==================== Log Entry ====================

export interface LogEntryProps {
  icon: IconType;
  level: LogLevel;
  message: string;
  details?: string;
  timestamp: string;
  onClick?: () => void;
  className?: string;
}

export const LogEntry: React.FC<LogEntryProps> = ({
  icon: Icon,
  level,
  message,
  details,
  timestamp,
  onClick,
  className = '',
}) => {
  return (
    <div className={`${styles.logEntry} ${className}`} onClick={onClick}>
      <div className={styles.logTimestamp}>{timestamp}</div>
      <div className={`${styles.logIcon} ${styles[`logIcon${level.charAt(0).toUpperCase() + level.slice(1)}`]}`}>
        <Icon />
      </div>
      <div className={styles.logContent}>
        <div className={styles.logMessage}>{message}</div>
        {details && <div className={styles.logDetails}>{details}</div>}
      </div>
    </div>
  );
};

// ==================== Timeline ====================

export interface TimelineMetaItem {
  icon: IconType;
  text: string;
}

export interface TimelineItemProps {
  level: LogLevel;
  title: string;
  description?: string;
  time: string;
  meta?: TimelineMetaItem[];
  className?: string;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  level,
  title,
  description,
  time,
  meta,
  className = '',
}) => {
  return (
    <div className={`${styles.timelineItem} ${className}`}>
      <div className={`${styles.timelineMarker} ${styles[`timelineMarker${level.charAt(0).toUpperCase() + level.slice(1)}`]}`} />
      <div className={styles.timelineContent}>
        <div className={styles.timelineHeader}>
          <div>
            <div className={styles.timelineTitle}>{title}</div>
            {description && <div className={styles.timelineDescription}>{description}</div>}
          </div>
          <div className={styles.timelineTime}>{time}</div>
        </div>
        {meta && meta.length > 0 && (
          <div className={styles.timelineMeta}>
            {meta.map((item, index) => (
              <span key={index}>
                <item.icon />
                <span>{item.text}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export interface TimelineContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const TimelineContainer: React.FC<TimelineContainerProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`${styles.timelineContainer} ${className}`}>
      {children}
    </div>
  );
};

// ==================== Grouped Log ====================

export interface LogGroupProps {
  title: string;
  icon?: IconType;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const LogGroup: React.FC<LogGroupProps> = ({
  title,
  icon: Icon,
  badge,
  children,
  className = '',
}) => {
  return (
    <div className={`${styles.groupedLog} ${className}`}>
      <div className={styles.logGroupHeader}>
        {Icon && <Icon />}
        <span>{title}</span>
        {badge}
      </div>
      <div className={styles.logBody}>
        {children}
      </div>
    </div>
  );
};

export interface GroupedLogContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const GroupedLogContainer: React.FC<GroupedLogContainerProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`${styles.groupedLogContainer} ${className}`}>
      {children}
    </div>
  );
};

// ==================== Log Statistics ====================

export interface LogStatProps {
  value: string | number;
  label: string;
  level?: LogLevel;
  className?: string;
}

export const LogStat: React.FC<LogStatProps> = ({
  value,
  label,
  level = 'info',
  className = '',
}) => {
  return (
    <div className={`${styles.logStat} ${className}`}>
      <div className={`${styles.logStatValue} ${styles[`logStatValue${level.charAt(0).toUpperCase() + level.slice(1)}`]}`}>
        {value}
      </div>
      <div className={styles.logStatLabel}>{label}</div>
    </div>
  );
};

export interface LogStatsProps {
  children: React.ReactNode;
  columns?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const LogStats: React.FC<LogStatsProps> = ({
  children,
  columns = 4,
  className = '',
  style,
}) => {
  return (
    <div
      className={`${styles.logStats} ${className}`}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, ...style }}
    >
      {children}
    </div>
  );
};

// ==================== Main Export ====================

export default {
  LogContainer,
  LogEntry,
  TimelineContainer,
  TimelineItem,
  LogGroup,
  GroupedLogContainer,
  LogStat,
  LogStats,
};
