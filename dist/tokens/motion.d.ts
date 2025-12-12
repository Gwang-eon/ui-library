/**
 * IoT Platform Design System - Motion Tokens
 * Converted from design-tokens.css
 *
 * Contains:
 * - Duration tokens
 * - Easing functions
 * - Component-specific motion tokens
 * - IoT-specific motion tokens
 * - Mobile animation tokens
 */
export declare const duration: {
    readonly instant: "100ms";
    readonly fast: "200ms";
    readonly base: "300ms";
    readonly slow: "400ms";
    readonly slower: "600ms";
};
export declare const easing: {
    readonly linear: "linear";
    readonly in: "cubic-bezier(0.4, 0, 1, 1)";
    readonly out: "cubic-bezier(0, 0, 0.2, 1)";
    readonly inOut: "cubic-bezier(0.4, 0, 0.2, 1)";
    readonly emphasized: "cubic-bezier(0.4, 0, 0, 1)";
    readonly emphasizedIn: "cubic-bezier(0.4, 0, 0.6, 1)";
    readonly emphasizedOut: "cubic-bezier(0.2, 0, 0, 1)";
    readonly bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
};
export declare const componentMotion: {
    readonly button: {
        readonly hoverDuration: "100ms";
        readonly hoverEasing: "cubic-bezier(0, 0, 0.2, 1)";
    };
    readonly modal: {
        readonly enterDuration: "300ms";
        readonly enterEasing: "cubic-bezier(0, 0, 0.2, 1)";
        readonly exitDuration: "200ms";
        readonly exitEasing: "cubic-bezier(0.4, 0, 1, 1)";
    };
    readonly dropdown: {
        readonly enterDuration: "200ms";
        readonly enterEasing: "cubic-bezier(0, 0, 0.2, 1)";
        readonly exitDuration: "150ms";
        readonly exitEasing: "cubic-bezier(0.4, 0, 1, 1)";
    };
    readonly tooltip: {
        readonly enterDuration: "200ms";
        readonly enterEasing: "cubic-bezier(0, 0, 0.2, 1)";
        readonly enterDelay: "100ms";
        readonly exitDuration: "150ms";
        readonly exitEasing: "cubic-bezier(0.4, 0, 1, 1)";
    };
    readonly toast: {
        readonly enterDuration: "300ms";
        readonly enterEasing: "cubic-bezier(0, 0, 0.2, 1)";
        readonly exitDuration: "200ms";
        readonly exitEasing: "cubic-bezier(0.4, 0, 1, 1)";
        readonly autoDismissDuration: "5000ms";
    };
    readonly drawer: {
        readonly enterDuration: "400ms";
        readonly enterEasing: "cubic-bezier(0, 0, 0.2, 1)";
        readonly exitDuration: "300ms";
        readonly exitEasing: "cubic-bezier(0.4, 0, 1, 1)";
    };
    readonly accordion: {
        readonly expandDuration: "300ms";
        readonly expandEasing: "cubic-bezier(0, 0, 0.2, 1)";
        readonly collapseDuration: "250ms";
        readonly collapseEasing: "cubic-bezier(0.4, 0, 1, 1)";
    };
    readonly tab: {
        readonly switchDuration: "300ms";
        readonly switchEasing: "cubic-bezier(0.4, 0, 0.2, 1)";
    };
    readonly loading: {
        readonly spinnerDuration: "1000ms";
        readonly spinnerEasing: "linear";
        readonly skeletonDuration: "1500ms";
        readonly skeletonEasing: "cubic-bezier(0.4, 0, 0.2, 1)";
    };
};
export declare const iotMotion: {
    readonly dataUpdateDuration: "300ms";
    readonly dataUpdateEasing: "cubic-bezier(0, 0, 0.2, 1)";
    readonly statusChangeDuration: "400ms";
    readonly statusChangeEasing: "cubic-bezier(0, 0, 0.2, 1)";
    readonly liveIndicatorDuration: "2000ms";
    readonly liveIndicatorEasing: "cubic-bezier(0.4, 0, 0.2, 1)";
    readonly connectionLostDuration: "400ms";
    readonly connectionLostEasing: "cubic-bezier(0.4, 0, 0.2, 1)";
    readonly refreshDuration: "600ms";
    readonly refreshEasing: "cubic-bezier(0, 0, 0.2, 1)";
    readonly alertPulseDuration: "1000ms";
    readonly alertPulseEasing: "cubic-bezier(0.4, 0, 0.2, 1)";
    readonly chartAnimationDuration: "1000ms";
    readonly chartAnimationEasing: "cubic-bezier(0, 0, 0.2, 1)";
};
export declare const mobileMotion: {
    readonly transitionFast: "200ms";
    readonly transitionBase: "300ms";
    readonly transitionSlow: "400ms";
    readonly springEasing: "cubic-bezier(0.34, 1.56, 0.64, 1)";
};
declare const _default: {
    readonly duration: {
        readonly instant: "100ms";
        readonly fast: "200ms";
        readonly base: "300ms";
        readonly slow: "400ms";
        readonly slower: "600ms";
    };
    readonly easing: {
        readonly linear: "linear";
        readonly in: "cubic-bezier(0.4, 0, 1, 1)";
        readonly out: "cubic-bezier(0, 0, 0.2, 1)";
        readonly inOut: "cubic-bezier(0.4, 0, 0.2, 1)";
        readonly emphasized: "cubic-bezier(0.4, 0, 0, 1)";
        readonly emphasizedIn: "cubic-bezier(0.4, 0, 0.6, 1)";
        readonly emphasizedOut: "cubic-bezier(0.2, 0, 0, 1)";
        readonly bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    };
    readonly componentMotion: {
        readonly button: {
            readonly hoverDuration: "100ms";
            readonly hoverEasing: "cubic-bezier(0, 0, 0.2, 1)";
        };
        readonly modal: {
            readonly enterDuration: "300ms";
            readonly enterEasing: "cubic-bezier(0, 0, 0.2, 1)";
            readonly exitDuration: "200ms";
            readonly exitEasing: "cubic-bezier(0.4, 0, 1, 1)";
        };
        readonly dropdown: {
            readonly enterDuration: "200ms";
            readonly enterEasing: "cubic-bezier(0, 0, 0.2, 1)";
            readonly exitDuration: "150ms";
            readonly exitEasing: "cubic-bezier(0.4, 0, 1, 1)";
        };
        readonly tooltip: {
            readonly enterDuration: "200ms";
            readonly enterEasing: "cubic-bezier(0, 0, 0.2, 1)";
            readonly enterDelay: "100ms";
            readonly exitDuration: "150ms";
            readonly exitEasing: "cubic-bezier(0.4, 0, 1, 1)";
        };
        readonly toast: {
            readonly enterDuration: "300ms";
            readonly enterEasing: "cubic-bezier(0, 0, 0.2, 1)";
            readonly exitDuration: "200ms";
            readonly exitEasing: "cubic-bezier(0.4, 0, 1, 1)";
            readonly autoDismissDuration: "5000ms";
        };
        readonly drawer: {
            readonly enterDuration: "400ms";
            readonly enterEasing: "cubic-bezier(0, 0, 0.2, 1)";
            readonly exitDuration: "300ms";
            readonly exitEasing: "cubic-bezier(0.4, 0, 1, 1)";
        };
        readonly accordion: {
            readonly expandDuration: "300ms";
            readonly expandEasing: "cubic-bezier(0, 0, 0.2, 1)";
            readonly collapseDuration: "250ms";
            readonly collapseEasing: "cubic-bezier(0.4, 0, 1, 1)";
        };
        readonly tab: {
            readonly switchDuration: "300ms";
            readonly switchEasing: "cubic-bezier(0.4, 0, 0.2, 1)";
        };
        readonly loading: {
            readonly spinnerDuration: "1000ms";
            readonly spinnerEasing: "linear";
            readonly skeletonDuration: "1500ms";
            readonly skeletonEasing: "cubic-bezier(0.4, 0, 0.2, 1)";
        };
    };
    readonly iotMotion: {
        readonly dataUpdateDuration: "300ms";
        readonly dataUpdateEasing: "cubic-bezier(0, 0, 0.2, 1)";
        readonly statusChangeDuration: "400ms";
        readonly statusChangeEasing: "cubic-bezier(0, 0, 0.2, 1)";
        readonly liveIndicatorDuration: "2000ms";
        readonly liveIndicatorEasing: "cubic-bezier(0.4, 0, 0.2, 1)";
        readonly connectionLostDuration: "400ms";
        readonly connectionLostEasing: "cubic-bezier(0.4, 0, 0.2, 1)";
        readonly refreshDuration: "600ms";
        readonly refreshEasing: "cubic-bezier(0, 0, 0.2, 1)";
        readonly alertPulseDuration: "1000ms";
        readonly alertPulseEasing: "cubic-bezier(0.4, 0, 0.2, 1)";
        readonly chartAnimationDuration: "1000ms";
        readonly chartAnimationEasing: "cubic-bezier(0, 0, 0.2, 1)";
    };
    readonly mobileMotion: {
        readonly transitionFast: "200ms";
        readonly transitionBase: "300ms";
        readonly transitionSlow: "400ms";
        readonly springEasing: "cubic-bezier(0.34, 1.56, 0.64, 1)";
    };
};
export default _default;
