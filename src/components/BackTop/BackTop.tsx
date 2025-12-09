import React, { useEffect, useState, useCallback, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import styles from './BackTop.module.css';

export interface BackTopProps {
  /** Scroll threshold in pixels before button appears */
  threshold?: number;
  /** Duration of scroll animation in milliseconds */
  duration?: number;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant */
  variant?: 'default' | 'primary' | 'outline';
  /** Position on screen */
  position?: 'right' | 'left';
  /** Show text label with icon */
  showText?: boolean;
  /** Text label to display */
  text?: string;
  /** Target element to scroll (defaults to window) */
  target?: () => HTMLElement | Window | null;
  /** Callback when button is clicked */
  onClick?: () => void;
  /** Additional CSS class */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Children (icon override) */
  children?: React.ReactNode;
}

/**
 * BackTop Component
 *
 * Button to scroll back to the top of the page when user scrolls down.
 * Appears after scrolling past a threshold and smoothly scrolls to top when clicked.
 *
 * @example
 * ```tsx
 * <BackTop />
 * <BackTop threshold={300} showText text="Top" />
 * <BackTop variant="primary" size="lg" />
 * ```
 */
export const BackTop: React.FC<BackTopProps> = ({
  threshold = 400,
  duration: _duration = 450,
  size = 'md',
  variant = 'default',
  position = 'right',
  showText = false,
  text = 'Top',
  target,
  onClick,
  className,
  style,
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  const getScrollTop = useCallback(() => {
    const targetElement = target?.();
    if (!targetElement) {
      return window.pageYOffset || document.documentElement.scrollTop;
    }
    if (targetElement === window) {
      return window.pageYOffset || document.documentElement.scrollTop;
    }
    return (targetElement as HTMLElement).scrollTop;
  }, [target]);

  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const scrollTop = getScrollTop();
      setVisible(scrollTop > threshold);
    });
  }, [threshold, getScrollTop]);

  const scrollToTop = useCallback(() => {
    onClick?.();

    const targetElement = target?.();
    const scrollElement = !targetElement || targetElement === window
      ? window
      : (targetElement as HTMLElement);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Instant scroll for reduced motion
      if (scrollElement === window) {
        window.scrollTo(0, 0);
      } else {
        (scrollElement as HTMLElement).scrollTop = 0;
      }
      return;
    }

    // Smooth scroll
    if (scrollElement === window) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      (scrollElement as HTMLElement).scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [target, onClick]);

  useEffect(() => {
    const targetElement = target?.() || window;
    const scrollElement = targetElement === window ? window : (targetElement as HTMLElement);

    handleScroll(); // Initial check
    scrollElement.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [target, handleScroll]);

  const buttonClasses = [
    styles.backtop,
    visible && styles.visible,
    size !== 'md' && styles[size],
    variant !== 'default' && styles[variant],
    position === 'left' && styles.left,
    showText && styles.withText,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      style={style}
      onClick={scrollToTop}
      aria-label="Back to top"
      aria-hidden={!visible}
      type="button"
    >
      {children || <ArrowUp aria-hidden="true" />}
      {showText && <span>{text}</span>}
    </button>
  );
};

BackTop.displayName = 'BackTop';
