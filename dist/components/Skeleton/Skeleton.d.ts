import { default as React } from 'react';
export type SkeletonVariant = 'line' | 'rect' | 'circle';
export type SkeletonAnimation = 'shimmer' | 'pulse';
export interface SkeletonProps {
    variant?: SkeletonVariant;
    width?: string | number;
    height?: string | number;
    animation?: SkeletonAnimation;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Skeleton: React.FC<SkeletonProps>;
