import { useState, useEffect } from 'react';
import type { ImgHTMLAttributes, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Image as ImageIcon, ImageOff, Maximize2, X } from 'lucide-react';
import styles from './Image.module.css';

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
export const Image = ({
  src,
  alt,
  fit = 'none',
  radius = 'default',
  placeholder = true,
  fallback,
  preview = false,
  caption,
  loading = 'lazy',
  className,
  width,
  height,
  ...rest
}: ImageProps) => {
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [showLightbox, setShowLightbox] = useState(false);

  const handleLoad = () => {
    setImageStatus('loaded');
  };

  const handleError = () => {
    setImageStatus('error');
  };

  const handleImageClick = () => {
    if (preview && imageStatus === 'loaded') {
      setShowLightbox(true);
    }
  };

  const handleCloseLightbox = () => {
    setShowLightbox(false);
  };

  // Handle Escape key to close lightbox
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCloseLightbox();
    }
  };

  // Add/remove escape listener when lightbox opens/closes
  useEffect(() => {
    if (showLightbox) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [showLightbox]);

  const wrapperClasses = [
    styles.imageWrapper,
    radius === 'circle' && styles.imageCircle,
    radius === 'square' && styles.imageSquare,
    preview && styles.imagePreview,
    imageStatus === 'loading' && placeholder && styles.imageLoading,
    imageStatus === 'error' && styles.imageError,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const imgClasses = [
    styles.image,
    fit === 'cover' && styles.imageCover,
    fit === 'contain' && styles.imageContain,
    fit === 'fill' && styles.imageFill,
  ]
    .filter(Boolean)
    .join(' ');

  const wrapperStyle: React.CSSProperties = {
    width: width,
    height: height,
  };

  const renderContent = () => {
    // Error state
    if (imageStatus === 'error') {
      if (fallback) {
        return <div className={styles.imageErrorContent}>{fallback}</div>;
      }
      return (
        <div className={styles.imageErrorContent}>
          <ImageOff />
          <span>Failed to load image</span>
        </div>
      );
    }

    // Loading state
    if (imageStatus === 'loading' && placeholder) {
      if (typeof placeholder === 'boolean') {
        return (
          <div className={styles.imagePlaceholder}>
            <ImageIcon />
            <span>Loading...</span>
          </div>
        );
      }
      return <div className={styles.imagePlaceholder}>{placeholder}</div>;
    }

    // Loaded image
    return (
      <>
        <img
          className={imgClasses}
          src={src}
          alt={alt}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            display: imageStatus === 'loaded' ? 'block' : 'none',
          }}
          {...rest}
        />
        {preview && imageStatus === 'loaded' && (
          <div className={styles.imagePreviewOverlay}>
            <Maximize2 />
            <span>Click to preview</span>
          </div>
        )}
      </>
    );
  };

  const imageElement = (
    <div
      className={wrapperClasses}
      style={wrapperStyle}
      onClick={handleImageClick}
      role={preview ? 'button' : undefined}
      tabIndex={preview ? 0 : undefined}
      onKeyDown={
        preview
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleImageClick();
              }
            }
          : undefined
      }
      aria-label={preview ? `Preview ${alt}` : undefined}
    >
      {renderContent()}
    </div>
  );

  // Lightbox portal
  const lightbox = showLightbox &&
    createPortal(
      <div className={styles.imageLightbox}>
        <div
          className={styles.imageLightboxBackdrop}
          onClick={handleCloseLightbox}
        />
        <div className={styles.imageLightboxContent}>
          <button
            className={styles.imageLightboxClose}
            onClick={handleCloseLightbox}
            aria-label="Close preview"
            type="button"
          >
            <X />
          </button>
          <img src={src} alt={alt} />
        </div>
      </div>,
      document.body
    );

  // With caption
  if (caption) {
    return (
      <>
        <figure className={styles.imageFigure}>
          {imageElement}
          <figcaption className={styles.imageCaption}>{caption}</figcaption>
        </figure>
        {lightbox}
      </>
    );
  }

  return (
    <>
      {imageElement}
      {lightbox}
    </>
  );
};

Image.displayName = 'Image';
