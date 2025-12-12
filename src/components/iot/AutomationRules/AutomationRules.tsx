import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Edit, Copy, Trash2, ArrowRight } from 'lucide-react';
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
              <Edit size={16} />
            </button>
          )}
          {onDuplicate && (
            <button className={styles.btnIcon} onClick={onDuplicate} aria-label="Duplicate rule">
              <Copy size={16} />
            </button>
          )}
          {onDelete && (
            <button className={styles.btnIcon} onClick={onDelete} aria-label="Delete rule">
              <Trash2 size={16} />
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
                <ArrowRight size={20} />
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
