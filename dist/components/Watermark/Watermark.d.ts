import type { ReactNode, CSSProperties } from 'react';
export interface WatermarkProps {
    /** Watermark text content */
    content?: string | string[];
    /** Children to be watermarked */
    children: ReactNode;
    /** Font size in pixels */
    fontSize?: number;
    /** Rotation angle in degrees */
    rotate?: number;
    /** Text opacity (0-1) */
    opacity?: number;
    /** Gap between watermark texts in pixels */
    gap?: number;
    /** Apply watermark to entire viewport */
    fullscreen?: boolean;
    /** Additional CSS class */
    className?: string;
    /** Additional inline styles for container */
    style?: CSSProperties;
}
/**
 * Watermark Component
 *
 * Add semi-transparent text overlay to protect content from unauthorized use.
 * Ideal for sensitive documents, copyright protection, and user tracking.
 *
 * @example
 * ```tsx
 * <Watermark content="CONFIDENTIAL">
 *   <div>Your protected content here</div>
 * </Watermark>
 * ```
 *
 * @example
 * ```tsx
 * // Multi-line watermark
 * <Watermark
 *   content={['Internal Use Only', 'Do Not Distribute']}
 *   opacity={0.1}
 *   rotate={-45}
 * >
 *   <div>Protected document</div>
 * </Watermark>
 * ```
 *
 * @example
 * ```tsx
 * // User tracking watermark
 * <Watermark
 *   content="user@example.com"
 *   opacity={0.05}
 *   fontSize={14}
 * >
 *   <div>Sensitive data dashboard</div>
 * </Watermark>
 * ```
 */
export declare const Watermark: {
    ({ content, children, fontSize, rotate, opacity, gap, fullscreen, className, style, }: WatermarkProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
