import { ImgHTMLAttributes, ReactNode } from 'react';
export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'className'> {
    /** Image source URL */
    src: string;
    /** Alt text for accessibility */
    alt: string;
    /** Object fit mode */
    fit?: 'cover' | 'contain' | 'fill' | 'none';
    /** Border radius variant */
    radius?: 'default' | 'circle' | 'square';
    /** Show loading placeholder */
    placeholder?: boolean | ReactNode;
    /** Show error fallback */
    fallback?: ReactNode;
    /** Enable preview/lightbox on click */
    preview?: boolean;
    /** Image caption */
    caption?: ReactNode;
    /** Loading state (eager or lazy) */
    loading?: 'eager' | 'lazy';
    /** Additional wrapper CSS class */
    className?: string;
    /** Width for wrapper */
    width?: string | number;
    /** Height for wrapper */
    height?: string | number;
}
/**
 * Image Component
 *
 * Enhanced image component with lazy loading, placeholder, error handling, and preview.
 * Optimizes performance and user experience for image-heavy applications.
 *
 * @example
 * ```tsx
 * <Image
 *   src="/path/to/image.jpg"
 *   alt="Device photo"
 *   fit="cover"
 *   preview
 *   caption="IoT Gateway Device"
 * />
 * ```
 */
export declare const Image: {
    ({ src, alt, fit, radius, placeholder, fallback, preview, caption, loading, className, width, height, ...rest }: ImageProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
