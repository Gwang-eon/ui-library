import React from 'react';
import type { LucideIcon } from 'lucide-react';
type IconType = LucideIcon;
export type LogLevel = 'info' | 'success' | 'warning' | 'error';
export interface LogContainerProps {
    title?: string;
    icon?: IconType;
    filters?: React.ReactNode;
    children: React.ReactNode;
    maxHeight?: number | string;
    className?: string;
}
export declare const LogContainer: React.NamedExoticComponent<LogContainerProps>;
export interface LogEntryProps {
    icon: IconType;
    level: LogLevel;
    message: string;
    details?: string;
    timestamp: string;
    onClick?: () => void;
    className?: string;
}
export declare const LogEntry: React.NamedExoticComponent<LogEntryProps>;
export interface TimelineMetaItem {
    icon: IconType;
    text: string;
}
export interface ActivityLogItemProps {
    level: LogLevel;
    title: string;
    description?: string;
    time: string;
    meta?: TimelineMetaItem[];
    className?: string;
}
export declare const ActivityLogItem: React.NamedExoticComponent<ActivityLogItemProps>;
export interface TimelineContainerProps {
    children: React.ReactNode;
    className?: string;
}
export declare const TimelineContainer: React.NamedExoticComponent<TimelineContainerProps>;
export interface LogGroupProps {
    title: string;
    icon?: IconType;
    badge?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}
export declare const LogGroup: React.NamedExoticComponent<LogGroupProps>;
export interface GroupedLogContainerProps {
    children: React.ReactNode;
    className?: string;
}
export declare const GroupedLogContainer: React.NamedExoticComponent<GroupedLogContainerProps>;
export interface LogStatProps {
    value: string | number;
    label: string;
    level?: LogLevel;
    className?: string;
}
export declare const LogStat: React.NamedExoticComponent<LogStatProps>;
export interface LogStatsProps {
    children: React.ReactNode;
    columns?: number;
    className?: string;
    style?: React.CSSProperties;
}
export declare const LogStats: React.NamedExoticComponent<LogStatsProps>;
declare const _default: {
    LogContainer: React.NamedExoticComponent<LogContainerProps>;
    LogEntry: React.NamedExoticComponent<LogEntryProps>;
    TimelineContainer: React.NamedExoticComponent<TimelineContainerProps>;
    ActivityLogItem: React.NamedExoticComponent<ActivityLogItemProps>;
    LogGroup: React.NamedExoticComponent<LogGroupProps>;
    GroupedLogContainer: React.NamedExoticComponent<GroupedLogContainerProps>;
    LogStat: React.NamedExoticComponent<LogStatProps>;
    LogStats: React.NamedExoticComponent<LogStatsProps>;
};
export default _default;
