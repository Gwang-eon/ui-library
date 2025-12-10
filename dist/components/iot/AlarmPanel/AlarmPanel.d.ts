import React from 'react';
import type { LucideIcon } from 'lucide-react';
type IconType = LucideIcon;
export type AlarmSeverity = 'critical' | 'warning' | 'info';
export interface AlarmSummary {
    critical: number;
    warning: number;
    info: number;
}
export interface AlarmPanelProps {
    title?: string;
    summary?: AlarmSummary;
    actions?: React.ReactNode;
    filters?: React.ReactNode;
    children: React.ReactNode;
    compact?: boolean;
    viewAllLink?: string;
    onViewAll?: () => void;
    className?: string;
}
export declare const AlarmPanel: React.FC<AlarmPanelProps>;
export interface AlarmFilter {
    severity: 'all' | AlarmSeverity;
    label: string;
    count: number;
}
export interface AlarmPanelFiltersProps {
    filters: AlarmFilter[];
    activeFilter: string;
    onFilterChange: (severity: string) => void;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    searchPlaceholder?: string;
    className?: string;
}
export declare const AlarmPanelFilters: React.FC<AlarmPanelFiltersProps>;
export interface AlarmMetaItem {
    icon: IconType;
    text: string;
}
export interface AlarmItemProps {
    icon: IconType;
    severity: AlarmSeverity;
    title: string;
    description: string;
    meta?: AlarmMetaItem[];
    badge?: string;
    isNew?: boolean;
    isAcknowledged?: boolean;
    isResolved?: boolean;
    actions?: React.ReactNode;
    onClick?: () => void;
    className?: string;
}
export declare const AlarmItem: React.FC<AlarmItemProps>;
export interface AlarmItemCompactProps {
    icon: IconType;
    severity: AlarmSeverity;
    title: string;
    time: string;
    action?: React.ReactNode;
    onClick?: () => void;
    className?: string;
}
export declare const AlarmItemCompact: React.FC<AlarmItemCompactProps>;
declare const _default: {
    AlarmPanel: React.FC<AlarmPanelProps>;
    AlarmPanelFilters: React.FC<AlarmPanelFiltersProps>;
    AlarmItem: React.FC<AlarmItemProps>;
    AlarmItemCompact: React.FC<AlarmItemCompactProps>;
};
export default _default;
