import type { ReactNode } from 'react';
import styles from './Descriptions.module.css';

export interface DescriptionsItemProps {
  /** Label text */
  label: ReactNode;
  /** Content/value */
  children: ReactNode;
  /** Span across all columns */
  span?: boolean;
  /** Custom className for the item */
  className?: string;
}

export interface DescriptionsProps {
  /** Items to display */
  children: ReactNode;
  /** Title text */
  title?: ReactNode;
  /** Actions to display in header */
  extra?: ReactNode;
  /** Show borders around items */
  bordered?: boolean;
  /** Number of columns */
  column?: 1 | 2 | 3;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Vertical layout (label above content) */
  vertical?: boolean;
  /** Custom className */
  className?: string;
}

/**
 * Descriptions Item Component
 *
 * Individual key-value pair within a Descriptions list.
 *
 * @example
 * ```tsx
 * <Descriptions.Item label="Name">
 *   John Doe
 * </Descriptions.Item>
 * ```
 */
export const DescriptionsItem = ({
  label,
  children,
  span,
  className,
}: DescriptionsItemProps) => {
  const itemClasses = [
    styles.descriptionsItem,
    span && styles.descriptionsItemSpan,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={itemClasses}>
      <span className={styles.descriptionsLabel}>{label}</span>
      <span className={styles.descriptionsContent}>{children}</span>
    </div>
  );
};

DescriptionsItem.displayName = 'Descriptions.Item';

/**
 * Descriptions Component
 *
 * Display key-value pairs in a structured format for detail pages and information display.
 * Ideal for showing device specifications, user profiles, order details, and system configurations.
 *
 * @example
 * ```tsx
 * <Descriptions title="User Information" bordered>
 *   <Descriptions.Item label="Name">John Doe</Descriptions.Item>
 *   <Descriptions.Item label="Email">john@example.com</Descriptions.Item>
 *   <Descriptions.Item label="Role">
 *     <Badge variant="primary">Admin</Badge>
 *   </Descriptions.Item>
 * </Descriptions>
 * ```
 *
 * @example
 * ```tsx
 * // Multi-column layout
 * <Descriptions column={2} bordered>
 *   <Descriptions.Item label="Order ID">#12345</Descriptions.Item>
 *   <Descriptions.Item label="Date">2025-01-15</Descriptions.Item>
 *   <Descriptions.Item label="Customer">Jane Smith</Descriptions.Item>
 *   <Descriptions.Item label="Total">$299.00</Descriptions.Item>
 * </Descriptions>
 * ```
 */
export const Descriptions = ({
  children,
  title,
  extra,
  bordered = false,
  column = 1,
  size = 'md',
  vertical = false,
  className,
}: DescriptionsProps) => {
  const containerClasses = [
    styles.descriptions,
    bordered && styles.descriptionsBordered,
    column === 2 && styles.descriptionsCol2,
    column === 3 && styles.descriptionsCol3,
    size === 'sm' && styles.descriptionsSm,
    size === 'lg' && styles.descriptionsLg,
    vertical && styles.descriptionsVertical,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      {(title || extra) && (
        <div className={styles.descriptionsHeader}>
          {title && <h3 className={styles.descriptionsTitle}>{title}</h3>}
          {extra && <div>{extra}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

Descriptions.displayName = 'Descriptions';

// Attach Item as a static property
Descriptions.Item = DescriptionsItem;
