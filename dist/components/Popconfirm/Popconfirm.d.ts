import { ReactNode } from 'react';
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
    /** Container for the popup. Defaults to document.body */
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
}
/**
 * Popconfirm Component
 *
 * Confirmation popup for user actions with confirm/cancel options.
 * Uses createPortal to render popup outside of parent DOM hierarchy,
 * avoiding overflow and transform issues.
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
 * // With custom container (for scroll scenarios)
 * <Popconfirm
 *   title="Delete item?"
 *   getPopupContainer={(trigger) => trigger.parentElement!}
 *   onConfirm={handleDelete}
 * >
 *   <Button>Delete</Button>
 * </Popconfirm>
 * ```
 */
export declare const Popconfirm: {
    ({ title, description, icon, iconType, okText, cancelText, okType, placement, children, onConfirm, onCancel, open: controlledOpen, onOpenChange, disabled, "aria-label": ariaLabel, getPopupContainer, }: PopconfirmProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
