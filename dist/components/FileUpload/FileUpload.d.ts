import React from 'react';
export interface FileUploadFile extends File {
    id: string;
    preview?: string;
    progress?: number;
    error?: string;
    status?: 'idle' | 'uploading' | 'success' | 'error';
}
export interface FileUploadProps {
    /**
     * Label text
     */
    label?: string;
    /**
     * Helper text shown below upload area
     */
    helperText?: string;
    /**
     * Accepted file types (e.g., "image/*", ".pdf,.doc")
     */
    accept?: string;
    /**
     * Maximum file size in bytes
     */
    maxSize?: number;
    /**
     * Maximum number of files
     */
    maxFiles?: number;
    /**
     * Allow multiple file selection
     */
    multiple?: boolean;
    /**
     * Disabled state
     */
    disabled?: boolean;
    /**
     * Show file preview for images
     */
    showPreview?: boolean;
    /**
     * Use native file input instead of drag-and-drop area
     */
    useNativeInput?: boolean;
    /**
     * Custom icon element
     */
    icon?: React.ReactNode;
    /**
     * Main text in upload area
     */
    uploadText?: string;
    /**
     * Hint text below main text
     */
    hintText?: string;
    /**
     * Callback when files are selected
     */
    onFilesChange?: (files: File[]) => void;
    /**
     * Callback when file is removed
     */
    onFileRemove?: (file: File) => void;
    /**
     * Custom file validator
     */
    validator?: (file: File) => string | null;
    /**
     * Additional CSS class
     */
    className?: string;
}
export declare const FileUpload: React.FC<FileUploadProps>;
