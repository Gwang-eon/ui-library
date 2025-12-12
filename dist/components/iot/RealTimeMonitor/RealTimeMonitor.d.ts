import React from 'react';
import type { LucideIcon } from 'lucide-react';
type IconType = LucideIcon;
export interface StatusIndicatorProps {
    status: 'active' | 'inactive' | 'warning';
    label?: string;
    className?: string;
}
export declare const StatusIndicator: React.FC<StatusIndicatorProps>;
export type MetricChangeType = 'increase' | 'decrease' | 'neutral';
export interface RealtimeMetricCardProps {
    icon: IconType;
    label: string;
    value: string;
    unit?: string;
    change?: string;
    changeType?: MetricChangeType;
    iconColor?: 'primary' | 'danger' | 'warning' | 'success';
    className?: string;
}
export declare const RealtimeMetricCard: React.FC<RealtimeMetricCardProps>;
export interface StreamData {
    id: string;
    sensor: string;
    value: string;
    status: 'normal' | 'warning' | 'critical';
    timestamp: string;
    isNew?: boolean;
}
export interface DataStreamTableProps {
    data: StreamData[];
    className?: string;
}
export declare const DataStreamTable: React.FC<DataStreamTableProps>;
export interface MonitorContainerProps {
    title: string;
    status?: 'active' | 'inactive' | 'warning';
    lastUpdate?: string;
    onPause?: () => void;
    onDownload?: () => void;
    isPaused?: boolean;
    children: React.ReactNode;
    className?: string;
}
export declare const MonitorContainer: React.FC<MonitorContainerProps>;
export interface MetricGridProps {
    children: React.ReactNode;
    columns?: number;
    className?: string;
}
export declare const MetricGrid: React.FC<MetricGridProps>;
declare const _default: {
    MonitorContainer: React.FC<MonitorContainerProps>;
    StatusIndicator: React.FC<StatusIndicatorProps>;
    RealtimeMetricCard: React.FC<RealtimeMetricCardProps>;
    MetricGrid: React.FC<MetricGridProps>;
    DataStreamTable: React.FC<DataStreamTableProps>;
};
export default _default;
