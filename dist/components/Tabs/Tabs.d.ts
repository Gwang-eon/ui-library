import { default as React, ReactNode, HTMLAttributes } from 'react';
export type TabsVariant = 'line' | 'contained' | 'pills' | 'icon-bar';
export type TabsSize = 'sm' | 'md' | 'lg';
export type TabsOrientation = 'horizontal' | 'vertical';
export interface TabsProps {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    variant?: TabsVariant;
    size?: TabsSize;
    orientation?: TabsOrientation;
    children: ReactNode;
    className?: string;
}
export declare const Tabs: React.FC<TabsProps>;
export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}
export declare const TabsList: React.FC<TabsListProps>;
export interface TabProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onChange'> {
    value: string;
    children: ReactNode;
    icon?: ReactNode;
    badge?: ReactNode;
    counter?: number;
    disabled?: boolean;
    className?: string;
}
export declare const Tab: React.FC<TabProps>;
export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
    children: ReactNode;
    className?: string;
    keepMounted?: boolean;
}
export declare const TabPanel: React.FC<TabPanelProps>;
export interface TabContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}
export declare const TabContent: React.FC<TabContentProps>;
