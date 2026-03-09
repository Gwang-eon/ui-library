/**
 * SingleSelectFilter
 * Single select dropdown filter for DataGrid columns
 */
import React from 'react';
import type { FilterOption } from '../types';
interface SingleSelectFilterProps {
    column: any;
    options?: FilterOption[];
}
export declare const SingleSelectFilter: React.FC<SingleSelectFilterProps>;
export default SingleSelectFilter;
