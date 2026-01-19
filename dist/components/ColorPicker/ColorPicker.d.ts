import { ReactNode } from 'react';
export type ColorPickerSize = 'sm' | 'md' | 'lg';
export interface ColorPickerProps {
    value?: string;
    defaultValue?: string;
    onChange?: (color: string) => void;
    label?: string;
    presets?: string[];
    showRecent?: boolean;
    compact?: boolean;
    size?: ColorPickerSize;
    allowCustom?: boolean;
    disabled?: boolean;
    className?: string;
    children?: ReactNode;
}
export declare const ColorPicker: {
    ({ value: controlledValue, defaultValue, onChange, label, presets, showRecent, compact, size, allowCustom, disabled, className, children, }: ColorPickerProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
