import React from 'react';
import type { LucideIcon } from 'lucide-react';
type IconType = LucideIcon;
export type EventType = 'success' | 'warning' | 'error' | 'info' | 'default';
export interface EventTimelineProps {
    children: React.ReactNode;
    compact?: boolean;
    className?: string;
}
export declare const EventTimeline: React.FC<EventTimelineProps>;
export interface EventMetaItem {
    icon: IconType;
    text: string;
}
export interface EventItemProps {
    type: EventType;
    title: string;
    description?: string;
    time: string;
    meta?: EventMetaItem[];
    icon?: IconType;
    onClick?: () => void;
    className?: string;
}
export declare const EventItem: React.FC<EventItemProps>;
export interface EventItemCompactProps {
    type: EventType;
    title: string;
    time: string;
    onClick?: () => void;
    className?: string;
}
export declare const EventItemCompact: React.FC<EventItemCompactProps>;
export interface EventGroupHeaderProps {
    title: string;
    className?: string;
}
export declare const EventGroupHeader: React.FC<EventGroupHeaderProps>;
declare const _default: {
    EventTimeline: React.FC<EventTimelineProps>;
    EventItem: React.FC<EventItemProps>;
    EventItemCompact: React.FC<EventItemCompactProps>;
    EventGroupHeader: React.FC<EventGroupHeaderProps>;
};
export default _default;
