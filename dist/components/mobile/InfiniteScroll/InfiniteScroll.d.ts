import React from 'react';
export interface InfiniteScrollProps {
    /** Callback when reaching the threshold */
    onLoadMore: () => void | Promise<void>;
    /** Whether more data is available */
    hasMore: boolean;
    /** Loading state */
    loading?: boolean;
    /** Threshold in pixels before triggering load */
    threshold?: number;
    /** Custom loading indicator */
    loader?: React.ReactNode;
    /** Custom end message */
    endMessage?: React.ReactNode;
    /** Scroll direction */
    direction?: 'down' | 'up';
    /** Use window scroll instead of container */
    useWindow?: boolean;
    /** Children to render */
    children: React.ReactNode;
    /** Additional className */
    className?: string;
    /** Scroll container height (when not using window) */
    height?: string | number;
}
/**
 * InfiniteScroll Component
 *
 * Infinite scrolling container for loading more data as user scrolls.
 * Optimized for mobile with touch-friendly behavior.
 *
 * @example
 * ```tsx
 * <InfiniteScroll
 *   onLoadMore={fetchMoreDevices}
 *   hasMore={hasNextPage}
 *   loading={isLoading}
 *   loader={<Spin />}
 * >
 *   {devices.map(device => <DeviceCard key={device.id} {...device} />)}
 * </InfiniteScroll>
 * ```
 */
export declare const InfiniteScroll: React.FC<InfiniteScrollProps>;
