import React from 'react';
import type { LucideIcon } from 'lucide-react';
type IconType = LucideIcon;
export type MobileNavBarStyle = 'top-bar' | 'background' | 'bottom-bar' | 'filled' | 'outlined' | 'minimal';
export interface MobileNavItem {
    icon: IconType;
    label: string;
    href?: string;
    badge?: number | 'dot';
    onClick?: () => void;
    'aria-label'?: string;
}
export interface MobileNavBarProps {
    items: MobileNavItem[];
    activeIndex?: number;
    onItemClick?: (index: number) => void;
    style?: MobileNavBarStyle;
    withSafeArea?: boolean;
    className?: string;
    /** Use relative positioning instead of fixed (for demos/previews) */
    relative?: boolean;
}
export declare const MobileNavBar: React.FC<MobileNavBarProps>;
export default MobileNavBar;
