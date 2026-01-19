import { default as React } from 'react';
import { LucideIcon } from 'lucide-react';
type IconType = LucideIcon;
export interface DeviceMetric {
    label: string;
    value: string;
    warning?: boolean;
    error?: boolean;
}
export interface DeviceListItemProps {
    icon?: IconType;
    name: string;
    status?: 'online' | 'warning' | 'offline';
    statusBadge?: React.ReactNode;
    meta?: string[];
    metrics?: DeviceMetric[];
    value?: string;
    showCheckbox?: boolean;
    checked?: boolean;
    onCheckChange?: (checked: boolean) => void;
    actions?: React.ReactNode;
    onClick?: () => void;
    clickable?: boolean;
    compact?: boolean;
    offline?: boolean;
    className?: string;
}
export declare const DeviceListItem: React.FC<DeviceListItemProps>;
export interface DeviceListContainerProps {
    children: React.ReactNode;
    spaced?: boolean;
    className?: string;
}
export declare const DeviceListContainer: React.FC<DeviceListContainerProps>;
declare const _default: {
    DeviceListItem: React.FC<DeviceListItemProps>;
    DeviceListContainer: React.FC<DeviceListContainerProps>;
};
export default _default;
