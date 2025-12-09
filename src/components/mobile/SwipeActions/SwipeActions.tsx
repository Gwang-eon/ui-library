import React, { useRef, useState, useEffect } from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './SwipeActions.module.css';

type IconType = LucideIcon;

// ==================== Swipe Actions ====================

export type SwipeActionType = 'delete' | 'favorite' | 'archive' | 'edit';

export interface SwipeAction {
  type: SwipeActionType;
  icon: IconType;
  label: string;
  onAction: () => void;
}

export interface SwipeActionsProps {
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];
  children: React.ReactNode;
  threshold?: number;
  disabled?: boolean;
  className?: string;
}

export const SwipeActions: React.FC<SwipeActionsProps> = ({
  leftActions = [],
  rightActions = [],
  children,
  threshold = 80,
  disabled = false,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const currentXRef = useRef<number>(0);
  const [translateX, setTranslateX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  useEffect(() => {
    const item = itemRef.current;
    if (!item || disabled) return;

    let isDragging = false;

    const handleTouchStart = (e: TouchEvent) => {
      startXRef.current = e.touches[0].clientX;
      currentXRef.current = translateX;
      isDragging = true;
      setIsSwiping(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;

      const deltaX = e.touches[0].clientX - startXRef.current;
      const newTranslateX = currentXRef.current + deltaX;

      // Apply boundaries
      const maxRight = leftActions.length > 0 ? leftActions.length * 80 : 0;
      const maxLeft = rightActions.length > 0 ? -rightActions.length * 80 : 0;

      const boundedTranslateX = Math.max(maxLeft, Math.min(maxRight, newTranslateX));
      setTranslateX(boundedTranslateX);
    };

    const handleTouchEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      setIsSwiping(false);

      // Snap to action or reset
      if (Math.abs(translateX) >= threshold) {
        // Snap to revealed actions
        if (translateX > 0 && leftActions.length > 0) {
          setTranslateX(leftActions.length * 80);
        } else if (translateX < 0 && rightActions.length > 0) {
          setTranslateX(-rightActions.length * 80);
        } else {
          setTranslateX(0);
        }
      } else {
        // Reset to center
        setTranslateX(0);
      }
    };

    // Mouse events for desktop testing
    let isMouseDragging = false;

    const handleMouseDown = (e: MouseEvent) => {
      startXRef.current = e.clientX;
      currentXRef.current = translateX;
      isMouseDragging = true;
      setIsSwiping(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDragging) return;

      const deltaX = e.clientX - startXRef.current;
      const newTranslateX = currentXRef.current + deltaX;

      const maxRight = leftActions.length > 0 ? leftActions.length * 80 : 0;
      const maxLeft = rightActions.length > 0 ? -rightActions.length * 80 : 0;

      const boundedTranslateX = Math.max(maxLeft, Math.min(maxRight, newTranslateX));
      setTranslateX(boundedTranslateX);
    };

    const handleMouseUp = () => {
      if (!isMouseDragging) return;
      isMouseDragging = false;
      setIsSwiping(false);

      if (Math.abs(translateX) >= threshold) {
        if (translateX > 0 && leftActions.length > 0) {
          setTranslateX(leftActions.length * 80);
        } else if (translateX < 0 && rightActions.length > 0) {
          setTranslateX(-rightActions.length * 80);
        } else {
          setTranslateX(0);
        }
      } else {
        setTranslateX(0);
      }
    };

    item.addEventListener('touchstart', handleTouchStart, { passive: true });
    item.addEventListener('touchmove', handleTouchMove, { passive: true });
    item.addEventListener('touchend', handleTouchEnd);

    item.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      item.removeEventListener('touchstart', handleTouchStart);
      item.removeEventListener('touchmove', handleTouchMove);
      item.removeEventListener('touchend', handleTouchEnd);

      item.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [disabled, leftActions.length, rightActions.length, threshold, translateX]);

  const handleActionClick = (action: SwipeAction) => {
    action.onAction();
    setTranslateX(0); // Reset position after action
  };

  const containerClassName = `${styles.swipeContainer} ${className}`.trim();
  const itemClassName = `${styles.swipeItem} ${isSwiping ? styles.swiping : ''}`.trim();

  return (
    <div ref={containerRef} className={containerClassName}>
      {leftActions.length > 0 && (
        <div className={styles.swipeActionsLeft}>
          {leftActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className={`${styles.swipeAction} ${styles[action.type]}`}
                onClick={() => handleActionClick(action)}
              >
                <Icon className={styles.actionIcon} />
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {rightActions.length > 0 && (
        <div className={styles.swipeActionsRight}>
          {rightActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className={`${styles.swipeAction} ${styles[action.type]}`}
                onClick={() => handleActionClick(action)}
              >
                <Icon className={styles.actionIcon} />
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>
      )}

      <div
        ref={itemRef}
        className={itemClassName}
        style={{
          transform: `translateX(${translateX}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

// ==================== Main Export ====================

export default SwipeActions;
