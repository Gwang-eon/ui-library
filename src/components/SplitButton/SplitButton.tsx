import type { ReactNode, MouseEvent } from 'react';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../Button';
import styles from './SplitButton.module.css';

export interface SplitButtonMenuItem {
  /** Menu item label */
  label?: ReactNode;
  /** Menu item icon */
  icon?: ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Danger styling */
  danger?: boolean;
  /** Divider (renders as separator) */
  divider?: boolean;
}

export interface SplitButtonProps {
  /** Primary action label */
  label?: ReactNode;
  /** Primary action icon */
  icon?: ReactNode;
  /** Primary action click handler */
  onClick?: () => void;
  /** Dropdown menu items */
  items: SplitButtonMenuItem[];
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** ARIA label for action button */
  'aria-label'?: string;
  /** Custom className */
  className?: string;
}

/**
 * Split Button Component
 *
 * Button with primary action and dropdown menu for additional options.
 * Ideal for device control, data export, and automation rules.
 *
 * @example
 * ```tsx
 * <SplitButton
 *   label="Save"
 *   icon={<Save />}
 *   onClick={() => console.log('Save')}
 *   items={[
 *     { label: 'Save', icon: <Save />, onClick: () => {} },
 *     { label: 'Save As', icon: <FilePlus />, onClick: () => {} },
 *     { label: 'Save Template', icon: <FileCopy />, onClick: () => {} },
 *   ]}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With dividers and danger items
 * <SplitButton
 *   label="Delete"
 *   icon={<Trash2 />}
 *   variant="danger"
 *   items={[
 *     { label: 'Delete', icon: <Trash2 />, onClick: () => {} },
 *     { label: 'Archive', icon: <Archive />, onClick: () => {} },
 *     { divider: true },
 *     { label: 'Delete Permanently', icon: <Trash />, onClick: () => {}, danger: true },
 *   ]}
 * />
 * ```
 */
export const SplitButton = ({
  label,
  icon,
  onClick,
  items,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  'aria-label': ariaLabel,
  className,
}: SplitButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const menuItems = menuRef.current?.querySelectorAll(`.${styles.splitButtonMenuItem}`);
        if (!menuItems || menuItems.length === 0) return;

        const currentIndex = Array.from(menuItems).findIndex(
          (item) => item === document.activeElement
        );

        let nextIndex;
        if (event.key === 'ArrowDown') {
          nextIndex = currentIndex + 1 >= menuItems.length ? 0 : currentIndex + 1;
        } else {
          nextIndex = currentIndex - 1 < 0 ? menuItems.length - 1 : currentIndex - 1;
        }

        (menuItems[nextIndex] as HTMLElement).focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  const handleToggleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleActionClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick?.();
  };

  const handleMenuItemClick = (item: SplitButtonMenuItem) => {
    if (item.divider) return;
    item.onClick?.();
    setIsOpen(false);
  };

  const containerClasses = [
    styles.splitButton,
    size === 'sm' && styles.splitButtonSm,
    size === 'lg' && styles.splitButtonLg,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses} ref={containerRef}>
      <Button
        className={styles.splitButtonAction}
        variant={variant}
        size={size}
        onClick={handleActionClick}
        disabled={disabled}
        loading={loading}
        icon={icon}
        aria-label={ariaLabel}
      >
        {label}
      </Button>

      <Button
        className={styles.splitButtonToggle}
        variant={variant}
        size={size}
        onClick={handleToggleClick}
        disabled={disabled || loading}
        aria-label="More options"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        iconOnly
      >
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </Button>

      <ul
        ref={menuRef}
        className={`${styles.splitButtonMenu} ${isOpen ? styles.splitButtonMenuOpen : ''}`}
        role="menu"
      >
        {items.map((item, index) => {
          if (item.divider) {
            return (
              <li
                key={`divider-${index}`}
                className={styles.splitButtonMenuDivider}
                role="separator"
                aria-hidden="true"
              />
            );
          }

          return (
            <li
              key={index}
              className={`${styles.splitButtonMenuItem} ${
                item.danger ? styles.splitButtonMenuItemDanger : ''
              }`}
              role="menuitem"
              tabIndex={0}
              onClick={() => handleMenuItemClick(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleMenuItemClick(item);
                }
              }}
            >
              {item.icon && <span className={styles.splitButtonMenuItemIcon}>{item.icon}</span>}
              <span>{item.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

SplitButton.displayName = 'SplitButton';
