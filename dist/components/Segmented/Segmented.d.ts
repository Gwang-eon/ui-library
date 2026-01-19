import { ReactNode } from 'react';
export interface SegmentedOption {
    /** Option value */
    value: string;
    /** Option label */
    label: ReactNode;
    /** Option icon */
    icon?: ReactNode;
    /** Disabled state */
    disabled?: boolean;
}
export interface SegmentedProps {
    /** Available options */
    options: SegmentedOption[];
    /** Selected value (controlled) */
    value?: string;
    /** Default selected value (uncontrolled) */
    defaultValue?: string;
    /** Change handler */
    onChange?: (value: string) => void;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Full width */
    block?: boolean;
    /** Icon only mode */
    iconOnly?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** ARIA label */
    'aria-label'?: string;
    /** Custom className */
    className?: string;
}
/**
 * Segmented Component
 *
 * Compact single-select button group, visual alternative to radio buttons.
 * Ideal for view mode switching, time range selection, and status filtering.
 *
 * @example
 * ```tsx
 * <Segmented
 *   options={[
 *     { value: 'list', label: 'List', icon: <List /> },
 *     { value: 'grid', label: 'Grid', icon: <Grid /> },
 *     { value: 'table', label: 'Table', icon: <Table /> },
 *   ]}
 *   defaultValue="list"
 *   onChange={(value) => console.log(value)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Icon only
 * <Segmented
 *   options={[
 *     { value: 'list', icon: <List />, label: 'List view' },
 *     { value: 'grid', icon: <Grid />, label: 'Grid view' },
 *   ]}
 *   iconOnly
 *   defaultValue="list"
 * />
 * ```
 */
export declare const Segmented: {
    ({ options, value: controlledValue, defaultValue, onChange, size, block, iconOnly, disabled, "aria-label": ariaLabel, className, }: SegmentedProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
