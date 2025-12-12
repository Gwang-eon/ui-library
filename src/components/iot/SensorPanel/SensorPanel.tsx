import React, { memo, useMemo, useCallback } from 'react';
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
  label: string;
  value: string | number;
  unit?: string;
  status?: SensorStatus;
  statusText?: string;
  icon?: IconType;
  iconVariant?: IconColorVariant;
  rangeText?: string;
  variant?: SensorVariant;
  sensorId?: string;
  trendDirection?: TrendDirection;
  trendValue?: string;
  trendLabel?: string;
  stats?: SensorStat[];
  threshold?: SensorThreshold;
  lastUpdated?: string;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
}

// ========================================
// SKELETON STYLES (memoized)
// ========================================

const skeletonStyles = {
  compactIcon: { width: 20, height: 20, borderRadius: 4 } as React.CSSProperties,
  compactLabel: { height: 14, width: '60%', marginBottom: 8 } as React.CSSProperties,
  compactValue: { height: 28, width: '40%' } as React.CSSProperties,
  detailedIcon: { width: 40, height: 40, borderRadius: 'var(--radius-lg)' } as React.CSSProperties,
  detailedTitle: { height: 18, width: '50%', marginBottom: 8 } as React.CSSProperties,
  detailedSubtitle: { height: 14, width: '30%' } as React.CSSProperties,
  detailedValue: { height: 40, width: '60%', marginBottom: 24 } as React.CSSProperties,
  statLabel: { height: 14, width: '40%' } as React.CSSProperties,
  statValue: { height: 14, width: '30%' } as React.CSSProperties,
  basicIcon: { width: 56, height: 56, borderRadius: 'var(--radius-lg)' } as React.CSSProperties,
  basicLabel: { height: 14, width: '60%', marginBottom: 8 } as React.CSSProperties,
  basicValue: { height: 28, width: '40%' } as React.CSSProperties,
  basicRange: { height: 13, width: '70%', marginTop: 16 } as React.CSSProperties,
  flex1: { flex: 1 } as React.CSSProperties,
};

// ========================================
// STAT ROW COMPONENT
// ========================================

interface StatRowProps {
  stat: SensorStat;
}

const StatRow = memo<StatRowProps>(({ stat }) => (
  <div className={styles.statRow}>
    <span className={styles.statLabel}>{stat.label}</span>
    <span className={styles.statValue}>{stat.value}</span>
  </div>
));

StatRow.displayName = 'SensorPanel.StatRow';

// ========================================
// LOADING SKELETON
// ========================================

interface SensorPanelSkeletonProps {
  variant?: SensorVariant;
  className?: string;
}

const SensorPanelSkeleton = memo<SensorPanelSkeletonProps>(({ variant = 'basic', className }) => {
  const containerClassName = useMemo(() => {
    if (variant === 'compact') return `${styles.compactCard} ${className || ''}`;
    if (variant === 'detailed') return `${styles.detailedCard} ${className || ''}`;
    return `${styles.basicCard} ${className || ''}`;
  }, [variant, className]);

  if (variant === 'compact') {
    return (
      <div className={containerClassName}>
        <div className={styles.compactHeader}>
          <div className={`${styles.skeleton} ${styles.skeletonIcon}`} style={skeletonStyles.compactIcon} />
          <div className={`${styles.skeleton} ${styles.skeletonBadge}`} />
        </div>
        <div className={styles.skeleton} style={skeletonStyles.compactLabel} />
        <div className={styles.skeleton} style={skeletonStyles.compactValue} />
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={containerClassName}>
        <div className={styles.cardHeader}>
          <div className={styles.detailedSensorHeader}>
            <div className={styles.skeleton} style={skeletonStyles.detailedIcon} />
            <div style={skeletonStyles.flex1}>
              <div className={styles.skeleton} style={skeletonStyles.detailedTitle} />
              <div className={styles.skeleton} style={skeletonStyles.detailedSubtitle} />
            </div>
          </div>
          <div className={`${styles.skeleton} ${styles.skeletonBadge}`} />
        </div>
        <div className={styles.cardBody}>
          <div className={styles.skeleton} style={skeletonStyles.detailedValue} />
          <div className={styles.sensorStatsBox}>
            {[1, 2, 3].map((i) => (
              <div key={`stat-skeleton-${i}`} className={styles.statRow}>
                <div className={styles.skeleton} style={skeletonStyles.statLabel} />
                <div className={styles.skeleton} style={skeletonStyles.statValue} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      <div className={styles.sensorHeader}>
        <div className={styles.skeleton} style={skeletonStyles.basicIcon} />
        <div style={skeletonStyles.flex1}>
          <div className={styles.skeleton} style={skeletonStyles.basicLabel} />
          <div className={styles.skeleton} style={skeletonStyles.basicValue} />
        </div>
        <div className={`${styles.skeleton} ${styles.skeletonBadge}`} />
      </div>
      <div className={styles.skeleton} style={skeletonStyles.basicRange} />
    </div>
  );
});

SensorPanelSkeleton.displayName = 'SensorPanel.Skeleton';

// ========================================
// SENSOR PANEL COMPONENT
// ========================================

const SensorPanel = memo<SensorPanelProps>(({
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
  const badgeClass = useMemo(() => {
    switch (status) {
      case 'normal':
      case 'ok':
        return 'Success';
      case 'warning':
        return 'Warning';
      case 'error':
        return 'Error';
      default:
        return 'Success';
    }
  }, [status]);

  const displayStatusText = useMemo(() =>
    statusText || (status === 'ok' ? 'OK' : status.charAt(0).toUpperCase() + status.slice(1)),
    [statusText, status]
  );

  const iconColorStyle = useMemo(() =>
    ({ color: `var(--color-${iconVariant}-600)` }),
    [iconVariant]
  );

  const iconCircleClass = useMemo(() =>
    styles[`iconCircle${iconVariant.charAt(0).toUpperCase()}${iconVariant.slice(1)}`],
    [iconVariant]
  );

  const badgeClassName = useMemo(() =>
    `${styles.badge} ${styles[`badge${badgeClass}`]}`,
    [badgeClass]
  );

  const badgeXsClassName = useMemo(() =>
    `${styles.badge} ${styles.badgeXs} ${styles[`badge${badgeClass}`]}`,
    [badgeClass]
  );

  const containerClassName = useMemo(() => {
    if (variant === 'compact') return `${styles.compactCard} ${className || ''}`;
    if (variant === 'detailed') return `${styles.detailedCard} ${className || ''}`;
    return `${styles.basicCard} ${className || ''}`;
  }, [variant, className]);

  const trendClassName = useMemo(() => {
    if (trendDirection === 'down') return `${styles.trendValue} ${styles.trendPositive}`;
    if (trendDirection === 'up') return `${styles.trendValue} ${styles.trendNegative}`;
    return styles.trendValue;
  }, [trendDirection]);

  const progressWidth = useMemo(() => {
    if (!threshold) return '0%';
    return `${threshold.percentage || ((threshold.currentValue / threshold.maxValue) * 100)}%`;
  }, [threshold]);

  const progressStyle = useMemo(() => ({ width: progressWidth }), [progressWidth]);

  if (loading) {
    return <SensorPanelSkeleton variant={variant} className={className} />;
  }

  if (variant === 'compact') {
    return (
      <div
        className={containerClassName}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        <div className={styles.compactHeader}>
          <Icon className={styles.compactIcon} style={iconColorStyle} />
          <span className={badgeXsClassName}>
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
      <div className={containerClassName}>
        <div className={styles.cardHeader}>
          <div className={styles.detailedSensorHeader}>
            <div className={`${styles.sensorIconCircle} ${iconCircleClass}`}>
              <Icon size={20} />
            </div>
            <div className={styles.detailedSensorInfo}>
              <h3 className={styles.cardTitle}>{label}</h3>
              {sensorId && <p className={styles.detailedSensorId}>Sensor ID: {sensorId}</p>}
            </div>
          </div>
          <span className={badgeClassName}>
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
                <div className={trendClassName}>
                  {trendDirection === 'up' ? <TrendingUp size={16} /> : trendDirection === 'down' ? <TrendingDown size={16} /> : null}
                  <span>{trendValue}</span>
                </div>
                <p className={styles.trendLabel}>{trendLabel}</p>
              </div>
            )}
          </div>

          {stats && stats.length > 0 && (
            <div className={styles.sensorStatsBox}>
              {stats.map((stat) => (
                <StatRow key={stat.label} stat={stat} />
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
                  style={progressStyle}
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

  return (
    <div
      className={containerClassName}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className={styles.sensorHeader}>
        <div className={`${styles.sensorIconCircle} ${iconCircleClass}`}>
          <Icon size={24} />
        </div>
        <div className={styles.sensorInfo}>
          <h4 className={styles.sensorLabel}>{label}</h4>
          <p className={styles.sensorValue}>
            {value}
            {unit}
          </p>
        </div>
        <span className={badgeClassName}>
          {displayStatusText}
        </span>
      </div>
      {rangeText && <div className={styles.sensorRange}>{rangeText}</div>}
    </div>
  );
});

SensorPanel.displayName = 'SensorPanel';

// ========================================
// SENSOR PANEL GRID
// ========================================

interface SensorPanelGridProps {
  children: React.ReactNode;
  variant?: 'basic' | 'compact';
  className?: string;
}

const SensorPanelGrid = memo<SensorPanelGridProps>(({ children, variant = 'basic', className }) => {
  const gridClass = useMemo(() => {
    const base = variant === 'compact' ? styles.compactSensorGrid : styles.sensorCardGrid;
    return `${base} ${className || ''}`;
  }, [variant, className]);

  return <div className={gridClass}>{children}</div>;
});

SensorPanelGrid.displayName = 'SensorPanel.Grid';

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

const SensorPanelEmptyState = memo<SensorPanelEmptyStateProps>(({
  title = 'No Sensor Data',
  description = 'No sensors are currently connected. Connect sensors to start monitoring real-time data.',
  actionLabel = 'Add Sensor',
  onAction,
  icon: Icon = Activity,
  className,
}) => {
  const containerClassName = useMemo(() =>
    `${styles.emptyState} ${className || ''}`,
    [className]
  );

  return (
    <div className={containerClassName}>
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
});

SensorPanelEmptyState.displayName = 'SensorPanel.EmptyState';

export default SensorPanel;
export { SensorPanelGrid, SensorPanelEmptyState, SensorPanelSkeleton };
