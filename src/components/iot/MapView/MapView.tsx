import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { X, MapPin } from 'lucide-react';
import styles from './MapView.module.css';

type IconType = LucideIcon;

// ==================== Map Marker ====================

export type MarkerStatus = 'online' | 'warning' | 'offline';

export interface MapMarkerProps {
  icon: IconType;
  status: MarkerStatus;
  position: {
    top: string;
    left: string;
  };
  onClick?: () => void;
  className?: string;
}

export const MapMarker: React.FC<MapMarkerProps> = ({
  icon: Icon,
  status,
  position,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={`${styles.mapMarker} ${styles[`markerStatus${status.charAt(0).toUpperCase() + status.slice(1)}`]} ${className}`}
      style={{ top: position.top, left: position.left }}
      onClick={onClick}
    >
      <Icon className={styles.markerIcon} />
    </div>
  );
};

// ==================== Device Info Popup ====================

export interface DeviceInfoItem {
  label: string;
  value: string;
}

export interface DeviceInfoPopupProps {
  deviceId: string;
  deviceName: string;
  status: 'online' | 'warning' | 'offline';
  location?: string;
  info?: DeviceInfoItem[];
  onViewDetails?: () => void;
  onClose?: () => void;
  position?: {
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
  };
  className?: string;
}

export const DeviceInfoPopup: React.FC<DeviceInfoPopupProps> = ({
  deviceId,
  deviceName,
  status,
  location,
  info = [],
  onViewDetails,
  onClose,
  position,
  className = '',
}) => {
  const statusLabels = {
    online: 'Online',
    warning: 'Warning',
    offline: 'Offline',
  };

  return (
    <div
      className={`${styles.devicePopup} ${className}`}
      style={position}
    >
      <div className={styles.popupHeader}>
        <div className={styles.popupHeaderLeft}>
          <h4 className={styles.popupTitle}>{deviceId}</h4>
          <p className={styles.popupSubtitle}>{deviceName}</p>
        </div>
        <div className={styles.popupHeaderRight}>
          <span className={`${styles.popupBadge} ${styles[`badge${status.charAt(0).toUpperCase() + status.slice(1)}`]}`}>
            {statusLabels[status]}
          </span>
          {onClose && (
            <button
              className={styles.popupClose}
              onClick={onClose}
              aria-label="Close"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {info.length > 0 && (
        <div className={styles.popupInfo}>
          {info.map((item, index) => (
            <div key={index} className={styles.popupInfoItem}>
              <p className={styles.popupInfoLabel}>{item.label}</p>
              <p className={styles.popupInfoValue}>{item.value}</p>
            </div>
          ))}
        </div>
      )}

      {location && (
        <div className={styles.popupLocation}>
          <MapPin size={12} />
          <span>{location}</span>
        </div>
      )}

      {onViewDetails && (
        <button className={styles.popupButton} onClick={onViewDetails}>
          View Details
        </button>
      )}
    </div>
  );
};

// ==================== Map Legend ====================

export interface LegendItem {
  color: string;
  label: string;
}

export interface MapLegendProps {
  items: LegendItem[];
  className?: string;
}

export const MapLegend: React.FC<MapLegendProps> = ({
  items,
  className = '',
}) => {
  return (
    <div className={`${styles.mapLegend} ${className}`}>
      {items.map((item, index) => (
        <div key={index} className={styles.legendItem}>
          <div
            className={styles.legendDot}
            style={{ backgroundColor: item.color }}
          />
          <span className={styles.legendLabel}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

// ==================== Heatmap Legend ====================

export interface HeatmapLegendProps {
  title: string;
  minLabel: string;
  maxLabel: string;
  gradient: string;
  className?: string;
}

export const HeatmapLegend: React.FC<HeatmapLegendProps> = ({
  title,
  minLabel,
  maxLabel,
  gradient,
  className = '',
}) => {
  return (
    <div className={`${styles.heatmapLegend} ${className}`}>
      <p className={styles.heatmapTitle}>{title}</p>
      <div className={styles.heatmapScale}>
        <div
          className={styles.heatmapGradient}
          style={{ background: gradient }}
        />
        <div className={styles.heatmapLabels}>
          <span>{maxLabel}</span>
          <span>{minLabel}</span>
        </div>
      </div>
    </div>
  );
};

// ==================== Map Container ====================

export interface MapContainerProps {
  title?: string;
  height?: string;
  controls?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const MapContainer: React.FC<MapContainerProps> = ({
  title,
  height = '400px',
  controls,
  footer,
  children,
  className = '',
}) => {
  return (
    <div className={`${styles.mapContainer} ${className}`}>
      {title && (
        <div className={styles.mapHeader}>
          <h3 className={styles.mapTitle}>{title}</h3>
          {controls && <div className={styles.mapControls}>{controls}</div>}
        </div>
      )}
      <div className={styles.mapBody} style={{ height }}>
        {children}
      </div>
      {footer && <div className={styles.mapFooter}>{footer}</div>}
    </div>
  );
};

// ==================== Map Placeholder ====================

export interface MapPlaceholderProps {
  icon?: IconType;
  message?: string;
  gradient?: string;
  className?: string;
  children?: React.ReactNode;
}

export const MapPlaceholder: React.FC<MapPlaceholderProps> = ({
  icon: Icon,
  message = 'Map integration with Leaflet, Google Maps, or Mapbox',
  gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  className = '',
  children,
}) => {
  return (
    <div
      className={`${styles.mapPlaceholder} ${className}`}
      style={{ background: gradient }}
    >
      <div className={styles.placeholderContent}>
        {Icon && <Icon className={styles.placeholderIcon} />}
        <p className={styles.placeholderMessage}>{message}</p>
      </div>
      {children}
    </div>
  );
};

// ==================== Main Export ====================

export default {
  MapContainer,
  MapMarker,
  DeviceInfoPopup,
  MapLegend,
  HeatmapLegend,
  MapPlaceholder,
};
