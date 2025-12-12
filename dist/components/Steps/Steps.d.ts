import type { ReactNode } from 'react';
export interface StepItem {
    /** Step title */
    title: ReactNode;
    /** Optional step description */
    description?: ReactNode;
    /** Custom icon (overrides default number) */
    icon?: ReactNode;
    /** Step status */
    status?: 'wait' | 'process' | 'finish' | 'error';
    /** Disabled state */
    disabled?: boolean;
}
export interface StepsProps {
    /** Array of step items */
    items: StepItem[];
    /** Current active step index (0-based) */
    current?: number;
    /** Steps direction */
    direction?: 'horizontal' | 'vertical';
    /** Steps size */
    size?: 'default' | 'small';
    /** Enable clickable steps */
    clickable?: boolean;
    /** Callback when step is clicked (only if clickable) */
    onChange?: (index: number) => void;
    /** Additional CSS class */
    className?: string;
}
/**
 * Steps Component
 *
 * Display progress through a sequence of steps or stages.
 * Supports horizontal and vertical layouts with different statuses.
 *
 * @example
 * ```tsx
 * <Steps
 *   current={1}
 *   items={[
 *     { title: 'Account Setup', description: 'Create your account' },
 *     { title: 'Profile Information', description: 'Fill in your details' },
 *     { title: 'Verification', description: 'Verify your identity' },
 *   ]}
 * />
 * ```
 */
export declare const Steps: {
    ({ items, current, direction, size, clickable, onChange, className, }: StepsProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
