import { default as React } from 'react';
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
    devices: Device[];
    view?: 'grid' | 'list' | 'compact';
    loading?: boolean;
    emptyMessage?: string;
    emptyDescription?: string;
    onEmptyAction?: () => void;
    emptyActionLabel?: string;
    onDeviceClick?: (device: Device) => void;
    onPrimaryAction?: (device: Device) => void;
    primaryActionLabel?: string;
    onSecondaryAction?: (device: Device) => void;
    secondaryActionLabel?: string;
    onMoreActions?: (device: Device) => void;
    className?: string;
}
declare const LoadingSkeleton: React.MemoExoticComponent<() => import("react/jsx-runtime").JSX.Element>;
declare const ListLoadingSkeleton: React.MemoExoticComponent<() => import("react/jsx-runtime").JSX.Element>;
declare const CompactLoadingSkeleton: React.MemoExoticComponent<() => import("react/jsx-runtime").JSX.Element>;
interface GridCardProps {
    device: Device;
    onClick?: (device: Device) => void;
}
declare const GridCard: React.NamedExoticComponent<GridCardProps>;
interface ListItemProps {
    device: Device;
    onPrimaryAction?: (device: Device) => void;
    primaryActionLabel?: string;
    onSecondaryAction?: (device: Device) => void;
    secondaryActionLabel?: string;
}
declare const ListItem: React.NamedExoticComponent<ListItemProps>;
interface CompactCardProps {
    device: Device;
    onMoreActions?: (device: Device) => void;
}
declare const CompactCard: React.NamedExoticComponent<CompactCardProps>;
declare const DeviceList: React.NamedExoticComponent<DeviceListProps>;
export default DeviceList;
export { GridCard, ListItem, CompactCard, LoadingSkeleton, ListLoadingSkeleton, CompactLoadingSkeleton, };
