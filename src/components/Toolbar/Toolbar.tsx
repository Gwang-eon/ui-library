import React from 'react';
import { Search } from 'lucide-react';
import styles from './Toolbar.module.css';

export interface ToolbarProps {
  children: React.ReactNode;
  size?: 'compact' | 'default' | 'comfortable';
  bulk?: boolean;
  className?: string;
}

export interface ToolbarSectionProps {
  children: React.ReactNode;
  className?: string;
}

export interface ToolbarSearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export interface ToolbarSelectProps {
  children: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export interface ToolbarBulkCountProps {
  count: number;
  label?: string;
  className?: string;
}

const Toolbar = ({
  children,
  size = 'default',
  bulk = false,
  className = ''
}: ToolbarProps) => {
  const sizeClass = size === 'compact' ? styles.toolbarCompact :
                    size === 'comfortable' ? styles.toolbarComfortable : '';
  const bulkClass = bulk ? styles.toolbarBulk : '';

  return (
    <div className={`${styles.toolbar} ${sizeClass} ${bulkClass} ${className}`}>
      {children}
    </div>
  );
};

const ToolbarSection = ({ children, className = '' }: ToolbarSectionProps) => {
  return (
    <div className={`${styles.toolbarSection} ${className}`}>
      {children}
    </div>
  );
};

const ToolbarDivider = () => {
  return <div className={styles.toolbarDivider} />;
};

const ToolbarSearch = ({
  placeholder = 'Search...',
  value,
  onChange,
  className = ''
}: ToolbarSearchProps) => {
  return (
    <div className={`${styles.toolbarSearch} ${className}`}>
      <Search size={20} strokeWidth={2} />
      <input
        type="text"
        className={styles.toolbarSearchInput}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const ToolbarSelect = ({
  children,
  value,
  onChange,
  className = ''
}: ToolbarSelectProps) => {
  return (
    <select
      className={`${styles.toolbarSelect} ${className}`}
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
  );
};

const ToolbarBulkCount = ({
  count,
  label = 'items selected',
  className = ''
}: ToolbarBulkCountProps) => {
  return (
    <span className={`${styles.toolbarBulkCount} ${className}`}>
      <strong>{count}</strong> {label}
    </span>
  );
};

export {
  Toolbar,
  ToolbarSection,
  ToolbarDivider,
  ToolbarSearch,
  ToolbarSelect,
  ToolbarBulkCount,
};
