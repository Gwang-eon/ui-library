import type { ReactNode, DragEvent } from 'react';
import { useState, useRef } from 'react';
import { ChevronUp, ChevronDown, GripVertical } from 'lucide-react';
import styles from './OrderList.module.css';

export interface OrderListItemProps {
  /** Unique identifier for the item */
  id?: string;
  /** Item content */
  children: ReactNode;
  /** Leading icon */
  icon?: ReactNode;
  /** Trailing badge or status indicator */
  badge?: ReactNode;
  /** Whether the item is selected (when selectable) */
  selected?: boolean;
  /** Callback when selection changes */
  onSelect?: (selected: boolean) => void;
  /** Custom className */
  className?: string;
}

export interface OrderListProps {
  /** List title */
  title?: ReactNode;
  /** Header actions */
  actions?: ReactNode;
  /** List items */
  children: ReactNode;
  /** Enable drag and drop */
  draggable?: boolean;
  /** Enable item selection with checkboxes */
  selectable?: boolean;
  /** Compact variant */
  compact?: boolean;
  /** Callback when order changes */
  onReorder?: (items: ReactNode[]) => void;
  /** Custom className */
  className?: string;
}

/**
 * Order List Item Component
 *
 * Individual item in an OrderList that can be reordered.
 *
 * @example
 * ```tsx
 * <OrderList.Item icon={<CheckCircle />}>
 *   System Backup
 * </OrderList.Item>
 * ```
 */
export const OrderListItem = (_props: OrderListItemProps) => {
  // This component is primarily for type safety and structure
  // The actual rendering is handled by the parent OrderList
  return null;
};

OrderListItem.displayName = 'OrderList.Item';

/**
 * Order List Component
 *
 * A reorderable list with move up/down controls and optional drag-and-drop functionality.
 * Ideal for managing task priorities, automation rules, device order, and execution queues.
 *
 * @example
 * ```tsx
 * <OrderList title="Task Priority" draggable>
 *   <OrderList.Item icon={<CheckCircle />}>System Backup</OrderList.Item>
 *   <OrderList.Item icon={<Shield />}>Security Update</OrderList.Item>
 *   <OrderList.Item icon={<Activity />}>Performance Check</OrderList.Item>
 * </OrderList>
 * ```
 *
 * @example
 * ```tsx
 * // With selection
 * <OrderList title="Device Priority" selectable>
 *   <OrderList.Item icon={<Cpu />}>Main Controller</OrderList.Item>
 *   <OrderList.Item icon={<Thermometer />}>Temperature Sensor</OrderList.Item>
 * </OrderList>
 * ```
 */
export const OrderList = ({
  title,
  actions,
  children,
  draggable = false,
  selectable = false,
  compact = false,
  onReorder,
  className,
}: OrderListProps) => {
  // Convert children to array for manipulation
  const childrenArray = Array.isArray(children) ? children : children ? [children] : [];

  const [items, setItems] = useState<ReactNode[]>(childrenArray);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const dragOverIndex = useRef<number | null>(null);

  // Update items when children change
  const currentItems = childrenArray.length > 0 ? childrenArray : items;

  const containerClasses = [
    styles.orderList,
    draggable && styles.orderListDraggable,
    selectable && styles.orderListSelectable,
    compact && styles.orderListCompact,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const moveItem = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= currentItems.length) return;

    const newItems = [...currentItems];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);

    setItems(newItems);
    onReorder?.(newItems);
  };

  const handleMoveUp = (index: number) => {
    moveItem(index, index - 1);
  };

  const handleMoveDown = (index: number) => {
    moveItem(index, index + 1);
  };

  // Drag and Drop handlers
  const handleDragStart = (e: DragEvent<HTMLLIElement>, index: number) => {
    setDraggedIndex(index);
    e.currentTarget.classList.add(styles.orderListItemDragging);
  };

  const handleDragEnd = (e: DragEvent<HTMLLIElement>) => {
    e.currentTarget.classList.remove(styles.orderListItemDragging);
    setDraggedIndex(null);
    dragOverIndex.current = null;
  };

  const handleDragOver = (e: DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    dragOverIndex.current = index;
  };

  const handleDrop = (e: DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    moveItem(draggedIndex, index);
    setDraggedIndex(null);
    dragOverIndex.current = null;
  };

  return (
    <div className={containerClasses}>
      {(title || actions) && (
        <div className={styles.orderListHeader}>
          {title && <h3>{title}</h3>}
          {actions && <div className={styles.orderListHeaderActions}>{actions}</div>}
        </div>
      )}
      <ul className={styles.orderListItems}>
        {currentItems.map((child: any, index) => {
          const itemProps = child?.props || {};
          const isFirst = index === 0;
          const isLast = index === currentItems.length - 1;

          return (
            <li
              key={itemProps.id || index}
              className={styles.orderListItem}
              data-index={index}
              draggable={draggable}
              onDragStart={draggable ? (e) => handleDragStart(e, index) : undefined}
              onDragEnd={draggable ? handleDragEnd : undefined}
              onDragOver={draggable ? (e) => handleDragOver(e, index) : undefined}
              onDrop={draggable ? (e) => handleDrop(e, index) : undefined}
            >
              {draggable && (
                <div className={styles.orderListItemDragHandle}>
                  <GripVertical size={16} />
                </div>
              )}

              {selectable && (
                <label className={styles.orderListItemCheckbox}>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={itemProps.selected || false}
                    onChange={(e) => itemProps.onSelect?.(e.target.checked)}
                  />
                </label>
              )}

              <div className={styles.orderListItemContent}>
                {itemProps.icon && <span className={styles.orderListItemIcon}>{itemProps.icon}</span>}
                <span>{itemProps.children}</span>
                {itemProps.badge && itemProps.badge}
              </div>

              <div className={styles.orderListItemControls}>
                <button
                  className={`${styles.orderListBtn} ${styles.orderListBtnUp}`}
                  onClick={() => handleMoveUp(index)}
                  disabled={isFirst}
                  aria-label="Move up"
                  type="button"
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  className={`${styles.orderListBtn} ${styles.orderListBtnDown}`}
                  onClick={() => handleMoveDown(index)}
                  disabled={isLast}
                  aria-label="Move down"
                  type="button"
                >
                  <ChevronDown size={16} />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

OrderList.displayName = 'OrderList';

// Attach Item as static property
OrderList.Item = OrderListItem;
