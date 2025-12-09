import React from 'react';
import styles from './EmptyState.module.css';

// ===== Types =====

export type EmptyStateSize = 'default' | 'compact';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  size?: EmptyStateSize;
  className?: string;
  children?: React.ReactNode;
}

// ===== EmptyState Component =====

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actions,
  size = 'default',
  className = '',
  children,
}) => {
  const emptyStateClasses = [
    styles.emptyState,
    size === 'compact' && styles.emptyStateCompact,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={emptyStateClasses}>
      {icon && <div className={styles.emptyStateIcon}>{icon}</div>}
      <h3 className={styles.emptyStateTitle}>{title}</h3>
      {description && <p className={styles.emptyStateDescription}>{description}</p>}
      {actions && <div className={styles.emptyStateActions}>{actions}</div>}
      {children}
    </div>
  );
};
