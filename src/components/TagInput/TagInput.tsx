import React, { useState, useRef, useCallback, type KeyboardEvent, type ReactNode } from 'react';
import { X } from 'lucide-react';
import styles from './TagInput.module.css';

export type TagInputSize = 'sm' | 'md' | 'lg';
export type TagInputState = 'default' | 'error';

const TAG_ICON_SIZES: Record<TagInputSize, number> = {
  sm: 12,
  md: 14,
  lg: 16,
};

export interface TagInputProps {
  /** Current tags */
  value?: string[];
  /** Default tags (uncontrolled) */
  defaultValue?: string[];
  /** Callback when tags change */
  onChange?: (tags: string[]) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  errorMessage?: string;
  /** Input state */
  state?: TagInputState;
  /** Input size */
  size?: TagInputSize;
  /** Disabled state */
  disabled?: boolean;
  /** Required indicator */
  required?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Maximum number of tags */
  maxTags?: number;
  /** Allow duplicate tags */
  allowDuplicates?: boolean;
  /** Delimiter characters that trigger tag creation */
  delimiters?: string[];
  /** Validate tag before adding */
  validateTag?: (tag: string) => boolean;
  /** Custom tag renderer */
  renderTag?: (tag: string, index: number, onRemove: () => void) => ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Input id */
  id?: string;
  /** Input name */
  name?: string;
}

/**
 * TagInput - Input field with tag support for multi-value entry
 *
 * @example
 * ```tsx
 * <TagInput
 *   label="Tags"
 *   placeholder="Add tags..."
 *   value={tags}
 *   onChange={setTags}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With validation
 * <TagInput
 *   label="Emails"
 *   placeholder="Enter email addresses..."
 *   validateTag={(tag) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tag)}
 *   delimiters={[',', ' ']}
 * />
 * ```
 */
export const TagInput: React.FC<TagInputProps> = ({
  value: controlledValue,
  defaultValue = [],
  onChange,
  placeholder = 'Type and press Enter...',
  label,
  helperText,
  errorMessage,
  state = 'default',
  size = 'md',
  disabled = false,
  required = false,
  fullWidth = false,
  maxTags,
  allowDuplicates = false,
  delimiters = ['Enter'],
  validateTag,
  renderTag,
  className = '',
  id,
  name,
}) => {
  const isControlled = controlledValue !== undefined;
  const [uncontrolledTags, setUncontrolledTags] = useState<string[]>(defaultValue);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = id || `tag-input-${React.useId()}`;

  const tags = isControlled ? controlledValue : uncontrolledTags;

  const updateTags = useCallback((newTags: string[]) => {
    if (!isControlled) {
      setUncontrolledTags(newTags);
    }
    onChange?.(newTags);
  }, [isControlled, onChange]);

  const addTag = useCallback((tag: string) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;

    // Check max tags
    if (maxTags !== undefined && tags.length >= maxTags) return;

    // Check duplicates
    if (!allowDuplicates && tags.includes(trimmedTag)) return;

    // Validate tag
    if (validateTag && !validateTag(trimmedTag)) return;

    updateTags([...tags, trimmedTag]);
    setInputValue('');
  }, [tags, maxTags, allowDuplicates, validateTag, updateTags]);

  const removeTag = useCallback((index: number) => {
    if (disabled) return;
    const newTags = [...tags];
    newTags.splice(index, 1);
    updateTags(newTags);
  }, [tags, disabled, updateTags]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    // Handle delimiter keys
    if (delimiters.includes(e.key)) {
      if (e.key !== 'Enter' || inputValue.trim()) {
        e.preventDefault();
        addTag(inputValue);
      }
      return;
    }

    // Handle backspace to remove last tag
    if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  }, [delimiters, inputValue, addTag, tags.length, removeTag]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Check for delimiter characters in input
    const delimiterChars = delimiters.filter(d => d.length === 1);
    if (delimiterChars.length > 0) {
      const lastChar = value.slice(-1);
      if (delimiterChars.includes(lastChar)) {
        addTag(value.slice(0, -1));
        return;
      }
    }

    setInputValue(value);
  }, [delimiters, addTag]);

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text');
    const delimiterChars = delimiters.filter(d => d.length === 1);

    if (delimiterChars.length > 0) {
      const regex = new RegExp(`[${delimiterChars.map(d => d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('')}]`);
      const pastedTags = pastedText.split(regex).filter(Boolean);

      if (pastedTags.length > 1) {
        e.preventDefault();
        pastedTags.forEach(tag => addTag(tag));
        return;
      }
    }
  }, [delimiters, addTag]);

  const handleContainerClick = useCallback(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  const containerClassName = [
    styles.tagInput,
    styles[`tagInput-${size}`],
    isFocused && styles.focused,
    state === 'error' && styles.error,
    disabled && styles.disabled,
    fullWidth && styles.fullWidth,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div
        className={containerClassName}
        onClick={handleContainerClick}
      >
        {tags.map((tag, index) => (
          renderTag ? (
            <React.Fragment key={`${tag}-${index}`}>
              {renderTag(tag, index, () => removeTag(index))}
            </React.Fragment>
          ) : (
            <span key={`${tag}-${index}`} className={styles.tag}>
              <span className={styles.tagText}>{tag}</span>
              {!disabled && (
                <button
                  type="button"
                  className={styles.tagRemove}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTag(index);
                  }}
                  aria-label={`Remove ${tag}`}
                >
                  <X size={TAG_ICON_SIZES[size]} />
                </button>
              )}
            </span>
          )
        ))}

        <input
          ref={inputRef}
          type="text"
          id={inputId}
          name={name}
          className={styles.input}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={tags.length === 0 ? placeholder : ''}
          disabled={disabled}
          aria-describedby={helperText || errorMessage ? `${inputId}-message` : undefined}
        />
      </div>

      {state === 'error' && errorMessage && (
        <span id={`${inputId}-message`} className={`${styles.message} ${styles.messageError}`}>
          {errorMessage}
        </span>
      )}
      {state !== 'error' && helperText && (
        <span id={`${inputId}-message`} className={styles.message}>
          {helperText}
        </span>
      )}
    </div>
  );
};

TagInput.displayName = 'TagInput';

export default TagInput;
