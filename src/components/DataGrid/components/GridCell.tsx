/**
 * GridCell
 * Memoized grid cell component for performance
 * Event handlers are delegated to grid body level
 */

import React, { memo } from 'react';

interface GridCellProps {
  cellId: string;
  className: string;
  style: React.CSSProperties;
  rowIndex: number;
  columnIndex: number;
  children: React.ReactNode;
}

export const GridCell = memo<GridCellProps>(({
  cellId,
  className,
  style,
  rowIndex,
  columnIndex,
  children,
}) => {
  return (
    <div
      className={className}
      style={style}
      role="gridcell"
      data-row-index={rowIndex}
      data-column-index={columnIndex}
    >
      {children}
    </div>
  );
});

GridCell.displayName = 'GridCell';

export default GridCell;
