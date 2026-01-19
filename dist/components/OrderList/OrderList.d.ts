import { ReactNode } from 'react';
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
export declare const OrderListItem: {
    (_props: OrderListItemProps): null;
    displayName: string;
};
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
export declare const OrderList: {
    ({ title, actions, children, draggable, selectable, compact, onReorder, className, }: OrderListProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
    Item: {
        (_props: OrderListItemProps): null;
        displayName: string;
    };
};
