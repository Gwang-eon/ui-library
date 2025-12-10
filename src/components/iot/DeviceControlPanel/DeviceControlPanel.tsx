import React, { useState, memo, useMemo, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './DeviceControlPanel.module.css';

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

export const ControlItem = memo<ControlItemProps>(({
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

  const handleChange = useCallback((newValue: boolean | number) => {
    setInternalValue(newValue);
    onChange?.(newValue);
  }, [onChange]);

  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.checked);
  }, [handleChange]);

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(Number(e.target.value));
  }, [handleChange]);

  const containerClassName = useMemo(() =>
    `${styles.controlItem} ${className}`,
    [className]
  );

  return (
    <div className={containerClassName}>
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
            onChange={handleCheckboxChange}
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
          onChange={handleSliderChange}
          disabled={disabled}
        />
      )}
    </div>
  );
});

ControlItem.displayName = 'DeviceControlPanel.ControlItem';

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

export const DeviceControlCard = memo<DeviceControlCardProps>(({
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

  const handleSwitchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsOn(checked);
    onSwitchChange?.(checked);
  }, [onSwitchChange]);

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onSliderChange?.(newValue);
  }, [onSliderChange]);

  const containerClassName = useMemo(() =>
    `${styles.deviceControlCard} ${loading ? styles.loading : ''} ${className}`,
    [loading, className]
  );

  const iconCircleClassName = useMemo(() =>
    `${styles.deviceIconCircle} ${styles[`iconVariant-${iconVariant}`]}`,
    [iconVariant]
  );

  if (loading) {
    return (
      <div className={containerClassName}>
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
    <div className={containerClassName}>
      <div className={styles.deviceHeader}>
        <div className={iconCircleClassName}>
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
            onChange={handleSwitchChange}
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
          onChange={handleSliderChange}
          disabled={!isOn}
        />
      </div>
    </div>
  );
});

DeviceControlCard.displayName = 'DeviceControlPanel.DeviceControlCard';

// ==================== Mode Button ====================

interface ModeButtonProps {
  mode: string;
  isSelected: boolean;
  onSelect: (mode: string) => void;
}

const ModeButton = memo<ModeButtonProps>(({ mode, isSelected, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(mode);
  }, [mode, onSelect]);

  const className = useMemo(() =>
    `${styles.btn} ${styles.btnSm} ${styles.btnGhost} ${isSelected ? styles.active : ''}`,
    [isSelected]
  );

  return (
    <button className={className} onClick={handleClick}>
      {mode}
    </button>
  );
});

ModeButton.displayName = 'DeviceControlPanel.ModeButton';

// ==================== Mode Selection ====================

export interface ModeSelectionProps {
  label: string;
  modes: string[];
  selectedMode: string;
  onModeChange: (mode: string) => void;
  className?: string;
}

export const ModeSelection = memo<ModeSelectionProps>(({
  label,
  modes,
  selectedMode,
  onModeChange,
  className = '',
}) => {
  const containerClassName = useMemo(() =>
    `${styles.modeSelection} ${className}`,
    [className]
  );

  return (
    <div className={containerClassName}>
      <label className={styles.modeLabel}>{label}</label>
      <div className={styles.btnGroup} role="group">
        {modes.map((mode) => (
          <ModeButton
            key={mode}
            mode={mode}
            isSelected={selectedMode === mode}
            onSelect={onModeChange}
          />
        ))}
      </div>
    </div>
  );
});

ModeSelection.displayName = 'DeviceControlPanel.ModeSelection';

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

export const TemperatureControl = memo<TemperatureControlProps>(({
  label,
  value,
  min = 16,
  max = 30,
  unit = '°C',
  onChange,
  className = '',
}) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  }, [onChange]);

  const containerClassName = useMemo(() =>
    `${styles.modeSelection} ${className}`,
    [className]
  );

  return (
    <div className={containerClassName}>
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
        onChange={handleChange}
      />
      <div className={styles.sliderRange}>
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
});

TemperatureControl.displayName = 'DeviceControlPanel.TemperatureControl';

// ==================== Fan Speed Option ====================

interface FanSpeedOptionProps {
  option: string;
  isSelected: boolean;
  onSelect: (option: string) => void;
}

const FanSpeedOption = memo<FanSpeedOptionProps>(({ option, isSelected, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(option);
  }, [option, onSelect]);

  const className = useMemo(() =>
    `${styles.customSelectOption} ${isSelected ? styles.selected : ''}`,
    [isSelected]
  );

  return (
    <div className={className} onClick={handleClick}>
      {option}
    </div>
  );
});

FanSpeedOption.displayName = 'DeviceControlPanel.FanSpeedOption';

// ==================== Fan Speed Select ====================

export interface FanSpeedSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
}

export const FanSpeedSelect = memo<FanSpeedSelectProps>(({
  label,
  value,
  options,
  onChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleSelect = useCallback((option: string) => {
    onChange(option);
    setIsOpen(false);
  }, [onChange]);

  const containerClassName = useMemo(() =>
    `${styles.modeSelection} ${className}`,
    [className]
  );

  return (
    <div className={containerClassName}>
      <label className={styles.modeLabel}>{label}</label>
      <div className={styles.customSelect}>
        <div
          className={styles.customSelectTrigger}
          onClick={toggleOpen}
          role="button"
          tabIndex={0}
        >
          <span className={styles.customSelectValue}>{value}</span>
          <ChevronDown className={styles.selectIcon} size={16} />
        </div>
        {isOpen && (
          <div className={styles.customSelectDropdown}>
            {options.map((option) => (
              <FanSpeedOption
                key={option}
                option={option}
                isSelected={option === value}
                onSelect={handleSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

FanSpeedSelect.displayName = 'DeviceControlPanel.FanSpeedSelect';

// ==================== Main Export ====================

export default {
  ControlItem,
  DeviceControlCard,
  ModeSelection,
  TemperatureControl,
  FanSpeedSelect,
};
