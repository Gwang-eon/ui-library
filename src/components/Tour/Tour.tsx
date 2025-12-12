import type { ReactNode } from 'react';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Button } from '../Button';
import styles from './Tour.module.css';

export type TourPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TourStep {
  /** Target element selector (e.g., '#step-1', '.my-element') */
  target: string;
  /** Step title */
  title: string;
  /** Step description */
  content: ReactNode;
  /** Popup placement relative to target */
  placement?: TourPlacement;
}

export interface TourProps {
  /** Whether the tour is open */
  open: boolean;
  /** Array of tour steps */
  steps: TourStep[];
  /** Current step index (controlled) */
  current?: number;
  /** Current step change callback */
  onChange?: (current: number) => void;
  /** Close callback */
  onClose: () => void;
  /** Finish callback (when last step completes) */
  onFinish?: () => void;
  /** Skip callback */
  onSkip?: () => void;
  /** Show mask overlay */
  mask?: boolean;
  /** Show close button */
  closable?: boolean;
  /** Show skip button */
  showSkip?: boolean;
  /** Show progress indicator */
  showProgress?: boolean;
  /** Default placement for all steps */
  placement?: TourPlacement;
  /** ARIA label */
  'aria-label'?: string;
}

/**
 * Tour Component
 *
 * Step-by-step guide to help users understand and navigate through features.
 * Ideal for user onboarding, feature discovery, and contextual help.
 *
 * @example
 * ```tsx
 * const [tourOpen, setTourOpen] = useState(false);
 *
 * const steps: TourStep[] = [
 *   {
 *     target: '#dashboard',
 *     title: 'Dashboard',
 *     content: 'View your device metrics here',
 *     placement: 'bottom'
 *   },
 *   {
 *     target: '#settings',
 *     title: 'Settings',
 *     content: 'Configure your preferences',
 *     placement: 'left'
 *   }
 * ];
 *
 * <Tour
 *   open={tourOpen}
 *   steps={steps}
 *   onClose={() => setTourOpen(false)}
 *   onFinish={() => console.log('Tour completed')}
 * />
 * ```
 */
export const Tour = ({
  open,
  steps,
  current: controlledCurrent,
  onChange,
  onClose,
  onFinish,
  onSkip,
  mask = true,
  closable = true,
  showSkip = true,
  showProgress = true,
  placement: defaultPlacement = 'bottom',
  'aria-label': ariaLabel = 'Product tour',
}: TourProps) => {
  const [uncontrolledCurrent, setUncontrolledCurrent] = useState(0);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [popupPlacement, setPopupPlacement] = useState<TourPlacement>(defaultPlacement);
  const popupRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  // Determine if controlled or uncontrolled
  const isControlled = controlledCurrent !== undefined;
  const currentStep = isControlled ? controlledCurrent : uncontrolledCurrent;

  const setCurrentStep = (index: number) => {
    if (!isControlled) {
      setUncontrolledCurrent(index);
    }
    onChange?.(index);
  };

  const step = steps[currentStep];

  // Store previous focus when tour opens
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    } else {
      // Return focus when tour closes
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
  }, [open]);

  // Update target element and highlight
  useEffect(() => {
    if (!open || !step) return;

    // Remove previous highlight
    document.querySelectorAll(`.${styles.tourTargetHighlight}`).forEach(el => {
      el.classList.remove(styles.tourTargetHighlight);
    });

    // Find and highlight new target
    const target = document.querySelector(step.target) as HTMLElement;
    if (target) {
      target.classList.add(styles.tourTargetHighlight);
      setTargetElement(target);
    }

    return () => {
      // Cleanup highlight on unmount
      document.querySelectorAll(`.${styles.tourTargetHighlight}`).forEach(el => {
        el.classList.remove(styles.tourTargetHighlight);
      });
    };
  }, [open, step, currentStep]);

  // Position popup relative to target
  useEffect(() => {
    if (!open || !targetElement || !popupRef.current) return;

    const updatePosition = () => {
      const targetRect = targetElement.getBoundingClientRect();
      const popupRect = popupRef.current!.getBoundingClientRect();
      const placement = step?.placement || defaultPlacement;

      let top = 0;
      let left = 0;

      switch (placement) {
        case 'top':
          top = targetRect.top - popupRect.height - 12;
          left = targetRect.left + (targetRect.width / 2) - (popupRect.width / 2);
          break;
        case 'right':
          top = targetRect.top + (targetRect.height / 2) - (popupRect.height / 2);
          left = targetRect.right + 12;
          break;
        case 'left':
          top = targetRect.top + (targetRect.height / 2) - (popupRect.height / 2);
          left = targetRect.left - popupRect.width - 12;
          break;
        case 'bottom':
        default:
          top = targetRect.bottom + 12;
          left = targetRect.left + (targetRect.width / 2) - (popupRect.width / 2);
          break;
      }

      // Keep within viewport
      top = Math.max(12, Math.min(top, window.innerHeight - popupRect.height - 12));
      left = Math.max(12, Math.min(left, window.innerWidth - popupRect.width - 12));

      setPopupPosition({
        top: top + window.pageYOffset,
        left: left + window.pageXOffset,
      });
      setPopupPlacement(placement);
    };

    updatePosition();

    // Update on scroll/resize
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [open, targetElement, step, defaultPlacement]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
        case 'Enter':
        case ' ':
          if (e.key === ' ') e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
          handlePrev();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, currentStep, steps.length]);

  // Prevent body scroll when tour is open
  useEffect(() => {
    if (open) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [open]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finish tour
      onFinish?.();
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onSkip?.();
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  if (!open || steps.length === 0) return null;

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  return createPortal(
    <>
      {/* Mask overlay */}
      {mask && (
        <div
          className={`${styles.tourMask} ${styles.tourMaskVisible}`}
          aria-hidden="true"
        />
      )}

      {/* Tour popup */}
      <div
        ref={popupRef}
        className={`${styles.tourPopup} ${styles.tourPopupVisible}`}
        style={{
          top: `${popupPosition.top}px`,
          left: `${popupPosition.left}px`,
        }}
        data-placement={popupPlacement}
        role="dialog"
        aria-modal="false"
        aria-label={ariaLabel}
        aria-describedby="tour-content"
      >
        {/* Header */}
        <div className={styles.tourHeader}>
          {showProgress && (
            <div className={styles.tourProgress} aria-live="polite">
              {currentStep + 1} / {steps.length}
            </div>
          )}
          {closable && (
            <button
              className={styles.tourClose}
              onClick={handleClose}
              aria-label="Close tour"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className={styles.tourContent} id="tour-content">
          <h4 className={styles.tourTitle}>{step.title}</h4>
          <div className={styles.tourDescription}>{step.content}</div>
        </div>

        {/* Footer */}
        <div className={styles.tourFooter}>
          {showSkip ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className={styles.tourSkip}
            >
              Skip
            </Button>
          ) : (
            <span />
          )}
          <div className={styles.tourNav}>
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePrev}
              disabled={isFirstStep}
              className={styles.tourPrev}
            >
              Previous
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleNext}
              className={styles.tourNext}
            >
              {isLastStep ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

Tour.displayName = 'Tour';
