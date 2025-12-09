import React, { createContext, useContext, useState } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';
import styles from './Tabs.module.css';

export type TabsVariant = 'line' | 'contained' | 'pills' | 'icon-bar';
export type TabsSize = 'sm' | 'md' | 'lg';
export type TabsOrientation = 'horizontal' | 'vertical';

interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
  variant: TabsVariant;
  size: TabsSize;
  orientation: TabsOrientation;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs component');
  }
  return context;
};

// Main Tabs Container
export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: TabsVariant;
  size?: TabsSize;
  orientation?: TabsOrientation;
  children: ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  value: controlledValue,
  defaultValue,
  onChange,
  variant = 'line',
  size = 'md',
  orientation = 'horizontal',
  children,
  className = '',
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<string>(defaultValue || '');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = (newValue: string) => {
    if (!isControlled) {
      setUncontrolledValue(newValue);
    }
    onChange?.(newValue);
  };

  const contextValue: TabsContextValue = {
    value,
    onChange: handleChange,
    variant,
    size,
    orientation,
  };

  const containerClass = [
    orientation === 'vertical' && styles['tabs-vertical-container'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={containerClass}>{children}</div>
    </TabsContext.Provider>
  );
};

// TabsList - Container for Tab buttons
export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({ children, className = '', ...props }) => {
  const { variant, size, orientation } = useTabsContext();

  const tabsClass = [
    styles.tabs,
    variant === 'contained' && styles['tabs-contained'],
    variant === 'pills' && styles['tabs-pills'],
    variant === 'icon-bar' && styles['tabs-icon-bar'],
    size === 'sm' && styles['tabs-sm'],
    size === 'lg' && styles['tabs-lg'],
    orientation === 'vertical' && styles['tabs-vertical'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={tabsClass} role="tablist" {...props}>
      {children}
    </div>
  );
};

// Individual Tab
export interface TabProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  value: string;
  children: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
  counter?: number;
  disabled?: boolean;
  className?: string;
}

export const Tab: React.FC<TabProps> = ({
  value: tabValue,
  children,
  icon,
  badge,
  counter,
  disabled = false,
  className = '',
  ...props
}) => {
  const { value, onChange, variant } = useTabsContext();
  const isActive = value === tabValue;

  const handleClick = () => {
    if (!disabled) {
      onChange(tabValue);
    }
  };

  const tabClass = [styles.tab, isActive && styles.active, className].filter(Boolean).join(' ');

  return (
    <button
      className={tabClass}
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${tabValue}`}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {icon && <span className={styles['tab-icon']}>{icon}</span>}
      <span>{children}</span>
      {badge && <span className={styles['tab-badge']}>{badge}</span>}
      {counter !== undefined && (
        <span className={variant === 'icon-bar' ? styles['tab-counter'] : styles['tab-badge']}>
          {counter}
        </span>
      )}
    </button>
  );
};

// TabPanel - Content for each tab
export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children: ReactNode;
  className?: string;
  keepMounted?: boolean;
}

export const TabPanel: React.FC<TabPanelProps> = ({
  value: panelValue,
  children,
  className = '',
  keepMounted = false,
  ...props
}) => {
  const { value } = useTabsContext();
  const isActive = value === panelValue;

  const panelClass = [styles['tab-panel'], isActive && styles.active, className]
    .filter(Boolean)
    .join(' ');

  if (!isActive && !keepMounted) {
    return null;
  }

  return (
    <div
      className={panelClass}
      role="tabpanel"
      id={`tabpanel-${panelValue}`}
      aria-labelledby={`tab-${panelValue}`}
      hidden={!isActive}
      {...props}
    >
      {children}
    </div>
  );
};

// TabContent - Wrapper for all TabPanels
export interface TabContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const TabContent: React.FC<TabContentProps> = ({ children, className = '', ...props }) => {
  const contentClass = [styles['tab-content'], className].filter(Boolean).join(' ');

  return (
    <div className={contentClass} {...props}>
      {children}
    </div>
  );
};

// Export default as compound component
Tabs.displayName = 'Tabs';
TabsList.displayName = 'TabsList';
Tab.displayName = 'Tab';
TabPanel.displayName = 'TabPanel';
TabContent.displayName = 'TabContent';
