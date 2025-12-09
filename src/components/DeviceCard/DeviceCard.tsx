import React from 'react';
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
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
};

// ===== Sub Components =====

const DeviceCardHeader: React.FC<DeviceCardHeaderProps> = ({ children, className = '' }) => {
  return <div className={`${styles.deviceCardHeader} ${className}`}>{children}</div>;
};

const DeviceCardBody: React.FC<DeviceCardBodyProps> = ({ children, className = '' }) => {
  return <div className={`${styles.deviceCardBody} ${className}`}>{children}</div>;
};

const DeviceCardFooter: React.FC<DeviceCardFooterProps> = ({ children, className = '' }) => {
  return <div className={`${styles.deviceCardFooter} ${className}`}>{children}</div>;
};

const DeviceCardIcon: React.FC<DeviceCardIconProps> = ({
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
};

const DeviceCardTitleSection: React.FC<DeviceCardTitleSectionProps> = ({
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
};

const DeviceCardMetrics: React.FC<DeviceCardMetricsProps> = ({ children, className = '' }) => {
  return <div className={`${styles.deviceMetrics} ${className}`}>{children}</div>;
};

const DeviceCardMetric: React.FC<DeviceCardMetricProps> = ({ label, value, className = '' }) => {
  return (
    <div className={`${styles.deviceMetric} ${className}`}>
      <span className={styles.deviceMetricLabel}>{label}</span>
      <span className={styles.deviceMetricValue}>{value}</span>
    </div>
  );
};

const DeviceCardInfo: React.FC<DeviceCardInfoProps> = ({ children, className = '' }) => {
  return <div className={`${styles.deviceInfo} ${className}`}>{children}</div>;
};

// Attach sub-components
DeviceCard.Header = DeviceCardHeader;
DeviceCard.Body = DeviceCardBody;
DeviceCard.Footer = DeviceCardFooter;
DeviceCard.Icon = DeviceCardIcon;
DeviceCard.TitleSection = DeviceCardTitleSection;
DeviceCard.Metrics = DeviceCardMetrics;
DeviceCard.Metric = DeviceCardMetric;
DeviceCard.Info = DeviceCardInfo;

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
