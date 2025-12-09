import React from 'react';
import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Pagination.module.css';

// Helper function to generate page numbers with ellipsis
const generatePageNumbers = (
  currentPage: number,
  totalPages: number,
  siblings: number = 1
): (number | 'ellipsis')[] => {
  // Always show first page, last page, current page, and siblings
  const pages: (number | 'ellipsis')[] = [];

  // Always include first page
  pages.push(1);

  // Calculate range around current page
  const leftSibling = Math.max(2, currentPage - siblings);
  const rightSibling = Math.min(totalPages - 1, currentPage + siblings);

  // Add left ellipsis if needed
  if (leftSibling > 2) {
    pages.push('ellipsis');
  }

  // Add pages around current
  for (let i = leftSibling; i <= rightSibling; i++) {
    pages.push(i);
  }

  // Add right ellipsis if needed
  if (rightSibling < totalPages - 1) {
    pages.push('ellipsis');
  }

  // Always include last page (if more than 1 page)
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  // Remove duplicates while preserving order
  const result: (number | 'ellipsis')[] = [];
  let prev: number | 'ellipsis' | null = null;

  for (const page of pages) {
    if (page !== prev) {
      result.push(page);
      prev = page;
    }
  }

  return result;
};

// Main Pagination Component
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

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblings = 1,
  showPrevNext = true,
  showFirstLast = false,
  prevLabel,
  nextLabel,
  firstLabel,
  lastLabel,
  className = '',
  'aria-label': ariaLabel = 'Pagination',
}) => {
  const pages = generatePageNumbers(currentPage, totalPages, siblings);

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const paginationClass = [styles.pagination, className].filter(Boolean).join(' ');

  return (
    <nav className={paginationClass} aria-label={ariaLabel}>
      {/* First Page Button */}
      {showFirstLast && (
        <PaginationButton
          onClick={() => onPageChange(1)}
          disabled={!canGoPrev}
          aria-label="Go to first page"
        >
          {firstLabel || '««'}
        </PaginationButton>
      )}

      {/* Previous Button */}
      {showPrevNext && (
        <PaginationButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrev}
          aria-label="Go to previous page"
        >
          {prevLabel || <ChevronLeft size={16} />}
        </PaginationButton>
      )}

      {/* Page Numbers */}
      {pages.map((page, index) => {
        if (page === 'ellipsis') {
          return (
            <span key={`ellipsis-${index}`} className={styles['pagination-ellipsis']}>
              ...
            </span>
          );
        }

        return (
          <PaginationButton
            key={page}
            onClick={() => onPageChange(page)}
            active={page === currentPage}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </PaginationButton>
        );
      })}

      {/* Next Button */}
      {showPrevNext && (
        <PaginationButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          aria-label="Go to next page"
        >
          {nextLabel || <ChevronRight size={16} />}
        </PaginationButton>
      )}

      {/* Last Page Button */}
      {showFirstLast && (
        <PaginationButton
          onClick={() => onPageChange(totalPages)}
          disabled={!canGoNext}
          aria-label="Go to last page"
        >
          {lastLabel || '»»'}
        </PaginationButton>
      )}
    </nav>
  );
};

// PaginationButton Component
export interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: ReactNode;
}

export const PaginationButton: React.FC<PaginationButtonProps> = ({
  active = false,
  children,
  className = '',
  ...props
}) => {
  const buttonClass = [styles['pagination-btn'], active && styles.active, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

// PaginationInfo Component
export interface PaginationInfoProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  pageSize?: number;
  className?: string;
}

export const PaginationInfo: React.FC<PaginationInfoProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  className = '',
}) => {
  const infoClass = [styles['pagination-info'], className].filter(Boolean).join(' ');

  if (totalItems && pageSize) {
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalItems);

    return (
      <span className={infoClass}>
        Showing <strong>{start}-{end}</strong> of <strong>{totalItems}</strong>
      </span>
    );
  }

  return (
    <span className={infoClass}>
      Page {currentPage} of {totalPages}
    </span>
  );
};

// SimplePagination Component (Mobile-friendly)
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

export const SimplePagination: React.FC<SimplePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  prevLabel = '← Previous',
  nextLabel = 'Next →',
  showInfo = true,
  className = '',
  'aria-label': ariaLabel = 'Pagination',
}) => {
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const paginationClass = [styles.pagination, className].filter(Boolean).join(' ');

  return (
    <nav className={paginationClass} aria-label={ariaLabel}>
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrev}
        aria-label="Go to previous page"
      >
        {prevLabel}
      </PaginationButton>

      {showInfo && <PaginationInfo currentPage={currentPage} totalPages={totalPages} />}

      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        aria-label="Go to next page"
      >
        {nextLabel}
      </PaginationButton>
    </nav>
  );
};

// Display names
Pagination.displayName = 'Pagination';
PaginationButton.displayName = 'PaginationButton';
PaginationInfo.displayName = 'PaginationInfo';
SimplePagination.displayName = 'SimplePagination';
