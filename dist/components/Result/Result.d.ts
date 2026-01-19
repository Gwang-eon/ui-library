import React from 'react';
import type { ReactNode } from 'react';
export interface ResultExtraItem {
    label: string;
    value: ReactNode;
}
export interface ResultProps {
    /** Status variant */
    status?: 'success' | 'error' | 'warning' | 'info';
    /** Title text */
    title: ReactNode;
    /** Description text */
    description?: ReactNode;
    /** Custom icon (overrides default status icon) */
    icon?: ReactNode;
    /** Extra information items */
    extra?: ResultExtraItem[] | ReactNode;
    /** Action buttons */
    actions?: ReactNode;
    /** Compact size */
    compact?: boolean;
    /** Additional CSS class */
    className?: string;
}
/**
 * Result Component
 *
 * Used to provide feedback on the result of a task or process.
 * Displays success, error, warning, or info status with icon, title, description, and actions.
 *
 * @example
 * ```tsx
 * <Result
 *   status="success"
 *   title="Payment Successful"
 *   description="Your order has been placed successfully."
 *   actions={<Button>View Order</Button>}
 * />
 * ```
 */
export declare const Result: React.FC<ResultProps>;
