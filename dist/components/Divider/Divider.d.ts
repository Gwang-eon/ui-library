import { default as React } from 'react';
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
export declare const Divider: React.FC<DividerProps>;
