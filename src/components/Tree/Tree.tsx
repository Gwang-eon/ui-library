import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import styles from './Tree.module.css';

// ===== Types =====

export interface TreeNodeData {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: TreeNodeData[];
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface TreeProps {
  data: TreeNodeData[];
  selectable?: boolean;
  compact?: boolean;
  defaultExpandAll?: boolean;
  onSelect?: (nodeIds: string[]) => void;
  className?: string;
}

interface TreeNodeProps {
  node: TreeNodeData;
  level: number;
  selectable?: boolean;
  compact?: boolean;
  expandedNodes: Set<string>;
  selectedNodes: Set<string>;
  onToggle: (nodeId: string) => void;
  onCheck: (nodeId: string, checked: boolean) => void;
  onNodeClick: (nodeId: string) => void;
}

// ===== Tree Node Component =====

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  level,
  selectable,
  compact,
  expandedNodes,
  selectedNodes,
  onToggle,
  onCheck,
  onNodeClick,
}) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedNodes.has(node.id);
  const isSelected = selectedNodes.has(node.id);
  const isLeaf = !hasChildren;

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      onToggle(node.id);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onCheck(node.id, e.target.checked);
  };

  const handleContentClick = () => {
    if (!selectable && !node.disabled) {
      onNodeClick(node.id);
    }
  };

  const nodeClasses = [
    styles.treeNode,
    isLeaf && styles.treeNodeLeaf,
    node.disabled && styles.treeNodeDisabled,
    isSelected && !selectable && styles.treeNodeSelected,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={nodeClasses}>
      <div className={styles.treeNodeContent}>
        {hasChildren ? (
          <button
            className={`${styles.treeExpandBtn} ${
              isExpanded ? styles.treeExpandBtnExpanded : styles.treeExpandBtnCollapsed
            }`}
            onClick={handleExpandClick}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        ) : (
          <span className={styles.treeIndent} />
        )}

        {selectable && (
          <label className={styles.treeCheckboxLabel}>
            <input
              type="checkbox"
              className={styles.treeCheckbox}
              checked={isSelected}
              onChange={handleCheckboxChange}
              disabled={node.disabled}
            />
            {node.icon && <span className={styles.treeIcon}>{node.icon}</span>}
            <span className={styles.treeLabel}>
              <span className={styles.treeLabelText}>{node.label}</span>
            </span>
            {node.badge && <span className={styles.treeBadge}>{node.badge}</span>}
          </label>
        )}

        {!selectable && (
          <button
            className={styles.treeNodeButton}
            onClick={handleContentClick}
            disabled={node.disabled}
            type="button"
          >
            {node.icon && <span className={styles.treeIcon}>{node.icon}</span>}
            <span className={styles.treeLabel}>
              <span className={styles.treeLabelText}>{node.label}</span>
            </span>
            {node.badge && <span className={styles.treeBadge}>{node.badge}</span>}
          </button>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className={styles.treeChildren}>
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              selectable={selectable}
              compact={compact}
              expandedNodes={expandedNodes}
              selectedNodes={selectedNodes}
              onToggle={onToggle}
              onCheck={onCheck}
              onNodeClick={onNodeClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ===== Main Tree Component =====

const Tree: React.FC<TreeProps> = ({
  data,
  selectable = false,
  compact = false,
  defaultExpandAll = false,
  onSelect,
  className = '',
}) => {
  // Initialize expanded nodes
  const getDefaultExpandedNodes = (): Set<string> => {
    if (!defaultExpandAll) return new Set();

    const expandedSet = new Set<string>();
    const traverse = (nodes: TreeNodeData[]) => {
      nodes.forEach((node) => {
        if (node.children && node.children.length > 0) {
          expandedSet.add(node.id);
          traverse(node.children);
        }
      });
    };
    traverse(data);
    return expandedSet;
  };

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(getDefaultExpandedNodes());
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());

  const handleToggle = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const handleCheck = (nodeId: string, checked: boolean) => {
    const newSelectedNodes = new Set(selectedNodes);

    // Helper to get all descendant IDs
    const getDescendantIds = (nodes: TreeNodeData[]): string[] => {
      let ids: string[] = [];
      nodes.forEach((node) => {
        ids.push(node.id);
        if (node.children) {
          ids = ids.concat(getDescendantIds(node.children));
        }
      });
      return ids;
    };

    // Find the node in the tree
    const findNode = (nodes: TreeNodeData[], id: string): TreeNodeData | null => {
      for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children) {
          const found = findNode(node.children, id);
          if (found) return found;
        }
      }
      return null;
    };

    const targetNode = findNode(data, nodeId);
    if (!targetNode) return;

    // Update current node and all descendants
    if (checked) {
      newSelectedNodes.add(nodeId);
      if (targetNode.children) {
        getDescendantIds(targetNode.children).forEach((id) => newSelectedNodes.add(id));
      }
    } else {
      newSelectedNodes.delete(nodeId);
      if (targetNode.children) {
        getDescendantIds(targetNode.children).forEach((id) => newSelectedNodes.delete(id));
      }
    }

    setSelectedNodes(newSelectedNodes);
    if (onSelect) {
      onSelect(Array.from(newSelectedNodes));
    }
  };

  const handleNodeClick = (nodeId: string) => {
    setSelectedNodes(new Set([nodeId]));
    if (onSelect) {
      onSelect([nodeId]);
    }
  };

  const treeClasses = [
    styles.tree,
    selectable && styles.treeSelectable,
    compact && styles.treeCompact,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={treeClasses}>
      {data.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          level={0}
          selectable={selectable}
          compact={compact}
          expandedNodes={expandedNodes}
          selectedNodes={selectedNodes}
          onToggle={handleToggle}
          onCheck={handleCheck}
          onNodeClick={handleNodeClick}
        />
      ))}
    </div>
  );
};

export { Tree };
