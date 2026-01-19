import { default as React, ReactNode, HTMLAttributes, AnchorHTMLAttributes } from 'react';
export type MenuSize = 'sm' | 'md' | 'lg';
export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
    trigger: ReactNode;
    children: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    align?: 'left' | 'right';
    wide?: boolean;
    /** Size variant */
    size?: MenuSize;
    className?: string;
}
export declare const Menu: React.FC<MenuProps>;
export interface MenuItemProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'> {
    children: ReactNode;
    icon?: ReactNode;
    shortcut?: string;
    danger?: boolean;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    className?: string;
    as?: 'a' | 'button';
}
export declare const MenuItem: React.FC<MenuItemProps>;
export interface MenuDividerProps {
    className?: string;
}
export declare const MenuDivider: React.FC<MenuDividerProps>;
export interface MenuHeaderProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}
export declare const MenuHeader: React.FC<MenuHeaderProps>;
