import React from 'react';
import type { LucideIcon } from 'lucide-react';
type IconType = LucideIcon;
export type FABSize = 'standard' | 'mini' | 'extended';
export type FABPosition = 'bottom-right' | 'bottom-left' | 'bottom-center' | 'top-right';
export type FABColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export interface FABProps {
    icon: IconType;
    label?: string;
    size?: FABSize;
    position?: FABPosition;
    color?: FABColor;
    badge?: string | number;
    hideOnScroll?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    /** Use absolute positioning relative to parent container instead of fixed viewport positioning */
    absolute?: boolean;
}
export declare const FAB: React.FC<FABProps>;
export interface SpeedDialAction {
    icon: IconType;
    label: string;
    onClick: () => void;
}
export interface SpeedDialFABProps {
    icon: IconType;
    actions: SpeedDialAction[];
    position?: FABPosition;
    color?: FABColor;
    className?: string;
    /** Use absolute positioning relative to parent container instead of fixed viewport positioning */
    absolute?: boolean;
}
export declare const SpeedDialFAB: React.FC<SpeedDialFABProps>;
declare const _default: {
    FAB: React.FC<FABProps>;
    SpeedDialFAB: React.FC<SpeedDialFABProps>;
};
export default _default;
