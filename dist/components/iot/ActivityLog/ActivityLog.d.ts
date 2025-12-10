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
export declare const LogContainer: React.FC<LogContainerProps>;
export interface LogEntryProps {
    icon: IconType;
    level: LogLevel;
    message: string;
    details?: string;
    timestamp: string;
    onClick?: () => void;
    className?: string;
}
export declare const LogEntry: React.FC<LogEntryProps>;
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
export declare const ActivityLogItem: React.FC<ActivityLogItemProps>;
export interface TimelineContainerProps {
    children: React.ReactNode;
    className?: string;
}
export declare const TimelineContainer: React.FC<TimelineContainerProps>;
export interface LogGroupProps {
    title: string;
    icon?: IconType;
    badge?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}
export declare const LogGroup: React.FC<LogGroupProps>;
export interface GroupedLogContainerProps {
    children: React.ReactNode;
    className?: string;
}
export declare const GroupedLogContainer: React.FC<GroupedLogContainerProps>;
export interface LogStatProps {
    value: string | number;
    label: string;
    level?: LogLevel;
    className?: string;
}
export declare const LogStat: React.FC<LogStatProps>;
export interface LogStatsProps {
    children: React.ReactNode;
    columns?: number;
    className?: string;
    style?: React.CSSProperties;
}
export declare const LogStats: React.FC<LogStatsProps>;
declare const _default: {
    LogContainer: React.FC<LogContainerProps>;
    LogEntry: React.FC<LogEntryProps>;
    TimelineContainer: React.FC<TimelineContainerProps>;
    ActivityLogItem: React.FC<ActivityLogItemProps>;
    LogGroup: React.FC<LogGroupProps>;
    GroupedLogContainer: React.FC<GroupedLogContainerProps>;
    LogStat: React.FC<LogStatProps>;
    LogStats: React.FC<LogStatsProps>;
};
export default _default;
