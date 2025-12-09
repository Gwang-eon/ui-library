import React, { useState, useCallback, useRef, type KeyboardEvent } from 'react';
import { Star, Heart, Circle } from 'lucide-react';
import styles from './Rating.module.css';

export interface RatingProps {
  /** Current rating value (controlled) */
  value?: number;
  /** Default rating value (uncontrolled) */
  defaultValue?: number;
  /** Total number of stars */
  count?: number;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Icon type */
  icon?: 'star' | 'heart' | 'circle' | React.ReactNode;
  /** Allow half-star ratings */
  allowHalf?: boolean;
  /** Read-only mode (no interaction) */
  readOnly?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Callback when value changes */
  onChange?: (value: number) => void;
  /** Show numeric value */
  showValue?: boolean;
  /** Show review count */
  reviewCount?: number;
  /** Description text */
  description?: string;
  /** Label text */
  label?: string;
  /** Additional CSS class */
  className?: string;
  /** Accessible label for the rating group */
  ariaLabel?: string;
}

/**
 * Rating Component
 *
 * Star rating component for user feedback, reviews, and quality assessment.
 * Supports full and half-star ratings, keyboard navigation, and custom icons.
 *
 * @example
 * ```tsx
 * <Rating value={4} onChange={(val) => console.log(val)} />
 * <Rating defaultValue={3.5} allowHalf readOnly reviewCount={128} />
 * <Rating icon="heart" size="lg" />
 * ```
 */
export const Rating: React.FC<RatingProps> = ({
  value: controlledValue,
  defaultValue = 0,
  count = 5,
  size = 'md',
  icon = 'star',
  allowHalf = false,
  readOnly = false,
  disabled = false,
  onChange,
  showValue = false,
  reviewCount,
  description,
  label,
  className,
  ariaLabel,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  // Get the icon component
  const getIcon = useCallback(() => {
    if (typeof icon !== 'string') return icon;
    switch (icon) {
      case 'heart':
        return <Heart />;
      case 'circle':
        return <Circle />;
      case 'star':
      default:
        return <Star fill="currentColor" />;
    }
  }, [icon]);

  const IconComponent = getIcon();

  // Calculate star state (empty, half, full)
  const getStarState = useCallback(
    (index: number) => {
      const starValue = index + 1;
      const displayValue = hoverValue !== null ? hoverValue : currentValue;

      if (starValue <= Math.floor(displayValue)) {
        return 'filled';
      } else if (allowHalf && starValue === Math.ceil(displayValue) && displayValue % 1 !== 0) {
        return 'half';
      }
      return 'empty';
    },
    [currentValue, hoverValue, allowHalf]
  );

  // Handle star click
  const handleClick = useCallback(
    (index: number, event: React.MouseEvent) => {
      if (readOnly || disabled) return;

      let newValue = index + 1;

      // Half-star logic: if clicking the left half, set to .5
      if (allowHalf) {
        const rect = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const halfWidth = rect.width / 2;

        if (clickX < halfWidth) {
          newValue = index + 0.5;
        }
      }

      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [readOnly, disabled, allowHalf, isControlled, onChange]
  );

  // Handle hover
  const handleMouseEnter = useCallback(
    (index: number, event: React.MouseEvent) => {
      if (readOnly || disabled) return;

      let hoverVal = index + 1;

      if (allowHalf) {
        const rect = event.currentTarget.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const halfWidth = rect.width / 2;

        if (mouseX < halfWidth) {
          hoverVal = index + 0.5;
        }
      }

      setHoverValue(hoverVal);
    },
    [readOnly, disabled, allowHalf]
  );

  const handleMouseLeave = useCallback(() => {
    setHoverValue(null);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (readOnly || disabled) return;

      const { key } = event;
      let newIndex = focusedIndex;

      if (key === 'ArrowLeft' || key === 'ArrowDown') {
        event.preventDefault();
        newIndex = Math.max(0, focusedIndex - 1);
      } else if (key === 'ArrowRight' || key === 'ArrowUp') {
        event.preventDefault();
        newIndex = Math.min(count - 1, focusedIndex + 1);
      } else if (key === ' ' || key === 'Enter') {
        event.preventDefault();
        if (focusedIndex >= 0) {
          const newValue = focusedIndex + 1;
          if (!isControlled) {
            setInternalValue(newValue);
          }
          onChange?.(newValue);
        }
      } else if (key === 'Home') {
        event.preventDefault();
        newIndex = 0;
      } else if (key === 'End') {
        event.preventDefault();
        newIndex = count - 1;
      }

      if (newIndex !== focusedIndex) {
        setFocusedIndex(newIndex);
      }
    },
    [readOnly, disabled, focusedIndex, count, isControlled, onChange]
  );

  // Reset focus on blur
  const handleBlur = useCallback(() => {
    setFocusedIndex(-1);
  }, []);

  // Set initial focus on Tab
  const handleFocus = useCallback(() => {
    if (focusedIndex === -1) {
      setFocusedIndex(Math.floor(currentValue) || 0);
    }
  }, [focusedIndex, currentValue]);

  const containerClasses = [
    styles.rating,
    size !== 'md' && styles[size],
    readOnly && styles.readonly,
    disabled && styles.disabled,
    typeof icon === 'string' && icon !== 'star' && styles[icon],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const interactionProps =
    !readOnly && !disabled
      ? {
          role: 'radiogroup',
          'aria-label': ariaLabel || `Rate from 1 to ${count} ${typeof icon === 'string' ? icon + 's' : 'stars'}`,
          tabIndex: 0,
          onKeyDown: handleKeyDown,
          onFocus: handleFocus,
          onBlur: handleBlur,
        }
      : {
          role: 'img',
          'aria-label': ariaLabel || `Rated ${currentValue} out of ${count}${reviewCount ? ` based on ${reviewCount} reviews` : ''}`,
        };

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.wrapper}>
        <div
          ref={containerRef}
          className={containerClasses}
          onMouseLeave={handleMouseLeave}
          {...interactionProps}
        >
          {Array.from({ length: count }).map((_, index) => {
            const state = getStarState(index);
            const isFocused = focusedIndex === index;
            const isInteractive = !readOnly && !disabled;

            const starClasses = [
              styles.star,
              state === 'filled' && styles.filled,
              state === 'half' && styles.half,
              hoverValue !== null && styles.hover,
              isFocused && styles.focused,
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <span
                key={index}
                className={starClasses}
                onClick={(e) => handleClick(index, e)}
                onMouseEnter={(e) => handleMouseEnter(index, e)}
                onMouseMove={(e) => handleMouseEnter(index, e)}
                data-value={index + 1}
                role={isInteractive ? 'radio' : undefined}
                aria-checked={isInteractive ? (index + 1 <= currentValue ? 'true' : 'false') : undefined}
                aria-label={isInteractive ? `${index + 1} ${typeof icon === 'string' ? icon : 'star'}${index !== 0 ? 's' : ''}` : undefined}
                aria-setsize={isInteractive ? count : undefined}
                aria-posinset={isInteractive ? index + 1 : undefined}
              >
                {IconComponent}
              </span>
            );
          })}
        </div>

        {showValue && (
          <span className={styles.value}>
            {currentValue} / {count}
          </span>
        )}

        {reviewCount !== undefined && <span className={styles.count}>({reviewCount} reviews)</span>}
      </div>

      {description && <span className={styles.description}>{description}</span>}
    </div>
  );
};

Rating.displayName = 'Rating';
