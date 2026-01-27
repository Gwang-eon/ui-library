import React, { useState, useRef, useEffect } from 'react';
import type { ReactNode, HTMLAttributes, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { createPortal } from 'react-dom';
import styles from './Menu.module.css';

export type MenuSize = 'sm' | 'md' | 'lg';

// Menu Container Component
export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  trigger: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: 'left' | 'right';
  wide?: boolean;
  /** Size variant */
  size?: MenuSize;
  className?: string;
  /** Render menu via Portal to avoid overflow issues */
  portal?: boolean;
}

export const Menu: React.FC<MenuProps> = ({
  trigger,
  children,
  open: controlledOpen,
  onOpenChange,
  align = 'left',
  wide = false,
  size = 'md',
  className = '',
  portal = false,
  ...props
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const menuDropdownRef = useRef<HTMLDivElement>(null);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const handleToggle = () => {
    const newOpen = !isOpen;
    if (!isControlled) {
      setUncontrolledOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  const handleClose = () => {
    if (!isControlled) {
      setUncontrolledOpen(false);
    }
    onOpenChange?.(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        (!portal || (menuDropdownRef.current && !menuDropdownRef.current.contains(event.target as Node)))
      ) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, portal]);

  // Calculate menu position for portal mode
  useEffect(() => {
    if (portal && isOpen && menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const menuHeight = 200;

      let top = rect.bottom + 4;
      let left = align === 'right' ? rect.right : rect.left;

      if (top + menuHeight > window.innerHeight) {
        top = rect.top - menuHeight - 4;
      }

      setMenuPosition({ top, left });
    }
  }, [portal, isOpen, align]);

  const containerClass = [styles['menu-container'], className].filter(Boolean).join(' ');

  const menuClass = [
    styles.menu,
    wide && styles['menu-wide'],
    align === 'right' && styles['menu-right'],
    styles[`menu-${size}`],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClass} ref={menuRef} {...props}>
      <div onClick={handleToggle}>{trigger}</div>
      {isOpen && (() => {
        const menuContent = (
          <div
            ref={menuDropdownRef}
            className={`${menuClass} ${portal ? styles.portalMenu : ''}`}
            style={portal ? {
              position: 'fixed',
              top: menuPosition.top,
              left: menuPosition.left,
            } : undefined}
          >
            {children}
          </div>
        );
        return portal ? createPortal(menuContent, document.body) : menuContent;
      })()}
    </div>
  );
};

// MenuItem Component
export interface MenuItemProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'> {
  children: ReactNode;
  icon?: ReactNode;
  shortcut?: string;
  danger?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  as?: 'a' | 'button';
}

export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  icon,
  shortcut,
  danger = false,
  disabled = false,
  onClick,
  className = '',
  as = 'a',
  ...props
}) => {
  const itemClass = [
    styles['menu-item'],
    danger && styles['menu-item-danger'],
    disabled && styles['menu-item-disabled'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const content = (
    <>
      {icon && <span className={styles['menu-item-icon']}>{icon}</span>}
      <span>{children}</span>
      {shortcut && <span className={styles['menu-shortcut']}>{shortcut}</span>}
    </>
  );

  if (as === 'button') {
    return (
      <button
        className={itemClass}
        onClick={handleClick as any}
        disabled={disabled}
        type="button"
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }

  return (
    <a
      className={itemClass}
      onClick={handleClick}
      href={disabled ? undefined : props.href || '#'}
      {...props}
    >
      {content}
    </a>
  );
};

// MenuDivider Component
export interface MenuDividerProps {
  className?: string;
}

export const MenuDivider: React.FC<MenuDividerProps> = ({ className = '' }) => {
  const dividerClass = [styles['menu-divider'], className].filter(Boolean).join(' ');
  return <div className={dividerClass} />;
};

// MenuHeader Component
export interface MenuHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const MenuHeader: React.FC<MenuHeaderProps> = ({ children, className = '', ...props }) => {
  const headerClass = [styles['menu-header'], className].filter(Boolean).join(' ');
  return (
    <div className={headerClass} {...props}>
      {children}
    </div>
  );
};

// Display names
Menu.displayName = 'Menu';
MenuItem.displayName = 'MenuItem';
MenuDivider.displayName = 'MenuDivider';
MenuHeader.displayName = 'MenuHeader';
