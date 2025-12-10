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
    /** Sensor label/name */
    label: string;
    /** Current sensor value */
    value: string | number;
    /** Value unit (e.g., °C, %, kW) */
    unit?: string;
    /** Sensor status */
    status?: SensorStatus;
    /** Status badge text */
    statusText?: string;
    /** Sensor icon */
    icon?: IconType;
    /** Icon color variant */
    iconVariant?: IconColorVariant;
    /** Normal range text (for basic variant) */
    rangeText?: string;
    /** Variant type */
    variant?: SensorVariant;
    /** Sensor ID (for detailed variant) */
    sensorId?: string;
    /** Trend direction */
    trendDirection?: TrendDirection;
    /** Trend value (e.g., +8%, -5%) */
    trendValue?: string;
    /** Trend label */
    trendLabel?: string;
    /** Additional stats (for detailed variant) */
    stats?: SensorStat[];
    /** Threshold information */
    threshold?: SensorThreshold;
    /** Last updated timestamp */
    lastUpdated?: string;
    /** Loading state */
    loading?: boolean;
    /** Additional CSS class */
    className?: string;
    /** Click handler */
    onClick?: () => void;
}
declare const SensorPanel: React.FC<SensorPanelProps>;
interface SensorPanelSkeletonProps {
    variant?: SensorVariant;
    className?: string;
}
declare const SensorPanelSkeleton: React.FC<SensorPanelSkeletonProps>;
interface SensorPanelGridProps {
    children: React.ReactNode;
    variant?: 'basic' | 'compact';
    className?: string;
}
declare const SensorPanelGrid: React.FC<SensorPanelGridProps>;
interface SensorPanelEmptyStateProps {
    title?: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
    icon?: IconType;
    className?: string;
}
declare const SensorPanelEmptyState: React.FC<SensorPanelEmptyStateProps>;
export default SensorPanel;
export { SensorPanelGrid, SensorPanelEmptyState, SensorPanelSkeleton };
