/**
 * SortableRow
 * Sortable row component using useSortable hook
 */

import React, { memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { SortableRowProps } from '../types';
import styles from '../DataGrid.module.css';

export const SortableRow = memo<SortableRowProps & { 'data-row-index'?: number; onClick?: () => void; onDoubleClick?: () => void }>(({
  id,
  children,
  className = '',
  style: rowStyle = {},
  ...props
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    ...rowStyle,
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isDragging ? 'var(--color-background-subtle)' : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${className} ${isDragging ? styles.draggingRow : ''}`}
      {...attributes}
      {...props}
      role="row"
    >
      {children}
    </div>
  );
});

SortableRow.displayName = 'SortableRow';

export default SortableRow;
