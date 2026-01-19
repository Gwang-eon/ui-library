import type { ReactNode } from 'react';
export interface AutocompleteOption {
    /** Unique value for the option */
    value: string;
    /** Display label */
    label: string;
    /** Optional icon */
    icon?: ReactNode;
    /** Optional description */
    description?: string;
    /** Optional category */
    category?: string;
    /** Disabled state */
    disabled?: boolean;
}
export type AutocompleteSize = 'sm' | 'md' | 'lg';
export interface AutocompleteProps {
    /** Available options */
    options: AutocompleteOption[];
    /** Selected value (controlled) */
    value?: string | string[];
    /** Default value (uncontrolled) */
    defaultValue?: string | string[];
    /** Change handler */
    onChange?: (value: string | string[]) => void;
    /** Placeholder text */
    placeholder?: string;
    /** Loading state */
    loading?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Size variant */
    size?: AutocompleteSize;
    /** Allow multiple selection */
    multiple?: boolean;
    /** Empty state message */
    emptyMessage?: string;
    /** Minimum characters before showing suggestions */
    minChars?: number;
    /** Filter function (default: case-insensitive includes) */
    filterFn?: (option: AutocompleteOption, query: string) => boolean;
    /** Additional CSS class */
    className?: string;
    /** ARIA label */
    'aria-label'?: string;
}
/**
 * Autocomplete Component
 *
 * Input field with suggestions and search functionality.
 * Supports single/multiple selection, categories, loading states, and keyboard navigation.
 *
 * @example
 * ```tsx
 * <Autocomplete
 *   options={devices}
 *   placeholder="Search devices..."
 *   onChange={(value) => console.log(value)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Multiple selection
 * <Autocomplete
 *   options={sensors}
 *   multiple
 *   placeholder="Select sensors..."
 *   onChange={(values) => console.log(values)}
 * />
 * ```
 */
export declare const Autocomplete: {
    ({ options, value: controlledValue, defaultValue, onChange, placeholder, loading, disabled, size, multiple, emptyMessage, minChars, filterFn, className, "aria-label": ariaLabel, }: AutocompleteProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
