import React from 'react';
type IconType = React.ComponentType<{
    size?: number;
    className?: string;
    style?: React.CSSProperties;
}>;
export interface MetricCardProps {
    label: string;
    value: string | number;
    icon?: IconType;
    iconColor?: string;
    change?: {
        type: 'positive' | 'negative' | 'neutral';
        text: string;
    };
    subtext?: string;
    variant?: 'default' | 'compact' | 'live' | 'alert';
    progress?: {
        value: number;
        color?: 'default' | 'warning' | 'error' | 'success';
    };
    chart?: React.ReactNode;
    comparative?: {
        label: string;
        value: string | number;
        color?: string;
    }[];
    onClick?: () => void;
    loading?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const MetricCard: React.NamedExoticComponent<MetricCardProps>;
export interface MetricCardGridProps {
    children: React.ReactNode;
    columns?: number;
    className?: string;
}
export declare const MetricCardGrid: React.NamedExoticComponent<MetricCardGridProps>;
export interface MiniChartProps {
    data: number[];
    color?: 'primary' | 'success' | 'warning' | 'error';
    height?: number;
}
export declare const MiniChart: React.NamedExoticComponent<MiniChartProps>;
export default MetricCard;
