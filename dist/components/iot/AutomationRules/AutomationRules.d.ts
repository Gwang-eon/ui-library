import { default as React } from 'react';
import { LucideIcon } from 'lucide-react';
type IconType = LucideIcon;
export interface RuleStep {
    label: string;
    content: string;
}
export interface RuleMetaItem {
    icon: IconType;
    label: string;
    value: string | React.ReactNode;
}
export interface AutomationRuleProps {
    icon: IconType;
    name: string;
    description: string;
    status: 'active' | 'inactive';
    steps: RuleStep[];
    meta?: RuleMetaItem[];
    onToggle?: (enabled: boolean) => void;
    onEdit?: () => void;
    onDuplicate?: () => void;
    onDelete?: () => void;
    className?: string;
}
export declare const AutomationRule: React.FC<AutomationRuleProps>;
declare const _default: {
    AutomationRule: React.FC<AutomationRuleProps>;
};
export default _default;
