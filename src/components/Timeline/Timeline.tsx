import type { ReactNode } from 'react';
import styles from './Timeline.module.css';

export interface TimelineProps {
  /** Timeline items */
  children: ReactNode;
  /** Timeline mode */
  mode?: 'default' | 'compact' | 'alternate';
  /** Additional CSS class */
  className?: string;
}

export interface TimelineItemProps {
  /** Item variant */
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info' | 'primary';
  /** Icon for marker */
  icon?: ReactNode;
  /** Timestamp */
  time?: ReactNode;
  /** Title */
  title: ReactNode;
  /** Description */
  description?: ReactNode;
  /** Meta information (badges, buttons, etc.) */
  meta?: ReactNode;
  /** Make item clickable */
  interactive?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * Timeline Component
 *
 * Displays events in chronological order with visual connectors and timestamps.
 * Ideal for activity logs, event history, process flows, and sequential data.
 *
 * @example
 * ```tsx
 * <Timeline>
 *   <Timeline.Item
 *     time="2 hours ago"
 *     title="Device Connected"
 *     description="Temperature sensor successfully connected."
 *   />
 *   <Timeline.Item
 *     variant="success"
 *     icon={<CheckCircle />}
 *     time="5 hours ago"
 *     title="Firmware Updated"
 *     description="Updated to v2.2.0"
 *   />
 * </Timeline>
 * ```
 */
export const Timeline = ({ children, mode = 'default', className }: TimelineProps) => {
  const timelineClasses = [
    styles.timeline,
    mode === 'compact' && styles.timelineCompact,
    mode === 'alternate' && styles.timelineAlternate,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={timelineClasses}>{children}</div>;
};

/**
 * Timeline Item Component
 *
 * Individual timeline entry with marker, content, and metadata.
 */
const TimelineItem = ({
  variant = 'default',
  icon,
  time,
  title,
  description,
  meta,
  interactive = false,
  onClick,
  className,
}: TimelineItemProps) => {
  const itemClasses = [
    styles.timelineItem,
    variant !== 'default' && styles[`timeline${variant.charAt(0).toUpperCase()}${variant.slice(1)}`],
    interactive && styles.timelineInteractive,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = () => {
    if (interactive && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (interactive && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  const itemProps = interactive
    ? {
        role: 'button',
        tabIndex: 0,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        'aria-label': typeof title === 'string' ? title : undefined,
      }
    : { role: 'article' };

  return (
    <div className={itemClasses} {...itemProps}>
      <div className={styles.timelineMarker}>{icon}</div>
      <div className={styles.timelineContent}>
        {time && <div className={styles.timelineTime}>{time}</div>}
        <div className={styles.timelineTitle}>{title}</div>
        {description && <div className={styles.timelineDescription}>{description}</div>}
        {meta && <div className={styles.timelineMeta}>{meta}</div>}
      </div>
    </div>
  );
};

Timeline.Item = TimelineItem;
Timeline.displayName = 'Timeline';
TimelineItem.displayName = 'Timeline.Item';
