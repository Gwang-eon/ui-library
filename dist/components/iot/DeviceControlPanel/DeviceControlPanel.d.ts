import React from 'react';
type IconType = React.ComponentType<{
    size?: number;
    className?: string;
    style?: React.CSSProperties;
}>;
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
export declare const ControlItem: React.FC<ControlItemProps>;
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
export declare const DeviceControlCard: React.FC<DeviceControlCardProps>;
export interface ModeSelectionProps {
    label: string;
    modes: string[];
    selectedMode: string;
    onModeChange: (mode: string) => void;
    className?: string;
}
export declare const ModeSelection: React.FC<ModeSelectionProps>;
export interface TemperatureControlProps {
    label: string;
    value: number;
    min?: number;
    max?: number;
    unit?: string;
    onChange: (value: number) => void;
    className?: string;
}
export declare const TemperatureControl: React.FC<TemperatureControlProps>;
export interface FanSpeedSelectProps {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
    className?: string;
}
export declare const FanSpeedSelect: React.FC<FanSpeedSelectProps>;
declare const _default: {
    ControlItem: React.FC<ControlItemProps>;
    DeviceControlCard: React.FC<DeviceControlCardProps>;
    ModeSelection: React.FC<ModeSelectionProps>;
    TemperatureControl: React.FC<TemperatureControlProps>;
    FanSpeedSelect: React.FC<FanSpeedSelectProps>;
};
export default _default;
