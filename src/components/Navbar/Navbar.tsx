import React, { useState, useRef, useEffect } from 'react';
import { X, Menu } from 'lucide-react';
import styles from './Navbar.module.css';

export interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

export interface NavbarBrandProps {
  children: React.ReactNode;
  logo?: React.ReactNode;
  className?: string;
}

export interface NavbarNavProps {
  children: React.ReactNode;
  className?: string;
}

export interface NavbarItemProps {
  children: React.ReactNode;
  href?: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface NavbarSearchProps {
  children: React.ReactNode;
  className?: string;
}

export interface NavbarActionsProps {
  children: React.ReactNode;
  className?: string;
}

export interface NavbarDropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export interface NavbarDropdownItemProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const Navbar = ({ children, className = '' }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Clone children and inject mobile menu state
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === NavbarNav) {
      return React.cloneElement(child as React.ReactElement<any>, {
        isMobileMenuOpen,
        onClose: closeMobileMenu,
      });
    }
    return child;
  });

  return (
    <>
      <nav className={`${styles.navbar} ${className}`}>
        {childrenWithProps}

        {/* Mobile Hamburger Button */}
        <button
          className={styles.navbarHamburger}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          className={`${styles.navbarBackdrop} ${isMobileMenuOpen ? styles.show : ''}`}
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
};

const NavbarBrand = ({ children, logo, className = '' }: NavbarBrandProps) => {
  return (
    <div className={`${styles.navbarBrand} ${className}`}>
      {logo}
      {children && <span className={styles.navbarBrandText}>{children}</span>}
    </div>
  );
};

interface NavbarNavInternalProps extends NavbarNavProps {
  isMobileMenuOpen?: boolean;
  onClose?: () => void;
}

const NavbarNav = ({
  children,
  className = '',
  isMobileMenuOpen = false,
  onClose,
}: NavbarNavInternalProps) => {
  // Handle clicks on nav items to close mobile menu
  const handleItemClick = () => {
    if (onClose) {
      onClose();
    }
  };

  // Clone children and inject click handler for mobile
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === NavbarItem) {
      return React.cloneElement(child as React.ReactElement<any>, {
        onMobileClick: handleItemClick,
      });
    }
    return child;
  });

  return (
    <div
      className={`${styles.navbarNav} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''} ${className}`}
    >
      {childrenWithProps}
    </div>
  );
};

interface NavbarItemInternalProps extends NavbarItemProps {
  onMobileClick?: () => void;
}

const NavbarItem = ({
  children,
  href,
  active = false,
  onClick,
  onMobileClick,
  className = ''
}: NavbarItemInternalProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (onMobileClick) {
      onMobileClick();
    }
  };

  const classes = `${styles.navbarItem} ${active ? styles.active : ''} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-current={active ? 'page' : undefined}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      aria-current={active ? 'page' : undefined}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

const NavbarSearch = ({ children, className = '' }: NavbarSearchProps) => {
  return (
    <div className={`${styles.navbarSearch} ${className}`}>
      {children}
    </div>
  );
};

const NavbarActions = ({ children, className = '' }: NavbarActionsProps) => {
  return (
    <div className={`${styles.navbarActions} ${className}`}>
      {children}
    </div>
  );
};

const NavbarDropdown = ({
  trigger,
  children,
  align = 'left',
  className = ''
}: NavbarDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.navbarDropdown} ${className}`} ref={dropdownRef}>
      <div onClick={toggleDropdown}>
        {trigger}
      </div>
      <div
        className={`${styles.navbarDropdownMenu} ${align === 'right' ? styles.navbarDropdownMenuRight : ''} ${isOpen ? styles.show : ''}`}
      >
        {children}
      </div>
    </div>
  );
};

const NavbarDropdownItem = ({
  children,
  href,
  onClick,
  className = ''
}: NavbarDropdownItemProps) => {
  if (href) {
    return (
      <a
        href={href}
        className={`${styles.navbarDropdownItem} ${className}`}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={`${styles.navbarDropdownItem} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const NavbarDropdownDivider = () => {
  return <div className={styles.navbarDropdownDivider} />;
};

export {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarItem,
  NavbarSearch,
  NavbarActions,
  NavbarDropdown,
  NavbarDropdownItem,
  NavbarDropdownDivider,
};
