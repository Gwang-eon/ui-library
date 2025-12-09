import type { ReactNode, MouseEvent } from 'react';
import { useState, useRef, useEffect, cloneElement, isValidElement } from 'react';
import styles from './Popconfirm.module.css';

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
export const Popconfirm = ({
  title,
  description,
  icon,
  iconType = 'warning',
  okText = 'OK',
  cancelText = 'Cancel',
  okType = 'primary',
  placement = 'bottom',
  children,
  onConfirm,
  onCancel,
  open: controlledOpen,
  onOpenChange,
  disabled = false,
  'aria-label': ariaLabel,
}: PopconfirmProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Determine if controlled or uncontrolled
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const setIsOpen = (open: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(open);
    }
    onOpenChange?.(open);
  };

  // Handle click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: Event) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        onCancel?.();
        // Return focus to trigger
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onCancel]);

  const handleTriggerClick = (e: MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    previousFocusRef.current = e.currentTarget as HTMLElement;
    setIsOpen(!isOpen);
  };

  const handleCancel = (e: MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    onCancel?.();
    // Return focus to trigger
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  };

  const handleConfirm = async (e: MouseEvent) => {
    e.stopPropagation();

    if (onConfirm) {
      setLoading(true);
      try {
        await onConfirm();
        setIsOpen(false);
        // Return focus to trigger after action
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      } catch (error) {
        console.error('Popconfirm onConfirm error:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setIsOpen(false);
    }
  };

  // Clone trigger element and add onClick
  const trigger = isValidElement(children)
    ? cloneElement(children as React.ReactElement<any>, {
        onClick: (e: MouseEvent) => {
          handleTriggerClick(e);
          // Call original onClick if it exists
          const originalOnClick = (children as any).props?.onClick;
          if (originalOnClick) {
            originalOnClick(e);
          }
        },
      })
    : children;

  const placementClass = {
    top: styles.popconfirmTop,
    bottom: '', // default
    left: styles.popconfirmLeft,
    right: styles.popconfirmRight,
  }[placement];

  const iconClass = icon ? '' : styles[`popconfirmIcon${iconType.charAt(0).toUpperCase()}${iconType.slice(1)}`];

  return (
    <div className={styles.popconfirmContainer} ref={containerRef}>
      {trigger}
      <div
        className={`${styles.popconfirm} ${placementClass} ${isOpen ? styles.popconfirmShow : ''}`}
        role="alertdialog"
        aria-modal="true"
        aria-label={ariaLabel || (typeof title === 'string' ? title : 'Confirm action')}
      >
        <div className={styles.popconfirmContent}>
          <div className={styles.popconfirmMessage}>
            {icon && <span className={`${styles.popconfirmIcon} ${iconClass}`}>{icon}</span>}
            <div>
              <div className={styles.popconfirmTitle}>{title}</div>
              {description && <div className={styles.popconfirmDescription}>{description}</div>}
            </div>
          </div>
          <div className={styles.popconfirmActions}>
            <button
              className="btn btn-sm btn-secondary"
              onClick={handleCancel}
              disabled={loading}
            >
              {cancelText}
            </button>
            <button
              className={`btn btn-sm btn-${okType}${loading ? ' btn--loading' : ''}`}
              onClick={handleConfirm}
              disabled={loading}
              autoFocus
            >
              {loading && <span className="btn__spinner" />}
              {okText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Popconfirm.displayName = 'Popconfirm';
