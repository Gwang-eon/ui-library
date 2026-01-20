/**
 * DataGrid Utilities
 * Helper functions for the DataGrid component
 */

/**
 * Convert Date to ISO string format (YYYY-MM-DD)
 */
export const dateToString = (date: Date | null): string => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Convert ISO string format (YYYY-MM-DD) to Date
 */
export const stringToDate = (str: string): Date | null => {
  if (!str) return null;
  const [year, month, day] = str.split('-').map(Number);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
  return new Date(year, month - 1, day);
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
