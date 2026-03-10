import React from 'react';
export interface EmailInputValue {
    username: string;
    domain: string;
    email: string;
}
export type EmailInputSize = 'sm' | 'md' | 'lg';
export type EmailInputState = 'default' | 'error' | 'success' | 'warning';
export interface EmailInputProps {
    /** Label text */
    label?: string;
    /** Input name (for form submission) */
    name?: string;
    /** Current username value (controlled) */
    username?: string;
    /** Default username value (uncontrolled) */
    defaultUsername?: string;
    /** Current domain value (controlled) */
    domain?: string;
    /** Default domain value (uncontrolled) */
    defaultDomain?: string;
    /** List of selectable domains */
    domains: string[];
    /** Input placeholder for username field */
    placeholder?: string;
    /** Size variant */
    size?: EmailInputSize;
    /** Validation state */
    state?: EmailInputState;
    /** Whether the field is disabled */
    disabled?: boolean;
    /** Whether the field is read-only */
    readOnly?: boolean;
    /** Whether the field is required */
    required?: boolean;
    /** Full width */
    fullWidth?: boolean;
    /** Helper text */
    helperText?: string;
    /** Error message */
    errorMessage?: string;
    /** Success message */
    successMessage?: string;
    /** Warning message */
    warningMessage?: string;
    /** Called when username or domain changes */
    onChange?: (value: EmailInputValue) => void;
    /** Called when username input blurs */
    onBlur?: (e: React.FocusEvent) => void;
    /** Additional className for the wrapper */
    className?: string;
    /** HTML id */
    id?: string;
    /** Render domain dropdown via Portal */
    portal?: boolean;
}
export declare const EmailInput: React.ForwardRefExoticComponent<EmailInputProps & React.RefAttributes<HTMLInputElement>>;
