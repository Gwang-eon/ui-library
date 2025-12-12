import React from 'react';
import { X, ChevronRight, Bell } from 'lucide-react';
import styles from './NotificationCenter.module.css';

export interface NotificationCenterProps {
  children: React.ReactNode;
  compact?: boolean;
  className?: string;
}

export interface NotificationCenterHeaderProps {
  children: React.ReactNode;
  count?: number;
  className?: string;
}

export interface NotificationCenterBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface NotificationCenterFooterProps {
  children: React.ReactNode;
  className?: string;
}

export interface NotificationTabsProps {
  children: React.ReactNode;
  className?: string;
}

export interface NotificationTabProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface NotificationItemProps {
  children: React.ReactNode;
  unread?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  compact?: boolean;
  className?: string;
}

export interface NotificationIconProps {
  children: React.ReactNode;
  variant?: 'error' | 'warning' | 'success' | 'info';
  className?: string;
}

export interface NotificationContentProps {
  children: React.ReactNode;
  className?: string;
}

export interface NotificationTitleProps {
  children: React.ReactNode;
  compact?: boolean;
  className?: string;
}

export interface NotificationMessageProps {
  children: React.ReactNode;
  className?: string;
}

export interface NotificationTimeProps {
  children: React.ReactNode;
  compact?: boolean;
  className?: string;
}

export interface NotificationActionProps {
  onClick?: () => void;
  'aria-label'?: string;
  className?: string;
}

export interface NotificationTriggerProps {
  count?: number;
  onClick?: () => void;
  className?: string;
}

export interface NotificationDotProps {
  variant?: 'error' | 'warning' | 'success' | 'info';
  className?: string;
}

const NotificationCenter = ({
  children,
  compact = false,
  className = '',
}: NotificationCenterProps) => {
  return (
    <div className={`${styles.notificationCenter} ${compact ? styles.notificationCenterCompact : ''} ${className}`}>
      {children}
    </div>
  );
};

const NotificationCenterHeader = ({
  children,
  count,
  className = '',
}: NotificationCenterHeaderProps) => {
  return (
    <div className={`${styles.notificationCenterHeader} ${className}`}>
      {children}
      {count !== undefined && (
        <span className={styles.notificationCount}>{count}</span>
      )}
    </div>
  );
};

const NotificationCenterTitle = ({ children }: { children: React.ReactNode }) => {
  return <h3 className={styles.notificationCenterTitle}>{children}</h3>;
};

const NotificationCenterBody = ({
  children,
  className = '',
}: NotificationCenterBodyProps) => {
  return (
    <div className={`${styles.notificationCenterBody} ${className}`}>
      {children}
    </div>
  );
};

const NotificationCenterFooter = ({
  children,
  className = '',
}: NotificationCenterFooterProps) => {
  return (
    <div className={`${styles.notificationCenterFooter} ${className}`}>
      {children}
    </div>
  );
};

const NotificationTabs = ({
  children,
  className = '',
}: NotificationTabsProps) => {
  return (
    <div className={`${styles.notificationTabs} ${className}`}>
      {children}
    </div>
  );
};

const NotificationTab = ({
  children,
  active = false,
  onClick,
  className = '',
}: NotificationTabProps) => {
  return (
    <button
      className={`${styles.notificationTab} ${active ? styles.notificationTabActive : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const NotificationItem = ({
  children,
  unread = false,
  clickable = false,
  onClick,
  compact = false,
  className = '',
}: NotificationItemProps) => {
  const classes = compact
    ? `${styles.notificationItemCompact} ${unread ? styles.notificationItemUnread : ''} ${className}`
    : `${styles.notificationItem} ${unread ? styles.notificationItemUnread : ''} ${clickable ? styles.notificationItemClickable : ''} ${className}`;

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

const NotificationIcon = ({
  children,
  variant = 'info',
  className = '',
}: NotificationIconProps) => {
  const variantClass = variant === 'error' ? styles.notificationIconError :
                       variant === 'warning' ? styles.notificationIconWarning :
                       variant === 'success' ? styles.notificationIconSuccess :
                       styles.notificationIconInfo;

  return (
    <div className={`${styles.notificationIcon} ${variantClass} ${className}`}>
      {children}
    </div>
  );
};

const NotificationContent = ({
  children,
  className = '',
}: NotificationContentProps) => {
  return (
    <div className={`${styles.notificationContent} ${className}`}>
      {children}
    </div>
  );
};

const NotificationContentCompact = ({
  children,
  className = '',
}: NotificationContentProps) => {
  return (
    <div className={`${styles.notificationContentCompact} ${className}`}>
      {children}
    </div>
  );
};

const NotificationTitle = ({
  children,
  compact = false,
  className = '',
}: NotificationTitleProps) => {
  return (
    <h4 className={`${compact ? styles.notificationTitleCompact : styles.notificationTitle} ${className}`}>
      {children}
    </h4>
  );
};

const NotificationMessage = ({
  children,
  className = '',
}: NotificationMessageProps) => {
  return (
    <p className={`${styles.notificationMessage} ${className}`}>
      {children}
    </p>
  );
};

const NotificationTime = ({
  children,
  compact = false,
  className = '',
}: NotificationTimeProps) => {
  return (
    <span className={`${compact ? styles.notificationTimeCompact : styles.notificationTime} ${className}`}>
      {children}
    </span>
  );
};

const NotificationAction = ({
  onClick,
  'aria-label': ariaLabel = 'Dismiss notification',
  className = '',
}: NotificationActionProps) => {
  return (
    <button
      className={`${styles.notificationAction} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <X size={16} />
    </button>
  );
};

const NotificationArrow = () => {
  return (
    <ChevronRight className={styles.notificationArrow} size={16} />
  );
};

const NotificationTrigger = ({
  count,
  onClick,
  className = '',
}: NotificationTriggerProps) => {
  return (
    <button className={`${styles.notificationTrigger} ${className}`} onClick={onClick}>
      <Bell size={20} />
      {count !== undefined && count > 0 && (
        <span className={styles.notificationBadge}>{count}</span>
      )}
    </button>
  );
};

const NotificationDot = ({
  variant = 'info',
  className = '',
}: NotificationDotProps) => {
  const variantClass = variant === 'error' ? styles.notificationDotError :
                       variant === 'warning' ? styles.notificationDotWarning :
                       variant === 'success' ? styles.notificationDotSuccess :
                       styles.notificationDotInfo;

  return <div className={`${styles.notificationDot} ${variantClass} ${className}`} />;
};

const NotificationViewAll = ({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) => {
  return (
    <a
      href={href || '#'}
      className={styles.notificationViewAll}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export {
  NotificationCenter,
  NotificationCenterHeader,
  NotificationCenterTitle,
  NotificationCenterBody,
  NotificationCenterFooter,
  NotificationTabs,
  NotificationTab,
  NotificationItem,
  NotificationIcon,
  NotificationContent,
  NotificationContentCompact,
  NotificationTitle,
  NotificationMessage,
  NotificationTime,
  NotificationAction,
  NotificationArrow,
  NotificationTrigger,
  NotificationDot,
  NotificationViewAll,
};
