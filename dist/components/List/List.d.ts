import { default as React } from 'react';
export interface ListProps {
    children: React.ReactNode;
    variant?: 'default' | 'compact' | 'divided';
    className?: string;
}
export interface ListItemProps {
    children: React.ReactNode;
    interactive?: boolean;
    onClick?: () => void;
    href?: string;
    className?: string;
}
export interface ListEmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
}
declare const ListItem: React.FC<ListItemProps>;
declare const ListEmptyState: React.FC<ListEmptyStateProps>;
declare const List: React.FC<ListProps> & {
    Item: typeof ListItem;
    EmptyState: typeof ListEmptyState;
};
export { List };
