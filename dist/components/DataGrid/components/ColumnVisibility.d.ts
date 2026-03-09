/**
 * ColumnVisibilityDropdown
 * Dropdown for toggling column visibility
 * Uses Portal for proper rendering outside DataGrid container
 */
import React from 'react';
import { Table as TanStackTable } from '@tanstack/react-table';
interface ColumnVisibilityDropdownProps {
    table: TanStackTable<any>;
    toggleColumnsLabel?: string;
    toggleAllLabel?: string;
    buttonAriaLabel?: string;
}
export declare const ColumnVisibilityDropdown: React.NamedExoticComponent<ColumnVisibilityDropdownProps>;
export default ColumnVisibilityDropdown;
