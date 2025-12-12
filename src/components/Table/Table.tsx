import React, { useState, createContext, useContext, memo, useMemo, useCallback, type ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import styles from './Table.module.css';

// ===== Types =====

export type SortDirection = 'asc' | 'desc' | null;

export interface TableContextValue {
  striped?: boolean;
  compact?: boolean;
  stickyHeader?: boolean;
  loading?: boolean;
}

export interface TableProps {
  children: ReactNode;
  striped?: boolean;
  compact?: boolean;
  stickyHeader?: boolean;
  loading?: boolean;
  className?: string;
}

export interface TableHeadProps {
  children: ReactNode;
  className?: string;
}

export interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

export interface TableRowProps {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface TableCellProps {
  children: ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export interface TableHeaderCellProps {
  children: ReactNode;
  sortable?: boolean;
  sortDirection?: SortDirection;
  onSort?: () => void;
  width?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export interface ExpandableRowProps {
  children: ReactNode;
  expandedContent: ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

export interface TableEmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

// ===== Context =====

const TableContext = createContext<TableContextValue>({});

const useTableContext = () => useContext(TableContext);

// ===== Skeleton Row Component =====

const SkeletonRow = memo<{ cellCount: number }>(({ cellCount }) => (
  <tr>
    {Array.from({ length: cellCount }).map((_, cellIndex) => (
      <td key={`skeleton-cell-${cellIndex}`}>
        <div className={styles.skeleton}>
          <div className={styles.skeletonText} />
        </div>
      </td>
    ))}
  </tr>
));

SkeletonRow.displayName = 'Table.SkeletonRow';

// ===== Table Container =====

const TableContainer = memo<{ children: ReactNode; className?: string }>(({
  children,
  className = '',
}) => {
  return <div className={`${styles.tableContainer} ${className}`}>{children}</div>;
});

TableContainer.displayName = 'Table.Container';

// ===== Table Wrapper =====

const TableWrapper = memo<{ children: ReactNode; className?: string }>(({
  children,
  className = '',
}) => {
  return <div className={`${styles.tableWrapper} ${className}`}>{children}</div>;
});

TableWrapper.displayName = 'Table.Wrapper';

// ===== Table Head =====

const TableHead = memo<TableHeadProps>(({ children, className = '' }) => {
  return <thead className={className}>{children}</thead>;
});

TableHead.displayName = 'Table.Head';

// ===== Table Body =====

const TableBody = memo<TableBodyProps>(({ children, className = '' }) => {
  const { loading } = useTableContext();

  if (loading) {
    return (
      <tbody className={className}>
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonRow key={`skeleton-row-${index}`} cellCount={5} />
        ))}
      </tbody>
    );
  }

  return <tbody className={className}>{children}</tbody>;
});

TableBody.displayName = 'Table.Body';

// ===== Table Row =====

const TableRow = memo<TableRowProps>(({
  children,
  selected = false,
  onClick,
  className = '',
}) => {
  const rowClasses = useMemo(() =>
    [styles.row, selected && styles.selected, className]
      .filter(Boolean)
      .join(' '),
    [selected, className]
  );

  return (
    <tr className={rowClasses} onClick={onClick}>
      {children}
    </tr>
  );
});

TableRow.displayName = 'Table.Row';

// ===== Table Cell =====

const TableCell = memo<TableCellProps>(({
  children,
  width,
  align = 'left',
  className = '',
}) => {
  const style = useMemo(() => ({
    width,
    textAlign: align as React.CSSProperties['textAlign'],
  }), [width, align]);

  return (
    <td className={className} style={style}>
      {children}
    </td>
  );
});

TableCell.displayName = 'Table.Cell';

// ===== Table Header Cell =====

const TableHeaderCell = memo<TableHeaderCellProps>(({
  children,
  sortable = false,
  sortDirection = null,
  onSort,
  width,
  align = 'left',
  className = '',
}) => {
  const sortClass = sortDirection === 'asc' ? styles.asc : sortDirection === 'desc' ? styles.desc : '';

  const headerClasses = useMemo(() =>
    [sortable && styles.sortable, sortClass, className]
      .filter(Boolean)
      .join(' '),
    [sortable, sortClass, className]
  );

  const style = useMemo(() => ({
    width,
    textAlign: align as React.CSSProperties['textAlign'],
  }), [width, align]);

  const handleClick = useCallback(() => {
    if (sortable && onSort) {
      onSort();
    }
  }, [sortable, onSort]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (sortable && onSort && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onSort();
    }
  }, [sortable, onSort]);

  return (
    <th
      className={headerClasses}
      style={style}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={sortable ? 0 : undefined}
      role={sortable ? 'button' : undefined}
      aria-sort={
        sortDirection === 'asc'
          ? 'ascending'
          : sortDirection === 'desc'
          ? 'descending'
          : undefined
      }
    >
      {children}
    </th>
  );
});

TableHeaderCell.displayName = 'Table.HeaderCell';

// ===== Expandable Row =====

const ExpandableRow = memo<ExpandableRowProps>(({
  children,
  expandedContent,
  defaultExpanded = false,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsExpanded(prev => !prev);
    }
  }, []);

  const rowClassName = useMemo(() =>
    `${styles.expandableRow} ${className}`,
    [className]
  );

  return (
    <>
      <tr className={rowClassName}>
        <td className={styles.expandBtnCell}>
          <button
            className={styles.expandBtn}
            onClick={toggleExpand}
            onKeyDown={handleKeyDown}
            aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
            aria-expanded={isExpanded}
          >
            <ChevronRight size={16} className={styles.chevronIcon} />
          </button>
        </td>
        {children}
      </tr>
      {isExpanded && (
        <tr className={styles.expandedContent}>
          <td colSpan={100}>
            <div className={styles.expandedDetails}>{expandedContent}</div>
          </td>
        </tr>
      )}
    </>
  );
});

ExpandableRow.displayName = 'Table.ExpandableRow';

// ===== Empty State =====

const TableEmptyState = memo<TableEmptyStateProps>(({ icon, title, description, action }) => {
  return (
    <div className={styles.tableEmptyState}>
      <div className={styles.emptyStateContent}>
        {icon && <div className={styles.emptyStateIcon}>{icon}</div>}
        <h3 className={styles.emptyStateTitle}>{title}</h3>
        {description && <p className={styles.emptyStateDescription}>{description}</p>}
        {action && <div className={styles.emptyStateAction}>{action}</div>}
      </div>
    </div>
  );
});

TableEmptyState.displayName = 'Table.EmptyState';

// ===== Main Table =====

const Table: React.FC<TableProps> & {
  Container: typeof TableContainer;
  Wrapper: typeof TableWrapper;
  Head: typeof TableHead;
  Body: typeof TableBody;
  Row: typeof TableRow;
  Cell: typeof TableCell;
  HeaderCell: typeof TableHeaderCell;
  ExpandableRow: typeof ExpandableRow;
  EmptyState: typeof TableEmptyState;
} = ({
  children,
  striped = false,
  compact = false,
  stickyHeader = false,
  loading = false,
  className = '',
}) => {
  const tableClasses = useMemo(() =>
    [
      styles.table,
      striped && styles.tableStriped,
      compact && styles.tableCompact,
      stickyHeader && styles.tableSticky,
      loading && styles.tableLoading,
      className,
    ]
      .filter(Boolean)
      .join(' '),
    [striped, compact, stickyHeader, loading, className]
  );

  const contextValue = useMemo(() => ({
    striped,
    compact,
    stickyHeader,
    loading,
  }), [striped, compact, stickyHeader, loading]);

  return (
    <TableContext.Provider value={contextValue}>
      <table className={tableClasses}>{children}</table>
    </TableContext.Provider>
  );
};

// Attach sub-components
Table.Container = TableContainer;
Table.Wrapper = TableWrapper;
Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.HeaderCell = TableHeaderCell;
Table.ExpandableRow = ExpandableRow;
Table.EmptyState = TableEmptyState;

Table.displayName = 'Table';

export { Table };
