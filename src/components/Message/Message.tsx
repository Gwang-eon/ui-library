import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, Loader2, X } from 'lucide-react';
import styles from './Message.module.css';

export type MessageType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface MessageProps {
  /** Type of message */
  type: MessageType;
  /** Message title */
  title: string;
  /** Optional description text */
  description?: string;
  /** Show close button */
  closable?: boolean;
  /** Callback when close button is clicked */
  onClose?: () => void;
  /** Additional CSS class */
  className?: string;
  /** Control visibility (for animations) */
  visible?: boolean;
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
  loading: Loader2,
};

/**
 * Message - Global message notification
 *
 * Display global messages as feedback in response to user operations
 * at the top of the page.
 */
export const Message: React.FC<MessageProps> = ({
  type,
  title,
  description,
  closable = true,
  onClose,
  className = '',
  visible = true,
}) => {
  const Icon = iconMap[type];

  const messageClasses = [
    styles.message,
    styles[`message-${type}`],
    visible && styles['message-visible'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={messageClasses}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className={styles['message-icon']}>
        <Icon />
      </div>

      <div className={styles['message-content']}>
        <div className={styles['message-title']}>{title}</div>
        {description && (
          <div className={styles['message-description']}>{description}</div>
        )}
      </div>

      {closable && (
        <button
          className={styles['message-close']}
          onClick={onClose}
          aria-label="Close message"
        >
          <X />
        </button>
      )}
    </div>
  );
};

Message.displayName = 'Message';
