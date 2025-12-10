import React from 'react';
export interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'elevated' | 'outlined';
    hoverable?: boolean;
    selectable?: boolean;
    selected?: boolean;
    onClick?: () => void;
    className?: string;
}
export interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}
export interface CardTitleProps {
    children: React.ReactNode;
    className?: string;
}
export interface CardMediaProps {
    children?: React.ReactNode;
    image?: string;
    alt?: string;
    height?: string | number;
    className?: string;
}
export interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}
export interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}
declare const CardHeader: React.FC<CardHeaderProps>;
declare const CardTitle: React.FC<CardTitleProps>;
declare const CardMedia: React.FC<CardMediaProps>;
declare const CardContent: React.FC<CardContentProps>;
declare const CardFooter: React.FC<CardFooterProps>;
declare const Card: React.FC<CardProps> & {
    Header: typeof CardHeader;
    Title: typeof CardTitle;
    Media: typeof CardMedia;
    Content: typeof CardContent;
    Footer: typeof CardFooter;
};
export { Card };
