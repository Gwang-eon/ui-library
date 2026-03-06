/**
 * DataGrid Utilities
 * Helper functions for the DataGrid component
 */

/**
 * Convert Date to local date string format (YYYY-MM-DD)
 * Uses local date parts to avoid timezone offset issues
 */
export const dateToString = (date: Date | null): string => {
  if (!date || isNaN(date.getTime())) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Convert ISO string format (YYYY-MM-DD) to Date at local midnight
 * Parses as local date (not UTC) to match dateToString behavior
 */
export const stringToDate = (str: string): Date | null => {
  if (!str) return null;
  const parts = str.split('-');
  if (parts.length !== 3) return null;
  const [year, month, day] = parts.map(Number);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return new Date(year, month - 1, day);
};

/**
 * Format a locale string with placeholder values
 * e.g. formatLocale('Showing {start} to {end}', { start: 1, end: 10 })
 */
export const formatLocale = (template: string, values: Record<string, string | number>): string => {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    return values[key] !== undefined ? String(values[key]) : `{${key}}`;
  });
};

/**
 * Safe wrapper for getFacetedUniqueValues
 * Handles React StrictMode double-render issues
 */
export const getSafeFacetedUniqueValues = (column: any): Map<any, number> => {
  try {
    return column.getFacetedUniqueValues() ?? new Map();
  } catch {
    return new Map();
  }
};

/**
 * Safe wrapper for getFacetedMinMaxValues
 * Handles React StrictMode double-render issues
 */
export const getSafeFacetedMinMaxValues = (column: any): [number, number] | undefined => {
  try {
    return column.getFacetedMinMaxValues();
  } catch {
    return undefined;
  }
};
