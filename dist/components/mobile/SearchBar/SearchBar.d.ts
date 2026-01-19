import { default as React } from 'react';
export interface SearchBarProps {
    /** Current search value */
    value?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Change handler */
    onChange?: (value: string) => void;
    /** Submit handler (Enter key or search button) */
    onSearch?: (value: string) => void;
    /** Cancel/Back button handler */
    onCancel?: () => void;
    /** Focus handler */
    onFocus?: () => void;
    /** Blur handler */
    onBlur?: () => void;
    /** Show cancel button */
    showCancel?: boolean;
    /** Show back arrow instead of search icon when focused */
    showBackOnFocus?: boolean;
    /** Auto focus on mount */
    autoFocus?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Loading state (shows spinner) */
    loading?: boolean;
    /** Debounce delay in ms */
    debounce?: number;
    /** Additional className */
    className?: string;
    /** Input type for keyboard */
    inputMode?: 'search' | 'text' | 'none';
    /** ARIA label */
    'aria-label'?: string;
}
/**
 * SearchBar Component
 *
 * Mobile-optimized search input with iOS/Android native feel.
 * Supports debouncing, loading states, and responsive animations.
 *
 * @example
 * ```tsx
 * <SearchBar
 *   placeholder="Search devices..."
 *   onSearch={handleSearch}
 *   showCancel
 *   debounce={300}
 * />
 * ```
 */
export declare const SearchBar: React.FC<SearchBarProps>;
