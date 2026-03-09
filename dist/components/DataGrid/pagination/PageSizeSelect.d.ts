/**
 * PageSizeSelect
 * Dropdown for selecting page size with portal for overflow handling
 */
import React from 'react';
interface PageSizeSelectProps {
    value: number;
    options: number[];
    onChange: (value: number) => void;
    perPageLabel?: string;
}
export declare const PageSizeSelect: React.FC<PageSizeSelectProps>;
export default PageSizeSelect;
