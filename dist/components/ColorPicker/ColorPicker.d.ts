import type { ReactNode } from 'react';
export interface ColorPickerProps {
    value?: string;
    defaultValue?: string;
    onChange?: (color: string) => void;
    label?: string;
    presets?: string[];
    showRecent?: boolean;
    compact?: boolean;
    size?: 'sm' | 'md';
    allowCustom?: boolean;
    disabled?: boolean;
    className?: string;
    children?: ReactNode;
}
export declare const ColorPicker: {
    ({ value: controlledValue, defaultValue, onChange, label, presets, showRecent, compact, size, allowCustom, disabled, className, children, }: ColorPickerProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
