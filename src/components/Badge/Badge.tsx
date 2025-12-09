import React from 'react';
import type { ReactNode } from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  children,
  className = '',
  style,
}) => {
  const badgeClasses = [
    styles.badge,
    styles[`badge-${variant}`],
    size !== 'md' && styles[`badge-${size}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={badgeClasses} style={style}>{children}</span>;
};

Badge.displayName = 'Badge';
