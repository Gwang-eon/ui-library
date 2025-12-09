/**
 * IoT Platform Design System - Spacing Tokens
 * Converted from design-tokens.css
 *
 * Contains:
 * - Base spacing scale (8px grid system)
 * - Component-specific spacing
 * - Grid system
 * - Breakpoints
 * - Mobile spacing
 */

// ========================================
// SPACING SCALE (8px Base)
// ========================================

export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
} as const;

// ========================================
// COMPONENT SPACING
// ========================================

export const componentSpacing = {
  // Button
  button: {
    paddingY: spacing[2],      // 8px
    paddingX: spacing[4],      // 16px
    gap: spacing[2],           // 8px (icon + text)
  },

  // Input
  input: {
    paddingY: spacing[3],      // 12px
    paddingX: spacing[4],      // 16px
  },

  // Card
  card: {
    padding: spacing[6],       // 24px
    gap: spacing[4],           // 16px
  },

  // Modal
  modal: {
    padding: spacing[6],       // 24px
    header: {
      paddingY: spacing[4],    // 16px
      paddingX: spacing[6],    // 24px
    },
    footer: {
      paddingY: spacing[4],    // 16px
      paddingX: spacing[6],    // 24px
    },
  },

  // Table
  table: {
    cell: {
      paddingY: spacing[3],    // 12px
      paddingX: spacing[4],    // 16px
    },
    header: {
      paddingY: spacing[4],    // 16px
      paddingX: spacing[4],    // 16px
    },
  },

  // List
  list: {
    item: {
      paddingY: spacing[3],    // 12px
      paddingX: spacing[4],    // 16px
    },
    gap: spacing[2],           // 8px
  },
} as const;

// ========================================
// GRID SYSTEM
// ========================================

export const grid = {
  // Desktop Grid (12 columns)
  desktop: {
    columns: 12,
    gutter: '24px',
    margin: '48px',
    maxWidth: '1184px',
  },

  // Wide Desktop Grid (12 columns, for dashboards & monitoring)
  wideDesktop: {
    columns: 12,
    gutter: '24px',
    margin: '48px',
    maxWidth: '1920px',
  },

  // Tablet Grid (8 columns)
  tablet: {
    columns: 8,
    gutter: '24px',
    margin: '32px',
    maxWidth: '100%',
  },

  // Mobile Grid (4 columns)
  mobile: {
    columns: 4,
    gutter: '16px',
    margin: '16px',
    maxWidth: '100%',
  },
} as const;

// ========================================
// BREAKPOINTS
// ========================================

export const breakpoints = {
  mobile: '0px',
  tablet: '768px',
  desktop: '1280px',
  wide: '1920px',
} as const;

// ========================================
// MOBILE SPACING
// ========================================

export const mobileSpacing = {
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
} as const;

// ========================================
// MOBILE DESIGN TOKENS
// ========================================

export const mobile = {
  // Touch Target Sizes (WCAG 2.5.5 - 44x44px minimum)
  touchTargetMin: '44px',
  buttonHeight: '48px',
  inputHeight: '48px',
  navHeight: '56px',
  tabHeight: '48px',

  // Safe Area Insets (iOS notch/Dynamic Island support)
  safeArea: {
    top: 'env(safe-area-inset-top)',
    bottom: 'env(safe-area-inset-bottom)',
    left: 'env(safe-area-inset-left)',
    right: 'env(safe-area-inset-right)',
  },

  // Mobile Gestures
  gestures: {
    swipeThreshold: '60px',
    swipeVelocity: 0.3,
    pullDistance: '80px',
    longPressDuration: '500ms',
  },

  // Bottom Sheet
  bottomSheet: {
    peekHeight: '80px',
    halfHeight: '50vh',
    fullHeight: '90vh',
    dragIndicatorWidth: '40px',
    dragIndicatorHeight: '4px',
    borderRadius: '16px',
    backdropBlur: '4px',
  },

  // FAB (Floating Action Button)
  fab: {
    sizeStandard: '56px',
    sizeMini: '40px',
    sizeExtendedHeight: '48px',
    borderRadius: '50%',
    extendedBorderRadius: '24px',
    offset: '16px',
    offsetWithNav: '72px',
  },

  // Mobile Navigation Bar
  nav: {
    itemSize: '56px',
    iconSize: '24px',
    labelSize: '12px',
  },

  // Swipe Actions
  swipeAction: {
    width: '80px',
    iconSize: '24px',
  },

  // Action Sheet
  actionSheet: {
    itemHeight: '56px',
    borderRadius: '16px',
    backdropBlur: '8px',
    maxHeight: '80vh',
  },

  // Pull-to-Refresh
  pullToRefresh: {
    height: '60px',
    spinnerSize: '24px',
    threshold: '80px',
  },

  // Mobile Modal/Dialog
  modal: {
    maxWidth: 'calc(100vw - 32px)',
    maxHeight: 'calc(100vh - 64px)',
    borderRadius: '12px',
  },

  // Mobile Card
  card: {
    padding: '16px',
    gap: '12px',
    borderRadius: '8px',
  },

  // Mobile Input/Form
  input: {
    paddingY: '14px',
    paddingX: '16px',
    borderRadius: '8px',
    fontSize: '16px', // Prevents iOS zoom on focus
  },

  // Mobile Table
  table: {
    cellPadding: '12px',
    rowHeight: '56px',
  },
} as const;

// ========================================
// BORDER RADIUS
// ========================================

export const radius = {
  sm: '2px',
  base: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  full: '9999px',
} as const;

// ========================================
// Z-INDEX
// ========================================

export const zIndex = {
  base: 1,
  raised: 10,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  drawer: 1300,
  modalBackdrop: 1400,
  modal: 1410,
  popover: 1500,
  toast: 1600,
  tooltip: 1700,
  max: 9999,
} as const;

// ========================================
// EXPORTS
// ========================================

export default {
  spacing,
  componentSpacing,
  grid,
  breakpoints,
  mobileSpacing,
  mobile,
  radius,
  zIndex,
} as const;
