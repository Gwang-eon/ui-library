import React from 'react';
export type SpinSize = 'sm' | 'md' | 'lg';
export type SpinVariant = 'circle' | 'dots' | 'pulse' | 'bars';
export interface SpinProps {
    /** Size of the spinner */
    size?: SpinSize;
    /** Visual variant of the spinner */
    variant?: SpinVariant;
    /** Display as inline element (for buttons) */
    inline?: boolean;
    /** Loading text below spinner */
    text?: string;
    /** Additional CSS class */
    className?: string;
    /** Accessible label for screen readers */
    'aria-label'?: string;
}
export interface SpinContainerProps {
    /** Size of the spinner */
    size?: SpinSize;
    /** Visual variant of the spinner */
    variant?: SpinVariant;
    /** Loading text below spinner */
    text: string;
    /** Additional CSS class */
    className?: string;
    /** Accessible label for screen readers */
    'aria-label'?: string;
}
export interface SpinOverlayProps {
    /** Size of the spinner */
    size?: SpinSize;
    /** Visual variant of the spinner */
    variant?: SpinVariant;
    /** Loading text below spinner */
    text: string;
    /** Additional CSS class */
    className?: string;
}
export interface SpinFullscreenProps {
    /** Size of the spinner */
    size?: SpinSize;
    /** Visual variant of the spinner */
    variant?: SpinVariant;
    /** Loading text below spinner */
    text: string;
    /** Additional CSS class */
    className?: string;
}
/**
 * Spin - Loading indicator component
 *
 * Simple spinner for loading states.
 */
export declare const Spin: React.FC<SpinProps>;
/**
 * SpinContainer - Spinner with text in a centered container
 */
export declare const SpinContainer: React.FC<SpinContainerProps>;
/**
 * SpinOverlay - Overlay loading state for content containers
 */
export declare const SpinOverlay: React.FC<SpinOverlayProps>;
/**
 * SpinFullscreen - Full page loading overlay
 */
export declare const SpinFullscreen: React.FC<SpinFullscreenProps>;
