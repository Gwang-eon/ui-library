/**
 * DraggableHeaderCell
 * Draggable header cell for column reordering
 */

import React, { memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import type { DraggableHeaderCellProps } from '../types';
import styles from '../DataGrid.module.css';

export const DraggableHeaderCell = memo<DraggableHeaderCellProps>(({
  id,
  children,
  disabled = false
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
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: disabled ? 'default' : 'grab',
    position: 'relative',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.draggableHeader} ${isDragging ? styles.dragging : ''}`}
      {...attributes}
      {...listeners}
    >
      {!disabled && (
        <span className={styles.dragHandle}>
          <GripVertical size={14} />
        </span>
      )}
      {children}
    </div>
  );
});

DraggableHeaderCell.displayName = 'DraggableHeaderCell';

export default DraggableHeaderCell;
