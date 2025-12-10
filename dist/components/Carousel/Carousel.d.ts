import type { ReactNode } from 'react';
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
export declare const Carousel: {
    ({ children, autoPlay, effect, showArrows, showIndicators, showThumbnails, defaultIndex, activeIndex: controlledIndex, onChange, className, pauseOnHover, loop, }: CarouselProps): import("react/jsx-runtime").JSX.Element;
    Slide: {
        ({ children, caption, className }: CarouselSlideProps): import("react/jsx-runtime").JSX.Element;
        displayName: string;
    };
    displayName: string;
};
