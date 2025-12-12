import React from 'react';
export type ToastVariant = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
export interface ToastProps {
    id?: string;
    variant?: ToastVariant;
    title?: string;
    message: string;
    duration?: number;
    onClose?: () => void;
}
export declare const Toast: React.FC<ToastProps>;
