import { default as React } from 'react';
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
declare const Tree: React.FC<TreeProps>;
export { Tree };
