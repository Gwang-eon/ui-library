import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import styles from './MetricCard.module.css';

// Custom icon type to avoid lucide-react LucideIcon import issue
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
    value: number; // 0-100
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

export const MetricCard: React.FC<MetricCardProps> = ({
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
  const cardClassName = [
    styles.metricCard,
    variant === 'compact' && styles.compact,
    variant === 'live' && styles.live,
    variant === 'alert' && styles.alert,
    onClick && styles.clickable,
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(' ');

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
            <Icon
              size={20}
              className={styles.icon}
              style={{ color: iconColor }}
            />
          )}
        </div>
      </div>

      <div className={styles.body}>
        {comparative ? (
          <div className={styles.comparative}>
            {comparative.map((item, index) => (
              <div key={index} className={styles.comparativeItem}>
                <div className={styles.comparativeLabel}>{item.label}</div>
                <div
                  className={styles.comparativeValue}
                  style={{ color: item.color }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className={styles.value}>{value}</div>
            {change && (
              <div className={`${styles.change} ${styles[change.type]}`}>
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
          <div
            className={`${styles.progressBar} ${
              progress.color ? styles[progress.color] : ''
            }`}
            style={{ width: `${progress.value}%` }}
          />
        </div>
      )}

      {chart && <div className={styles.chart}>{chart}</div>}
    </div>
  );
};

// MetricCardGrid component for layout
export interface MetricCardGridProps {
  children: React.ReactNode;
  columns?: number;
  className?: string;
}

export const MetricCardGrid: React.FC<MetricCardGridProps> = ({
  children,
  columns = 4,
  className = '',
}) => {
  return (
    <div
      className={`${styles.grid} ${className}`}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${
          columns === 2 ? '300px' : columns === 3 ? '250px' : '200px'
        }, 1fr))`,
      }}
    >
      {children}
    </div>
  );
};

// MiniChart component for sparkline visualization
export interface MiniChartProps {
  data: number[]; // Array of values
  color?: 'primary' | 'success' | 'warning' | 'error';
  height?: number;
}

export const MiniChart: React.FC<MiniChartProps> = ({
  data,
  color = 'primary',
  height = 40,
}) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  const getColor = (index: number, total: number) => {
    // Gradient effect - darker towards the end
    const intensity = Math.floor(((index + 1) / total) * 5) * 100 + 200;
    return `var(--color-${color}-${intensity})`;
  };

  return (
    <div
      className={styles.miniChart}
      style={{ height: `${height}px` }}
      role="img"
      aria-label="Metric trend visualization"
    >
      {data.map((value, index) => {
        const percentage = range === 0 ? 100 : ((value - min) / range) * 100;
        return (
          <div
            key={index}
            className={styles.chartBar}
            style={{
              height: `${percentage}%`,
              backgroundColor: getColor(index, data.length),
            }}
          />
        );
      })}
    </div>
  );
};

export default MetricCard;
