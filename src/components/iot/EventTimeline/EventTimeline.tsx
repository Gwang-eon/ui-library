import React from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './EventTimeline.module.css';

type IconType = LucideIcon;

// ==================== Event Timeline ====================

export type EventType = 'success' | 'warning' | 'error' | 'info' | 'default';

export interface EventTimelineProps {
  children: React.ReactNode;
  compact?: boolean;
  className?: string;
}

export const EventTimeline: React.FC<EventTimelineProps> = ({
  children,
  compact = false,
  className = '',
}) => {
  return (
    <div className={`${styles.eventTimeline} ${compact ? styles.eventTimelineCompact : ''} ${className}`}>
      {children}
    </div>
  );
};

// ==================== Event Item ====================

export interface EventMetaItem {
  icon: IconType;
  text: string;
}

export interface EventItemProps {
  type: EventType;
  title: string;
  description?: string;
  time: string;
  meta?: EventMetaItem[];
  icon?: IconType;
  onClick?: () => void;
  className?: string;
}

export const EventItem: React.FC<EventItemProps> = ({
  type,
  title,
  description,
  time,
  meta,
  icon: Icon,
  onClick,
  className = '',
}) => {
  return (
    <div className={`${styles.eventItem} ${styles[`eventItem${type.charAt(0).toUpperCase() + type.slice(1)}`]} ${className}`} onClick={onClick}>
      {Icon ? (
        <div className={`${styles.eventMarker} ${styles.eventMarkerIcon}`}>
          <Icon className={styles.eventIcon} />
        </div>
      ) : (
        <div className={styles.eventMarker} />
      )}
      <div className={styles.eventLine} />
      <div className={styles.eventContent}>
        <div className={styles.eventHeader}>
          <h4 className={styles.eventTitle}>{title}</h4>
          <span className={styles.eventTime}>{time}</span>
        </div>
        {description && <p className={styles.eventDescription}>{description}</p>}
        {meta && meta.length > 0 && (
          <div className={styles.eventMeta}>
            {meta.map((item, index) => (
              <span key={index} className={styles.eventMetaItem}>
                <item.icon />
                <span>{item.text}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== Compact Event Item ====================

export interface EventItemCompactProps {
  type: EventType;
  title: string;
  time: string;
  onClick?: () => void;
  className?: string;
}

export const EventItemCompact: React.FC<EventItemCompactProps> = ({
  type,
  title,
  time,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={`${styles.eventItemCompact} ${styles[`eventItemCompact${type.charAt(0).toUpperCase() + type.slice(1)}`]} ${className}`}
      onClick={onClick}
    >
      <div className={styles.eventMarkerCompact} />
      <div className={styles.eventLineCompact} />
      <div className={styles.eventContentCompact}>
        <h5 className={styles.eventTitleCompact}>{title}</h5>
        <p className={styles.eventTimeCompact}>{time}</p>
      </div>
    </div>
  );
};

// ==================== Event Group Header ====================

export interface EventGroupHeaderProps {
  title: string;
  className?: string;
}

export const EventGroupHeader: React.FC<EventGroupHeaderProps> = ({
  title,
  className = '',
}) => {
  return (
    <div className={`${styles.eventGroupHeader} ${className}`}>
      {title}
    </div>
  );
};

// ==================== Main Export ====================

export default {
  EventTimeline,
  EventItem,
  EventItemCompact,
  EventGroupHeader,
};
