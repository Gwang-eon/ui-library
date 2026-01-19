import { default as React } from 'react';
export interface PopoverProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    wide?: boolean;
    triggerRef?: React.RefObject<HTMLElement> | React.RefObject<HTMLButtonElement>;
    className?: string;
}
export interface PopoverHeaderProps {
    children: React.ReactNode;
    className?: string;
}
export interface PopoverContentProps {
    children: React.ReactNode;
    className?: string;
}
export interface PopoverFooterProps {
    children: React.ReactNode;
    className?: string;
}
export interface PopoverTitleProps {
    children: React.ReactNode;
    className?: string;
}
export interface PopoverCloseProps {
    onClick?: () => void;
    'aria-label'?: string;
    className?: string;
}
declare const Popover: ({ open, onClose, children, position, wide, triggerRef, className, }: PopoverProps) => React.ReactPortal | null;
declare const PopoverHeader: ({ children, className }: PopoverHeaderProps) => import("react/jsx-runtime").JSX.Element;
declare const PopoverContent: ({ children, className }: PopoverContentProps) => import("react/jsx-runtime").JSX.Element;
declare const PopoverFooter: ({ children, className }: PopoverFooterProps) => import("react/jsx-runtime").JSX.Element;
declare const PopoverTitle: ({ children, className }: PopoverTitleProps) => import("react/jsx-runtime").JSX.Element;
declare const PopoverClose: ({ onClick, "aria-label": ariaLabel, className, }: PopoverCloseProps) => import("react/jsx-runtime").JSX.Element;
export { Popover, PopoverHeader, PopoverContent, PopoverFooter, PopoverTitle, PopoverClose, };
