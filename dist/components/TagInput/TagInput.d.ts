import React, { type ReactNode } from 'react';
export type TagInputSize = 'sm' | 'md' | 'lg';
export type TagInputState = 'default' | 'error';
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
export declare const TagInput: React.FC<TagInputProps>;
export default TagInput;
