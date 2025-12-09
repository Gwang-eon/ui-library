import { useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import { ChevronRight, ChevronsRight, ChevronLeft, ChevronsLeft, Search, Inbox } from 'lucide-react';
import styles from './Transfer.module.css';

export interface TransferItem {
  /** Unique key for the item */
  key: string;
  /** Display label */
  label: string;
  /** Optional description */
  description?: string;
  /** Disabled state */
  disabled?: boolean;
}

export interface TransferProps {
  /** All available items */
  dataSource: TransferItem[];
  /** Keys of items in target list */
  targetKeys?: string[];
  /** Default target keys (uncontrolled) */
  defaultTargetKeys?: string[];
  /** Callback when target keys change */
  onChange?: (targetKeys: string[], direction: 'left' | 'right', moveKeys: string[]) => void;
  /** Source panel title */
  sourceTitle?: string;
  /** Target panel title */
  targetTitle?: string;
  /** Show search input */
  showSearch?: boolean;
  /** Source search placeholder */
  sourceSearchPlaceholder?: string;
  /** Target search placeholder */
  targetSearchPlaceholder?: string;
  /** Show select all */
  showSelectAll?: boolean;
  /** Compact mode */
  compact?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Empty text */
  emptyText?: string;
  /** Additional CSS classes */
  className?: string;
  /** Render custom list item */
  render?: (item: TransferItem) => ReactNode;
}

/**
 * Transfer - Dual list box component for moving items between two lists
 *
 * Features:
 * - Dual list with source and target panels
 * - Search functionality
 * - Select all checkbox
 * - Move selected/all controls
 * - Empty state
 *
 * @example
 * ```tsx
 * <Transfer
 *   dataSource={items}
 *   targetKeys={targetKeys}
 *   onChange={(keys) => setTargetKeys(keys)}
 *   sourceTitle="Available"
 *   targetTitle="Selected"
 *   showSearch
 * />
 * ```
 */
export const Transfer = ({
  dataSource,
  targetKeys: controlledTargetKeys,
  defaultTargetKeys = [],
  onChange,
  sourceTitle = 'Source',
  targetTitle = 'Target',
  showSearch = false,
  sourceSearchPlaceholder = 'Search...',
  targetSearchPlaceholder = 'Search...',
  showSelectAll = false,
  compact = false,
  disabled = false,
  emptyText = 'No items',
  className = '',
  render,
}: TransferProps) => {
  const [uncontrolledTargetKeys, setUncontrolledTargetKeys] = useState<string[]>(defaultTargetKeys);
  const [sourceSearch, setSourceSearch] = useState('');
  const [targetSearch, setTargetSearch] = useState('');
  const [sourceSelected, setSourceSelected] = useState<Set<string>>(new Set());
  const [targetSelected, setTargetSelected] = useState<Set<string>>(new Set());

  const targetKeys = controlledTargetKeys !== undefined ? controlledTargetKeys : uncontrolledTargetKeys;

  // Split items into source and target
  const { sourceItems, targetItems } = useMemo(() => {
    const source: TransferItem[] = [];
    const target: TransferItem[] = [];

    dataSource.forEach((item) => {
      if (targetKeys.includes(item.key)) {
        target.push(item);
      } else {
        source.push(item);
      }
    });

    return { sourceItems: source, targetItems: target };
  }, [dataSource, targetKeys]);

  // Filter items by search
  const filterItems = (items: TransferItem[], searchQuery: string) => {
    if (!searchQuery) return items;
    const query = searchQuery.toLowerCase();
    return items.filter((item) =>
      item.label.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query)
    );
  };

  const filteredSourceItems = useMemo(
    () => filterItems(sourceItems, sourceSearch),
    [sourceItems, sourceSearch]
  );

  const filteredTargetItems = useMemo(
    () => filterItems(targetItems, targetSearch),
    [targetItems, targetSearch]
  );

  // Handle target keys change
  const handleChange = (newTargetKeys: string[], direction: 'left' | 'right', moveKeys: string[]) => {
    if (controlledTargetKeys === undefined) {
      setUncontrolledTargetKeys(newTargetKeys);
    }
    onChange?.(newTargetKeys, direction, moveKeys);
  };

  // Move selected items
  const moveToTarget = () => {
    if (disabled || sourceSelected.size === 0) return;
    const moveKeys = Array.from(sourceSelected);
    const newTargetKeys = [...targetKeys, ...moveKeys];
    handleChange(newTargetKeys, 'right', moveKeys);
    setSourceSelected(new Set());
  };

  const moveToSource = () => {
    if (disabled || targetSelected.size === 0) return;
    const moveKeys = Array.from(targetSelected);
    const newTargetKeys = targetKeys.filter((key) => !moveKeys.includes(key));
    handleChange(newTargetKeys, 'left', moveKeys);
    setTargetSelected(new Set());
  };

  // Move all items
  const moveAllToTarget = () => {
    if (disabled || filteredSourceItems.length === 0) return;
    const moveKeys = filteredSourceItems.filter((item) => !item.disabled).map((item) => item.key);
    const newTargetKeys = [...targetKeys, ...moveKeys];
    handleChange(newTargetKeys, 'right', moveKeys);
    setSourceSelected(new Set());
  };

  const moveAllToSource = () => {
    if (disabled || filteredTargetItems.length === 0) return;
    const moveKeys = filteredTargetItems.filter((item) => !item.disabled).map((item) => item.key);
    const newTargetKeys = targetKeys.filter((key) => !moveKeys.includes(key));
    handleChange(newTargetKeys, 'left', moveKeys);
    setTargetSelected(new Set());
  };

  // Handle item selection
  const toggleSourceItem = (key: string) => {
    if (disabled) return;
    const newSelected = new Set(sourceSelected);
    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }
    setSourceSelected(newSelected);
  };

  const toggleTargetItem = (key: string) => {
    if (disabled) return;
    const newSelected = new Set(targetSelected);
    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }
    setTargetSelected(newSelected);
  };

  // Handle select all
  const toggleSourceSelectAll = () => {
    if (disabled) return;
    const selectableKeys = filteredSourceItems.filter((item) => !item.disabled).map((item) => item.key);
    if (sourceSelected.size === selectableKeys.length) {
      setSourceSelected(new Set());
    } else {
      setSourceSelected(new Set(selectableKeys));
    }
  };

  const toggleTargetSelectAll = () => {
    if (disabled) return;
    const selectableKeys = filteredTargetItems.filter((item) => !item.disabled).map((item) => item.key);
    if (targetSelected.size === selectableKeys.length) {
      setTargetSelected(new Set());
    } else {
      setTargetSelected(new Set(selectableKeys));
    }
  };

  // Render panel
  const renderPanel = (
    items: TransferItem[],
    filteredItems: TransferItem[],
    selectedKeys: Set<string>,
    onToggle: (key: string) => void,
    onToggleSelectAll: () => void,
    title: string,
    searchValue: string,
    onSearchChange: (value: string) => void,
    searchPlaceholder: string
  ) => {
    const selectableItems = filteredItems.filter((item) => !item.disabled);
    const isAllSelected = selectableItems.length > 0 && selectedKeys.size === selectableItems.length;

    return (
      <div className={styles.transferPanel}>
        {/* Header */}
        <div className={styles.transferHeader}>
          <h3 className={styles.transferTitle}>{title}</h3>
          <span className={styles.transferCount}>
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {/* Search */}
        {showSearch && (
          <div className={styles.transferSearch}>
            <Search className={styles.transferSearchIcon} size={16} />
            <input
              type="text"
              className={styles.transferSearchInput}
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              disabled={disabled}
            />
          </div>
        )}

        {/* Select All */}
        {showSelectAll && (
          <div className={styles.transferSelectAll}>
            <label className={styles.transferSelectAllLabel}>
              <input
                type="checkbox"
                className={styles.transferCheckbox}
                checked={isAllSelected}
                onChange={onToggleSelectAll}
                disabled={disabled || filteredItems.length === 0}
              />
              <span>Select All</span>
            </label>
          </div>
        )}

        {/* Body */}
        <div className={styles.transferBody}>
          {filteredItems.length === 0 ? (
            <div className={`${styles.transferList} ${styles.transferListEmpty}`}>
              <div className={styles.transferEmpty}>
                <Inbox size={32} style={{ opacity: 0.3 }} />
                <p>{emptyText}</p>
              </div>
            </div>
          ) : (
            <div className={styles.transferList}>
              {filteredItems.map((item) => (
                <label
                  key={item.key}
                  className={`${styles.transferItem} ${item.disabled ? styles.disabled : ''}`}
                >
                  <input
                    type="checkbox"
                    className={styles.transferCheckbox}
                    checked={selectedKeys.has(item.key)}
                    onChange={() => onToggle(item.key)}
                    disabled={disabled || item.disabled}
                  />
                  <span className={styles.transferItemLabel}>
                    {render ? render(item) : item.label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {showSelectAll && (
          <div className={styles.transferFooter}>
            <span className={styles.transferFooterText}>
              {selectedKeys.size} of {filteredItems.length} selected
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`${styles.transfer} ${compact ? styles.transferCompact : ''} ${className}`}>
      {/* Source Panel */}
      {renderPanel(
        sourceItems,
        filteredSourceItems,
        sourceSelected,
        toggleSourceItem,
        toggleSourceSelectAll,
        sourceTitle,
        sourceSearch,
        setSourceSearch,
        sourceSearchPlaceholder
      )}

      {/* Controls */}
      <div className={`${styles.transferControls} ${compact ? styles.transferControlsCompact : ''}`}>
        <button
          className="btn btn-sm btn-primary"
          onClick={moveToTarget}
          disabled={disabled || sourceSelected.size === 0}
          aria-label="Move selected to target"
        >
          <ChevronRight size={16} />
        </button>
        <button
          className="btn btn-sm btn-ghost"
          onClick={moveAllToTarget}
          disabled={disabled || filteredSourceItems.length === 0}
          aria-label="Move all to target"
        >
          <ChevronsRight size={16} />
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={moveToSource}
          disabled={disabled || targetSelected.size === 0}
          aria-label="Move selected to source"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          className="btn btn-sm btn-ghost"
          onClick={moveAllToSource}
          disabled={disabled || filteredTargetItems.length === 0}
          aria-label="Move all to source"
        >
          <ChevronsLeft size={16} />
        </button>
      </div>

      {/* Target Panel */}
      {renderPanel(
        targetItems,
        filteredTargetItems,
        targetSelected,
        toggleTargetItem,
        toggleTargetSelectAll,
        targetTitle,
        targetSearch,
        setTargetSearch,
        targetSearchPlaceholder
      )}
    </div>
  );
};
