import { default as React } from 'react';
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type AvatarShape = 'circle' | 'rounded' | 'square';
export type AvatarColor = 'primary' | 'success' | 'warning' | 'error' | 'grey';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';
export interface AvatarProps {
    src?: string;
    alt?: string;
    initials?: string;
    icon?: React.ReactNode;
    size?: AvatarSize;
    shape?: AvatarShape;
    color?: AvatarColor;
    status?: AvatarStatus;
    className?: string;
}
export interface AvatarGroupProps {
    children: React.ReactNode;
    className?: string;
}
declare const AvatarGroup: React.FC<AvatarGroupProps>;
declare const Avatar: React.FC<AvatarProps> & {
    Group: React.FC<AvatarGroupProps>;
};
export { Avatar, AvatarGroup };
