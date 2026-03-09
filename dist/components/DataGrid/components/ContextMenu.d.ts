/**
 * ContextMenu
 * Right-click context menu for DataGrid cells, rows, and headers
 * Uses Menu component styles for consistent appearance
 */
import React from 'react';
import type { ContextMenuItem, ContextMenuProps } from '../types';
export declare const ContextMenu: React.NamedExoticComponent<ContextMenuProps>;
export declare const getDefaultCellMenuItems: (hasSelection: boolean) => ContextMenuItem[];
export declare const getDefaultRowMenuItems: (isSelected: boolean, hasSelection: boolean) => ContextMenuItem[];
export declare const getDefaultHeaderMenuItems: (isPinned: string | false, isSorted: false | "asc" | "desc", hasFilter: boolean) => ContextMenuItem[];
export default ContextMenu;
