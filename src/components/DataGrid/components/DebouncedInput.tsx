/**
 * DebouncedInput
 * Input with debounced onChange for performance
 * Official TanStack Table pattern for filter inputs
 */

import React, { useState, useEffect } from 'react';

interface DebouncedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
}

export const DebouncedInput: React.FC<DebouncedInputProps> = ({
  value: initialValue,
  onChange,
  debounce = 300,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);

  // Sync with external value
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Debounced onChange
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default DebouncedInput;
