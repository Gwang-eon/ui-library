import type { ReactNode } from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Search, X, SearchX, Loader2 } from 'lucide-react';
import styles from './Autocomplete.module.css';

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

const AUTOCOMPLETE_ICON_SIZES: Record<AutocompleteSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

const AUTOCOMPLETE_EMPTY_ICON_SIZES: Record<AutocompleteSize, number> = {
  sm: 36,
  md: 48,
  lg: 56,
};

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
  /** Render dropdown via Portal to avoid overflow issues */
  portal?: boolean;
}

const defaultFilterFn = (option: AutocompleteOption, query: string): boolean => {
  const lowerQuery = query.toLowerCase();
  return (
    option.label.toLowerCase().includes(lowerQuery) ||
    option.value.toLowerCase().includes(lowerQuery) ||
    (option.description?.toLowerCase().includes(lowerQuery) ?? false)
  );
};

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
export const Autocomplete = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = 'Search...',
  loading = false,
  disabled = false,
  size = 'md',
  multiple = false,
  emptyMessage = 'No results found',
  minChars = 0,
  filterFn = defaultFilterFn,
  className = '',
  'aria-label': ariaLabel = 'Autocomplete',
  portal = false,
}: AutocompleteProps) => {
  // Controlled/uncontrolled value management
  const isControlled = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<string | string[]>(
    defaultValue || (multiple ? [] : '')
  );
  const currentValue = isControlled ? controlledValue : uncontrolledValue;

  // Component state
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filtered options
  const filteredOptions = inputValue.length >= minChars
    ? options.filter(option => filterFn(option, inputValue))
    : options;

  // Group options by category
  const groupedOptions: Record<string, AutocompleteOption[]> = {};
  filteredOptions.forEach(option => {
    const category = option.category || '';
    if (!groupedOptions[category]) {
      groupedOptions[category] = [];
    }
    groupedOptions[category].push(option);
  });

  // Selected values as array
  const selectedValues = Array.isArray(currentValue) ? currentValue : currentValue ? [currentValue] : [];

  // Handle selection
  const handleSelect = useCallback((option: AutocompleteOption) => {
    if (option.disabled) return;

    let newValue: string | string[];

    if (multiple) {
      const values = Array.isArray(currentValue) ? currentValue : [];
      if (values.includes(option.value)) {
        newValue = values.filter(v => v !== option.value);
      } else {
        newValue = [...values, option.value];
      }
    } else {
      newValue = option.value;
      setInputValue('');
      setIsOpen(false);
    }

    if (!isControlled) {
      setUncontrolledValue(newValue);
    }

    onChange?.(newValue);
  }, [currentValue, multiple, isControlled, onChange]);

  // Handle remove (for multiple selection)
  const handleRemove = useCallback((valueToRemove: string) => {
    if (!multiple) return;

    const values = Array.isArray(currentValue) ? currentValue : [];
    const newValue = values.filter(v => v !== valueToRemove);

    if (!isControlled) {
      setUncontrolledValue(newValue);
    }

    onChange?.(newValue);
  }, [currentValue, multiple, isControlled, onChange]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  // Handle input focus
  const handleInputFocus = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsOpen(true);
      e.preventDefault();
      return;
    }

    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;

      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : 0));
        break;

      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
        break;

      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;

      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        (!portal || (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)))
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [portal]);

  // Calculate dropdown position for portal mode
  useEffect(() => {
    if (portal && isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const dropdownHeight = 300;

      let top = rect.bottom + 4;
      const left = rect.left;
      const width = rect.width;

      if (top + dropdownHeight > window.innerHeight) {
        top = rect.top - dropdownHeight - 4;
      }

      setDropdownPosition({ top, left, width });
    }
  }, [portal, isOpen]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && dropdownRef.current) {
      const highlightedItem = dropdownRef.current.children[highlightedIndex] as HTMLElement;
      if (highlightedItem && highlightedItem.scrollIntoView) {
        highlightedItem.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex]);

  // Get selected options for display
  const selectedOptions = options.filter(opt => selectedValues.includes(opt.value));

  const sizeClass = size !== 'md' ? styles[`autocomplete${size.charAt(0).toUpperCase() + size.slice(1)}`] : '';
  const multipleClass = multiple ? styles.autocompleteMultiple : '';

  return (
    <div
      ref={containerRef}
      className={`${styles.autocomplete} ${sizeClass} ${multipleClass} ${className}`}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-owns="autocomplete-listbox"
      aria-label={ariaLabel}
    >
      <div className={`${styles.autocompleteInputWrapper} ${loading ? styles.autocompleteLoading : ''}`}>
        {multiple && selectedOptions.length > 0 && (
          <div className={styles.autocompleteTags}>
            {selectedOptions.map(option => (
              <span key={option.value} className="tag tag-sm tag-primary">
                {option.label}
                <button
                  type="button"
                  className="tag-remove"
                  onClick={() => handleRemove(option.value)}
                  aria-label={`Remove ${option.label}`}
                >
                  <X size={14} />
                </button>
              </span>
            ))}
            <input
              ref={inputRef}
              type="text"
              className={`${styles.autocompleteInput} ${styles.autocompleteInputInline}`}
              value={inputValue}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onKeyDown={handleKeyDown}
              placeholder={selectedOptions.length > 0 ? 'Add more...' : placeholder}
              disabled={disabled}
              aria-autocomplete="list"
              aria-controls="autocomplete-listbox"
              aria-activedescendant={
                highlightedIndex >= 0 ? `autocomplete-option-${highlightedIndex}` : undefined
              }
            />
          </div>
        )}

        {!multiple && (
          <>
            <input
              ref={inputRef}
              type="text"
              className={styles.autocompleteInput}
              value={inputValue}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              aria-autocomplete="list"
              aria-controls="autocomplete-listbox"
              aria-activedescendant={
                highlightedIndex >= 0 ? `autocomplete-option-${highlightedIndex}` : undefined
              }
            />
            {loading ? (
              <Loader2 className={styles.autocompleteSpinner} size={AUTOCOMPLETE_ICON_SIZES[size]} />
            ) : (
              <Search className={styles.autocompleteIcon} size={AUTOCOMPLETE_ICON_SIZES[size]} />
            )}
          </>
        )}
      </div>

      {isOpen && (() => {
        const dropdownContent = (
          <div
            ref={dropdownRef}
            className={`${styles.autocompleteDropdown} ${portal ? styles.portalDropdown : ''}`}
            role="listbox"
            id="autocomplete-listbox"
            aria-label="Suggestions"
            style={portal ? {
              position: 'fixed',
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
            } : undefined}
          >
            {loading ? (
              <div className={styles.autocompleteLoadingText}>Loading results...</div>
            ) : filteredOptions.length === 0 ? (
              <div className={styles.autocompleteEmpty}>
                <SearchX size={AUTOCOMPLETE_EMPTY_ICON_SIZES[size]} />
                <p>{emptyMessage}</p>
                <span>Try adjusting your search terms</span>
              </div>
            ) : (
              Object.entries(groupedOptions).map(([category, categoryOptions]) => (
                <div key={category}>
                  {category && <div className={styles.autocompleteCategory}>{category}</div>}
                  {categoryOptions.map((option) => {
                    const globalIndex = filteredOptions.indexOf(option);
                    const isHighlighted = globalIndex === highlightedIndex;
                    const isSelected = selectedValues.includes(option.value);

                    return (
                      <div
                        key={option.value}
                        id={`autocomplete-option-${globalIndex}`}
                        role="option"
                        aria-selected={isSelected}
                        aria-disabled={option.disabled}
                        className={`${styles.autocompleteItem} ${
                          option.description ? styles.autocompleteItemWithDesc : ''
                        } ${isHighlighted ? styles.autocompleteItemActive : ''} ${
                          option.disabled ? styles.autocompleteItemDisabled : ''
                        }`}
                        onClick={() => handleSelect(option)}
                        onMouseEnter={() => setHighlightedIndex(globalIndex)}
                      >
                        {option.description ? (
                          <>
                            {option.icon && (
                              <div className={styles.autocompleteItemIcon}>{option.icon}</div>
                            )}
                            <div className={styles.autocompleteItemContent}>
                              <div className={styles.autocompleteItemTitle}>{option.label}</div>
                              <div className={styles.autocompleteItemDescription}>
                                {option.description}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {option.icon}
                            <span>{option.label}</span>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        );

        return portal ? createPortal(dropdownContent, document.body) : dropdownContent;
      })()}
    </div>
  );
};

Autocomplete.displayName = 'Autocomplete';
