import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Search, X, ArrowLeft } from 'lucide-react';
import styles from './SearchBar.module.css';

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
export const SearchBar: React.FC<SearchBarProps> = ({
  value: controlledValue,
  placeholder = 'Search...',
  onChange,
  onSearch,
  onCancel,
  onFocus,
  onBlur,
  showCancel = false,
  showBackOnFocus = false,
  autoFocus = false,
  disabled = false,
  loading = false,
  debounce = 0,
  className = '',
  inputMode = 'search',
  'aria-label': ariaLabel,
}) => {
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (!isControlled) {
      setInternalValue(newValue);
    }

    if (debounce > 0) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        onChange?.(newValue);
      }, debounce);
    } else {
      onChange?.(newValue);
    }
  }, [isControlled, onChange, debounce]);

  const handleClear = useCallback(() => {
    if (!isControlled) {
      setInternalValue('');
    }
    onChange?.('');
    inputRef.current?.focus();
  }, [isControlled, onChange]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(currentValue);
    inputRef.current?.blur();
  }, [currentValue, onSearch]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    onFocus?.();
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onBlur?.();
  }, [onBlur]);

  const handleCancel = useCallback(() => {
    if (!isControlled) {
      setInternalValue('');
    }
    onChange?.('');
    inputRef.current?.blur();
    onCancel?.();
  }, [isControlled, onChange, onCancel]);

  const handleBack = useCallback(() => {
    inputRef.current?.blur();
    onCancel?.();
  }, [onCancel]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const showClearButton = currentValue.length > 0 && !loading;
  const showCancelButton = showCancel && (isFocused || currentValue.length > 0);
  const showBackArrow = showBackOnFocus && isFocused;

  return (
    <form
      className={`${styles.searchBar} ${isFocused ? styles.focused : ''} ${className}`}
      onSubmit={handleSubmit}
      role="search"
    >
      <div className={styles.inputWrapper}>
        {showBackArrow ? (
          <button
            type="button"
            className={styles.backButton}
            onClick={handleBack}
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
        ) : (
          <Search className={styles.searchIcon} size={20} />
        )}

        <input
          ref={inputRef}
          type="search"
          className={styles.input}
          value={currentValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          inputMode={inputMode}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label={ariaLabel || placeholder}
        />

        {loading && (
          <div className={styles.spinner} aria-label="Loading" />
        )}

        {showClearButton && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {showCancelButton && (
        <button
          type="button"
          className={styles.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

SearchBar.displayName = 'SearchBar';
