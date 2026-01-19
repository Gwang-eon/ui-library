import { default as React } from 'react';
type IconType = React.ComponentType<{
    size?: number;
    className?: string;
    style?: React.CSSProperties;
}>;
export type TrendType = 'positive' | 'negative' | 'neutral';
export interface KpiCardProps {
    label: string;
    value: string | number;
    trend?: TrendType;
    trendValue?: string;
    trendDescription?: string;
    icon?: IconType;
    iconColor?: string;
    loading?: boolean;
    className?: string;
    onClick?: () => void;
}
declare const KpiCardSkeleton: React.NamedExoticComponent<{
    className?: string;
}>;
declare const KpiCard: React.NamedExoticComponent<KpiCardProps>;
interface KpiCardGridProps {
    children: React.ReactNode;
    columns?: 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
}
declare const KpiCardGrid: React.NamedExoticComponent<KpiCardGridProps>;
export default KpiCard;
export { KpiCardSkeleton, KpiCardGrid };
