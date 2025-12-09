import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import styles from './DeviceAnalytics.module.css';

// Custom icon type
type IconType = React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;

// ==================== Analytics Card ====================

export interface AnalyticsCardProps {
  icon: IconType;
  iconGradient: string;
  label: string;
  value: string | number;
  change?: {
    type: 'positive' | 'negative';
    text: string;
  };
  loading?: boolean;
  className?: string;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  icon: Icon,
  iconGradient,
  label,
  value,
  change,
  loading = false,
  className = '',
}) => {
  if (loading) {
    return (
      <div className={`${styles.analyticsCard} ${styles.loading} ${className}`}>
        <div className={styles.iconSkeleton} />
        <div className={styles.labelSkeleton} />
        <div className={styles.valueSkeleton} />
        <div className={styles.changeSkeleton} />
      </div>
    );
  }

  return (
    <div className={`${styles.analyticsCard} ${className}`}>
      <div className={styles.analyticsIcon} style={{ background: iconGradient }}>
        <Icon size={24} />
      </div>
      <div className={styles.analyticsLabel}>{label}</div>
      <div className={styles.analyticsValue}>{value}</div>
      {change && (
        <div className={`${styles.analyticsChange} ${styles[change.type]}`}>
          {change.type === 'positive' ? (
            <TrendingUp size={16} />
          ) : (
            <TrendingDown size={16} />
          )}
          <span>{change.text}</span>
        </div>
      )}
    </div>
  );
};

// ==================== Chart Card ====================

export interface ChartCardProps {
  title: string;
  filters?: React.ReactNode;
  chart?: React.ReactNode;
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  filters,
  chart,
  loading = false,
  className = '',
  children,
}) => {
  if (loading) {
    return (
      <div className={`${styles.chartCard} ${styles.loading} ${className}`}>
        <div className={styles.chartHeader}>
          <div className={styles.titleSkeleton} />
        </div>
        <div className={styles.chartPlaceholder}>
          <div className={styles.chartSkeleton} />
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.chartCard} ${className}`}>
      <div className={styles.chartHeader}>
        <div className={styles.chartTitle}>{title}</div>
        {filters && <div className={styles.chartFilters}>{filters}</div>}
      </div>
      {chart && <div className={styles.chartContainer}>{chart}</div>}
      {!chart && !children && (
        <div className={styles.chartPlaceholder}>
          [Chart Placeholder]
        </div>
      )}
      {children}
    </div>
  );
};

// ==================== Device Health Item ====================

export interface DeviceHealthMetric {
  label: string;
  value: string;
}

export interface DeviceHealthItemProps {
  name: string;
  status: 'online' | 'offline' | 'warning';
  healthScore: number;
  healthLevel?: 'excellent' | 'good' | 'warning' | 'poor';
  metrics: DeviceHealthMetric[];
  statusBadge?: React.ReactNode;
  loading?: boolean;
  className?: string;
}

export const DeviceHealthItem: React.FC<DeviceHealthItemProps> = ({
  name,
  status: _status,
  healthScore,
  healthLevel,
  metrics,
  statusBadge,
  loading = false,
  className = '',
}) => {
  // Auto-determine health level based on score if not provided
  const getHealthLevel = (): 'excellent' | 'good' | 'warning' | 'poor' => {
    if (healthLevel) return healthLevel;
    if (healthScore >= 90) return 'excellent';
    if (healthScore >= 75) return 'good';
    if (healthScore >= 60) return 'warning';
    return 'poor';
  };

  const level = getHealthLevel();

  if (loading) {
    return (
      <div className={`${styles.deviceHealthItem} ${styles.loading} ${className}`}>
        <div className={styles.deviceHealthHeader}>
          <div className={styles.nameSkeleton} />
          <div className={styles.badgeSkeleton} />
        </div>
        <div className={styles.scoreSkeleton} />
        <div className={styles.metricsSkeleton}>
          <div className={styles.metricRowSkeleton} />
          <div className={styles.metricRowSkeleton} />
          <div className={styles.metricRowSkeleton} />
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.deviceHealthItem} ${className}`}>
      <div className={styles.deviceHealthHeader}>
        <div className={styles.deviceHealthName}>{name}</div>
        {statusBadge}
      </div>
      <div className={`${styles.healthScore} ${styles[level]}`}>
        {healthScore}
      </div>
      <div className={styles.healthMetrics}>
        {metrics.map((metric, index) => (
          <div key={index} className={styles.healthMetricRow}>
            <span>{metric.label}:</span>
            <span className={styles.metricValue}>{metric.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==================== Insight Item ====================

export interface InsightItemProps {
  type: 'info' | 'success' | 'warning' | 'error';
  icon: IconType;
  title: string;
  description: string;
  actionText?: string;
  onActionClick?: () => void;
  loading?: boolean;
  className?: string;
}

export const InsightItem: React.FC<InsightItemProps> = ({
  type,
  icon: Icon,
  title,
  description,
  actionText,
  onActionClick,
  loading = false,
  className = '',
}) => {
  const iconColorMap = {
    info: {
      background: 'var(--color-info-100)',
      color: 'var(--color-info-600)',
    },
    success: {
      background: 'var(--color-success-100)',
      color: 'var(--color-success-600)',
    },
    warning: {
      background: 'var(--color-warning-100)',
      color: 'var(--color-warning-600)',
    },
    error: {
      background: 'var(--color-error-100)',
      color: 'var(--color-error-600)',
    },
  };

  if (loading) {
    return (
      <div className={`${styles.insightItem} ${styles[type]} ${styles.loading} ${className}`}>
        <div className={styles.insightIconSkeleton} />
        <div className={styles.insightContentSkeleton}>
          <div className={styles.insightTitleSkeleton} />
          <div className={styles.insightDescSkeleton} />
          <div className={styles.insightActionSkeleton} />
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.insightItem} ${styles[type]} ${className}`}>
      <div
        className={styles.insightIcon}
        style={{
          backgroundColor: iconColorMap[type].background,
          color: iconColorMap[type].color,
        }}
      >
        <Icon size={20} />
      </div>
      <div className={styles.insightContent}>
        <div className={styles.insightTitle}>{title}</div>
        <div className={styles.insightDescription}>{description}</div>
        {actionText && (
          <div
            className={styles.insightAction}
            onClick={onActionClick}
            role={onActionClick ? 'button' : undefined}
            tabIndex={onActionClick ? 0 : undefined}
          >
            <span>{actionText}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== Main Export ====================

export default {
  AnalyticsCard,
  ChartCard,
  DeviceHealthItem,
  InsightItem,
};
