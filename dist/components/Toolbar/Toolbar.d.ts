import React from 'react';
export interface ToolbarProps {
    children: React.ReactNode;
    size?: 'compact' | 'default' | 'comfortable';
    bulk?: boolean;
    className?: string;
}
export interface ToolbarSectionProps {
    children: React.ReactNode;
    className?: string;
}
export interface ToolbarSearchProps {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}
export interface ToolbarSelectProps {
    children: React.ReactNode;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
}
export interface ToolbarBulkCountProps {
    count: number;
    label?: string;
    className?: string;
}
declare const Toolbar: ({ children, size, bulk, className }: ToolbarProps) => import("react/jsx-runtime").JSX.Element;
declare const ToolbarSection: ({ children, className }: ToolbarSectionProps) => import("react/jsx-runtime").JSX.Element;
declare const ToolbarDivider: () => import("react/jsx-runtime").JSX.Element;
declare const ToolbarSearch: ({ placeholder, value, onChange, className }: ToolbarSearchProps) => import("react/jsx-runtime").JSX.Element;
declare const ToolbarSelect: ({ children, value, onChange, className }: ToolbarSelectProps) => import("react/jsx-runtime").JSX.Element;
declare const ToolbarBulkCount: ({ count, label, className }: ToolbarBulkCountProps) => import("react/jsx-runtime").JSX.Element;
export { Toolbar, ToolbarSection, ToolbarDivider, ToolbarSearch, ToolbarSelect, ToolbarBulkCount, };
