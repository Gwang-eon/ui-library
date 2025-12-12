import type { ReactNode, CSSProperties } from 'react';
import { useRef, useEffect, useState } from 'react';
import styles from './Watermark.module.css';

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
export const Watermark = ({
  content = 'Watermark',
  children,
  fontSize = 16,
  rotate = -45,
  opacity = 0.08,
  gap = 100,
  fullscreen = false,
  className = '',
  style = {},
}: WatermarkProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [watermarkItems, setWatermarkItems] = useState<
    Array<{ text: string; left: number; top: number }>
  >([]);

  useEffect(() => {
    const generateWatermark = () => {
      if (!containerRef.current) return;

      const container = fullscreen ? document.body : containerRef.current;
      const { offsetWidth: width, offsetHeight: height } = container;

      if (width === 0 || height === 0) return;

      // Calculate diagonal length for full coverage
      const diagonal = Math.sqrt(width * width + height * height);

      // Determine spacing based on fontSize and gap
      const spacing = fontSize + gap;

      // Calculate number of items needed
      const columns = Math.ceil(diagonal / spacing);
      const rows = Math.ceil(diagonal / spacing);

      const items: Array<{ text: string; left: number; top: number }> = [];

      // Convert content to string array
      const contentArray = Array.isArray(content) ? content : [content];
      const text = contentArray.join('\n');

      // Generate grid of watermark items
      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          items.push({
            text,
            left: i * spacing,
            top: j * spacing,
          });
        }
      }

      setWatermarkItems(items);
    };

    generateWatermark();

    // Regenerate on window resize
    const handleResize = () => {
      generateWatermark();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [content, fontSize, gap, fullscreen]);

  const watermarkStyle: CSSProperties = {
    opacity,
  };

  const textStyle: CSSProperties = {
    fontSize: `${fontSize}px`,
    transform: `rotate(${rotate}deg)`,
  };

  const watermarkLayer = (
    <div
      className={`${styles.watermark} ${fullscreen ? styles.watermarkFullscreen : ''}`}
      style={watermarkStyle}
      aria-hidden="true"
    >
      {watermarkItems.map((item, index) => (
        <span
          key={index}
          className={styles.watermarkText}
          style={{
            ...textStyle,
            left: `${item.left}px`,
            top: `${item.top}px`,
            whiteSpace: Array.isArray(content) ? 'pre-line' : 'nowrap',
          }}
        >
          {item.text}
        </span>
      ))}
    </div>
  );

  if (fullscreen) {
    // Render fullscreen watermark as a sibling to body
    return (
      <>
        {watermarkLayer}
        {children}
      </>
    );
  }

  // Render as wrapper container
  return (
    <div ref={containerRef} className={`${styles.watermarkContainer} ${className}`} style={style}>
      {children}
      {watermarkLayer}
    </div>
  );
};

Watermark.displayName = 'Watermark';
