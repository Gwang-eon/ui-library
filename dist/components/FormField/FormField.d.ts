import React from 'react';
export interface FormFieldProps {
    /** Label text */
    label?: React.ReactNode;
    /** HTML for attribute - associates label with a form control */
    htmlFor?: string;
    /** Whether the field is required */
    required?: boolean;
    /** Helper or error message below the control */
    message?: React.ReactNode;
    /** Message variant */
    messageType?: 'default' | 'error' | 'success' | 'warning';
    /** Size variant - controls the control area min-height */
    size?: 'sm' | 'md' | 'lg';
    /** Layout direction */
    layout?: 'vertical' | 'horizontal';
    /** Full width */
    fullWidth?: boolean;
    /** Additional className for the root element */
    className?: string;
    /** Form control(s) to render */
    children: React.ReactNode;
}
export declare function FormField({ label, htmlFor, required, message, messageType, size, layout, fullWidth, className, children, }: FormFieldProps): import("react/jsx-runtime").JSX.Element;
