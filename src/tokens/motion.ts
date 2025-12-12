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

// ========================================
// DURATION
// ========================================

export const duration = {
  instant: '100ms',   // Hover, Focus
  fast: '200ms',      // Button, Toggle
  base: '300ms',      // Modal, Dropdown (Default)
  slow: '400ms',      // Drawer, Complex
  slower: '600ms',    // Page transition
} as const;

// ========================================
// EASING FUNCTIONS
// ========================================

export const easing = {
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',              // Most common
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  emphasized: 'cubic-bezier(0.4, 0, 0, 1)',
  emphasizedIn: 'cubic-bezier(0.4, 0, 0.6, 1)',
  emphasizedOut: 'cubic-bezier(0.2, 0, 0, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

// ========================================
// COMPONENT MOTION TOKENS
// ========================================

export const componentMotion = {
  // Button
  button: {
    hoverDuration: duration.instant,
    hoverEasing: easing.out,
  },

  // Modal
  modal: {
    enterDuration: duration.base,
    enterEasing: easing.out,
    exitDuration: duration.fast,
    exitEasing: easing.in,
  },

  // Dropdown
  dropdown: {
    enterDuration: duration.fast,
    enterEasing: easing.out,
    exitDuration: '150ms',
    exitEasing: easing.in,
  },

  // Tooltip
  tooltip: {
    enterDuration: duration.fast,
    enterEasing: easing.out,
    enterDelay: '100ms',
    exitDuration: '150ms',
    exitEasing: easing.in,
  },

  // Toast
  toast: {
    enterDuration: duration.base,
    enterEasing: easing.out,
    exitDuration: duration.fast,
    exitEasing: easing.in,
    autoDismissDuration: '5000ms',
  },

  // Drawer
  drawer: {
    enterDuration: duration.slow,
    enterEasing: easing.out,
    exitDuration: duration.base,
    exitEasing: easing.in,
  },

  // Accordion
  accordion: {
    expandDuration: duration.base,
    expandEasing: easing.out,
    collapseDuration: '250ms',
    collapseEasing: easing.in,
  },

  // Tab
  tab: {
    switchDuration: duration.base,
    switchEasing: easing.inOut,
  },

  // Loading
  loading: {
    spinnerDuration: '1000ms',
    spinnerEasing: easing.linear,
    skeletonDuration: '1500ms',
    skeletonEasing: easing.inOut,
  },
} as const;

// ========================================
// IOT PLATFORM MOTION TOKENS
// ========================================

export const iotMotion = {
  dataUpdateDuration: duration.base,
  dataUpdateEasing: easing.out,
  statusChangeDuration: duration.slow,
  statusChangeEasing: easing.out,
  liveIndicatorDuration: '2000ms',
  liveIndicatorEasing: easing.inOut,
  connectionLostDuration: duration.slow,
  connectionLostEasing: easing.inOut,
  refreshDuration: duration.slower,
  refreshEasing: easing.out,
  alertPulseDuration: '1000ms',
  alertPulseEasing: easing.inOut,
  chartAnimationDuration: '1000ms',
  chartAnimationEasing: easing.out,
} as const;

// ========================================
// MOBILE ANIMATION TOKENS
// ========================================

export const mobileMotion = {
  // Mobile Animation (optimized for 60fps)
  transitionFast: '200ms',
  transitionBase: '300ms',
  transitionSlow: '400ms',
  springEasing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

// ========================================
// EXPORTS
// ========================================

export default {
  duration,
  easing,
  componentMotion,
  iotMotion,
  mobileMotion,
} as const;
