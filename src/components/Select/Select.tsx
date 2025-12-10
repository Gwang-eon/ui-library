import React, { useState, useRef, useEffect, useMemo, useCallback, memo, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}

export type SelectState = 'default' | 'error';
export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectProps {
  label?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  options?: SelectOption[];
  groups?: SelectOptionGroup[];
  state?: SelectState;
  size?: SelectSize;
  disabled?: boolean;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  fullWidth?: boolean;
  onChange?: (value: string, option: SelectOption | null) => void;
  className?: string;
  id?: string;
}

// Memoized Option component
interface OptionItemProps {
  option: SelectOption;
  isSelected: boolean;
  isFocused: boolean;
  onSelect: (option: SelectOption) => void;
}

const OptionItem = memo<OptionItemProps>(({ option, isSelected, isFocused, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(option);
  }, [option, onSelect]);

  const className = useMemo(() =>
    `${styles['custom-select-option']} ${isSelected ? styles.selected : ''} ${isFocused ? styles.focused : ''} ${option.disabled ? styles.disabled : ''}`,
    [isSelected, isFocused, option.disabled]
  );

  return (
    <div
      className={className}
      onClick={handleClick}
      role="option"
      aria-selected={isSelected}
      data-value={option.value}
    >
      {option.icon && <span className={styles['option-icon']}>{option.icon}</span>}
      <span>{option.label}</span>
    </div>
  );
});

OptionItem.displayName = 'Select.OptionItem';

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      name,
      value: controlledValue,
      defaultValue = '',
      placeholder = 'Select an option...',
      options = [],
      groups = [],
      state = 'default',
      size = 'md',
      disabled = false,
      helperText,
      errorMessage,
      required = false,
      fullWidth = false,
      onChange,
      className = '',
      id,
    },
    ref
  ) => {
    const selectId = id || `select-${React.useId()}`;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(controlledValue ?? defaultValue);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    // Determine if controlled or uncontrolled
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : selectedValue;

    // Flatten all options (from both options and groups)
    const allOptions = useMemo(() => {
      const opts: SelectOption[] = [...options];
      groups.forEach((group) => {
        opts.push(...group.options);
      });
      return opts.filter((opt) => !opt.disabled);
    }, [options, groups]);

    // Find selected option
    const selectedOption = useMemo(() =>
      allOptions.find((opt) => opt.value === currentValue),
      [allOptions, currentValue]
    );

    // Handle option click
    const handleOptionClick = useCallback((option: SelectOption) => {
      if (!option.disabled) {
        if (!isControlled) {
          setSelectedValue(option.value);
        }
        const foundOption = allOptions.find((opt) => opt.value === option.value) || null;
        onChange?.(option.value, foundOption);
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }, [isControlled, allOptions, onChange]);

    // Toggle dropdown
    const toggleDropdown = useCallback(() => {
      if (!disabled) {
        setIsOpen((prev) => !prev);
        setFocusedIndex(-1);
      }
    }, [disabled]);

    // Close dropdown when clicking outside
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    // Keyboard navigation
    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
      if (disabled) return;

      switch (event.key) {
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else if (focusedIndex >= 0 && focusedIndex < allOptions.length) {
            handleOptionClick(allOptions[focusedIndex]);
          }
          break;
        case 'Escape':
          event.preventDefault();
          setIsOpen(false);
          triggerRef.current?.focus();
          break;
        case 'ArrowDown':
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setFocusedIndex((prev) =>
              prev < allOptions.length - 1 ? prev + 1 : prev
            );
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (isOpen) {
            setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          }
          break;
        case 'Tab':
          if (isOpen) {
            setIsOpen(false);
          }
          break;
      }
    }, [disabled, isOpen, focusedIndex, allOptions, handleOptionClick]);

    // Auto-scroll focused option into view
    useEffect(() => {
      if (isOpen && focusedIndex >= 0 && dropdownRef.current) {
        const focusedElement = dropdownRef.current.children[focusedIndex] as HTMLElement;
        if (focusedElement) {
          focusedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }
    }, [focusedIndex, isOpen]);

    // Memoized ref callback
    const setRefs = useCallback((node: HTMLDivElement | null) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }, [ref]);

    // Memoized class names
    const containerClassName = useMemo(() =>
      `${styles['input-group']} ${fullWidth ? styles['input-full-width'] : ''} ${className}`,
      [fullWidth, className]
    );

    const selectClassName = useMemo(() =>
      `${styles['custom-select']} ${isOpen ? styles.open : ''} ${state === 'error' ? styles.error : ''} ${disabled ? styles.disabled : ''} ${styles[`select-${size}`] || ''}`,
      [isOpen, state, disabled, size]
    );

    const triggerClassName = useMemo(() =>
      `${styles['custom-select-trigger']} ${!selectedOption ? styles.placeholder : ''}`,
      [selectedOption]
    );

    // Render options from array
    const renderOptions = useCallback((opts: SelectOption[]) => {
      return opts.map((option) => {
        const globalIndex = allOptions.indexOf(option);
        const isSelected = option.value === currentValue;
        const isFocused = globalIndex === focusedIndex;

        return (
          <OptionItem
            key={option.value}
            option={option}
            isSelected={isSelected}
            isFocused={isFocused}
            onSelect={handleOptionClick}
          />
        );
      });
    }, [allOptions, currentValue, focusedIndex, handleOptionClick]);

    // Render dropdown content
    const dropdownContent = useMemo(() => {
      if (groups.length > 0) {
        return groups.map((group) => (
          <React.Fragment key={group.label}>
            <div className={styles['custom-select-group-label']}>{group.label}</div>
            {renderOptions(group.options)}
          </React.Fragment>
        ));
      }
      return renderOptions(options);
    }, [groups, options, renderOptions]);

    // Native select options
    const nativeOptions = useMemo(() =>
      allOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      )),
      [allOptions]
    );

    // Noop handler for native select
    const noop = useCallback(() => {}, []);

    return (
      <div ref={setRefs} className={containerClassName}>
        {label && (
          <label htmlFor={selectId} className={styles['input-label']}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        <div className={selectClassName}>
          {/* Hidden native select for form submission */}
          <select
            id={selectId}
            name={name}
            value={currentValue}
            onChange={noop}
            className={styles['native-select']}
            disabled={disabled}
            required={required}
            tabIndex={-1}
            aria-hidden="true"
          >
            <option value="">{placeholder}</option>
            {nativeOptions}
          </select>

          {/* Custom trigger */}
          <div
            ref={triggerRef}
            className={triggerClassName}
            onClick={toggleDropdown}
            onKeyDown={handleKeyDown}
            tabIndex={disabled ? -1 : 0}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={`${selectId}-listbox`}
            aria-labelledby={label ? `${selectId}-label` : undefined}
            aria-disabled={disabled}
          >
            <span className={styles['trigger-content']}>
              {selectedOption?.icon && (
                <span className={styles['option-icon']}>{selectedOption.icon}</span>
              )}
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronDown className={styles['select-icon']} size={18} />
          </div>

          {/* Dropdown */}
          <div
            ref={dropdownRef}
            className={styles['custom-select-dropdown']}
            role="listbox"
            id={`${selectId}-listbox`}
            aria-labelledby={label ? `${selectId}-label` : undefined}
          >
            {dropdownContent}
          </div>
        </div>

        {/* Helper text or error message */}
        {state === 'error' && errorMessage && (
          <span className={`${styles['input-message']} ${styles['input-error']}`}>
            {errorMessage}
          </span>
        )}
        {state !== 'error' && helperText && (
          <span className={styles['input-message']}>{helperText}</span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
