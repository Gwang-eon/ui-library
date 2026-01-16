import type { ReactNode, MouseEvent } from 'react';
import { useState, useRef, useEffect, cloneElement, isValidElement } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../Button';
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
  /** Container for the popup. Defaults to document.body */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
}

// Position calculation function
function calculatePosition(
  triggerRect: DOMRect,
  container: HTMLElement,
  placement: PopconfirmPlacement
) {
  const popupWidth = 280;
  const popupHeight = 140;
  const gap = 8;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Get container offset for position correction
  const containerRect = container === document.body
    ? { top: 0, left: 0 }
    : container.getBoundingClientRect();

  let top: number;
  let left: number;

  // Calculate based on placement
  switch (placement) {
    case 'top':
      top = triggerRect.top - popupHeight - gap - containerRect.top;
      left = triggerRect.left + (triggerRect.width / 2) - (popupWidth / 2) - containerRect.left;
      break;
    case 'left':
      top = triggerRect.top + (triggerRect.height / 2) - (popupHeight / 2) - containerRect.top;
      left = triggerRect.left - popupWidth - gap - containerRect.left;
      break;
    case 'right':
      top = triggerRect.top + (triggerRect.height / 2) - (popupHeight / 2) - containerRect.top;
      left = triggerRect.right + gap - containerRect.left;
      break;
    case 'bottom':
    default:
      top = triggerRect.bottom + gap - containerRect.top;
      left = triggerRect.left + (triggerRect.width / 2) - (popupWidth / 2) - containerRect.left;
      break;
  }

  // Viewport boundary checks (using absolute positions)
  const absoluteLeft = left + containerRect.left;
  const absoluteTop = top + containerRect.top;

  // Left boundary
  if (absoluteLeft < 8) {
    left = 8 - containerRect.left;
  }

  // Right boundary
  if (absoluteLeft + popupWidth > viewportWidth - 8) {
    left = viewportWidth - popupWidth - 8 - containerRect.left;
  }

  // Bottom boundary - flip to top if needed
  if (placement === 'bottom' && absoluteTop + popupHeight > viewportHeight - 20) {
    top = triggerRect.top - popupHeight - gap - containerRect.top;
  }

  // Top boundary - flip to bottom if needed
  if (placement === 'top' && absoluteTop < 20) {
    top = triggerRect.bottom + gap - containerRect.top;
  }

  return { top, left };
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
  getPopupContainer,
}: PopconfirmProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement | null>(null);
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

  // Update position when opening
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const container = getPopupContainer
        ? getPopupContainer(triggerRef.current)
        : document.body;
      containerRef.current = container;

      const rect = triggerRef.current.getBoundingClientRect();
      setPosition(calculatePosition(rect, container, placement));
    }
  }, [isOpen, placement, getPopupContainer]);

  // Handle click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: Event) => {
      const target = event.target as Node;
      const isOutsideTrigger = triggerRef.current && !triggerRef.current.contains(target);
      const isOutsidePopup = popupRef.current && !popupRef.current.contains(target);

      if (isOutsideTrigger && isOutsidePopup) {
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
        previousFocusRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onCancel]);

  const handleTriggerClick = (e: MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    previousFocusRef.current = e.currentTarget as HTMLElement;
    setIsOpen(!isOpen);
  };

  const handleCancel = (e: MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    onCancel?.();
    previousFocusRef.current?.focus();
  };

  const handleConfirm = async (e: MouseEvent) => {
    e.stopPropagation();

    if (onConfirm) {
      setLoading(true);
      try {
        await onConfirm();
        setIsOpen(false);
        previousFocusRef.current?.focus();
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
          const originalOnClick = (children as any).props?.onClick;
          if (originalOnClick) originalOnClick(e);
        },
      })
    : children;

  const iconClass = icon ? '' : styles[`popconfirmIcon${iconType.charAt(0).toUpperCase()}${iconType.slice(1)}`];

  // Determine position style based on container
  const positionStyle = containerRef.current === document.body ? 'fixed' : 'absolute';

  // Render popup via Portal
  const popupContent = isOpen && typeof document !== 'undefined' ? createPortal(
    <div
      ref={popupRef}
      className={styles.popconfirmPortal}
      style={{
        position: positionStyle,
        top: position.top,
        left: position.left,
        zIndex: 9999,
      }}
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
          <Button variant="secondary" size="sm" onClick={handleCancel} disabled={loading}>
            {cancelText}
          </Button>
          <Button variant={okType} size="sm" onClick={handleConfirm} disabled={loading} loading={loading} autoFocus>
            {okText}
          </Button>
        </div>
      </div>
    </div>,
    containerRef.current || document.body
  ) : null;

  return (
    <>
      <div ref={triggerRef} style={{ display: 'inline-block' }}>
        {trigger}
      </div>
      {popupContent}
    </>
  );
};

Popconfirm.displayName = 'Popconfirm';
