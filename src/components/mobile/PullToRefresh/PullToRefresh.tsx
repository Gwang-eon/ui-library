import React, { useRef, useState, useEffect } from 'react';
import { ArrowDown, RefreshCw } from 'lucide-react';
import styles from './PullToRefresh.module.css';

// ==================== Pull to Refresh ====================

export type PullToRefreshStyle = 'default' | 'compact' | 'spinner';

export interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  pullDistance?: number;
  style?: PullToRefreshStyle;
  disabled?: boolean;
  className?: string;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  children,
  pullDistance = 80,
  style = 'default',
  disabled = false,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef<number>(0);
  const currentYRef = useRef<number>(0);
  const [pullState, setPullState] = useState<'idle' | 'pulling' | 'release' | 'refreshing'>('idle');
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || disabled) return;

    let isPulling = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (container.scrollTop === 0 && pullState === 'idle') {
        startYRef.current = e.touches[0].clientY;
        isPulling = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling) return;

      currentYRef.current = e.touches[0].clientY;
      const deltaY = currentYRef.current - startYRef.current;

      if (deltaY > 0) {
        e.preventDefault();
        // Apply resistance curve
        const resistance = 0.5;
        const translate = Math.min(deltaY * resistance, pullDistance * 1.5);
        setTranslateY(translate);

        if (translate >= pullDistance) {
          setPullState('release');
        } else {
          setPullState('pulling');
        }
      }
    };

    const handleTouchEnd = async () => {
      if (!isPulling) return;
      isPulling = false;

      if (translateY >= pullDistance) {
        setPullState('refreshing');
        setTranslateY(pullDistance);

        try {
          await onRefresh();
        } catch (error) {
          console.error('Refresh error:', error);
        } finally {
          setPullState('idle');
          setTranslateY(0);
        }
      } else {
        setPullState('idle');
        setTranslateY(0);
      }
    };

    // Mouse events for desktop testing
    let isMousePulling = false;

    const handleMouseDown = (e: MouseEvent) => {
      if (container.scrollTop === 0 && pullState === 'idle') {
        startYRef.current = e.clientY;
        isMousePulling = true;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMousePulling) return;

      currentYRef.current = e.clientY;
      const deltaY = currentYRef.current - startYRef.current;

      if (deltaY > 0) {
        e.preventDefault();
        const resistance = 0.5;
        const translate = Math.min(deltaY * resistance, pullDistance * 1.5);
        setTranslateY(translate);

        if (translate >= pullDistance) {
          setPullState('release');
        } else {
          setPullState('pulling');
        }
      }
    };

    const handleMouseUp = async () => {
      if (!isMousePulling) return;
      isMousePulling = false;

      if (translateY >= pullDistance) {
        setPullState('refreshing');
        setTranslateY(pullDistance);

        try {
          await onRefresh();
        } catch (error) {
          console.error('Refresh error:', error);
        } finally {
          setPullState('idle');
          setTranslateY(0);
        }
      } else {
        setPullState('idle');
        setTranslateY(0);
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);

      container.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [disabled, onRefresh, pullDistance, pullState, translateY]);

  const containerClassName = `${styles.pullToRefresh} ${className}`.trim();

  const contentClassName = `
    ${styles.pullToRefreshContent}
    ${pullState === 'pulling' ? styles.pulling : ''}
    ${pullState === 'refreshing' ? styles.refreshing : ''}
  `.trim();

  const indicatorClassName = `
    ${styles.pullIndicator}
    ${translateY > 0 ? styles.visible : ''}
    ${pullState !== 'idle' ? styles[`state${pullState.charAt(0).toUpperCase() + pullState.slice(1)}`] : ''}
    ${style !== 'default' ? styles[`style${style.charAt(0).toUpperCase() + style.slice(1)}`] : ''}
  `.trim();

  const getPullText = () => {
    switch (pullState) {
      case 'pulling':
        return 'Pull to refresh';
      case 'release':
        return 'Release to refresh';
      case 'refreshing':
        return 'Refreshing...';
      default:
        return 'Pull to refresh';
    }
  };

  return (
    <div
      ref={containerRef}
      className={containerClassName}
      style={{
        ['--mobile-pull-distance' as string]: `${pullDistance}px`,
      }}
    >
      <div className={indicatorClassName}>
        {style === 'spinner' ? (
          <>
            {pullState === 'refreshing' ? (
              <div className={styles.pullSpinner} />
            ) : (
              <div className={styles.pullIcon}>
                <ArrowDown className={styles.icon} />
              </div>
            )}
            <span className={styles.pullText}>{getPullText()}</span>
          </>
        ) : (
          <>
            <div className={styles.pullIcon}>
              {pullState === 'refreshing' ? (
                <RefreshCw className={styles.icon} />
              ) : (
                <ArrowDown className={styles.icon} />
              )}
            </div>
            <span className={styles.pullText}>{getPullText()}</span>
          </>
        )}
      </div>

      <div
        ref={contentRef}
        className={contentClassName}
        style={{
          transform: `translateY(${translateY}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

// ==================== Main Export ====================

export default PullToRefresh;
