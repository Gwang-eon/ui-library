import type { ReactNode } from 'react';
import { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
import { createPortal } from 'react-dom';
import { Palette, Plus } from 'lucide-react';
import { Button } from '../Button';
import styles from './ColorPicker.module.css';

// Color utility functions
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
      .toUpperCase()
  );
};

const isValidHex = (hex: string): boolean => {
  return /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
};

export type ColorPickerSize = 'sm' | 'md' | 'lg';

const COLOR_PICKER_ICON_SIZES: Record<ColorPickerSize, number> = {
  sm: 12,
  md: 16,
  lg: 20,
};

export interface ColorPickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  label?: string;
  presets?: string[];
  showRecent?: boolean;
  compact?: boolean;
  size?: ColorPickerSize;
  allowCustom?: boolean;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  /** Render dropdown via Portal to avoid overflow issues */
  portal?: boolean;
}

const DEFAULT_PRESETS = [
  '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6',
  '#EC4899', '#14B8A6', '#F97316', '#06B6D4', '#84CC16', '#64748B',
];

const RECENT_COLORS_KEY = 'color-picker-recent';
const MAX_RECENT_COLORS = 5;

// Memoized color swatch button
interface ColorSwatchButtonProps {
  color: string;
  isActive: boolean;
  disabled?: boolean;
  onSelect: (color: string) => void;
}

const ColorSwatchButton = memo<ColorSwatchButtonProps>(({ color, isActive, disabled, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(color);
  }, [color, onSelect]);

  const style = useMemo(() => ({ backgroundColor: color }), [color]);

  const className = useMemo(() =>
    `${styles.colorSwatchBtn} ${isActive ? styles.colorSwatchBtnActive : ''}`,
    [isActive]
  );

  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={handleClick}
      title={color}
      aria-label={`Select color ${color}`}
      disabled={disabled}
    />
  );
});

ColorSwatchButton.displayName = 'ColorPicker.SwatchButton';

// Memoized preset color button
interface PresetColorButtonProps {
  color: string;
  onSelect: (color: string) => void;
}

const PresetColorButton = memo<PresetColorButtonProps>(({ color, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(color);
  }, [color, onSelect]);

  const style = useMemo(() => ({ backgroundColor: color }), [color]);

  return (
    <button
      type="button"
      className={styles.colorPresetItem}
      style={style}
      onClick={handleClick}
      title={color}
      aria-label={`Select preset color ${color}`}
    />
  );
});

PresetColorButton.displayName = 'ColorPicker.PresetButton';

// Memoized recent color item
interface RecentColorItemProps {
  color: string;
  onSelect: (color: string) => void;
}

const RecentColorItem = memo<RecentColorItemProps>(({ color, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(color);
  }, [color, onSelect]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onSelect(color);
    }
  }, [color, onSelect]);

  const style = useMemo(() => ({ backgroundColor: color }), [color]);

  return (
    <div
      className={styles.colorRecentItem}
      style={style}
      onClick={handleClick}
      title={color}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    />
  );
});

RecentColorItem.displayName = 'ColorPicker.RecentItem';

// RGB Input component
interface RgbInputProps {
  label: string;
  value: number;
  onChange: (value: string) => void;
}

const RgbInput = memo<RgbInputProps>(({ label, value, onChange }) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <div className={styles.colorInputGroup}>
      <label className={styles.colorInputLabel}>{label}</label>
      <input
        type="number"
        className={styles.colorInputNumber}
        value={value}
        onChange={handleChange}
        min="0"
        max="255"
      />
    </div>
  );
});

RgbInput.displayName = 'ColorPicker.RgbInput';

export const ColorPicker = ({
  value: controlledValue,
  defaultValue = '#3B82F6',
  onChange,
  label,
  presets = DEFAULT_PRESETS,
  showRecent = true,
  compact = false,
  size = 'md',
  allowCustom = true,
  disabled = false,
  className = '',
  children,
  portal = false,
}: ColorPickerProps) => {
  const isControlled = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const currentValue = isControlled ? controlledValue : uncontrolledValue;

  const [isOpen, setIsOpen] = useState(false);
  const [hexInput, setHexInput] = useState(currentValue);
  const [rgb, setRgb] = useState(hexToRgb(currentValue) || { r: 59, g: 130, b: 246 });
  const [recentColors, setRecentColors] = useState<string[]>([]);
  const [customPickerOpen, setCustomPickerOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load recent colors from localStorage
  useEffect(() => {
    if (showRecent) {
      try {
        const stored = localStorage.getItem(RECENT_COLORS_KEY);
        if (stored) {
          setRecentColors(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Failed to load recent colors:', e);
      }
    }
  }, [showRecent]);

  // Sync hex and rgb when value changes
  useEffect(() => {
    setHexInput(currentValue);
    const rgbValue = hexToRgb(currentValue);
    if (rgbValue) {
      setRgb(rgbValue);
    }
  }, [currentValue]);

  // Handle color selection
  const handleColorChange = useCallback((newColor: string) => {
    if (!isValidHex(newColor)) return;

    const color = newColor.startsWith('#') ? newColor : `#${newColor}`;

    if (!isControlled) {
      setUncontrolledValue(color);
    }

    onChange?.(color);

    if (showRecent) {
      setRecentColors(prev => {
        const updated = [color, ...prev.filter((c) => c !== color)].slice(0, MAX_RECENT_COLORS);
        try {
          localStorage.setItem(RECENT_COLORS_KEY, JSON.stringify(updated));
        } catch (e) {
          console.error('Failed to save recent colors:', e);
        }
        return updated;
      });
    }
  }, [isControlled, onChange, showRecent]);

  // Handle preset/recent color selection with sync
  const handleColorSelect = useCallback((color: string) => {
    handleColorChange(color);
    setHexInput(color);
    const rgbValue = hexToRgb(color);
    if (rgbValue) {
      setRgb(rgbValue);
    }
  }, [handleColorChange]);

  // Handle HEX input change
  const handleHexChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexInput(value);

    if (isValidHex(value)) {
      const color = value.startsWith('#') ? value : `#${value}`;
      const rgbValue = hexToRgb(color);
      if (rgbValue) {
        setRgb(rgbValue);
      }
    }
  }, []);

  // Handle RGB input change
  const handleRChange = useCallback((value: string) => {
    const numValue = Math.max(0, Math.min(255, parseInt(value) || 0));
    setRgb(prev => {
      const newRgb = { ...prev, r: numValue };
      setHexInput(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
      return newRgb;
    });
  }, []);

  const handleGChange = useCallback((value: string) => {
    const numValue = Math.max(0, Math.min(255, parseInt(value) || 0));
    setRgb(prev => {
      const newRgb = { ...prev, g: numValue };
      setHexInput(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
      return newRgb;
    });
  }, []);

  const handleBChange = useCallback((value: string) => {
    const numValue = Math.max(0, Math.min(255, parseInt(value) || 0));
    setRgb(prev => {
      const newRgb = { ...prev, b: numValue };
      setHexInput(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
      return newRgb;
    });
  }, []);

  // Handle apply button
  const handleApply = useCallback(() => {
    if (isValidHex(hexInput)) {
      const color = hexInput.startsWith('#') ? hexInput : `#${hexInput}`;
      handleColorChange(color);
      setIsOpen(false);
    }
  }, [hexInput, handleColorChange]);

  // Handle cancel button
  const handleCancel = useCallback(() => {
    setHexInput(currentValue);
    const rgbValue = hexToRgb(currentValue);
    if (rgbValue) {
      setRgb(rgbValue);
    }
    setIsOpen(false);
  }, [currentValue]);

  // Toggle handlers
  const toggleOpen = useCallback(() => {
    if (!disabled) {
      setIsOpen(prev => !prev);
    }
  }, [disabled]);

  const toggleCustomPicker = useCallback(() => {
    setCustomPickerOpen(prev => !prev);
  }, []);

  const closeCustomPicker = useCallback(() => {
    setCustomPickerOpen(false);
  }, []);

  const handleCustomApply = useCallback(() => {
    handleApply();
    setCustomPickerOpen(false);
  }, [handleApply]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        (!portal || (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)))
      ) {
        setIsOpen(false);
        setCustomPickerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [portal]);

  // Calculate dropdown position for portal mode
  useEffect(() => {
    if (portal && (isOpen || customPickerOpen) && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const dropdownHeight = 400;

      let top = rect.bottom + 4;
      const left = rect.left;

      if (top + dropdownHeight > window.innerHeight) {
        top = rect.top - dropdownHeight - 4;
      }

      setDropdownPosition({ top, left });
    }
  }, [portal, isOpen, customPickerOpen]);

  // Memoized class names
  const compactContainerClassName = useMemo(() =>
    `${styles.colorPickerCompact} ${styles[`colorPicker-${size}`]} ${className}`,
    [size, className]
  );

  const swatchesClassName = useMemo(() =>
    `${styles.colorSwatches} ${size === 'sm' ? styles.colorSwatchesSm : ''} ${size === 'lg' ? styles.colorSwatchesLg : ''}`,
    [size]
  );

  const containerClassName = useMemo(() =>
    `${styles.colorPicker} ${styles[`colorPicker-${size}`]} ${className}`,
    [size, className]
  );

  // Memoized inline styles
  const previewStyle = useMemo(() => ({ backgroundColor: hexInput }), [hexInput]);
  const currentSwatchStyle = useMemo(() => ({ backgroundColor: currentValue }), [currentValue]);

  // Compact mode
  if (compact) {
    return (
      <div className={compactContainerClassName} ref={containerRef}>
        {label && <label className={styles.colorPickerLabel}>{label}</label>}
        <div className={swatchesClassName}>
          {presets.map((color) => (
            <ColorSwatchButton
              key={color}
              color={color}
              isActive={currentValue === color}
              disabled={disabled}
              onSelect={handleColorChange}
            />
          ))}
          {allowCustom && (
            <button
              type="button"
              className={`${styles.colorSwatchBtn} ${styles.colorSwatchBtnCustom}`}
              onClick={toggleCustomPicker}
              aria-label="Custom color"
              disabled={disabled}
            >
              <Plus size={COLOR_PICKER_ICON_SIZES[size]} />
            </button>
          )}
        </div>

        {customPickerOpen && allowCustom && (() => {
          const dropdownContent = (
            <div
              ref={dropdownRef}
              className={`${styles.colorPickerDropdown} ${portal ? styles.portalDropdown : ''}`}
              style={portal ? {
                position: 'fixed',
                top: dropdownPosition.top,
                left: dropdownPosition.left,
              } : undefined}
            >
              <div className={styles.colorPickerPanel}>
                <div className={styles.colorPickerHeader}>
                  <h3 className={styles.colorPickerTitle}>Choose Color</h3>
                  <div className={styles.colorPickerPreview}>
                    <div
                      className={`${styles.colorSwatch} ${styles.colorSwatchLg}`}
                      style={previewStyle}
                    />
                    <div className={styles.colorValue}>
                      <span className={styles.colorValueHex}>{hexInput}</span>
                      <span className={styles.colorValueRgb}>
                        RGB({rgb.r}, {rgb.g}, {rgb.b})
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.colorPickerBody}>
                  <div className={styles.colorInputGroup}>
                    <label className={styles.colorInputLabel}>HEX</label>
                    <input
                      type="text"
                      className={styles.colorInputText}
                      value={hexInput}
                      onChange={handleHexChange}
                    />
                  </div>

                  <div className={styles.colorInputRow}>
                    <RgbInput label="R" value={rgb.r} onChange={handleRChange} />
                    <RgbInput label="G" value={rgb.g} onChange={handleGChange} />
                    <RgbInput label="B" value={rgb.b} onChange={handleBChange} />
                  </div>
                </div>

                <div className={styles.colorPickerFooter}>
                  <Button variant="secondary" size="sm" onClick={closeCustomPicker}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" onClick={handleCustomApply}>
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          );
          return portal ? createPortal(dropdownContent, document.body) : dropdownContent;
        })()}
      </div>
    );
  }

  // Full mode
  return (
    <div className={containerClassName} ref={containerRef}>
      {label && <label className={styles.colorPickerLabel}>{label}</label>}

      {children ? (
        <div onClick={toggleOpen}>{children}</div>
      ) : (
        <div className={styles.colorPickerTrigger}>
          <div
            className={styles.colorSwatch}
            style={currentSwatchStyle}
            onClick={toggleOpen}
          />
          <input
            type="text"
            className={styles.colorInput}
            value={currentValue}
            readOnly
            onClick={toggleOpen}
            disabled={disabled}
          />
          <button
            type="button"
            className={styles.colorPickerBtn}
            onClick={toggleOpen}
            aria-label="Open color picker"
            disabled={disabled}
          >
            <Palette size={COLOR_PICKER_ICON_SIZES[size]} />
          </button>
        </div>
      )}

      {isOpen && !disabled && (() => {
        const dropdownContent = (
          <div
            ref={dropdownRef}
            className={`${styles.colorPickerDropdown} ${portal ? styles.portalDropdown : ''}`}
            style={portal ? {
              position: 'fixed',
              top: dropdownPosition.top,
              left: dropdownPosition.left,
            } : undefined}
          >
            <div className={styles.colorPickerPanel}>
              <div className={styles.colorPickerHeader}>
                <h3 className={styles.colorPickerTitle}>Choose Color</h3>
                <div className={styles.colorPickerPreview}>
                  <div
                    className={`${styles.colorSwatch} ${styles.colorSwatchLg}`}
                    style={previewStyle}
                  />
                  <div className={styles.colorValue}>
                    <span className={styles.colorValueHex}>{hexInput}</span>
                    <span className={styles.colorValueRgb}>
                      RGB({rgb.r}, {rgb.g}, {rgb.b})
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.colorPickerBody}>
                <div className={styles.colorInputGroup}>
                  <label className={styles.colorInputLabel}>HEX</label>
                  <input
                    type="text"
                    className={styles.colorInputText}
                    value={hexInput}
                    onChange={handleHexChange}
                  />
                </div>

                <div className={styles.colorInputRow}>
                  <RgbInput label="R" value={rgb.r} onChange={handleRChange} />
                  <RgbInput label="G" value={rgb.g} onChange={handleGChange} />
                  <RgbInput label="B" value={rgb.b} onChange={handleBChange} />
                </div>

                {presets.length > 0 && (
                  <div className={styles.colorPresets}>
                    <h4 className={styles.colorPresetsTitle}>Preset Colors</h4>
                    <div className={styles.colorPresetsGrid}>
                      {presets.map((color) => (
                        <PresetColorButton
                          key={color}
                          color={color}
                          onSelect={handleColorSelect}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {showRecent && recentColors.length > 0 && (
                  <div className={styles.colorRecent}>
                    <h4 className={styles.colorRecentTitle}>Recent Colors</h4>
                    <div className={styles.colorRecentList}>
                      {recentColors.map((color) => (
                        <RecentColorItem
                          key={color}
                          color={color}
                          onSelect={handleColorSelect}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.colorPickerFooter}>
                <Button variant="secondary" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleApply}>
                  Apply
                </Button>
              </div>
            </div>
          </div>
        );
        return portal ? createPortal(dropdownContent, document.body) : dropdownContent;
      })()}
    </div>
  );
};

ColorPicker.displayName = 'ColorPicker';
