/**
 * GridRow
 * Memoized grid row component for performance
 */
import React from 'react';
interface GridRowProps {
    rowId: string;
    className: string;
    style?: React.CSSProperties;
    isSelected: boolean;
    rowIndex: number;
    children: React.ReactNode;
    onClick?: () => void;
    onDoubleClick?: () => void;
}
export declare const GridRow: React.NamedExoticComponent<GridRowProps>;
export default GridRow;
