import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import styles from './DeviceListItem.module.css';

type IconType = LucideIcon;

// ==================== Device List Item ====================

export interface DeviceMetric {
  label: string;
  value: string;
  warning?: boolean;
  error?: boolean;
}

export interface DeviceListItemProps {
  icon?: IconType;
  name: string;
  status?: 'online' | 'warning' | 'offline';
  statusBadge?: React.ReactNode;
  meta?: string[];
  metrics?: DeviceMetric[];
  value?: string;
  showCheckbox?: boolean;
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
  actions?: React.ReactNode;
  onClick?: () => void;
  clickable?: boolean;
  compact?: boolean;
  offline?: boolean;
  className?: string;
}

export const DeviceListItem: React.FC<DeviceListItemProps> = ({
  icon: Icon,
  name,
  status: _status,
  statusBadge,
  meta = [],
  metrics = [],
  value,
  showCheckbox = false,
  checked = false,
  onCheckChange,
  actions,
  onClick,
  clickable = false,
  compact = false,
  offline = false,
  className = '',
}) => {
  const itemClassName = `
    ${styles.deviceListItem}
    ${compact ? styles.compact : ''}
    ${clickable ? styles.clickable : ''}
    ${offline ? styles.offline : ''}
    ${metrics.length > 0 ? styles.withMetrics : ''}
    ${className}
  `.trim();

  const content = (
    <>
      {showCheckbox && (
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={checked}
          onChange={(e) => {
            e.stopPropagation();
            onCheckChange?.(e.target.checked);
          }}
        />
      )}

      {Icon && !compact && (
        <div className={styles.icon}>
          <Icon className={styles.iconSvg} />
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.main}>
          <h4 className={styles.name}>{name}</h4>
          {statusBadge && statusBadge}
        </div>

        {meta.length > 0 && (
          <div className={styles.meta}>
            {meta.map((item, index) => (
              <span key={index} className={styles.metaItem}>
                {item}
              </span>
            ))}
          </div>
        )}

        {metrics.length > 0 && (
          <div className={styles.metrics}>
            {metrics.map((metric, index) => (
              <div key={index} className={styles.metric}>
                <span className={styles.metricLabel}>{metric.label}</span>
                <span
                  className={`${styles.metricValue} ${
                    metric.warning ? styles.metricValueWarning : ''
                  } ${metric.error ? styles.metricValueError : ''}`}
                >
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {value && <div className={styles.value}>{value}</div>}

      {actions && <div className={styles.actions}>{actions}</div>}

      {clickable && (
        <div className={styles.arrow}>
          <ChevronRight size={16} />
        </div>
      )}
    </>
  );

  if (clickable && onClick) {
    return (
      <div className={itemClassName} onClick={onClick} role="button" tabIndex={0}>
        {content}
      </div>
    );
  }

  return <div className={itemClassName}>{content}</div>;
};

// ==================== Device List Container ====================

export interface DeviceListContainerProps {
  children: React.ReactNode;
  spaced?: boolean;
  className?: string;
}

export const DeviceListContainer: React.FC<DeviceListContainerProps> = ({
  children,
  spaced = false,
  className = '',
}) => {
  return (
    <div
      className={`${spaced ? styles.containerSpaced : styles.container} ${className}`}
    >
      {children}
    </div>
  );
};

// ==================== Main Export ====================

export default {
  DeviceListItem,
  DeviceListContainer,
};
