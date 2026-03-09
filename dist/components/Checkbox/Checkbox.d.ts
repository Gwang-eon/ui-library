import React, { type InputHTMLAttributes } from 'react';
export type CheckboxSize = 'sm' | 'md' | 'lg';
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    label?: string;
    helperText?: string;
    error?: boolean;
    errorMessage?: string;
    indeterminate?: boolean;
    size?: CheckboxSize;
}
export declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;
