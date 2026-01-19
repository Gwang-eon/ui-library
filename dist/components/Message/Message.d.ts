import { default as React } from 'react';
export type MessageType = 'success' | 'error' | 'warning' | 'info' | 'loading';
export interface MessageProps {
    /** Type of message */
    type: MessageType;
    /** Message title */
    title: string;
    /** Optional description text */
    description?: string;
    /** Show close button */
    closable?: boolean;
    /** Callback when close button is clicked */
    onClose?: () => void;
    /** Additional CSS class */
    className?: string;
    /** Control visibility (for animations) */
    visible?: boolean;
}
/**
 * Message - Global message notification
 *
 * Display global messages as feedback in response to user operations
 * at the top of the page.
 */
export declare const Message: React.FC<MessageProps>;
