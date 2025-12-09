import React, { useState, useRef, useEffect, type HTMLAttributes } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import styles from './CascadeSelect.module.css';

export interface CascadeOption {
  /**
   * Option label
   */
  label: string;

  /**
   * Option value
   */
  value: string;

  /**
   * Child options for nested selection
   */
  children?: CascadeOption[];

  /**
   * Disabled state
   */
  disabled?: boolean;
}

export interface CascadeSelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Hierarchical options data
   */
  options: CascadeOption[];

  /**
   * Selected value path (array of values from root to leaf)
   */
  value?: string[];

  /**
   * Change handler - receives array of selected values
   */
  onChange?: (value: string[], labels: string[]) => void;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * CascadeSelect component for hierarchical data selection
 *
 * @example
 * ```tsx
 * const locations = [
 *   {
 *     label: 'Building A',
 *     value: 'building-a',
 *     children: [
 *       { label: 'Floor 1', value: 'floor-1', children: [...] }
 *     ]
 *   }
 * ];
 *
 * <CascadeSelect
 *   options={locations}
 *   value={['building-a', 'floor-1', 'zone-a']}
 *   onChange={(values, labels) => console.log(values, labels)}
 *   placeholder="Select location..."
 * />
 * ```
 */
export const CascadeSelect: React.FC<CascadeSelectProps> = ({
  options,
  value = [],
  onChange,
  placeholder = 'Select...',
  disabled = false,
  className = '',
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPath, setSelectedPath] = useState<string[]>(value);
  const [hoveredPath, setHoveredPath] = useState<string[]>([]);
  const [hoveredOptionRefs, setHoveredOptionRefs] = useState<Map<number, HTMLDivElement>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHoveredPath([]);
        setHoveredOptionRefs(new Map());
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Get display text from selected path
  const getDisplayText = () => {
    if (selectedPath.length === 0) return placeholder;

    const labels: string[] = [];
    let currentOptions = options;

    for (const val of selectedPath) {
      const option = currentOptions.find((opt) => opt.value === val);
      if (option) {
        labels.push(option.label);
        currentOptions = option.children || [];
      }
    }

    return labels.join(' / ');
  };

  // Get options for a specific level based on hovered or selected path
  const getOptionsForLevel = (level: number): CascadeOption[] => {
    if (level === 0) return options;

    // Use hoveredPath if available, otherwise use selectedPath
    const pathToUse = hoveredPath.length >= level ? hoveredPath : selectedPath;

    let currentOptions = options;
    for (let i = 0; i < level; i++) {
      const val = pathToUse[i];
      if (!val) return [];

      const option = currentOptions.find((opt) => opt.value === val);
      if (option?.children) {
        currentOptions = option.children;
      } else {
        return [];
      }
    }

    return currentOptions;
  };

  // Calculate how many levels should be visible
  const getVisibleLevels = (): number => {
    // Start with level 0 (always visible)
    let levels = 1;

    // Use hoveredPath if hovering, otherwise use selectedPath
    const pathToCheck = hoveredPath.length > 0 ? hoveredPath : selectedPath;

    let currentOptions = options;
    for (const val of pathToCheck) {
      const option = currentOptions.find((opt) => opt.value === val);
      if (option?.children && option.children.length > 0) {
        levels++;
        currentOptions = option.children;
      } else {
        break;
      }
    }

    return levels;
  };

  // Handle option hover
  const handleOptionHover = (option: CascadeOption, level: number, element: HTMLDivElement | null) => {
    if (option.disabled) return;

    // Build the new hover path up to this level
    const newPath = [
      ...hoveredPath.slice(0, level),
      option.value
    ];

    setHoveredPath(newPath);

    // Store the hovered element reference for positioning
    if (element) {
      setHoveredOptionRefs(prev => {
        const next = new Map(prev);
        next.set(level, element);
        return next;
      });
    }
  };

  // Handle option click
  const handleOptionClick = (option: CascadeOption, level: number) => {
    if (option.disabled) return;

    // Build the path up to this level
    const newPath = [
      ...hoveredPath.slice(0, level),
      option.value
    ];

    // If this is a leaf node (no children), complete the selection
    if (!option.children || option.children.length === 0) {
      setSelectedPath(newPath);
      setIsOpen(false);
      setHoveredPath([]);
      setHoveredOptionRefs(new Map());

      // Build labels array
      const labels: string[] = [];
      let currentOptions = options;
      for (const val of newPath) {
        const opt = currentOptions.find((o) => o.value === val);
        if (opt) {
          labels.push(opt.label);
          currentOptions = opt.children || [];
        }
      }

      onChange?.(newPath, labels);
    } else {
      // If has children, just update hover state (already done by hover handler)
      setHoveredPath(newPath);
    }
  };

  // Check if option is in selected path
  const isSelected = (optionValue: string, level: number): boolean => {
    return selectedPath[level] === optionValue;
  };

  // Check if option is in hovered path
  const isActive = (optionValue: string, level: number): boolean => {
    return hoveredPath[level] === optionValue;
  };

  const containerClasses = [
    styles['cascade-select'],
    isOpen && styles.open,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const triggerClasses = [
    styles['cascade-trigger'],
    selectedPath.length === 0 && styles.placeholder,
  ]
    .filter(Boolean)
    .join(' ');

  const visibleLevels = isOpen ? getVisibleLevels() : 0;

  return (
    <div ref={containerRef} className={containerClasses} {...rest}>
      {/* Trigger Button */}
      <button
        type="button"
        className={triggerClasses}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {getDisplayText()}
        <ChevronDown className={styles['select-icon']} size={18} />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className={styles['cascade-panel']}>
          {Array.from({ length: visibleLevels }).map((_, level) => {
            const levelOptions = getOptionsForLevel(level);
            if (levelOptions.length === 0) return null;

            const subpanelClasses = [
              styles['cascade-subpanel'],
              level > 0 && styles.nested,
              level > 0 && styles.show,
            ]
              .filter(Boolean)
              .join(' ');

            // Calculate top position based on the hovered option in the previous level
            let topOffset = 0;
            if (level > 0) {
              const hoveredElement = hoveredOptionRefs.get(level - 1);
              if (hoveredElement) {
                topOffset = hoveredElement.offsetTop;
              }
            }

            const subpanelStyle: React.CSSProperties =
              level > 0
                ? {
                    position: 'absolute',
                    left: `${level * 100}%`,
                    top: topOffset,
                  }
                : {};

            return (
              <div key={level} className={subpanelClasses} style={subpanelStyle}>
                {levelOptions.map((option) => {
                  const hasChildren = option.children && option.children.length > 0;
                  const optionClasses = [
                    styles['cascade-option'],
                    isSelected(option.value, level) && styles.selected,
                    isActive(option.value, level) && styles.active,
                    option.disabled && styles.disabled,
                  ]
                    .filter(Boolean)
                    .join(' ');

                  return (
                    <div
                      key={option.value}
                      className={optionClasses}
                      onClick={() => handleOptionClick(option, level)}
                      onMouseEnter={(e) => handleOptionHover(option, level, e.currentTarget)}
                      role="option"
                      aria-selected={isSelected(option.value, level)}
                      aria-disabled={option.disabled}
                    >
                      <span>{option.label}</span>
                      {hasChildren && <ChevronRight className={styles['option-arrow']} size={16} />}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

CascadeSelect.displayName = 'CascadeSelect';

export default CascadeSelect;
