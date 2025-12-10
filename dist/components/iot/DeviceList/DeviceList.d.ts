import React from 'react';
type IconType = React.ComponentType<{
    size?: number;
    className?: string;
    style?: React.CSSProperties;
}>;
export type DeviceStatus = 'online' | 'offline' | 'warning' | 'error';
export interface DeviceStat {
    label: string;
    value: string | number;
}
export interface DeviceMetaItem {
    icon?: IconType;
    label: string;
}
export interface Device {
    id: string;
    name: string;
    type: string;
    status: DeviceStatus;
    icon?: IconType;
    iconGradient?: 'primary' | 'warning' | 'success' | 'error';
    stats?: DeviceStat[];
    meta?: DeviceMetaItem[];
}
export interface DeviceListProps {
    /** Array of devices to display */
    devices: Device[];
    /** View mode */
    view?: 'grid' | 'list' | 'compact';
    /** Loading state */
    loading?: boolean;
    /** Empty state message */
    emptyMessage?: string;
    /** Empty state description */
    emptyDescription?: string;
    /** Empty state action */
    onEmptyAction?: () => void;
    /** Empty state action label */
    emptyActionLabel?: string;
    /** Callback when device is clicked */
    onDeviceClick?: (device: Device) => void;
    /** Callback for primary action (configure/settings) */
    onPrimaryAction?: (device: Device) => void;
    /** Primary action label */
    primaryActionLabel?: string;
    /** Callback for secondary action (view/details) */
    onSecondaryAction?: (device: Device) => void;
    /** Secondary action label */
    secondaryActionLabel?: string;
    /** Callback for more actions */
    onMoreActions?: (device: Device) => void;
    /** Additional CSS class */
    className?: string;
}
declare const DeviceList: React.FC<DeviceListProps>;
interface GridCardProps {
    device: Device;
    onClick?: (device: Device) => void;
}
declare const GridCard: React.FC<GridCardProps>;
interface ListItemProps {
    device: Device;
    onPrimaryAction?: (device: Device) => void;
    primaryActionLabel?: string;
    onSecondaryAction?: (device: Device) => void;
    secondaryActionLabel?: string;
}
declare const ListItem: React.FC<ListItemProps>;
interface CompactCardProps {
    device: Device;
    onMoreActions?: (device: Device) => void;
}
declare const CompactCard: React.FC<CompactCardProps>;
declare const LoadingSkeleton: React.FC;
declare const ListLoadingSkeleton: React.FC;
declare const CompactLoadingSkeleton: React.FC;
export default DeviceList;
export { GridCard, ListItem, CompactCard, LoadingSkeleton, ListLoadingSkeleton, CompactLoadingSkeleton, };
