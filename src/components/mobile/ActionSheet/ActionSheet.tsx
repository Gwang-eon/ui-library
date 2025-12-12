import React, { useEffect } from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './ActionSheet.module.css';

type IconType = LucideIcon;

// ==================== Action Sheet ====================

export interface ActionSheetAction {
  icon?: IconType;
  label: string;
  onAction: () => void;
  danger?: boolean;
  disabled?: boolean;
}

export interface ActionSheetProps {
  open: boolean;
  onClose: () => void;
  actions: ActionSheetAction[];
  title?: string;
  description?: string;
  cancelLabel?: string;
  showBackdrop?: boolean;
  className?: string;
}

export const ActionSheet: React.FC<ActionSheetProps> = ({
  open,
  onClose,
  actions,
  title,
  description,
  cancelLabel = 'Cancel',
  showBackdrop = true,
  className = '',
}) => {
  // Body scroll lock when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleActionClick = (action: ActionSheetAction) => {
    if (!action.disabled) {
      action.onAction();
      onClose();
    }
  };

  const actionSheetClassName = `
    ${styles.actionSheet}
    ${open ? styles.open : ''}
    ${className}
  `.trim();

  const backdropClassName = `
    ${styles.actionSheetBackdrop}
    ${open ? styles.show : ''}
  `.trim();

  if (!open) {
    return null;
  }

  return (
    <>
      {showBackdrop && (
        <div
          className={backdropClassName}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div className={actionSheetClassName} role="dialog" aria-modal="true" aria-labelledby={title ? 'action-sheet-title' : undefined}>
        <div className={styles.actionSheetContent}>
          {(title || description) && (
            <div className={styles.actionSheetHeader}>
              {title && (
                <h3 id="action-sheet-title" className={styles.actionSheetTitle}>
                  {title}
                </h3>
              )}
              {description && (
                <p className={styles.actionSheetDescription}>{description}</p>
              )}
            </div>
          )}

          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className={`
                  ${styles.actionSheetItem}
                  ${action.danger ? styles.danger : ''}
                `.trim()}
                onClick={() => handleActionClick(action)}
                disabled={action.disabled}
              >
                {Icon && <Icon className={styles.actionIcon} />}
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>

        <button className={styles.actionSheetCancel} onClick={onClose}>
          {cancelLabel}
        </button>
      </div>
    </>
  );
};

// ==================== Main Export ====================

export default ActionSheet;
