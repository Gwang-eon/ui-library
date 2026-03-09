/**
 * DebouncedInput
 * Input with debounced onChange for performance
 * Official TanStack Table pattern for filter inputs
 */
import React from 'react';
interface DebouncedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
}
export declare const DebouncedInput: React.FC<DebouncedInputProps>;
export default DebouncedInput;
