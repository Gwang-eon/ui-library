import { default as React } from 'react';
export type EmptyStateSize = 'default' | 'compact';
export interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    actions?: React.ReactNode;
    size?: EmptyStateSize;
    className?: string;
    children?: React.ReactNode;
}
export declare const EmptyState: React.FC<EmptyStateProps>;
