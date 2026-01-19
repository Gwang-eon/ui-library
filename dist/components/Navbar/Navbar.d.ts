import { default as React } from 'react';
export interface NavbarProps {
    children: React.ReactNode;
    className?: string;
}
export interface NavbarBrandProps {
    children: React.ReactNode;
    logo?: React.ReactNode;
    className?: string;
}
export interface NavbarNavProps {
    children: React.ReactNode;
    className?: string;
}
export interface NavbarItemProps {
    children: React.ReactNode;
    href?: string;
    active?: boolean;
    onClick?: () => void;
    className?: string;
}
export interface NavbarSearchProps {
    children: React.ReactNode;
    className?: string;
}
export interface NavbarActionsProps {
    children: React.ReactNode;
    className?: string;
}
export interface NavbarDropdownProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    align?: 'left' | 'right';
    className?: string;
}
export interface NavbarDropdownItemProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
}
declare const Navbar: ({ children, className }: NavbarProps) => import("react/jsx-runtime").JSX.Element;
declare const NavbarBrand: ({ children, logo, className }: NavbarBrandProps) => import("react/jsx-runtime").JSX.Element;
interface NavbarNavInternalProps extends NavbarNavProps {
    isMobileMenuOpen?: boolean;
    onClose?: () => void;
}
declare const NavbarNav: ({ children, className, isMobileMenuOpen, onClose, }: NavbarNavInternalProps) => import("react/jsx-runtime").JSX.Element;
interface NavbarItemInternalProps extends NavbarItemProps {
    onMobileClick?: () => void;
}
declare const NavbarItem: ({ children, href, active, onClick, onMobileClick, className }: NavbarItemInternalProps) => import("react/jsx-runtime").JSX.Element;
declare const NavbarSearch: ({ children, className }: NavbarSearchProps) => import("react/jsx-runtime").JSX.Element;
declare const NavbarActions: ({ children, className }: NavbarActionsProps) => import("react/jsx-runtime").JSX.Element;
declare const NavbarDropdown: ({ trigger, children, align, className }: NavbarDropdownProps) => import("react/jsx-runtime").JSX.Element;
declare const NavbarDropdownItem: ({ children, href, onClick, className }: NavbarDropdownItemProps) => import("react/jsx-runtime").JSX.Element;
declare const NavbarDropdownDivider: () => import("react/jsx-runtime").JSX.Element;
export { Navbar, NavbarBrand, NavbarNav, NavbarItem, NavbarSearch, NavbarActions, NavbarDropdown, NavbarDropdownItem, NavbarDropdownDivider, };
