import { default as React } from 'react';
export interface NotificationCenterProps {
    children: React.ReactNode;
    compact?: boolean;
    className?: string;
}
export interface NotificationCenterHeaderProps {
    children: React.ReactNode;
    count?: number;
    className?: string;
}
export interface NotificationCenterBodyProps {
    children: React.ReactNode;
    className?: string;
}
export interface NotificationCenterFooterProps {
    children: React.ReactNode;
    className?: string;
}
export interface NotificationTabsProps {
    children: React.ReactNode;
    className?: string;
}
export interface NotificationTabProps {
    children: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
    className?: string;
}
export interface NotificationItemProps {
    children: React.ReactNode;
    unread?: boolean;
    clickable?: boolean;
    onClick?: () => void;
    compact?: boolean;
    className?: string;
}
export interface NotificationIconProps {
    children: React.ReactNode;
    variant?: 'error' | 'warning' | 'success' | 'info';
    className?: string;
}
export interface NotificationContentProps {
    children: React.ReactNode;
    className?: string;
}
export interface NotificationTitleProps {
    children: React.ReactNode;
    compact?: boolean;
    className?: string;
}
export interface NotificationMessageProps {
    children: React.ReactNode;
    className?: string;
}
export interface NotificationTimeProps {
    children: React.ReactNode;
    compact?: boolean;
    className?: string;
}
export interface NotificationActionProps {
    onClick?: () => void;
    'aria-label'?: string;
    className?: string;
}
export interface NotificationTriggerProps {
    count?: number;
    onClick?: () => void;
    className?: string;
}
export interface NotificationDotProps {
    variant?: 'error' | 'warning' | 'success' | 'info';
    className?: string;
}
declare const NotificationCenter: ({ children, compact, className, }: NotificationCenterProps) => import("react/jsx-runtime").JSX.Element;
declare const NotificationCenterHeader: ({ children, count, className, }: NotificationCenterHeaderProps) => import("react/jsx-runtime").JSX.Element;
declare const NotificationCenterTitle: ({ children }: {
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
declare const NotificationCenterBody: ({ children, className, }: NotificationCenterBodyProps) => import("react/jsx-runtime").JSX.Element;
declare const NotificationCenterFooter: ({ children, className, }: NotificationCenterFooterProps) => import("react/jsx-runtime").JSX.Element;
declare const NotificationTabs: ({ children, className, }: NotificationTabsProps) => import("react/jsx-runtime").JSX.Element;
declare const NotificationTab: ({ children, active, onClick, className, }: NotificationTabProps) => import("react/jsx-runtime").JSX.Element;
declare const NotificationItem: ({ children, unread, clickable, onClick, compact, className, }: NotificationItemProps) => import("react/jsx-runtime").JSX.Element;
declare const NotificationIcon: ({ children, variant, className, }: NotificationIconProps) => import("react/jsx-runtime").JSX.Element;
declare const NotificationContent: ({ children, className, }: NotificationContentProps) => import("react/jsx-runtime").JSX.Element;
declare const NotificationContentCompact: ({ children, className, }: NotificationContentProps) => import("react/jsx-runtime").JSX.Element;
declare const NotificationTitle: ({ children, compact, className, }: NotificationTitleProps) => import("react/jsx-runtime").JSX.Element;
declare const NotificationMessage: ({ children, className, }: NotificationMessageProps) => import("react/jsx-runtime").JSX.Element;
declare const NotificationTime: ({ children, compact, className, }: NotificationTimeProps) => import("react/jsx-runtime").JSX.Element;
declare const NotificationAction: ({ onClick, "aria-label": ariaLabel, className, }: NotificationActionProps) => import("react/jsx-runtime").JSX.Element;
declare const NotificationArrow: () => import("react/jsx-runtime").JSX.Element;
declare const NotificationTrigger: ({ count, onClick, className, }: NotificationTriggerProps) => import("react/jsx-runtime").JSX.Element;
declare const NotificationDot: ({ variant, className, }: NotificationDotProps) => import("react/jsx-runtime").JSX.Element;
declare const NotificationViewAll: ({ children, href, onClick, }: {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
}) => import("react/jsx-runtime").JSX.Element;
export { NotificationCenter, NotificationCenterHeader, NotificationCenterTitle, NotificationCenterBody, NotificationCenterFooter, NotificationTabs, NotificationTab, NotificationItem, NotificationIcon, NotificationContent, NotificationContentCompact, NotificationTitle, NotificationMessage, NotificationTime, NotificationAction, NotificationArrow, NotificationTrigger, NotificationDot, NotificationViewAll, };
