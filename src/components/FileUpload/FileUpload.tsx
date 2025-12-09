import React, { useRef, useState, useCallback } from 'react';
import { UploadCloud, FileText, X } from 'lucide-react';
import styles from './FileUpload.module.css';

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

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  helperText,
  accept,
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 10,
  multiple = false,
  disabled = false,
  showPreview = false,
  useNativeInput = false,
  icon,
  uploadText = 'Click to upload or drag and drop',
  hintText,
  onFilesChange,
  onFileRemove,
  validator,
  className = '',
}) => {
  const [files, setFiles] = useState<FileUploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Generate unique ID for file
  const generateFileId = () => `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Validate file
  const validateFile = useCallback(
    (file: File): string | null => {
      // Custom validator
      if (validator) {
        const error = validator(file);
        if (error) return error;
      }

      // Size check
      if (maxSize && file.size > maxSize) {
        const sizeMB = (maxSize / 1024 / 1024).toFixed(0);
        return `File size exceeds ${sizeMB}MB limit`;
      }

      // Type check (basic)
      if (accept) {
        const acceptedTypes = accept.split(',').map((t) => t.trim());
        const fileExt = `.${file.name.split('.').pop()?.toLowerCase()}`;
        const fileMimeType = file.type;

        const isAccepted = acceptedTypes.some((type) => {
          if (type.startsWith('.')) {
            return fileExt === type.toLowerCase();
          }
          if (type.includes('*')) {
            const [main] = type.split('/');
            return fileMimeType.startsWith(main);
          }
          return fileMimeType === type;
        });

        if (!isAccepted) {
          return 'File type not supported';
        }
      }

      return null;
    },
    [accept, maxSize, validator]
  );

  // Process files
  const processFiles = useCallback(
    (fileList: FileList | File[]) => {
      const newFiles: FileUploadFile[] = [];
      const fileArray = Array.from(fileList);

      // Check max files
      if (!multiple && fileArray.length > 1) {
        fileArray.splice(1);
      }

      const totalFiles = multiple ? files.length + fileArray.length : fileArray.length;
      if (totalFiles > maxFiles) {
        alert(`Maximum ${maxFiles} files allowed`);
        return;
      }

      fileArray.forEach((file) => {
        const error = validateFile(file);
        const fileWithMeta = Object.assign(file, {
          id: generateFileId(),
          status: error ? ('error' as const) : ('idle' as const),
          error: error ?? undefined,
        });

        // Generate preview for images
        if (showPreview && file.type.startsWith('image/') && !error) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const preview = e.target?.result as string;
            setFiles((prev) =>
              prev.map((f) => (f.id === fileWithMeta.id ? { ...f, preview } : f))
            );
          };
          reader.readAsDataURL(file);
        }

        newFiles.push(fileWithMeta);
      });

      if (multiple) {
        setFiles((prev) => [...prev, ...newFiles]);
        onFilesChange?.([...files, ...newFiles]);
      } else {
        setFiles(newFiles);
        onFilesChange?.(newFiles);
      }
    },
    [files, multiple, maxFiles, validateFile, showPreview, onFilesChange]
  );

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      processFiles(fileList);
    }
  };

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget === dropZoneRef.current) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      processFiles(droppedFiles);
    }
  };

  // Handle click
  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  // Handle file remove
  const handleRemove = (fileToRemove: FileUploadFile) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileToRemove.id));
    onFileRemove?.(fileToRemove);

    // Reset input if no files left
    if (files.length === 1 && inputRef.current) {
      inputRef.current.value = '';
    }
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className={`${styles['upload-container']} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}

      {useNativeInput ? (
        <>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
            disabled={disabled}
            className={styles['input-file']}
          />
          {helperText && <p className={styles['helper-text']}>{helperText}</p>}
        </>
      ) : (
        <>
          <div
            ref={dropZoneRef}
            className={`${styles['upload-area']} ${
              isDragging ? styles.dragging : ''
            } ${disabled ? styles.disabled : ''}`}
            onClick={handleClick}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-label="File upload area"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
              }
            }}
          >
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              multiple={multiple}
              onChange={handleFileChange}
              disabled={disabled}
              style={{ display: 'none' }}
              aria-hidden="true"
            />

            {icon && <div className={styles['upload-icon']}>{icon}</div>}

            {!icon && (
              <div className={styles['upload-icon']}>
                <UploadCloud size={48} />
              </div>
            )}

            <div className={styles['upload-text']}>{uploadText}</div>
            {hintText && <div className={styles['upload-hint']}>{hintText}</div>}
          </div>

          {helperText && <p className={styles['helper-text']}>{helperText}</p>}
        </>
      )}

      {files.length > 0 && (
        <div className={styles['file-list']}>
          {files.map((file) => (
            <div
              key={file.id}
              className={`${styles['file-item']} ${
                file.status === 'error' ? styles['file-error'] : ''
              } ${file.status === 'success' ? styles['file-success'] : ''}`}
            >
              {showPreview && file.preview && (
                <div className={styles['file-preview']}>
                  <img src={file.preview} alt={file.name} />
                </div>
              )}

              {!file.preview && (
                <div className={styles['file-icon']}>
                  <FileText size={24} />
                </div>
              )}

              <div className={styles['file-info']}>
                <div className={styles['file-name']}>{file.name}</div>
                <div className={styles['file-size']}>{formatFileSize(file.size)}</div>
                {file.error && (
                  <div className={styles['file-error-msg']}>{file.error}</div>
                )}
              </div>

              {file.status === 'uploading' && file.progress !== undefined && (
                <div className={styles['upload-file-progress']}>
                  <div style={{
                    flex: 1,
                    height: '4px',
                    backgroundColor: 'var(--color-gray-200)',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${file.progress}%`,
                      height: '100%',
                      backgroundColor: 'var(--color-primary-500)',
                      transition: 'width var(--duration-normal) var(--ease-out)'
                    }} />
                  </div>
                  <span style={{
                    marginLeft: 'var(--spacing-2)',
                    fontSize: 'var(--font-size-body-small)',
                    color: 'var(--text-secondary)'
                  }}>
                    {file.progress}%
                  </span>
                </div>
              )}

              {file.status !== 'uploading' && (
                <button
                  type="button"
                  className={styles['remove-btn']}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(file);
                  }}
                  aria-label={`Remove ${file.name}`}
                >
                  <X size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
