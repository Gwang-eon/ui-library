import type { ReactNode } from 'react';
export interface TransferItem {
    /** Unique key for the item */
    key: string;
    /** Display label */
    label: string;
    /** Optional description */
    description?: string;
    /** Disabled state */
    disabled?: boolean;
}
export interface TransferProps {
    /** All available items */
    dataSource: TransferItem[];
    /** Keys of items in target list */
    targetKeys?: string[];
    /** Default target keys (uncontrolled) */
    defaultTargetKeys?: string[];
    /** Callback when target keys change */
    onChange?: (targetKeys: string[], direction: 'left' | 'right', moveKeys: string[]) => void;
    /** Source panel title */
    sourceTitle?: string;
    /** Target panel title */
    targetTitle?: string;
    /** Show search input */
    showSearch?: boolean;
    /** Source search placeholder */
    sourceSearchPlaceholder?: string;
    /** Target search placeholder */
    targetSearchPlaceholder?: string;
    /** Show select all */
    showSelectAll?: boolean;
    /** Compact mode */
    compact?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Empty text */
    emptyText?: string;
    /** Additional CSS classes */
    className?: string;
    /** Render custom list item */
    render?: (item: TransferItem) => ReactNode;
}
/**
 * Transfer - Dual list box component for moving items between two lists
 *
 * Features:
 * - Dual list with source and target panels
 * - Search functionality
 * - Select all checkbox
 * - Move selected/all controls
 * - Empty state
 *
 * @example
 * ```tsx
 * <Transfer
 *   dataSource={items}
 *   targetKeys={targetKeys}
 *   onChange={(keys) => setTargetKeys(keys)}
 *   sourceTitle="Available"
 *   targetTitle="Selected"
 *   showSearch
 * />
 * ```
 */
export declare const Transfer: ({ dataSource, targetKeys: controlledTargetKeys, defaultTargetKeys, onChange, sourceTitle, targetTitle, showSearch, sourceSearchPlaceholder, targetSearchPlaceholder, showSelectAll, compact, disabled, emptyText, className, render, }: TransferProps) => import("react/jsx-runtime").JSX.Element;
