import React from 'react';
import type { ReactNode, ButtonHTMLAttributes } from 'react';
export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    siblings?: number;
    showPrevNext?: boolean;
    showFirstLast?: boolean;
    prevLabel?: ReactNode;
    nextLabel?: ReactNode;
    firstLabel?: ReactNode;
    lastLabel?: ReactNode;
    className?: string;
    'aria-label'?: string;
}
export declare const Pagination: React.FC<PaginationProps>;
export interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    children: ReactNode;
}
export declare const PaginationButton: React.FC<PaginationButtonProps>;
export interface PaginationInfoProps {
    currentPage: number;
    totalPages: number;
    totalItems?: number;
    pageSize?: number;
    className?: string;
}
export declare const PaginationInfo: React.FC<PaginationInfoProps>;
export interface SimplePaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    prevLabel?: ReactNode;
    nextLabel?: ReactNode;
    showInfo?: boolean;
    className?: string;
    'aria-label'?: string;
}
export declare const SimplePagination: React.FC<SimplePaginationProps>;
