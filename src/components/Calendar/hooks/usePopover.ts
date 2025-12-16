/**
 * 팝오버 상태 관리 훅
 */

import { useState, useCallback, useRef, useEffect } from 'react';

interface UsePopoverOptions {
  /** 초기 열림 상태 */
  initialOpen?: boolean;
  /** 열기 콜백 */
  onOpen?: () => void;
  /** 닫기 콜백 */
  onClose?: () => void;
  /** 외부 클릭 시 닫기 */
  closeOnClickOutside?: boolean;
  /** ESC 키 시 닫기 */
  closeOnEscape?: boolean;
}

interface UsePopoverReturn {
  /** 열림 상태 */
  isOpen: boolean;
  /** 열기 */
  open: () => void;
  /** 닫기 */
  close: () => void;
  /** 토글 */
  toggle: () => void;
  /** 트리거 ref */
  triggerRef: React.RefObject<HTMLElement | null>;
  /** 팝오버 ref */
  popoverRef: React.RefObject<HTMLDivElement | null>;
  /** 트리거 props */
  triggerProps: {
    ref: React.RefObject<HTMLElement | null>;
    onClick: () => void;
    'aria-expanded': boolean;
    'aria-haspopup': 'dialog';
  };
  /** 팝오버 props */
  popoverProps: {
    ref: React.RefObject<HTMLDivElement | null>;
    role: 'dialog';
    'aria-modal': boolean;
  };
}

export const usePopover = (options: UsePopoverOptions = {}): UsePopoverReturn => {
  const {
    initialOpen = false,
    onOpen,
    onClose,
    closeOnClickOutside = true,
    closeOnEscape = true,
  } = options;

  const [isOpen, setIsOpen] = useState(initialOpen);
  const triggerRef = useRef<HTMLElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const open = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  // 외부 클릭 감지
  useEffect(() => {
    if (!isOpen || !closeOnClickOutside) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        popoverRef.current &&
        !popoverRef.current.contains(target)
      ) {
        close();
      }
    };

    // 약간의 딜레이를 줘서 열기 클릭과 충돌 방지
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeOnClickOutside, close]);

  // ESC 키 감지
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, close]);

  return {
    isOpen,
    open,
    close,
    toggle,
    triggerRef,
    popoverRef,
    triggerProps: {
      ref: triggerRef,
      onClick: toggle,
      'aria-expanded': isOpen,
      'aria-haspopup': 'dialog' as const,
    },
    popoverProps: {
      ref: popoverRef,
      role: 'dialog' as const,
      'aria-modal': true,
    },
  };
};

// ============================================
// 팝오버 위치 계산 훅
// ============================================

type Placement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

interface UsePopoverPositionOptions {
  /** 배치 위치 */
  placement?: Placement;
  /** 오프셋 */
  offset?: number;
}

interface Position {
  top: number;
  left: number;
}

export const usePopoverPosition = (
  triggerRef: React.RefObject<HTMLElement>,
  popoverRef: React.RefObject<HTMLElement>,
  isOpen: boolean,
  options: UsePopoverPositionOptions = {}
): Position => {
  const { placement = 'bottom-start', offset = 4 } = options;
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });

  useEffect(() => {
    if (!isOpen || !triggerRef.current || !popoverRef.current) return;

    const calculate = () => {
      const triggerRect = triggerRef.current!.getBoundingClientRect();
      const popoverRect = popoverRef.current!.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      let top = 0;
      let left = 0;

      switch (placement) {
        case 'top':
          top = triggerRect.top + scrollY - popoverRect.height - offset;
          left = triggerRect.left + scrollX + (triggerRect.width - popoverRect.width) / 2;
          break;
        case 'top-start':
          top = triggerRect.top + scrollY - popoverRect.height - offset;
          left = triggerRect.left + scrollX;
          break;
        case 'top-end':
          top = triggerRect.top + scrollY - popoverRect.height - offset;
          left = triggerRect.right + scrollX - popoverRect.width;
          break;
        case 'bottom':
          top = triggerRect.bottom + scrollY + offset;
          left = triggerRect.left + scrollX + (triggerRect.width - popoverRect.width) / 2;
          break;
        case 'bottom-start':
          top = triggerRect.bottom + scrollY + offset;
          left = triggerRect.left + scrollX;
          break;
        case 'bottom-end':
          top = triggerRect.bottom + scrollY + offset;
          left = triggerRect.right + scrollX - popoverRect.width;
          break;
        case 'left':
          top = triggerRect.top + scrollY + (triggerRect.height - popoverRect.height) / 2;
          left = triggerRect.left + scrollX - popoverRect.width - offset;
          break;
        case 'right':
          top = triggerRect.top + scrollY + (triggerRect.height - popoverRect.height) / 2;
          left = triggerRect.right + scrollX + offset;
          break;
      }

      // 뷰포트 경계 체크
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // 왼쪽 경계
      if (left < scrollX) {
        left = scrollX + offset;
      }
      // 오른쪽 경계
      if (left + popoverRect.width > scrollX + viewportWidth) {
        left = scrollX + viewportWidth - popoverRect.width - offset;
      }
      // 상단 경계
      if (top < scrollY) {
        top = triggerRect.bottom + scrollY + offset;
      }
      // 하단 경계
      if (top + popoverRect.height > scrollY + viewportHeight) {
        top = triggerRect.top + scrollY - popoverRect.height - offset;
      }

      setPosition({ top, left });
    };

    calculate();

    window.addEventListener('resize', calculate);
    window.addEventListener('scroll', calculate, true);

    return () => {
      window.removeEventListener('resize', calculate);
      window.removeEventListener('scroll', calculate, true);
    };
  }, [isOpen, placement, offset]);

  return position;
};
