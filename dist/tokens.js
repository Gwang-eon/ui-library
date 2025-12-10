const e = {
  // Blue
  blue: {
    50: "#E3F2FD",
    100: "#BBDEFB",
    200: "#90CAF9",
    300: "#64B5F6",
    400: "#42A5F5",
    500: "#2196F3",
    600: "#1E88E5",
    700: "#1976D2",
    800: "#1565C0",
    900: "#0D47A1",
    950: "#082F66"
  },
  // Green
  green: {
    50: "#E8F5E9",
    100: "#C8E6C9",
    200: "#A5D6A7",
    300: "#81C784",
    400: "#66BB6A",
    500: "#4CAF50",
    600: "#43A047",
    700: "#388E3C",
    800: "#2E7D32",
    900: "#1B5E20",
    950: "#0D3C14"
  },
  // Red
  red: {
    50: "#FFEBEE",
    100: "#FFCDD2",
    200: "#EF9A9A",
    300: "#E57373",
    400: "#EF5350",
    500: "#F44336",
    600: "#E53935",
    700: "#D32F2F",
    800: "#C62828",
    900: "#B71C1C",
    950: "#7F1212"
  },
  // Orange
  orange: {
    50: "#FFF3E0",
    100: "#FFE0B2",
    200: "#FFCC80",
    300: "#FFB74D",
    400: "#FFA726",
    500: "#FF9800",
    600: "#FB8C00",
    700: "#F57C00",
    800: "#EF6C00",
    900: "#E65100",
    950: "#A13900"
  },
  // Light Blue
  lightBlue: {
    50: "#E1F5FE",
    100: "#B3E5FC",
    200: "#81D4FA",
    300: "#4FC3F7",
    400: "#29B6F6",
    500: "#03A9F4",
    600: "#039BE5",
    700: "#0288D1",
    800: "#0277BD",
    900: "#01579B",
    950: "#013A66"
  },
  // Purple (Secondary)
  purple: {
    50: "#F3E5F5",
    100: "#E1BEE7",
    200: "#CE93D8",
    300: "#BA68C8",
    400: "#AB47BC",
    500: "#9C27B0",
    600: "#8E24AA",
    700: "#7B1FA2",
    800: "#6A1B9A",
    900: "#4A148C",
    950: "#2E0C57"
  },
  // Teal (Alternative Secondary)
  teal: {
    50: "#E0F2F1",
    100: "#B2DFDB",
    200: "#80CBC4",
    300: "#4DB6AC",
    400: "#26A69A",
    500: "#009688",
    600: "#00897B",
    700: "#00796B",
    800: "#00695C",
    900: "#004D40",
    950: "#00332A"
  },
  // Grey (Neutral)
  grey: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#BDBDBD",
    500: "#9E9E9E",
    600: "#757575",
    700: "#616161",
    750: "#4A4A4A",
    800: "#424242",
    850: "#333333",
    900: "#212121"
  },
  // Warm Grey (Stone) - Yellow/Red undertone
  warmGrey: {
    50: "#FAFAF9",
    100: "#F5F5F4",
    200: "#E7E5E4",
    300: "#D6D3D1",
    400: "#A8A29E",
    500: "#78716C",
    600: "#57534E",
    700: "#44403C",
    750: "#38342F",
    800: "#292524",
    850: "#1F1D1C",
    900: "#1C1917"
  },
  // Cool Grey (Slate) - Blue undertone
  coolGrey: {
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    750: "#293548",
    800: "#1E293B",
    850: "#15202E",
    900: "#0F172A"
  },
  // Dark Blue (Slate/Navy) - For Dark Blue Theme
  darkBlue: {
    50: "#E8EDF2",
    100: "#C5D3E0",
    200: "#9FB7CC",
    300: "#789AB8",
    400: "#5B84A8",
    500: "#3E6E99",
    600: "#386691",
    700: "#2F5B86",
    800: "#27507C",
    900: "#1A3D6B",
    950: "#0D1F35"
  },
  // Dark Green (Forest/Emerald) - For Dark Green Theme
  darkGreen: {
    50: "#E7F5F0",
    100: "#C3E6D9",
    200: "#9BD6C0",
    300: "#73C5A6",
    400: "#55B993",
    500: "#37AC80",
    600: "#319F78",
    700: "#2A906D",
    800: "#238163",
    900: "#166450",
    950: "#0B3228"
  },
  // Dark Violet (Deep Purple) - For Dark Violet Theme
  darkViolet: {
    50: "#EEE8F5",
    100: "#D4C6E6",
    200: "#B8A0D6",
    300: "#9C7AC5",
    400: "#875EB8",
    500: "#7242AB",
    600: "#6A3CA4",
    700: "#5F339A",
    800: "#552B91",
    900: "#421D80",
    950: "#210F40"
  },
  // Dark Brown (Sepia/Chocolate) - For Dark Brown Theme
  darkBrown: {
    50: "#F2EDE8",
    100: "#DFD2C5",
    200: "#CAB49F",
    300: "#B59678",
    400: "#A57F5B",
    500: "#96693E",
    600: "#8E6138",
    700: "#835630",
    800: "#794C28",
    900: "#68391B",
    950: "#341D0E"
  },
  // Base Colors
  white: "#FFFFFF",
  black: "#000000"
}, r = {
  // Primary (Blue)
  primary: {
    50: e.blue[50],
    100: e.blue[100],
    200: e.blue[200],
    300: e.blue[300],
    400: e.blue[400],
    500: e.blue[500],
    600: e.blue[600],
    700: e.blue[700],
    800: e.blue[800],
    900: e.blue[900],
    950: e.blue[950]
  },
  // Secondary (Teal)
  secondary: {
    50: e.teal[50],
    100: e.teal[100],
    200: e.teal[200],
    300: e.teal[300],
    400: e.teal[400],
    500: e.teal[500],
    600: e.teal[600],
    700: e.teal[700],
    800: e.teal[800],
    900: e.teal[900],
    950: e.teal[950]
  },
  // Success (Green)
  success: {
    50: e.green[50],
    100: e.green[100],
    200: e.green[200],
    300: e.green[300],
    400: e.green[400],
    500: e.green[500],
    600: e.green[600],
    700: e.green[700],
    800: e.green[800],
    900: e.green[900],
    950: e.green[950]
  },
  // Error (Red)
  error: {
    50: e.red[50],
    100: e.red[100],
    200: e.red[200],
    300: e.red[300],
    400: e.red[400],
    500: e.red[500],
    600: e.red[600],
    700: e.red[700],
    800: e.red[800],
    900: e.red[900],
    950: e.red[950]
  },
  // Warning (Orange)
  warning: {
    50: e.orange[50],
    100: e.orange[100],
    200: e.orange[200],
    300: e.orange[300],
    400: e.orange[400],
    500: e.orange[500],
    600: e.orange[600],
    700: e.orange[700],
    800: e.orange[800],
    900: e.orange[900],
    950: e.orange[950]
  },
  // Info (Light Blue)
  info: {
    50: e.lightBlue[50],
    100: e.lightBlue[100],
    200: e.lightBlue[200],
    300: e.lightBlue[300],
    400: e.lightBlue[400],
    500: e.lightBlue[500],
    600: e.lightBlue[600],
    700: e.lightBlue[700],
    800: e.lightBlue[800],
    900: e.lightBlue[900],
    950: e.lightBlue[950]
  },
  // Gray (Neutral)
  gray: {
    50: e.grey[50],
    100: e.grey[100],
    200: e.grey[200],
    300: e.grey[300],
    400: e.grey[400],
    500: e.grey[500],
    600: e.grey[600],
    700: e.grey[700],
    800: e.grey[800],
    900: e.grey[900]
  },
  // Warm Gray (Stone)
  warmGray: {
    50: e.warmGrey[50],
    100: e.warmGrey[100],
    200: e.warmGrey[200],
    300: e.warmGrey[300],
    400: e.warmGrey[400],
    500: e.warmGrey[500],
    600: e.warmGrey[600],
    700: e.warmGrey[700],
    800: e.warmGrey[800],
    900: e.warmGrey[900]
  },
  // Cool Gray (Slate)
  coolGray: {
    50: e.coolGrey[50],
    100: e.coolGrey[100],
    200: e.coolGrey[200],
    300: e.coolGrey[300],
    400: e.coolGrey[400],
    500: e.coolGrey[500],
    600: e.coolGrey[600],
    700: e.coolGrey[700],
    800: e.coolGrey[800],
    900: e.coolGrey[900]
  }
}, s = {
  // Button
  button: {
    primary: {
      bg: r.primary[500],
      bgHover: r.primary[600],
      bgActive: r.primary[700],
      text: e.white
    },
    secondary: {
      bg: "transparent",
      border: r.primary[500],
      text: r.primary[500],
      textHover: r.primary[600]
    },
    danger: {
      bg: r.error[500],
      bgHover: r.error[600],
      text: e.white
    },
    success: {
      bg: r.success[500],
      bgHover: r.success[600],
      text: e.white
    },
    warning: {
      bg: r.warning[500],
      bgHover: r.warning[600],
      text: e.white
    },
    info: {
      bg: r.info[500],
      bgHover: r.info[600],
      text: e.white
    }
  },
  // Input
  input: {
    bg: e.white,
    border: r.gray[400],
    borderHover: r.gray[500],
    borderFocus: r.primary[500],
    text: r.gray[900],
    placeholder: r.gray[500],
    disabled: {
      bg: r.gray[100],
      border: r.gray[200],
      text: r.gray[400]
    },
    readonly: {
      bg: r.gray[50],
      border: r.gray[300],
      text: r.gray[700]
    },
    success: {
      border: r.success[500]
    },
    warning: {
      border: r.warning[500]
    },
    error: {
      border: r.error[500]
    },
    info: {
      border: r.info[500]
    }
  },
  // Table
  table: {
    header: {
      bg: r.gray[50],
      text: r.gray[900]
    },
    row: {
      bg: e.white,
      bgHover: r.gray[50],
      bgSelected: r.primary[50],
      bgStripe: r.gray[50],
      bgSum: r.warmGray[100],
      textSum: r.warmGray[900],
      bgSubSum: r.coolGray[100],
      textSubSum: r.coolGray[900]
    },
    cell: {
      border: r.gray[200]
    },
    footer: {
      bg: r.gray[50]
    }
  },
  // Text
  text: {
    primary: r.gray[900],
    secondary: r.gray[700],
    tertiary: r.gray[600],
    disabled: r.gray[400],
    inverse: e.white,
    link: r.primary[600],
    linkHover: r.primary[700]
  },
  // Surface
  surface: {
    primary: e.white,
    secondary: r.gray[50],
    tertiary: r.gray[100]
  },
  // Border
  border: {
    default: r.gray[300],
    subtle: r.gray[200],
    strong: r.gray[400]
  },
  // Status Colors
  status: {
    online: r.success[500],
    offline: r.gray[500],
    error: r.error[500],
    warning: r.warning[500],
    syncing: r.primary[500]
  }
}, x = {
  // Button - Dark Mode
  button: {
    primary: {
      bg: r.primary[600],
      bgHover: r.primary[500],
      bgActive: r.primary[400],
      text: e.white
    },
    secondary: {
      bg: "transparent",
      border: r.primary[400],
      text: r.primary[400],
      textHover: r.primary[300]
    },
    danger: {
      bg: r.error[600],
      bgHover: r.error[500],
      text: e.white
    },
    success: {
      bg: r.success[600],
      bgHover: r.success[500],
      text: e.white
    },
    warning: {
      bg: r.warning[600],
      bgHover: r.warning[500],
      text: e.white
    },
    info: {
      bg: r.info[600],
      bgHover: r.info[500],
      text: e.white
    }
  },
  // Input - Dark Mode
  input: {
    bg: e.grey[800],
    border: e.grey[700],
    borderHover: e.grey[600],
    borderFocus: r.primary[400],
    text: e.grey[100],
    placeholder: e.grey[500],
    disabled: {
      bg: e.grey[900],
      border: e.grey[800],
      text: e.grey[600]
    },
    readonly: {
      bg: e.grey[850],
      border: e.grey[700],
      text: e.grey[300]
    },
    success: {
      border: r.success[400]
    },
    warning: {
      border: r.warning[400]
    },
    error: {
      border: r.error[400]
    },
    info: {
      border: r.info[400]
    }
  },
  // Table - Dark Mode
  table: {
    header: {
      bg: e.grey[850],
      text: e.grey[100]
    },
    row: {
      bg: e.grey[900],
      bgHover: e.grey[800],
      bgSelected: r.primary[950],
      bgStripe: e.grey[850],
      bgSum: e.warmGrey[800],
      textSum: e.warmGrey[100],
      bgSubSum: e.coolGrey[800],
      textSubSum: e.coolGrey[100]
    },
    cell: {
      border: e.grey[700]
    },
    footer: {
      bg: e.grey[850]
    }
  },
  // Text - Dark Mode (WCAG AA compliant)
  text: {
    primary: e.grey[100],
    // 17.54:1 - Excellent
    secondary: e.grey[400],
    // 4.36:1 - AA Pass
    tertiary: e.grey[500],
    // 3.04:1 - Large text only
    disabled: e.grey[500],
    // 3.04:1 - Improved
    inverse: e.grey[900],
    link: r.primary[400],
    // 7.12:1 - Excellent
    linkHover: r.primary[300]
  },
  // Surface - Dark Mode (5-layer system)
  surface: {
    secondary: e.grey[900],
    // Page background (body)
    primary: e.grey[850],
    // Card, Modal (elevated)
    tertiary: e.grey[800],
    // Section (nested)
    quaternary: e.grey[750],
    // Widget background
    quinary: e.grey[700]
    // Sub-component, top layer
  },
  // Border - Dark Mode (WCAG AA: 3:1+ contrast)
  border: {
    default: e.grey[500],
    // 3.04:1 - WCAG AA Pass
    subtle: e.grey[700],
    // Subtle borders
    strong: e.grey[400]
    // 4.36:1 - Strong emphasis
  },
  // Status Colors - Dark Mode (lighter variants)
  status: {
    online: r.success[400],
    offline: e.grey[500],
    error: r.error[400],
    warning: r.warning[400],
    syncing: r.primary[400]
  }
}, m = {
  // Dark Blue Theme
  darkBlue: {
    text: {
      primary: e.darkBlue[100],
      secondary: e.darkBlue[300],
      tertiary: e.darkBlue[400],
      disabled: e.darkBlue[500],
      link: r.primary[400],
      linkHover: r.primary[300]
    },
    surface: {
      secondary: e.darkBlue[950],
      // Page background
      primary: e.darkBlue[900],
      // Card, Modal
      tertiary: e.darkBlue[800],
      // Section
      quaternary: e.darkBlue[700],
      // Widget background
      quinary: e.darkBlue[600]
      // Sub-component
    },
    border: {
      default: e.darkBlue[400],
      // 3.24:1 - WCAG AA Pass
      subtle: e.darkBlue[600],
      strong: e.darkBlue[300]
    }
  },
  // Dark Green Theme
  darkGreen: {
    text: {
      primary: e.darkGreen[100],
      secondary: e.darkGreen[300],
      tertiary: e.darkGreen[400],
      disabled: e.darkGreen[500],
      link: r.success[400],
      linkHover: r.success[300]
    },
    surface: {
      secondary: e.darkGreen[950],
      primary: e.darkGreen[900],
      tertiary: e.darkGreen[800],
      quaternary: e.darkGreen[700],
      quinary: e.darkGreen[600]
    },
    border: {
      default: e.darkGreen[400],
      subtle: e.darkGreen[600],
      strong: e.darkGreen[300]
    }
  },
  // Dark Violet Theme
  darkViolet: {
    text: {
      primary: e.darkViolet[100],
      secondary: e.darkViolet[300],
      tertiary: e.darkViolet[400],
      disabled: e.darkViolet[500],
      link: e.purple[400],
      linkHover: e.purple[300]
    },
    surface: {
      secondary: e.darkViolet[950],
      primary: e.darkViolet[900],
      tertiary: e.darkViolet[800],
      quaternary: e.darkViolet[700],
      quinary: e.darkViolet[600]
    },
    border: {
      default: e.darkViolet[400],
      subtle: e.darkViolet[600],
      strong: e.darkViolet[300]
    }
  },
  // Dark Brown Theme
  darkBrown: {
    text: {
      primary: e.darkBrown[100],
      secondary: e.darkBrown[300],
      tertiary: e.darkBrown[400],
      disabled: e.darkBrown[500],
      link: e.orange[400],
      linkHover: e.orange[300]
    },
    surface: {
      secondary: e.darkBrown[950],
      primary: e.darkBrown[900],
      tertiary: e.darkBrown[800],
      quaternary: e.darkBrown[700],
      quinary: e.darkBrown[600]
    },
    border: {
      default: e.darkBrown[400],
      subtle: e.darkBrown[600],
      strong: e.darkBrown[300]
    }
  }
}, u = {
  palette: e,
  semantic: r,
  component: s,
  darkMode: x,
  darkThemes: m
}, l = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
  32: "128px"
}, b = {
  // Button
  button: {
    paddingY: l[2],
    // 8px
    paddingX: l[4],
    // 16px
    gap: l[2]
    // 8px (icon + text)
  },
  // Input
  input: {
    paddingY: l[3],
    // 12px
    paddingX: l[4]
    // 16px
  },
  // Card
  card: {
    padding: l[6],
    // 24px
    gap: l[4]
    // 16px
  },
  // Modal
  modal: {
    padding: l[6],
    // 24px
    header: {
      paddingY: l[4],
      // 16px
      paddingX: l[6]
      // 24px
    },
    footer: {
      paddingY: l[4],
      // 16px
      paddingX: l[6]
      // 24px
    }
  },
  // Table
  table: {
    cell: {
      paddingY: l[3],
      // 12px
      paddingX: l[4]
      // 16px
    },
    header: {
      paddingY: l[4],
      // 16px
      paddingX: l[4]
      // 16px
    }
  },
  // List
  list: {
    item: {
      paddingY: l[3],
      // 12px
      paddingX: l[4]
      // 16px
    },
    gap: l[2]
    // 8px
  }
}, c = {
  // Desktop Grid (12 columns)
  desktop: {
    columns: 12,
    gutter: "24px",
    margin: "48px",
    maxWidth: "1184px"
  },
  // Wide Desktop Grid (12 columns, for dashboards & monitoring)
  wideDesktop: {
    columns: 12,
    gutter: "24px",
    margin: "48px",
    maxWidth: "1920px"
  },
  // Tablet Grid (8 columns)
  tablet: {
    columns: 8,
    gutter: "24px",
    margin: "32px",
    maxWidth: "100%"
  },
  // Mobile Grid (4 columns)
  mobile: {
    columns: 4,
    gutter: "16px",
    margin: "16px",
    maxWidth: "100%"
  }
}, y = {
  mobile: "0px",
  tablet: "768px",
  desktop: "1280px",
  wide: "1920px"
}, h = {
  xs: "8px",
  sm: "12px",
  md: "16px",
  lg: "24px",
  xl: "32px"
}, f = {
  // Touch Target Sizes (WCAG 2.5.5 - 44x44px minimum)
  touchTargetMin: "44px",
  buttonHeight: "48px",
  inputHeight: "48px",
  navHeight: "56px",
  tabHeight: "48px",
  // Safe Area Insets (iOS notch/Dynamic Island support)
  safeArea: {
    top: "env(safe-area-inset-top)",
    bottom: "env(safe-area-inset-bottom)",
    left: "env(safe-area-inset-left)",
    right: "env(safe-area-inset-right)"
  },
  // Mobile Gestures
  gestures: {
    swipeThreshold: "60px",
    swipeVelocity: 0.3,
    pullDistance: "80px",
    longPressDuration: "500ms"
  },
  // Bottom Sheet
  bottomSheet: {
    peekHeight: "80px",
    halfHeight: "50vh",
    fullHeight: "90vh",
    dragIndicatorWidth: "40px",
    dragIndicatorHeight: "4px",
    borderRadius: "16px",
    backdropBlur: "4px"
  },
  // FAB (Floating Action Button)
  fab: {
    sizeStandard: "56px",
    sizeMini: "40px",
    sizeExtendedHeight: "48px",
    borderRadius: "50%",
    extendedBorderRadius: "24px",
    offset: "16px",
    offsetWithNav: "72px"
  },
  // Mobile Navigation Bar
  nav: {
    itemSize: "56px",
    iconSize: "24px",
    labelSize: "12px"
  },
  // Swipe Actions
  swipeAction: {
    width: "80px",
    iconSize: "24px"
  },
  // Action Sheet
  actionSheet: {
    itemHeight: "56px",
    borderRadius: "16px",
    backdropBlur: "8px",
    maxHeight: "80vh"
  },
  // Pull-to-Refresh
  pullToRefresh: {
    height: "60px",
    spinnerSize: "24px",
    threshold: "80px"
  },
  // Mobile Modal/Dialog
  modal: {
    maxWidth: "calc(100vw - 32px)",
    maxHeight: "calc(100vh - 64px)",
    borderRadius: "12px"
  },
  // Mobile Card
  card: {
    padding: "16px",
    gap: "12px",
    borderRadius: "8px"
  },
  // Mobile Input/Form
  input: {
    paddingY: "14px",
    paddingX: "16px",
    borderRadius: "8px",
    fontSize: "16px"
    // Prevents iOS zoom on focus
  },
  // Mobile Table
  table: {
    cellPadding: "12px",
    rowHeight: "56px"
  }
}, B = {
  sm: "2px",
  base: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  full: "9999px"
}, F = {
  base: 1,
  raised: 10,
  dropdown: 1e3,
  sticky: 1100,
  overlay: 1200,
  drawer: 1300,
  modalBackdrop: 1400,
  modal: 1410,
  popover: 1500,
  toast: 1600,
  tooltip: 1700,
  max: 9999
}, w = {
  spacing: l,
  componentSpacing: b,
  grid: c,
  breakpoints: y,
  mobileSpacing: h,
  mobile: f,
  radius: B,
  zIndex: F
}, p = {
  sans: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
  mono: "'D2Coding', 'D2 Coding', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace"
}, t = {
  thin: 100,
  extralight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900
}, i = {
  // Display
  display: {
    large: "57px",
    medium: "45px",
    small: "36px"
  },
  // Heading
  heading: {
    1: "32px",
    2: "28px",
    3: "24px",
    4: "20px",
    5: "18px",
    6: "16px"
  },
  // Body
  body: {
    large: "16px",
    medium: "14px",
    small: "12px"
  },
  // Label
  label: {
    large: "14px",
    medium: "12px",
    small: "11px"
  },
  // Caption & Overline
  caption: "12px",
  overline: "12px",
  // Code
  code: {
    large: "14px",
    medium: "13px",
    small: "12px"
  }
}, n = {
  // Display
  display: {
    large: "64px",
    medium: "52px",
    small: "44px"
  },
  // Heading
  heading: {
    1: "40px",
    2: "36px",
    3: "32px",
    4: "28px",
    5: "24px",
    6: "24px"
  },
  // Body
  body: {
    large: "24px",
    medium: "20px",
    small: "16px"
  },
  // Label
  label: {
    large: "20px",
    medium: "16px",
    small: "16px"
  },
  // Caption & Overline
  caption: "16px",
  overline: "16px",
  // Code
  code: {
    large: "20px",
    medium: "18px",
    small: "16px"
  }
}, o = {
  tight: "-0.25px",
  normal: "0px",
  wide: "0.1px",
  wider: "0.5px",
  widest: "1.5px"
}, E = {
  // Display
  display: {
    large: {
      fontSize: i.display.large,
      lineHeight: n.display.large,
      fontWeight: t.bold,
      letterSpacing: o.tight
    },
    medium: {
      fontSize: i.display.medium,
      lineHeight: n.display.medium,
      fontWeight: t.bold,
      letterSpacing: o.normal
    },
    small: {
      fontSize: i.display.small,
      lineHeight: n.display.small,
      fontWeight: t.bold,
      letterSpacing: o.normal
    }
  },
  // Heading
  heading: {
    1: {
      fontSize: i.heading[1],
      lineHeight: n.heading[1],
      fontWeight: t.bold,
      letterSpacing: o.normal
    },
    2: {
      fontSize: i.heading[2],
      lineHeight: n.heading[2],
      fontWeight: t.semibold,
      letterSpacing: o.normal
    },
    3: {
      fontSize: i.heading[3],
      lineHeight: n.heading[3],
      fontWeight: t.semibold,
      letterSpacing: o.normal
    },
    4: {
      fontSize: i.heading[4],
      lineHeight: n.heading[4],
      fontWeight: t.semibold,
      letterSpacing: o.normal
    },
    5: {
      fontSize: i.heading[5],
      lineHeight: n.heading[5],
      fontWeight: t.semibold,
      letterSpacing: o.normal
    },
    6: {
      fontSize: i.heading[6],
      lineHeight: n.heading[6],
      fontWeight: t.semibold,
      letterSpacing: o.normal
    }
  },
  // Body
  body: {
    large: {
      fontSize: i.body.large,
      lineHeight: n.body.large,
      fontWeight: t.regular,
      letterSpacing: o.normal
    },
    medium: {
      fontSize: i.body.medium,
      lineHeight: n.body.medium,
      fontWeight: t.regular,
      letterSpacing: o.normal
    },
    small: {
      fontSize: i.body.small,
      lineHeight: n.body.small,
      fontWeight: t.regular,
      letterSpacing: o.normal
    }
  },
  // Label
  label: {
    large: {
      fontSize: i.label.large,
      lineHeight: n.label.large,
      fontWeight: t.medium,
      letterSpacing: o.normal
    },
    medium: {
      fontSize: i.label.medium,
      lineHeight: n.label.medium,
      fontWeight: t.medium,
      letterSpacing: o.normal
    },
    small: {
      fontSize: i.label.small,
      lineHeight: n.label.small,
      fontWeight: t.medium,
      letterSpacing: o.normal
    }
  },
  // Caption
  caption: {
    fontSize: i.caption,
    lineHeight: n.caption,
    fontWeight: t.regular,
    letterSpacing: o.normal
  },
  // Overline
  overline: {
    fontSize: i.overline,
    lineHeight: n.overline,
    fontWeight: t.medium,
    letterSpacing: o.widest
  },
  // Code
  code: {
    large: {
      fontSize: i.code.large,
      lineHeight: n.code.large,
      fontWeight: t.regular,
      letterSpacing: o.normal,
      fontFamily: p.mono
    },
    medium: {
      fontSize: i.code.medium,
      lineHeight: n.code.medium,
      fontWeight: t.regular,
      letterSpacing: o.normal,
      fontFamily: p.mono
    },
    small: {
      fontSize: i.code.small,
      lineHeight: n.code.small,
      fontWeight: t.regular,
      letterSpacing: o.normal,
      fontFamily: p.mono
    }
  }
}, k = {
  // Font Sizes (optimized for readability)
  fontSize: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px"
  },
  // Line Heights (optimized for readability)
  lineHeight: {
    tight: 1.3,
    normal: 1.5,
    relaxed: 1.625
  }
}, D = {
  fontFamily: p,
  fontWeight: t,
  fontSize: i,
  lineHeight: n,
  letterSpacing: o,
  typography: E,
  mobileTypography: k
}, g = {
  instant: "100ms",
  // Hover, Focus
  fast: "200ms",
  // Button, Toggle
  base: "300ms",
  // Modal, Dropdown (Default)
  slow: "400ms",
  // Drawer, Complex
  slower: "600ms"
  // Page transition
}, a = {
  linear: "linear",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
  // Most common
  inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  emphasized: "cubic-bezier(0.4, 0, 0, 1)",
  emphasizedIn: "cubic-bezier(0.4, 0, 0.6, 1)",
  emphasizedOut: "cubic-bezier(0.2, 0, 0, 1)",
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
}, S = {
  // Button
  button: {
    hoverDuration: g.instant,
    hoverEasing: a.out
  },
  // Modal
  modal: {
    enterDuration: g.base,
    enterEasing: a.out,
    exitDuration: g.fast,
    exitEasing: a.in
  },
  // Dropdown
  dropdown: {
    enterDuration: g.fast,
    enterEasing: a.out,
    exitDuration: "150ms",
    exitEasing: a.in
  },
  // Tooltip
  tooltip: {
    enterDuration: g.fast,
    enterEasing: a.out,
    enterDelay: "100ms",
    exitDuration: "150ms",
    exitEasing: a.in
  },
  // Toast
  toast: {
    enterDuration: g.base,
    enterEasing: a.out,
    exitDuration: g.fast,
    exitEasing: a.in,
    autoDismissDuration: "5000ms"
  },
  // Drawer
  drawer: {
    enterDuration: g.slow,
    enterEasing: a.out,
    exitDuration: g.base,
    exitEasing: a.in
  },
  // Accordion
  accordion: {
    expandDuration: g.base,
    expandEasing: a.out,
    collapseDuration: "250ms",
    collapseEasing: a.in
  },
  // Tab
  tab: {
    switchDuration: g.base,
    switchEasing: a.inOut
  },
  // Loading
  loading: {
    spinnerDuration: "1000ms",
    spinnerEasing: a.linear,
    skeletonDuration: "1500ms",
    skeletonEasing: a.inOut
  }
}, A = {
  dataUpdateDuration: g.base,
  dataUpdateEasing: a.out,
  statusChangeDuration: g.slow,
  statusChangeEasing: a.out,
  liveIndicatorDuration: "2000ms",
  liveIndicatorEasing: a.inOut,
  connectionLostDuration: g.slow,
  connectionLostEasing: a.inOut,
  refreshDuration: g.slower,
  refreshEasing: a.out,
  alertPulseDuration: "1000ms",
  alertPulseEasing: a.inOut,
  chartAnimationDuration: "1000ms",
  chartAnimationEasing: a.out
}, H = {
  // Mobile Animation (optimized for 60fps)
  transitionFast: "200ms",
  transitionBase: "300ms",
  transitionSlow: "400ms",
  springEasing: "cubic-bezier(0.34, 1.56, 0.64, 1)"
}, C = {
  duration: g,
  easing: a,
  componentMotion: S,
  iotMotion: A,
  mobileMotion: H
}, d = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -2px rgba(0, 0, 0, 0.15)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -4px rgba(0, 0, 0, 0.15)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.2)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.3)"
}, v = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.5)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -4px rgba(0, 0, 0, 0.5)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 8px 10px -6px rgba(0, 0, 0, 0.6)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.8)"
}, G = {
  // FAB (Floating Action Button)
  fab: {
    base: "0 6px 20px rgba(0, 0, 0, 0.15)",
    hover: "0 8px 24px rgba(0, 0, 0, 0.2)",
    elevation: "0 6px 20px rgba(0, 0, 0, 0.15)",
    elevationHover: "0 8px 24px rgba(0, 0, 0, 0.2)"
  },
  // Mobile Navigation Bar
  mobileNav: {
    elevation: "0 -2px 8px rgba(0, 0, 0, 0.1)"
  }
}, z = {
  light: d,
  dark: v,
  component: G,
  // Default to light mode
  ...d
}, W = {
  colors: u,
  spacing: w,
  typography: D,
  motion: C,
  shadows: z
};
export {
  y as breakpoints,
  u as colors,
  s as component,
  S as componentMotion,
  G as componentShadows,
  b as componentSpacing,
  x as darkMode,
  v as darkShadows,
  m as darkThemes,
  W as default,
  g as duration,
  a as easing,
  p as fontFamily,
  i as fontSize,
  t as fontWeight,
  c as grid,
  A as iotMotion,
  o as letterSpacing,
  d as lightShadows,
  n as lineHeight,
  f as mobile,
  H as mobileMotion,
  h as mobileSpacing,
  k as mobileTypography,
  C as motion,
  e as palette,
  B as radius,
  r as semantic,
  z as shadows,
  w as spacing,
  W as tokens,
  D as typography,
  F as zIndex
};
//# sourceMappingURL=tokens.js.map
