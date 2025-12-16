/**
 * CalendarPopover - 캘린더 팝오버 컨테이너
 */

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from '../styles/Calendar.module.css';

interface CalendarPopoverProps {
  /** 열림 상태 */
  isOpen: boolean;
  /** 트리거 요소 ref */
  triggerRef: React.RefObject<HTMLElement>;
  /** 닫기 콜백 */
  onClose: () => void;
  /** 자식 요소 */
  children: React.ReactNode;
  /** 추가 클래스 */
  className?: string;
}

export const CalendarPopover: React.FC<CalendarPopoverProps> = ({
  isOpen,
  triggerRef,
  onClose,
  children,
  className,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // 위치 계산
  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    const calculatePosition = () => {
      const triggerRect = triggerRef.current!.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      let top = triggerRect.bottom + scrollY + 4;
      let left = triggerRect.left + scrollX;

      // 팝오버가 렌더링된 후 위치 조정
      if (popoverRef.current) {
        const popoverRect = popoverRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // 오른쪽 경계 체크
        if (left + popoverRect.width > scrollX + viewportWidth) {
          left = triggerRect.right + scrollX - popoverRect.width;
        }

        // 하단 경계 체크 - 위로 표시
        if (triggerRect.bottom + popoverRect.height > viewportHeight) {
          top = triggerRect.top + scrollY - popoverRect.height - 4;
        }
      }

      setPosition({ top, left });
    };

    // 초기 위치 계산
    calculatePosition();

    // 리사이즈, 스크롤 시 재계산
    window.addEventListener('resize', calculatePosition);
    window.addEventListener('scroll', calculatePosition, true);

    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition, true);
    };
  }, [isOpen, triggerRef]);

  // 외부 클릭 감지
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        popoverRef.current &&
        !popoverRef.current.contains(target)
      ) {
        onClose();
      }
    };

    // 약간의 딜레이
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, triggerRef, onClose]);

  // ESC 키 감지
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, triggerRef, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={popoverRef}
      className={`${styles.popover} ${className || ''}`}
      style={{
        top: position.top,
        left: position.left,
      }}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>,
    document.body
  );
};

export default CalendarPopover;
