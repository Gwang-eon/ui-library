import React from 'react';
type IconType = React.ComponentType<{
    size?: number;
    className?: string;
    style?: React.CSSProperties;
}>;
export type TrendType = 'positive' | 'negative' | 'neutral';
export interface KpiCardProps {
    /** KPI label/name */
    label: string;
    /** KPI value */
    value: string | number;
    /** Trend direction */
    trend?: TrendType;
    /** Trend value (e.g., "12%", "8", "+15") */
    trendValue?: string;
    /** Trend description (e.g., "vs. last month") */
    trendDescription?: string;
    /** Optional icon */
    icon?: IconType;
    /** Icon color (CSS color variable or hex) */
    iconColor?: string;
    /** Loading state */
    loading?: boolean;
    /** Additional CSS class */
    className?: string;
    /** Click handler */
    onClick?: () => void;
}
declare const KpiCard: React.FC<KpiCardProps>;
interface KpiCardSkeletonProps {
    className?: string;
}
declare const KpiCardSkeleton: React.FC<KpiCardSkeletonProps>;
interface KpiCardGridProps {
    children: React.ReactNode;
    /** Number of columns (1-6) */
    columns?: 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
}
declare const KpiCardGrid: React.FC<KpiCardGridProps>;
export default KpiCard;
export { KpiCardSkeleton, KpiCardGrid };
