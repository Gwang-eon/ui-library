import type { ReactNode } from 'react';
import { Check, X } from 'lucide-react';
import styles from './Steps.module.css';

export interface StepItem {
  /** Step title */
  title: ReactNode;
  /** Optional step description */
  description?: ReactNode;
  /** Custom icon (overrides default number) */
  icon?: ReactNode;
  /** Step status */
  status?: 'wait' | 'process' | 'finish' | 'error';
  /** Disabled state */
  disabled?: boolean;
}

export interface StepsProps {
  /** Array of step items */
  items: StepItem[];
  /** Current active step index (0-based) */
  current?: number;
  /** Steps direction */
  direction?: 'horizontal' | 'vertical';
  /** Steps size */
  size?: 'default' | 'small';
  /** Enable clickable steps */
  clickable?: boolean;
  /** Callback when step is clicked (only if clickable) */
  onChange?: (index: number) => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * Steps Component
 *
 * Display progress through a sequence of steps or stages.
 * Supports horizontal and vertical layouts with different statuses.
 *
 * @example
 * ```tsx
 * <Steps
 *   current={1}
 *   items={[
 *     { title: 'Account Setup', description: 'Create your account' },
 *     { title: 'Profile Information', description: 'Fill in your details' },
 *     { title: 'Verification', description: 'Verify your identity' },
 *   ]}
 * />
 * ```
 */
export const Steps = ({
  items,
  current = 0,
  direction = 'horizontal',
  size = 'default',
  clickable = false,
  onChange,
  className,
}: StepsProps) => {
  const containerClasses = [
    styles.steps,
    direction === 'vertical' && styles.stepsVertical,
    size === 'small' && styles.stepsSm,
    clickable && styles.stepsClickable,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const getStepStatus = (index: number, item: StepItem): string => {
    // Use explicit status if provided
    if (item.status) {
      switch (item.status) {
        case 'finish':
          return 'completed';
        case 'process':
          return 'active';
        case 'error':
          return 'error';
        case 'wait':
          return 'wait';
      }
    }

    // Otherwise determine from current index
    if (index < current) return 'completed';
    if (index === current) return 'active';
    if (item.disabled) return 'disabled';
    return 'wait';
  };

  const handleStepClick = (index: number, item: StepItem) => {
    if (!clickable || item.disabled) return;

    // Allow clicking on completed steps or current step
    if (index <= current) {
      onChange?.(index);
    }
  };

  const renderIcon = (index: number, item: StepItem, status: string) => {
    // Custom icon provided
    if (item.icon) {
      return item.icon;
    }

    // Status-based icons
    if (status === 'completed') {
      return <Check />;
    }

    if (status === 'error') {
      return <X />;
    }

    // Default: show step number
    return index + 1;
  };

  return (
    <nav
      className={containerClasses}
      role="navigation"
      aria-label="Step progress"
    >
      {items.map((item, index) => {
        const status = getStepStatus(index, item);
        const isClickable = clickable && !item.disabled && index <= current;

        const stepClasses = [
          styles.step,
          styles[`step-${status}`],
          isClickable && styles.stepClickable,
        ]
          .filter(Boolean)
          .join(' ');

        const stepContent = (
          <>
            <div className={styles.stepIcon}>
              {renderIcon(index, item, status)}
            </div>
            <div className={styles.stepContent}>
              <div className={styles.stepTitle}>{item.title}</div>
              {item.description && (
                <div className={styles.stepDescription}>
                  {item.description}
                </div>
              )}
            </div>
          </>
        );

        const ariaLabel = `Step ${index + 1} of ${items.length}: ${
          typeof item.title === 'string' ? item.title : 'Step'
        }, ${status}`;

        if (isClickable) {
          return (
            <button
              key={index}
              className={stepClasses}
              onClick={() => handleStepClick(index, item)}
              aria-label={ariaLabel}
              aria-current={status === 'active' ? 'step' : undefined}
              type="button"
            >
              {stepContent}
            </button>
          );
        }

        return (
          <div
            key={index}
            className={stepClasses}
            aria-label={ariaLabel}
            aria-current={status === 'active' ? 'step' : undefined}
          >
            {stepContent}
          </div>
        );
      })}
    </nav>
  );
};

Steps.displayName = 'Steps';
