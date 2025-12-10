export type DatePickerSize = 'sm' | 'md' | 'lg';
export interface DatePickerProps {
    size?: DatePickerSize;
    error?: boolean;
    disabled?: boolean;
    value?: Date | null;
    onChange?: (date: Date | null) => void;
    placeholder?: string;
    className?: string;
    dateFormat?: string;
    minDate?: Date;
    maxDate?: Date;
    showTimeSelect?: boolean;
    timeFormat?: string;
    timeIntervals?: number;
    isClearable?: boolean;
    showMonthDropdown?: boolean;
    showYearDropdown?: boolean;
    dropdownMode?: 'select' | 'scroll';
    filterDate?: (date: Date) => boolean;
    inline?: boolean;
    monthsShown?: number;
}
export declare const DatePicker: import("react").ForwardRefExoticComponent<DatePickerProps & import("react").RefAttributes<HTMLInputElement>>;
