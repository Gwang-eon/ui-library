import React, { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Accordion.module.css';

// ===== Types =====

export interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

export interface AccordionItemProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

// ===== Accordion Item =====

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  defaultOpen = false,
  icon,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerId = useRef(`accordion-header-${Math.random().toString(36).substr(2, 9)}`);
  const contentId = useRef(`accordion-content-${Math.random().toString(36).substr(2, 9)}`);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleAccordion();
    }
  };

  // Calculate max-height for smooth animation
  const maxHeight = isOpen && contentRef.current
    ? `${contentRef.current.scrollHeight}px`
    : '0px';

  const itemClasses = [
    styles.accordionItem,
    isOpen && styles.accordionItemOpen,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={itemClasses}>
      <button
        id={headerId.current}
        className={styles.accordionHeader}
        onClick={toggleAccordion}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={contentId.current}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
          {icon && <span>{icon}</span>}
          <span>{title}</span>
        </div>
        <ChevronDown size={20} className={styles.accordionIcon} />
      </button>
      <div
        id={contentId.current}
        ref={contentRef}
        className={styles.accordionContent}
        style={{ maxHeight }}
        role="region"
        aria-labelledby={headerId.current}
      >
        <div className={styles.accordionBody}>{children}</div>
      </div>
    </div>
  );
};

// ===== Main Accordion Component =====

const Accordion: React.FC<AccordionProps> & {
  Item: typeof AccordionItem;
} = ({ children, className = '' }) => {
  return (
    <div className={`${styles.accordion} ${className}`}>
      {children}
    </div>
  );
};

// Attach sub-components
Accordion.Item = AccordionItem;

export { Accordion };
