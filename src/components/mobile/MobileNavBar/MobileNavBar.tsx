import React from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './MobileNavBar.module.css';

type IconType = LucideIcon;

// ==================== Mobile Nav Bar ====================

export type MobileNavBarStyle = 'top-bar' | 'background' | 'bottom-bar' | 'filled' | 'outlined' | 'minimal';

export interface MobileNavItem {
  icon: IconType;
  label: string;
  href?: string;
  badge?: number | 'dot';
  onClick?: () => void;
  'aria-label'?: string;
}

export interface MobileNavBarProps {
  items: MobileNavItem[];
  activeIndex?: number;
  onItemClick?: (index: number) => void;
  style?: MobileNavBarStyle;
  withSafeArea?: boolean;
  className?: string;
}

export const MobileNavBar: React.FC<MobileNavBarProps> = ({
  items,
  activeIndex = 0,
  onItemClick,
  style = 'top-bar',
  withSafeArea = true,
  className = '',
}) => {
  const handleItemClick = (index: number, item: MobileNavItem) => {
    if (item.onClick) {
      item.onClick();
    }
    if (onItemClick) {
      onItemClick(index);
    }
  };

  const navClassName = `
    ${styles.mobileNavBar}
    ${style !== 'top-bar' ? styles[`style${style.charAt(0).toUpperCase() + style.slice(1).replace('-', '')}`] : ''}
    ${withSafeArea ? styles.withSafeArea : ''}
    ${className}
  `.trim();

  return (
    <nav className={navClassName} role="navigation" aria-label="Mobile navigation">
      {items.map((item, index) => {
        const Icon = item.icon;
        const isActive = index === activeIndex;

        // If href is provided, render as link
        if (item.href) {
          return (
            <a
              key={index}
              href={item.href}
              className={`${styles.mobileNavItem} ${isActive ? styles.active : ''}`}
              aria-label={item['aria-label'] || item.label}
              aria-current={isActive ? 'page' : undefined}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  handleItemClick(index, item);
                }
              }}
            >
              <div className={styles.mobileNavIcon}>
                <Icon className={styles.icon} />
                {item.badge !== undefined && item.badge !== 0 && (
                  <span className={`${styles.mobileNavBadge} ${item.badge === 'dot' ? styles.dot : ''}`}>
                    {item.badge !== 'dot' ? item.badge : ''}
                  </span>
                )}
              </div>
              <span className={styles.mobileNavLabel}>{item.label}</span>
            </a>
          );
        }

        // Otherwise, render as button
        return (
          <button
            key={index}
            type="button"
            className={`${styles.mobileNavItem} ${isActive ? styles.active : ''}`}
            aria-label={item['aria-label'] || item.label}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => handleItemClick(index, item)}
          >
            <div className={styles.mobileNavIcon}>
              <Icon className={styles.icon} />
              {item.badge !== undefined && item.badge !== 0 && (
                <span className={`${styles.mobileNavBadge} ${item.badge === 'dot' ? styles.dot : ''}`}>
                  {item.badge !== 'dot' ? item.badge : ''}
                </span>
              )}
            </div>
            <span className={styles.mobileNavLabel}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

// ==================== Main Export ====================

export default MobileNavBar;
