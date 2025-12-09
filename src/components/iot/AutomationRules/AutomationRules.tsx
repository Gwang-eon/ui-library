import React from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './AutomationRules.module.css';

type IconType = LucideIcon;

// ==================== Automation Rule Card ====================

export interface RuleStep {
  label: string;
  content: string;
}

export interface RuleMetaItem {
  icon: IconType;
  label: string;
  value: string | React.ReactNode;
}

export interface AutomationRuleProps {
  icon: IconType;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  steps: RuleStep[];
  meta?: RuleMetaItem[];
  onToggle?: (enabled: boolean) => void;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  className?: string;
}

export const AutomationRule: React.FC<AutomationRuleProps> = ({
  icon: Icon,
  name,
  description,
  status,
  steps,
  meta,
  onToggle,
  onEdit,
  onDuplicate,
  onDelete,
  className = '',
}) => {
  const [enabled, setEnabled] = React.useState(status === 'active');

  const handleToggle = () => {
    const newState = !enabled;
    setEnabled(newState);
    onToggle?.(newState);
  };

  return (
    <div className={`${styles.ruleCard} ${className}`}>
      <div className={styles.ruleHeader}>
        <div className={styles.ruleHeaderLeft}>
          <div className={styles.ruleIconWrapper}>
            <Icon className={styles.ruleCategoryIcon} />
          </div>
          <div className={styles.ruleInfo}>
            <div className={styles.ruleTitleRow}>
              <h3 className={styles.ruleName}>{name}</h3>
              <span className={`${styles.badge} ${enabled ? styles.badgeSuccess : styles.badgeDefault}`}>
                {enabled ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className={styles.ruleDescription}>{description}</div>
          </div>
        </div>
        <div className={styles.ruleActions}>
          {onEdit && (
            <button className={styles.btnIcon} onClick={onEdit} aria-label="Edit rule">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          )}
          {onDuplicate && (
            <button className={styles.btnIcon} onClick={onDuplicate} aria-label="Duplicate rule">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button className={styles.btnIcon} onClick={onDelete} aria-label="Delete rule">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </button>
          )}
          <div className={styles.ruleDivider} />
          <label className={styles.switch}>
            <input
              type="checkbox"
              className={styles.switchInput}
              checked={enabled}
              onChange={handleToggle}
              aria-label={`Toggle ${name}`}
            />
            <span className={styles.switchSlider} />
          </label>
        </div>
      </div>

      {meta && meta.length > 0 && (
        <div className={styles.ruleMetaGroups}>
          {meta.map((item, index) => (
            <div key={index} className={styles.ruleMetaGroup}>
              <div className={styles.ruleMetaLabel}>
                <item.icon className={styles.iconSm} />
                <span>{item.label}</span>
              </div>
              <span className={styles.ruleMetaValue}>{item.value}</span>
            </div>
          ))}
        </div>
      )}

      <div className={styles.ruleFlow}>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className={styles.ruleStep}>
              <div className={styles.ruleStepLabel}>{step.label}</div>
              <div className={styles.ruleStepContent}>{step.content}</div>
            </div>
            {index < steps.length - 1 && (
              <div className={styles.ruleArrow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// ==================== Main Export ====================

export default {
  AutomationRule,
};
