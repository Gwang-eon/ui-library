import React from 'react';
import type { ReactNode, AnchorHTMLAttributes } from 'react';
export interface BreadcrumbItemData {
    label: string;
    href?: string;
    icon?: ReactNode;
}
export interface BreadcrumbProps {
    items?: BreadcrumbItemData[];
    separator?: ReactNode;
    children?: ReactNode;
    className?: string;
    'aria-label'?: string;
}
export declare const Breadcrumb: React.FC<BreadcrumbProps>;
export interface BreadcrumbItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    href?: string;
    icon?: ReactNode;
    children: ReactNode;
    current?: boolean;
    className?: string;
}
export declare const BreadcrumbItem: React.FC<BreadcrumbItemProps>;
export interface BreadcrumbSeparatorProps {
    children?: ReactNode;
    className?: string;
}
export declare const BreadcrumbSeparator: React.FC<BreadcrumbSeparatorProps>;
