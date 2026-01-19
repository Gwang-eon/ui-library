import { default as React, InputHTMLAttributes } from 'react';
export type RadioSize = 'sm' | 'md' | 'lg';
export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    label?: string;
    helperText?: string;
    error?: boolean;
    errorMessage?: string;
    size?: RadioSize;
}
export declare const Radio: React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLInputElement>>;
