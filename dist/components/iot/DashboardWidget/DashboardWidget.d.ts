import React from 'react';
type IconType = React.ComponentType<{
    size?: number;
    className?: string;
    style?: React.CSSProperties;
}>;
export interface StatWidgetProps {
    label: string;
    value: string | number;
    icon?: IconType;
    iconColor?: string;
    iconBackground?: string;
    trend?: {
        type: 'positive' | 'negative';
        value: string;
        period?: string;
    };
    loading?: boolean;
    className?: string;
}
export declare const StatWidget: React.FC<StatWidgetProps>;
export interface ChartWidgetProps {
    title: string;
    subtitle?: string;
    stats?: {
        label: string;
        value: string | number;
    }[];
    chart?: React.ReactNode;
    headerAction?: React.ReactNode;
    loading?: boolean;
    className?: string;
}
export declare const ChartWidget: React.FC<ChartWidgetProps>;
export interface ListWidgetItem {
    id?: string;
    icon?: IconType;
    iconColor?: string;
    iconBackground?: string;
    title: string;
    meta?: string;
    badge?: React.ReactNode;
    onClick?: () => void;
}
export interface ListWidgetProps {
    title: string;
    items: ListWidgetItem[];
    headerAction?: React.ReactNode;
    loading?: boolean;
    className?: string;
}
export declare const ListWidget: React.FC<ListWidgetProps>;
export interface StatusWidgetItem {
    label: string;
    value: string | number;
    color?: 'success' | 'warning' | 'error' | 'primary';
}
export interface StatusWidgetProps {
    title: string;
    badge?: React.ReactNode;
    items: StatusWidgetItem[];
    columns?: number;
    loading?: boolean;
    className?: string;
}
export declare const StatusWidget: React.FC<StatusWidgetProps>;
declare const _default: {
    Stat: React.FC<StatWidgetProps>;
    Chart: React.FC<ChartWidgetProps>;
    List: React.FC<ListWidgetProps>;
    Status: React.FC<StatusWidgetProps>;
};
export default _default;
