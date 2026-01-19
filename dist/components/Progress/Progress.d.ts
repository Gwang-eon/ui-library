import { default as React } from 'react';
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
declare const Progress: ({ children, size, className, }: ProgressProps) => import("react/jsx-runtime").JSX.Element;
declare const ProgressBar: ({ value, variant, indeterminate, striped, animated, className, "aria-label": ariaLabel, }: ProgressBarProps) => import("react/jsx-runtime").JSX.Element;
declare const ProgressCircular: ({ value, size, strokeWidth, variant, showLabel, className, "aria-label": ariaLabel, }: ProgressCircularProps) => import("react/jsx-runtime").JSX.Element;
declare const ProgressSpinner: ({ size, variant, className, "aria-label": ariaLabel, }: ProgressSpinnerProps) => import("react/jsx-runtime").JSX.Element;
export { Progress, ProgressBar, ProgressCircular, ProgressSpinner };
