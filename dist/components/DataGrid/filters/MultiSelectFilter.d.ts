/**
 * MultiSelectFilter
 * Multi-select checkbox filter for DataGrid columns
 */
import React from 'react';
import type { FilterOption } from '../types';
interface MultiSelectFilterProps {
    column: any;
    options?: FilterOption[];
}
export declare const MultiSelectFilter: React.FC<MultiSelectFilterProps>;
export default MultiSelectFilter;
