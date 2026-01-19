import type { ReactNode } from 'react';
export type TourPlacement = 'top' | 'bottom' | 'left' | 'right';
export interface TourStep {
    /** Target element selector (e.g., '#step-1', '.my-element') */
    target: string;
    /** Step title */
    title: string;
    /** Step description */
    content: ReactNode;
    /** Popup placement relative to target */
    placement?: TourPlacement;
}
export interface TourProps {
    /** Whether the tour is open */
    open: boolean;
    /** Array of tour steps */
    steps: TourStep[];
    /** Current step index (controlled) */
    current?: number;
    /** Current step change callback */
    onChange?: (current: number) => void;
    /** Close callback */
    onClose: () => void;
    /** Finish callback (when last step completes) */
    onFinish?: () => void;
    /** Skip callback */
    onSkip?: () => void;
    /** Show mask overlay */
    mask?: boolean;
    /** Show close button */
    closable?: boolean;
    /** Show skip button */
    showSkip?: boolean;
    /** Show progress indicator */
    showProgress?: boolean;
    /** Default placement for all steps */
    placement?: TourPlacement;
    /** ARIA label */
    'aria-label'?: string;
}
/**
 * Tour Component
 *
 * Step-by-step guide to help users understand and navigate through features.
 * Ideal for user onboarding, feature discovery, and contextual help.
 *
 * @example
 * ```tsx
 * const [tourOpen, setTourOpen] = useState(false);
 *
 * const steps: TourStep[] = [
 *   {
 *     target: '#dashboard',
 *     title: 'Dashboard',
 *     content: 'View your device metrics here',
 *     placement: 'bottom'
 *   },
 *   {
 *     target: '#settings',
 *     title: 'Settings',
 *     content: 'Configure your preferences',
 *     placement: 'left'
 *   }
 * ];
 *
 * <Tour
 *   open={tourOpen}
 *   steps={steps}
 *   onClose={() => setTourOpen(false)}
 *   onFinish={() => console.log('Tour completed')}
 * />
 * ```
 */
export declare const Tour: {
    ({ open, steps, current: controlledCurrent, onChange, onClose, onFinish, onSkip, mask, closable, showSkip, showProgress, placement: defaultPlacement, "aria-label": ariaLabel, }: TourProps): import("react").ReactPortal | null;
    displayName: string;
};
