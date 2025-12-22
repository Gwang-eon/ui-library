import React, { useEffect, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './FAB.module.css';

type IconType = LucideIcon;

// ==================== FAB ====================

export type FABSize = 'standard' | 'mini' | 'extended';
export type FABPosition = 'bottom-right' | 'bottom-left' | 'bottom-center' | 'top-right';
export type FABColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

export interface FABProps {
  icon: IconType;
  label?: string;
  size?: FABSize;
  position?: FABPosition;
  color?: FABColor;
  badge?: string | number;
  hideOnScroll?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  /** Use absolute positioning relative to parent container (for demos/contained layouts) */
  relative?: boolean;
}

export const FAB: React.FC<FABProps> = ({
  icon: Icon,
  label,
  size = 'standard',
  position = 'bottom-right',
  color = 'primary',
  badge,
  hideOnScroll = false,
  onClick,
  disabled = false,
  className = '',
  relative = false,
}) => {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (!hideOnScroll) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hideOnScroll, lastScrollY]);

  const positionClass = position === 'bottom-right' ? 'bottomRight'
    : position === 'bottom-left' ? 'bottomLeft'
    : position === 'bottom-center' ? 'bottomCenter'
    : 'topRight';

  const fabClassName = `
    ${styles.fab}
    ${styles[size]}
    ${styles[positionClass]}
    ${color !== 'primary' ? styles[color] : ''}
    ${hidden ? styles.hidden : ''}
    ${relative ? styles.relative : ''}
    ${className}
  `.trim();

  const content = (
    <>
      <Icon className={styles.icon} />
      {label && size === 'extended' && <span className={styles.label}>{label}</span>}
    </>
  );

  if (badge) {
    return (
      <div className={`${styles.fabWrapper} ${styles[positionClass]} ${relative ? styles.relative : ''}`}>
        <button className={fabClassName} onClick={onClick} disabled={disabled}>
          {content}
        </button>
        <span className={styles.badge}>{badge}</span>
      </div>
    );
  }

  return (
    <button className={fabClassName} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
};

// ==================== Speed Dial FAB ====================

export interface SpeedDialAction {
  icon: IconType;
  label: string;
  onClick: () => void;
}

export interface SpeedDialFABProps {
  icon: IconType;
  actions: SpeedDialAction[];
  position?: FABPosition;
  color?: FABColor;
  className?: string;
  /** Use absolute positioning relative to parent container (for demos/contained layouts) */
  relative?: boolean;
}

export const SpeedDialFAB: React.FC<SpeedDialFABProps> = ({
  icon: Icon,
  actions,
  position = 'bottom-right',
  color = 'primary',
  className = '',
  relative = false,
}) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleActionClick = (action: SpeedDialAction) => {
    action.onClick();
    setOpen(false);
  };

  const positionClass = position === 'bottom-right' ? 'bottomRight'
    : position === 'bottom-left' ? 'bottomLeft'
    : position === 'bottom-center' ? 'bottomCenter'
    : 'topRight';

  return (
    <>
      <div className={`${styles.speedDial} ${styles[positionClass]} ${open ? styles.speedDialOpen : ''} ${relative ? styles.relative : ''} ${className}`}>
        <button
          className={`${styles.fab} ${styles.standard} ${color !== 'primary' ? styles[color] : ''}`}
          onClick={handleToggle}
        >
          <Icon className={styles.icon} />
        </button>
        <div className={styles.speedDialActions}>
          {actions.map((action, index) => {
            const ActionIcon = action.icon;
            return (
              <div key={index} className={styles.speedDialAction}>
                <span className={styles.speedDialActionLabel}>{action.label}</span>
                <button
                  className={`${styles.fab} ${styles.mini}`}
                  onClick={() => handleActionClick(action)}
                >
                  <ActionIcon className={styles.icon} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
      {open && (
        <div
          className={styles.speedDialBackdrop}
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

// ==================== Main Export ====================

export default {
  FAB,
  SpeedDialFAB,
};
