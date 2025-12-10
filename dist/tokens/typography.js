const n = {
  sans: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
  mono: "'D2Coding', 'D2 Coding', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace"
}, e = {
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
}, l = {
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
}, t = {
  tight: "-0.25px",
  normal: "0px",
  wide: "0.1px",
  wider: "0.5px",
  widest: "1.5px"
}, a = {
  // Display
  display: {
    large: {
      fontSize: i.display.large,
      lineHeight: l.display.large,
      fontWeight: e.bold,
      letterSpacing: t.tight
    },
    medium: {
      fontSize: i.display.medium,
      lineHeight: l.display.medium,
      fontWeight: e.bold,
      letterSpacing: t.normal
    },
    small: {
      fontSize: i.display.small,
      lineHeight: l.display.small,
      fontWeight: e.bold,
      letterSpacing: t.normal
    }
  },
  // Heading
  heading: {
    1: {
      fontSize: i.heading[1],
      lineHeight: l.heading[1],
      fontWeight: e.bold,
      letterSpacing: t.normal
    },
    2: {
      fontSize: i.heading[2],
      lineHeight: l.heading[2],
      fontWeight: e.semibold,
      letterSpacing: t.normal
    },
    3: {
      fontSize: i.heading[3],
      lineHeight: l.heading[3],
      fontWeight: e.semibold,
      letterSpacing: t.normal
    },
    4: {
      fontSize: i.heading[4],
      lineHeight: l.heading[4],
      fontWeight: e.semibold,
      letterSpacing: t.normal
    },
    5: {
      fontSize: i.heading[5],
      lineHeight: l.heading[5],
      fontWeight: e.semibold,
      letterSpacing: t.normal
    },
    6: {
      fontSize: i.heading[6],
      lineHeight: l.heading[6],
      fontWeight: e.semibold,
      letterSpacing: t.normal
    }
  },
  // Body
  body: {
    large: {
      fontSize: i.body.large,
      lineHeight: l.body.large,
      fontWeight: e.regular,
      letterSpacing: t.normal
    },
    medium: {
      fontSize: i.body.medium,
      lineHeight: l.body.medium,
      fontWeight: e.regular,
      letterSpacing: t.normal
    },
    small: {
      fontSize: i.body.small,
      lineHeight: l.body.small,
      fontWeight: e.regular,
      letterSpacing: t.normal
    }
  },
  // Label
  label: {
    large: {
      fontSize: i.label.large,
      lineHeight: l.label.large,
      fontWeight: e.medium,
      letterSpacing: t.normal
    },
    medium: {
      fontSize: i.label.medium,
      lineHeight: l.label.medium,
      fontWeight: e.medium,
      letterSpacing: t.normal
    },
    small: {
      fontSize: i.label.small,
      lineHeight: l.label.small,
      fontWeight: e.medium,
      letterSpacing: t.normal
    }
  },
  // Caption
  caption: {
    fontSize: i.caption,
    lineHeight: l.caption,
    fontWeight: e.regular,
    letterSpacing: t.normal
  },
  // Overline
  overline: {
    fontSize: i.overline,
    lineHeight: l.overline,
    fontWeight: e.medium,
    letterSpacing: t.widest
  },
  // Code
  code: {
    large: {
      fontSize: i.code.large,
      lineHeight: l.code.large,
      fontWeight: e.regular,
      letterSpacing: t.normal,
      fontFamily: n.mono
    },
    medium: {
      fontSize: i.code.medium,
      lineHeight: l.code.medium,
      fontWeight: e.regular,
      letterSpacing: t.normal,
      fontFamily: n.mono
    },
    small: {
      fontSize: i.code.small,
      lineHeight: l.code.small,
      fontWeight: e.regular,
      letterSpacing: t.normal,
      fontFamily: n.mono
    }
  }
}, o = {
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
}, g = {
  fontFamily: n,
  fontWeight: e,
  fontSize: i,
  lineHeight: l,
  letterSpacing: t,
  typography: a,
  mobileTypography: o
};
export {
  g as default,
  n as fontFamily,
  i as fontSize,
  e as fontWeight,
  t as letterSpacing,
  l as lineHeight,
  o as mobileTypography,
  a as typography
};
//# sourceMappingURL=typography.js.map
