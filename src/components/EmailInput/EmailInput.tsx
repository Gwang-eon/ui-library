import React, { useState, useRef, useEffect, useMemo, useCallback, memo } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';
import styles from './EmailInput.module.css';

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

const ICON_SIZES: Record<EmailInputSize, number> = {
  sm: 14,
  md: 18,
  lg: 22,
};

interface DomainOptionProps {
  domain: string;
  isSelected: boolean;
  isFocused: boolean;
  onSelect: (domain: string) => void;
}

const DomainOption = memo<DomainOptionProps>(({ domain, isSelected, isFocused, onSelect }) => {
  const handleClick = useCallback(() => onSelect(domain), [domain, onSelect]);

  const className = [
    styles.option,
    isSelected && styles.selected,
    isFocused && styles.focused,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={className}
      onClick={handleClick}
      role="option"
      aria-selected={isSelected}
      data-value={domain}
    >
      {domain}
    </div>
  );
});

DomainOption.displayName = 'EmailInput.DomainOption';

export const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
  (
    {
      label,
      name,
      username: controlledUsername,
      defaultUsername = '',
      domain: controlledDomain,
      defaultDomain,
      domains,
      placeholder = '아이디 입력',
      size = 'md',
      state = 'default',
      disabled = false,
      readOnly = false,
      required = false,
      fullWidth = false,
      helperText,
      errorMessage,
      successMessage,
      warningMessage,
      onChange,
      onBlur,
      className = '',
      id,
      portal = false,
    },
    ref
  ) => {
    const inputId = id || `email-input-${React.useId()}`;

    // Controlled vs uncontrolled
    const isUsernameControlled = controlledUsername !== undefined;
    const isDomainControlled = controlledDomain !== undefined;

    const [internalUsername, setInternalUsername] = useState(defaultUsername);
    const [internalDomain, setInternalDomain] = useState(defaultDomain || domains[0] || '');
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
    const [dropUp, setDropUp] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentUsername = isUsernameControlled ? controlledUsername : internalUsername;
    const currentDomain = isDomainControlled ? controlledDomain : internalDomain;

    const buildValue = useCallback(
      (u: string, d: string): EmailInputValue => ({
        username: u,
        domain: d,
        email: u ? `${u}@${d}` : '',
      }),
      []
    );

    // Username change
    const handleUsernameChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUsername = e.target.value;
        if (!isUsernameControlled) setInternalUsername(newUsername);
        onChange?.(buildValue(newUsername, currentDomain));
      },
      [isUsernameControlled, currentDomain, onChange, buildValue]
    );

    // Domain select
    const handleDomainSelect = useCallback(
      (domain: string) => {
        if (!isDomainControlled) setInternalDomain(domain);
        onChange?.(buildValue(currentUsername, domain));
        setIsOpen(false);
        triggerRef.current?.focus();
      },
      [isDomainControlled, currentUsername, onChange, buildValue]
    );

    // Toggle dropdown
    const toggleDropdown = useCallback(() => {
      if (!disabled && !readOnly) {
        setIsOpen((prev) => !prev);
        setFocusedIndex(-1);
      }
    }, [disabled, readOnly]);

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;
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
    }, [isOpen, portal]);

    // Dropdown direction + portal position
    useEffect(() => {
      if (!isOpen || !triggerRef.current) {
        setDropUp(false);
        return;
      }
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropdownMaxHeight = 200;
      const shouldDropUp = spaceBelow < dropdownMaxHeight && spaceAbove > spaceBelow;
      setDropUp(shouldDropUp);

      if (portal) {
        setDropdownPosition({
          top: shouldDropUp ? rect.top - 4 : rect.bottom + 4,
          left: rect.left,
          width: rect.width,
        });
      }
    }, [portal, isOpen]);

    // Keyboard navigation on domain trigger
    const handleTriggerKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (disabled || readOnly) return;
        switch (event.key) {
          case 'Enter':
          case ' ':
            event.preventDefault();
            if (!isOpen) {
              setIsOpen(true);
            } else if (focusedIndex >= 0 && focusedIndex < domains.length) {
              handleDomainSelect(domains[focusedIndex]);
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
              setFocusedIndex((prev) => (prev < domains.length - 1 ? prev + 1 : prev));
            }
            break;
          case 'ArrowUp':
            event.preventDefault();
            if (isOpen) {
              setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
            }
            break;
          case 'Tab':
            if (isOpen) setIsOpen(false);
            break;
        }
      },
      [disabled, readOnly, isOpen, focusedIndex, domains, handleDomainSelect]
    );

    // Auto-scroll focused option
    useEffect(() => {
      if (isOpen && focusedIndex >= 0 && dropdownRef.current) {
        const el = dropdownRef.current.children[focusedIndex] as HTMLElement;
        el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }, [focusedIndex, isOpen]);

    // Message
    const message =
      state === 'error' ? errorMessage
        : state === 'success' ? successMessage
        : state === 'warning' ? warningMessage
        : helperText;

    // Class names
    const wrapperClasses = [
      styles.wrapper,
      fullWidth && styles['wrapper--fullWidth'],
      className,
    ].filter(Boolean).join(' ');

    const fieldClasses = [
      styles.field,
      styles[`field--${size}`],
      state !== 'default' && styles[`field--${state}`],
      disabled && styles['field--disabled'],
      readOnly && styles['field--readOnly'],
    ].filter(Boolean).join(' ');

    const domainTriggerClasses = [
      styles.domainTrigger,
      isOpen && styles['domainTrigger--open'],
    ].filter(Boolean).join(' ');

    const dropdownClasses = [
      styles.dropdown,
      isOpen && styles['dropdown--open'],
      dropUp && styles['dropdown--up'],
    ].filter(Boolean).join(' ');

    const messageClasses = [
      styles.message,
      state === 'error' && styles['message--error'],
      state === 'success' && styles['message--success'],
      state === 'warning' && styles['message--warning'],
    ].filter(Boolean).join(' ');

    const dropdownContent = useMemo(
      () =>
        domains.map((d, i) => (
          <DomainOption
            key={d}
            domain={d}
            isSelected={d === currentDomain}
            isFocused={i === focusedIndex}
            onSelect={handleDomainSelect}
          />
        )),
      [domains, currentDomain, focusedIndex, handleDomainSelect]
    );

    const dropdownElement = (
      <div
        ref={dropdownRef}
        className={`${dropdownClasses}${portal && isOpen ? ` ${styles['dropdown--portal']}` : ''}`}
        role="listbox"
        id={`${inputId}-domain-listbox`}
        style={
          portal && isOpen
            ? {
                position: 'fixed',
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                width: dropdownPosition.width,
                ...(dropUp && { transform: 'translateY(-100%)' }),
              }
            : undefined
        }
      >
        {dropdownContent}
      </div>
    );

    return (
      <div ref={containerRef} className={wrapperClasses}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        <div className={fieldClasses}>
          {/* Hidden input for form submission */}
          <input
            type="hidden"
            name={name}
            value={currentUsername ? `${currentUsername}@${currentDomain}` : ''}
          />

          {/* Username input */}
          <input
            ref={ref}
            id={inputId}
            type="text"
            className={styles.usernameInput}
            value={currentUsername}
            onChange={handleUsernameChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={state === 'error'}
            aria-describedby={message ? `${inputId}-message` : undefined}
            autoComplete="username"
          />

          {/* @ separator */}
          <span className={styles.separator}>@</span>

          {/* Domain selector */}
          <div className={styles.domainSelect}>
            <div
              ref={triggerRef}
              className={domainTriggerClasses}
              onClick={toggleDropdown}
              onKeyDown={handleTriggerKeyDown}
              tabIndex={disabled || readOnly ? -1 : 0}
              role="combobox"
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-controls={`${inputId}-domain-listbox`}
              aria-disabled={disabled || readOnly}
            >
              <span className={styles.domainLabel}>{currentDomain}</span>
              {!readOnly && (
                <ChevronDown className={styles.chevron} size={ICON_SIZES[size]} />
              )}
            </div>

            {portal && isOpen ? createPortal(dropdownElement, document.body) : dropdownElement}
          </div>
        </div>

        {message && (
          <span id={`${inputId}-message`} className={messageClasses}>
            {message}
          </span>
        )}
      </div>
    );
  }
);

EmailInput.displayName = 'EmailInput';
