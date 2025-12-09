import React, { useEffect } from 'react';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import styles from './Toast.module.css';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

export interface ToastProps {
  id?: string;
  variant?: ToastVariant;
  title?: string;
  message: string;
  duration?: number;
  onClose?: () => void;
}

const variantIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

export const Toast: React.FC<ToastProps> = ({
  variant = 'info',
  title,
  message,
  duration = 0,
  onClose,
}) => {
  const Icon = variantIcons[variant];

  useEffect(() => {
    if (duration > 0 && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className={`${styles.toast} ${styles[`toast-${variant}`]}`} role="alert">
      <Icon className={styles['toast-icon']} size={20} />
      <div className={styles['toast-content']}>
        {title && <div className={styles['toast-title']}>{title}</div>}
        <div className={styles['toast-message']}>{message}</div>
      </div>
      {onClose && (
        <button
          className={styles['toast-close']}
          onClick={onClose}
          aria-label="Close toast"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};

Toast.displayName = 'Toast';
