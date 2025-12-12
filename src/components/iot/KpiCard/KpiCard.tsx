import React, { memo, useMemo, useCallback } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import styles from './KpiCard.module.css';

type IconType = React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;

export type TrendType = 'positive' | 'negative' | 'neutral';

export interface KpiCardProps {
  label: string;
  value: string | number;
  trend?: TrendType;
  trendValue?: string;
  trendDescription?: string;
  icon?: IconType;
  iconColor?: string;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
}

// Skeleton styles
const skeletonStyles = {
  label: { height: 16, width: '50%' } as React.CSSProperties,
  icon: { width: 24, height: 24, borderRadius: 'var(--radius-base)' } as React.CSSProperties,
  value: { height: 40, width: '60%', marginBottom: 8 } as React.CSSProperties,
  trend: { height: 14, width: '40%' } as React.CSSProperties,
};

// Skeleton component
const KpiCardSkeleton = memo<{ className?: string }>(({ className }) => {
  const containerClassName = useMemo(() =>
    `${styles.kpiCard} ${className || ''}`,
    [className]
  );

  return (
    <div className={containerClassName}>
      <div className={styles.kpiHeader}>
        <div className={styles.skeleton} style={skeletonStyles.label} />
        <div className={styles.skeleton} style={skeletonStyles.icon} />
      </div>
      <div className={styles.skeleton} style={skeletonStyles.value} />
      <div className={styles.skeleton} style={skeletonStyles.trend} />
    </div>
  );
});

KpiCardSkeleton.displayName = 'KpiCard.Skeleton';

// Main component
const KpiCard = memo<KpiCardProps>(({
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
  const containerClassName = useMemo(() =>
    `${styles.kpiCard} ${className || ''}`,
    [className]
  );

  const iconStyle = useMemo(() => ({ color: iconColor }), [iconColor]);

  const trendIcon = useMemo(() => {
    if (!trend || trend === 'neutral') {
      return <Minus size={14} />;
    }

    if (trend === 'positive') {
      const isIncrease = trendValue?.includes('↑') || (!trendValue?.includes('↓') && !trendValue?.includes('-'));
      return isIncrease ? <TrendingUp size={14} /> : <TrendingDown size={14} />;
    }

    if (trend === 'negative') {
      const isIncrease = trendValue?.includes('↑') || (!trendValue?.includes('↓') && !trendValue?.includes('-'));
      return isIncrease ? <TrendingUp size={14} /> : <TrendingDown size={14} />;
    }

    return null;
  }, [trend, trendValue]);

  const cleanTrendValue = useMemo(() =>
    trendValue?.replace(/[↑↓→]/g, '').trim(),
    [trendValue]
  );

  const trendClassName = useMemo(() =>
    `${styles.kpiTrend} ${trend ? styles[`trend${trend.charAt(0).toUpperCase()}${trend.slice(1)}`] : ''}`,
    [trend]
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  }, [onClick]);

  if (loading) {
    return <KpiCardSkeleton className={className} />;
  }

  return (
    <div
      className={containerClassName}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.kpiHeader}>
        <div className={styles.kpiLabel}>{label}</div>
        {Icon && <Icon size={24} style={iconStyle} />}
      </div>

      <div className={styles.kpiValue}>{value}</div>

      {(trend || trendValue) && (
        <div className={trendClassName}>
          <div className={styles.trendValue}>
            {trendIcon}
            {cleanTrendValue && <span>{cleanTrendValue}</span>}
          </div>
          {trendDescription && <span className={styles.trendDescription}>{trendDescription}</span>}
        </div>
      )}
    </div>
  );
});

KpiCard.displayName = 'KpiCard';

// Grid component
interface KpiCardGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

const KpiCardGrid = memo<KpiCardGridProps>(({ children, columns = 4, className }) => {
  const gridStyle = useMemo(() =>
    ({ '--kpi-grid-columns': columns } as React.CSSProperties),
    [columns]
  );

  const gridClassName = useMemo(() =>
    `${styles.kpiCardGrid} ${className || ''}`,
    [className]
  );

  return (
    <div className={gridClassName} style={gridStyle}>
      {children}
    </div>
  );
});

KpiCardGrid.displayName = 'KpiCard.Grid';

export default KpiCard;
export { KpiCardSkeleton, KpiCardGrid };
