import React, { forwardRef } from 'react'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import styles from './InputBase.module.css'

export interface InputBaseProps extends Omit<InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'size'> {
  /** Input variant */
  variant?: 'default' | 'error' | 'success' | 'warning' | 'info'
  /** Input size */
  inputSize?: 'sm' | 'md' | 'lg'
  /** Whether the input is full width */
  fullWidth?: boolean
  /** Icon position */
  iconPosition?: 'left' | 'right' | 'both' | 'none'
  /** Whether the input is borderless */
  borderless?: boolean
  /** Whether to render as textarea */
  multiline?: boolean
  /** Additional class name */
  className?: string
}

/**
 * InputBase Component
 *
 * A base input component that uses atomic CSS patterns.
 * This component provides consistent styling across all input-based components.
 *
 * @example
 * ```tsx
 * <InputBase placeholder="Enter text" />
 * <InputBase variant="error" inputSize="lg" />
 * <InputBase multiline rows={4} />
 * ```
 */
export const InputBase = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputBaseProps>(
  (
    {
      variant = 'default',
      inputSize = 'md',
      fullWidth = true,
      iconPosition = 'none',
      borderless = false,
      multiline = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.inputBase,
      variant !== 'default' && styles[variant],
      inputSize !== 'md' && styles[`size-${inputSize}`],
      fullWidth && styles.fullWidth,
      iconPosition !== 'none' && styles[`icon-${iconPosition}`],
      borderless && styles.borderless,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    if (multiline) {
      return (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={classNames}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      )
    }

    return (
      <input
        ref={ref as React.Ref<HTMLInputElement>}
        className={classNames}
        {...(props as InputHTMLAttributes<HTMLInputElement>)}
      />
    )
  }
)

InputBase.displayName = 'InputBase'
