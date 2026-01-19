import { ReactNode } from 'react';
export interface SidemenuItem {
    /** Unique key */
    key: string;
    /** Display title */
    title: string;
    /** Icon before title */
    icon?: ReactNode;
    /** Link href */
    href?: string;
    /** Badge count or text */
    badge?: ReactNode;
    /** Nested child items */
    children?: SidemenuItem[];
    /** Disabled state */
    disabled?: boolean;
    /** Tooltip for collapsed mode */
    tooltip?: string;
}
export interface SidemenuGroup {
    /** Group header text */
    title: string;
    /** Group icon */
    icon?: ReactNode;
    /** Group items */
    items: SidemenuItem[];
}
export interface SidemenuProps {
    /** Menu items or grouped items */
    items: (SidemenuItem | SidemenuGroup)[];
    /** Active item key */
    activeKey?: string;
    /** Collapsed state (controlled) */
    collapsed?: boolean;
    /** Default collapsed state */
    defaultCollapsed?: boolean;
    /** Callback when collapsed changes */
    onCollapse?: (collapsed: boolean) => void;
    /** Callback when active item changes */
    onSelect?: (key: string) => void;
    /** Brand logo/icon */
    brandIcon?: ReactNode;
    /** Brand text */
    brandText?: string;
    /** User info */
    userInfo?: {
        name: string;
        email?: string;
        avatar?: string | ReactNode;
    };
    /** Show search */
    showSearch?: boolean;
    /** Search placeholder */
    searchPlaceholder?: string;
    /** Additional CSS classes */
    className?: string;
    /** Storage key for persistence */
    storageKey?: string;
}
/**
 * Sidemenu - Enterprise-grade side navigation
 *
 * Features:
 * - Collapsible mode (280px → 64px)
 * - Multi-level hierarchy
 * - Search functionality
 * - Group headers
 * - Persistent state
 *
 * @example
 * ```tsx
 * <Sidemenu
 *   items={[
 *     { key: 'dashboard', title: 'Dashboard', icon: <Home />, href: '#' }
 *   ]}
 *   brandText="IoT Platform"
 *   defaultCollapsed={false}
 * />
 * ```
 */
export declare const Sidemenu: ({ items, activeKey, collapsed: controlledCollapsed, defaultCollapsed, onCollapse, onSelect, brandIcon, brandText, userInfo, showSearch, searchPlaceholder, className, storageKey, }: SidemenuProps) => import("react/jsx-runtime").JSX.Element;
