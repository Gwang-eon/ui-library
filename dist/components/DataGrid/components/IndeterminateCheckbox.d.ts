/**
 * IndeterminateCheckbox
 * Checkbox with indeterminate state support for row selection
 */
import React from 'react';
interface IndeterminateCheckboxProps {
    indeterminate?: boolean;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    className?: string;
    'aria-label'?: string;
}
export declare const IndeterminateCheckbox: React.NamedExoticComponent<IndeterminateCheckboxProps>;
/**
 * RadioButton
 * Radio button for single selection mode
 */
interface RadioButtonProps {
    checked?: boolean;
    onChange?: () => void;
    disabled?: boolean;
    className?: string;
    name?: string;
    'aria-label'?: string;
}
export declare const RadioButton: React.NamedExoticComponent<RadioButtonProps>;
export default IndeterminateCheckbox;
