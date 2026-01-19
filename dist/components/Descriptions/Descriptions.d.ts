import { ReactNode } from 'react';
export interface DescriptionsItemProps {
    /** Label text */
    label: ReactNode;
    /** Content/value */
    children: ReactNode;
    /** Span across all columns */
    span?: boolean;
    /** Custom className for the item */
    className?: string;
}
export interface DescriptionsProps {
    /** Items to display */
    children: ReactNode;
    /** Title text */
    title?: ReactNode;
    /** Actions to display in header */
    extra?: ReactNode;
    /** Show borders around items */
    bordered?: boolean;
    /** Number of columns */
    column?: 1 | 2 | 3;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Vertical layout (label above content) */
    vertical?: boolean;
    /** Custom className */
    className?: string;
}
/**
 * Descriptions Item Component
 *
 * Individual key-value pair within a Descriptions list.
 *
 * @example
 * ```tsx
 * <Descriptions.Item label="Name">
 *   John Doe
 * </Descriptions.Item>
 * ```
 */
export declare const DescriptionsItem: {
    ({ label, children, span, className, }: DescriptionsItemProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
/**
 * Descriptions Component
 *
 * Display key-value pairs in a structured format for detail pages and information display.
 * Ideal for showing device specifications, user profiles, order details, and system configurations.
 *
 * @example
 * ```tsx
 * <Descriptions title="User Information" bordered>
 *   <Descriptions.Item label="Name">John Doe</Descriptions.Item>
 *   <Descriptions.Item label="Email">john@example.com</Descriptions.Item>
 *   <Descriptions.Item label="Role">
 *     <Badge variant="primary">Admin</Badge>
 *   </Descriptions.Item>
 * </Descriptions>
 * ```
 *
 * @example
 * ```tsx
 * // Multi-column layout
 * <Descriptions column={2} bordered>
 *   <Descriptions.Item label="Order ID">#12345</Descriptions.Item>
 *   <Descriptions.Item label="Date">2025-01-15</Descriptions.Item>
 *   <Descriptions.Item label="Customer">Jane Smith</Descriptions.Item>
 *   <Descriptions.Item label="Total">$299.00</Descriptions.Item>
 * </Descriptions>
 * ```
 */
export declare const Descriptions: {
    ({ children, title, extra, bordered, column, size, vertical, className, }: DescriptionsProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
    Item: {
        ({ label, children, span, className, }: DescriptionsItemProps): import("react/jsx-runtime").JSX.Element;
        displayName: string;
    };
};
