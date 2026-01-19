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
    events: EventData[];
    searchable?: boolean;
    filterable?: boolean;
    exportable?: boolean;
    selectable?: boolean;
    onSelect?: (selectedIds: string[]) => void;
    onView?: (event: EventData) => void;
    onExport?: () => void;
    className?: string;
}
export declare const EventDataTable: React.NamedExoticComponent<EventDataTableProps>;
export default EventDataTable;
