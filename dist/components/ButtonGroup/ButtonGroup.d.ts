import { default as React, HTMLAttributes, ReactNode } from 'react';
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
export declare const ButtonGroup: React.FC<ButtonGroupProps>;
export default ButtonGroup;
