import { default as React, ReactNode } from 'react';
export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';
export type BadgeSize = 'sm' | 'md' | 'lg';
export interface BadgeProps {
    variant?: BadgeVariant;
    size?: BadgeSize;
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Badge: React.FC<BadgeProps>;
