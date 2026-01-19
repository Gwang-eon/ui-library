import React from 'react';
export type DeviceCardVariant = 'default' | 'warning' | 'error';
export interface DeviceCardProps {
    children: React.ReactNode;
    variant?: DeviceCardVariant;
    compact?: boolean;
    onClick?: () => void;
    className?: string;
}
export interface DeviceCardHeaderProps {
    children: React.ReactNode;
    className?: string;
}
export interface DeviceCardBodyProps {
    children: React.ReactNode;
    className?: string;
}
export interface DeviceCardFooterProps {
    children: React.ReactNode;
    className?: string;
}
export interface DeviceCardIconProps {
    children: React.ReactNode;
    background?: string;
    size?: 'default' | 'sm';
    className?: string;
}
export interface DeviceCardTitleSectionProps {
    title: string;
    subtitle?: string;
    className?: string;
}
export interface DeviceCardMetricsProps {
    children: React.ReactNode;
    className?: string;
}
export interface DeviceCardMetricProps {
    label: string;
    value: string | number;
    className?: string;
}
export interface DeviceCardInfoProps {
    children: React.ReactNode;
    className?: string;
}
declare const DeviceCard: React.FC<DeviceCardProps> & {
    Header: typeof DeviceCardHeader;
    Body: typeof DeviceCardBody;
    Footer: typeof DeviceCardFooter;
    Icon: typeof DeviceCardIcon;
    TitleSection: typeof DeviceCardTitleSection;
    Metrics: typeof DeviceCardMetrics;
    Metric: typeof DeviceCardMetric;
    Info: typeof DeviceCardInfo;
};
declare const DeviceCardHeader: React.FC<DeviceCardHeaderProps>;
declare const DeviceCardBody: React.FC<DeviceCardBodyProps>;
declare const DeviceCardFooter: React.FC<DeviceCardFooterProps>;
declare const DeviceCardIcon: React.FC<DeviceCardIconProps>;
declare const DeviceCardTitleSection: React.FC<DeviceCardTitleSectionProps>;
declare const DeviceCardMetrics: React.FC<DeviceCardMetricsProps>;
declare const DeviceCardMetric: React.FC<DeviceCardMetricProps>;
declare const DeviceCardInfo: React.FC<DeviceCardInfoProps>;
export { DeviceCard, DeviceCardHeader, DeviceCardBody, DeviceCardFooter, DeviceCardIcon, DeviceCardTitleSection, DeviceCardMetrics, DeviceCardMetric, DeviceCardInfo, };
