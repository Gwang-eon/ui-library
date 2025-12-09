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

  const fabClassName = `
    ${styles.fab}
    ${styles[size]}
    ${styles[position]}
    ${color !== 'primary' ? styles[color] : ''}
    ${hidden ? styles.hidden : ''}
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
      <div className={`${styles.fabWrapper} ${styles[position]}`}>
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
}

export const SpeedDialFAB: React.FC<SpeedDialFABProps> = ({
  icon: Icon,
  actions,
  position = 'bottom-right',
  color = 'primary',
  className = '',
}) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleActionClick = (action: SpeedDialAction) => {
    action.onClick();
    setOpen(false);
  };

  return (
    <>
      <div className={`${styles.speedDial} ${styles[position]} ${open ? styles.speedDialOpen : ''} ${className}`}>
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
        <button
          className={`${styles.fab} ${styles.standard} ${color !== 'primary' ? styles[color] : ''}`}
          onClick={handleToggle}
        >
          <Icon className={styles.icon} />
        </button>
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
