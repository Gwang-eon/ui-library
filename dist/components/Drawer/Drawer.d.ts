import type { ReactNode } from 'react';
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
export declare const Drawer: {
    ({ open, onClose, placement, size, closeOnOverlayClick, closeOnEsc, children, className, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledby, }: DrawerProps): import("react").ReactPortal | null;
    Header: {
        ({ children, showClose, onClose, className, }: DrawerHeaderProps): import("react/jsx-runtime").JSX.Element;
        displayName: string;
    };
    Body: {
        ({ children, className }: DrawerBodyProps): import("react/jsx-runtime").JSX.Element;
        displayName: string;
    };
    Footer: {
        ({ children, className }: DrawerFooterProps): import("react/jsx-runtime").JSX.Element;
        displayName: string;
    };
    displayName: string;
};
