import React, { type ReactNode } from 'react';
import { X } from 'lucide-react';
import styles from './Tag.module.css';

export interface TagProps {
  /** Tag content */
  children: ReactNode;
  /** Color variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'code';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the tag can be removed */
  removable?: boolean;
  /** Callback when remove button is clicked */
  onRemove?: () => void;
  /** Whether the tag is clickable */
  clickable?: boolean;
  /** Callback when tag is clicked (only for clickable tags) */
  onClick?: () => void;
  /** Optional icon to display before text */
  icon?: ReactNode;
  /** Additional CSS class */
  className?: string;
}

/**
 * Tag Component
 *
 * Compact elements for labeling, categorizing, and filtering content.
 * Useful for device types, categories, attributes, and active filters.
 *
 * @example
 * ```tsx
 * <Tag variant="primary">Temperature</Tag>
 * <Tag removable onRemove={() => console.log('removed')}>Sensor</Tag>
 * <Tag clickable onClick={() => console.log('clicked')}>Filter</Tag>
 * ```
 */
export const Tag: React.FC<TagProps> = ({
  children,
  variant = 'default',
  size = 'md',
  removable = false,
  onRemove,
  clickable = false,
  onClick,
  icon,
  className,
}) => {
  const tagClasses = [
    styles.tag,
    variant !== 'default' && styles[variant],
    size !== 'md' && styles[size],
    removable && styles.removable,
    clickable && styles.clickable,
    className,
  ].filter(Boolean).join(' ');

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.();
  };

  const Component = clickable ? 'button' : 'span';

  return (
    <Component
      className={tagClasses}
      onClick={clickable ? onClick : undefined}
      type={clickable ? 'button' : undefined}
      role={clickable ? 'button' : undefined}
    >
      {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
      {children}
      {removable && (
        <button
          className={styles.remove}
          onClick={handleRemoveClick}
          aria-label={`Remove ${children} tag`}
          type="button"
        >
          <X size={12} aria-hidden="true" />
        </button>
      )}
    </Component>
  );
};

Tag.displayName = 'Tag';

export interface TagGroupProps {
  /** Tag elements to display */
  children: ReactNode;
  /** Additional CSS class */
  className?: string;
  /** ARIA label for the group */
  ariaLabel?: string;
}

/**
 * TagGroup Component
 *
 * Container for displaying multiple tags with consistent spacing.
 *
 * @example
 * ```tsx
 * <TagGroup ariaLabel="Device tags">
 *   <Tag variant="primary">Temperature</Tag>
 *   <Tag variant="success">Online</Tag>
 *   <Tag>Building A</Tag>
 * </TagGroup>
 * ```
 */
export const TagGroup: React.FC<TagGroupProps> = ({
  children,
  className,
  ariaLabel,
}) => {
  const groupClasses = [styles.group, className].filter(Boolean).join(' ');

  return (
    <div
      className={groupClasses}
      role="list"
      aria-label={ariaLabel}
    >
      {React.Children.map(children, (child) => (
        <div role="listitem">{child}</div>
      ))}
    </div>
  );
};

TagGroup.displayName = 'TagGroup';
