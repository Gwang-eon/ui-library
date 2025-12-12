import React, { memo, useMemo, useCallback } from 'react';
import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Pagination.module.css';

// Helper function to generate page numbers with ellipsis
const generatePageNumbers = (
  currentPage: number,
  totalPages: number,
  siblings: number = 1
): (number | 'ellipsis')[] => {
  const pages: (number | 'ellipsis')[] = [];

  pages.push(1);

  const leftSibling = Math.max(2, currentPage - siblings);
  const rightSibling = Math.min(totalPages - 1, currentPage + siblings);

  if (leftSibling > 2) {
    pages.push('ellipsis');
  }

  for (let i = leftSibling; i <= rightSibling; i++) {
    pages.push(i);
  }

  if (rightSibling < totalPages - 1) {
    pages.push('ellipsis');
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

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

// PaginationButton Component
export interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: ReactNode;
}

export const PaginationButton = memo<PaginationButtonProps>(({
  active = false,
  children,
  className = '',
  ...props
}) => {
  const buttonClass = useMemo(() =>
    [styles['pagination-btn'], active && styles.active, className]
      .filter(Boolean)
      .join(' '),
    [active, className]
  );

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
});

PaginationButton.displayName = 'PaginationButton';

// Page number button with memoized click handler
interface PageButtonProps {
  page: number;
  isActive: boolean;
  onPageChange: (page: number) => void;
}

const PageButton = memo<PageButtonProps>(({ page, isActive, onPageChange }) => {
  const handleClick = useCallback(() => {
    onPageChange(page);
  }, [page, onPageChange]);

  return (
    <PaginationButton
      onClick={handleClick}
      active={isActive}
      aria-label={`Go to page ${page}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {page}
    </PaginationButton>
  );
});

PageButton.displayName = 'PageButton';

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

export const Pagination = memo<PaginationProps>(({
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
  const pages = useMemo(() =>
    generatePageNumbers(currentPage, totalPages, siblings),
    [currentPage, totalPages, siblings]
  );

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const paginationClass = useMemo(() =>
    [styles.pagination, className].filter(Boolean).join(' '),
    [className]
  );

  // Memoized handlers
  const goToFirst = useCallback(() => {
    onPageChange(1);
  }, [onPageChange]);

  const goToPrev = useCallback(() => {
    onPageChange(currentPage - 1);
  }, [currentPage, onPageChange]);

  const goToNext = useCallback(() => {
    onPageChange(currentPage + 1);
  }, [currentPage, onPageChange]);

  const goToLast = useCallback(() => {
    onPageChange(totalPages);
  }, [totalPages, onPageChange]);

  return (
    <nav className={paginationClass} aria-label={ariaLabel}>
      {/* First Page Button */}
      {showFirstLast && (
        <PaginationButton
          onClick={goToFirst}
          disabled={!canGoPrev}
          aria-label="Go to first page"
        >
          {firstLabel || '««'}
        </PaginationButton>
      )}

      {/* Previous Button */}
      {showPrevNext && (
        <PaginationButton
          onClick={goToPrev}
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
          <PageButton
            key={page}
            page={page}
            isActive={page === currentPage}
            onPageChange={onPageChange}
          />
        );
      })}

      {/* Next Button */}
      {showPrevNext && (
        <PaginationButton
          onClick={goToNext}
          disabled={!canGoNext}
          aria-label="Go to next page"
        >
          {nextLabel || <ChevronRight size={16} />}
        </PaginationButton>
      )}

      {/* Last Page Button */}
      {showFirstLast && (
        <PaginationButton
          onClick={goToLast}
          disabled={!canGoNext}
          aria-label="Go to last page"
        >
          {lastLabel || '»»'}
        </PaginationButton>
      )}
    </nav>
  );
});

Pagination.displayName = 'Pagination';

// PaginationInfo Component
export interface PaginationInfoProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  pageSize?: number;
  className?: string;
}

export const PaginationInfo = memo<PaginationInfoProps>(({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  className = '',
}) => {
  const infoClass = useMemo(() =>
    [styles['pagination-info'], className].filter(Boolean).join(' '),
    [className]
  );

  const rangeInfo = useMemo(() => {
    if (totalItems && pageSize) {
      const start = (currentPage - 1) * pageSize + 1;
      const end = Math.min(currentPage * pageSize, totalItems);
      return { start, end, totalItems };
    }
    return null;
  }, [currentPage, totalItems, pageSize]);

  if (rangeInfo) {
    return (
      <span className={infoClass}>
        Showing <strong>{rangeInfo.start}-{rangeInfo.end}</strong> of <strong>{rangeInfo.totalItems}</strong>
      </span>
    );
  }

  return (
    <span className={infoClass}>
      Page {currentPage} of {totalPages}
    </span>
  );
});

PaginationInfo.displayName = 'PaginationInfo';

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

export const SimplePagination = memo<SimplePaginationProps>(({
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

  const paginationClass = useMemo(() =>
    [styles.pagination, className].filter(Boolean).join(' '),
    [className]
  );

  const goToPrev = useCallback(() => {
    onPageChange(currentPage - 1);
  }, [currentPage, onPageChange]);

  const goToNext = useCallback(() => {
    onPageChange(currentPage + 1);
  }, [currentPage, onPageChange]);

  return (
    <nav className={paginationClass} aria-label={ariaLabel}>
      <PaginationButton
        onClick={goToPrev}
        disabled={!canGoPrev}
        aria-label="Go to previous page"
      >
        {prevLabel}
      </PaginationButton>

      {showInfo && <PaginationInfo currentPage={currentPage} totalPages={totalPages} />}

      <PaginationButton
        onClick={goToNext}
        disabled={!canGoNext}
        aria-label="Go to next page"
      >
        {nextLabel}
      </PaginationButton>
    </nav>
  );
});

SimplePagination.displayName = 'SimplePagination';
