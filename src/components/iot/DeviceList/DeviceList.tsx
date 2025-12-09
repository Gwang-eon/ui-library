import React from 'react';
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

// Type for Lucide React icons
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
  /** Array of devices to display */
  devices: Device[];
  /** View mode */
  view?: 'grid' | 'list' | 'compact';
  /** Loading state */
  loading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Empty state description */
  emptyDescription?: string;
  /** Empty state action */
  onEmptyAction?: () => void;
  /** Empty state action label */
  emptyActionLabel?: string;
  /** Callback when device is clicked */
  onDeviceClick?: (device: Device) => void;
  /** Callback for primary action (configure/settings) */
  onPrimaryAction?: (device: Device) => void;
  /** Primary action label */
  primaryActionLabel?: string;
  /** Callback for secondary action (view/details) */
  onSecondaryAction?: (device: Device) => void;
  /** Secondary action label */
  secondaryActionLabel?: string;
  /** Callback for more actions */
  onMoreActions?: (device: Device) => void;
  /** Additional CSS class */
  className?: string;
}

// ========================================
// DEVICE LIST COMPONENT
// ========================================

const DeviceList: React.FC<DeviceListProps> = ({
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
  // Loading state
  if (loading) {
    return (
      <div className={`${styles.deviceList} ${className || ''}`}>
        {view === 'grid' && (
          <div className={styles.deviceGrid}>
            {[1, 2, 3, 4].map((i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        )}
        {view === 'list' && (
          <div className={styles.listContainer}>
            {[1, 2, 3].map((i) => (
              <ListLoadingSkeleton key={i} />
            ))}
          </div>
        )}
        {view === 'compact' && (
          <div className={styles.compactContainer}>
            {[1, 2, 3, 4].map((i) => (
              <CompactLoadingSkeleton key={i} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Empty state
  if (devices.length === 0) {
    return (
      <div className={`${styles.deviceList} ${className || ''}`}>
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
    <div className={`${styles.deviceList} ${className || ''}`}>
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
};

// ========================================
// GRID CARD COMPONENT
// ========================================

interface GridCardProps {
  device: Device;
  onClick?: (device: Device) => void;
}

const GridCard: React.FC<GridCardProps> = ({ device, onClick }) => {
  const Icon = device.icon || Cpu;
  const gradientClass = device.iconGradient
    ? styles[`gradient${device.iconGradient.charAt(0).toUpperCase()}${device.iconGradient.slice(1)}`]
    : styles.gradientPrimary;

  return (
    <div
      className={styles.deviceCard}
      onClick={() => onClick?.(device)}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick(device);
        }
      }}
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
        <span className={`${styles.statusBadge} ${styles[`status${device.status.charAt(0).toUpperCase()}${device.status.slice(1)}`]}`}>
          {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
        </span>
      </div>

      {device.stats && device.stats.length > 0 && (
        <div className={styles.deviceStats}>
          {device.stats.map((stat, index) => (
            <div key={index} className={styles.deviceStat}>
              <div className={styles.deviceStatLabel}>{stat.label}</div>
              <div className={styles.deviceStatValue}>{stat.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

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

const ListItem: React.FC<ListItemProps> = ({
  device,
  onPrimaryAction,
  primaryActionLabel = 'Configure',
  onSecondaryAction,
  secondaryActionLabel = 'View',
}) => {
  const Icon = device.icon || Cpu;
  const gradientClass = device.iconGradient
    ? styles[`gradient${device.iconGradient.charAt(0).toUpperCase()}${device.iconGradient.slice(1)}`]
    : styles.gradientPrimary;

  return (
    <div className={styles.listItem}>
      <div className={`${styles.listItemIcon} ${gradientClass}`}>
        <Icon size={20} />
      </div>
      <div className={styles.listItemContent}>
        <div className={styles.listItemHeader}>
          <div className={styles.listItemTitle}>{device.name}</div>
          <span className={`${styles.statusBadge} ${styles[`status${device.status.charAt(0).toUpperCase()}${device.status.slice(1)}`]}`}>
            {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
          </span>
        </div>
        {device.meta && device.meta.length > 0 && (
          <div className={styles.listItemMeta}>
            {device.meta.map((item, index) => (
              <div key={index} className={styles.listItemMetaItem}>
                {item.icon && <item.icon size={14} />}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.listItemActions}>
        {onPrimaryAction && (
          <button
            className={styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              onPrimaryAction(device);
            }}
          >
            <Settings size={16} />
            <span>{primaryActionLabel}</span>
          </button>
        )}
        {onSecondaryAction && (
          <button
            className={styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              onSecondaryAction(device);
            }}
          >
            {device.status === 'offline' ? <RefreshCw size={16} /> : <BarChart2 size={16} />}
            <span>{device.status === 'offline' ? 'Reconnect' : secondaryActionLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
};

// ========================================
// COMPACT CARD COMPONENT
// ========================================

interface CompactCardProps {
  device: Device;
  onMoreActions?: (device: Device) => void;
}

const CompactCard: React.FC<CompactCardProps> = ({ device, onMoreActions }) => {
  const Icon = device.icon || Cpu;
  const gradientClass = device.iconGradient
    ? styles[`gradient${device.iconGradient.charAt(0).toUpperCase()}${device.iconGradient.slice(1)}`]
    : styles.gradientPrimary;

  // Get badge variant based on status
  const getBadgeClass = () => {
    switch (device.status) {
      case 'online':
        return styles.badgeSuccess;
      case 'offline':
        return styles.badgeError;
      case 'warning':
        return styles.badgeWarning;
      case 'error':
        return styles.badgeError;
      default:
        return styles.badgeSuccess;
    }
  };

  // Get status label
  const getStatusLabel = () => {
    switch (device.status) {
      case 'online':
        return 'Active';
      case 'offline':
        return 'Offline';
      case 'warning':
        return 'Warning';
      case 'error':
        return 'Error';
      default:
        return device.status;
    }
  };

  // Get meta text (first meta item if exists)
  const getMetaText = () => {
    if (device.meta && device.meta.length > 0) {
      return device.meta[0].label;
    }
    return '';
  };

  return (
    <div className={styles.compactCard}>
      <div className={`${styles.compactIcon} ${gradientClass}`}>
        <Icon size={16} />
      </div>
      <div className={styles.compactContent}>
        <div className={styles.compactName}>{device.name}</div>
        <div className={styles.compactStatus}>
          <span className={`${styles.badge} ${getBadgeClass()}`}>{getStatusLabel()}</span>
          {getMetaText() && (
            <>
              <span className={styles.separator}>·</span>
              <span>{getMetaText()}</span>
            </>
          )}
        </div>
      </div>
      {onMoreActions && (
        <button
          className={styles.compactActionButton}
          onClick={(e) => {
            e.stopPropagation();
            onMoreActions(device);
          }}
          aria-label="More actions"
        >
          <MoreVertical size={16} />
        </button>
      )}
    </div>
  );
};

// ========================================
// LOADING SKELETONS
// ========================================

const LoadingSkeleton: React.FC = () => {
  return (
    <div className={styles.deviceCard}>
      <div className={styles.deviceCardHeader}>
        <div className={styles.deviceCardHeaderLeft}>
          <div className={`${styles.skeleton} ${styles.skeletonCircle}`} style={{ width: 48, height: 48 }} />
          <div style={{ flex: 1 }}>
            <div className={styles.skeleton} style={{ height: 16, width: '70%', marginBottom: 8 }} />
            <div className={styles.skeleton} style={{ height: 14, width: '50%' }} />
          </div>
        </div>
        <div className={styles.skeleton} style={{ height: 24, width: 60, borderRadius: 'var(--radius-full)' }} />
      </div>
      <div className={styles.deviceStats}>
        <div className={styles.deviceStat}>
          <div className={styles.skeleton} style={{ height: 14, width: '70%', margin: '0 auto 6px' }} />
          <div className={styles.skeleton} style={{ height: 20, width: '50%', margin: '0 auto' }} />
        </div>
        <div className={styles.deviceStat}>
          <div className={styles.skeleton} style={{ height: 14, width: '60%', margin: '0 auto 6px' }} />
          <div className={styles.skeleton} style={{ height: 20, width: '40%', margin: '0 auto' }} />
        </div>
      </div>
    </div>
  );
};

const ListLoadingSkeleton: React.FC = () => {
  return (
    <div className={styles.listItem}>
      <div className={`${styles.skeleton} ${styles.skeletonCircle}`} style={{ width: 40, height: 40 }} />
      <div className={styles.listItemContent} style={{ flex: 1 }}>
        <div className={styles.skeleton} style={{ height: 16, width: '40%', marginBottom: 8 }} />
        <div className={styles.skeleton} style={{ height: 14, width: '60%' }} />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <div className={styles.skeleton} style={{ height: 32, width: 100 }} />
        <div className={styles.skeleton} style={{ height: 32, width: 80 }} />
      </div>
    </div>
  );
};

const CompactLoadingSkeleton: React.FC = () => {
  return (
    <div className={styles.compactCard}>
      <div className={`${styles.skeleton} ${styles.skeletonCircle}`} style={{ width: 32, height: 32 }} />
      <div style={{ flex: 1 }}>
        <div className={styles.skeleton} style={{ height: 14, width: '60%', marginBottom: 6 }} />
        <div className={styles.skeleton} style={{ height: 12, width: '40%' }} />
      </div>
      <div className={styles.skeleton} style={{ width: 32, height: 32, borderRadius: 'var(--radius-md)' }} />
    </div>
  );
};

// ========================================
// EXPORTS
// ========================================

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
