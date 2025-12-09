import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import styles from './BottomSheet.module.css';


// ==================== Bottom Sheet ====================

export type BottomSheetHeight = 'peek' | 'half' | 'full';

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  height?: BottomSheetHeight;
  title?: string;
  showHandle?: boolean;
  showBackdrop?: boolean;
  closeButton?: boolean;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  open,
  onClose,
  height = 'half',
  title,
  showHandle = true,
  showBackdrop = true,
  closeButton = true,
  footer,
  children,
  className = '',
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef<number>(0);
  const currentYRef = useRef<number>(0);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleDragStart = (clientY: number) => {
    startYRef.current = clientY;
    currentYRef.current = clientY;
  };

  const handleDragMove = (clientY: number) => {
    const deltaY = clientY - startYRef.current;
    if (deltaY > 0 && sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const handleDragEnd = (clientY: number) => {
    const deltaY = clientY - startYRef.current;
    if (sheetRef.current) {
      sheetRef.current.style.transform = '';
      if (deltaY > 100) {
        onClose();
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    handleDragEnd(e.changedTouches[0].clientY);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientY);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      handleDragMove(moveEvent.clientY);
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      handleDragEnd(upEvent.clientY);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <>
      {showBackdrop && (
        <div
          className={`${styles.backdrop} ${open ? styles.backdropShow : ''}`}
          onClick={onClose}
        />
      )}
      <div
        ref={sheetRef}
        className={`${styles.bottomSheet} ${styles[height]} ${open ? styles.open : ''} ${className}`}
      >
        {showHandle && (
          <div
            className={styles.handle}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
          >
            <div className={styles.dragIndicator} />
          </div>
        )}

        {title && (
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            {closeButton && (
              <button className={styles.closeButton} onClick={onClose} aria-label="Close">
                <X className={styles.closeIcon} />
              </button>
            )}
          </div>
        )}

        <div className={styles.content}>{children}</div>

        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </>
  );
};

// ==================== Main Export ====================

export default {
  BottomSheet,
};
