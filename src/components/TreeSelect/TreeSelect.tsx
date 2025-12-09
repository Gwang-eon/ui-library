import { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ChevronDown, ChevronRight, Search, X } from 'lucide-react';
import styles from './TreeSelect.module.css';

export interface TreeSelectNode {
  /** Unique value */
  value: string;
  /** Display label */
  label: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Child nodes */
  children?: TreeSelectNode[];
  /** Disabled state */
  disabled?: boolean;
}

export interface TreeSelectProps {
  /** Tree data */
  data: TreeSelectNode[];
  /** Selected value(s) */
  value?: string | string[] | null;
  /** Default value (uncontrolled) */
  defaultValue?: string | string[] | null;
  /** Callback when selection changes */
  onChange?: (value: string | string[] | null) => void;
  /** Multiple selection mode */
  multiple?: boolean;
  /** Show search input */
  showSearch?: boolean;
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Clear button */
  clearable?: boolean;
}

/**
 * TreeSelect - Select component with hierarchical tree data structure
 *
 * Features:
 * - Hierarchical tree selection
 * - Single and multiple selection modes
 * - Search functionality
 * - Expand/collapse nodes
 * - Icon support
 *
 * @example
 * ```tsx
 * <TreeSelect
 *   data={treeData}
 *   value={value}
 *   onChange={setValue}
 *   showSearch
 *   placeholder="Select location..."
 * />
 * ```
 */
export const TreeSelect = ({
  data,
  value: controlledValue,
  defaultValue = null,
  onChange,
  multiple = false,
  showSearch = false,
  searchPlaceholder = 'Search...',
  placeholder = 'Select...',
  disabled = false,
  className = '',
  clearable = false,
}: TreeSelectProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<string | string[] | null>(
    defaultValue
  );
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle value change
  const handleChange = (newValue: string | string[]) => {
    if (controlledValue === undefined) {
      setUncontrolledValue(newValue);
    }
    onChange?.(newValue);
  };

  // Handle node selection
  const handleNodeSelect = (nodeValue: string) => {
    if (disabled) return;

    if (multiple) {
      const currentValues = Array.isArray(value) ? value : value ? [value] : [];
      const newValues = currentValues.includes(nodeValue)
        ? currentValues.filter((v) => v !== nodeValue)
        : [...currentValues, nodeValue];
      handleChange(newValues);
    } else {
      handleChange(nodeValue);
      setIsOpen(false);
    }
  };

  // Toggle node expansion
  const toggleNode = (nodeValue: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeValue)) {
        next.delete(nodeValue);
      } else {
        next.add(nodeValue);
      }
      return next;
    });
  };

  // Get selected labels
  const getSelectedLabels = (): string => {
    if (!value) return '';

    const values = Array.isArray(value) ? value : [value];
    const labels: string[] = [];

    const findLabels = (nodes: TreeSelectNode[]) => {
      nodes.forEach((node) => {
        if (values.includes(node.value)) {
          labels.push(node.label);
        }
        if (node.children) {
          findLabels(node.children);
        }
      });
    };

    findLabels(data);
    return labels.join(', ');
  };

  // Filter tree by search
  const filterTree = (nodes: TreeSelectNode[], query: string): TreeSelectNode[] => {
    if (!query) return nodes;

    const q = query.toLowerCase();
    const filtered: TreeSelectNode[] = [];

    nodes.forEach((node) => {
      const matches = node.label.toLowerCase().includes(q);
      const filteredChildren = node.children ? filterTree(node.children, query) : [];

      if (matches || filteredChildren.length > 0) {
        filtered.push({
          ...node,
          children: filteredChildren.length > 0 ? filteredChildren : node.children,
        });

        // Auto-expand nodes with matches
        if (filteredChildren.length > 0) {
          setExpandedNodes((prev) => new Set(prev).add(node.value));
        }
      }
    });

    return filtered;
  };

  const filteredData = filterTree(data, searchQuery);

  // Render tree node
  const renderNode = (node: TreeSelectNode, level: number = 0): ReactNode => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.value);
    const isSelected = multiple
      ? Array.isArray(value) && value.includes(node.value)
      : value === node.value;

    return (
      <div key={node.value} className={styles.treeNode}>
        <div
          className={`${styles.treeNodeContent} ${isSelected ? styles.treeNodeSelected : ''} ${
            node.disabled ? styles.treeNodeDisabled : ''
          }`}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
        >
          {hasChildren ? (
            <button
              className={styles.treeExpandBtn}
              onClick={() => toggleNode(node.value)}
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
          ) : (
            <span className={styles.treeIndent} />
          )}

          {multiple && (
            <input
              type="checkbox"
              className={styles.treeCheckbox}
              checked={isSelected}
              onChange={() => handleNodeSelect(node.value)}
              disabled={disabled || node.disabled}
            />
          )}

          <div
            className={styles.treeLabel}
            onClick={() => !multiple && handleNodeSelect(node.value)}
            role={!multiple ? 'button' : undefined}
          >
            {node.icon && <span className={styles.treeIcon}>{node.icon}</span>}
            <span>{node.label}</span>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className={styles.treeChildren}>
            {node.children!.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // Clear selection
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleChange(multiple ? [] : '');
  };

  const selectedLabel = getSelectedLabels();
  const showClearButton = clearable && !disabled && selectedLabel;

  return (
    <div className={`${styles.treeselect} ${className}`} ref={containerRef}>
      {/* Trigger */}
      <div
        className={`${styles.treeselectTrigger} ${disabled ? styles.disabled : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="tree"
        tabIndex={disabled ? -1 : 0}
      >
        <span className={`${styles.treeselectValue} ${!selectedLabel ? styles.placeholder : ''}`}>
          {selectedLabel || placeholder}
        </span>
        <div className={styles.treeselectIcons}>
          {showClearButton && (
            <button
              className={styles.treeselectClearBtn}
              onClick={handleClear}
              aria-label="Clear selection"
            >
              <X size={16} />
            </button>
          )}
          <ChevronDown
            className={`${styles.treeselectIcon} ${isOpen ? styles.treeselectIconOpen : ''}`}
            size={16}
          />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className={styles.treeselectDropdown}>
          {showSearch && (
            <div className={styles.treeselectSearch}>
              <Search className={styles.treeselectSearchIcon} size={16} />
              <input
                type="text"
                className={styles.treeselectSearchInput}
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}

          <div className={styles.treeselectTree}>
            {filteredData.length === 0 ? (
              <div className={styles.treeselectEmpty}>No results found</div>
            ) : (
              filteredData.map((node) => renderNode(node))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
