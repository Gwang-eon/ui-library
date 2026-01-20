/**
 * GridRow
 * Memoized grid row component for performance
 */

import React, { memo } from 'react';

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

export const GridRow = memo<GridRowProps>(({
  rowId,
  className,
  style,
  isSelected,
  rowIndex,
  children,
  onClick,
  onDoubleClick,
}) => {
  return (
    <div
      className={className}
      role="row"
      aria-selected={isSelected}
      data-row-index={rowIndex}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      style={style}
    >
      {children}
    </div>
  );
});

GridRow.displayName = 'GridRow';

export default GridRow;
