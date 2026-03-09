/**
 * SortableRow
 * Sortable row component using useSortable hook
 */
import React from 'react';
import type { SortableRowProps } from '../types';
export declare const SortableRow: React.NamedExoticComponent<SortableRowProps & {
    'data-row-index'?: number;
    onClick?: () => void;
    onDoubleClick?: () => void;
}>;
export default SortableRow;
