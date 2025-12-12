import React from 'react';
import styles from './Spin.module.css';

export type SpinSize = 'sm' | 'md' | 'lg';
export type SpinVariant = 'circle' | 'dots' | 'pulse' | 'bars';

export interface SpinProps {
  /** Size of the spinner */
  size?: SpinSize;
  /** Visual variant of the spinner */
  variant?: SpinVariant;
  /** Display as inline element (for buttons) */
  inline?: boolean;
  /** Loading text below spinner */
  text?: string;
  /** Additional CSS class */
  className?: string;
  /** Accessible label for screen readers */
  'aria-label'?: string;
}

export interface SpinContainerProps {
  /** Size of the spinner */
  size?: SpinSize;
  /** Visual variant of the spinner */
  variant?: SpinVariant;
  /** Loading text below spinner */
  text: string;
  /** Additional CSS class */
  className?: string;
  /** Accessible label for screen readers */
  'aria-label'?: string;
}

export interface SpinOverlayProps {
  /** Size of the spinner */
  size?: SpinSize;
  /** Visual variant of the spinner */
  variant?: SpinVariant;
  /** Loading text below spinner */
  text: string;
  /** Additional CSS class */
  className?: string;
}

export interface SpinFullscreenProps {
  /** Size of the spinner */
  size?: SpinSize;
  /** Visual variant of the spinner */
  variant?: SpinVariant;
  /** Loading text below spinner */
  text: string;
  /** Additional CSS class */
  className?: string;
}

/**
 * Spin - Loading indicator component
 *
 * Simple spinner for loading states.
 */
export const Spin: React.FC<SpinProps> = ({
  size = 'md',
  variant = 'circle',
  inline = false,
  text,
  className = '',
  'aria-label': ariaLabel,
}) => {
  const spinnerClasses = [
    styles.spin,
    size !== 'md' && styles[`spin-${size}`],
    variant !== 'circle' && styles[`spin-${variant}`],
    inline && styles['spin-inline'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderSpinner = () => {
    if (variant === 'dots') {
      return (
        <div className={spinnerClasses} role="status" aria-label={ariaLabel || 'Loading'}>
          <span className={styles['spin-dot']}></span>
          <span className={styles['spin-dot']}></span>
          <span className={styles['spin-dot']}></span>
        </div>
      );
    }

    if (variant === 'bars') {
      return (
        <div className={spinnerClasses} role="status" aria-label={ariaLabel || 'Loading'}>
          <span className={styles['spin-bar']}></span>
          <span className={styles['spin-bar']}></span>
          <span className={styles['spin-bar']}></span>
        </div>
      );
    }

    return (
      <div className={spinnerClasses} role="status" aria-label={ariaLabel || 'Loading'} />
    );
  };

  if (text) {
    return (
      <div className={styles['spin-container']}>
        {renderSpinner()}
        <div className={styles['spin-text']}>{text}</div>
      </div>
    );
  }

  return renderSpinner();
};

/**
 * SpinContainer - Spinner with text in a centered container
 */
export const SpinContainer: React.FC<SpinContainerProps> = ({
  size = 'md',
  variant = 'circle',
  text,
  className = '',
  'aria-label': ariaLabel,
}) => {
  return (
    <div className={`${styles['spin-container']} ${className}`}>
      <Spin size={size} variant={variant} aria-label={ariaLabel} />
      <div className={styles['spin-text']}>{text}</div>
    </div>
  );
};

/**
 * SpinOverlay - Overlay loading state for content containers
 */
export const SpinOverlay: React.FC<SpinOverlayProps> = ({
  size = 'lg',
  variant = 'circle',
  text,
  className = '',
}) => {
  return (
    <div className={`${styles['spin-overlay']} ${className}`}>
      <SpinContainer size={size} variant={variant} text={text} />
    </div>
  );
};

/**
 * SpinFullscreen - Full page loading overlay
 */
export const SpinFullscreen: React.FC<SpinFullscreenProps> = ({
  size = 'lg',
  variant = 'circle',
  text,
  className = '',
}) => {
  return (
    <div className={`${styles['spin-fullscreen']} ${className}`}>
      <SpinContainer size={size} variant={variant} text={text} />
    </div>
  );
};

Spin.displayName = 'Spin';
SpinContainer.displayName = 'SpinContainer';
SpinOverlay.displayName = 'SpinOverlay';
SpinFullscreen.displayName = 'SpinFullscreen';
