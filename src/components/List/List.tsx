import React from 'react';
import { Inbox } from 'lucide-react';
import styles from './List.module.css';

// ===== Types =====

export interface ListProps {
  children: React.ReactNode;
  variant?: 'default' | 'compact' | 'divided';
  className?: string;
}

export interface ListItemProps {
  children: React.ReactNode;
  interactive?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export interface ListEmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

// ===== List Item =====

const ListItem: React.FC<ListItemProps> = ({
  children,
  interactive = false,
  onClick,
  href,
  className = '',
}) => {
  const classes = [
    styles.listItem,
    interactive && styles.listItemInteractive,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  // Render as link if href is provided
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        onKeyDown={handleKeyDown}
      >
        {children}
      </a>
    );
  }

  // Render as button if onClick is provided and no href
  if (onClick) {
    return (
      <div
        className={classes}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        {children}
      </div>
    );
  }

  // Render as plain div
  return <div className={classes}>{children}</div>;
};

// ===== List Empty State =====

const ListEmptyState: React.FC<ListEmptyStateProps> = ({
  icon = <Inbox size={48} />,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div className={`${styles.emptyState} ${className}`}>
      <div className={styles.emptyStateIcon}>{icon}</div>
      <div className={styles.emptyStateTitle}>{title}</div>
      {description && (
        <div className={styles.emptyStateDescription}>{description}</div>
      )}
      {action && <div className={styles.emptyStateAction}>{action}</div>}
    </div>
  );
};

// ===== Main List Component =====

const List: React.FC<ListProps> & {
  Item: typeof ListItem;
  EmptyState: typeof ListEmptyState;
} = ({ children, variant = 'default', className = '' }) => {
  const listClasses = [
    styles.list,
    variant === 'compact' && styles.listCompact,
    variant === 'divided' && styles.listDivided,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={listClasses}>{children}</div>;
};

// Attach sub-components
List.Item = ListItem;
List.EmptyState = ListEmptyState;

export { List };
