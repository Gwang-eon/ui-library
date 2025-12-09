import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './DeviceControlPanel.module.css';

// Custom icon type
type IconType = React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;

// ==================== Control Item ====================

export interface ControlItemProps {
  icon?: IconType;
  label: string;
  type: 'switch' | 'slider';
  value?: boolean | number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: boolean | number) => void;
  disabled?: boolean;
  className?: string;
}

export const ControlItem: React.FC<ControlItemProps> = ({
  icon: Icon,
  label,
  type,
  value = type === 'switch' ? false : 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled = false,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (newValue: boolean | number) => {
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={`${styles.controlItem} ${className}`}>
      <div className={styles.controlLabel}>
        {Icon && <Icon size={20} />}
        <span>{label}</span>
      </div>
      {type === 'switch' ? (
        <label className={styles.switch}>
          <input
            type="checkbox"
            className={styles.switchInput}
            checked={internalValue as boolean}
            onChange={(e) => handleChange(e.target.checked)}
            disabled={disabled}
          />
          <span className={styles.switchSlider}></span>
        </label>
      ) : (
        <input
          type="range"
          className={styles.slider}
          min={min}
          max={max}
          step={step}
          value={internalValue as number}
          onChange={(e) => handleChange(Number(e.target.value))}
          disabled={disabled}
        />
      )}
    </div>
  );
};

// ==================== Device Control Card ====================

export type DeviceIconVariant = 'warning' | 'primary' | 'success' | 'error';

export interface DeviceControlCardProps {
  icon: IconType;
  iconVariant?: DeviceIconVariant;
  name: string;
  deviceId: string;
  switchLabel: string;
  sliderLabel: string;
  switchValue?: boolean;
  sliderValue?: number;
  sliderMin?: number;
  sliderMax?: number;
  sliderStep?: number;
  onSwitchChange?: (checked: boolean) => void;
  onSliderChange?: (value: number) => void;
  loading?: boolean;
  className?: string;
}

export const DeviceControlCard: React.FC<DeviceControlCardProps> = ({
  icon: Icon,
  iconVariant = 'primary',
  name,
  deviceId,
  switchLabel,
  sliderLabel,
  switchValue = false,
  sliderValue = 50,
  sliderMin = 0,
  sliderMax = 100,
  sliderStep = 1,
  onSwitchChange,
  onSliderChange,
  loading = false,
  className = '',
}) => {
  const [isOn, setIsOn] = useState(switchValue);
  const [value, setValue] = useState(sliderValue);

  const handleSwitchChange = (checked: boolean) => {
    setIsOn(checked);
    onSwitchChange?.(checked);
  };

  const handleSliderChange = (newValue: number) => {
    setValue(newValue);
    onSliderChange?.(newValue);
  };

  if (loading) {
    return (
      <div className={`${styles.deviceControlCard} ${styles.loading} ${className}`}>
        <div className={styles.deviceHeader}>
          <div className={styles.iconSkeleton} />
          <div className={styles.deviceInfo}>
            <div className={styles.nameSkeleton} />
            <div className={styles.idSkeleton} />
          </div>
          <div className={styles.toggleSkeleton} />
        </div>
        <div className={styles.sliderSkeleton} />
      </div>
    );
  }

  return (
    <div className={`${styles.deviceControlCard} ${className}`}>
      <div className={styles.deviceHeader}>
        <div className={`${styles.deviceIconCircle} ${styles[`iconVariant-${iconVariant}`]}`}>
          <Icon size={24} />
        </div>
        <div className={styles.deviceInfo}>
          <h4 className={styles.deviceName}>{name}</h4>
          <p className={styles.deviceId}>{deviceId}</p>
        </div>
        <label className={styles.switch} aria-label={switchLabel}>
          <input
            type="checkbox"
            className={styles.switchInput}
            checked={isOn}
            onChange={(e) => handleSwitchChange(e.target.checked)}
          />
          <span className={styles.switchSlider}></span>
        </label>
      </div>
      <div className={styles.controlSliderWrapper}>
        <span className={styles.controlSliderLabel}>{sliderLabel}</span>
        <input
          type="range"
          className={styles.slider}
          min={sliderMin}
          max={sliderMax}
          step={sliderStep}
          value={value}
          onChange={(e) => handleSliderChange(Number(e.target.value))}
          disabled={!isOn}
        />
      </div>
    </div>
  );
};

// ==================== Mode Selection ====================

export interface ModeSelectionProps {
  label: string;
  modes: string[];
  selectedMode: string;
  onModeChange: (mode: string) => void;
  className?: string;
}

export const ModeSelection: React.FC<ModeSelectionProps> = ({
  label,
  modes,
  selectedMode,
  onModeChange,
  className = '',
}) => {
  return (
    <div className={`${styles.modeSelection} ${className}`}>
      <label className={styles.modeLabel}>{label}</label>
      <div className={styles.btnGroup} role="group">
        {modes.map((mode) => (
          <button
            key={mode}
            className={`${styles.btn} ${styles.btnSm} ${styles.btnGhost} ${
              selectedMode === mode ? styles.active : ''
            }`}
            onClick={() => onModeChange(mode)}
          >
            {mode}
          </button>
        ))}
      </div>
    </div>
  );
};

// ==================== Temperature Control ====================

export interface TemperatureControlProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  unit?: string;
  onChange: (value: number) => void;
  className?: string;
}

export const TemperatureControl: React.FC<TemperatureControlProps> = ({
  label,
  value,
  min = 16,
  max = 30,
  unit = '°C',
  onChange,
  className = '',
}) => {
  return (
    <div className={`${styles.modeSelection} ${className}`}>
      <div className={styles.temperatureDisplay}>
        <span className={styles.modeLabel}>{label}</span>
        <span className={styles.temperatureValue}>
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        className={styles.slider}
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className={styles.sliderRange}>
        <span>
          {min}
          {unit}
        </span>
        <span>
          {max}
          {unit}
        </span>
      </div>
    </div>
  );
};

// ==================== Fan Speed Select ====================

export interface FanSpeedSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
}

export const FanSpeedSelect: React.FC<FanSpeedSelectProps> = ({
  label,
  value,
  options,
  onChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.modeSelection} ${className}`}>
      <label className={styles.modeLabel}>{label}</label>
      <div className={styles.customSelect}>
        <div
          className={styles.customSelectTrigger}
          onClick={() => setIsOpen(!isOpen)}
          role="button"
          tabIndex={0}
        >
          <span className={styles.customSelectValue}>{value}</span>
          <ChevronDown className={styles.selectIcon} size={16} />
        </div>
        {isOpen && (
          <div className={styles.customSelectDropdown}>
            {options.map((option) => (
              <div
                key={option}
                className={`${styles.customSelectOption} ${
                  option === value ? styles.selected : ''
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== Main Export ====================

export default {
  ControlItem,
  DeviceControlCard,
  ModeSelection,
  TemperatureControl,
  FanSpeedSelect,
};
