import React from 'react';
export type ToggleSize = 'sm' | 'md' | 'lg';
export interface ToggleProps {
    /**
     * Label text displayed next to the toggle
     */
    label?: string;
    /**
     * Size variant of the toggle
     */
    size?: ToggleSize;
    /**
     * Whether the toggle is checked
     */
    checked?: boolean;
    /**
     * Default checked state (for uncontrolled component)
     */
    defaultChecked?: boolean;
    /**
     * Whether the toggle is disabled
     */
    disabled?: boolean;
    /**
     * Name attribute for form submission
     */
    name?: string;
    /**
     * ID attribute
     */
    id?: string;
    /**
     * Callback when toggle state changes
     */
    onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
    /**
     * Additional CSS class
     */
    className?: string;
    /**
     * Accessible label (overrides label prop for screen readers)
     */
    'aria-label'?: string;
    /**
     * ID of element that labels this toggle
     */
    'aria-labelledby'?: string;
}
export declare const Toggle: React.ForwardRefExoticComponent<ToggleProps & React.RefAttributes<HTMLInputElement>>;
