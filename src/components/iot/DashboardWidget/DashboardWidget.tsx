import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import styles from './DashboardWidget.module.css';

// Custom icon type
type IconType = React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;

// Stat Widget
export interface StatWidgetProps {
  label: string;
  value: string | number;
  icon?: IconType;
  iconColor?: string;
  iconBackground?: string;
  trend?: {
    type: 'positive' | 'negative';
    value: string;
    period?: string;
  };
  loading?: boolean;
  className?: string;
}

export const StatWidget: React.FC<StatWidgetProps> = ({
  label,
  value,
  icon: Icon,
  iconColor,
  iconBackground,
  trend,
  loading = false,
  className = '',
}) => {
  if (loading) {
    return (
      <div className={`${styles.statWidget} ${styles.loading} ${className}`}>
        <div className={styles.statHeader}>
          <div>
            <div className={styles.labelSkeleton} />
            <div className={styles.valueSkeleton} />
          </div>
          <div className={styles.iconSkeleton} />
        </div>
        <div className={styles.trendSkeleton} />
      </div>
    );
  }

  return (
    <div className={`${styles.statWidget} ${className}`}>
      <div className={styles.statHeader}>
        <div>
          <p className={styles.statLabel}>{label}</p>
          <p className={styles.statValue}>{value}</p>
        </div>
        {Icon && (
          <div
            className={styles.statIconCircle}
            style={{
              backgroundColor: iconBackground,
              color: iconColor,
            }}
          >
            <Icon size={20} />
          </div>
        )}
      </div>
      {trend && (
        <div className={styles.statChange}>
          <span className={`${styles.statTrend} ${styles[trend.type]}`}>
            {trend.type === 'positive' ? (
              <TrendingUp size={14} />
            ) : (
              <TrendingDown size={14} />
            )}
            {trend.value}
          </span>
          {trend.period && (
            <span className={styles.statPeriod}>{trend.period}</span>
          )}
        </div>
      )}
    </div>
  );
};

// Chart Widget
export interface ChartWidgetProps {
  title: string;
  subtitle?: string;
  stats?: {
    label: string;
    value: string | number;
  }[];
  chart?: React.ReactNode;
  headerAction?: React.ReactNode;
  loading?: boolean;
  className?: string;
}

export const ChartWidget: React.FC<ChartWidgetProps> = ({
  title,
  subtitle,
  stats = [],
  chart,
  headerAction,
  loading = false,
  className = '',
}) => {
  if (loading) {
    return (
      <div className={`${styles.chartWidget} ${styles.loading} ${className}`}>
        <div className={styles.widgetHeader}>
          <div className={styles.headerSkeleton} />
        </div>
        <div className={styles.widgetBody}>
          <div className={styles.chartPlaceholder}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.chartWidget} ${className}`}>
      <div className={styles.widgetHeader}>
        <div>
          <h3 className={styles.widgetTitle}>{title}</h3>
          {subtitle && <p className={styles.widgetSubtitle}>{subtitle}</p>}
        </div>
        {headerAction}
      </div>
      <div className={styles.widgetBody}>
        {stats.length > 0 && (
          <div className={styles.chartStats}>
            {stats.map((stat, index) => (
              <div key={index}>
                <p className={styles.chartStatLabel}>{stat.label}</p>
                <p className={styles.chartStatValue}>{stat.value}</p>
              </div>
            ))}
          </div>
        )}
        {chart ? (
          <div className={styles.chartContainer}>{chart}</div>
        ) : (
          <div className={styles.chartPlaceholder}>
            [Chart Placeholder]
          </div>
        )}
      </div>
    </div>
  );
};

// List Widget Item
export interface ListWidgetItem {
  id?: string;
  icon?: IconType;
  iconColor?: string;
  iconBackground?: string;
  title: string;
  meta?: string;
  badge?: React.ReactNode;
  onClick?: () => void;
}

// List Widget
export interface ListWidgetProps {
  title: string;
  items: ListWidgetItem[];
  headerAction?: React.ReactNode;
  loading?: boolean;
  className?: string;
}

export const ListWidget: React.FC<ListWidgetProps> = ({
  title,
  items,
  headerAction,
  loading = false,
  className = '',
}) => {
  if (loading) {
    return (
      <div className={`${styles.listWidget} ${styles.loading} ${className}`}>
        <div className={styles.widgetHeader}>
          <div className={styles.headerSkeleton} />
        </div>
        <div className={styles.listContainer}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={styles.listItemSkeleton}>
              <div className={styles.iconSkeleton} />
              <div className={styles.contentSkeleton}>
                <div className={styles.titleSkeleton} />
                <div className={styles.metaSkeleton} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.listWidget} ${className}`}>
      <div className={styles.widgetHeader}>
        <h3 className={styles.widgetTitle}>{title}</h3>
        {headerAction}
      </div>
      <div className={styles.listContainer}>
        {items.map((item, index) => (
          <ListItem key={item.id || index} {...item} />
        ))}
      </div>
    </div>
  );
};

const ListItem: React.FC<ListWidgetItem> = ({
  icon: Icon,
  iconColor,
  iconBackground,
  title,
  meta,
  badge,
  onClick,
}) => {
  const itemClassName = [
    styles.listItem,
    onClick && styles.clickable,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={itemClassName} onClick={onClick}>
      {Icon && (
        <div
          className={styles.listIconCircle}
          style={{
            backgroundColor: iconBackground,
            color: iconColor,
          }}
        >
          <Icon size={18} />
        </div>
      )}
      <div className={styles.listContent}>
        <h4 className={styles.listTitle}>{title}</h4>
        {meta && <p className={styles.listMeta}>{meta}</p>}
      </div>
      {badge}
    </div>
  );
};

// Status Widget Item
export interface StatusWidgetItem {
  label: string;
  value: string | number;
  color?: 'success' | 'warning' | 'error' | 'primary';
}

// Status Widget
export interface StatusWidgetProps {
  title: string;
  badge?: React.ReactNode;
  items: StatusWidgetItem[];
  columns?: number;
  loading?: boolean;
  className?: string;
}

export const StatusWidget: React.FC<StatusWidgetProps> = ({
  title,
  badge,
  items,
  columns = 2,
  loading = false,
  className = '',
}) => {
  if (loading) {
    return (
      <div className={`${styles.statusWidget} ${styles.loading} ${className}`}>
        <div className={styles.widgetHeader}>
          <div className={styles.headerSkeleton} />
        </div>
        <div
          className={styles.statusGrid}
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={styles.statusItemSkeleton}>
              <div className={styles.statusCircleSkeleton} />
              <div className={styles.statusLabelSkeleton} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.statusWidget} ${className}`}>
      <div className={styles.widgetHeader}>
        <h3 className={styles.widgetTitle}>{title}</h3>
        {badge}
      </div>
      <div
        className={styles.statusGrid}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {items.map((item, index) => (
          <StatusItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

const StatusItem: React.FC<StatusWidgetItem> = ({ label, value, color = 'primary' }) => {
  const colorMap = {
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
    primary: {
      background: 'var(--color-primary-100)',
      color: 'var(--color-primary-600)',
    },
  };

  return (
    <div className={styles.statusItem}>
      <div
        className={styles.statusValueCircle}
        style={{
          backgroundColor: colorMap[color].background,
          color: colorMap[color].color,
        }}
      >
        {value}
      </div>
      <p className={styles.statusLabel}>{label}</p>
    </div>
  );
};

// Export all widgets
export default {
  Stat: StatWidget,
  Chart: ChartWidget,
  List: ListWidget,
  Status: StatusWidget,
};
