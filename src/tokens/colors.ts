/**
 * IoT Platform Design System - Color Tokens
 * Converted from design-tokens.css
 *
 * Contains:
 * - 240+ palette colors (11 hues × 11 shades)
 * - Semantic colors (primary, secondary, success, error, warning, info)
 * - Component-specific colors (button, input, table, etc.)
 * - Dark mode variants
 */

// ========================================
// PALETTE COLORS (240 colors)
// ========================================

export const palette = {
  // Blue
  blue: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3',
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
    950: '#082F66',
  },

  // Green
  green: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50',
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20',
    950: '#0D3C14',
  },

  // Red
  red: {
    50: '#FFEBEE',
    100: '#FFCDD2',
    200: '#EF9A9A',
    300: '#E57373',
    400: '#EF5350',
    500: '#F44336',
    600: '#E53935',
    700: '#D32F2F',
    800: '#C62828',
    900: '#B71C1C',
    950: '#7F1212',
  },

  // Orange
  orange: {
    50: '#FFF3E0',
    100: '#FFE0B2',
    200: '#FFCC80',
    300: '#FFB74D',
    400: '#FFA726',
    500: '#FF9800',
    600: '#FB8C00',
    700: '#F57C00',
    800: '#EF6C00',
    900: '#E65100',
    950: '#A13900',
  },

  // Light Blue
  lightBlue: {
    50: '#E1F5FE',
    100: '#B3E5FC',
    200: '#81D4FA',
    300: '#4FC3F7',
    400: '#29B6F6',
    500: '#03A9F4',
    600: '#039BE5',
    700: '#0288D1',
    800: '#0277BD',
    900: '#01579B',
    950: '#013A66',
  },

  // Purple (Secondary)
  purple: {
    50: '#F3E5F5',
    100: '#E1BEE7',
    200: '#CE93D8',
    300: '#BA68C8',
    400: '#AB47BC',
    500: '#9C27B0',
    600: '#8E24AA',
    700: '#7B1FA2',
    800: '#6A1B9A',
    900: '#4A148C',
    950: '#2E0C57',
  },

  // Teal (Alternative Secondary)
  teal: {
    50: '#E0F2F1',
    100: '#B2DFDB',
    200: '#80CBC4',
    300: '#4DB6AC',
    400: '#26A69A',
    500: '#009688',
    600: '#00897B',
    700: '#00796B',
    800: '#00695C',
    900: '#004D40',
    950: '#00332A',
  },

  // Grey (Neutral)
  grey: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    750: '#4A4A4A',
    800: '#424242',
    850: '#333333',
    900: '#212121',
  },

  // Warm Grey (Stone) - Yellow/Red undertone
  warmGrey: {
    50: '#FAFAF9',
    100: '#F5F5F4',
    200: '#E7E5E4',
    300: '#D6D3D1',
    400: '#A8A29E',
    500: '#78716C',
    600: '#57534E',
    700: '#44403C',
    750: '#38342F',
    800: '#292524',
    850: '#1F1D1C',
    900: '#1C1917',
  },

  // Cool Grey (Slate) - Blue undertone
  coolGrey: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    750: '#293548',
    800: '#1E293B',
    850: '#15202E',
    900: '#0F172A',
  },

  // Dark Blue (Slate/Navy) - For Dark Blue Theme
  darkBlue: {
    50: '#E8EDF2',
    100: '#C5D3E0',
    200: '#9FB7CC',
    300: '#789AB8',
    400: '#5B84A8',
    500: '#3E6E99',
    600: '#386691',
    700: '#2F5B86',
    800: '#27507C',
    900: '#1A3D6B',
    950: '#0D1F35',
  },

  // Dark Green (Forest/Emerald) - For Dark Green Theme
  darkGreen: {
    50: '#E7F5F0',
    100: '#C3E6D9',
    200: '#9BD6C0',
    300: '#73C5A6',
    400: '#55B993',
    500: '#37AC80',
    600: '#319F78',
    700: '#2A906D',
    800: '#238163',
    900: '#166450',
    950: '#0B3228',
  },

  // Dark Violet (Deep Purple) - For Dark Violet Theme
  darkViolet: {
    50: '#EEE8F5',
    100: '#D4C6E6',
    200: '#B8A0D6',
    300: '#9C7AC5',
    400: '#875EB8',
    500: '#7242AB',
    600: '#6A3CA4',
    700: '#5F339A',
    800: '#552B91',
    900: '#421D80',
    950: '#210F40',
  },

  // Dark Brown (Sepia/Chocolate) - For Dark Brown Theme
  darkBrown: {
    50: '#F2EDE8',
    100: '#DFD2C5',
    200: '#CAB49F',
    300: '#B59678',
    400: '#A57F5B',
    500: '#96693E',
    600: '#8E6138',
    700: '#835630',
    800: '#794C28',
    900: '#68391B',
    950: '#341D0E',
  },

  // Base Colors
  white: '#FFFFFF',
  black: '#000000',
} as const;

// ========================================
// SEMANTIC COLORS
// ========================================

export const semantic = {
  // Primary (Blue)
  primary: {
    50: palette.blue[50],
    100: palette.blue[100],
    200: palette.blue[200],
    300: palette.blue[300],
    400: palette.blue[400],
    500: palette.blue[500],
    600: palette.blue[600],
    700: palette.blue[700],
    800: palette.blue[800],
    900: palette.blue[900],
    950: palette.blue[950],
  },

  // Secondary (Teal)
  secondary: {
    50: palette.teal[50],
    100: palette.teal[100],
    200: palette.teal[200],
    300: palette.teal[300],
    400: palette.teal[400],
    500: palette.teal[500],
    600: palette.teal[600],
    700: palette.teal[700],
    800: palette.teal[800],
    900: palette.teal[900],
    950: palette.teal[950],
  },

  // Success (Green)
  success: {
    50: palette.green[50],
    100: palette.green[100],
    200: palette.green[200],
    300: palette.green[300],
    400: palette.green[400],
    500: palette.green[500],
    600: palette.green[600],
    700: palette.green[700],
    800: palette.green[800],
    900: palette.green[900],
    950: palette.green[950],
  },

  // Error (Red)
  error: {
    50: palette.red[50],
    100: palette.red[100],
    200: palette.red[200],
    300: palette.red[300],
    400: palette.red[400],
    500: palette.red[500],
    600: palette.red[600],
    700: palette.red[700],
    800: palette.red[800],
    900: palette.red[900],
    950: palette.red[950],
  },

  // Warning (Orange)
  warning: {
    50: palette.orange[50],
    100: palette.orange[100],
    200: palette.orange[200],
    300: palette.orange[300],
    400: palette.orange[400],
    500: palette.orange[500],
    600: palette.orange[600],
    700: palette.orange[700],
    800: palette.orange[800],
    900: palette.orange[900],
    950: palette.orange[950],
  },

  // Info (Light Blue)
  info: {
    50: palette.lightBlue[50],
    100: palette.lightBlue[100],
    200: palette.lightBlue[200],
    300: palette.lightBlue[300],
    400: palette.lightBlue[400],
    500: palette.lightBlue[500],
    600: palette.lightBlue[600],
    700: palette.lightBlue[700],
    800: palette.lightBlue[800],
    900: palette.lightBlue[900],
    950: palette.lightBlue[950],
  },

  // Gray (Neutral)
  gray: {
    50: palette.grey[50],
    100: palette.grey[100],
    200: palette.grey[200],
    300: palette.grey[300],
    400: palette.grey[400],
    500: palette.grey[500],
    600: palette.grey[600],
    700: palette.grey[700],
    800: palette.grey[800],
    900: palette.grey[900],
  },

  // Warm Gray (Stone)
  warmGray: {
    50: palette.warmGrey[50],
    100: palette.warmGrey[100],
    200: palette.warmGrey[200],
    300: palette.warmGrey[300],
    400: palette.warmGrey[400],
    500: palette.warmGrey[500],
    600: palette.warmGrey[600],
    700: palette.warmGrey[700],
    800: palette.warmGrey[800],
    900: palette.warmGrey[900],
  },

  // Cool Gray (Slate)
  coolGray: {
    50: palette.coolGrey[50],
    100: palette.coolGrey[100],
    200: palette.coolGrey[200],
    300: palette.coolGrey[300],
    400: palette.coolGrey[400],
    500: palette.coolGrey[500],
    600: palette.coolGrey[600],
    700: palette.coolGrey[700],
    800: palette.coolGrey[800],
    900: palette.coolGrey[900],
  },
} as const;

// ========================================
// COMPONENT COLORS
// ========================================

export const component = {
  // Button
  button: {
    primary: {
      bg: semantic.primary[500],
      bgHover: semantic.primary[600],
      bgActive: semantic.primary[700],
      text: palette.white,
    },
    secondary: {
      bg: 'transparent',
      border: semantic.primary[500],
      text: semantic.primary[500],
      textHover: semantic.primary[600],
    },
    danger: {
      bg: semantic.error[500],
      bgHover: semantic.error[600],
      text: palette.white,
    },
    success: {
      bg: semantic.success[500],
      bgHover: semantic.success[600],
      text: palette.white,
    },
    warning: {
      bg: semantic.warning[500],
      bgHover: semantic.warning[600],
      text: palette.white,
    },
    info: {
      bg: semantic.info[500],
      bgHover: semantic.info[600],
      text: palette.white,
    },
  },

  // Input
  input: {
    bg: palette.white,
    border: semantic.gray[400],
    borderHover: semantic.gray[500],
    borderFocus: semantic.primary[500],
    text: semantic.gray[900],
    placeholder: semantic.gray[500],
    disabled: {
      bg: semantic.gray[100],
      border: semantic.gray[200],
      text: semantic.gray[400],
    },
    readonly: {
      bg: semantic.gray[50],
      border: semantic.gray[300],
      text: semantic.gray[700],
    },
    success: {
      border: semantic.success[500],
    },
    warning: {
      border: semantic.warning[500],
    },
    error: {
      border: semantic.error[500],
    },
    info: {
      border: semantic.info[500],
    },
  },

  // Table
  table: {
    header: {
      bg: semantic.gray[50],
      text: semantic.gray[900],
    },
    row: {
      bg: palette.white,
      bgHover: semantic.gray[50],
      bgSelected: semantic.primary[50],
      bgStripe: semantic.gray[50],
      bgSum: semantic.warmGray[100],
      textSum: semantic.warmGray[900],
      bgSubSum: semantic.coolGray[100],
      textSubSum: semantic.coolGray[900],
    },
    cell: {
      border: semantic.gray[200],
    },
    footer: {
      bg: semantic.gray[50],
    },
  },

  // Text
  text: {
    primary: semantic.gray[900],
    secondary: semantic.gray[700],
    tertiary: semantic.gray[600],
    disabled: semantic.gray[400],
    inverse: palette.white,
    link: semantic.primary[600],
    linkHover: semantic.primary[700],
  },

  // Surface
  surface: {
    primary: palette.white,
    secondary: semantic.gray[50],
    tertiary: semantic.gray[100],
  },

  // Border
  border: {
    default: semantic.gray[300],
    subtle: semantic.gray[200],
    strong: semantic.gray[400],
  },

  // Status Colors
  status: {
    online: semantic.success[500],
    offline: semantic.gray[500],
    error: semantic.error[500],
    warning: semantic.warning[500],
    syncing: semantic.primary[500],
  },
} as const;

// ========================================
// DARK MODE COLORS
// ========================================

export const darkMode = {
  // Button - Dark Mode
  button: {
    primary: {
      bg: semantic.primary[600],
      bgHover: semantic.primary[500],
      bgActive: semantic.primary[400],
      text: palette.white,
    },
    secondary: {
      bg: 'transparent',
      border: semantic.primary[400],
      text: semantic.primary[400],
      textHover: semantic.primary[300],
    },
    danger: {
      bg: semantic.error[600],
      bgHover: semantic.error[500],
      text: palette.white,
    },
    success: {
      bg: semantic.success[600],
      bgHover: semantic.success[500],
      text: palette.white,
    },
    warning: {
      bg: semantic.warning[600],
      bgHover: semantic.warning[500],
      text: palette.white,
    },
    info: {
      bg: semantic.info[600],
      bgHover: semantic.info[500],
      text: palette.white,
    },
  },

  // Input - Dark Mode
  input: {
    bg: palette.grey[800],
    border: palette.grey[700],
    borderHover: palette.grey[600],
    borderFocus: semantic.primary[400],
    text: palette.grey[100],
    placeholder: palette.grey[500],
    disabled: {
      bg: palette.grey[900],
      border: palette.grey[800],
      text: palette.grey[600],
    },
    readonly: {
      bg: palette.grey[850],
      border: palette.grey[700],
      text: palette.grey[300],
    },
    success: {
      border: semantic.success[400],
    },
    warning: {
      border: semantic.warning[400],
    },
    error: {
      border: semantic.error[400],
    },
    info: {
      border: semantic.info[400],
    },
  },

  // Table - Dark Mode
  table: {
    header: {
      bg: palette.grey[850],
      text: palette.grey[100],
    },
    row: {
      bg: palette.grey[900],
      bgHover: palette.grey[800],
      bgSelected: semantic.primary[950],
      bgStripe: palette.grey[850],
      bgSum: palette.warmGrey[800],
      textSum: palette.warmGrey[100],
      bgSubSum: palette.coolGrey[800],
      textSubSum: palette.coolGrey[100],
    },
    cell: {
      border: palette.grey[700],
    },
    footer: {
      bg: palette.grey[850],
    },
  },

  // Text - Dark Mode (WCAG AA compliant)
  text: {
    primary: palette.grey[100],     // 17.54:1 - Excellent
    secondary: palette.grey[400],   // 4.36:1 - AA Pass
    tertiary: palette.grey[500],    // 3.04:1 - Large text only
    disabled: palette.grey[500],    // 3.04:1 - Improved
    inverse: palette.grey[900],
    link: semantic.primary[400],    // 7.12:1 - Excellent
    linkHover: semantic.primary[300],
  },

  // Surface - Dark Mode (5-layer system)
  surface: {
    secondary: palette.grey[900],   // Page background (body)
    primary: palette.grey[850],     // Card, Modal (elevated)
    tertiary: palette.grey[800],    // Section (nested)
    quaternary: palette.grey[750],  // Widget background
    quinary: palette.grey[700],     // Sub-component, top layer
  },

  // Border - Dark Mode (WCAG AA: 3:1+ contrast)
  border: {
    default: palette.grey[500],  // 3.04:1 - WCAG AA Pass
    subtle: palette.grey[700],   // Subtle borders
    strong: palette.grey[400],   // 4.36:1 - Strong emphasis
  },

  // Status Colors - Dark Mode (lighter variants)
  status: {
    online: semantic.success[400],
    offline: palette.grey[500],
    error: semantic.error[400],
    warning: semantic.warning[400],
    syncing: semantic.primary[400],
  },
} as const;

// ========================================
// DARK THEME VARIANTS
// ========================================

export const darkThemes = {
  // Dark Blue Theme
  darkBlue: {
    text: {
      primary: palette.darkBlue[100],
      secondary: palette.darkBlue[300],
      tertiary: palette.darkBlue[400],
      disabled: palette.darkBlue[500],
      link: semantic.primary[400],
      linkHover: semantic.primary[300],
    },
    surface: {
      secondary: palette.darkBlue[950],   // Page background
      primary: palette.darkBlue[900],     // Card, Modal
      tertiary: palette.darkBlue[800],    // Section
      quaternary: palette.darkBlue[700],  // Widget background
      quinary: palette.darkBlue[600],     // Sub-component
    },
    border: {
      default: palette.darkBlue[400],  // 3.24:1 - WCAG AA Pass
      subtle: palette.darkBlue[600],
      strong: palette.darkBlue[300],
    },
  },

  // Dark Green Theme
  darkGreen: {
    text: {
      primary: palette.darkGreen[100],
      secondary: palette.darkGreen[300],
      tertiary: palette.darkGreen[400],
      disabled: palette.darkGreen[500],
      link: semantic.success[400],
      linkHover: semantic.success[300],
    },
    surface: {
      secondary: palette.darkGreen[950],
      primary: palette.darkGreen[900],
      tertiary: palette.darkGreen[800],
      quaternary: palette.darkGreen[700],
      quinary: palette.darkGreen[600],
    },
    border: {
      default: palette.darkGreen[400],
      subtle: palette.darkGreen[600],
      strong: palette.darkGreen[300],
    },
  },

  // Dark Violet Theme
  darkViolet: {
    text: {
      primary: palette.darkViolet[100],
      secondary: palette.darkViolet[300],
      tertiary: palette.darkViolet[400],
      disabled: palette.darkViolet[500],
      link: palette.purple[400],
      linkHover: palette.purple[300],
    },
    surface: {
      secondary: palette.darkViolet[950],
      primary: palette.darkViolet[900],
      tertiary: palette.darkViolet[800],
      quaternary: palette.darkViolet[700],
      quinary: palette.darkViolet[600],
    },
    border: {
      default: palette.darkViolet[400],
      subtle: palette.darkViolet[600],
      strong: palette.darkViolet[300],
    },
  },

  // Dark Brown Theme
  darkBrown: {
    text: {
      primary: palette.darkBrown[100],
      secondary: palette.darkBrown[300],
      tertiary: palette.darkBrown[400],
      disabled: palette.darkBrown[500],
      link: palette.orange[400],
      linkHover: palette.orange[300],
    },
    surface: {
      secondary: palette.darkBrown[950],
      primary: palette.darkBrown[900],
      tertiary: palette.darkBrown[800],
      quaternary: palette.darkBrown[700],
      quinary: palette.darkBrown[600],
    },
    border: {
      default: palette.darkBrown[400],
      subtle: palette.darkBrown[600],
      strong: palette.darkBrown[300],
    },
  },
} as const;

// ========================================
// EXPORTS
// ========================================

export const colors = {
  palette,
  semantic,
  component,
  darkMode,
  darkThemes,
} as const;

export default colors;
