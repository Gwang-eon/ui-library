import { default as React } from 'react';
export interface RatingProps {
    /** Current rating value (controlled) */
    value?: number;
    /** Default rating value (uncontrolled) */
    defaultValue?: number;
    /** Total number of stars */
    count?: number;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Icon type */
    icon?: 'star' | 'heart' | 'circle' | React.ReactNode;
    /** Allow half-star ratings */
    allowHalf?: boolean;
    /** Read-only mode (no interaction) */
    readOnly?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Callback when value changes */
    onChange?: (value: number) => void;
    /** Show numeric value */
    showValue?: boolean;
    /** Show review count */
    reviewCount?: number;
    /** Description text */
    description?: string;
    /** Label text */
    label?: string;
    /** Additional CSS class */
    className?: string;
    /** Accessible label for the rating group */
    ariaLabel?: string;
}
/**
 * Rating Component
 *
 * Star rating component for user feedback, reviews, and quality assessment.
 * Supports full and half-star ratings, keyboard navigation, and custom icons.
 *
 * @example
 * ```tsx
 * <Rating value={4} onChange={(val) => console.log(val)} />
 * <Rating defaultValue={3.5} allowHalf readOnly reviewCount={128} />
 * <Rating icon="heart" size="lg" />
 * ```
 */
export declare const Rating: React.FC<RatingProps>;
