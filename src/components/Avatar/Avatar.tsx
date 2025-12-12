import React from 'react';
import styles from './Avatar.module.css';

// ===== Types =====

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

// ===== Avatar Component =====

const AvatarBase: React.FC<AvatarProps> = ({
  src,
  alt,
  initials,
  icon,
  size = 'md',
  shape = 'circle',
  color = 'primary',
  status,
  className = '',
}) => {
  const avatarClasses = [
    styles.avatar,
    styles[`avatar${shape.charAt(0).toUpperCase()}${shape.slice(1)}`],
    styles[`avatar${size.charAt(0).toUpperCase()}${size.slice(1)}`],
    !src && styles[`avatar${color.charAt(0).toUpperCase()}${color.slice(1)}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const statusClasses = status
    ? [
        styles.avatarBadge,
        status !== 'online' && styles[`avatarBadge${status.charAt(0).toUpperCase()}${status.slice(1)}`],
      ]
        .filter(Boolean)
        .join(' ')
    : '';

  return (
    <div className={avatarClasses}>
      {src ? (
        <img src={src} alt={alt || 'Avatar'} />
      ) : icon ? (
        icon
      ) : initials ? (
        <span>{initials}</span>
      ) : null}
      {status && <span className={statusClasses} />}
    </div>
  );
};

// ===== Avatar Group Component =====

const AvatarGroup: React.FC<AvatarGroupProps> = ({ children, className = '' }) => {
  return <div className={`${styles.avatarGroup} ${className}`}>{children}</div>;
};

// Combine Avatar with Group property
const Avatar = Object.assign(AvatarBase, { Group: AvatarGroup });

export { Avatar, AvatarGroup };
