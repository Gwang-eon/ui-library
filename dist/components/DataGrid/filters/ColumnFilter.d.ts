/**
 * ColumnFilter
 * Main filter dispatcher component that routes to appropriate filter type
 */
import React from 'react';
import { Table as TanStackTable } from '@tanstack/react-table';
interface ColumnFilterProps {
    column: any;
    table: TanStackTable<any>;
}
export declare const ColumnFilter: React.NamedExoticComponent<ColumnFilterProps>;
export default ColumnFilter;
