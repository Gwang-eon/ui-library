import React from 'react';
import {
  Thermometer,
  TrendingUp,
  TrendingDown,
  Clock,
  Activity,
} from 'lucide-react';
import styles from './SensorPanel.module.css';

// ========================================
// TYPES
// ========================================

// Type for Lucide React icons
type IconType = React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;

export type SensorStatus = 'normal' | 'warning' | 'error' | 'ok';
export type SensorVariant = 'basic' | 'detailed' | 'compact';
export type IconColorVariant = 'error' | 'primary' | 'success' | 'warning';
export type TrendDirection = 'up' | 'down' | 'neutral';

export interface SensorStat {
  label: string;
  value: string | number;
}

export interface SensorThreshold {
  label?: string;
  status?: string;
  currentValue: number;
  maxValue: number;
  minValue?: number;
  percentage?: number;
}

export interface SensorPanelProps {
  /** Sensor label/name */
  label: string;
  /** Current sensor value */
  value: string | number;
  /** Value unit (e.g., °C, %, kW) */
  unit?: string;
  /** Sensor status */
  status?: SensorStatus;
  /** Status badge text */
  statusText?: string;
  /** Sensor icon */
  icon?: IconType;
  /** Icon color variant */
  iconVariant?: IconColorVariant;
  /** Normal range text (for basic variant) */
  rangeText?: string;
  /** Variant type */
  variant?: SensorVariant;
  /** Sensor ID (for detailed variant) */
  sensorId?: string;
  /** Trend direction */
  trendDirection?: TrendDirection;
  /** Trend value (e.g., +8%, -5%) */
  trendValue?: string;
  /** Trend label */
  trendLabel?: string;
  /** Additional stats (for detailed variant) */
  stats?: SensorStat[];
  /** Threshold information */
  threshold?: SensorThreshold;
  /** Last updated timestamp */
  lastUpdated?: string;
  /** Loading state */
  loading?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}

// ========================================
// SENSOR PANEL COMPONENT
// ========================================

const SensorPanel: React.FC<SensorPanelProps> = ({
  label,
  value,
  unit,
  status = 'normal',
  statusText,
  icon: Icon = Thermometer,
  iconVariant = 'primary',
  rangeText,
  variant = 'basic',
  sensorId,
  trendDirection,
  trendValue,
  trendLabel = 'vs. last hour',
  stats,
  threshold,
  lastUpdated,
  loading = false,
  className,
  onClick,
}) => {
  // Loading state
  if (loading) {
    return <SensorPanelSkeleton variant={variant} className={className} />;
  }

  // Get status badge class
  const getStatusBadgeClass = () => {
    switch (status) {
      case 'normal':
      case 'ok':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'success';
    }
  };

  const badgeClass = getStatusBadgeClass();
  const displayStatusText = statusText || (status === 'ok' ? 'OK' : status.charAt(0).toUpperCase() + status.slice(1));

  // Render based on variant
  if (variant === 'compact') {
    return (
      <div
        className={`${styles.compactCard} ${className || ''}`}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        <div className={styles.compactHeader}>
          <Icon className={styles.compactIcon} style={{ color: `var(--color-${iconVariant}-600)` }} />
          <span className={`${styles.badge} ${styles.badgeXs} ${styles[`badge${badgeClass.charAt(0).toUpperCase()}${badgeClass.slice(1)}`]}`}>
            {displayStatusText}
          </span>
        </div>
        <p className={styles.compactLabel}>{label}</p>
        <p className={styles.compactValue}>
          {value}
          {unit && <span className={styles.compactUnit}>{unit}</span>}
        </p>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={`${styles.detailedCard} ${className || ''}`}>
        <div className={styles.cardHeader}>
          <div className={styles.detailedSensorHeader}>
            <div className={`${styles.sensorIconCircle} ${styles[`iconCircle${iconVariant.charAt(0).toUpperCase()}${iconVariant.slice(1)}`]}`}>
              <Icon size={20} />
            </div>
            <div className={styles.detailedSensorInfo}>
              <h3 className={styles.cardTitle}>{label}</h3>
              {sensorId && <p className={styles.detailedSensorId}>Sensor ID: {sensorId}</p>}
            </div>
          </div>
          <span className={`${styles.badge} ${styles[`badge${badgeClass.charAt(0).toUpperCase()}${badgeClass.slice(1)}`]}`}>
            {displayStatusText}
          </span>
        </div>

        <div className={styles.cardBody}>
          <div className={styles.sensorCurrent}>
            <div>
              <p className={styles.sensorLabel}>Current Usage</p>
              <p className={styles.currentValue}>
                {value} {unit && <span className={styles.currentUnit}>{unit}</span>}
              </p>
            </div>
            {trendDirection && trendValue && (
              <div className={styles.trendIndicator}>
                <div className={`${styles.trendValue} ${trendDirection === 'down' ? styles.trendPositive : trendDirection === 'up' ? styles.trendNegative : ''}`}>
                  {trendDirection === 'up' ? <TrendingUp size={16} /> : trendDirection === 'down' ? <TrendingDown size={16} /> : null}
                  <span>{trendValue}</span>
                </div>
                <p className={styles.trendLabel}>{trendLabel}</p>
              </div>
            )}
          </div>

          {stats && stats.length > 0 && (
            <div className={styles.sensorStatsBox}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.statRow}>
                  <span className={styles.statLabel}>{stat.label}</span>
                  <span className={styles.statValue}>{stat.value}</span>
                </div>
              ))}
            </div>
          )}

          {threshold && (
            <div className={styles.thresholdSection}>
              <div className={styles.thresholdHeader}>
                <span className={styles.thresholdLabel}>{threshold.label || 'Threshold Status'}</span>
                <span className={styles.thresholdStatus}>{threshold.status || 'Within Limits'}</span>
              </div>
              <div className={styles.progress}>
                <div
                  className={`${styles.progressBar} ${styles.progressBarSuccess}`}
                  style={{ width: `${threshold.percentage || ((threshold.currentValue / threshold.maxValue) * 100)}%` }}
                />
              </div>
              <div className={styles.thresholdRange}>
                <span className={styles.rangeValue}>{threshold.minValue || 0} {unit}</span>
                <span className={styles.rangeValue}>Max: {threshold.maxValue} {unit}</span>
              </div>
            </div>
          )}
        </div>

        {lastUpdated && (
          <div className={styles.cardFooter}>
            <div className={styles.sensorFooterTimestamp}>
              <Clock size={14} />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Basic variant (default)
  return (
    <div
      className={`${styles.basicCard} ${className || ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className={styles.sensorHeader}>
        <div className={`${styles.sensorIconCircle} ${styles[`iconCircle${iconVariant.charAt(0).toUpperCase()}${iconVariant.slice(1)}`]}`}>
          <Icon size={24} />
        </div>
        <div className={styles.sensorInfo}>
          <h4 className={styles.sensorLabel}>{label}</h4>
          <p className={styles.sensorValue}>
            {value}
            {unit}
          </p>
        </div>
        <span className={`${styles.badge} ${styles[`badge${badgeClass.charAt(0).toUpperCase()}${badgeClass.slice(1)}`]}`}>
          {displayStatusText}
        </span>
      </div>
      {rangeText && <div className={styles.sensorRange}>{rangeText}</div>}
    </div>
  );
};

// ========================================
// LOADING SKELETON
// ========================================

interface SensorPanelSkeletonProps {
  variant?: SensorVariant;
  className?: string;
}

const SensorPanelSkeleton: React.FC<SensorPanelSkeletonProps> = ({ variant = 'basic', className }) => {
  if (variant === 'compact') {
    return (
      <div className={`${styles.compactCard} ${className || ''}`}>
        <div className={styles.compactHeader}>
          <div className={`${styles.skeleton} ${styles.skeletonIcon}`} style={{ width: 20, height: 20, borderRadius: 4 }} />
          <div className={`${styles.skeleton} ${styles.skeletonBadge}`} />
        </div>
        <div className={styles.skeleton} style={{ height: 14, width: '60%', marginBottom: 8 }} />
        <div className={styles.skeleton} style={{ height: 28, width: '40%' }} />
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={`${styles.detailedCard} ${className || ''}`}>
        <div className={styles.cardHeader}>
          <div className={styles.detailedSensorHeader}>
            <div className={`${styles.skeleton}`} style={{ width: 40, height: 40, borderRadius: 'var(--radius-lg)' }} />
            <div style={{ flex: 1 }}>
              <div className={styles.skeleton} style={{ height: 18, width: '50%', marginBottom: 8 }} />
              <div className={styles.skeleton} style={{ height: 14, width: '30%' }} />
            </div>
          </div>
          <div className={`${styles.skeleton} ${styles.skeletonBadge}`} />
        </div>
        <div className={styles.cardBody}>
          <div className={styles.skeleton} style={{ height: 40, width: '60%', marginBottom: 24 }} />
          <div className={styles.sensorStatsBox}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.statRow}>
                <div className={styles.skeleton} style={{ height: 14, width: '40%' }} />
                <div className={styles.skeleton} style={{ height: 14, width: '30%' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Basic skeleton
  return (
    <div className={`${styles.basicCard} ${className || ''}`}>
      <div className={styles.sensorHeader}>
        <div className={`${styles.skeleton}`} style={{ width: 56, height: 56, borderRadius: 'var(--radius-lg)' }} />
        <div style={{ flex: 1 }}>
          <div className={styles.skeleton} style={{ height: 14, width: '60%', marginBottom: 8 }} />
          <div className={styles.skeleton} style={{ height: 28, width: '40%' }} />
        </div>
        <div className={`${styles.skeleton} ${styles.skeletonBadge}`} />
      </div>
      <div className={styles.skeleton} style={{ height: 13, width: '70%', marginTop: 16 }} />
    </div>
  );
};

// ========================================
// SENSOR PANEL GRID
// ========================================

interface SensorPanelGridProps {
  children: React.ReactNode;
  variant?: 'basic' | 'compact';
  className?: string;
}

const SensorPanelGrid: React.FC<SensorPanelGridProps> = ({ children, variant = 'basic', className }) => {
  const gridClass = variant === 'compact' ? styles.compactSensorGrid : styles.sensorCardGrid;
  return <div className={`${gridClass} ${className || ''}`}>{children}</div>;
};

// ========================================
// EMPTY STATE
// ========================================

interface SensorPanelEmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: IconType;
  className?: string;
}

const SensorPanelEmptyState: React.FC<SensorPanelEmptyStateProps> = ({
  title = 'No Sensor Data',
  description = 'No sensors are currently connected. Connect sensors to start monitoring real-time data.',
  actionLabel = 'Add Sensor',
  onAction,
  icon: Icon = Activity,
  className,
}) => {
  return (
    <div className={`${styles.emptyState} ${className || ''}`}>
      <div className={styles.emptyStateIcon}>
        <Icon size={64} />
      </div>
      <h3 className={styles.emptyStateTitle}>{title}</h3>
      <p className={styles.emptyStateDescription}>{description}</p>
      {onAction && (
        <button className={styles.emptyStateButton} onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

// ========================================
// EXPORTS
// ========================================

SensorPanel.displayName = 'SensorPanel';
SensorPanelGrid.displayName = 'SensorPanel.Grid';
SensorPanelEmptyState.displayName = 'SensorPanel.EmptyState';
SensorPanelSkeleton.displayName = 'SensorPanel.Skeleton';

export default SensorPanel;
export { SensorPanelGrid, SensorPanelEmptyState, SensorPanelSkeleton };
