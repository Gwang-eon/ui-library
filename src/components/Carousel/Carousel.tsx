import { useState, useEffect, useCallback, useRef, Children } from 'react';
import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Carousel.module.css';

export interface CarouselProps {
  /** Carousel slides */
  children: ReactNode;
  /** Auto-play interval in milliseconds (0 = disabled) */
  autoPlay?: number;
  /** Effect type */
  effect?: 'slide' | 'fade';
  /** Show navigation arrows */
  showArrows?: boolean;
  /** Show indicator dots */
  showIndicators?: boolean;
  /** Show thumbnails */
  showThumbnails?: boolean;
  /** Initial active slide index */
  defaultIndex?: number;
  /** Controlled active slide index */
  activeIndex?: number;
  /** Callback when slide changes */
  onChange?: (index: number) => void;
  /** Additional CSS class */
  className?: string;
  /** Pause autoplay on hover */
  pauseOnHover?: boolean;
  /** Enable infinite loop */
  loop?: boolean;
}

export interface CarouselSlideProps {
  /** Slide content */
  children: ReactNode;
  /** Optional caption */
  caption?: {
    title?: ReactNode;
    description?: ReactNode;
  };
  /** Thumbnail for navigation (URL or ReactNode) */
  thumbnail?: string | ReactNode;
  /** Additional CSS class */
  className?: string;
}

/**
 * Carousel Component
 *
 * Image and content slider with navigation controls, indicators, and auto-play.
 * Supports slide and fade effects, thumbnails, and touch gestures.
 *
 * @example
 * ```tsx
 * <Carousel autoPlay={5000} showIndicators>
 *   <Carousel.Slide caption={{ title: "Slide 1", description: "Description" }}>
 *     <img src="image1.jpg" alt="Slide 1" />
 *   </Carousel.Slide>
 *   <Carousel.Slide>
 *     <img src="image2.jpg" alt="Slide 2" />
 *   </Carousel.Slide>
 * </Carousel>
 * ```
 */
export const Carousel = ({
  children,
  autoPlay = 0,
  effect = 'slide',
  showArrows = true,
  showIndicators = true,
  showThumbnails = false,
  defaultIndex = 0,
  activeIndex: controlledIndex,
  onChange,
  className,
  pauseOnHover = true,
  loop = true,
}: CarouselProps) => {
  const [internalIndex, setInternalIndex] = useState(defaultIndex);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isControlled = controlledIndex !== undefined;
  const currentIndex = isControlled ? controlledIndex : internalIndex;

  const slides = Children.toArray(children);
  const slideCount = slides.length;

  const goToSlide = useCallback(
    (index: number) => {
      let newIndex = index;

      if (loop) {
        if (index < 0) newIndex = slideCount - 1;
        if (index >= slideCount) newIndex = 0;
      } else {
        if (index < 0) newIndex = 0;
        if (index >= slideCount) newIndex = slideCount - 1;
      }

      if (!isControlled) {
        setInternalIndex(newIndex);
      }
      onChange?.(newIndex);
    },
    [slideCount, loop, isControlled, onChange]
  );

  const goToPrev = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  // Auto-play
  useEffect(() => {
    if (autoPlay > 0 && !isPaused) {
      autoPlayRef.current = setInterval(() => {
        goToNext();
      }, autoPlay);

      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }
  }, [autoPlay, isPaused, goToNext]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swiped left
      goToNext();
    }

    if (touchStart - touchEnd < -50) {
      // Swiped right
      goToPrev();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToPrev();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  };

  const containerClasses = [
    styles.carousel,
    effect === 'fade' && styles.carouselFade,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={containerClasses}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Carousel"
      aria-live="polite"
    >
      <div className={styles.carouselInner}>
        {Children.map(children, (child, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              className={`${styles.carouselItem} ${isActive ? styles.active : ''}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slideCount}`}
              aria-hidden={!isActive}
            >
              {child}
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      {showArrows && slideCount > 1 && (
        <>
          <button
            className={`${styles.carouselControl} ${styles.carouselControlPrev}`}
            onClick={goToPrev}
            aria-label="Previous slide"
            disabled={!loop && currentIndex === 0}
          >
            <ChevronLeft />
          </button>
          <button
            className={`${styles.carouselControl} ${styles.carouselControlNext}`}
            onClick={goToNext}
            aria-label="Next slide"
            disabled={!loop && currentIndex === slideCount - 1}
          >
            <ChevronRight />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && slideCount > 1 && !showThumbnails && (
        <div className={styles.carouselIndicators}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.carouselIndicator} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex}
            />
          ))}
        </div>
      )}

      {/* Thumbnails */}
      {showThumbnails && slideCount > 1 && (
        <div className={styles.carouselThumbnailsContainer}>
          {Children.map(children, (child: any, index) => {
            const thumbnail = child?.props?.thumbnail;
            if (!thumbnail) return null;

            return (
              <button
                key={index}
                className={`${styles.carouselThumbnail} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex}
              >
                {typeof thumbnail === 'string' ? (
                  <img src={thumbnail} alt={`Thumbnail ${index + 1}`} />
                ) : (
                  thumbnail
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

/**
 * Carousel Slide Component
 *
 * Individual slide content with optional caption.
 */
const CarouselSlide = ({ children, caption, className }: CarouselSlideProps) => {
  const slideClasses = [styles.carouselSlide, className].filter(Boolean).join(' ');

  return (
    <div className={slideClasses}>
      {children}
      {caption && (
        <div className={styles.carouselCaption}>
          {caption.title && <h3>{caption.title}</h3>}
          {caption.description && <p>{caption.description}</p>}
        </div>
      )}
    </div>
  );
};

Carousel.Slide = CarouselSlide;
Carousel.displayName = 'Carousel';
CarouselSlide.displayName = 'Carousel.Slide';
