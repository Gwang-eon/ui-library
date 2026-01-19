import { default as React } from 'react';
import { LucideIcon } from 'lucide-react';
type IconType = LucideIcon;
export type MarkerStatus = 'online' | 'warning' | 'offline';
export interface MapMarkerProps {
    icon: IconType;
    status: MarkerStatus;
    position: {
        top: string;
        left: string;
    };
    onClick?: () => void;
    className?: string;
}
export declare const MapMarker: React.FC<MapMarkerProps>;
export interface DeviceInfoItem {
    label: string;
    value: string;
}
export interface DeviceInfoPopupProps {
    deviceId: string;
    deviceName: string;
    status: 'online' | 'warning' | 'offline';
    location?: string;
    info?: DeviceInfoItem[];
    onViewDetails?: () => void;
    onClose?: () => void;
    position?: {
        top?: string;
        left?: string;
        bottom?: string;
        right?: string;
    };
    className?: string;
}
export declare const DeviceInfoPopup: React.FC<DeviceInfoPopupProps>;
export interface LegendItem {
    color: string;
    label: string;
}
export interface MapLegendProps {
    items: LegendItem[];
    className?: string;
}
export declare const MapLegend: React.FC<MapLegendProps>;
export interface HeatmapLegendProps {
    title: string;
    minLabel: string;
    maxLabel: string;
    gradient: string;
    className?: string;
}
export declare const HeatmapLegend: React.FC<HeatmapLegendProps>;
export interface MapContainerProps {
    title?: string;
    height?: string;
    controls?: React.ReactNode;
    footer?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}
export declare const MapContainer: React.FC<MapContainerProps>;
export interface MapPlaceholderProps {
    icon?: IconType;
    message?: string;
    gradient?: string;
    className?: string;
    children?: React.ReactNode;
}
export declare const MapPlaceholder: React.FC<MapPlaceholderProps>;
declare const _default: {
    MapContainer: React.FC<MapContainerProps>;
    MapMarker: React.FC<MapMarkerProps>;
    DeviceInfoPopup: React.FC<DeviceInfoPopupProps>;
    MapLegend: React.FC<MapLegendProps>;
    HeatmapLegend: React.FC<HeatmapLegendProps>;
    MapPlaceholder: React.FC<MapPlaceholderProps>;
};
export default _default;
