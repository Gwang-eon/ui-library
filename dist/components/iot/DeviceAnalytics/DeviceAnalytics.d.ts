import React from 'react';
type IconType = React.ComponentType<{
    size?: number;
    className?: string;
    style?: React.CSSProperties;
}>;
export interface AnalyticsCardProps {
    icon: IconType;
    iconGradient: string;
    label: string;
    value: string | number;
    change?: {
        type: 'positive' | 'negative';
        text: string;
    };
    loading?: boolean;
    className?: string;
}
export declare const AnalyticsCard: React.FC<AnalyticsCardProps>;
export interface ChartCardProps {
    title: string;
    filters?: React.ReactNode;
    chart?: React.ReactNode;
    loading?: boolean;
    className?: string;
    children?: React.ReactNode;
}
export declare const ChartCard: React.FC<ChartCardProps>;
export interface DeviceHealthMetric {
    label: string;
    value: string;
}
export interface DeviceHealthItemProps {
    name: string;
    status: 'online' | 'offline' | 'warning';
    healthScore: number;
    healthLevel?: 'excellent' | 'good' | 'warning' | 'poor';
    metrics: DeviceHealthMetric[];
    statusBadge?: React.ReactNode;
    loading?: boolean;
    className?: string;
}
export declare const DeviceHealthItem: React.FC<DeviceHealthItemProps>;
export interface InsightItemProps {
    type: 'info' | 'success' | 'warning' | 'error';
    icon: IconType;
    title: string;
    description: string;
    actionText?: string;
    onActionClick?: () => void;
    loading?: boolean;
    className?: string;
}
export declare const InsightItem: React.FC<InsightItemProps>;
declare const _default: {
    AnalyticsCard: React.FC<AnalyticsCardProps>;
    ChartCard: React.FC<ChartCardProps>;
    DeviceHealthItem: React.FC<DeviceHealthItemProps>;
    InsightItem: React.FC<InsightItemProps>;
};
export default _default;
