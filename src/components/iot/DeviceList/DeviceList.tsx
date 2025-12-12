import React, { memo, useMemo, useCallback } from 'react';
import {
  Cpu,
  Radio,
  Settings,
  BarChart2,
  RefreshCw,
  MoreVertical,
} from 'lucide-react';
import styles from './DeviceList.module.css';

// ========================================
// TYPES
// ========================================

type IconType = React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;

export type DeviceStatus = 'online' | 'offline' | 'warning' | 'error';

export interface DeviceStat {
  label: string;
  value: string | number;
}

export interface DeviceMetaItem {
  icon?: IconType;
  label: string;
}

export interface Device {
  id: string;
  name: string;
  type: string;
  status: DeviceStatus;
  icon?: IconType;
  iconGradient?: 'primary' | 'warning' | 'success' | 'error';
  stats?: DeviceStat[];
  meta?: DeviceMetaItem[];
}

export interface DeviceListProps {
  devices: Device[];
  view?: 'grid' | 'list' | 'compact';
  loading?: boolean;
  emptyMessage?: string;
  emptyDescription?: string;
  onEmptyAction?: () => void;
  emptyActionLabel?: string;
  onDeviceClick?: (device: Device) => void;
  onPrimaryAction?: (device: Device) => void;
  primaryActionLabel?: string;
  onSecondaryAction?: (device: Device) => void;
  secondaryActionLabel?: string;
  onMoreActions?: (device: Device) => void;
  className?: string;
}

// ========================================
// SKELETON STYLES (memoized static styles)
// ========================================

const skeletonStyles = {
  circle48: { width: 48, height: 48 } as React.CSSProperties,
  circle40: { width: 40, height: 40 } as React.CSSProperties,
  circle32: { width: 32, height: 32 } as React.CSSProperties,
  title: { height: 16, width: '70%', marginBottom: 8 } as React.CSSProperties,
  subtitle: { height: 14, width: '50%' } as React.CSSProperties,
  badge: { height: 24, width: 60, borderRadius: 'var(--radius-full)' } as React.CSSProperties,
  statLabel: { height: 14, width: '70%', margin: '0 auto 6px' } as React.CSSProperties,
  statValue: { height: 20, width: '50%', margin: '0 auto' } as React.CSSProperties,
  statLabel2: { height: 14, width: '60%', margin: '0 auto 6px' } as React.CSSProperties,
  statValue2: { height: 20, width: '40%', margin: '0 auto' } as React.CSSProperties,
  listTitle: { height: 16, width: '40%', marginBottom: 8 } as React.CSSProperties,
  listSubtitle: { height: 14, width: '60%' } as React.CSSProperties,
  listButton1: { height: 32, width: 100 } as React.CSSProperties,
  listButton2: { height: 32, width: 80 } as React.CSSProperties,
  compactTitle: { height: 14, width: '60%', marginBottom: 6 } as React.CSSProperties,
  compactSubtitle: { height: 12, width: '40%' } as React.CSSProperties,
  compactAction: { width: 32, height: 32, borderRadius: 'var(--radius-md)' } as React.CSSProperties,
  flex1: { flex: 1 } as React.CSSProperties,
  flexGap: { display: 'flex', gap: 8 } as React.CSSProperties,
};

// ========================================
// LOADING SKELETONS
// ========================================

const LoadingSkeleton = memo(() => (
  <div className={styles.deviceCard}>
    <div className={styles.deviceCardHeader}>
      <div className={styles.deviceCardHeaderLeft}>
        <div className={`${styles.skeleton} ${styles.skeletonCircle}`} style={skeletonStyles.circle48} />
        <div style={skeletonStyles.flex1}>
          <div className={styles.skeleton} style={skeletonStyles.title} />
          <div className={styles.skeleton} style={skeletonStyles.subtitle} />
        </div>
      </div>
      <div className={styles.skeleton} style={skeletonStyles.badge} />
    </div>
    <div className={styles.deviceStats}>
      <div className={styles.deviceStat}>
        <div className={styles.skeleton} style={skeletonStyles.statLabel} />
        <div className={styles.skeleton} style={skeletonStyles.statValue} />
      </div>
      <div className={styles.deviceStat}>
        <div className={styles.skeleton} style={skeletonStyles.statLabel2} />
        <div className={styles.skeleton} style={skeletonStyles.statValue2} />
      </div>
    </div>
  </div>
));

LoadingSkeleton.displayName = 'DeviceList.LoadingSkeleton';

const ListLoadingSkeleton = memo(() => (
  <div className={styles.listItem}>
    <div className={`${styles.skeleton} ${styles.skeletonCircle}`} style={skeletonStyles.circle40} />
    <div className={styles.listItemContent} style={skeletonStyles.flex1}>
      <div className={styles.skeleton} style={skeletonStyles.listTitle} />
      <div className={styles.skeleton} style={skeletonStyles.listSubtitle} />
    </div>
    <div style={skeletonStyles.flexGap}>
      <div className={styles.skeleton} style={skeletonStyles.listButton1} />
      <div className={styles.skeleton} style={skeletonStyles.listButton2} />
    </div>
  </div>
));

ListLoadingSkeleton.displayName = 'DeviceList.ListLoadingSkeleton';

const CompactLoadingSkeleton = memo(() => (
  <div className={styles.compactCard}>
    <div className={`${styles.skeleton} ${styles.skeletonCircle}`} style={skeletonStyles.circle32} />
    <div style={skeletonStyles.flex1}>
      <div className={styles.skeleton} style={skeletonStyles.compactTitle} />
      <div className={styles.skeleton} style={skeletonStyles.compactSubtitle} />
    </div>
    <div className={styles.skeleton} style={skeletonStyles.compactAction} />
  </div>
));

CompactLoadingSkeleton.displayName = 'DeviceList.CompactLoadingSkeleton';

// ========================================
// STAT ITEM COMPONENT
// ========================================

interface StatItemProps {
  stat: DeviceStat;
}

const StatItem = memo<StatItemProps>(({ stat }) => (
  <div className={styles.deviceStat}>
    <div className={styles.deviceStatLabel}>{stat.label}</div>
    <div className={styles.deviceStatValue}>{stat.value}</div>
  </div>
));

StatItem.displayName = 'DeviceList.StatItem';

// ========================================
// META ITEM COMPONENT
// ========================================

interface MetaItemComponentProps {
  item: DeviceMetaItem;
}

const MetaItemComponent = memo<MetaItemComponentProps>(({ item }) => (
  <div className={styles.listItemMetaItem}>
    {item.icon && <item.icon size={14} />}
    <span>{item.label}</span>
  </div>
));

MetaItemComponent.displayName = 'DeviceList.MetaItem';

// ========================================
// GRID CARD COMPONENT
// ========================================

interface GridCardProps {
  device: Device;
  onClick?: (device: Device) => void;
}

const GridCard = memo<GridCardProps>(({ device, onClick }) => {
  const Icon = device.icon || Cpu;

  const gradientClass = useMemo(() =>
    device.iconGradient
      ? styles[`gradient${device.iconGradient.charAt(0).toUpperCase()}${device.iconGradient.slice(1)}`]
      : styles.gradientPrimary,
    [device.iconGradient]
  );

  const statusClass = useMemo(() =>
    styles[`status${device.status.charAt(0).toUpperCase()}${device.status.slice(1)}`],
    [device.status]
  );

  const statusLabel = useMemo(() =>
    device.status.charAt(0).toUpperCase() + device.status.slice(1),
    [device.status]
  );

  const handleClick = useCallback(() => {
    onClick?.(device);
  }, [onClick, device]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(device);
    }
  }, [onClick, device]);

  return (
    <div
      className={styles.deviceCard}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.deviceCardHeader}>
        <div className={styles.deviceCardHeaderLeft}>
          <div className={`${styles.deviceIcon} ${gradientClass}`}>
            <Icon size={24} />
          </div>
          <div className={styles.deviceInfo}>
            <div className={styles.deviceName}>{device.name}</div>
            <div className={styles.deviceType}>{device.type}</div>
          </div>
        </div>
        <span className={`${styles.statusBadge} ${statusClass}`}>
          {statusLabel}
        </span>
      </div>

      {device.stats && device.stats.length > 0 && (
        <div className={styles.deviceStats}>
          {device.stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} />
          ))}
        </div>
      )}
    </div>
  );
});

GridCard.displayName = 'DeviceList.GridCard';

// ========================================
// LIST ITEM COMPONENT
// ========================================

interface ListItemProps {
  device: Device;
  onPrimaryAction?: (device: Device) => void;
  primaryActionLabel?: string;
  onSecondaryAction?: (device: Device) => void;
  secondaryActionLabel?: string;
}

const ListItem = memo<ListItemProps>(({
  device,
  onPrimaryAction,
  primaryActionLabel = 'Configure',
  onSecondaryAction,
  secondaryActionLabel = 'View',
}) => {
  const Icon = device.icon || Cpu;

  const gradientClass = useMemo(() =>
    device.iconGradient
      ? styles[`gradient${device.iconGradient.charAt(0).toUpperCase()}${device.iconGradient.slice(1)}`]
      : styles.gradientPrimary,
    [device.iconGradient]
  );

  const statusClass = useMemo(() =>
    styles[`status${device.status.charAt(0).toUpperCase()}${device.status.slice(1)}`],
    [device.status]
  );

  const statusLabel = useMemo(() =>
    device.status.charAt(0).toUpperCase() + device.status.slice(1),
    [device.status]
  );

  const handlePrimaryClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onPrimaryAction?.(device);
  }, [onPrimaryAction, device]);

  const handleSecondaryClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onSecondaryAction?.(device);
  }, [onSecondaryAction, device]);

  return (
    <div className={styles.listItem}>
      <div className={`${styles.listItemIcon} ${gradientClass}`}>
        <Icon size={20} />
      </div>
      <div className={styles.listItemContent}>
        <div className={styles.listItemHeader}>
          <div className={styles.listItemTitle}>{device.name}</div>
          <span className={`${styles.statusBadge} ${statusClass}`}>
            {statusLabel}
          </span>
        </div>
        {device.meta && device.meta.length > 0 && (
          <div className={styles.listItemMeta}>
            {device.meta.map((item) => (
              <MetaItemComponent key={item.label} item={item} />
            ))}
          </div>
        )}
      </div>
      <div className={styles.listItemActions}>
        {onPrimaryAction && (
          <button className={styles.actionButton} onClick={handlePrimaryClick}>
            <Settings size={16} />
            <span>{primaryActionLabel}</span>
          </button>
        )}
        {onSecondaryAction && (
          <button className={styles.actionButton} onClick={handleSecondaryClick}>
            {device.status === 'offline' ? <RefreshCw size={16} /> : <BarChart2 size={16} />}
            <span>{device.status === 'offline' ? 'Reconnect' : secondaryActionLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
});

ListItem.displayName = 'DeviceList.ListItem';

// ========================================
// COMPACT CARD COMPONENT
// ========================================

interface CompactCardProps {
  device: Device;
  onMoreActions?: (device: Device) => void;
}

const CompactCard = memo<CompactCardProps>(({ device, onMoreActions }) => {
  const Icon = device.icon || Cpu;

  const gradientClass = useMemo(() =>
    device.iconGradient
      ? styles[`gradient${device.iconGradient.charAt(0).toUpperCase()}${device.iconGradient.slice(1)}`]
      : styles.gradientPrimary,
    [device.iconGradient]
  );

  const badgeClass = useMemo(() => {
    switch (device.status) {
      case 'online': return styles.badgeSuccess;
      case 'offline': return styles.badgeError;
      case 'warning': return styles.badgeWarning;
      case 'error': return styles.badgeError;
      default: return styles.badgeSuccess;
    }
  }, [device.status]);

  const statusLabel = useMemo(() => {
    switch (device.status) {
      case 'online': return 'Active';
      case 'offline': return 'Offline';
      case 'warning': return 'Warning';
      case 'error': return 'Error';
      default: return device.status;
    }
  }, [device.status]);

  const metaText = useMemo(() =>
    device.meta && device.meta.length > 0 ? device.meta[0].label : '',
    [device.meta]
  );

  const handleMoreClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onMoreActions?.(device);
  }, [onMoreActions, device]);

  return (
    <div className={styles.compactCard}>
      <div className={`${styles.compactIcon} ${gradientClass}`}>
        <Icon size={16} />
      </div>
      <div className={styles.compactContent}>
        <div className={styles.compactName}>{device.name}</div>
        <div className={styles.compactStatus}>
          <span className={`${styles.badge} ${badgeClass}`}>{statusLabel}</span>
          {metaText && (
            <>
              <span className={styles.separator}>·</span>
              <span>{metaText}</span>
            </>
          )}
        </div>
      </div>
      {onMoreActions && (
        <button
          className={styles.compactActionButton}
          onClick={handleMoreClick}
          aria-label="More actions"
        >
          <MoreVertical size={16} />
        </button>
      )}
    </div>
  );
});

CompactCard.displayName = 'DeviceList.CompactCard';

// ========================================
// DEVICE LIST COMPONENT
// ========================================

const DeviceList = memo<DeviceListProps>(({
  devices,
  view = 'grid',
  loading = false,
  emptyMessage = 'No devices found',
  emptyDescription = 'Add your first IoT device to get started',
  onEmptyAction,
  emptyActionLabel = 'Add Device',
  onDeviceClick,
  onPrimaryAction,
  primaryActionLabel = 'Configure',
  onSecondaryAction,
  secondaryActionLabel = 'View',
  onMoreActions,
  className,
}) => {
  const containerClassName = useMemo(() =>
    `${styles.deviceList} ${className || ''}`,
    [className]
  );

  // Loading state
  if (loading) {
    return (
      <div className={containerClassName}>
        {view === 'grid' && (
          <div className={styles.deviceGrid}>
            {[1, 2, 3, 4].map((i) => (
              <LoadingSkeleton key={`skeleton-grid-${i}`} />
            ))}
          </div>
        )}
        {view === 'list' && (
          <div className={styles.listContainer}>
            {[1, 2, 3].map((i) => (
              <ListLoadingSkeleton key={`skeleton-list-${i}`} />
            ))}
          </div>
        )}
        {view === 'compact' && (
          <div className={styles.compactContainer}>
            {[1, 2, 3, 4].map((i) => (
              <CompactLoadingSkeleton key={`skeleton-compact-${i}`} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Empty state
  if (devices.length === 0) {
    return (
      <div className={containerClassName}>
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>
            <Radio size={48} />
          </div>
          <div className={styles.emptyStateTitle}>{emptyMessage}</div>
          <div className={styles.emptyStateDescription}>{emptyDescription}</div>
          {onEmptyAction && (
            <button className={styles.emptyStateButton} onClick={onEmptyAction}>
              {emptyActionLabel}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Render based on view mode
  return (
    <div className={containerClassName}>
      {view === 'grid' && (
        <div className={styles.deviceGrid}>
          {devices.map((device) => (
            <GridCard
              key={device.id}
              device={device}
              onClick={onDeviceClick}
            />
          ))}
        </div>
      )}

      {view === 'list' && (
        <div className={styles.listContainer}>
          {devices.map((device) => (
            <ListItem
              key={device.id}
              device={device}
              onPrimaryAction={onPrimaryAction}
              primaryActionLabel={primaryActionLabel}
              onSecondaryAction={onSecondaryAction}
              secondaryActionLabel={secondaryActionLabel}
            />
          ))}
        </div>
      )}

      {view === 'compact' && (
        <div className={styles.compactContainer}>
          {devices.map((device) => (
            <CompactCard
              key={device.id}
              device={device}
              onMoreActions={onMoreActions}
            />
          ))}
        </div>
      )}
    </div>
  );
});

DeviceList.displayName = 'DeviceList';

export default DeviceList;
export {
  GridCard,
  ListItem,
  CompactCard,
  LoadingSkeleton,
  ListLoadingSkeleton,
  CompactLoadingSkeleton,
};
