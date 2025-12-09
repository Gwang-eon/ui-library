import React from 'react';
import styles from './ConnectionIndicator.module.css';

// ==================== Connection Indicator ====================

export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected' | 'warning';
export type ConnectionSize = 'sm' | 'md' | 'lg';

export interface ConnectionIndicatorProps {
  status: ConnectionStatus;
  label?: string;
  size?: ConnectionSize;
  showPulse?: boolean;
  className?: string;
}

export const ConnectionIndicator: React.FC<ConnectionIndicatorProps> = ({
  status,
  label,
  size = 'md',
  showPulse = false,
  className = '',
}) => {
  const pulseClass = (status === 'connecting' || showPulse) ? styles.pulse : '';

  return (
    <div
      className={`${styles.connectionIndicator} ${styles[`status-${status}`]} ${styles[`size-${size}`]} ${className}`}
    >
      <span className={`${styles.connectionDot} ${pulseClass}`}></span>
      {label && <span className={styles.connectionLabel}>{label}</span>}
    </div>
  );
};

// ==================== Connection Dot (Compact) ====================

export interface ConnectionDotProps {
  status: ConnectionStatus;
  showPulse?: boolean;
  className?: string;
}

export const ConnectionDot: React.FC<ConnectionDotProps> = ({
  status,
  showPulse = false,
  className = '',
}) => {
  const pulseClass = (status === 'connecting' || showPulse) ? styles.pulse : '';

  return (
    <span
      className={`${styles.connectionDotOnly} ${styles[`dotOnly-${status}`]} ${pulseClass} ${className}`}
    ></span>
  );
};

// ==================== Signal Indicator ====================

export type SignalStrength = 'excellent' | 'good' | 'fair' | 'poor' | 'none';

export interface SignalIndicatorProps {
  strength: SignalStrength;
  className?: string;
}

export const SignalIndicator: React.FC<SignalIndicatorProps> = ({
  strength,
  className = '',
}) => {
  return (
    <div className={`${styles.signalIndicator} ${styles[`signal-${strength}`]} ${className}`}>
      <span className={styles.signalBar}></span>
      <span className={styles.signalBar}></span>
      <span className={styles.signalBar}></span>
      <span className={styles.signalBar}></span>
    </div>
  );
};

// ==================== Helper Functions ====================

/**
 * Convert signal strength number (0-4) to SignalStrength type
 */
export const getSignalStrength = (bars: number): SignalStrength => {
  if (bars >= 4) return 'excellent';
  if (bars === 3) return 'good';
  if (bars === 2) return 'fair';
  if (bars === 1) return 'poor';
  return 'none';
};

/**
 * Get connection status based on conditions
 */
export const getConnectionStatus = (
  isConnected: boolean,
  isConnecting?: boolean,
  hasWarning?: boolean
): ConnectionStatus => {
  if (isConnecting) return 'connecting';
  if (!isConnected) return 'disconnected';
  if (hasWarning) return 'warning';
  return 'connected';
};

// ==================== Main Export ====================

export default {
  ConnectionIndicator,
  ConnectionDot,
  SignalIndicator,
  getSignalStrength,
  getConnectionStatus,
};
