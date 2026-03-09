import React from 'react';
import type { ReactNode } from 'react';
export type AlertVariant = 'info' | 'success' | 'warning' | 'error';
export interface AlertProps {
    variant?: AlertVariant;
    title?: string;
    children: ReactNode;
    onClose?: () => void;
    className?: string;
}
export declare const Alert: React.FC<AlertProps>;
