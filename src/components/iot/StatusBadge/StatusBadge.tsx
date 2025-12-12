import React from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './StatusBadge.module.css';

type IconType = LucideIcon;

// ==================== Status Badge ====================

export type StatusType =
  | 'online'
  | 'offline'
  | 'connecting'
  | 'disconnected'
  | 'active'
  | 'idle'
  | 'warning'
  | 'error'
  | 'maintenance'
  | 'excellent'
  | 'good'
  | 'fair'
  | 'poor'
  | 'no-data'
  | 'battery-full'
  | 'battery-high'
  | 'battery-medium'
  | 'battery-low'
  | 'battery-critical'
  | 'signal-excellent'
  | 'signal-good'
  | 'signal-fair'
  | 'signal-poor';

export interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  showIndicator?: boolean;
  pulse?: boolean;
  icon?: IconType;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  showIndicator = true,
  pulse = false,
  icon: Icon,
  className = '',
}) => {
  const statusClassName = status.split('-').map((word, index) =>
    index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
  ).join('');

  // Generate default label from status if not provided
  const displayLabel = label ?? status.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return (
    <span className={`${styles.statusBadge} ${styles[`status${statusClassName.charAt(0).toUpperCase() + statusClassName.slice(1)}`]} ${className}`}>
      {Icon && <Icon className={styles.statusIcon} />}
      {showIndicator && (
        <span
          className={`${styles.statusIndicator} ${pulse ? styles.statusIndicatorPulse : ''}`}
        />
      )}
      <span>{displayLabel}</span>
    </span>
  );
};

// ==================== Main Export ====================

export default {
  StatusBadge,
};
