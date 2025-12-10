const r = {
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
}, e = {
  // Primary (Blue)
  primary: {
    50: r.blue[50],
    100: r.blue[100],
    200: r.blue[200],
    300: r.blue[300],
    400: r.blue[400],
    500: r.blue[500],
    600: r.blue[600],
    700: r.blue[700],
    800: r.blue[800],
    900: r.blue[900],
    950: r.blue[950]
  },
  // Secondary (Teal)
  secondary: {
    50: r.teal[50],
    100: r.teal[100],
    200: r.teal[200],
    300: r.teal[300],
    400: r.teal[400],
    500: r.teal[500],
    600: r.teal[600],
    700: r.teal[700],
    800: r.teal[800],
    900: r.teal[900],
    950: r.teal[950]
  },
  // Success (Green)
  success: {
    50: r.green[50],
    100: r.green[100],
    200: r.green[200],
    300: r.green[300],
    400: r.green[400],
    500: r.green[500],
    600: r.green[600],
    700: r.green[700],
    800: r.green[800],
    900: r.green[900],
    950: r.green[950]
  },
  // Error (Red)
  error: {
    50: r.red[50],
    100: r.red[100],
    200: r.red[200],
    300: r.red[300],
    400: r.red[400],
    500: r.red[500],
    600: r.red[600],
    700: r.red[700],
    800: r.red[800],
    900: r.red[900],
    950: r.red[950]
  },
  // Warning (Orange)
  warning: {
    50: r.orange[50],
    100: r.orange[100],
    200: r.orange[200],
    300: r.orange[300],
    400: r.orange[400],
    500: r.orange[500],
    600: r.orange[600],
    700: r.orange[700],
    800: r.orange[800],
    900: r.orange[900],
    950: r.orange[950]
  },
  // Info (Light Blue)
  info: {
    50: r.lightBlue[50],
    100: r.lightBlue[100],
    200: r.lightBlue[200],
    300: r.lightBlue[300],
    400: r.lightBlue[400],
    500: r.lightBlue[500],
    600: r.lightBlue[600],
    700: r.lightBlue[700],
    800: r.lightBlue[800],
    900: r.lightBlue[900],
    950: r.lightBlue[950]
  },
  // Gray (Neutral)
  gray: {
    50: r.grey[50],
    100: r.grey[100],
    200: r.grey[200],
    300: r.grey[300],
    400: r.grey[400],
    500: r.grey[500],
    600: r.grey[600],
    700: r.grey[700],
    800: r.grey[800],
    900: r.grey[900]
  },
  // Warm Gray (Stone)
  warmGray: {
    50: r.warmGrey[50],
    100: r.warmGrey[100],
    200: r.warmGrey[200],
    300: r.warmGrey[300],
    400: r.warmGrey[400],
    500: r.warmGrey[500],
    600: r.warmGrey[600],
    700: r.warmGrey[700],
    800: r.warmGrey[800],
    900: r.warmGrey[900]
  },
  // Cool Gray (Slate)
  coolGray: {
    50: r.coolGrey[50],
    100: r.coolGrey[100],
    200: r.coolGrey[200],
    300: r.coolGrey[300],
    400: r.coolGrey[400],
    500: r.coolGrey[500],
    600: r.coolGrey[600],
    700: r.coolGrey[700],
    800: r.coolGrey[800],
    900: r.coolGrey[900]
  }
}, a = {
  // Button
  button: {
    primary: {
      bg: e.primary[500],
      bgHover: e.primary[600],
      bgActive: e.primary[700],
      text: r.white
    },
    secondary: {
      bg: "transparent",
      border: e.primary[500],
      text: e.primary[500],
      textHover: e.primary[600]
    },
    danger: {
      bg: e.error[500],
      bgHover: e.error[600],
      text: r.white
    },
    success: {
      bg: e.success[500],
      bgHover: e.success[600],
      text: r.white
    },
    warning: {
      bg: e.warning[500],
      bgHover: e.warning[600],
      text: r.white
    },
    info: {
      bg: e.info[500],
      bgHover: e.info[600],
      text: r.white
    }
  },
  // Input
  input: {
    bg: r.white,
    border: e.gray[400],
    borderHover: e.gray[500],
    borderFocus: e.primary[500],
    text: e.gray[900],
    placeholder: e.gray[500],
    disabled: {
      bg: e.gray[100],
      border: e.gray[200],
      text: e.gray[400]
    },
    readonly: {
      bg: e.gray[50],
      border: e.gray[300],
      text: e.gray[700]
    },
    success: {
      border: e.success[500]
    },
    warning: {
      border: e.warning[500]
    },
    error: {
      border: e.error[500]
    },
    info: {
      border: e.info[500]
    }
  },
  // Table
  table: {
    header: {
      bg: e.gray[50],
      text: e.gray[900]
    },
    row: {
      bg: r.white,
      bgHover: e.gray[50],
      bgSelected: e.primary[50],
      bgStripe: e.gray[50],
      bgSum: e.warmGray[100],
      textSum: e.warmGray[900],
      bgSubSum: e.coolGray[100],
      textSubSum: e.coolGray[900]
    },
    cell: {
      border: e.gray[200]
    },
    footer: {
      bg: e.gray[50]
    }
  },
  // Text
  text: {
    primary: e.gray[900],
    secondary: e.gray[700],
    tertiary: e.gray[600],
    disabled: e.gray[400],
    inverse: r.white,
    link: e.primary[600],
    linkHover: e.primary[700]
  },
  // Surface
  surface: {
    primary: r.white,
    secondary: e.gray[50],
    tertiary: e.gray[100]
  },
  // Border
  border: {
    default: e.gray[300],
    subtle: e.gray[200],
    strong: e.gray[400]
  },
  // Status Colors
  status: {
    online: e.success[500],
    offline: e.gray[500],
    error: e.error[500],
    warning: e.warning[500],
    syncing: e.primary[500]
  }
}, t = {
  // Button - Dark Mode
  button: {
    primary: {
      bg: e.primary[600],
      bgHover: e.primary[500],
      bgActive: e.primary[400],
      text: r.white
    },
    secondary: {
      bg: "transparent",
      border: e.primary[400],
      text: e.primary[400],
      textHover: e.primary[300]
    },
    danger: {
      bg: e.error[600],
      bgHover: e.error[500],
      text: r.white
    },
    success: {
      bg: e.success[600],
      bgHover: e.success[500],
      text: r.white
    },
    warning: {
      bg: e.warning[600],
      bgHover: e.warning[500],
      text: r.white
    },
    info: {
      bg: e.info[600],
      bgHover: e.info[500],
      text: r.white
    }
  },
  // Input - Dark Mode
  input: {
    bg: r.grey[800],
    border: r.grey[700],
    borderHover: r.grey[600],
    borderFocus: e.primary[400],
    text: r.grey[100],
    placeholder: r.grey[500],
    disabled: {
      bg: r.grey[900],
      border: r.grey[800],
      text: r.grey[600]
    },
    readonly: {
      bg: r.grey[850],
      border: r.grey[700],
      text: r.grey[300]
    },
    success: {
      border: e.success[400]
    },
    warning: {
      border: e.warning[400]
    },
    error: {
      border: e.error[400]
    },
    info: {
      border: e.info[400]
    }
  },
  // Table - Dark Mode
  table: {
    header: {
      bg: r.grey[850],
      text: r.grey[100]
    },
    row: {
      bg: r.grey[900],
      bgHover: r.grey[800],
      bgSelected: e.primary[950],
      bgStripe: r.grey[850],
      bgSum: r.warmGrey[800],
      textSum: r.warmGrey[100],
      bgSubSum: r.coolGrey[800],
      textSubSum: r.coolGrey[100]
    },
    cell: {
      border: r.grey[700]
    },
    footer: {
      bg: r.grey[850]
    }
  },
  // Text - Dark Mode (WCAG AA compliant)
  text: {
    primary: r.grey[100],
    // 17.54:1 - Excellent
    secondary: r.grey[400],
    // 4.36:1 - AA Pass
    tertiary: r.grey[500],
    // 3.04:1 - Large text only
    disabled: r.grey[500],
    // 3.04:1 - Improved
    inverse: r.grey[900],
    link: e.primary[400],
    // 7.12:1 - Excellent
    linkHover: e.primary[300]
  },
  // Surface - Dark Mode (5-layer system)
  surface: {
    secondary: r.grey[900],
    // Page background (body)
    primary: r.grey[850],
    // Card, Modal (elevated)
    tertiary: r.grey[800],
    // Section (nested)
    quaternary: r.grey[750],
    // Widget background
    quinary: r.grey[700]
    // Sub-component, top layer
  },
  // Border - Dark Mode (WCAG AA: 3:1+ contrast)
  border: {
    default: r.grey[500],
    // 3.04:1 - WCAG AA Pass
    subtle: r.grey[700],
    // Subtle borders
    strong: r.grey[400]
    // 4.36:1 - Strong emphasis
  },
  // Status Colors - Dark Mode (lighter variants)
  status: {
    online: e.success[400],
    offline: r.grey[500],
    error: e.error[400],
    warning: e.warning[400],
    syncing: e.primary[400]
  }
}, o = {
  // Dark Blue Theme
  darkBlue: {
    text: {
      primary: r.darkBlue[100],
      secondary: r.darkBlue[300],
      tertiary: r.darkBlue[400],
      disabled: r.darkBlue[500],
      link: e.primary[400],
      linkHover: e.primary[300]
    },
    surface: {
      secondary: r.darkBlue[950],
      // Page background
      primary: r.darkBlue[900],
      // Card, Modal
      tertiary: r.darkBlue[800],
      // Section
      quaternary: r.darkBlue[700],
      // Widget background
      quinary: r.darkBlue[600]
      // Sub-component
    },
    border: {
      default: r.darkBlue[400],
      // 3.24:1 - WCAG AA Pass
      subtle: r.darkBlue[600],
      strong: r.darkBlue[300]
    }
  },
  // Dark Green Theme
  darkGreen: {
    text: {
      primary: r.darkGreen[100],
      secondary: r.darkGreen[300],
      tertiary: r.darkGreen[400],
      disabled: r.darkGreen[500],
      link: e.success[400],
      linkHover: e.success[300]
    },
    surface: {
      secondary: r.darkGreen[950],
      primary: r.darkGreen[900],
      tertiary: r.darkGreen[800],
      quaternary: r.darkGreen[700],
      quinary: r.darkGreen[600]
    },
    border: {
      default: r.darkGreen[400],
      subtle: r.darkGreen[600],
      strong: r.darkGreen[300]
    }
  },
  // Dark Violet Theme
  darkViolet: {
    text: {
      primary: r.darkViolet[100],
      secondary: r.darkViolet[300],
      tertiary: r.darkViolet[400],
      disabled: r.darkViolet[500],
      link: r.purple[400],
      linkHover: r.purple[300]
    },
    surface: {
      secondary: r.darkViolet[950],
      primary: r.darkViolet[900],
      tertiary: r.darkViolet[800],
      quaternary: r.darkViolet[700],
      quinary: r.darkViolet[600]
    },
    border: {
      default: r.darkViolet[400],
      subtle: r.darkViolet[600],
      strong: r.darkViolet[300]
    }
  },
  // Dark Brown Theme
  darkBrown: {
    text: {
      primary: r.darkBrown[100],
      secondary: r.darkBrown[300],
      tertiary: r.darkBrown[400],
      disabled: r.darkBrown[500],
      link: r.orange[400],
      linkHover: r.orange[300]
    },
    surface: {
      secondary: r.darkBrown[950],
      primary: r.darkBrown[900],
      tertiary: r.darkBrown[800],
      quaternary: r.darkBrown[700],
      quinary: r.darkBrown[600]
    },
    border: {
      default: r.darkBrown[400],
      subtle: r.darkBrown[600],
      strong: r.darkBrown[300]
    }
  }
}, y = {
  palette: r,
  semantic: e,
  component: a,
  darkMode: t,
  darkThemes: o
};
export {
  y as colors,
  a as component,
  t as darkMode,
  o as darkThemes,
  y as default,
  r as palette,
  e as semantic
};
//# sourceMappingURL=colors.js.map
