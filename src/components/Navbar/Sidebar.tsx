import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './Navbar.module.css';

export interface SidebarProps {
  children: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  className?: string;
}

export interface SidebarHeaderProps {
  children: React.ReactNode;
  logo?: React.ReactNode;
  className?: string;
}

export interface SidebarNavProps {
  children: React.ReactNode;
  className?: string;
}

export interface SidebarItemProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  href?: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface SidebarFooterProps {
  children: React.ReactNode;
  className?: string;
}

const Sidebar = ({ children, open = false, onClose, className = '' }: SidebarProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(open);

  useEffect(() => {
    setIsMobileOpen(open);
  }, [open]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const handleClose = () => {
    setIsMobileOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleBackdropClick = () => {
    handleClose();
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMobileOpen]);

  // Clone children and inject mobile close handler for items
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === SidebarNav) {
      return React.cloneElement(child as React.ReactElement<any>, {
        onItemClick: handleClose,
      });
    }
    return child;
  });

  return (
    <>
      <nav className={`${styles.sidebar} ${isMobileOpen ? styles.mobileOpen : ''} ${className}`}>
        {/* Mobile Close Button */}
        <button
          className={styles.sidebarClose}
          onClick={handleClose}
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>

        {childrenWithProps}
      </nav>

      {/* Sidebar Backdrop */}
      {isMobileOpen && (
        <div
          className={`${styles.sidebarBackdrop} ${isMobileOpen ? styles.show : ''}`}
          onClick={handleBackdropClick}
        />
      )}
    </>
  );
};

const SidebarHeader = ({ children, logo, className = '' }: SidebarHeaderProps) => {
  return (
    <div className={`${styles.sidebarHeader} ${className}`}>
      {logo}
      {children}
    </div>
  );
};

interface SidebarNavInternalProps extends SidebarNavProps {
  onItemClick?: () => void;
}

const SidebarNav = ({ children, className = '', onItemClick }: SidebarNavInternalProps) => {
  // Clone children and inject click handler for mobile
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === SidebarItem) {
      return React.cloneElement(child as React.ReactElement<any>, {
        onMobileClick: onItemClick,
      });
    }
    return child;
  });

  return (
    <div className={`${styles.sidebarNav} ${className}`}>
      {childrenWithProps}
    </div>
  );
};

interface SidebarItemInternalProps extends SidebarItemProps {
  onMobileClick?: () => void;
}

const SidebarItem = ({
  children,
  icon,
  badge,
  href,
  active = false,
  onClick,
  onMobileClick,
  className = ''
}: SidebarItemInternalProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (onMobileClick) {
      onMobileClick();
    }
  };

  const classes = `${styles.sidebarItem} ${active ? styles.active : ''} ${className}`;

  const content = (
    <>
      {icon}
      <span>{children}</span>
      {badge}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-current={active ? 'page' : undefined}
        onClick={handleClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={classes}
      aria-current={active ? 'page' : undefined}
      onClick={handleClick}
    >
      {content}
    </button>
  );
};

const SidebarDivider = () => {
  return <div className={styles.sidebarDivider} />;
};

const SidebarFooter = ({ children, className = '' }: SidebarFooterProps) => {
  return (
    <div className={`${styles.sidebarFooter} ${className}`}>
      {children}
    </div>
  );
};

export {
  Sidebar,
  SidebarHeader,
  SidebarNav,
  SidebarItem,
  SidebarDivider,
  SidebarFooter,
};
