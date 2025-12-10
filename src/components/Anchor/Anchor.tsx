import { useState, useEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import styles from './Anchor.module.css';

export interface AnchorItem {
  /** Unique key for the anchor item */
  key: string;
  /** Display title for the anchor link */
  title: ReactNode;
  /** Target href (must start with #) */
  href: string;
  /** Optional icon before the title */
  icon?: ReactNode;
  /** Optional nested anchor items */
  children?: AnchorItem[];
}

export interface AnchorProps {
  /** Array of anchor items to display */
  items: AnchorItem[];
  /** Active anchor key (controlled mode) */
  activeKey?: string;
  /** Offset from top when scrolling to section (in pixels) */
  offsetTop?: number;
  /** Enable sticky positioning */
  sticky?: boolean;
  /** Callback when active section changes */
  onChange?: (activeKey: string) => void;
  /** Additional CSS classes */
  className?: string;
  /** Root margin for Intersection Observer (default: '-20% 0px -80% 0px') */
  rootMargin?: string;
  /** Smooth scroll behavior */
  smooth?: boolean;
}

/**
 * Anchor component - Hyperlinks to scroll on one page
 *
 * Features:
 * - Automatic scroll highlighting using Intersection Observer
 * - Smooth scroll on click
 * - Support for nested anchor links
 * - Keyboard accessible (Arrow keys, Home, End)
 * - Sticky positioning option
 *
 * @example
 * ```tsx
 * <Anchor
 *   items={[
 *     { key: 'overview', title: 'Overview', href: '#overview' },
 *     { key: 'config', title: 'Configuration', href: '#config' }
 *   ]}
 *   sticky
 *   offsetTop={80}
 * />
 * ```
 */
export const Anchor = ({
  items,
  activeKey: controlledActiveKey,
  offsetTop = 60,
  sticky = false,
  onChange,
  className = '',
  rootMargin = '-20% 0px -80% 0px',
  smooth = true,
}: AnchorProps) => {
  const [activeKey, setActiveKey] = useState<string>('');
  const anchorRef = useRef<HTMLElement>(null);
  const linksRef = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Use controlled or uncontrolled active key
  const currentActiveKey = controlledActiveKey !== undefined ? controlledActiveKey : activeKey;

  // Flatten items to get all keys and hrefs
  const flattenItems = useCallback((items: AnchorItem[]): AnchorItem[] => {
    if (!items || !Array.isArray(items)) return [];
    return items.reduce((acc: AnchorItem[], item) => {
      acc.push(item);
      if (item.children) {
        acc.push(...flattenItems(item.children));
      }
      return acc;
    }, []);
  }, []);

  const allItems = flattenItems(items);

  // Set up Intersection Observer for scroll detection
  useEffect(() => {
    if (allItems.length === 0) return;

    const sections: HTMLElement[] = [];

    // Find all target sections
    allItems.forEach((item) => {
      const targetId = item.href.substring(1);
      const section = document.getElementById(targetId);
      if (section) {
        sections.push(section);
      }
    });

    if (sections.length === 0) return;

    // Create Intersection Observer
    const observerOptions: IntersectionObserverInit = {
      rootMargin,
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    // Track which sections are currently visible
    const visibleSections = new Set<string>();

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.add(entry.target.id);
        } else {
          visibleSections.delete(entry.target.id);
        }
      });

      // Get the topmost visible section
      if (visibleSections.size > 0) {
        const firstVisible = sections.find((section) =>
          visibleSections.has(section.id)
        );
        if (firstVisible) {
          const foundItem = allItems.find(
            (item) => item.href === '#' + firstVisible.id
          );
          if (foundItem) {
            const newActiveKey = foundItem.key;
            if (controlledActiveKey === undefined) {
              setActiveKey(newActiveKey);
            }
            onChange?.(newActiveKey);
          }
        }
      }
    }, observerOptions);

    // Observe all sections
    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    // Cleanup
    return () => {
      if (observerRef.current) {
        sections.forEach((section) => {
          observerRef.current?.unobserve(section);
        });
        observerRef.current.disconnect();
      }
    };
  }, [allItems, rootMargin, onChange, controlledActiveKey]);

  // Handle anchor link click
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, item: AnchorItem) => {
      e.preventDefault();

      const targetId = item.href.substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Calculate offset
        const yOffset = -offsetTop;
        const y =
          targetSection.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;

        // Scroll to target
        window.scrollTo({
          top: y,
          behavior: smooth ? 'smooth' : 'auto',
        });

        // Update URL hash without jumping
        if (history.pushState) {
          history.pushState(null, '', item.href);
        }

        // Update active state
        if (controlledActiveKey === undefined) {
          setActiveKey(item.key);
        }
        onChange?.(item.key);
      }
    },
    [offsetTop, smooth, controlledActiveKey, onChange]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLAnchorElement>, currentIndex: number) => {
      const allLinks = Array.from(linksRef.current.values());
      let targetIndex: number;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          targetIndex = Math.min(currentIndex + 1, allLinks.length - 1);
          allLinks[targetIndex]?.focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          targetIndex = Math.max(currentIndex - 1, 0);
          allLinks[targetIndex]?.focus();
          break;
        case 'Home':
          e.preventDefault();
          allLinks[0]?.focus();
          break;
        case 'End':
          e.preventDefault();
          allLinks[allLinks.length - 1]?.focus();
          break;
      }
    },
    []
  );

  // Render anchor item
  const renderAnchorItem = (item: AnchorItem, index: number) => {
    const isActive = currentActiveKey === item.key;

    return (
      <div key={item.key} className={styles.anchorItem}>
        <a
          href={item.href}
          ref={(el) => {
            if (el) {
              linksRef.current.set(item.key, el);
            } else {
              linksRef.current.delete(item.key);
            }
          }}
          className={`${styles.anchorLink} ${isActive ? styles.active : ''}`}
          onClick={(e) => handleClick(e, item)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          aria-current={isActive ? 'location' : undefined}
        >
          {item.icon && <span className={styles.anchorIcon}>{item.icon}</span>}
          <span>{item.title}</span>
        </a>

        {/* Render nested items */}
        {item.children && item.children.length > 0 && (
          <div className={styles.anchorSubmenu}>
            {item.children.map((child, childIndex) =>
              renderAnchorItem(child, index + childIndex + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav
      ref={anchorRef}
      className={`${styles.anchor} ${sticky ? styles.sticky : ''} ${className}`}
      role="navigation"
      aria-label="Page navigation"
    >
      {items.map((item, index) => renderAnchorItem(item, index))}
    </nav>
  );
};
