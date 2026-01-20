/**
 * RowDragHandle
 * Drag handle cell for row reordering
 */

import React, { memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { GripVertical } from 'lucide-react';
import styles from '../DataGrid.module.css';

interface RowDragHandleProps {
  rowId: string;
}

export const RowDragHandle = memo<RowDragHandleProps>(({ rowId }) => {
  const { attributes, listeners } = useSortable({ id: rowId });

  return (
    <div className={styles.gridDragHandleCell} {...attributes} {...listeners} role="gridcell">
      <GripVertical size={16} className={styles.rowDragHandle} />
    </div>
  );
});

RowDragHandle.displayName = 'RowDragHandle';

export default RowDragHandle;
