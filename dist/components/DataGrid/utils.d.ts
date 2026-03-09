/**
 * DataGrid Utilities
 * Helper functions for the DataGrid component
 */
/**
 * Convert Date to local date string format (YYYY-MM-DD)
 * Uses local date parts to avoid timezone offset issues
 */
export declare const dateToString: (date: Date | null) => string;
/**
 * Convert ISO string format (YYYY-MM-DD) to Date at local midnight
 * Parses as local date (not UTC) to match dateToString behavior
 */
export declare const stringToDate: (str: string) => Date | null;
/**
 * Format a locale string with placeholder values
 * e.g. formatLocale('Showing {start} to {end}', { start: 1, end: 10 })
 */
export declare const formatLocale: (template: string, values: Record<string, string | number>) => string;
/**
 * Safe wrapper for getFacetedUniqueValues
 * Handles React StrictMode double-render issues
 */
export declare const getSafeFacetedUniqueValues: (column: any) => Map<any, number>;
/**
 * Safe wrapper for getFacetedMinMaxValues
 * Handles React StrictMode double-render issues
 */
export declare const getSafeFacetedMinMaxValues: (column: any) => [number, number] | undefined;
