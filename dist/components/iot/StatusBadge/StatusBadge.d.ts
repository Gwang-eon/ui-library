import { default as React } from 'react';
import { LucideIcon } from 'lucide-react';
type IconType = LucideIcon;
export type StatusType = 'online' | 'offline' | 'connecting' | 'disconnected' | 'active' | 'idle' | 'warning' | 'error' | 'maintenance' | 'excellent' | 'good' | 'fair' | 'poor' | 'no-data' | 'battery-full' | 'battery-high' | 'battery-medium' | 'battery-low' | 'battery-critical' | 'signal-excellent' | 'signal-good' | 'signal-fair' | 'signal-poor';
export interface StatusBadgeProps {
    status: StatusType;
    label?: string;
    showIndicator?: boolean;
    pulse?: boolean;
    icon?: IconType;
    className?: string;
}
export declare const StatusBadge: React.FC<StatusBadgeProps>;
declare const _default: {
    StatusBadge: React.FC<StatusBadgeProps>;
};
export default _default;
