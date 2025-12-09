import React from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './RealTimeMonitor.module.css';

type IconType = LucideIcon;

// ==================== Status Indicator ====================

export interface StatusIndicatorProps {
  status: 'active' | 'inactive' | 'warning';
  label?: string;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  className = '',
}) => {
  return (
    <div className={`${styles.statusIndicator} ${className}`}>
      <span className={`${styles.statusDot} ${styles[`status${status.charAt(0).toUpperCase() + status.slice(1)}`]}`} />
      {label && <span className={styles.statusLabel}>{label}</span>}
    </div>
  );
};

// ==================== Metric Card ====================

export type MetricChangeType = 'increase' | 'decrease' | 'neutral';

export interface MetricCardProps {
  icon: IconType;
  label: string;
  value: string;
  unit?: string;
  change?: string;
  changeType?: MetricChangeType;
  iconColor?: 'primary' | 'danger' | 'warning' | 'success';
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  label,
  value,
  unit,
  change,
  changeType = 'neutral',
  iconColor = 'primary',
  className = '',
}) => {
  return (
    <div className={`${styles.metricCard} ${className}`}>
      <div className={styles.metricHeader}>
        <div className={`${styles.metricIcon} ${styles[`metricIcon${iconColor.charAt(0).toUpperCase() + iconColor.slice(1)}`]}`}>
          <Icon className={styles.icon} />
        </div>
        <div className={styles.metricLabel}>{label}</div>
      </div>
      <div className={styles.metricContent}>
        <div className={styles.metricValue}>
          {value}
          {unit && <span className={styles.metricUnit}>{unit}</span>}
        </div>
        {change && (
          <div className={`${styles.metricChange} ${styles[`metricChange${changeType.charAt(0).toUpperCase() + changeType.slice(1)}`]}`}>
            {changeType === 'increase' && (
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m18 15-6-6-6 6" />
              </svg>
            )}
            {changeType === 'decrease' && (
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            )}
            {change}
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== Data Stream ====================

export interface StreamData {
  id: string;
  sensor: string;
  value: string;
  status: 'normal' | 'warning' | 'critical';
  timestamp: string;
  isNew?: boolean;
}

export interface DataStreamTableProps {
  data: StreamData[];
  className?: string;
}

export const DataStreamTable: React.FC<DataStreamTableProps> = ({
  data,
  className = '',
}) => {
  return (
    <div className={`${styles.dataStream} ${className}`}>
      <table className={styles.streamTable}>
        <thead>
          <tr>
            <th>Sensor</th>
            <th>Value</th>
            <th>Status</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className={item.isNew ? styles.streamRowNew : ''}
            >
              <td>{item.sensor}</td>
              <td className={styles.streamValue}>{item.value}</td>
              <td>
                <span className={`${styles.statusBadge} ${styles[`statusBadge${item.status.charAt(0).toUpperCase() + item.status.slice(1)}`]}`}>
                  {item.status}
                </span>
              </td>
              <td className={styles.streamTimestamp}>{item.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ==================== Monitor Container ====================

export interface MonitorContainerProps {
  title: string;
  status?: 'active' | 'inactive' | 'warning';
  lastUpdate?: string;
  onPause?: () => void;
  onDownload?: () => void;
  isPaused?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const MonitorContainer: React.FC<MonitorContainerProps> = ({
  title,
  status = 'active',
  lastUpdate,
  onPause,
  onDownload,
  isPaused = false,
  children,
  className = '',
}) => {
  return (
    <div className={`${styles.monitorContainer} ${className}`}>
      <div className={styles.monitorHeader}>
        <div className={styles.monitorHeaderLeft}>
          <h3 className={styles.monitorTitle}>{title}</h3>
          <StatusIndicator status={status} label={status} />
          {lastUpdate && (
            <span className={styles.monitorUpdate}>Updated {lastUpdate}</span>
          )}
        </div>
        <div className={styles.monitorActions}>
          {onPause && (
            <button
              className={styles.btnMonitor}
              onClick={onPause}
              aria-label={isPaused ? 'Resume monitoring' : 'Pause monitoring'}
            >
              {isPaused ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              )}
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          )}
          {onDownload && (
            <button
              className={styles.btnMonitor}
              onClick={onDownload}
              aria-label="Download data"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              Download
            </button>
          )}
        </div>
      </div>
      <div className={styles.monitorContent}>
        {children}
      </div>
    </div>
  );
};

// ==================== Metric Grid ====================

export interface MetricGridProps {
  children: React.ReactNode;
  columns?: number;
  className?: string;
}

export const MetricGrid: React.FC<MetricGridProps> = ({
  children,
  columns = 3,
  className = '',
}) => {
  return (
    <div
      className={`${styles.metricGrid} ${className}`}
      style={{ '--metric-columns': columns } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

// ==================== Main Export ====================

export default {
  MonitorContainer,
  StatusIndicator,
  MetricCard,
  MetricGrid,
  DataStreamTable,
};
