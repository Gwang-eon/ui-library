import React, { type ReactNode } from 'react';
export interface StatisticProps {
    /** Title/label for the statistic */
    title: string;
    /** Main value to display */
    value: string | number;
    /** Optional prefix (e.g., '$', '€') */
    prefix?: ReactNode;
    /** Optional suffix (e.g., '%', '°C', 'ms') */
    suffix?: ReactNode;
    /** Optional trend configuration */
    trend?: {
        /** Direction of the trend */
        direction: 'up' | 'down';
        /** Trend value/text to display */
        value: string | number;
        /** Icon variant to use */
        icon?: 'trending' | 'arrow';
    };
    /** Optional icon configuration */
    icon?: {
        /** Icon element to display */
        element: ReactNode;
        /** Icon color variant */
        variant?: 'primary' | 'success' | 'warning' | 'error';
    };
    /** Optional description text */
    description?: string;
    /** Color variant for the value */
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
    /** Compact layout for smaller displays */
    compact?: boolean;
    /** Additional CSS class */
    className?: string;
}
/**
 * Statistic Component
 *
 * Displays numerical statistics with trend indicators and formatting.
 * Designed for dashboards, reports, and KPI displays.
 *
 * @example
 * ```tsx
 * <Statistic
 *   title="Active Devices"
 *   value={1248}
 *   trend={{ direction: 'up', value: '12.5%' }}
 * />
 * ```
 */
export declare const Statistic: React.FC<StatisticProps>;
