import { ReactNode } from 'react';
export interface TimelineProps {
    /** Timeline items */
    children: ReactNode;
    /** Timeline mode */
    mode?: 'default' | 'compact' | 'alternate';
    /** Additional CSS class */
    className?: string;
}
export interface TimelineItemProps {
    /** Item variant */
    variant?: 'default' | 'success' | 'error' | 'warning' | 'info' | 'primary';
    /** Icon for marker */
    icon?: ReactNode;
    /** Timestamp */
    time?: ReactNode;
    /** Title */
    title: ReactNode;
    /** Description */
    description?: ReactNode;
    /** Meta information (badges, buttons, etc.) */
    meta?: ReactNode;
    /** Make item clickable */
    interactive?: boolean;
    /** Click handler */
    onClick?: () => void;
    /** Additional CSS class */
    className?: string;
}
/**
 * Timeline Component
 *
 * Displays events in chronological order with visual connectors and timestamps.
 * Ideal for activity logs, event history, process flows, and sequential data.
 *
 * @example
 * ```tsx
 * <Timeline>
 *   <Timeline.Item
 *     time="2 hours ago"
 *     title="Device Connected"
 *     description="Temperature sensor successfully connected."
 *   />
 *   <Timeline.Item
 *     variant="success"
 *     icon={<CheckCircle />}
 *     time="5 hours ago"
 *     title="Firmware Updated"
 *     description="Updated to v2.2.0"
 *   />
 * </Timeline>
 * ```
 */
export declare const Timeline: {
    ({ children, mode, className }: TimelineProps): import("react/jsx-runtime").JSX.Element;
    Item: {
        ({ variant, icon, time, title, description, meta, interactive, onClick, className, }: TimelineItemProps): import("react/jsx-runtime").JSX.Element;
        displayName: string;
    };
    displayName: string;
};
