import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import styles from './KpiCard.module.css';

// ========================================
// TYPES
// ========================================

// Type for Lucide React icons
type IconType = React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;

export type TrendType = 'positive' | 'negative' | 'neutral';

export interface KpiCardProps {
  /** KPI label/name */
  label: string;
  /** KPI value */
  value: string | number;
  /** Trend direction */
  trend?: TrendType;
  /** Trend value (e.g., "12%", "8", "+15") */
  trendValue?: string;
  /** Trend description (e.g., "vs. last month") */
  trendDescription?: string;
  /** Optional icon */
  icon?: IconType;
  /** Icon color (CSS color variable or hex) */
  iconColor?: string;
  /** Loading state */
  loading?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}

// ========================================
// KPI CARD COMPONENT
// ========================================

const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  trend,
  trendValue,
  trendDescription,
  icon: Icon,
  iconColor = 'var(--color-primary-500)',
  loading = false,
  className,
  onClick,
}) => {
  // Loading state
  if (loading) {
    return <KpiCardSkeleton className={className} />;
  }

  // Get trend icon
  const getTrendIcon = () => {
    if (!trend || trend === 'neutral') {
      return <Minus size={14} />;
    }

    // For positive trend
    if (trend === 'positive') {
      // Check if trend value indicates increase or decrease
      const isIncrease = trendValue?.includes('↑') || (!trendValue?.includes('↓') && !trendValue?.includes('-'));
      return isIncrease ? <TrendingUp size={14} /> : <TrendingDown size={14} />;
    }

    // For negative trend
    if (trend === 'negative') {
      // Check if trend value indicates increase or decrease
      const isIncrease = trendValue?.includes('↑') || (!trendValue?.includes('↓') && !trendValue?.includes('-'));
      return isIncrease ? <TrendingUp size={14} /> : <TrendingDown size={14} />;
    }

    return null;
  };

  // Clean trend value (remove arrows if using icon)
  const cleanTrendValue = trendValue?.replace(/[↑↓→]/g, '').trim();

  return (
    <div
      className={`${styles.kpiCard} ${className || ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Header with label and optional icon */}
      <div className={styles.kpiHeader}>
        <div className={styles.kpiLabel}>{label}</div>
        {Icon && <Icon size={24} style={{ color: iconColor }} />}
      </div>

      {/* Value */}
      <div className={styles.kpiValue}>{value}</div>

      {/* Trend */}
      {(trend || trendValue) && (
        <div className={`${styles.kpiTrend} ${trend ? styles[`trend${trend.charAt(0).toUpperCase()}${trend.slice(1)}`] : ''}`}>
          <div className={styles.trendValue}>
            {getTrendIcon()}
            {cleanTrendValue && <span>{cleanTrendValue}</span>}
          </div>
          {trendDescription && <span className={styles.trendDescription}>{trendDescription}</span>}
        </div>
      )}
    </div>
  );
};

// ========================================
// LOADING SKELETON
// ========================================

interface KpiCardSkeletonProps {
  className?: string;
}

const KpiCardSkeleton: React.FC<KpiCardSkeletonProps> = ({ className }) => {
  return (
    <div className={`${styles.kpiCard} ${className || ''}`}>
      <div className={styles.kpiHeader}>
        <div className={`${styles.skeleton}`} style={{ height: 16, width: '50%' }} />
        <div className={`${styles.skeleton}`} style={{ width: 24, height: 24, borderRadius: 4 }} />
      </div>
      <div className={`${styles.skeleton}`} style={{ height: 40, width: '60%', marginBottom: 8 }} />
      <div className={`${styles.skeleton}`} style={{ height: 14, width: '40%' }} />
    </div>
  );
};

// ========================================
// KPI CARD GRID
// ========================================

interface KpiCardGridProps {
  children: React.ReactNode;
  /** Number of columns (1-6) */
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

const KpiCardGrid: React.FC<KpiCardGridProps> = ({ children, columns = 4, className }) => {
  const gridStyle = {
    '--kpi-grid-columns': columns,
  } as React.CSSProperties;

  return (
    <div className={`${styles.kpiCardGrid} ${className || ''}`} style={gridStyle}>
      {children}
    </div>
  );
};

// ========================================
// EXPORTS
// ========================================

KpiCard.displayName = 'KpiCard';
KpiCardSkeleton.displayName = 'KpiCard.Skeleton';
KpiCardGrid.displayName = 'KpiCard.Grid';

export default KpiCard;
export { KpiCardSkeleton, KpiCardGrid };
