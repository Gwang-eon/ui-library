/**
 * PresetRanges - 프리셋 날짜 범위 컴포넌트
 */
import { isSameRange } from './utils';
import type { PresetRangesProps } from './types';
import styles from './PresetRanges.module.css';

export const PresetRanges = ({
  presets,
  onSelect,
  selectedRange,
  position = 'left',
  className = '',
}: PresetRangesProps) => {
  const containerClasses = [
    styles['preset-ranges'],
    position === 'left' && styles['preset-ranges-left'],
    position === 'top' && styles['preset-ranges-top'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses} role="listbox" aria-label="Date range presets">
      {presets.map((preset, index) => {
        const presetRange = preset.getValue();
        const isSelected = !!(
          selectedRange &&
          selectedRange.startDate &&
          selectedRange.endDate &&
          isSameRange(selectedRange, presetRange)
        );

        return (
          <button
            key={`${preset.label}-${index}`}
            type="button"
            className={`${styles['preset-ranges-item']} ${isSelected ? styles['preset-ranges-item-selected'] : ''}`}
            onClick={() => onSelect(presetRange)}
            role="option"
            aria-selected={isSelected}
          >
            {preset.label}
          </button>
        );
      })}
    </div>
  );
};

PresetRanges.displayName = 'PresetRanges';
