import React from 'react';
import type { ReactNode, AnchorHTMLAttributes } from 'react';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItemData {
  label: string;
  href?: string;
  icon?: ReactNode;
}

// Main Breadcrumb Container
export interface BreadcrumbProps {
  items?: BreadcrumbItemData[];
  separator?: ReactNode;
  children?: ReactNode;
  className?: string;
  'aria-label'?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  children,
  className = '',
  'aria-label': ariaLabel = 'Breadcrumb',
}) => {
  const breadcrumbClass = [styles.breadcrumb, className].filter(Boolean).join(' ');

  // If items prop is provided, render from items array
  if (items && items.length > 0) {
    return (
      <nav className={breadcrumbClass} aria-label={ariaLabel}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={index}>
              <div className={styles['breadcrumb-item']}>
                {item.icon && <span className={styles['breadcrumb-icon']}>{item.icon}</span>}
                {isLast || !item.href ? (
                  <span className={styles['breadcrumb-current']} aria-current={isLast ? 'page' : undefined}>
                    {item.label}
                  </span>
                ) : (
                  <a href={item.href} className={styles['breadcrumb-link']}>
                    {item.label}
                  </a>
                )}
              </div>
              {!isLast && <span className={styles['breadcrumb-separator']}>{separator}</span>}
            </React.Fragment>
          );
        })}
      </nav>
    );
  }

  // Otherwise, render children (compound component pattern)
  return (
    <nav className={breadcrumbClass} aria-label={ariaLabel}>
      {children}
    </nav>
  );
};

// BreadcrumbItem Component
export interface BreadcrumbItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  icon?: ReactNode;
  children: ReactNode;
  current?: boolean;
  className?: string;
}

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  href,
  icon,
  children,
  current = false,
  className = '',
  ...props
}) => {
  const itemClass = [styles['breadcrumb-item'], className].filter(Boolean).join(' ');

  return (
    <div className={itemClass}>
      {icon && <span className={styles['breadcrumb-icon']}>{icon}</span>}
      {current || !href ? (
        <span className={styles['breadcrumb-current']} aria-current={current ? 'page' : undefined}>
          {children}
        </span>
      ) : (
        <a href={href} className={styles['breadcrumb-link']} {...props}>
          {children}
        </a>
      )}
    </div>
  );
};

// BreadcrumbSeparator Component
export interface BreadcrumbSeparatorProps {
  children?: ReactNode;
  className?: string;
}

export const BreadcrumbSeparator: React.FC<BreadcrumbSeparatorProps> = ({
  children = '/',
  className = '',
}) => {
  const separatorClass = [styles['breadcrumb-separator'], className].filter(Boolean).join(' ');

  return <span className={separatorClass}>{children}</span>;
};

// Display names
Breadcrumb.displayName = 'Breadcrumb';
BreadcrumbItem.displayName = 'BreadcrumbItem';
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';
