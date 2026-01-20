/**
 * ContextMenu
 * Right-click context menu for DataGrid cells, rows, and headers
 * Uses Menu component styles for consistent appearance
 */

import React, { memo, useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ChevronUp,
  ChevronDown,
  X,
  Filter,
  FilterX,
  Copy,
  ClipboardCopy,
  Trash2,
  Pin,
  PinOff,
  Expand,
  EyeOff,
  CheckSquare,
  Square,
  Download,
  ArrowLeftToLine,
  ArrowRightToLine,
  Maximize2,
} from 'lucide-react';
import type { ContextMenuItem, ContextMenuProps } from '../types';
import menuStyles from '../../Menu/Menu.module.css';

export const ContextMenu = memo<ContextMenuProps>(({ x, y, items, onAction, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Adjust position to stay within viewport
  const [position, setPosition] = useState({ x, y });

  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let newX = x;
      let newY = y;

      if (x + rect.width > viewportWidth) {
        newX = viewportWidth - rect.width - 10;
      }
      if (y + rect.height > viewportHeight) {
        newY = viewportHeight - rect.height - 10;
      }

      setPosition({ x: newX, y: newY });
    }
  }, [x, y]);

  return createPortal(
    <div
      ref={menuRef}
      className={menuStyles.menu}
      style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
        right: 'auto',
        bottom: 'auto',
        zIndex: 9999,
      }}
    >
      {items.map((item, index) => (
        item.divider ? (
          <div key={`divider-${index}`} className={menuStyles['menu-divider']} />
        ) : (
          <button
            key={item.id}
            className={`${menuStyles['menu-item']} ${item.disabled ? menuStyles['menu-item-disabled'] : ''} ${item.danger ? menuStyles['menu-item-danger'] : ''}`}
            onClick={() => {
              if (!item.disabled) {
                onAction(item.id);
                onClose();
              }
            }}
            disabled={item.disabled}
            type="button"
          >
            {item.icon && <span className={menuStyles['menu-item-icon']}>{item.icon}</span>}
            <span>{item.label}</span>
            {item.shortcut && <span className={menuStyles['menu-shortcut']}>{item.shortcut}</span>}
          </button>
        )
      ))}
    </div>,
    document.body
  );
});

ContextMenu.displayName = 'ContextMenu';

// ============================================
// Default Context Menu Items
// ============================================

export const getDefaultCellMenuItems = (hasSelection: boolean): ContextMenuItem[] => [
  { id: 'copy-cell', label: 'Copy cell', icon: <Copy size={14} />, shortcut: 'Ctrl+C' },
  { id: 'copy-row', label: 'Copy row', icon: <ClipboardCopy size={14} /> },
  ...(hasSelection ? [{ id: 'copy-selected', label: 'Copy selected rows', icon: <ClipboardCopy size={14} /> }] : []),
  { id: 'divider1', label: '', divider: true },
  { id: 'filter-value', label: 'Filter by this value', icon: <Filter size={14} /> },
  { id: 'filter-clear', label: 'Clear filter', icon: <FilterX size={14} /> },
  { id: 'divider2', label: '', divider: true },
  { id: 'sort-asc', label: 'Sort A → Z', icon: <ChevronUp size={14} /> },
  { id: 'sort-desc', label: 'Sort Z → A', icon: <ChevronDown size={14} /> },
  { id: 'divider3', label: '', divider: true },
  { id: 'export-csv', label: 'Export to CSV', icon: <Download size={14} /> },
];

export const getDefaultRowMenuItems = (isSelected: boolean, hasSelection: boolean): ContextMenuItem[] => [
  { id: 'copy-row', label: 'Copy row', icon: <ClipboardCopy size={14} /> },
  ...(hasSelection ? [{ id: 'copy-selected', label: 'Copy selected rows', icon: <ClipboardCopy size={14} /> }] : []),
  { id: 'divider1', label: '', divider: true },
  { id: 'select', label: isSelected ? 'Deselect row' : 'Select row', icon: isSelected ? <Square size={14} /> : <CheckSquare size={14} /> },
  { id: 'select-all', label: 'Select all', icon: <CheckSquare size={14} /> },
  { id: 'deselect-all', label: 'Deselect all', icon: <Square size={14} /> },
  { id: 'divider2', label: '', divider: true },
  { id: 'expand', label: 'Expand row', icon: <Expand size={14} /> },
  { id: 'pin-top', label: 'Pin to top', icon: <Pin size={14} /> },
  { id: 'pin-bottom', label: 'Pin to bottom', icon: <Pin size={14} /> },
  { id: 'unpin', label: 'Unpin row', icon: <PinOff size={14} /> },
  { id: 'divider3', label: '', divider: true },
  { id: 'delete', label: 'Delete row', icon: <Trash2 size={14} />, danger: true },
];

export const getDefaultHeaderMenuItems = (isPinned: string | false, isSorted: false | 'asc' | 'desc', hasFilter: boolean): ContextMenuItem[] => [
  { id: 'sort-asc', label: 'Sort ascending', icon: <ChevronUp size={14} />, disabled: isSorted === 'asc' },
  { id: 'sort-desc', label: 'Sort descending', icon: <ChevronDown size={14} />, disabled: isSorted === 'desc' },
  { id: 'sort-clear', label: 'Clear sort', icon: <X size={14} />, disabled: !isSorted },
  { id: 'divider1', label: '', divider: true },
  { id: 'filter-clear', label: 'Clear filter', icon: <FilterX size={14} />, disabled: !hasFilter },
  { id: 'divider2', label: '', divider: true },
  { id: 'pin-left', label: 'Pin to left', icon: <ArrowLeftToLine size={14} />, disabled: isPinned === 'left' },
  { id: 'pin-right', label: 'Pin to right', icon: <ArrowRightToLine size={14} />, disabled: isPinned === 'right' },
  { id: 'unpin', label: 'Unpin column', icon: <PinOff size={14} />, disabled: !isPinned },
  { id: 'divider3', label: '', divider: true },
  { id: 'autosize', label: 'Auto-fit width', icon: <Maximize2 size={14} /> },
  { id: 'hide', label: 'Hide column', icon: <EyeOff size={14} /> },
  { id: 'divider4', label: '', divider: true },
  { id: 'export-csv', label: 'Export to CSV', icon: <Download size={14} /> },
];

export default ContextMenu;
