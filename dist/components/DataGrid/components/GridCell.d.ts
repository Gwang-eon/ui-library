/**
 * GridCell
 * Memoized grid cell component for performance
 * Event handlers are delegated to grid body level
 */
import React from 'react';
interface GridCellProps {
    cellId: string;
    className: string;
    style: React.CSSProperties;
    rowIndex: number;
    columnIndex: number;
    children: React.ReactNode;
}
export declare const GridCell: React.NamedExoticComponent<GridCellProps>;
export default GridCell;
