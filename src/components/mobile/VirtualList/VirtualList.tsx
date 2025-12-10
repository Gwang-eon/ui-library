import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import styles from './VirtualList.module.css';

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
export function VirtualList<T>({
  items,
  itemHeight,
  renderItem,
  height,
  overscan = 3,
  keyExtractor,
  onScroll,
  className = '',
  emptyContent,
  gap = 0,
}: VirtualListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const effectiveItemHeight = itemHeight + gap;
  const containerHeight = typeof height === 'number' ? height : parseInt(height, 10) || 400;

  // Calculate visible range
  const { startIndex, endIndex, visibleItems, offsetY } = useMemo(() => {
    const totalHeight = items.length * effectiveItemHeight;
    const visibleCount = Math.ceil(containerHeight / effectiveItemHeight);

    const start = Math.max(0, Math.floor(scrollTop / effectiveItemHeight) - overscan);
    const end = Math.min(items.length, start + visibleCount + overscan * 2);

    return {
      startIndex: start,
      endIndex: end,
      visibleItems: items.slice(start, end),
      offsetY: start * effectiveItemHeight,
      totalHeight,
    };
  }, [items, scrollTop, effectiveItemHeight, containerHeight, overscan]);

  const totalHeight = items.length * effectiveItemHeight;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const newScrollTop = e.currentTarget.scrollTop;
    setScrollTop(newScrollTop);
    onScroll?.(newScrollTop);
  }, [onScroll]);

  // Scroll to specific index
  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    if (containerRef.current) {
      const targetScrollTop = index * effectiveItemHeight;
      containerRef.current.scrollTo({ top: targetScrollTop, behavior });
    }
  }, [effectiveItemHeight]);

  // Expose scrollToIndex via ref
  useEffect(() => {
    if (containerRef.current) {
      (containerRef.current as any).scrollToIndex = scrollToIndex;
    }
  }, [scrollToIndex]);

  if (items.length === 0 && emptyContent) {
    return (
      <div
        className={`${styles.virtualList} ${styles.empty} ${className}`}
        style={{ height }}
      >
        {emptyContent}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`${styles.virtualList} ${className}`}
      style={{ height }}
      onScroll={handleScroll}
    >
      <div className={styles.innerContainer} style={{ height: totalHeight }}>
        <div
          className={styles.itemsContainer}
          style={{ transform: `translateY(${offsetY}px)` }}
        >
          {visibleItems.map((item, localIndex) => {
            const globalIndex = startIndex + localIndex;
            const key = keyExtractor
              ? keyExtractor(item, globalIndex)
              : globalIndex;

            return (
              <div
                key={key}
                className={styles.item}
                style={{
                  height: itemHeight,
                  marginBottom: gap > 0 ? gap : undefined,
                }}
              >
                {renderItem(item, globalIndex)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

VirtualList.displayName = 'VirtualList';
