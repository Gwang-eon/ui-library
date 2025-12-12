import { useState } from 'react';
import type { ReactNode } from 'react';
import styles from './Sidemenu.module.css';

export interface SidemenuItem {
  /** Unique key */
  key: string;
  /** Display title */
  title: string;
  /** Icon before title */
  icon?: ReactNode;
  /** Link href */
  href?: string;
  /** Badge count or text */
  badge?: ReactNode;
  /** Nested child items */
  children?: SidemenuItem[];
  /** Disabled state */
  disabled?: boolean;
  /** Tooltip for collapsed mode */
  tooltip?: string;
}

export interface SidemenuGroup {
  /** Group header text */
  title: string;
  /** Group icon */
  icon?: ReactNode;
  /** Group items */
  items: SidemenuItem[];
}

export interface SidemenuProps {
  /** Menu items or grouped items */
  items: (SidemenuItem | SidemenuGroup)[];
  /** Active item key */
  activeKey?: string;
  /** Collapsed state (controlled) */
  collapsed?: boolean;
  /** Default collapsed state */
  defaultCollapsed?: boolean;
  /** Callback when collapsed changes */
  onCollapse?: (collapsed: boolean) => void;
  /** Callback when active item changes */
  onSelect?: (key: string) => void;
  /** Brand logo/icon */
  brandIcon?: ReactNode;
  /** Brand text */
  brandText?: string;
  /** User info */
  userInfo?: {
    name: string;
    email?: string;
    avatar?: string | ReactNode;
  };
  /** Show search */
  showSearch?: boolean;
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Additional CSS classes */
  className?: string;
  /** Storage key for persistence */
  storageKey?: string;
}

const isGroup = (item: SidemenuItem | SidemenuGroup): item is SidemenuGroup => {
  return 'items' in item && Array.isArray(item.items);
};

/**
 * Sidemenu - Enterprise-grade side navigation
 *
 * Features:
 * - Collapsible mode (280px → 64px)
 * - Multi-level hierarchy
 * - Search functionality
 * - Group headers
 * - Persistent state
 *
 * @example
 * ```tsx
 * <Sidemenu
 *   items={[
 *     { key: 'dashboard', title: 'Dashboard', icon: <Home />, href: '#' }
 *   ]}
 *   brandText="IoT Platform"
 *   defaultCollapsed={false}
 * />
 * ```
 */
export const Sidemenu = ({
  items,
  activeKey,
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  onCollapse,
  onSelect,
  brandIcon,
  brandText = 'App',
  userInfo,
  showSearch = false,
  searchPlaceholder = 'Search menu...',
  className = '',
  storageKey = 'sidemenu-collapsed',
}: SidemenuProps) => {
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(() => {
    if (storageKey && typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      return stored ? stored === 'true' : defaultCollapsed;
    }
    return defaultCollapsed;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

  const isCollapsed =
    controlledCollapsed !== undefined ? controlledCollapsed : uncontrolledCollapsed;

  const handleToggleCollapse = () => {
    const newCollapsed = !isCollapsed;
    if (controlledCollapsed === undefined) {
      setUncontrolledCollapsed(newCollapsed);
      if (storageKey && typeof window !== 'undefined') {
        localStorage.setItem(storageKey, String(newCollapsed));
      }
    }
    onCollapse?.(newCollapsed);
  };

  const handleItemClick = (item: SidemenuItem, e: React.MouseEvent) => {
    if (item.disabled) {
      e.preventDefault();
      return;
    }

    if (item.children && item.children.length > 0) {
      e.preventDefault();
      setExpandedKeys((prev) => {
        const next = new Set(prev);
        if (next.has(item.key)) {
          next.delete(item.key);
        } else {
          next.add(item.key);
        }
        return next;
      });
    } else {
      onSelect?.(item.key);
    }
  };

  const matchesSearch = (item: SidemenuItem, query: string): boolean => {
    if (!query) return true;
    const q = query.toLowerCase();
    const titleMatch = item.title.toLowerCase().includes(q);
    const childMatch =
      item.children?.some((child) => matchesSearch(child, query)) || false;
    return titleMatch || childMatch;
  };

  const renderMenuItem = (item: SidemenuItem, level = 0): ReactNode => {
    if (!matchesSearch(item, searchQuery)) return null;

    const isExpanded = expandedKeys.has(item.key);
    const isActive = activeKey === item.key;
    const hasChildren = item.children && item.children.length > 0;

    const itemClass = [
      styles.sidemenuItem,
      isActive && styles.active,
      hasChildren && styles.sidemenuItemParent,
      isExpanded && styles.expanded,
      level > 0 && styles.sidemenuItemChild,
      item.disabled && styles.disabled,
    ]
      .filter(Boolean)
      .join(' ');

    const ItemTag = item.href ? 'a' : 'div';

    return (
      <div key={item.key}>
        <ItemTag
          href={item.href}
          className={itemClass}
          onClick={(e) => handleItemClick(item, e as any)}
          data-tooltip={isCollapsed ? item.tooltip || item.title : undefined}
          aria-current={isActive ? 'page' : undefined}
          aria-expanded={hasChildren ? isExpanded : undefined}
        >
          {item.icon && <span className={styles.sidemenuIcon}>{item.icon}</span>}
          <span className={styles.sidemenuLabel}>{item.title}</span>
          {item.badge && <span className={styles.sidemenuBadge}>{item.badge}</span>}
          {hasChildren && !isCollapsed && (
            <span className={styles.sidemenuChevron}>
              {isExpanded ? '▼' : '▶'}
            </span>
          )}
        </ItemTag>

        {hasChildren && !isCollapsed && isExpanded && (
          <div className={styles.sidemenuSubmenu} data-level={level + 1}>
            {item.children!.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const renderGroup = (group: SidemenuGroup): ReactNode => {
    return (
      <div key={group.title} className={styles.sidemenuGroupWrapper}>
        <div className={styles.sidemenuGroupHeader}>
          {group.icon && <span>{group.icon}</span>}
          <span>{group.title}</span>
        </div>
        {group.items.map((item) => renderMenuItem(item))}
      </div>
    );
  };

  const renderUserAvatar = () => {
    if (!userInfo) return null;

    if (typeof userInfo.avatar === 'string') {
      if (userInfo.avatar.startsWith('http')) {
        return <img src={userInfo.avatar} alt={userInfo.name} />;
      }
      return <div className={styles.sidemenuUserAvatar}>{userInfo.avatar}</div>;
    }

    if (userInfo.avatar) {
      return userInfo.avatar;
    }

    // Default to initials
    const initials = userInfo.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    return <div className={styles.sidemenuUserAvatar}>{initials}</div>;
  };

  return (
    <nav
      className={`${styles.sidemenu} ${isCollapsed ? styles.collapsed : ''} ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Header */}
      <div className={styles.sidemenuHeader}>
        {brandIcon && <span className={styles.sidemenuBrandIcon}>{brandIcon}</span>}
        <span className={styles.sidemenuBrandText}>{brandText}</span>
        <button
          className={styles.sidemenuCollapseBtn}
          onClick={handleToggleCollapse}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!isCollapsed}
        >
          <span>{isCollapsed ? '→' : '←'}</span>
        </button>
      </div>

      {/* Search */}
      {showSearch && !isCollapsed && (
        <div className={styles.sidemenuSearch}>
          <input
            type="text"
            className={styles.sidemenuSearchInput}
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search menu"
          />
        </div>
      )}

      {/* Navigation */}
      <div className={styles.sidemenuNav}>
        {items.map((item) => {
          if (isGroup(item)) {
            return renderGroup(item);
          }
          return renderMenuItem(item);
        })}
      </div>

      {/* Footer */}
      {userInfo && (
        <div className={styles.sidemenuFooter}>
          <div className={styles.sidemenuUser}>
            {renderUserAvatar()}
            <div className={styles.sidemenuUserInfo}>
              <div className={styles.sidemenuUserName}>{userInfo.name}</div>
              {userInfo.email && (
                <div className={styles.sidemenuUserEmail}>{userInfo.email}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
