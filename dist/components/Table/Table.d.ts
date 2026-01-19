import { default as React, ReactNode } from 'react';
export type SortDirection = 'asc' | 'desc' | null;
export interface TableContextValue {
    striped?: boolean;
    compact?: boolean;
    stickyHeader?: boolean;
    loading?: boolean;
}
export interface TableProps {
    children: ReactNode;
    striped?: boolean;
    compact?: boolean;
    stickyHeader?: boolean;
    loading?: boolean;
    className?: string;
}
export interface TableHeadProps {
    children: ReactNode;
    className?: string;
}
export interface TableBodyProps {
    children: ReactNode;
    className?: string;
}
export interface TableRowProps {
    children: ReactNode;
    selected?: boolean;
    onClick?: () => void;
    className?: string;
}
export interface TableCellProps {
    children: ReactNode;
    width?: string;
    align?: 'left' | 'center' | 'right';
    className?: string;
}
export interface TableHeaderCellProps {
    children: ReactNode;
    sortable?: boolean;
    sortDirection?: SortDirection;
    onSort?: () => void;
    width?: string;
    align?: 'left' | 'center' | 'right';
    className?: string;
}
export interface ExpandableRowProps {
    children: ReactNode;
    expandedContent: ReactNode;
    defaultExpanded?: boolean;
    className?: string;
}
export interface TableEmptyStateProps {
    icon?: ReactNode;
    title: string;
    description?: string;
    action?: ReactNode;
}
declare const TableContainer: React.NamedExoticComponent<{
    children: ReactNode;
    className?: string;
}>;
declare const TableWrapper: React.NamedExoticComponent<{
    children: ReactNode;
    className?: string;
}>;
declare const TableHead: React.NamedExoticComponent<TableHeadProps>;
declare const TableBody: React.NamedExoticComponent<TableBodyProps>;
declare const TableRow: React.NamedExoticComponent<TableRowProps>;
declare const TableCell: React.NamedExoticComponent<TableCellProps>;
declare const TableHeaderCell: React.NamedExoticComponent<TableHeaderCellProps>;
declare const ExpandableRow: React.NamedExoticComponent<ExpandableRowProps>;
declare const TableEmptyState: React.NamedExoticComponent<TableEmptyStateProps>;
declare const Table: React.FC<TableProps> & {
    Container: typeof TableContainer;
    Wrapper: typeof TableWrapper;
    Head: typeof TableHead;
    Body: typeof TableBody;
    Row: typeof TableRow;
    Cell: typeof TableCell;
    HeaderCell: typeof TableHeaderCell;
    ExpandableRow: typeof ExpandableRow;
    EmptyState: typeof TableEmptyState;
};
export { Table };
