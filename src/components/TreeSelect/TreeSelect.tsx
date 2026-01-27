import { useState, useRef, useEffect, Fragment } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, ChevronRight, Search, X } from 'lucide-react';
import styles from './TreeSelect.module.css';

export type TreeSelectSize = 'sm' | 'md' | 'lg';

const TREE_ICON_SIZES: Record<TreeSelectSize, number> = {
  sm: 12,
  md: 16,
  lg: 20,
};

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
  /** Size variant */
  size?: TreeSelectSize;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Clear button */
  clearable?: boolean;
  /** Render dropdown via Portal to avoid overflow issues */
  portal?: boolean;
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
  size = 'md',
  disabled = false,
  className = '',
  clearable = false,
  portal = false,
}: TreeSelectProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<string | string[] | null>(
    defaultValue
  );
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMountedRef = useRef(false);

  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        (!portal || (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)))
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, portal]);

  // Calculate dropdown position for portal mode
  useEffect(() => {
    if (portal && isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const dropdownHeight = 300;

      let top = rect.bottom + 4;
      const left = rect.left;
      const width = rect.width;

      if (top + dropdownHeight > window.innerHeight) {
        top = rect.top - dropdownHeight - 4;
      }

      setDropdownPosition({ top, left, width });
    }
  }, [portal, isOpen]);

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

  // Filter tree by search (pure function, no side effects)
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
      }
    });

    return filtered;
  };

  // Get nodes that should be auto-expanded when searching
  const getMatchingParentNodes = (nodes: TreeSelectNode[], query: string): string[] => {
    if (!query) return [];

    const q = query.toLowerCase();
    const parentNodes: string[] = [];

    const traverse = (nodeList: TreeSelectNode[]) => {
      nodeList.forEach((node) => {
        if (node.children && node.children.length > 0) {
          const hasMatchingDescendant = node.children.some(
            (child) =>
              child.label.toLowerCase().includes(q) ||
              (child.children && getMatchingParentNodes([child], query).length > 0)
          );
          if (hasMatchingDescendant) {
            parentNodes.push(node.value);
          }
          traverse(node.children);
        }
      });
    };

    traverse(nodes);
    return parentNodes;
  };

  // Track mounted state
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Auto-expand nodes when search query changes
  useEffect(() => {
    if (!isMountedRef.current) return;

    if (searchQuery) {
      const nodesToExpand = getMatchingParentNodes(data, searchQuery);
      if (nodesToExpand.length > 0) {
        setExpandedNodes((prev) => {
          const next = new Set(prev);
          nodesToExpand.forEach((nodeValue) => next.add(nodeValue));
          return next;
        });
      }
    }
  }, [searchQuery, data]);

  const filteredData = filterTree(data, searchQuery);

  // Render tree node
  const renderNode = (node: TreeSelectNode, level: number = 0): ReactNode => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.value);
    const isSelected = multiple
      ? Array.isArray(value) && value.includes(node.value)
      : value === node.value;

    return (
      <div className={styles.treeNode}>
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
              {isExpanded ? <ChevronDown size={TREE_ICON_SIZES[size]} /> : <ChevronRight size={TREE_ICON_SIZES[size]} />}
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
            {node.children!.map((child) => (
              <Fragment key={child.value}>{renderNode(child, level + 1)}</Fragment>
            ))}
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
    <div className={`${styles.treeselect} ${styles[`treeselect-${size}`]} ${className}`} ref={containerRef}>
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
              <X size={TREE_ICON_SIZES[size]} />
            </button>
          )}
          <ChevronDown
            className={`${styles.treeselectIcon} ${isOpen ? styles.treeselectIconOpen : ''}`}
            size={TREE_ICON_SIZES[size]}
          />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (() => {
        const dropdownContent = (
          <div
            ref={dropdownRef}
            className={`${styles.treeselectDropdown} ${portal ? styles.portalDropdown : ''}`}
            style={portal ? {
              position: 'fixed',
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
            } : undefined}
          >
            {showSearch && (
              <div className={styles.treeselectSearch}>
                <Search className={styles.treeselectSearchIcon} size={TREE_ICON_SIZES[size]} />
                <input
                  type="text"
                  className={styles.treeselectSearchInput}
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}

            <div className={styles.treeselectTree} role="tree">
              {filteredData.length === 0 ? (
                <div className={styles.treeselectEmpty}>No results found</div>
              ) : (
                filteredData.map((node) => (
                  <Fragment key={node.value}>{renderNode(node)}</Fragment>
                ))
              )}
            </div>
          </div>
        );
        return portal ? createPortal(dropdownContent, document.body) : dropdownContent;
      })()}
    </div>
  );
};
