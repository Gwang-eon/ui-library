import React from 'react';
export interface VirtualListProps<T> {
    /** Array of items to render */
    items: T[];
    /** Height of each item in pixels */
    itemHeight: number;
    /** Render function for each item */
    renderItem: (item: T, index: number) => React.ReactNode;
    /** Container height */
    height: number | string;
    /** Number of items to render outside visible area */
    overscan?: number;
    /** Key extractor function */
    keyExtractor?: (item: T, index: number) => string | number;
    /** Callback when scroll position changes */
    onScroll?: (scrollTop: number) => void;
    /** Custom className */
    className?: string;
    /** Empty state content */
    emptyContent?: React.ReactNode;
    /** Gap between items */
    gap?: number;
}
/**
 * VirtualList Component
 *
 * High-performance virtualized list for rendering large datasets.
 * Only renders visible items plus overscan buffer for smooth scrolling.
 *
 * @example
 * ```tsx
 * <VirtualList
 *   items={sensors}
 *   itemHeight={72}
 *   height={400}
 *   renderItem={(sensor, index) => (
 *     <SensorCard key={sensor.id} {...sensor} />
 *   )}
 * />
 * ```
 */
export declare function VirtualList<T>({ items, itemHeight, renderItem, height, overscan, keyExtractor, onScroll, className, emptyContent, gap, }: VirtualListProps<T>): import("react/jsx-runtime").JSX.Element;
export declare namespace VirtualList {
    var displayName: string;
}
