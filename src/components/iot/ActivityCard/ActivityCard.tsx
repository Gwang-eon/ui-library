import React from 'react';
import styles from './ActivityCard.module.css';

// Custom icon type
type IconType = React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;

export interface ActivityItem {
  id?: string;
  icon?: IconType;
  iconColor?: string;
  iconBackground?: string;
  title: string;
  description?: string;
  time: string;
  actions?: React.ReactNode;
  onClick?: () => void;
}

export interface ActivityGroup {
  title: string;
  items: ActivityItem[];
}

export interface ActivityCardProps {
  title: string;
  badge?: React.ReactNode;
  headerAction?: React.ReactNode;
  items?: ActivityItem[];
  groups?: ActivityGroup[];
  variant?: 'default' | 'timeline' | 'compact';
  footer?: React.ReactNode;
  loading?: boolean;
  className?: string;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  badge,
  headerAction,
  items = [],
  groups = [],
  variant = 'default',
  footer,
  loading = false,
  className = '',
}) => {
  const cardClassName = [
    styles.activityCard,
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (loading) {
    return (
      <div className={cardClassName}>
        <div className={styles.header}>
          <div className={styles.titleSkeleton} />
          <div className={styles.badgeSkeleton} />
        </div>
        <div className={styles.body}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={styles.itemSkeleton}>
              <div className={styles.iconSkeleton} />
              <div className={styles.contentSkeleton}>
                <div className={styles.titleLineSkeleton} />
                <div className={styles.descriptionSkeleton} />
              </div>
              <div className={styles.timeSkeleton} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cardClassName}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.headerRight}>
          {badge}
          {headerAction}
        </div>
      </div>

      <div className={styles.body}>
        {variant === 'timeline' && items.length > 0 && (
          <div className={styles.timeline}>
            {items.map((item, index) => (
              <TimelineItem key={item.id || index} {...item} />
            ))}
          </div>
        )}

        {variant === 'compact' && items.length > 0 && (
          <div className={styles.compactList}>
            {items.map((item, index) => (
              <CompactItem key={item.id || index} {...item} />
            ))}
          </div>
        )}

        {variant === 'default' && items.length > 0 && (
          <>
            {items.map((item, index) => (
              <DefaultItem key={item.id || index} {...item} />
            ))}
          </>
        )}

        {groups.length > 0 && (
          <>
            {groups.map((group, groupIndex) => (
              <div key={groupIndex} className={styles.group}>
                <div className={styles.groupHeader}>{group.title}</div>
                {group.items.map((item, itemIndex) => (
                  <DefaultItem key={item.id || itemIndex} {...item} />
                ))}
              </div>
            ))}
          </>
        )}
      </div>

      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};

// Default Activity Item Component
const DefaultItem: React.FC<ActivityItem> = ({
  icon: Icon,
  iconColor,
  iconBackground,
  title,
  description,
  time,
  actions,
  onClick,
}) => {
  const itemClassName = [
    styles.item,
    onClick && styles.clickable,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={itemClassName} onClick={onClick}>
      {Icon && (
        <div
          className={styles.itemIcon}
          style={{ backgroundColor: iconBackground }}
        >
          <Icon size={20} style={{ color: iconColor }} />
        </div>
      )}
      <div className={styles.itemContent}>
        <div className={styles.itemTitle}>{title}</div>
        {description && (
          <div className={styles.itemDescription}>{description}</div>
        )}
        {actions && <div className={styles.itemActions}>{actions}</div>}
      </div>
      <div className={styles.itemTime}>{time}</div>
    </div>
  );
};

// Timeline Activity Item Component
const TimelineItem: React.FC<ActivityItem> = ({
  iconColor,
  title,
  description,
  time,
}) => {
  return (
    <div className={styles.timelineItem}>
      <div
        className={styles.timelineMarker}
        style={{ backgroundColor: iconColor }}
      />
      <div className={styles.timelineContent}>
        <div className={styles.itemTitle}>{title}</div>
        {description && (
          <div className={styles.itemDescription}>{description}</div>
        )}
        <div className={styles.itemTime}>{time}</div>
      </div>
    </div>
  );
};

// Compact Activity Item Component
const CompactItem: React.FC<ActivityItem> = ({
  icon: Icon,
  iconColor,
  title,
  time,
  onClick,
}) => {
  const itemClassName = [
    styles.compactItem,
    onClick && styles.clickable,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={itemClassName} onClick={onClick}>
      {Icon && <Icon size={16} style={{ color: iconColor }} />}
      <span className={styles.compactText}>{title}</span>
      <span className={styles.compactTime}>{time}</span>
    </div>
  );
};

export default ActivityCard;
