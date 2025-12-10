import React from 'react';
export interface EventData {
    id: string;
    time: string;
    severity: 'critical' | 'warning' | 'info';
    eventType: {
        icon: string;
        label: string;
    };
    device: {
        id: string;
        type: string;
    };
    message: string;
    location: string;
}
export interface EventDataTableProps {
    /** Array of event data */
    events: EventData[];
    /** Enable search functionality */
    searchable?: boolean;
    /** Enable filtering by severity */
    filterable?: boolean;
    /** Enable export functionality */
    exportable?: boolean;
    /** Enable row selection */
    selectable?: boolean;
    /** Callback when row is selected */
    onSelect?: (selectedIds: string[]) => void;
    /** Callback when view button is clicked */
    onView?: (event: EventData) => void;
    /** Callback when export is clicked */
    onExport?: () => void;
    /** Custom class name */
    className?: string;
}
export declare const EventDataTable: React.FC<EventDataTableProps>;
export default EventDataTable;
