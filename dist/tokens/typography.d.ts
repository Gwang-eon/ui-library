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
export declare const fontFamily: {
    readonly sans: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif";
    readonly mono: "'D2Coding', 'D2 Coding', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace";
};
export declare const fontWeight: {
    readonly thin: 100;
    readonly extralight: 200;
    readonly light: 300;
    readonly regular: 400;
    readonly medium: 500;
    readonly semibold: 600;
    readonly bold: 700;
    readonly extrabold: 800;
    readonly black: 900;
};
export declare const fontSize: {
    readonly display: {
        readonly large: "57px";
        readonly medium: "45px";
        readonly small: "36px";
    };
    readonly heading: {
        readonly 1: "32px";
        readonly 2: "28px";
        readonly 3: "24px";
        readonly 4: "20px";
        readonly 5: "18px";
        readonly 6: "16px";
    };
    readonly body: {
        readonly large: "16px";
        readonly medium: "14px";
        readonly small: "12px";
    };
    readonly label: {
        readonly large: "14px";
        readonly medium: "12px";
        readonly small: "11px";
    };
    readonly caption: "12px";
    readonly overline: "12px";
    readonly code: {
        readonly large: "14px";
        readonly medium: "13px";
        readonly small: "12px";
    };
};
export declare const lineHeight: {
    readonly display: {
        readonly large: "64px";
        readonly medium: "52px";
        readonly small: "44px";
    };
    readonly heading: {
        readonly 1: "40px";
        readonly 2: "36px";
        readonly 3: "32px";
        readonly 4: "28px";
        readonly 5: "24px";
        readonly 6: "24px";
    };
    readonly body: {
        readonly large: "24px";
        readonly medium: "20px";
        readonly small: "16px";
    };
    readonly label: {
        readonly large: "20px";
        readonly medium: "16px";
        readonly small: "16px";
    };
    readonly caption: "16px";
    readonly overline: "16px";
    readonly code: {
        readonly large: "20px";
        readonly medium: "18px";
        readonly small: "16px";
    };
};
export declare const letterSpacing: {
    readonly tight: "-0.25px";
    readonly normal: "0px";
    readonly wide: "0.1px";
    readonly wider: "0.5px";
    readonly widest: "1.5px";
};
export declare const typography: {
    readonly display: {
        readonly large: {
            readonly fontSize: "57px";
            readonly lineHeight: "64px";
            readonly fontWeight: 700;
            readonly letterSpacing: "-0.25px";
        };
        readonly medium: {
            readonly fontSize: "45px";
            readonly lineHeight: "52px";
            readonly fontWeight: 700;
            readonly letterSpacing: "0px";
        };
        readonly small: {
            readonly fontSize: "36px";
            readonly lineHeight: "44px";
            readonly fontWeight: 700;
            readonly letterSpacing: "0px";
        };
    };
    readonly heading: {
        readonly 1: {
            readonly fontSize: "32px";
            readonly lineHeight: "40px";
            readonly fontWeight: 700;
            readonly letterSpacing: "0px";
        };
        readonly 2: {
            readonly fontSize: "28px";
            readonly lineHeight: "36px";
            readonly fontWeight: 600;
            readonly letterSpacing: "0px";
        };
        readonly 3: {
            readonly fontSize: "24px";
            readonly lineHeight: "32px";
            readonly fontWeight: 600;
            readonly letterSpacing: "0px";
        };
        readonly 4: {
            readonly fontSize: "20px";
            readonly lineHeight: "28px";
            readonly fontWeight: 600;
            readonly letterSpacing: "0px";
        };
        readonly 5: {
            readonly fontSize: "18px";
            readonly lineHeight: "24px";
            readonly fontWeight: 600;
            readonly letterSpacing: "0px";
        };
        readonly 6: {
            readonly fontSize: "16px";
            readonly lineHeight: "24px";
            readonly fontWeight: 600;
            readonly letterSpacing: "0px";
        };
    };
    readonly body: {
        readonly large: {
            readonly fontSize: "16px";
            readonly lineHeight: "24px";
            readonly fontWeight: 400;
            readonly letterSpacing: "0px";
        };
        readonly medium: {
            readonly fontSize: "14px";
            readonly lineHeight: "20px";
            readonly fontWeight: 400;
            readonly letterSpacing: "0px";
        };
        readonly small: {
            readonly fontSize: "12px";
            readonly lineHeight: "16px";
            readonly fontWeight: 400;
            readonly letterSpacing: "0px";
        };
    };
    readonly label: {
        readonly large: {
            readonly fontSize: "14px";
            readonly lineHeight: "20px";
            readonly fontWeight: 500;
            readonly letterSpacing: "0px";
        };
        readonly medium: {
            readonly fontSize: "12px";
            readonly lineHeight: "16px";
            readonly fontWeight: 500;
            readonly letterSpacing: "0px";
        };
        readonly small: {
            readonly fontSize: "11px";
            readonly lineHeight: "16px";
            readonly fontWeight: 500;
            readonly letterSpacing: "0px";
        };
    };
    readonly caption: {
        readonly fontSize: "12px";
        readonly lineHeight: "16px";
        readonly fontWeight: 400;
        readonly letterSpacing: "0px";
    };
    readonly overline: {
        readonly fontSize: "12px";
        readonly lineHeight: "16px";
        readonly fontWeight: 500;
        readonly letterSpacing: "1.5px";
    };
    readonly code: {
        readonly large: {
            readonly fontSize: "14px";
            readonly lineHeight: "20px";
            readonly fontWeight: 400;
            readonly letterSpacing: "0px";
            readonly fontFamily: "'D2Coding', 'D2 Coding', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace";
        };
        readonly medium: {
            readonly fontSize: "13px";
            readonly lineHeight: "18px";
            readonly fontWeight: 400;
            readonly letterSpacing: "0px";
            readonly fontFamily: "'D2Coding', 'D2 Coding', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace";
        };
        readonly small: {
            readonly fontSize: "12px";
            readonly lineHeight: "16px";
            readonly fontWeight: 400;
            readonly letterSpacing: "0px";
            readonly fontFamily: "'D2Coding', 'D2 Coding', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace";
        };
    };
};
export declare const mobileTypography: {
    readonly fontSize: {
        readonly xs: "12px";
        readonly sm: "14px";
        readonly base: "16px";
        readonly lg: "18px";
        readonly xl: "20px";
    };
    readonly lineHeight: {
        readonly tight: 1.3;
        readonly normal: 1.5;
        readonly relaxed: 1.625;
    };
};
declare const _default: {
    readonly fontFamily: {
        readonly sans: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif";
        readonly mono: "'D2Coding', 'D2 Coding', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace";
    };
    readonly fontWeight: {
        readonly thin: 100;
        readonly extralight: 200;
        readonly light: 300;
        readonly regular: 400;
        readonly medium: 500;
        readonly semibold: 600;
        readonly bold: 700;
        readonly extrabold: 800;
        readonly black: 900;
    };
    readonly fontSize: {
        readonly display: {
            readonly large: "57px";
            readonly medium: "45px";
            readonly small: "36px";
        };
        readonly heading: {
            readonly 1: "32px";
            readonly 2: "28px";
            readonly 3: "24px";
            readonly 4: "20px";
            readonly 5: "18px";
            readonly 6: "16px";
        };
        readonly body: {
            readonly large: "16px";
            readonly medium: "14px";
            readonly small: "12px";
        };
        readonly label: {
            readonly large: "14px";
            readonly medium: "12px";
            readonly small: "11px";
        };
        readonly caption: "12px";
        readonly overline: "12px";
        readonly code: {
            readonly large: "14px";
            readonly medium: "13px";
            readonly small: "12px";
        };
    };
    readonly lineHeight: {
        readonly display: {
            readonly large: "64px";
            readonly medium: "52px";
            readonly small: "44px";
        };
        readonly heading: {
            readonly 1: "40px";
            readonly 2: "36px";
            readonly 3: "32px";
            readonly 4: "28px";
            readonly 5: "24px";
            readonly 6: "24px";
        };
        readonly body: {
            readonly large: "24px";
            readonly medium: "20px";
            readonly small: "16px";
        };
        readonly label: {
            readonly large: "20px";
            readonly medium: "16px";
            readonly small: "16px";
        };
        readonly caption: "16px";
        readonly overline: "16px";
        readonly code: {
            readonly large: "20px";
            readonly medium: "18px";
            readonly small: "16px";
        };
    };
    readonly letterSpacing: {
        readonly tight: "-0.25px";
        readonly normal: "0px";
        readonly wide: "0.1px";
        readonly wider: "0.5px";
        readonly widest: "1.5px";
    };
    readonly typography: {
        readonly display: {
            readonly large: {
                readonly fontSize: "57px";
                readonly lineHeight: "64px";
                readonly fontWeight: 700;
                readonly letterSpacing: "-0.25px";
            };
            readonly medium: {
                readonly fontSize: "45px";
                readonly lineHeight: "52px";
                readonly fontWeight: 700;
                readonly letterSpacing: "0px";
            };
            readonly small: {
                readonly fontSize: "36px";
                readonly lineHeight: "44px";
                readonly fontWeight: 700;
                readonly letterSpacing: "0px";
            };
        };
        readonly heading: {
            readonly 1: {
                readonly fontSize: "32px";
                readonly lineHeight: "40px";
                readonly fontWeight: 700;
                readonly letterSpacing: "0px";
            };
            readonly 2: {
                readonly fontSize: "28px";
                readonly lineHeight: "36px";
                readonly fontWeight: 600;
                readonly letterSpacing: "0px";
            };
            readonly 3: {
                readonly fontSize: "24px";
                readonly lineHeight: "32px";
                readonly fontWeight: 600;
                readonly letterSpacing: "0px";
            };
            readonly 4: {
                readonly fontSize: "20px";
                readonly lineHeight: "28px";
                readonly fontWeight: 600;
                readonly letterSpacing: "0px";
            };
            readonly 5: {
                readonly fontSize: "18px";
                readonly lineHeight: "24px";
                readonly fontWeight: 600;
                readonly letterSpacing: "0px";
            };
            readonly 6: {
                readonly fontSize: "16px";
                readonly lineHeight: "24px";
                readonly fontWeight: 600;
                readonly letterSpacing: "0px";
            };
        };
        readonly body: {
            readonly large: {
                readonly fontSize: "16px";
                readonly lineHeight: "24px";
                readonly fontWeight: 400;
                readonly letterSpacing: "0px";
            };
            readonly medium: {
                readonly fontSize: "14px";
                readonly lineHeight: "20px";
                readonly fontWeight: 400;
                readonly letterSpacing: "0px";
            };
            readonly small: {
                readonly fontSize: "12px";
                readonly lineHeight: "16px";
                readonly fontWeight: 400;
                readonly letterSpacing: "0px";
            };
        };
        readonly label: {
            readonly large: {
                readonly fontSize: "14px";
                readonly lineHeight: "20px";
                readonly fontWeight: 500;
                readonly letterSpacing: "0px";
            };
            readonly medium: {
                readonly fontSize: "12px";
                readonly lineHeight: "16px";
                readonly fontWeight: 500;
                readonly letterSpacing: "0px";
            };
            readonly small: {
                readonly fontSize: "11px";
                readonly lineHeight: "16px";
                readonly fontWeight: 500;
                readonly letterSpacing: "0px";
            };
        };
        readonly caption: {
            readonly fontSize: "12px";
            readonly lineHeight: "16px";
            readonly fontWeight: 400;
            readonly letterSpacing: "0px";
        };
        readonly overline: {
            readonly fontSize: "12px";
            readonly lineHeight: "16px";
            readonly fontWeight: 500;
            readonly letterSpacing: "1.5px";
        };
        readonly code: {
            readonly large: {
                readonly fontSize: "14px";
                readonly lineHeight: "20px";
                readonly fontWeight: 400;
                readonly letterSpacing: "0px";
                readonly fontFamily: "'D2Coding', 'D2 Coding', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace";
            };
            readonly medium: {
                readonly fontSize: "13px";
                readonly lineHeight: "18px";
                readonly fontWeight: 400;
                readonly letterSpacing: "0px";
                readonly fontFamily: "'D2Coding', 'D2 Coding', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace";
            };
            readonly small: {
                readonly fontSize: "12px";
                readonly lineHeight: "16px";
                readonly fontWeight: 400;
                readonly letterSpacing: "0px";
                readonly fontFamily: "'D2Coding', 'D2 Coding', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace";
            };
        };
    };
    readonly mobileTypography: {
        readonly fontSize: {
            readonly xs: "12px";
            readonly sm: "14px";
            readonly base: "16px";
            readonly lg: "18px";
            readonly xl: "20px";
        };
        readonly lineHeight: {
            readonly tight: 1.3;
            readonly normal: 1.5;
            readonly relaxed: 1.625;
        };
    };
};
export default _default;
