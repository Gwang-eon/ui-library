import { default as React } from 'react';
import { LucideIcon } from 'lucide-react';
type IconType = LucideIcon;
export interface ActionSheetAction {
    icon?: IconType;
    label: string;
    onAction: () => void;
    danger?: boolean;
    disabled?: boolean;
}
export interface ActionSheetProps {
    open: boolean;
    onClose: () => void;
    actions: ActionSheetAction[];
    title?: string;
    description?: string;
    cancelLabel?: string;
    showBackdrop?: boolean;
    className?: string;
}
export declare const ActionSheet: React.FC<ActionSheetProps>;
export default ActionSheet;
