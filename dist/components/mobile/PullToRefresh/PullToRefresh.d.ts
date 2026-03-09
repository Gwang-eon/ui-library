import React from 'react';
export type PullToRefreshStyle = 'default' | 'compact' | 'spinner';
export interface PullToRefreshProps {
    onRefresh: () => Promise<void>;
    children: React.ReactNode;
    pullDistance?: number;
    style?: PullToRefreshStyle;
    disabled?: boolean;
    className?: string;
}
export declare const PullToRefresh: React.FC<PullToRefreshProps>;
export default PullToRefresh;
