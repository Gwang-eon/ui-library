import React from 'react';
type IconType = React.ComponentType<{
    size?: number;
    className?: string;
    style?: React.CSSProperties;
}>;
export type SensorStatus = 'normal' | 'warning' | 'error' | 'ok';
export type SensorVariant = 'basic' | 'detailed' | 'compact';
export type IconColorVariant = 'error' | 'primary' | 'success' | 'warning';
export type TrendDirection = 'up' | 'down' | 'neutral';
export interface SensorStat {
    label: string;
    value: string | number;
}
export interface SensorThreshold {
    label?: string;
    status?: string;
    currentValue: number;
    maxValue: number;
    minValue?: number;
    percentage?: number;
}
export interface SensorPanelProps {
    label: string;
    value: string | number;
    unit?: string;
    status?: SensorStatus;
    statusText?: string;
    icon?: IconType;
    iconVariant?: IconColorVariant;
    rangeText?: string;
    variant?: SensorVariant;
    sensorId?: string;
    trendDirection?: TrendDirection;
    trendValue?: string;
    trendLabel?: string;
    stats?: SensorStat[];
    threshold?: SensorThreshold;
    lastUpdated?: string;
    loading?: boolean;
    className?: string;
    onClick?: () => void;
}
interface SensorPanelSkeletonProps {
    variant?: SensorVariant;
    className?: string;
}
declare const SensorPanelSkeleton: React.NamedExoticComponent<SensorPanelSkeletonProps>;
declare const SensorPanel: React.NamedExoticComponent<SensorPanelProps>;
interface SensorPanelGridProps {
    children: React.ReactNode;
    variant?: 'basic' | 'compact';
    className?: string;
}
declare const SensorPanelGrid: React.NamedExoticComponent<SensorPanelGridProps>;
interface SensorPanelEmptyStateProps {
    title?: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
    icon?: IconType;
    className?: string;
}
declare const SensorPanelEmptyState: React.NamedExoticComponent<SensorPanelEmptyStateProps>;
export default SensorPanel;
export { SensorPanelGrid, SensorPanelEmptyState, SensorPanelSkeleton };
