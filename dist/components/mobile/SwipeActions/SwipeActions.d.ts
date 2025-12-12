import React from 'react';
import type { LucideIcon } from 'lucide-react';
type IconType = LucideIcon;
export type SwipeActionType = 'delete' | 'favorite' | 'archive' | 'edit';
export interface SwipeAction {
    type: SwipeActionType;
    icon: IconType;
    label: string;
    onAction: () => void;
}
export interface SwipeActionsProps {
    leftActions?: SwipeAction[];
    rightActions?: SwipeAction[];
    children: React.ReactNode;
    threshold?: number;
    disabled?: boolean;
    className?: string;
}
export declare const SwipeActions: React.FC<SwipeActionsProps>;
export default SwipeActions;
