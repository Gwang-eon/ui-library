/**
 * EditableCell
 * Editable cell component with validation and multiple editor types
 */

import React, { memo, useState, useRef, useEffect, useCallback } from 'react';
import { Row } from '@tanstack/react-table';
import type { EditorType, EditorOption } from '../types';
import styles from '../DataGrid.module.css';

interface EditableCellProps {
  value: unknown;
  row: Row<any>;
  column: any;
  onEdit?: (rowId: string, columnId: string, value: unknown) => void;
  editComponent?: React.ComponentType<any>;
  editorType?: EditorType;
  editorOptions?: EditorOption[];
  validateCell?: (value: unknown, row: any) => string | null;
}

export const EditableCell = memo<EditableCellProps>(({
  value: initialValue,
  row,
  column,
  onEdit,
  editComponent: EditComponent,
  editorType = 'text',
  editorOptions,
  validateCell,
}) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    setValue(initialValue);
    setError(null);
  }, [initialValue]);

  useEffect(() => {
    if (isEditing) {
      if (inputRef.current) {
        inputRef.current.focus();
        if (editorType === 'text' || editorType === 'number') {
          inputRef.current.select();
        }
      } else if (selectRef.current) {
        selectRef.current.focus();
      }
    }
  }, [isEditing, editorType]);

  const validate = useCallback((val: unknown): string | null => {
    if (!validateCell) return null;
    return validateCell(val, row.original);
  }, [validateCell, row.original]);

  const handleSave = useCallback(() => {
    const validationError = validate(value);
    if (validationError) {
      setError(validationError);
      return false;
    }
    setIsEditing(false);
    setError(null);
    if (value !== initialValue) {
      onEdit?.(row.id, column.id, value);
    }
    return true;
  }, [value, initialValue, row.id, column.id, onEdit, validate]);

  const handleBlur = useCallback(() => {
    handleSave();
  }, [handleSave]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setValue(initialValue);
      setError(null);
      setIsEditing(false);
    }
  }, [handleSave, initialValue]);

  const handleChange = useCallback((newValue: unknown) => {
    setValue(newValue);
    // Clear error on change
    if (error) {
      const validationError = validate(newValue);
      setError(validationError);
    }
  }, [error, validate]);

  // Format display value based on editor type
  const formatDisplayValue = (val: unknown): string => {
    if (val == null) return '';
    if (editorType === 'select' && editorOptions) {
      const option = editorOptions.find(opt => opt.value === val);
      return option?.label ?? String(val);
    }
    if (editorType === 'date' && val instanceof Date) {
      return val.toLocaleDateString();
    }
    return String(val);
  };

  if (!isEditing) {
    return (
      <div
        className={styles.editableCell}
        onDoubleClick={() => setIsEditing(true)}
      >
        {formatDisplayValue(value)}
      </div>
    );
  }

  // Custom edit component takes precedence
  if (EditComponent) {
    return (
      <div className={styles.editorWrapper}>
        <EditComponent
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
        {error && <div className={styles.editorError}>{error}</div>}
      </div>
    );
  }

  // Built-in editor types
  const renderEditor = () => {
    switch (editorType) {
      case 'number':
        return (
          <input
            ref={inputRef}
            type="number"
            value={value != null ? String(value) : ''}
            onChange={(e) => handleChange(e.target.value === '' ? null : Number(e.target.value))}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`${styles.editInput} ${error ? styles.editInputError : ''}`}
          />
        );

      case 'select':
        return (
          <select
            ref={selectRef}
            value={String(value ?? '')}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`${styles.editSelect} ${error ? styles.editInputError : ''}`}
          >
            {editorOptions?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'date':
        return (
          <input
            ref={inputRef}
            type="date"
            value={value instanceof Date ? value.toISOString().split('T')[0] : String(value ?? '')}
            onChange={(e) => handleChange(e.target.value ? new Date(e.target.value) : null)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`${styles.editInput} ${error ? styles.editInputError : ''}`}
          />
        );

      case 'text':
      default:
        return (
          <input
            ref={inputRef}
            type="text"
            value={String(value ?? '')}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`${styles.editInput} ${error ? styles.editInputError : ''}`}
          />
        );
    }
  };

  return (
    <div className={styles.editorWrapper}>
      {renderEditor()}
      {error && <div className={styles.editorError}>{error}</div>}
    </div>
  );
});

EditableCell.displayName = 'EditableCell';

export default EditableCell;
