/**
 * IoT Platform Design System - Design Tokens
 * Entry point for all design tokens
 *
 * Usage:
 * ```tsx
 * import { colors, spacing, typography, motion, shadows } from '@/tokens';
 *
 * // Use palette colors
 * const primaryColor = colors.palette.blue[500];
 *
 * // Use semantic colors
 * const buttonBg = colors.component.button.primary.bg;
 *
 * // Use spacing
 * const padding = spacing.spacing[4]; // '16px'
 *
 * // Use typography
 * const heading1 = typography.typography.heading[1];
 *
 * // Use motion
 * const modalTransition = motion.componentMotion.modal;
 *
 * // Use shadows
 * const cardShadow = shadows.md;
 * ```
 */

// ========================================
// EXPORTS
// ========================================

export { default as colors, palette, semantic, component, darkMode, darkThemes } from './colors';
export { default as spacing, componentSpacing, grid, breakpoints, mobileSpacing, mobile, radius, zIndex } from './spacing';
export { default as typography, fontFamily, fontWeight, fontSize, lineHeight, letterSpacing, mobileTypography } from './typography';
export { default as motion, duration, easing, componentMotion, iotMotion, mobileMotion } from './motion';
export { default as shadows, lightShadows, darkShadows, componentShadows } from './shadows';

// ========================================
// DEFAULT EXPORT - ALL TOKENS
// ========================================

import colors from './colors';
import spacing from './spacing';
import typography from './typography';
import motion from './motion';
import shadows from './shadows';

export const tokens = {
  colors,
  spacing,
  typography,
  motion,
  shadows,
} as const;

export default tokens;
