import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './Knob.module.css';

export type KnobSize = 'sm' | 'md' | 'lg';
export type KnobVariant = 'primary' | 'success' | 'warning' | 'error';

export interface KnobProps {
  /** Current value */
  value?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Value label (e.g., "°C", "%") */
  label?: string;
  /** Show min/max labels */
  showLabels?: boolean;
  /** Show position indicator/marker */
  showIndicator?: boolean;
  /** Size variant */
  size?: KnobSize;
  /** Color variant */
  variant?: KnobVariant;
  /** Disabled state */
  disabled?: boolean;
  /** Read only state */
  readOnly?: boolean;
  /** Callback when value changes */
  onChange?: (value: number) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Knob - Circular dial input for adjusting values
 *
 * Features:
 * - Drag to adjust value
 * - Multiple sizes and colors
 * - Min/max range
 * - Step increments
 * - Label support
 *
 * @example
 * ```tsx
 * <Knob
 *   value={temperature}
 *   onChange={setTemperature}
 *   min={15}
 *   max={30}
 *   label="°C"
 * />
 * ```
 */
export const Knob = ({
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  label,
  showLabels = false,
  showIndicator = true,
  size = 'md',
  variant = 'primary',
  disabled = false,
  readOnly = false,
  onChange,
  className = '',
}: KnobProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const knobRef = useRef<HTMLDivElement>(null);
  const startAngleRef = useRef(0);
  const startValueRef = useRef(0);

  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  // Clamp value
  const clampValue = useCallback((val: number): number => {
    return Math.max(min, Math.min(max, val));
  }, [min, max]);

  // Round to step
  const roundToStep = useCallback((val: number): number => {
    return Math.round(val / step) * step;
  }, [step]);

  // Format value for display
  const formatValue = useCallback((val: number): string => {
    // Determine decimal places from step
    const decimals = step.toString().includes('.')
      ? step.toString().split('.')[1].length
      : 0;
    return val.toFixed(decimals);
  }, [step]);

  // Handle value change
  const handleChange = useCallback((newValue: number) => {
    const clamped = clampValue(roundToStep(newValue));
    if (controlledValue === undefined) {
      setUncontrolledValue(clamped);
    }
    onChange?.(clamped);
  }, [clampValue, roundToStep, controlledValue, onChange]);

  // Calculate angle from mouse position
  const calculateAngle = (clientX: number, clientY: number): number => {
    if (!knobRef.current) return 0;

    const rect = knobRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;

    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    angle = (angle + 360) % 360;

    return angle;
  };

  // Mouse down handler
  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled || readOnly) return;
    e.preventDefault();

    setIsDragging(true);
    startAngleRef.current = calculateAngle(e.clientX, e.clientY);
    startValueRef.current = value;
  };

  // Touch start handler
  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled || readOnly) return;
    e.preventDefault();

    const touch = e.touches[0];
    setIsDragging(true);
    startAngleRef.current = calculateAngle(touch.clientX, touch.clientY);
    startValueRef.current = value;
  };

  // Keyboard handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled || readOnly) return;

    const valueRange = max - min;
    const pageStep = valueRange * 0.1; // 10% of range

    let newValue = value;

    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        e.preventDefault();
        newValue = value + step;
        break;
      case 'ArrowDown':
      case 'ArrowLeft':
        e.preventDefault();
        newValue = value - step;
        break;
      case 'PageUp':
        e.preventDefault();
        newValue = value + pageStep;
        break;
      case 'PageDown':
        e.preventDefault();
        newValue = value - pageStep;
        break;
      case 'Home':
        e.preventDefault();
        newValue = min;
        break;
      case 'End':
        e.preventDefault();
        newValue = max;
        break;
      default:
        return;
    }

    handleChange(newValue);
  };

  // Handle drag
  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (clientX: number, clientY: number) => {
      const currentAngle = calculateAngle(clientX, clientY);
      let angleDiff = currentAngle - startAngleRef.current;

      // Handle wrapping
      if (angleDiff > 180) angleDiff -= 360;
      if (angleDiff < -180) angleDiff += 360;

      const valueRange = max - min;
      const valueChange = (angleDiff / 360) * valueRange;
      const newValue = startValueRef.current + valueChange;

      handleChange(newValue);
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, max, min, handleChange]);

  // Calculate SVG properties
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const percentage = (value - min) / (max - min);

  // Configuration (matching original)
  const startAngle = 135; // 7:30 position
  const angleRange = 270; // 270 degrees rotation

  // Calculate angle in degrees
  const angleDeg = startAngle + (percentage * angleRange);

  // Calculate progress arc
  const maxArcLength = (angleRange / 360) * circumference;
  const currentArcLength = maxArcLength * percentage;
  const strokeDashoffset = circumference - currentArcLength;

  // Calculate handle position using trigonometry (not transform)
  const angleRad = (angleDeg * Math.PI) / 180;
  const handleX = 100 + radius * Math.cos(angleRad);
  const handleY = 100 + radius * Math.sin(angleRad);

  const knobClasses = [
    styles.knob,
    size === 'sm' && styles['knob--sm'],
    size === 'lg' && styles['knob--lg'],
    styles[`knob--${variant}`],
    disabled && styles['knob--disabled'],
    readOnly && styles['knob--readonly'],
    isDragging && styles['knob-dragging'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={knobRef}
      className={knobClasses}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onKeyDown={handleKeyDown}
      role="slider"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-disabled={disabled}
      aria-readonly={readOnly}
      aria-label={label ? `${label} control` : 'Value control'}
      tabIndex={disabled || readOnly ? -1 : 0}
    >
      <svg className={styles['knob-svg']} viewBox="0 0 200 200">
        {/* Track */}
        <circle
          className={styles['knob-track']}
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          strokeWidth="12"
        />

        {/* Progress */}
        <circle
          className={styles['knob-progress']}
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          style={{
            transformOrigin: 'center',
            transform: `rotate(${startAngle}deg)`
          }}
        />

        {/* Handle (draggable pointer) */}
        {showIndicator && (
          <circle
            className={styles['knob-handle']}
            cx={handleX}
            cy={handleY}
            r="8"
          />
        )}

        {/* Value */}
        <text
          className={styles['knob-value']}
          x="100"
          y={label ? "95" : "100"}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {formatValue(value)}
        </text>

        {/* Label */}
        {label && (
          <text
            className={styles['knob-label']}
            x="100"
            y="120"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {label}
          </text>
        )}

        {/* Min/Max Labels */}
        {showLabels && (
          <>
            <text
              className={styles['knob-min-label']}
              x="30"
              y="175"
              textAnchor="middle"
            >
              {min}
            </text>
            <text
              className={styles['knob-max-label']}
              x="170"
              y="175"
              textAnchor="middle"
            >
              {max}
            </text>
          </>
        )}
      </svg>
    </div>
  );
};
