import type { ReactNode } from 'react';
export type PopconfirmPlacement = 'top' | 'bottom' | 'left' | 'right';
export type PopconfirmIconType = 'info' | 'success' | 'warning' | 'danger';
export interface PopconfirmProps {
    /** Confirmation title */
    title: ReactNode;
    /** Confirmation description */
    description?: ReactNode;
    /** Icon to display */
    icon?: ReactNode;
    /** Icon type for default styling */
    iconType?: PopconfirmIconType;
    /** Confirm button text */
    okText?: ReactNode;
    /** Cancel button text */
    cancelText?: ReactNode;
    /** Confirm button type */
    okType?: 'primary' | 'success' | 'danger' | 'warning';
    /** Placement position */
    placement?: PopconfirmPlacement;
    /** Trigger element */
    children: ReactNode;
    /** Confirm callback */
    onConfirm?: () => void | Promise<void>;
    /** Cancel callback */
    onCancel?: () => void;
    /** Open state (controlled) */
    open?: boolean;
    /** Open state change callback */
    onOpenChange?: (open: boolean) => void;
    /** Disabled state */
    disabled?: boolean;
    /** ARIA label */
    'aria-label'?: string;
}
/**
 * Popconfirm Component
 *
 * Confirmation popup for user actions with confirm/cancel options.
 * Ideal for destructive actions, critical state changes, and preventing accidental clicks.
 *
 * @example
 * ```tsx
 * <Popconfirm
 *   title="Are you sure?"
 *   description="This action cannot be undone."
 *   onConfirm={() => console.log('Confirmed')}
 * >
 *   <button className="btn btn-danger">Delete</button>
 * </Popconfirm>
 * ```
 *
 * @example
 * ```tsx
 * // With icon and custom buttons
 * <Popconfirm
 *   title="Delete device?"
 *   description="This will permanently delete the device."
 *   icon={<Trash2 />}
 *   iconType="danger"
 *   okText="Delete"
 *   cancelText="Cancel"
 *   okType="danger"
 *   onConfirm={async () => await deleteDevice()}
 * >
 *   <button className="btn btn-danger">Delete Device</button>
 * </Popconfirm>
 * ```
 */
export declare const Popconfirm: {
    ({ title, description, icon, iconType, okText, cancelText, okType, placement, children, onConfirm, onCancel, open: controlledOpen, onOpenChange, disabled, "aria-label": ariaLabel, }: PopconfirmProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
