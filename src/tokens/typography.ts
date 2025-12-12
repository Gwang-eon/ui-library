/**
 * IoT Platform Design System - Typography Tokens
 * Converted from design-tokens.css
 *
 * Contains:
 * - Font families (Pretendard, D2Coding)
 * - Font weights
 * - Font sizes (Display, Heading, Body, Label, Code)
 * - Line heights
 * - Letter spacing
 * - Composite typography tokens
 * - Mobile typography
 */

// ========================================
// FONT FAMILIES
// ========================================

export const fontFamily = {
  sans: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
  mono: "'D2Coding', 'D2 Coding', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
} as const;

// ========================================
// FONT WEIGHTS
// ========================================

export const fontWeight = {
  thin: 100,
  extralight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

// ========================================
// FONT SIZES
// ========================================

export const fontSize = {
  // Display
  display: {
    large: '57px',
    medium: '45px',
    small: '36px',
  },

  // Heading
  heading: {
    1: '32px',
    2: '28px',
    3: '24px',
    4: '20px',
    5: '18px',
    6: '16px',
  },

  // Body
  body: {
    large: '16px',
    medium: '14px',
    small: '12px',
  },

  // Label
  label: {
    large: '14px',
    medium: '12px',
    small: '11px',
  },

  // Caption & Overline
  caption: '12px',
  overline: '12px',

  // Code
  code: {
    large: '14px',
    medium: '13px',
    small: '12px',
  },
} as const;

// ========================================
// LINE HEIGHTS
// ========================================

export const lineHeight = {
  // Display
  display: {
    large: '64px',
    medium: '52px',
    small: '44px',
  },

  // Heading
  heading: {
    1: '40px',
    2: '36px',
    3: '32px',
    4: '28px',
    5: '24px',
    6: '24px',
  },

  // Body
  body: {
    large: '24px',
    medium: '20px',
    small: '16px',
  },

  // Label
  label: {
    large: '20px',
    medium: '16px',
    small: '16px',
  },

  // Caption & Overline
  caption: '16px',
  overline: '16px',

  // Code
  code: {
    large: '20px',
    medium: '18px',
    small: '16px',
  },
} as const;

// ========================================
// LETTER SPACING
// ========================================

export const letterSpacing = {
  tight: '-0.25px',
  normal: '0px',
  wide: '0.1px',
  wider: '0.5px',
  widest: '1.5px',
} as const;

// ========================================
// COMPOSITE TYPOGRAPHY TOKENS
// ========================================

export const typography = {
  // Display
  display: {
    large: {
      fontSize: fontSize.display.large,
      lineHeight: lineHeight.display.large,
      fontWeight: fontWeight.bold,
      letterSpacing: letterSpacing.tight,
    },
    medium: {
      fontSize: fontSize.display.medium,
      lineHeight: lineHeight.display.medium,
      fontWeight: fontWeight.bold,
      letterSpacing: letterSpacing.normal,
    },
    small: {
      fontSize: fontSize.display.small,
      lineHeight: lineHeight.display.small,
      fontWeight: fontWeight.bold,
      letterSpacing: letterSpacing.normal,
    },
  },

  // Heading
  heading: {
    1: {
      fontSize: fontSize.heading[1],
      lineHeight: lineHeight.heading[1],
      fontWeight: fontWeight.bold,
      letterSpacing: letterSpacing.normal,
    },
    2: {
      fontSize: fontSize.heading[2],
      lineHeight: lineHeight.heading[2],
      fontWeight: fontWeight.semibold,
      letterSpacing: letterSpacing.normal,
    },
    3: {
      fontSize: fontSize.heading[3],
      lineHeight: lineHeight.heading[3],
      fontWeight: fontWeight.semibold,
      letterSpacing: letterSpacing.normal,
    },
    4: {
      fontSize: fontSize.heading[4],
      lineHeight: lineHeight.heading[4],
      fontWeight: fontWeight.semibold,
      letterSpacing: letterSpacing.normal,
    },
    5: {
      fontSize: fontSize.heading[5],
      lineHeight: lineHeight.heading[5],
      fontWeight: fontWeight.semibold,
      letterSpacing: letterSpacing.normal,
    },
    6: {
      fontSize: fontSize.heading[6],
      lineHeight: lineHeight.heading[6],
      fontWeight: fontWeight.semibold,
      letterSpacing: letterSpacing.normal,
    },
  },

  // Body
  body: {
    large: {
      fontSize: fontSize.body.large,
      lineHeight: lineHeight.body.large,
      fontWeight: fontWeight.regular,
      letterSpacing: letterSpacing.normal,
    },
    medium: {
      fontSize: fontSize.body.medium,
      lineHeight: lineHeight.body.medium,
      fontWeight: fontWeight.regular,
      letterSpacing: letterSpacing.normal,
    },
    small: {
      fontSize: fontSize.body.small,
      lineHeight: lineHeight.body.small,
      fontWeight: fontWeight.regular,
      letterSpacing: letterSpacing.normal,
    },
  },

  // Label
  label: {
    large: {
      fontSize: fontSize.label.large,
      lineHeight: lineHeight.label.large,
      fontWeight: fontWeight.medium,
      letterSpacing: letterSpacing.normal,
    },
    medium: {
      fontSize: fontSize.label.medium,
      lineHeight: lineHeight.label.medium,
      fontWeight: fontWeight.medium,
      letterSpacing: letterSpacing.normal,
    },
    small: {
      fontSize: fontSize.label.small,
      lineHeight: lineHeight.label.small,
      fontWeight: fontWeight.medium,
      letterSpacing: letterSpacing.normal,
    },
  },

  // Caption
  caption: {
    fontSize: fontSize.caption,
    lineHeight: lineHeight.caption,
    fontWeight: fontWeight.regular,
    letterSpacing: letterSpacing.normal,
  },

  // Overline
  overline: {
    fontSize: fontSize.overline,
    lineHeight: lineHeight.overline,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.widest,
  },

  // Code
  code: {
    large: {
      fontSize: fontSize.code.large,
      lineHeight: lineHeight.code.large,
      fontWeight: fontWeight.regular,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamily.mono,
    },
    medium: {
      fontSize: fontSize.code.medium,
      lineHeight: lineHeight.code.medium,
      fontWeight: fontWeight.regular,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamily.mono,
    },
    small: {
      fontSize: fontSize.code.small,
      lineHeight: lineHeight.code.small,
      fontWeight: fontWeight.regular,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamily.mono,
    },
  },
} as const;

// ========================================
// MOBILE TYPOGRAPHY
// ========================================

export const mobileTypography = {
  // Font Sizes (optimized for readability)
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
  },

  // Line Heights (optimized for readability)
  lineHeight: {
    tight: 1.3,
    normal: 1.5,
    relaxed: 1.625,
  },
} as const;

// ========================================
// EXPORTS
// ========================================

export default {
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
  typography,
  mobileTypography,
} as const;
