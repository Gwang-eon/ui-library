import { default as React, ReactNode } from 'react';
export interface SelectOption {
    value: string;
    label: string;
    icon?: ReactNode;
    disabled?: boolean;
}
export interface SelectOptionGroup {
    label: string;
    options: SelectOption[];
}
export type SelectState = 'default' | 'error';
export type SelectSize = 'sm' | 'md' | 'lg';
export interface SelectProps {
    label?: string;
    name?: string;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    options?: SelectOption[];
    groups?: SelectOptionGroup[];
    state?: SelectState;
    size?: SelectSize;
    disabled?: boolean;
    helperText?: string;
    errorMessage?: string;
    required?: boolean;
    fullWidth?: boolean;
    onChange?: (value: string, option: SelectOption | null) => void;
    className?: string;
    id?: string;
}
export declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLDivElement>>;
