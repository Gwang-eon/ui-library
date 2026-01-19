import { default as React } from 'react';
export interface BackTopProps {
    /** Scroll threshold in pixels before button appears */
    threshold?: number;
    /** Duration of scroll animation in milliseconds */
    duration?: number;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Visual variant */
    variant?: 'default' | 'primary' | 'outline';
    /** Position on screen */
    position?: 'right' | 'left';
    /** Show text label with icon */
    showText?: boolean;
    /** Text label to display */
    text?: string;
    /** Target element to scroll (defaults to window) */
    target?: () => HTMLElement | Window | null;
    /** Callback when button is clicked */
    onClick?: () => void;
    /** Additional CSS class */
    className?: string;
    /** Inline styles */
    style?: React.CSSProperties;
    /** Children (icon override) */
    children?: React.ReactNode;
}
/**
 * BackTop Component
 *
 * Button to scroll back to the top of the page when user scrolls down.
 * Appears after scrolling past a threshold and smoothly scrolls to top when clicked.
 *
 * @example
 * ```tsx
 * <BackTop />
 * <BackTop threshold={300} showText text="Top" />
 * <BackTop variant="primary" size="lg" />
 * ```
 */
export declare const BackTop: React.FC<BackTopProps>;
