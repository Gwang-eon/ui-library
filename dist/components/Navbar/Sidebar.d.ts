import React from 'react';
export interface SidebarProps {
    children: React.ReactNode;
    open?: boolean;
    onClose?: () => void;
    className?: string;
}
export interface SidebarHeaderProps {
    children: React.ReactNode;
    logo?: React.ReactNode;
    className?: string;
}
export interface SidebarNavProps {
    children: React.ReactNode;
    className?: string;
}
export interface SidebarItemProps {
    children: React.ReactNode;
    icon?: React.ReactNode;
    badge?: React.ReactNode;
    href?: string;
    active?: boolean;
    onClick?: () => void;
    className?: string;
}
export interface SidebarFooterProps {
    children: React.ReactNode;
    className?: string;
}
declare const Sidebar: ({ children, open, onClose, className }: SidebarProps) => import("react/jsx-runtime").JSX.Element;
declare const SidebarHeader: ({ children, logo, className }: SidebarHeaderProps) => import("react/jsx-runtime").JSX.Element;
interface SidebarNavInternalProps extends SidebarNavProps {
    onItemClick?: () => void;
}
declare const SidebarNav: ({ children, className, onItemClick }: SidebarNavInternalProps) => import("react/jsx-runtime").JSX.Element;
interface SidebarItemInternalProps extends SidebarItemProps {
    onMobileClick?: () => void;
}
declare const SidebarItem: ({ children, icon, badge, href, active, onClick, onMobileClick, className }: SidebarItemInternalProps) => import("react/jsx-runtime").JSX.Element;
declare const SidebarDivider: () => import("react/jsx-runtime").JSX.Element;
declare const SidebarFooter: ({ children, className }: SidebarFooterProps) => import("react/jsx-runtime").JSX.Element;
export { Sidebar, SidebarHeader, SidebarNav, SidebarItem, SidebarDivider, SidebarFooter, };
