import React, {
  useState,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
  type ReactElement,
  isValidElement,
  cloneElement,
} from 'react';
import styles from './ButtonGroup.module.css';

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
export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  selectionMode = 'none',
  value: controlledValue,
  defaultValue,
  onChange,
  className = '',
  ...rest
}) => {
  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<string | string[] | undefined>(() => {
    if (defaultValue !== undefined) return defaultValue;
    return selectionMode === 'multiple' ? [] : undefined;
  });

  // Determine if controlled
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  // Check if a value is selected
  const isSelected = useCallback(
    (itemValue: string | undefined): boolean => {
      if (selectionMode === 'none' || itemValue === undefined) return false;

      if (selectionMode === 'multiple') {
        return Array.isArray(currentValue) && currentValue.includes(itemValue);
      }

      return currentValue === itemValue;
    },
    [selectionMode, currentValue]
  );

  // Handle button click
  const handleSelect = useCallback(
    (itemValue: string | undefined, originalOnClick?: (e: React.MouseEvent) => void) =>
      (e: React.MouseEvent) => {
        // Always call original onClick if exists
        originalOnClick?.(e);

        if (selectionMode === 'none' || itemValue === undefined) return;

        let newValue: string | string[] | undefined;

        if (selectionMode === 'single') {
          // Toggle off if clicking selected item, otherwise select new item
          newValue = currentValue === itemValue ? undefined : itemValue;
        } else {
          // Multiple selection mode
          const currentArray = Array.isArray(currentValue) ? currentValue : [];
          if (currentArray.includes(itemValue)) {
            newValue = currentArray.filter((v) => v !== itemValue);
          } else {
            newValue = [...currentArray, itemValue];
          }
        }

        if (!isControlled) {
          setInternalValue(newValue);
        }

        onChange?.(newValue);
      },
    [selectionMode, currentValue, isControlled, onChange]
  );

  // Clone children and inject selection props
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    const childProps = child.props as {
      value?: string;
      onClick?: (e: React.MouseEvent) => void;
      variant?: string;
      className?: string;
    };

    const itemValue = childProps.value;
    const selected = isSelected(itemValue);

    // If no selection mode or no value on child, return as-is
    if (selectionMode === 'none' || itemValue === undefined) {
      return child;
    }

    // Determine variant based on selection state
    const variant = selected ? 'primary' : childProps.variant || 'outline';

    return cloneElement(child as ReactElement<any>, {
      onClick: handleSelect(itemValue, childProps.onClick),
      variant,
      'aria-pressed': selected,
      className: `${childProps.className || ''} ${selected ? styles.selected : ''}`.trim(),
    });
  });

  const groupClasses = [styles['btn-group'], className].filter(Boolean).join(' ');

  return (
    <div className={groupClasses} role="group" {...rest}>
      {enhancedChildren}
    </div>
  );
};

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
