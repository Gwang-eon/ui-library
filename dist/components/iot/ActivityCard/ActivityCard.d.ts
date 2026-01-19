import { default as React } from 'react';
type IconType = React.ComponentType<{
    size?: number;
    className?: string;
    style?: React.CSSProperties;
}>;
export interface ActivityItem {
    id?: string;
    icon?: IconType;
    iconColor?: string;
    iconBackground?: string;
    title: string;
    description?: string;
    time: string;
    actions?: React.ReactNode;
    onClick?: () => void;
}
export interface ActivityGroup {
    title: string;
    items: ActivityItem[];
}
export interface ActivityCardProps {
    title: string;
    badge?: React.ReactNode;
    headerAction?: React.ReactNode;
    items?: ActivityItem[];
    groups?: ActivityGroup[];
    variant?: 'default' | 'timeline' | 'compact';
    footer?: React.ReactNode;
    loading?: boolean;
    className?: string;
}
export declare const ActivityCard: React.FC<ActivityCardProps>;
export default ActivityCard;
