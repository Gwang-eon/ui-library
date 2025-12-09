import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import styles from './Popover.module.css';

export interface PopoverProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  wide?: boolean;
  triggerRef?: React.RefObject<HTMLElement> | React.RefObject<HTMLButtonElement>;
  className?: string;
}

export interface PopoverHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
}

export interface PopoverFooterProps {
  children: React.ReactNode;
  className?: string;
}

export interface PopoverTitleProps {
  children: React.ReactNode;
  className?: string;
}

export interface PopoverCloseProps {
  onClick?: () => void;
  'aria-label'?: string;
  className?: string;
}

const Popover = ({
  open,
  onClose,
  children,
  position = 'bottom',
  wide = false,
  triggerRef,
  className = '',
}: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const trigger = triggerRef?.current;

      // Don't close if clicking the trigger or the popover itself
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        trigger &&
        !trigger.contains(target)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, onClose, triggerRef]);

  // Handle ESC key
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        // Return focus to trigger
        if (triggerRef?.current) {
          triggerRef.current.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose, triggerRef]);

  // Position popover relative to trigger
  useEffect(() => {
    if (!open || !popoverRef.current || !triggerRef?.current) return;

    const trigger = triggerRef.current;
    const popover = popoverRef.current;
    const triggerRect = trigger.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = triggerRect.top - popoverRect.height - 8;
        left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + 8;
        left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
        break;
      case 'left':
        top = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
        left = triggerRect.left - popoverRect.width - 8;
        break;
      case 'right':
        top = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
        left = triggerRect.right + 8;
        break;
    }

    // Keep within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const margin = 8;

    if (left < margin) left = margin;
    if (left + popoverRect.width > viewportWidth - margin) {
      left = viewportWidth - popoverRect.width - margin;
    }
    if (top < margin) top = margin;
    if (top + popoverRect.height > viewportHeight - margin) {
      top = viewportHeight - popoverRect.height - margin;
    }

    popover.style.top = `${top}px`;
    popover.style.left = `${left}px`;
  }, [open, position, triggerRef]);

  if (!open) return null;

  const positionClass = position === 'top' ? styles.popoverTop :
                        position === 'right' ? styles.popoverRight :
                        position === 'left' ? styles.popoverLeft :
                        styles.popoverBottom;

  const wideClass = wide ? styles.popoverWide : '';

  return createPortal(
    <div
      ref={popoverRef}
      className={`${styles.popover} ${positionClass} ${wideClass} ${className}`}
      role="dialog"
      aria-modal="false"
    >
      {children}
    </div>,
    document.body
  );
};

const PopoverHeader = ({ children, className = '' }: PopoverHeaderProps) => {
  return (
    <div className={`${styles.popoverHeader} ${className}`}>
      {children}
    </div>
  );
};

const PopoverContent = ({ children, className = '' }: PopoverContentProps) => {
  return (
    <div className={`${styles.popoverContent} ${className}`}>
      {children}
    </div>
  );
};

const PopoverFooter = ({ children, className = '' }: PopoverFooterProps) => {
  return (
    <div className={`${styles.popoverFooter} ${className}`}>
      {children}
    </div>
  );
};

const PopoverTitle = ({ children, className = '' }: PopoverTitleProps) => {
  return (
    <span className={`${styles.popoverTitle} ${className}`}>
      {children}
    </span>
  );
};

const PopoverClose = ({
  onClick,
  'aria-label': ariaLabel = 'Close popover',
  className = '',
}: PopoverCloseProps) => {
  return (
    <button
      className={`${styles.popoverClose} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      type="button"
    >
      <X size={16} />
    </button>
  );
};

export {
  Popover,
  PopoverHeader,
  PopoverContent,
  PopoverFooter,
  PopoverTitle,
  PopoverClose,
};
