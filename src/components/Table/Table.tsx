import React, { useState, createContext, useContext, type ReactNode } from 'react';
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

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

// ===== Context =====

const TableContext = createContext<TableContextValue>({});

const useTableContext = () => useContext(TableContext);

// ===== Table Container =====

const TableContainer: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={`${styles.tableContainer} ${className}`}>{children}</div>;
};

// ===== Table Wrapper =====

const TableWrapper: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={`${styles.tableWrapper} ${className}`}>{children}</div>;
};

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
  EmptyState: typeof EmptyState;
} = ({
  children,
  striped = false,
  compact = false,
  stickyHeader = false,
  loading = false,
  className = '',
}) => {
  const tableClasses = [
    styles.table,
    striped && styles.tableStriped,
    compact && styles.tableCompact,
    stickyHeader && styles.tableSticky,
    loading && styles.tableLoading,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <TableContext.Provider value={{ striped, compact, stickyHeader, loading }}>
      <table className={tableClasses}>{children}</table>
    </TableContext.Provider>
  );
};

// ===== Table Head =====

const TableHead: React.FC<TableHeadProps> = ({ children, className = '' }) => {
  return <thead className={className}>{children}</thead>;
};

// ===== Table Body =====

const TableBody: React.FC<TableBodyProps> = ({ children, className = '' }) => {
  const { loading } = useTableContext();

  if (loading) {
    // Render skeleton rows when loading
    return (
      <tbody className={className}>
        {Array.from({ length: 5 }).map((_, index) => (
          <tr key={index}>
            {Array.from({ length: 5 }).map((_, cellIndex) => (
              <td key={cellIndex}>
                <div className={styles.skeleton}>
                  <div className={styles.skeletonText} />
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  return <tbody className={className}>{children}</tbody>;
};

// ===== Table Row =====

const TableRow: React.FC<TableRowProps> = ({
  children,
  selected = false,
  onClick,
  className = '',
}) => {
  const rowClasses = [styles.row, selected && styles.selected, className]
    .filter(Boolean)
    .join(' ');

  return (
    <tr className={rowClasses} onClick={onClick}>
      {children}
    </tr>
  );
};

// ===== Table Cell =====

const TableCell: React.FC<TableCellProps> = ({
  children,
  width,
  align = 'left',
  className = '',
}) => {
  const style = {
    width,
    textAlign: align,
  };

  return (
    <td className={className} style={style}>
      {children}
    </td>
  );
};

// ===== Table Header Cell =====

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  children,
  sortable = false,
  sortDirection = null,
  onSort,
  width,
  align = 'left',
  className = '',
}) => {
  const sortClass = sortDirection === 'asc' ? styles.asc : sortDirection === 'desc' ? styles.desc : '';

  const headerClasses = [
    sortable && styles.sortable,
    sortClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style = {
    width,
    textAlign: align,
  };

  const handleClick = () => {
    if (sortable && onSort) {
      onSort();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (sortable && onSort && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onSort();
    }
  };

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
};

// ===== Expandable Row =====

const ExpandableRow: React.FC<ExpandableRowProps> = ({
  children,
  expandedContent,
  defaultExpanded = false,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpand();
    }
  };

  return (
    <>
      <tr className={`${styles.expandableRow} ${className}`}>
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
};

// ===== Empty State =====

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => {
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
Table.EmptyState = EmptyState;

// Display names for debugging
Table.displayName = 'Table';
TableContainer.displayName = 'Table.Container';
TableWrapper.displayName = 'Table.Wrapper';
TableHead.displayName = 'Table.Head';
TableBody.displayName = 'Table.Body';
TableRow.displayName = 'Table.Row';
TableCell.displayName = 'Table.Cell';
TableHeaderCell.displayName = 'Table.HeaderCell';
ExpandableRow.displayName = 'Table.ExpandableRow';
EmptyState.displayName = 'Table.EmptyState';

export { Table };
