import type { ReactNode, CSSProperties } from 'react';
export interface AffixProps {
    /** Content to be affixed */
    children: ReactNode;
    /** Offset from top when affixed (in pixels) */
    offsetTop?: number;
    /** Offset from bottom when affixed (in pixels) */
    offsetBottom?: number;
    /** Target container ID to affix within (defaults to window) */
    target?: string;
    /** Callback when affix state changes */
    onChange?: (affixed: boolean) => void;
    /** Additional CSS classes */
    className?: string;
    /** Custom z-index for affixed element */
    zIndex?: number;
    /** Additional inline styles */
    style?: CSSProperties;
}
/**
 * Affix component - Makes an element stick to viewport or container on scroll
 *
 * Features:
 * - Window or container-based affixing
 * - Top or bottom positioning
 * - Custom offset configuration
 * - Placeholder maintains layout when affixed
 * - Smooth transitions
 * - Responsive behavior
 *
 * @example
 * ```tsx
 * <Affix offsetTop={64}>
 *   <Toolbar />
 * </Affix>
 * ```
 */
export declare const Affix: ({ children, offsetTop, offsetBottom, target, onChange, className, zIndex, style, }: AffixProps) => import("react/jsx-runtime").JSX.Element;
