/**
 * DateFilter
 * Date and date range filter for DataGrid columns
 */

import React, { memo, useCallback } from 'react';
import { DatePicker } from '../../Calendar/DatePicker';
import { DateRangePicker } from '../../Calendar/DateRangePicker';
import { dateToString, stringToDate } from '../utils';
import styles from '../DataGrid.module.css';

interface DateFilterProps {
  column: any;
  isRange?: boolean;
}

export const DateFilter = memo<DateFilterProps>(({
  column,
  isRange = false,
}) => {
  const columnFilterValue = column.getFilterValue();

  const handleSingleDateChange = useCallback((date: Date | null) => {
    column.setFilterValue(date ? dateToString(date) : undefined);
  }, [column]);

  const handleRangeDateChange = useCallback((range: { startDate: Date | null; endDate: Date | null }) => {
    const startStr = range.startDate ? dateToString(range.startDate) : '';
    const endStr = range.endDate ? dateToString(range.endDate) : '';
    if (!startStr && !endStr) {
      column.setFilterValue(undefined);
    } else {
      column.setFilterValue([startStr, endStr]);
    }
  }, [column]);

  if (isRange) {
    const [startDateStr, endDateStr] = (columnFilterValue as [string, string]) ?? ['', ''];
    return (
      <div className={styles.filterWrapper}>
        <DateRangePicker
          startDate={stringToDate(startDateStr)}
          endDate={stringToDate(endDateStr)}
          onChange={handleRangeDateChange}
          size="sm"
          clearable
          showPresets={false}
          startPlaceholder="Start"
          endPlaceholder="End"
        />
      </div>
    );
  }

  return (
    <div className={styles.filterWrapper}>
      <DatePicker
        value={stringToDate((columnFilterValue as string) ?? '')}
        onChange={handleSingleDateChange}
        size="sm"
        clearable
        placeholder="Select date"
      />
    </div>
  );
});

DateFilter.displayName = 'DateFilter';

export default DateFilter;
