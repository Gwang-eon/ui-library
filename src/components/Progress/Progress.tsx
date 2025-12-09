import React from 'react';
import styles from './Progress.module.css';

export interface ProgressProps {
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface ProgressBarProps {
  value?: number;
  variant?: 'primary' | 'success' | 'warning' | 'error';
  indeterminate?: boolean;
  striped?: boolean;
  animated?: boolean;
  className?: string;
  'aria-label'?: string;
}

export interface ProgressCircularProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  variant?: 'primary' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  className?: string;
  'aria-label'?: string;
}

export interface ProgressSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'danger';
  className?: string;
  'aria-label'?: string;
}

const Progress = ({
  children,
  size = 'md',
  className = '',
}: ProgressProps) => {
  const sizeClass = size === 'sm' ? styles.progressSm :
                    size === 'lg' ? styles.progressLg :
                    styles.progressMd;

  return (
    <div className={`${styles.progress} ${sizeClass} ${className}`}>
      {children}
    </div>
  );
};

const ProgressBar = ({
  value = 0,
  variant = 'primary',
  indeterminate = false,
  striped = false,
  animated = false,
  className = '',
  'aria-label': ariaLabel,
}: ProgressBarProps) => {
  const variantClass = variant === 'success' ? styles.progressBarSuccess :
                       variant === 'warning' ? styles.progressBarWarning :
                       variant === 'error' ? styles.progressBarError :
                       '';

  const stripedClass = striped ? styles.progressBarStriped : '';
  const animatedClass = animated ? styles.progressBarAnimated : '';
  const indeterminateClass = indeterminate ? styles.progressBarIndeterminate : '';

  const style = indeterminate ? {} : { width: `${Math.min(100, Math.max(0, value))}%` };

  return (
    <div
      className={`${styles.progressBar} ${variantClass} ${stripedClass} ${animatedClass} ${indeterminateClass} ${className}`}
      style={style}
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
    />
  );
};

const ProgressCircular = ({
  value,
  size = 120,
  strokeWidth = 8,
  variant = 'primary',
  showLabel = true,
  className = '',
  'aria-label': ariaLabel,
}: ProgressCircularProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const variantColor = variant === 'success' ? 'var(--color-success-500)' :
                       variant === 'warning' ? 'var(--color-warning-500)' :
                       variant === 'error' ? 'var(--color-error-500)' :
                       'var(--color-primary-500)';

  return (
    <div
      className={`${styles.progressCircular} ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className={styles.progressCircularTrack}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className={styles.progressCircularBar}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={variantColor}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        {showLabel && (
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize={size > 80 ? 24 : 16}
            fontWeight="600"
            fill="var(--text-primary)"
          >
            {Math.round(value)}%
          </text>
        )}
      </svg>
    </div>
  );
};

const ProgressSpinner = ({
  size = 'md',
  variant = 'primary',
  className = '',
  'aria-label': ariaLabel = 'Loading',
}: ProgressSpinnerProps) => {
  const sizeClass = size === 'sm' ? styles.progressSpinnerSm :
                    size === 'lg' ? styles.progressSpinnerLg :
                    styles.progressSpinnerMd;

  const variantClass = variant === 'success' ? styles.progressSpinnerSuccess :
                       variant === 'warning' ? styles.progressSpinnerWarning :
                       variant === 'danger' || variant === 'error' ? styles.progressSpinnerDanger :
                       styles.progressSpinnerPrimary;

  return (
    <div
      className={`${styles.progressSpinner} ${sizeClass} ${variantClass} ${className}`}
      role="status"
      aria-label={ariaLabel}
    >
      <div className={styles.progressSpinnerCircle} />
    </div>
  );
};

export { Progress, ProgressBar, ProgressCircular, ProgressSpinner };
