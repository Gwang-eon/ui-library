export interface ImageViewerImage {
    /** Image source URL */
    src: string;
    /** Alt text for accessibility */
    alt: string;
    /** Optional thumbnail URL for navigation strip */
    thumbnail?: string;
}
export interface ImageViewerProps {
    /** Whether the viewer is open */
    open: boolean;
    /** Callback when viewer should close */
    onClose: () => void;
    /** Single image source (for single image mode) */
    src?: string;
    /** Single image alt text */
    alt?: string;
    /** Array of images for gallery mode */
    images?: ImageViewerImage[];
    /** Initial index for gallery mode */
    initialIndex?: number;
    /** Show toolbar with zoom/rotate controls */
    toolbar?: boolean;
    /** Show close button */
    closable?: boolean;
    /** Close viewer when clicking mask/backdrop */
    maskClosable?: boolean;
    /** Enable keyboard navigation */
    keyboard?: boolean;
    /** Show navigation arrows for gallery */
    navigation?: boolean;
    /** Show thumbnail strip for gallery */
    thumbnails?: boolean;
    /** Enable looping in gallery navigation */
    loop?: boolean;
    /** Minimum zoom level */
    minZoom?: number;
    /** Maximum zoom level */
    maxZoom?: number;
    /** Zoom step increment */
    zoomStep?: number;
    /** Callback when navigating in gallery */
    onNavigate?: (index: number) => void;
}
/**
 * Image Viewer Component
 *
 * Full-screen image viewer with zoom, rotation, and gallery navigation.
 * Supports both single image and gallery modes with comprehensive controls.
 *
 * @example
 * ```tsx
 * // Single image
 * <ImageViewer
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   src="/device-photo.jpg"
 *   alt="IoT Device"
 * />
 *
 * // Gallery mode
 * <ImageViewer
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   images={[
 *     { src: '/image1.jpg', alt: 'Image 1' },
 *     { src: '/image2.jpg', alt: 'Image 2' }
 *   ]}
 *   navigation
 *   thumbnails
 * />
 * ```
 */
export declare const ImageViewer: {
    ({ open, onClose, src, alt, images, initialIndex, toolbar, closable, maskClosable, keyboard, navigation, thumbnails, loop, minZoom, maxZoom, zoomStep, onNavigate, }: ImageViewerProps): import('react').ReactPortal | null;
    displayName: string;
};
