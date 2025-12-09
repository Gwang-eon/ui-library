import { useEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import styles from './Drawer.module.css';

export interface DrawerProps {
  /** Whether the drawer is open */
  open: boolean;
  /** Callback when drawer should close */
  onClose: () => void;
  /** Drawer placement */
  placement?: 'left' | 'right' | 'top' | 'bottom';
  /** Drawer size */
  size?: 'sm' | 'md' | 'lg';
  /** Close drawer when clicking overlay */
  closeOnOverlayClick?: boolean;
  /** Close drawer when pressing Escape */
  closeOnEsc?: boolean;
  /** Drawer content */
  children: ReactNode;
  /** Additional CSS class */
  className?: string;
  /** ARIA label for the drawer */
  'aria-label'?: string;
  /** ID of element that labels the drawer */
  'aria-labelledby'?: string;
}

export interface DrawerHeaderProps {
  /** Header content */
  children: ReactNode;
  /** Show close button */
  showClose?: boolean;
  /** Callback when close button is clicked */
  onClose?: () => void;
  /** Additional CSS class */
  className?: string;
}

export interface DrawerBodyProps {
  /** Body content */
  children: ReactNode;
  /** Additional CSS class */
  className?: string;
}

export interface DrawerFooterProps {
  /** Footer content */
  children: ReactNode;
  /** Additional CSS class */
  className?: string;
}

/**
 * Drawer Component
 *
 * Slide-in panel for navigation, filters, or additional content.
 * Supports four placements (left, right, top, bottom) and three sizes.
 *
 * @example
 * ```tsx
 * <Drawer open={isOpen} onClose={() => setIsOpen(false)} placement="right">
 *   <Drawer.Header>Filters</Drawer.Header>
 *   <Drawer.Body>
 *     <p>Filter content here</p>
 *   </Drawer.Body>
 *   <Drawer.Footer>
 *     <Button onClick={() => setIsOpen(false)}>Apply</Button>
 *   </Drawer.Footer>
 * </Drawer>
 * ```
 */
export const Drawer = ({
  open,
  onClose,
  placement = 'right',
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  children,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
}: DrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle overlay click
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        onClose();
      }
    },
    [closeOnOverlayClick, onClose]
  );

  // Handle Escape key
  useEffect(() => {
    if (!open || !closeOnEsc) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, closeOnEsc, onClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [open]);

  // Focus management
  useEffect(() => {
    if (open && drawerRef.current) {
      // Store the previously focused element
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Focus the first focusable element in the drawer
      const focusableElements = drawerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements[0] as HTMLElement;
      if (firstFocusable) {
        firstFocusable.focus();
      }
    } else if (!open && previousActiveElement.current) {
      // Return focus to the trigger element
      previousActiveElement.current.focus();
      previousActiveElement.current = null;
    }
  }, [open]);

  // Focus trap
  useEffect(() => {
    if (!open || !drawerRef.current) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !drawerRef.current) return;

      const focusableElements = Array.from(
        drawerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ) as HTMLElement[];

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [open]);

  if (!open) return null;

  const containerClasses = [
    styles.drawer,
    styles[`drawer-${placement}`],
    size !== 'md' && styles[`drawer-${size}`],
    open && styles.drawerOpen,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const drawerContent = (
    <div className={containerClasses}>
      <div className={styles.drawerOverlay} onClick={handleOverlayClick} />
      <div
        ref={drawerRef}
        className={styles.drawerContent}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(drawerContent, document.body);
};

/**
 * Drawer Header Component
 *
 * Contains the drawer title and close button.
 */
const DrawerHeader = ({
  children,
  showClose = true,
  onClose,
  className,
}: DrawerHeaderProps) => {
  const headerClasses = [styles.drawerHeader, className].filter(Boolean).join(' ');

  return (
    <div className={headerClasses}>
      <div className={styles.drawerTitle}>{children}</div>
      {showClose && onClose && (
        <button
          className={styles.drawerClose}
          onClick={onClose}
          aria-label="Close drawer"
          type="button"
        >
          <X />
        </button>
      )}
    </div>
  );
};

/**
 * Drawer Body Component
 *
 * Contains the main drawer content with scrolling support.
 */
const DrawerBody = ({ children, className }: DrawerBodyProps) => {
  const bodyClasses = [styles.drawerBody, className].filter(Boolean).join(' ');

  return <div className={bodyClasses}>{children}</div>;
};

/**
 * Drawer Footer Component
 *
 * Contains action buttons or additional controls.
 */
const DrawerFooter = ({ children, className }: DrawerFooterProps) => {
  const footerClasses = [styles.drawerFooter, className].filter(Boolean).join(' ');

  return <div className={footerClasses}>{children}</div>;
};

Drawer.Header = DrawerHeader;
Drawer.Body = DrawerBody;
Drawer.Footer = DrawerFooter;
Drawer.displayName = 'Drawer';
DrawerHeader.displayName = 'Drawer.Header';
DrawerBody.displayName = 'Drawer.Body';
DrawerFooter.displayName = 'Drawer.Footer';
