import React, { memo, useMemo } from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './ActivityLog.module.css';

type IconType = LucideIcon;

// ==================== Log Container ====================

export type LogLevel = 'info' | 'success' | 'warning' | 'error';

export interface LogContainerProps {
  title?: string;
  icon?: IconType;
  filters?: React.ReactNode;
  children: React.ReactNode;
  maxHeight?: number | string;
  className?: string;
}

export const LogContainer = memo<LogContainerProps>(({
  title = 'Recent Activity',
  icon: Icon,
  filters,
  children,
  maxHeight = 500,
  className = '',
}) => {
  const containerClassName = useMemo(() =>
    `${styles.logContainer} ${className}`,
    [className]
  );

  const bodyStyle = useMemo(() => ({
    maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
  }), [maxHeight]);

  return (
    <div className={containerClassName}>
      <div className={styles.logHeader}>
        <div className={styles.logTitle}>
          {Icon && <Icon />}
          <span>{title}</span>
        </div>
        {filters && <div className={styles.logFilters}>{filters}</div>}
      </div>
      <div className={styles.logBody} style={bodyStyle}>
        {children}
      </div>
    </div>
  );
});

LogContainer.displayName = 'ActivityLog.Container';

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

export const LogEntry = memo<LogEntryProps>(({
  icon: Icon,
  level,
  message,
  details,
  timestamp,
  onClick,
  className = '',
}) => {
  const entryClassName = useMemo(() =>
    `${styles.logEntry} ${className}`,
    [className]
  );

  const iconClassName = useMemo(() =>
    `${styles.logIcon} ${styles[`logIcon${level.charAt(0).toUpperCase() + level.slice(1)}`]}`,
    [level]
  );

  return (
    <div className={entryClassName} onClick={onClick}>
      <div className={styles.logTimestamp}>{timestamp}</div>
      <div className={iconClassName}>
        <Icon />
      </div>
      <div className={styles.logContent}>
        <div className={styles.logMessage}>{message}</div>
        {details && <div className={styles.logDetails}>{details}</div>}
      </div>
    </div>
  );
});

LogEntry.displayName = 'ActivityLog.Entry';

// ==================== Timeline Meta Item ====================

interface TimelineMetaItemComponentProps {
  item: { icon: IconType; text: string };
}

const TimelineMetaItemComponent = memo<TimelineMetaItemComponentProps>(({ item }) => {
  const Icon = item.icon;
  return (
    <span>
      <Icon />
      <span>{item.text}</span>
    </span>
  );
});

TimelineMetaItemComponent.displayName = 'ActivityLog.TimelineMetaItem';

// ==================== Activity Log Item ====================

export interface TimelineMetaItem {
  icon: IconType;
  text: string;
}

export interface ActivityLogItemProps {
  level: LogLevel;
  title: string;
  description?: string;
  time: string;
  meta?: TimelineMetaItem[];
  className?: string;
}

export const ActivityLogItem = memo<ActivityLogItemProps>(({
  level,
  title,
  description,
  time,
  meta,
  className = '',
}) => {
  const itemClassName = useMemo(() =>
    `${styles.timelineItem} ${className}`,
    [className]
  );

  const markerClassName = useMemo(() =>
    `${styles.timelineMarker} ${styles[`timelineMarker${level.charAt(0).toUpperCase() + level.slice(1)}`]}`,
    [level]
  );

  return (
    <div className={itemClassName}>
      <div className={markerClassName} />
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
            {meta.map((item) => (
              <TimelineMetaItemComponent key={item.text} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

ActivityLogItem.displayName = 'ActivityLog.Item';

// ==================== Timeline Container ====================

export interface TimelineContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const TimelineContainer = memo<TimelineContainerProps>(({
  children,
  className = '',
}) => {
  const containerClassName = useMemo(() =>
    `${styles.timelineContainer} ${className}`,
    [className]
  );

  return <div className={containerClassName}>{children}</div>;
});

TimelineContainer.displayName = 'ActivityLog.TimelineContainer';

// ==================== Log Group ====================

export interface LogGroupProps {
  title: string;
  icon?: IconType;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const LogGroup = memo<LogGroupProps>(({
  title,
  icon: Icon,
  badge,
  children,
  className = '',
}) => {
  const groupClassName = useMemo(() =>
    `${styles.groupedLog} ${className}`,
    [className]
  );

  return (
    <div className={groupClassName}>
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
});

LogGroup.displayName = 'ActivityLog.Group';

// ==================== Grouped Log Container ====================

export interface GroupedLogContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const GroupedLogContainer = memo<GroupedLogContainerProps>(({
  children,
  className = '',
}) => {
  const containerClassName = useMemo(() =>
    `${styles.groupedLogContainer} ${className}`,
    [className]
  );

  return <div className={containerClassName}>{children}</div>;
});

GroupedLogContainer.displayName = 'ActivityLog.GroupedContainer';

// ==================== Log Stat ====================

export interface LogStatProps {
  value: string | number;
  label: string;
  level?: LogLevel;
  className?: string;
}

export const LogStat = memo<LogStatProps>(({
  value,
  label,
  level = 'info',
  className = '',
}) => {
  const statClassName = useMemo(() =>
    `${styles.logStat} ${className}`,
    [className]
  );

  const valueClassName = useMemo(() =>
    `${styles.logStatValue} ${styles[`logStatValue${level.charAt(0).toUpperCase() + level.slice(1)}`]}`,
    [level]
  );

  return (
    <div className={statClassName}>
      <div className={valueClassName}>{value}</div>
      <div className={styles.logStatLabel}>{label}</div>
    </div>
  );
});

LogStat.displayName = 'ActivityLog.Stat';

// ==================== Log Stats Container ====================

export interface LogStatsProps {
  children: React.ReactNode;
  columns?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const LogStats = memo<LogStatsProps>(({
  children,
  columns = 4,
  className = '',
  style,
}) => {
  const containerStyle = useMemo(() => ({
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    ...style,
  }), [columns, style]);

  const containerClassName = useMemo(() =>
    `${styles.logStats} ${className}`,
    [className]
  );

  return (
    <div className={containerClassName} style={containerStyle}>
      {children}
    </div>
  );
});

LogStats.displayName = 'ActivityLog.Stats';

// ==================== Main Export ====================

export default {
  LogContainer,
  LogEntry,
  TimelineContainer,
  ActivityLogItem,
  LogGroup,
  GroupedLogContainer,
  LogStat,
  LogStats,
};
