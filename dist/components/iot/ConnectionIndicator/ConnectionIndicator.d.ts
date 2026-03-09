import React from 'react';
export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected' | 'warning';
export type ConnectionSize = 'sm' | 'md' | 'lg';
export interface ConnectionIndicatorProps {
    status: ConnectionStatus;
    label?: string;
    size?: ConnectionSize;
    showPulse?: boolean;
    className?: string;
}
export declare const ConnectionIndicator: React.FC<ConnectionIndicatorProps>;
export interface ConnectionDotProps {
    status: ConnectionStatus;
    showPulse?: boolean;
    className?: string;
}
export declare const ConnectionDot: React.FC<ConnectionDotProps>;
export type SignalStrength = 'excellent' | 'good' | 'fair' | 'poor' | 'none';
export interface SignalIndicatorProps {
    strength: SignalStrength;
    className?: string;
}
export declare const SignalIndicator: React.FC<SignalIndicatorProps>;
/**
 * Convert signal strength number (0-4) to SignalStrength type
 */
export declare const getSignalStrength: (bars: number) => SignalStrength;
/**
 * Get connection status based on conditions
 */
export declare const getConnectionStatus: (isConnected: boolean, isConnecting?: boolean, hasWarning?: boolean) => ConnectionStatus;
declare const _default: {
    ConnectionIndicator: React.FC<ConnectionIndicatorProps>;
    ConnectionDot: React.FC<ConnectionDotProps>;
    SignalIndicator: React.FC<SignalIndicatorProps>;
    getSignalStrength: (bars: number) => SignalStrength;
    getConnectionStatus: (isConnected: boolean, isConnecting?: boolean, hasWarning?: boolean) => ConnectionStatus;
};
export default _default;
