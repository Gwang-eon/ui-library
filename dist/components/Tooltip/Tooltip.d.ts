import React from 'react';
export interface TooltipProps {
    content: React.ReactNode;
    children: React.ReactElement;
    position?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
    rich?: boolean;
    className?: string;
    id?: string;
}
declare const Tooltip: {
    ({ content, children, position, delay, rich, className, id, }: TooltipProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export { Tooltip };
