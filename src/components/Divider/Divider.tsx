import React from 'react';
import styles from './Divider.module.css';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerThickness = 'thin' | 'medium' | 'thick';
export type DividerStyle = 'solid' | 'dashed' | 'dotted';
export type DividerSpacing = 'sm' | 'md' | 'lg';
export type DividerTextAlign = 'center' | 'left' | 'right';

export interface DividerProps {
  /** Orientation of the divider */
  orientation?: DividerOrientation;
  /** Thickness of the divider line */
  thickness?: DividerThickness;
  /** Style of the divider line */
  lineStyle?: DividerStyle;
  /** Spacing around the divider */
  spacing?: DividerSpacing;
  /** Text or icon to display in the divider */
  children?: React.ReactNode;
  /** Text alignment when children are provided */
  textAlign?: DividerTextAlign;
  /** Additional CSS class */
  className?: string;
}

/**
 * Divider - Visual separator
 *
 * Visual separator for grouping and organizing content sections.
 */
export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  thickness,
  lineStyle = 'solid',
  spacing = 'md',
  children,
  textAlign = 'center',
  className = '',
}) => {
  const hasChildren = Boolean(children);

  const dividerClasses = [
    styles.divider,
    orientation === 'vertical' && styles['divider-vertical'],
    thickness && styles[`divider-${thickness}`],
    lineStyle !== 'solid' && styles[`divider-${lineStyle}`],
    spacing && styles[`divider-spacing-${spacing}`],
    hasChildren && styles['divider-with-text'],
    hasChildren && textAlign !== 'center' && styles[`divider-text-${textAlign}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (hasChildren && orientation === 'horizontal') {
    return (
      <div className={dividerClasses} role="separator" aria-label="Divider with text">
        <span className={styles['divider-text']}>{children}</span>
      </div>
    );
  }

  return <div className={dividerClasses} role="separator" aria-label="Divider" />;
};

Divider.displayName = 'Divider';
