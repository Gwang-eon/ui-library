import React from 'react';
import { ChevronRight } from 'lucide-react';
import styles from './StatusCard.module.css';

// Custom icon type
type IconType = React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;

export type StatusCardType = 'success' | 'warning' | 'error' | 'info';

export interface StatusItem {
  icon?: IconType;
  label: string;
  value: string | number;
  percent?: string | number;
  status?: StatusCardType;
  onClick?: () => void;
}

export interface StatusCardProps {
  title: string;
  total?: string | number;
  badge?: React.ReactNode;
  items: StatusItem[];
  variant?: 'default' | 'compact' | 'mini';
  horizontalLayout?: boolean;
  progress?: {
    value: number; // 0-100
    color?: 'default' | 'success' | 'warning' | 'error';
  };
  footer?: React.ReactNode;
  headerAction?: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  className?: string;
}

export const StatusCard: React.FC<StatusCardProps> = ({
  title,
  total,
  badge,
  items,
  variant = 'default',
  horizontalLayout = false,
  progress,
  footer,
  headerAction,
  onClick,
  loading = false,
  className = '',
}) => {
  const cardClassName = [
    styles.statusCard,
    variant === 'compact' && styles.compact,
    variant === 'mini' && styles.mini,
    onClick && styles.clickable,
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (loading) {
    return (
      <div className={cardClassName}>
        <div className={styles.header}>
          <div className={styles.titleSkeleton} />
          <div className={styles.badgeSkeleton} />
        </div>
        <div className={styles.body}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.itemSkeleton}>
              <div className={styles.iconSkeleton} />
              <div className={styles.contentSkeleton}>
                <div className={styles.labelSkeleton} />
                <div className={styles.valueSkeleton} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'mini') {
    // Mini card variant - single item with icon
    const item = items[0];
    if (!item) return null;

    const Icon = item.icon;
    const iconClassName = [
      styles.miniIcon,
      item.status && styles[`icon${item.status.charAt(0).toUpperCase() + item.status.slice(1)}`],
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={cardClassName} onClick={onClick}>
        {Icon && (
          <div className={iconClassName}>
            <Icon size={24} />
          </div>
        )}
        <div className={styles.miniContent}>
          <div className={styles.miniValue}>{item.value}</div>
          <div className={styles.miniLabel}>{item.label}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cardClassName} onClick={onClick}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.headerRight}>
          {total && <span className={styles.total}>{total}</span>}
          {badge}
          {headerAction}
        </div>
      </div>

      {variant === 'compact' && horizontalLayout ? (
        <div className={`${styles.body} ${styles.horizontal}`}>
          {items.map((item, index) => (
            <CompactStatusItem key={index} {...item} />
          ))}
        </div>
      ) : (
        <div className={styles.body}>
          {items.map((item, index) => (
            <StatusItemComponent key={index} {...item} />
          ))}
        </div>
      )}

      {progress && (
        <div className={styles.progressContainer}>
          <div
            className={`${styles.progressBar} ${
              progress.color ? styles[`progress${progress.color.charAt(0).toUpperCase() + progress.color.slice(1)}`] : ''
            }`}
            style={{ width: `${progress.value}%` }}
          />
        </div>
      )}

      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};

// StatusItem component
const StatusItemComponent: React.FC<StatusItem> = ({
  icon: Icon,
  label,
  value,
  percent,
  status = 'info',
  onClick,
}) => {
  const itemClassName = [
    styles.item,
    styles[status],
    onClick && styles.clickable,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {Icon && (
        <div className={styles.itemIcon}>
          <Icon size={20} />
        </div>
      )}
      <div className={styles.itemContent}>
        <div className={styles.itemLabel}>{label}</div>
        <div className={styles.itemValue}>{value}</div>
      </div>
      {percent !== undefined && (
        <div className={styles.itemPercent}>{percent}</div>
      )}
      {onClick && (
        <div className={styles.itemArrow}>
          <ChevronRight size={16} />
        </div>
      )}
    </>
  );

  if (onClick) {
    return (
      <div className={itemClassName} onClick={onClick} role="button" tabIndex={0}>
        {content}
      </div>
    );
  }

  return <div className={itemClassName}>{content}</div>;
};

// Compact status item for horizontal layout
const CompactStatusItem: React.FC<StatusItem> = ({ label, value, status = 'info' }) => {
  const itemClassName = [styles.compactItem, styles[status]]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={itemClassName}>
      <div className={styles.compactValue}>{value}</div>
      <div className={styles.compactLabel}>{label}</div>
    </div>
  );
};

// StatusCardGrid for layout
export interface StatusCardGridProps {
  children: React.ReactNode;
  columns?: number;
  className?: string;
}

export const StatusCardGrid: React.FC<StatusCardGridProps> = ({
  children,
  columns = 4,
  className = '',
}) => {
  return (
    <div
      className={`${styles.grid} ${className}`}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${
          columns === 2 ? '300px' : columns === 3 ? '250px' : '240px'
        }, 1fr))`,
      }}
    >
      {children}
    </div>
  );
};

export default StatusCard;
