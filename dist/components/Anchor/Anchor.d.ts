import { ReactNode } from 'react';
export interface AnchorItem {
    /** Unique key for the anchor item */
    key: string;
    /** Display title for the anchor link */
    title: ReactNode;
    /** Target href (must start with #) */
    href: string;
    /** Optional icon before the title */
    icon?: ReactNode;
    /** Optional nested anchor items */
    children?: AnchorItem[];
}
export interface AnchorProps {
    /** Array of anchor items to display */
    items: AnchorItem[];
    /** Active anchor key (controlled mode) */
    activeKey?: string;
    /** Offset from top when scrolling to section (in pixels) */
    offsetTop?: number;
    /** Enable sticky positioning */
    sticky?: boolean;
    /** Callback when active section changes */
    onChange?: (activeKey: string) => void;
    /** Additional CSS classes */
    className?: string;
    /** Root margin for Intersection Observer (default: '-20% 0px -80% 0px') */
    rootMargin?: string;
    /** Smooth scroll behavior */
    smooth?: boolean;
}
/**
 * Anchor component - Hyperlinks to scroll on one page
 *
 * Features:
 * - Automatic scroll highlighting using Intersection Observer
 * - Smooth scroll on click
 * - Support for nested anchor links
 * - Keyboard accessible (Arrow keys, Home, End)
 * - Sticky positioning option
 *
 * @example
 * ```tsx
 * <Anchor
 *   items={[
 *     { key: 'overview', title: 'Overview', href: '#overview' },
 *     { key: 'config', title: 'Configuration', href: '#config' }
 *   ]}
 *   sticky
 *   offsetTop={80}
 * />
 * ```
 */
export declare const Anchor: ({ items, activeKey: controlledActiveKey, offsetTop, sticky, onChange, className, rootMargin, smooth, }: AnchorProps) => import("react/jsx-runtime").JSX.Element;
