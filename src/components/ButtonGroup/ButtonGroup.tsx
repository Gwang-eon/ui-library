import React, { type HTMLAttributes, type ReactNode } from 'react';
import styles from './ButtonGroup.module.css';

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Button elements to group together
   */
  children: ReactNode;

  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * ButtonGroup component groups multiple buttons together
 *
 * @example
 * ```tsx
 * <ButtonGroup>
 *   <Button variant="secondary">Left</Button>
 *   <Button variant="secondary">Center</Button>
 *   <Button variant="secondary">Right</Button>
 * </ButtonGroup>
 * ```
 */
export const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, className = '', ...rest }) => {
  const groupClasses = [styles['btn-group'], className].filter(Boolean).join(' ');

  return (
    <div className={groupClasses} role="group" {...rest}>
      {children}
    </div>
  );
};

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
