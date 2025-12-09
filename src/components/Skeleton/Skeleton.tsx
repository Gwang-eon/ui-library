import React from 'react';
import styles from './Skeleton.module.css';

// ===== Types =====

export type SkeletonVariant = 'line' | 'rect' | 'circle';
export type SkeletonAnimation = 'shimmer' | 'pulse';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  animation?: SkeletonAnimation;
  className?: string;
  style?: React.CSSProperties;
}

// ===== Skeleton Component =====

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'line',
  width,
  height,
  animation = 'shimmer',
  className = '',
  style = {},
}) => {
  const skeletonClasses = [
    styles.skeleton,
    styles[`skeleton${variant.charAt(0).toUpperCase()}${variant.slice(1)}`],
    animation === 'pulse' && styles.skeletonPulse,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const skeletonStyle: React.CSSProperties = {
    ...style,
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return <div className={skeletonClasses} style={skeletonStyle} />;
};
