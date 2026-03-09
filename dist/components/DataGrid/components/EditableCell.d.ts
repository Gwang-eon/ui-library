/**
 * EditableCell
 * Editable cell component with validation and multiple editor types
 */
import React from 'react';
import { Row } from '@tanstack/react-table';
import type { EditorType, EditorOption } from '../types';
interface EditableCellProps {
    value: unknown;
    row: Row<any>;
    column: any;
    onEdit?: (rowId: string, columnId: string, value: unknown) => void;
    editComponent?: React.ComponentType<any>;
    editorType?: EditorType;
    editorOptions?: EditorOption[];
    validateCell?: (value: unknown, row: any) => string | null;
    editTooltip?: string;
}
export declare const EditableCell: React.NamedExoticComponent<EditableCellProps>;
export default EditableCell;
