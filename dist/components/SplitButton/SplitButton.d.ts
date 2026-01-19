import { ReactNode } from 'react';
export interface SplitButtonMenuItem {
    /** Menu item label */
    label?: ReactNode;
    /** Menu item icon */
    icon?: ReactNode;
    /** Click handler */
    onClick?: () => void;
    /** Danger styling */
    danger?: boolean;
    /** Divider (renders as separator) */
    divider?: boolean;
}
export interface SplitButtonProps {
    /** Primary action label */
    label?: ReactNode;
    /** Primary action icon */
    icon?: ReactNode;
    /** Primary action click handler */
    onClick?: () => void;
    /** Dropdown menu items */
    items: SplitButtonMenuItem[];
    /** Button variant */
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
    /** Button size */
    size?: 'sm' | 'md' | 'lg';
    /** Disabled state */
    disabled?: boolean;
    /** Loading state */
    loading?: boolean;
    /** ARIA label for action button */
    'aria-label'?: string;
    /** Custom className */
    className?: string;
}
/**
 * Split Button Component
 *
 * Button with primary action and dropdown menu for additional options.
 * Ideal for device control, data export, and automation rules.
 *
 * @example
 * ```tsx
 * <SplitButton
 *   label="Save"
 *   icon={<Save />}
 *   onClick={() => console.log('Save')}
 *   items={[
 *     { label: 'Save', icon: <Save />, onClick: () => {} },
 *     { label: 'Save As', icon: <FilePlus />, onClick: () => {} },
 *     { label: 'Save Template', icon: <FileCopy />, onClick: () => {} },
 *   ]}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With dividers and danger items
 * <SplitButton
 *   label="Delete"
 *   icon={<Trash2 />}
 *   variant="danger"
 *   items={[
 *     { label: 'Delete', icon: <Trash2 />, onClick: () => {} },
 *     { label: 'Archive', icon: <Archive />, onClick: () => {} },
 *     { divider: true },
 *     { label: 'Delete Permanently', icon: <Trash />, onClick: () => {}, danger: true },
 *   ]}
 * />
 * ```
 */
export declare const SplitButton: {
    ({ label, icon, onClick, items, variant, size, disabled, loading, "aria-label": ariaLabel, className, }: SplitButtonProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
