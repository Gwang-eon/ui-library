import React, { type ReactNode } from 'react';
import { TrendingUp, TrendingDown, ArrowUp, ArrowDown } from 'lucide-react';
import styles from './Statistic.module.css';

export interface StatisticProps {
  /** Title/label for the statistic */
  title: string;
  /** Main value to display */
  value: string | number;
  /** Optional prefix (e.g., '$', '€') */
  prefix?: ReactNode;
  /** Optional suffix (e.g., '%', '°C', 'ms') */
  suffix?: ReactNode;
  /** Optional trend configuration */
  trend?: {
    /** Direction of the trend */
    direction: 'up' | 'down';
    /** Trend value/text to display */
    value: string | number;
    /** Icon variant to use */
    icon?: 'trending' | 'arrow';
  };
  /** Optional icon configuration */
  icon?: {
    /** Icon element to display */
    element: ReactNode;
    /** Icon color variant */
    variant?: 'primary' | 'success' | 'warning' | 'error';
  };
  /** Optional description text */
  description?: string;
  /** Color variant for the value */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  /** Compact layout for smaller displays */
  compact?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * Statistic Component
 *
 * Displays numerical statistics with trend indicators and formatting.
 * Designed for dashboards, reports, and KPI displays.
 *
 * @example
 * ```tsx
 * <Statistic
 *   title="Active Devices"
 *   value={1248}
 *   trend={{ direction: 'up', value: '12.5%' }}
 * />
 * ```
 */
export const Statistic: React.FC<StatisticProps> = ({
  title,
  value,
  prefix,
  suffix,
  trend,
  icon,
  description,
  variant = 'default',
  compact = false,
  className,
}) => {
  const getTrendIcon = () => {
    if (!trend) return null;

    const iconProps = { size: 16, 'aria-hidden': true as const };

    if (trend.icon === 'arrow') {
      return trend.direction === 'up'
        ? <ArrowUp {...iconProps} />
        : <ArrowDown {...iconProps} />;
    }

    return trend.direction === 'up'
      ? <TrendingUp {...iconProps} />
      : <TrendingDown {...iconProps} />;
  };

  const statisticClasses = [
    styles.statistic,
    compact && styles.compact,
    variant !== 'default' && styles[variant],
    className,
  ].filter(Boolean).join(' ');

  const trendClasses = [
    styles.trend,
    trend && styles[`trend${trend.direction === 'up' ? 'Up' : 'Down'}`],
  ].filter(Boolean).join(' ');

  const iconClasses = [
    styles.icon,
    icon?.variant && styles[`icon${icon.variant.charAt(0).toUpperCase() + icon.variant.slice(1)}`],
  ].filter(Boolean).join(' ');

  const trendLabel = trend
    ? `${trend.direction === 'up' ? 'Increased' : 'Decreased'} by ${trend.value}`
    : '';

  return (
    <div className={statisticClasses}>
      {icon && (
        <div className={styles.header}>
          <div className={iconClasses} aria-hidden="true">
            {icon.element}
          </div>
          <div className={styles.title}>{title}</div>
        </div>
      )}

      {!icon && <div className={styles.title}>{title}</div>}

      <div className={styles.value} role="status" aria-live="polite">
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        {value}
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>

      {trend && (
        <div className={trendClasses} aria-label={trendLabel}>
          {getTrendIcon()}
          <span>{trend.value}</span>
        </div>
      )}

      {description && (
        <div className={styles.description}>{description}</div>
      )}
    </div>
  );
};

Statistic.displayName = 'Statistic';
