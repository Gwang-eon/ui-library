/**
 * PageSizeSelect
 * Dropdown for selecting page size with portal for overflow handling
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';
import styles from '../DataGrid.module.css';

interface PageSizeSelectProps {
  value: number;
  options: number[];
  onChange: (value: number) => void;
}

export const PageSizeSelect: React.FC<PageSizeSelectProps> = ({
  value,
  options,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      const handleScroll = () => updatePosition();
      window.addEventListener('scroll', handleScroll, true);
      return () => window.removeEventListener('scroll', handleScroll, true);
    }
  }, [isOpen, updatePosition]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleSelect = useCallback((size: number) => {
    onChange(size);
    setIsOpen(false);
  }, [onChange]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.pageSizeSelectTrigger}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value} / page</span>
        <ChevronDown size={14} />
      </button>
      {isOpen && createPortal(
        <div
          ref={dropdownRef}
          className={styles.pageSizeSelectDropdown}
          style={{
            position: 'fixed',
            top: position.top,
            left: position.left,
            minWidth: position.width,
            zIndex: 9999,
          }}
        >
          {options.map((size) => (
            <div
              key={size}
              className={`${styles.pageSizeSelectOption} ${size === value ? styles.selected : ''}`}
              onClick={() => handleSelect(size)}
            >
              {size} / page
            </div>
          ))}
        </div>,
        document.body
      )}
    </>
  );
};

export default PageSizeSelect;
