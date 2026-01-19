import { default as React, HTMLAttributes } from 'react';
export type CascadeSelectSize = 'sm' | 'md' | 'lg';
export interface CascadeOption {
    /**
     * Option label
     */
    label: string;
    /**
     * Option value
     */
    value: string;
    /**
     * Child options for nested selection
     */
    children?: CascadeOption[];
    /**
     * Disabled state
     */
    disabled?: boolean;
}
export interface CascadeSelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /**
     * Hierarchical options data
     */
    options: CascadeOption[];
    /**
     * Selected value path (array of values from root to leaf)
     */
    value?: string[];
    /**
     * Change handler - receives array of selected values
     */
    onChange?: (value: string[], labels: string[]) => void;
    /**
     * Placeholder text
     */
    placeholder?: string;
    /**
     * Size variant
     */
    size?: CascadeSelectSize;
    /**
     * Disabled state
     */
    disabled?: boolean;
    /**
     * Additional CSS class
     */
    className?: string;
}
/**
 * CascadeSelect component for hierarchical data selection
 *
 * @example
 * ```tsx
 * const locations = [
 *   {
 *     label: 'Building A',
 *     value: 'building-a',
 *     children: [
 *       { label: 'Floor 1', value: 'floor-1', children: [...] }
 *     ]
 *   }
 * ];
 *
 * <CascadeSelect
 *   options={locations}
 *   value={['building-a', 'floor-1', 'zone-a']}
 *   onChange={(values, labels) => console.log(values, labels)}
 *   placeholder="Select location..."
 * />
 * ```
 */
export declare const CascadeSelect: React.FC<CascadeSelectProps>;
export default CascadeSelect;
