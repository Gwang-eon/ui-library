import React, { memo, useMemo } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import styles from './MetricCard.module.css';

type IconType = React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;

export interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: IconType;
  iconColor?: string;
  change?: {
    type: 'positive' | 'negative' | 'neutral';
    text: string;
  };
  subtext?: string;
  variant?: 'default' | 'compact' | 'live' | 'alert';
  progress?: {
    value: number;
    color?: 'default' | 'warning' | 'error' | 'success';
  };
  chart?: React.ReactNode;
  comparative?: {
    label: string;
    value: string | number;
    color?: string;
  }[];
  onClick?: () => void;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// Comparative Item Component
interface ComparativeItemProps {
  label: string;
  value: string | number;
  color?: string;
}

const ComparativeItem = memo<ComparativeItemProps>(({ label, value, color }) => {
  const valueStyle = useMemo(() => color ? { color } : undefined, [color]);

  return (
    <div className={styles.comparativeItem}>
      <div className={styles.comparativeLabel}>{label}</div>
      <div className={styles.comparativeValue} style={valueStyle}>
        {value}
      </div>
    </div>
  );
});

ComparativeItem.displayName = 'MetricCard.ComparativeItem';

export const MetricCard = memo<MetricCardProps>(({
  label,
  value,
  icon: Icon,
  iconColor,
  change,
  subtext,
  variant = 'default',
  progress,
  chart,
  comparative,
  onClick,
  loading = false,
  className = '',
  style,
}) => {
  const cardClassName = useMemo(() =>
    [
      styles.metricCard,
      variant === 'compact' && styles.compact,
      variant === 'live' && styles.live,
      variant === 'alert' && styles.alert,
      onClick && styles.clickable,
      loading && styles.loading,
      className,
    ]
      .filter(Boolean)
      .join(' '),
    [variant, onClick, loading, className]
  );

  const iconStyle = useMemo(() =>
    iconColor ? { color: iconColor } : undefined,
    [iconColor]
  );

  const changeClassName = useMemo(() =>
    change ? `${styles.change} ${styles[change.type]}` : '',
    [change]
  );

  const progressClassName = useMemo(() =>
    progress?.color
      ? `${styles.progressBar} ${styles[progress.color]}`
      : styles.progressBar,
    [progress?.color]
  );

  const progressStyle = useMemo(() =>
    progress ? { width: `${progress.value}%` } : undefined,
    [progress]
  );

  if (loading) {
    return (
      <div className={cardClassName} style={style}>
        <div className={styles.header}>
          <div className={styles.labelSkeleton} />
          <div className={styles.iconSkeleton} />
        </div>
        <div className={styles.body}>
          <div className={styles.valueSkeleton} />
          {variant !== 'compact' && <div className={styles.subtextSkeleton} />}
        </div>
      </div>
    );
  }

  return (
    <div className={cardClassName} onClick={onClick} style={style}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <div className={styles.headerRight}>
          {variant === 'live' && (
            <span className={`${styles.statusBadge} ${styles.live}`}>
              <span className={styles.pulse} />
              Live
            </span>
          )}
          {variant === 'alert' && (
            <span className={`${styles.statusBadge} ${styles.alert}`}>
              <span className={styles.pulse} />
              Alert
            </span>
          )}
          {Icon && (
            <Icon size={20} className={styles.icon} style={iconStyle} />
          )}
        </div>
      </div>

      <div className={styles.body}>
        {comparative ? (
          <div className={styles.comparative}>
            {comparative.map((item) => (
              <ComparativeItem
                key={item.label}
                label={item.label}
                value={item.value}
                color={item.color}
              />
            ))}
          </div>
        ) : (
          <>
            <div className={styles.value}>{value}</div>
            {change && (
              <div className={changeClassName}>
                {change.type === 'positive' && <ArrowUp size={12} />}
                {change.type === 'negative' && <ArrowDown size={12} />}
                <span>{change.text}</span>
              </div>
            )}
            {subtext && !change && (
              <div className={styles.subtext}>{subtext}</div>
            )}
          </>
        )}
      </div>

      {progress && (
        <div className={styles.progressContainer}>
          <div className={progressClassName} style={progressStyle} />
        </div>
      )}

      {chart && <div className={styles.chart}>{chart}</div>}
    </div>
  );
});

MetricCard.displayName = 'MetricCard';

// MetricCardGrid component
export interface MetricCardGridProps {
  children: React.ReactNode;
  columns?: number;
  className?: string;
}

export const MetricCardGrid = memo<MetricCardGridProps>(({
  children,
  columns = 4,
  className = '',
}) => {
  const gridStyle = useMemo(() => ({
    gridTemplateColumns: `repeat(auto-fill, minmax(${
      columns === 2 ? '300px' : columns === 3 ? '250px' : '200px'
    }, 1fr))`,
  }), [columns]);

  const gridClassName = useMemo(() =>
    `${styles.grid} ${className}`,
    [className]
  );

  return (
    <div className={gridClassName} style={gridStyle}>
      {children}
    </div>
  );
});

MetricCardGrid.displayName = 'MetricCard.Grid';

// MiniChart Bar Component
interface ChartBarProps {
  value: number;
  min: number;
  range: number;
  color: string;
}

const ChartBar = memo<ChartBarProps>(({ value, min, range, color }) => {
  const percentage = range === 0 ? 100 : ((value - min) / range) * 100;
  const style = useMemo(() => ({
    height: `${percentage}%`,
    backgroundColor: color,
  }), [percentage, color]);

  return <div className={styles.chartBar} style={style} />;
});

ChartBar.displayName = 'MetricCard.ChartBar';

// MiniChart component
export interface MiniChartProps {
  data: number[];
  color?: 'primary' | 'success' | 'warning' | 'error';
  height?: number;
}

export const MiniChart = memo<MiniChartProps>(({
  data,
  color = 'primary',
  height = 40,
}) => {
  const { min, range } = useMemo(() => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    return { min, range: max - min };
  }, [data]);

  const containerStyle = useMemo(() => ({ height: `${height}px` }), [height]);

  const getColor = (index: number, total: number) => {
    const intensity = Math.floor(((index + 1) / total) * 5) * 100 + 200;
    return `var(--color-${color}-${intensity})`;
  };

  return (
    <div
      className={styles.miniChart}
      style={containerStyle}
      role="img"
      aria-label="Metric trend visualization"
    >
      {data.map((value, index) => (
        <ChartBar
          key={`bar-${index}`}
          value={value}
          min={min}
          range={range}
          color={getColor(index, data.length)}
        />
      ))}
    </div>
  );
});

MiniChart.displayName = 'MetricCard.MiniChart';

export default MetricCard;
