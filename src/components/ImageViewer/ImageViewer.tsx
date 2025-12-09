import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  RotateCw,
  Maximize2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import styles from './ImageViewer.module.css';

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
export const ImageViewer = ({
  open,
  onClose,
  src,
  alt = '',
  images,
  initialIndex = 0,
  toolbar = true,
  closable = true,
  maskClosable = true,
  keyboard = true,
  navigation = true,
  thumbnails = false,
  loop = true,
  minZoom = 0.1,
  maxZoom = 5,
  zoomStep = 0.2,
  onNavigate,
}: ImageViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Determine if in gallery mode
  const isGallery = !!images && images.length > 0;
  const currentImage = isGallery
    ? images[currentIndex]
    : { src: src || '', alt: alt || '' };

  // Reset zoom and rotation when image changes
  useEffect(() => {
    if (open) {
      setZoom(1);
      setRotation(0);
      setLoading(true);
    }
  }, [currentIndex, open]);

  // Focus management
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
      // Restore focus
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Keyboard navigation
  useEffect(() => {
    if (!keyboard || !open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (isGallery && navigation) {
            navigatePrevious();
          }
          break;
        case 'ArrowRight':
          if (isGallery && navigation) {
            navigateNext();
          }
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
        case '_':
          handleZoomOut();
          break;
        case 'r':
        case 'R':
          handleRotateRight();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyboard, open, isGallery, navigation, currentIndex, zoom, rotation]);

  // Handle zoom in
  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + zoomStep, maxZoom));
  }, [zoomStep, maxZoom]);

  // Handle zoom out
  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - zoomStep, minZoom));
  }, [zoomStep, minZoom]);

  // Handle rotate left
  const handleRotateLeft = useCallback(() => {
    setRotation((prev) => prev - 90);
  }, []);

  // Handle rotate right
  const handleRotateRight = useCallback(() => {
    setRotation((prev) => prev + 90);
  }, []);

  // Handle reset
  const handleReset = useCallback(() => {
    setZoom(1);
    setRotation(0);
  }, []);

  // Navigate to next image
  const navigateNext = useCallback(() => {
    if (!isGallery) return;

    const nextIndex = currentIndex + 1;
    if (nextIndex < images.length) {
      setCurrentIndex(nextIndex);
      onNavigate?.(nextIndex);
    } else if (loop) {
      setCurrentIndex(0);
      onNavigate?.(0);
    }
  }, [isGallery, currentIndex, images, loop, onNavigate]);

  // Navigate to previous image
  const navigatePrevious = useCallback(() => {
    if (!isGallery) return;

    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
      onNavigate?.(prevIndex);
    } else if (loop) {
      setCurrentIndex(images.length - 1);
      onNavigate?.(images.length - 1);
    }
  }, [isGallery, currentIndex, images, loop, onNavigate]);

  // Go to specific image
  const goToImage = useCallback(
    (index: number) => {
      if (!isGallery || index < 0 || index >= images.length) return;
      setCurrentIndex(index);
      onNavigate?.(index);
    },
    [isGallery, images, onNavigate]
  );

  // Handle mask click
  const handleMaskClick = () => {
    if (maskClosable) {
      onClose();
    }
  };

  // Handle image load
  const handleImageLoad = () => {
    setLoading(false);
  };

  // Check if navigation buttons should be disabled
  const isPrevDisabled = !loop && currentIndex === 0;
  const isNextDisabled = !loop && isGallery && currentIndex === images.length - 1;

  if (!open) return null;

  const viewer = (
    <div className={`${styles.imageViewer} ${styles.imageViewerOpen}`}>
      <div className={styles.imageViewerMask} onClick={handleMaskClick} />

      <div className={styles.imageViewerContent}>
        {/* Close button */}
        {closable && (
          <button
            className={styles.imageViewerClose}
            onClick={onClose}
            aria-label="Close image viewer"
            type="button"
          >
            <X />
          </button>
        )}

        {/* Toolbar */}
        {toolbar && (
          <div className={styles.imageViewerToolbar}>
            {/* Gallery counter */}
            {isGallery && (
              <>
                <span className={styles.imageViewerCounter}>
                  {currentIndex + 1} / {images.length}
                </span>
                <div className={styles.imageViewerDivider} />
              </>
            )}

            {/* Zoom out */}
            <button
              className={styles.imageViewerTool}
              onClick={handleZoomOut}
              aria-label="Zoom out"
              type="button"
              disabled={zoom <= minZoom}
            >
              <ZoomOut />
            </button>

            {/* Zoom level */}
            <span className={styles.imageViewerZoomLevel} aria-live="polite">
              {Math.round(zoom * 100)}%
            </span>

            {/* Zoom in */}
            <button
              className={styles.imageViewerTool}
              onClick={handleZoomIn}
              aria-label="Zoom in"
              type="button"
              disabled={zoom >= maxZoom}
            >
              <ZoomIn />
            </button>

            <div className={styles.imageViewerDivider} />

            {/* Rotate left */}
            <button
              className={styles.imageViewerTool}
              onClick={handleRotateLeft}
              aria-label="Rotate counterclockwise"
              type="button"
            >
              <RotateCcw />
            </button>

            {/* Rotate right */}
            <button
              className={styles.imageViewerTool}
              onClick={handleRotateRight}
              aria-label="Rotate clockwise"
              type="button"
            >
              <RotateCw />
            </button>

            <div className={styles.imageViewerDivider} />

            {/* Reset */}
            <button
              className={styles.imageViewerTool}
              onClick={handleReset}
              aria-label="Reset zoom and rotation"
              type="button"
            >
              <Maximize2 />
            </button>
          </div>
        )}

        {/* Navigation arrows */}
        {isGallery && navigation && (
          <>
            <button
              className={`${styles.imageViewerNav} ${styles.imageViewerPrev}`}
              onClick={navigatePrevious}
              disabled={isPrevDisabled}
              aria-label="Previous image"
              type="button"
            >
              <ChevronLeft />
            </button>

            <button
              className={`${styles.imageViewerNav} ${styles.imageViewerNext}`}
              onClick={navigateNext}
              disabled={isNextDisabled}
              aria-label="Next image"
              type="button"
            >
              <ChevronRight />
            </button>
          </>
        )}

        {/* Main image */}
        <div className={styles.imageViewerMain}>
          {loading && <div className={styles.imageViewerLoading} />}
          <img
            ref={imageRef}
            src={currentImage.src}
            alt={currentImage.alt}
            draggable={false}
            onLoad={handleImageLoad}
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              display: loading ? 'none' : 'block',
            }}
          />
        </div>

        {/* Thumbnail strip */}
        {isGallery && thumbnails && (
          <div className={styles.imageViewerThumbnails}>
            {images.map((image, index) => (
              <img
                key={index}
                src={image.thumbnail || image.src}
                alt={`Thumbnail ${index + 1}`}
                className={`${styles.imageViewerThumbnail} ${
                  index === currentIndex ? styles.imageViewerThumbnailActive : ''
                }`}
                onClick={() => goToImage(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(viewer, document.body);
};

ImageViewer.displayName = 'ImageViewer';
