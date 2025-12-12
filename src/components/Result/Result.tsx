import React from 'react';
import type { ReactNode } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import styles from './Result.module.css';

export interface ResultExtraItem {
  label: string;
  value: ReactNode;
}

export interface ResultProps {
  /** Status variant */
  status?: 'success' | 'error' | 'warning' | 'info';
  /** Title text */
  title: ReactNode;
  /** Description text */
  description?: ReactNode;
  /** Custom icon (overrides default status icon) */
  icon?: ReactNode;
  /** Extra information items */
  extra?: ResultExtraItem[] | ReactNode;
  /** Action buttons */
  actions?: ReactNode;
  /** Compact size */
  compact?: boolean;
  /** Additional CSS class */
  className?: string;
}

const DEFAULT_ICONS = {
  success: <CheckCircle />,
  error: <XCircle />,
  warning: <AlertTriangle />,
  info: <Info />,
};

const ICON_LABELS = {
  success: 'Success status',
  error: 'Error indicator',
  warning: 'Warning indicator',
  info: 'Information',
};

/**
 * Result Component
 *
 * Used to provide feedback on the result of a task or process.
 * Displays success, error, warning, or info status with icon, title, description, and actions.
 *
 * @example
 * ```tsx
 * <Result
 *   status="success"
 *   title="Payment Successful"
 *   description="Your order has been placed successfully."
 *   actions={<Button>View Order</Button>}
 * />
 * ```
 */
export const Result: React.FC<ResultProps> = ({
  status,
  title,
  description,
  icon,
  extra,
  actions,
  compact = false,
  className,
}) => {
  const displayIcon = icon || (status ? DEFAULT_ICONS[status] : null);

  // Determine ARIA role and live region based on status
  const ariaRole = status === 'error' ? 'alert' : 'status';
  const ariaLive = status === 'error' ? 'assertive' : 'polite';

  const containerClasses = [
    styles.result,
    status && styles[status],
    compact && styles.compact,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderExtra = () => {
    if (!extra) return null;

    // If extra is an array of ResultExtraItem
    if (Array.isArray(extra)) {
      return (
        <div className={styles.extra}>
          {extra.map((item, index) => (
            <div key={index} className={styles.infoItem}>
              <span className={styles.infoLabel}>{item.label}</span>
              <span className={styles.infoValue}>{item.value}</span>
            </div>
          ))}
        </div>
      );
    }

    // If extra is custom ReactNode
    return <div className={styles.extra}>{extra}</div>;
  };

  return (
    <div
      className={containerClasses}
      role={ariaRole}
      aria-live={ariaLive}
    >
      {displayIcon && (
        <div
          className={styles.icon}
          aria-label={status ? ICON_LABELS[status] : undefined}
          aria-hidden={!status}
        >
          {displayIcon}
        </div>
      )}

      <h3 className={styles.title}>{title}</h3>

      {description && <p className={styles.description}>{description}</p>}

      {renderExtra()}

      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
};

Result.displayName = 'Result';
