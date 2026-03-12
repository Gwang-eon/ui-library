/**
 * ColumnFilter
 * Main filter dispatcher component that routes to appropriate filter type
 */
import React from 'react';
import { Table as TanStackTable } from '@tanstack/react-table';
interface ColumnFilterLocale {
    filterAll?: string;
}
interface ColumnFilterProps {
    column: any;
    table: TanStackTable<any>;
    locale?: ColumnFilterLocale;
}
export declare const ColumnFilter: React.NamedExoticComponent<ColumnFilterProps>;
export default ColumnFilter;
