import React from 'react';
type IconType = React.ComponentType<{
    size?: number;
    className?: string;
    style?: React.CSSProperties;
}>;
export type StatusCardType = 'success' | 'warning' | 'error' | 'info';
export interface StatusItem {
    icon?: IconType;
    label: string;
    value: string | number;
    percent?: string | number;
    status?: StatusCardType;
    onClick?: () => void;
}
export interface StatusCardProps {
    title: string;
    total?: string | number;
    badge?: React.ReactNode;
    items: StatusItem[];
    variant?: 'default' | 'compact' | 'mini';
    horizontalLayout?: boolean;
    progress?: {
        value: number;
        color?: 'default' | 'success' | 'warning' | 'error';
    };
    footer?: React.ReactNode;
    headerAction?: React.ReactNode;
    onClick?: () => void;
    loading?: boolean;
    className?: string;
}
export declare const StatusCard: React.NamedExoticComponent<StatusCardProps>;
export interface StatusCardGridProps {
    children: React.ReactNode;
    columns?: number;
    className?: string;
}
export declare const StatusCardGrid: React.NamedExoticComponent<StatusCardGridProps>;
export default StatusCard;
