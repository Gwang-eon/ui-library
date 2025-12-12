import React, { memo, useCallback } from 'react';
import styles from './DeviceCard.module.css';

// ===== Types =====

export type DeviceCardVariant = 'default' | 'warning' | 'error';

export interface DeviceCardProps {
  children: React.ReactNode;
  variant?: DeviceCardVariant;
  compact?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface DeviceCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface DeviceCardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface DeviceCardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export interface DeviceCardIconProps {
  children: React.ReactNode;
  background?: string;
  size?: 'default' | 'sm';
  className?: string;
}

export interface DeviceCardTitleSectionProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export interface DeviceCardMetricsProps {
  children: React.ReactNode;
  className?: string;
}

export interface DeviceCardMetricProps {
  label: string;
  value: string | number;
  className?: string;
}

export interface DeviceCardInfoProps {
  children: React.ReactNode;
  className?: string;
}

// ===== Main Component =====

const DeviceCard: React.FC<DeviceCardProps> & {
  Header: typeof DeviceCardHeader;
  Body: typeof DeviceCardBody;
  Footer: typeof DeviceCardFooter;
  Icon: typeof DeviceCardIcon;
  TitleSection: typeof DeviceCardTitleSection;
  Metrics: typeof DeviceCardMetrics;
  Metric: typeof DeviceCardMetric;
  Info: typeof DeviceCardInfo;
} = ({ children, variant = 'default', compact = false, onClick, className = '' }) => {
  const cardClasses = [
    styles.deviceCard,
    compact && styles.deviceCardCompact,
    variant === 'warning' && styles.deviceCardWarning,
    variant === 'error' && styles.deviceCardError,
    onClick && styles.deviceCardClickable,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  }, [onClick]);

  return (
    <div
      className={cardClasses}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

// ===== Sub Components =====

const DeviceCardHeader: React.FC<DeviceCardHeaderProps> = memo(({ children, className = '' }) => {
  return <div className={`${styles.deviceCardHeader} ${className}`}>{children}</div>;
});

const DeviceCardBody: React.FC<DeviceCardBodyProps> = memo(({ children, className = '' }) => {
  return <div className={`${styles.deviceCardBody} ${className}`}>{children}</div>;
});

const DeviceCardFooter: React.FC<DeviceCardFooterProps> = memo(({ children, className = '' }) => {
  return <div className={`${styles.deviceCardFooter} ${className}`}>{children}</div>;
});

const DeviceCardIcon: React.FC<DeviceCardIconProps> = memo(({
  children,
  background,
  size = 'default',
  className = '',
}) => {
  const iconClasses = [
    styles.deviceIcon,
    size === 'sm' && styles.deviceIconSm,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={iconClasses} style={background ? { background } : undefined}>
      {children}
    </div>
  );
});

const DeviceCardTitleSection: React.FC<DeviceCardTitleSectionProps> = memo(({
  title,
  subtitle,
  className = '',
}) => {
  return (
    <div className={`${styles.deviceCardTitleSection} ${className}`}>
      <h3 className={styles.deviceCardTitle}>{title}</h3>
      {subtitle && <p className={styles.deviceCardSubtitle}>{subtitle}</p>}
    </div>
  );
});

const DeviceCardMetrics: React.FC<DeviceCardMetricsProps> = memo(({ children, className = '' }) => {
  return <div className={`${styles.deviceMetrics} ${className}`}>{children}</div>;
});

const DeviceCardMetric: React.FC<DeviceCardMetricProps> = memo(({ label, value, className = '' }) => {
  return (
    <div className={`${styles.deviceMetric} ${className}`}>
      <span className={styles.deviceMetricLabel}>{label}</span>
      <span className={styles.deviceMetricValue}>{value}</span>
    </div>
  );
});

const DeviceCardInfo: React.FC<DeviceCardInfoProps> = memo(({ children, className = '' }) => {
  return <div className={`${styles.deviceInfo} ${className}`}>{children}</div>;
});

// Attach sub-components
DeviceCard.Header = DeviceCardHeader;
DeviceCard.Body = DeviceCardBody;
DeviceCard.Footer = DeviceCardFooter;
DeviceCard.Icon = DeviceCardIcon;
DeviceCard.TitleSection = DeviceCardTitleSection;
DeviceCard.Metrics = DeviceCardMetrics;
DeviceCard.Metric = DeviceCardMetric;
DeviceCard.Info = DeviceCardInfo;

// Display names for debugging
DeviceCard.displayName = 'DeviceCard';
DeviceCardHeader.displayName = 'DeviceCard.Header';
DeviceCardBody.displayName = 'DeviceCard.Body';
DeviceCardFooter.displayName = 'DeviceCard.Footer';
DeviceCardIcon.displayName = 'DeviceCard.Icon';
DeviceCardTitleSection.displayName = 'DeviceCard.TitleSection';
DeviceCardMetrics.displayName = 'DeviceCard.Metrics';
DeviceCardMetric.displayName = 'DeviceCard.Metric';
DeviceCardInfo.displayName = 'DeviceCard.Info';

export {
  DeviceCard,
  DeviceCardHeader,
  DeviceCardBody,
  DeviceCardFooter,
  DeviceCardIcon,
  DeviceCardTitleSection,
  DeviceCardMetrics,
  DeviceCardMetric,
  DeviceCardInfo,
};
