import type { ReactNode } from 'react';
export type TreeSelectSize = 'sm' | 'md' | 'lg';
export interface TreeSelectNode {
    /** Unique value */
    value: string;
    /** Display label */
    label: string;
    /** Optional icon */
    icon?: ReactNode;
    /** Child nodes */
    children?: TreeSelectNode[];
    /** Disabled state */
    disabled?: boolean;
}
export interface TreeSelectProps {
    /** Tree data */
    data: TreeSelectNode[];
    /** Selected value(s) */
    value?: string | string[] | null;
    /** Default value (uncontrolled) */
    defaultValue?: string | string[] | null;
    /** Callback when selection changes */
    onChange?: (value: string | string[] | null) => void;
    /** Multiple selection mode */
    multiple?: boolean;
    /** Show search input */
    showSearch?: boolean;
    /** Search placeholder */
    searchPlaceholder?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Size variant */
    size?: TreeSelectSize;
    /** Disabled state */
    disabled?: boolean;
    /** Additional CSS classes */
    className?: string;
    /** Clear button */
    clearable?: boolean;
}
/**
 * TreeSelect - Select component with hierarchical tree data structure
 *
 * Features:
 * - Hierarchical tree selection
 * - Single and multiple selection modes
 * - Search functionality
 * - Expand/collapse nodes
 * - Icon support
 *
 * @example
 * ```tsx
 * <TreeSelect
 *   data={treeData}
 *   value={value}
 *   onChange={setValue}
 *   showSearch
 *   placeholder="Select location..."
 * />
 * ```
 */
export declare const TreeSelect: ({ data, value: controlledValue, defaultValue, onChange, multiple, showSearch, searchPlaceholder, placeholder, size, disabled, className, clearable, }: TreeSelectProps) => import("react/jsx-runtime").JSX.Element;
