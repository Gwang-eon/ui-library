import type { ReactNode } from 'react';
import { useState, useRef, useEffect } from 'react';
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

export interface ColorPickerProps {
  /** Selected color value (controlled) */
  value?: string;
  /** Default color value (uncontrolled) */
  defaultValue?: string;
  /** Change handler */
  onChange?: (color: string) => void;
  /** Label for the color picker */
  label?: string;
  /** Preset colors */
  presets?: string[];
  /** Show recent colors */
  showRecent?: boolean;
  /** Compact mode (swatch buttons only) */
  compact?: boolean;
  /** Small size for compact mode */
  size?: 'sm' | 'md';
  /** Allow custom color input */
  allowCustom?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Custom trigger element */
  children?: ReactNode;
}

const DEFAULT_PRESETS = [
  '#EF4444', // red
  '#F59E0B', // orange
  '#10B981', // green
  '#3B82F6', // blue
  '#6366F1', // indigo
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#14B8A6', // teal
  '#F97316', // orange-2
  '#06B6D4', // cyan
  '#84CC16', // lime
  '#64748B', // slate
];

const RECENT_COLORS_KEY = 'color-picker-recent';
const MAX_RECENT_COLORS = 5;

/**
 * Color Picker Component
 *
 * Select and customize colors with hex, RGB input and preset swatches.
 * Supports both full panel mode and compact swatch mode.
 *
 * @example
 * ```tsx
 * <ColorPicker
 *   label="Theme Color"
 *   defaultValue="#3B82F6"
 *   onChange={(color) => console.log(color)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Compact mode
 * <ColorPicker
 *   compact
 *   presets={['#EF4444', '#10B981', '#3B82F6']}
 *   onChange={(color) => console.log(color)}
 * />
 * ```
 */
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
}: ColorPickerProps) => {
  // Controlled/uncontrolled value management
  const isControlled = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const currentValue = isControlled ? controlledValue : uncontrolledValue;

  // Component state
  const [isOpen, setIsOpen] = useState(false);
  const [hexInput, setHexInput] = useState(currentValue);
  const [rgb, setRgb] = useState(hexToRgb(currentValue) || { r: 59, g: 130, b: 246 });
  const [recentColors, setRecentColors] = useState<string[]>([]);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const [customPickerOpen, setCustomPickerOpen] = useState(false);

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
  const handleColorChange = (newColor: string) => {
    if (!isValidHex(newColor)) return;

    // Ensure color starts with #
    const color = newColor.startsWith('#') ? newColor : `#${newColor}`;

    if (!isControlled) {
      setUncontrolledValue(color);
    }

    onChange?.(color);

    // Save to recent colors
    if (showRecent) {
      const updated = [color, ...recentColors.filter((c) => c !== color)].slice(
        0,
        MAX_RECENT_COLORS
      );
      setRecentColors(updated);
      try {
        localStorage.setItem(RECENT_COLORS_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save recent colors:', e);
      }
    }
  };

  // Handle HEX input change
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexInput(value);

    if (isValidHex(value)) {
      const color = value.startsWith('#') ? value : `#${value}`;
      const rgbValue = hexToRgb(color);
      if (rgbValue) {
        setRgb(rgbValue);
      }
    }
  };

  // Handle RGB input change
  const handleRgbChange = (channel: 'r' | 'g' | 'b', value: string) => {
    const numValue = Math.max(0, Math.min(255, parseInt(value) || 0));
    const newRgb = { ...rgb, [channel]: numValue };
    setRgb(newRgb);

    const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHexInput(hex);
  };

  // Handle apply button
  const handleApply = () => {
    if (isValidHex(hexInput)) {
      const color = hexInput.startsWith('#') ? hexInput : `#${hexInput}`;
      handleColorChange(color);
      setIsOpen(false);
    }
  };

  // Handle cancel button
  const handleCancel = () => {
    setHexInput(currentValue);
    const rgbValue = hexToRgb(currentValue);
    if (rgbValue) {
      setRgb(rgbValue);
    }
    setIsOpen(false);
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setCustomPickerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compact mode
  if (compact) {
    return (
      <div className={`${styles.colorPickerCompact} ${className}`} ref={containerRef}>
        {label && <label className={styles.colorPickerLabel}>{label}</label>}
        <div className={`${styles.colorSwatches} ${size === 'sm' ? styles.colorSwatchesSm : ''}`}>
          {presets.map((color) => (
            <button
              key={color}
              type="button"
              className={`${styles.colorSwatchBtn} ${
                currentValue === color ? styles.colorSwatchBtnActive : ''
              }`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorChange(color)}
              title={color}
              aria-label={`Select color ${color}`}
              disabled={disabled}
            />
          ))}
          {allowCustom && (
            <button
              type="button"
              className={`${styles.colorSwatchBtn} ${styles.colorSwatchBtnCustom}`}
              onClick={() => setCustomPickerOpen(!customPickerOpen)}
              aria-label="Custom color"
              disabled={disabled}
            >
              <Plus size={14} />
            </button>
          )}
        </div>

        {customPickerOpen && allowCustom && (
          <div className={styles.colorPickerDropdown}>
            <div className={styles.colorPickerPanel}>
              <div className={styles.colorPickerHeader}>
                <h3 className={styles.colorPickerTitle}>Choose Color</h3>
                <div className={styles.colorPickerPreview}>
                  <div
                    className={`${styles.colorSwatch} ${styles.colorSwatchLg}`}
                    style={{ backgroundColor: hexInput }}
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
                  <div className={styles.colorInputGroup}>
                    <label className={styles.colorInputLabel}>R</label>
                    <input
                      type="number"
                      className={styles.colorInputNumber}
                      value={rgb.r}
                      onChange={(e) => handleRgbChange('r', e.target.value)}
                      min="0"
                      max="255"
                    />
                  </div>
                  <div className={styles.colorInputGroup}>
                    <label className={styles.colorInputLabel}>G</label>
                    <input
                      type="number"
                      className={styles.colorInputNumber}
                      value={rgb.g}
                      onChange={(e) => handleRgbChange('g', e.target.value)}
                      min="0"
                      max="255"
                    />
                  </div>
                  <div className={styles.colorInputGroup}>
                    <label className={styles.colorInputLabel}>B</label>
                    <input
                      type="number"
                      className={styles.colorInputNumber}
                      value={rgb.b}
                      onChange={(e) => handleRgbChange('b', e.target.value)}
                      min="0"
                      max="255"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.colorPickerFooter}>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCustomPickerOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    handleApply();
                    setCustomPickerOpen(false);
                  }}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Full mode
  return (
    <div className={`${styles.colorPicker} ${className}`} ref={containerRef}>
      {label && <label className={styles.colorPickerLabel}>{label}</label>}

      {children ? (
        <div onClick={() => !disabled && setIsOpen(!isOpen)}>{children}</div>
      ) : (
        <div className={styles.colorPickerTrigger}>
          <div
            className={styles.colorSwatch}
            style={{ backgroundColor: currentValue }}
            onClick={() => !disabled && setIsOpen(!isOpen)}
          />
          <input
            type="text"
            className={styles.colorInput}
            value={currentValue}
            readOnly
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
          />
          <button
            type="button"
            className={styles.colorPickerBtn}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            aria-label="Open color picker"
            disabled={disabled}
          >
            <Palette size={16} />
          </button>
        </div>
      )}

      {isOpen && !disabled && (
        <div className={styles.colorPickerDropdown}>
          <div className={styles.colorPickerPanel}>
            <div className={styles.colorPickerHeader}>
              <h3 className={styles.colorPickerTitle}>Choose Color</h3>
              <div className={styles.colorPickerPreview}>
                <div
                  className={`${styles.colorSwatch} ${styles.colorSwatchLg}`}
                  style={{ backgroundColor: hexInput }}
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
                <div className={styles.colorInputGroup}>
                  <label className={styles.colorInputLabel}>R</label>
                  <input
                    type="number"
                    className={styles.colorInputNumber}
                    value={rgb.r}
                    onChange={(e) => handleRgbChange('r', e.target.value)}
                    min="0"
                    max="255"
                  />
                </div>
                <div className={styles.colorInputGroup}>
                  <label className={styles.colorInputLabel}>G</label>
                  <input
                    type="number"
                    className={styles.colorInputNumber}
                    value={rgb.g}
                    onChange={(e) => handleRgbChange('g', e.target.value)}
                    min="0"
                    max="255"
                  />
                </div>
                <div className={styles.colorInputGroup}>
                  <label className={styles.colorInputLabel}>B</label>
                  <input
                    type="number"
                    className={styles.colorInputNumber}
                    value={rgb.b}
                    onChange={(e) => handleRgbChange('b', e.target.value)}
                    min="0"
                    max="255"
                  />
                </div>
              </div>

              {presets.length > 0 && (
                <div className={styles.colorPresets}>
                  <h4 className={styles.colorPresetsTitle}>Preset Colors</h4>
                  <div className={styles.colorPresetsGrid}>
                    {presets.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={styles.colorPresetItem}
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          handleColorChange(color);
                          setHexInput(color);
                          const rgbValue = hexToRgb(color);
                          if (rgbValue) {
                            setRgb(rgbValue);
                          }
                        }}
                        title={color}
                        aria-label={`Select preset color ${color}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {showRecent && recentColors.length > 0 && (
                <div className={styles.colorRecent}>
                  <h4 className={styles.colorRecentTitle}>Recent Colors</h4>
                  <div className={styles.colorRecentList}>
                    {recentColors.map((color, index) => (
                      <div
                        key={`${color}-${index}`}
                        className={styles.colorRecentItem}
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          handleColorChange(color);
                          setHexInput(color);
                          const rgbValue = hexToRgb(color);
                          if (rgbValue) {
                            setRgb(rgbValue);
                          }
                        }}
                        title={color}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleColorChange(color);
                            setHexInput(color);
                            const rgbValue = hexToRgb(color);
                            if (rgbValue) {
                              setRgb(rgbValue);
                            }
                          }
                        }}
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
      )}
    </div>
  );
};

ColorPicker.displayName = 'ColorPicker';
