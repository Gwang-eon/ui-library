/**
 * IoT Platform Design System - Shadow Tokens
 * Converted from design-tokens.css
 *
 * Contains:
 * - Light mode shadows
 * - Dark mode shadows
 * - Component-specific shadows
 */

// ========================================
// LIGHT MODE SHADOWS
// ========================================

export const lightShadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -2px rgba(0, 0, 0, 0.15)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -4px rgba(0, 0, 0, 0.15)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
} as const;

// ========================================
// DARK MODE SHADOWS
// ========================================

export const darkShadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.5)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -4px rgba(0, 0, 0, 0.5)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 8px 10px -6px rgba(0, 0, 0, 0.6)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
} as const;

// ========================================
// COMPONENT SHADOWS
// ========================================

export const componentShadows = {
  // FAB (Floating Action Button)
  fab: {
    base: '0 6px 20px rgba(0, 0, 0, 0.15)',
    hover: '0 8px 24px rgba(0, 0, 0, 0.2)',
    elevation: '0 6px 20px rgba(0, 0, 0, 0.15)',
    elevationHover: '0 8px 24px rgba(0, 0, 0, 0.2)',
  },

  // Mobile Navigation Bar
  mobileNav: {
    elevation: '0 -2px 8px rgba(0, 0, 0, 0.1)',
  },
} as const;

// ========================================
// DEFAULT EXPORT (Light Mode)
// ========================================

export const shadows = lightShadows;

// ========================================
// ALL EXPORTS
// ========================================

export default {
  light: lightShadows,
  dark: darkShadows,
  component: componentShadows,
  // Default to light mode
  ...lightShadows,
} as const;
