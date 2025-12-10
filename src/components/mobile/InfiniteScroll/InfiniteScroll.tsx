import React, { useEffect, useRef, useCallback, useState } from 'react';
import styles from './InfiniteScroll.module.css';

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
export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  onLoadMore,
  hasMore,
  loading = false,
  threshold = 200,
  loader,
  endMessage,
  direction = 'down',
  useWindow = false,
  children,
  className = '',
  height,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const [isNearEnd, setIsNearEnd] = useState(false);

  const handleScroll = useCallback(() => {
    if (loadingRef.current || loading || !hasMore) return;

    let scrollTop: number;
    let scrollHeight: number;
    let clientHeight: number;

    if (useWindow) {
      scrollTop = window.scrollY || document.documentElement.scrollTop;
      scrollHeight = document.documentElement.scrollHeight;
      clientHeight = window.innerHeight;
    } else if (containerRef.current) {
      scrollTop = containerRef.current.scrollTop;
      scrollHeight = containerRef.current.scrollHeight;
      clientHeight = containerRef.current.clientHeight;
    } else {
      return;
    }

    const distanceFromEnd = direction === 'down'
      ? scrollHeight - scrollTop - clientHeight
      : scrollTop;

    const shouldLoad = distanceFromEnd < threshold;
    setIsNearEnd(shouldLoad);

    if (shouldLoad && hasMore && !loading) {
      loadingRef.current = true;
      Promise.resolve(onLoadMore()).finally(() => {
        loadingRef.current = false;
      });
    }
  }, [onLoadMore, hasMore, loading, threshold, direction, useWindow]);

  useEffect(() => {
    const target = useWindow ? window : containerRef.current;
    if (!target) return;

    const scrollHandler = () => {
      requestAnimationFrame(handleScroll);
    };

    target.addEventListener('scroll', scrollHandler, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      target.removeEventListener('scroll', scrollHandler);
    };
  }, [handleScroll, useWindow]);

  const defaultLoader = (
    <div className={styles.loader}>
      <div className={styles.spinner} />
      <span className={styles.loaderText}>Loading...</span>
    </div>
  );

  const defaultEndMessage = (
    <div className={styles.endMessage}>
      No more items
    </div>
  );

  const containerStyle: React.CSSProperties = useWindow
    ? {}
    : {
        height: typeof height === 'number' ? `${height}px` : height,
        overflowY: 'auto',
      };

  const content = (
    <>
      {direction === 'up' && loading && (loader || defaultLoader)}
      {children}
      {direction === 'down' && loading && (loader || defaultLoader)}
      {!hasMore && !loading && (endMessage !== undefined ? endMessage : defaultEndMessage)}
    </>
  );

  if (useWindow) {
    return (
      <div className={`${styles.infiniteScroll} ${className}`}>
        {content}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`${styles.infiniteScroll} ${styles.scrollContainer} ${className}`}
      style={containerStyle}
    >
      {content}
    </div>
  );
};

InfiniteScroll.displayName = 'InfiniteScroll';
