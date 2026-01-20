/**
 * DraggableRow
 * Draggable row for row reordering with handle
 */

import React, { memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import type { DraggableRowProps } from '../types';
import styles from '../DataGrid.module.css';

export const DraggableRow = memo<DraggableRowProps>(({
  id,
  children,
  disabled = false,
  className = '',
  style: rowStyle = {}
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style: React.CSSProperties = {
    ...rowStyle,
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative',
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${className} ${isDragging ? styles.draggingRow : ''}`}
      {...attributes}
      role="row"
    >
      {/* Drag handle cell */}
      <div className={styles.gridDragHandleCell} {...listeners} role="gridcell">
        <GripVertical size={16} className={styles.rowDragHandle} />
      </div>
      {children}
    </div>
  );
});

DraggableRow.displayName = 'DraggableRow';

export default DraggableRow;
