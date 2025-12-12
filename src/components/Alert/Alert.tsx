import React from 'react';
import type { ReactNode } from 'react';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import styles from './Alert.module.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

const variantIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  onClose,
  className = '',
}) => {
  const Icon = variantIcons[variant];

  return (
    <div
      className={`${styles.alert} ${styles[`alert-${variant}`]} ${className}`}
      role="alert"
    >
      <Icon className={styles['alert-icon']} />
      <div className={styles['alert-content']}>
        {title && <div className={styles['alert-title']}>{title}</div>}
        <div>{children}</div>
      </div>
      {onClose && (
        <button
          className={styles['alert-close']}
          onClick={onClose}
          aria-label="Close alert"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};

Alert.displayName = 'Alert';
