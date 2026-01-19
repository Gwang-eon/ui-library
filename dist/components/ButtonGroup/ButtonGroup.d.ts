import React, { type HTMLAttributes, type ReactNode } from 'react';
export type SelectionMode = 'single' | 'multiple' | 'none';
export interface ButtonGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /**
     * Button elements to group together
     */
    children: ReactNode;
    /**
     * Selection mode
     * - 'none': No selection (default, just visual grouping)
     * - 'single': Single selection (like radio buttons)
     * - 'multiple': Multiple selection (like checkboxes)
     * @default 'none'
     */
    selectionMode?: SelectionMode;
    /**
     * Currently selected value(s) - controlled mode
     * - For 'single' mode: string or undefined
     * - For 'multiple' mode: string[]
     */
    value?: string | string[];
    /**
     * Default selected value(s) - uncontrolled mode
     */
    defaultValue?: string | string[];
    /**
     * Callback when selection changes
     * - For 'single' mode: (value: string | undefined) => void
     * - For 'multiple' mode: (values: string[]) => void
     */
    onChange?: (value: string | string[] | undefined) => void;
    /**
     * Additional CSS class
     */
    className?: string;
}
/**
 * ButtonGroup component groups multiple buttons together with optional selection
 *
 * @example
 * ```tsx
 * // Visual grouping only (no selection)
 * <ButtonGroup>
 *   <Button variant="outline">Left</Button>
 *   <Button variant="outline">Center</Button>
 *   <Button variant="outline">Right</Button>
 * </ButtonGroup>
 *
 * // Single selection
 * <ButtonGroup selectionMode="single" value={selected} onChange={setSelected}>
 *   <Button value="left" variant="outline">Left</Button>
 *   <Button value="center" variant="outline">Center</Button>
 *   <Button value="right" variant="outline">Right</Button>
 * </ButtonGroup>
 *
 * // Multiple selection
 * <ButtonGroup selectionMode="multiple" value={selected} onChange={setSelected}>
 *   <Button value="bold" variant="outline">B</Button>
 *   <Button value="italic" variant="outline">I</Button>
 *   <Button value="underline" variant="outline">U</Button>
 * </ButtonGroup>
 * ```
 */
export declare const ButtonGroup: React.FC<ButtonGroupProps>;
export default ButtonGroup;
