import { useState, useEffect, useRef, useCallback } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import styles from './Affix.module.css';

export interface AffixProps {
  /** Content to be affixed */
  children: ReactNode;
  /** Offset from top when affixed (in pixels) */
  offsetTop?: number;
  /** Offset from bottom when affixed (in pixels) */
  offsetBottom?: number;
  /** Target container ID to affix within (defaults to window) */
  target?: string;
  /** Callback when affix state changes */
  onChange?: (affixed: boolean) => void;
  /** Additional CSS classes */
  className?: string;
  /** Custom z-index for affixed element */
  zIndex?: number;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Affix component - Makes an element stick to viewport or container on scroll
 *
 * Features:
 * - Window or container-based affixing
 * - Top or bottom positioning
 * - Custom offset configuration
 * - Placeholder maintains layout when affixed
 * - Smooth transitions
 * - Responsive behavior
 *
 * @example
 * ```tsx
 * <Affix offsetTop={64}>
 *   <Toolbar />
 * </Affix>
 * ```
 */
export const Affix = ({
  children,
  offsetTop,
  offsetBottom,
  target,
  onChange,
  className = '',
  zIndex = 100,
  style = {},
}: AffixProps) => {
  const [affixed, setAffixed] = useState(false);
  const affixRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [affixStyle, setAffixStyle] = useState<CSSProperties>({});
  const [placeholderStyle, setPlaceholderStyle] = useState<CSSProperties>({
    display: 'none',
    height: 0,
    margin: 0,
    padding: 0,
  });

  // Use refs to track state without causing re-renders
  const affixedRef = useRef(false);
  const measurementsRef = useRef({
    originalOffsetTop: 0,
    originalOffsetLeft: 0,
    elementWidth: 0,
    elementHeight: 0,
  });
  const rafIdRef = useRef<number | null>(null);

  // Validate props
  const hasTop = offsetTop !== undefined;
  const hasBottom = offsetBottom !== undefined;

  if (hasTop && hasBottom) {
    console.warn('Affix: Both offsetTop and offsetBottom are set. Using offsetTop.');
  }

  const offset = hasTop ? offsetTop : offsetBottom;
  const position = hasTop ? 'top' : 'bottom';

  // Measure element dimensions and position
  const updateMeasurements = useCallback(() => {
    const affixElement = affixRef.current;
    const placeholderElement = placeholderRef.current;
    if (!affixElement || !placeholderElement) return;

    const scrollContainer = target ? document.getElementById(target) : window;
    if (!scrollContainer) return;

    const rect = affixElement.getBoundingClientRect();
    const scrollTop = scrollContainer === window ? window.scrollY : (scrollContainer as HTMLElement).scrollTop;
    const scrollLeft = scrollContainer === window ? window.scrollX : (scrollContainer as HTMLElement).scrollLeft;

    measurementsRef.current = {
      originalOffsetTop: rect.top + scrollTop,
      originalOffsetLeft: rect.left + scrollLeft,
      elementWidth: rect.width,
      elementHeight: rect.height,
    };
  }, [target]);

  // Throttled scroll handler using requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (rafIdRef.current !== null) return;

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;

      const affixElement = affixRef.current;
      if (!affixElement) return;

      const scrollContainer = target ? document.getElementById(target) : window;
      if (!scrollContainer) return;

      const scrollTop = scrollContainer === window
        ? window.scrollY
        : (scrollContainer as HTMLElement).scrollTop;

      const viewportHeight = scrollContainer === window
        ? window.innerHeight
        : (scrollContainer as HTMLElement).clientHeight;

      const { originalOffsetTop, originalOffsetLeft, elementWidth, elementHeight } = measurementsRef.current;
      let shouldAffix = false;

      if (position === 'top') {
        // Top affixing
        const offsetValue = offset ?? 0;
        shouldAffix = scrollTop > originalOffsetTop - offsetValue;

        if (shouldAffix && !affixedRef.current) {
          // Activate affix
          affixedRef.current = true;
          setAffixed(true);
          setPlaceholderStyle({
            display: 'block',
            height: `${elementHeight}px`,
            width: `${elementWidth}px`,
            margin: 0,
            padding: 0,
            border: 'none',
          });
          setAffixStyle({
            position: 'fixed',
            top: `${offsetValue}px`,
            left: `${originalOffsetLeft}px`,
            width: `${elementWidth}px`,
            zIndex,
          });
          onChange?.(true);
        } else if (!shouldAffix && affixedRef.current) {
          // Deactivate affix
          affixedRef.current = false;
          setAffixed(false);
          setPlaceholderStyle({
            display: 'none',
            height: 0,
            margin: 0,
            padding: 0,
          });
          setAffixStyle({});
          onChange?.(false);
        }
      } else {
        // Bottom affixing
        const offsetValue = offset ?? 0;
        const elementBottom = originalOffsetTop + elementHeight;
        const viewportBottom = scrollTop + viewportHeight;
        shouldAffix = viewportBottom < elementBottom + offsetValue;

        if (shouldAffix && !affixedRef.current) {
          // Activate affix
          affixedRef.current = true;
          setAffixed(true);
          setPlaceholderStyle({
            display: 'block',
            height: `${elementHeight}px`,
            width: `${elementWidth}px`,
            margin: 0,
            padding: 0,
            border: 'none',
          });
          setAffixStyle({
            position: 'fixed',
            bottom: `${offsetValue}px`,
            left: `${originalOffsetLeft}px`,
            width: `${elementWidth}px`,
            zIndex,
          });
          onChange?.(true);
        } else if (!shouldAffix && affixedRef.current) {
          // Deactivate affix
          affixedRef.current = false;
          setAffixed(false);
          setPlaceholderStyle({
            display: 'none',
            height: 0,
            margin: 0,
            padding: 0,
          });
          setAffixStyle({});
          onChange?.(false);
        }
      }
    });
  }, [offset, position, target, zIndex, onChange]);

  // Handle resize with measurement update
  const handleResize = useCallback(() => {
    // Only update measurements when not affixed to prevent jumping
    if (!affixedRef.current) {
      updateMeasurements();
    }
    handleScroll();
  }, [updateMeasurements, handleScroll]);

  // Initial measurements
  useEffect(() => {
    updateMeasurements();
  }, [updateMeasurements]);

  // Setup scroll and resize listeners
  useEffect(() => {
    const scrollContainer = target ? document.getElementById(target) : window;

    if (!scrollContainer) {
      if (target) {
        console.warn(`Affix: Target container with id "${target}" not found.`);
      }
      return;
    }

    // Initial check
    handleScroll();

    // Add event listeners
    if (scrollContainer === window) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize);
    } else {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize);
    }

    // Cleanup
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      if (scrollContainer === window) {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      } else {
        scrollContainer.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [offset, position, target, zIndex, handleScroll, handleResize]);

  return (
    <>
      {/* Affixed element */}
      <div
        ref={affixRef}
        className={`${styles.affix} ${affixed ? styles.affixActive : ''} ${className}`}
        style={{ ...affixStyle, ...style }}
        data-affixed={affixed}
      >
        {children}
      </div>

      {/* Placeholder to maintain layout when affixed - always rendered to maintain ref */}
      <div
        ref={placeholderRef}
        style={placeholderStyle}
        aria-hidden="true"
        className={styles.affixPlaceholder}
      />
    </>
  );
};
