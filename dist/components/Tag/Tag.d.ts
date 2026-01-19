import { default as React, ReactNode } from 'react';
export interface TagProps {
    /** Tag content */
    children: ReactNode;
    /** Color variant */
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
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
export declare const Tag: React.FC<TagProps>;
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
export declare const TagGroup: React.FC<TagGroupProps>;
