import { default as React } from 'react';
import { LucideIcon } from 'lucide-react';
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
}
export declare const MobileNavBar: React.FC<MobileNavBarProps>;
export default MobileNavBar;
