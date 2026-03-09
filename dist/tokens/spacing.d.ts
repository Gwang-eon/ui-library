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
export declare const spacing: {
    readonly 0: "0px";
    readonly 1: "4px";
    readonly 2: "8px";
    readonly 3: "12px";
    readonly 4: "16px";
    readonly 5: "20px";
    readonly 6: "24px";
    readonly 8: "32px";
    readonly 10: "40px";
    readonly 12: "48px";
    readonly 16: "64px";
    readonly 20: "80px";
    readonly 24: "96px";
    readonly 32: "128px";
};
export declare const componentSpacing: {
    readonly button: {
        readonly paddingY: "8px";
        readonly paddingX: "16px";
        readonly gap: "8px";
    };
    readonly input: {
        readonly paddingY: "12px";
        readonly paddingX: "16px";
    };
    readonly card: {
        readonly padding: "24px";
        readonly gap: "16px";
    };
    readonly modal: {
        readonly padding: "24px";
        readonly header: {
            readonly paddingY: "16px";
            readonly paddingX: "24px";
        };
        readonly footer: {
            readonly paddingY: "16px";
            readonly paddingX: "24px";
        };
    };
    readonly table: {
        readonly cell: {
            readonly paddingY: "12px";
            readonly paddingX: "16px";
        };
        readonly header: {
            readonly paddingY: "16px";
            readonly paddingX: "16px";
        };
    };
    readonly list: {
        readonly item: {
            readonly paddingY: "12px";
            readonly paddingX: "16px";
        };
        readonly gap: "8px";
    };
};
export declare const grid: {
    readonly desktop: {
        readonly columns: 12;
        readonly gutter: "24px";
        readonly margin: "48px";
        readonly maxWidth: "1184px";
    };
    readonly wideDesktop: {
        readonly columns: 12;
        readonly gutter: "24px";
        readonly margin: "48px";
        readonly maxWidth: "1920px";
    };
    readonly tablet: {
        readonly columns: 8;
        readonly gutter: "24px";
        readonly margin: "32px";
        readonly maxWidth: "100%";
    };
    readonly mobile: {
        readonly columns: 4;
        readonly gutter: "16px";
        readonly margin: "16px";
        readonly maxWidth: "100%";
    };
};
export declare const breakpoints: {
    readonly mobile: "0px";
    readonly tablet: "768px";
    readonly desktop: "1280px";
    readonly wide: "1920px";
};
export declare const mobileSpacing: {
    readonly xs: "8px";
    readonly sm: "12px";
    readonly md: "16px";
    readonly lg: "24px";
    readonly xl: "32px";
};
export declare const mobile: {
    readonly touchTargetMin: "44px";
    readonly buttonHeight: "48px";
    readonly inputHeight: "48px";
    readonly navHeight: "56px";
    readonly tabHeight: "48px";
    readonly safeArea: {
        readonly top: "env(safe-area-inset-top)";
        readonly bottom: "env(safe-area-inset-bottom)";
        readonly left: "env(safe-area-inset-left)";
        readonly right: "env(safe-area-inset-right)";
    };
    readonly gestures: {
        readonly swipeThreshold: "60px";
        readonly swipeVelocity: 0.3;
        readonly pullDistance: "80px";
        readonly longPressDuration: "500ms";
    };
    readonly bottomSheet: {
        readonly peekHeight: "80px";
        readonly halfHeight: "50vh";
        readonly fullHeight: "90vh";
        readonly dragIndicatorWidth: "40px";
        readonly dragIndicatorHeight: "4px";
        readonly borderRadius: "16px";
        readonly backdropBlur: "4px";
    };
    readonly fab: {
        readonly sizeStandard: "56px";
        readonly sizeMini: "40px";
        readonly sizeExtendedHeight: "48px";
        readonly borderRadius: "50%";
        readonly extendedBorderRadius: "24px";
        readonly offset: "16px";
        readonly offsetWithNav: "72px";
    };
    readonly nav: {
        readonly itemSize: "56px";
        readonly iconSize: "24px";
        readonly labelSize: "12px";
    };
    readonly swipeAction: {
        readonly width: "80px";
        readonly iconSize: "24px";
    };
    readonly actionSheet: {
        readonly itemHeight: "56px";
        readonly borderRadius: "16px";
        readonly backdropBlur: "8px";
        readonly maxHeight: "80vh";
    };
    readonly pullToRefresh: {
        readonly height: "60px";
        readonly spinnerSize: "24px";
        readonly threshold: "80px";
    };
    readonly modal: {
        readonly maxWidth: "calc(100vw - 32px)";
        readonly maxHeight: "calc(100vh - 64px)";
        readonly borderRadius: "12px";
    };
    readonly card: {
        readonly padding: "16px";
        readonly gap: "12px";
        readonly borderRadius: "8px";
    };
    readonly input: {
        readonly paddingY: "14px";
        readonly paddingX: "16px";
        readonly borderRadius: "8px";
        readonly fontSize: "16px";
    };
    readonly table: {
        readonly cellPadding: "12px";
        readonly rowHeight: "56px";
    };
};
export declare const radius: {
    readonly sm: "2px";
    readonly base: "4px";
    readonly md: "6px";
    readonly lg: "8px";
    readonly xl: "12px";
    readonly full: "9999px";
};
export declare const zIndex: {
    readonly base: 1;
    readonly raised: 10;
    readonly dropdown: 1000;
    readonly sticky: 1100;
    readonly overlay: 1200;
    readonly drawer: 1300;
    readonly modalBackdrop: 1400;
    readonly modal: 1410;
    readonly popover: 1500;
    readonly toast: 1600;
    readonly tooltip: 1700;
    readonly max: 9999;
};
declare const _default: {
    readonly spacing: {
        readonly 0: "0px";
        readonly 1: "4px";
        readonly 2: "8px";
        readonly 3: "12px";
        readonly 4: "16px";
        readonly 5: "20px";
        readonly 6: "24px";
        readonly 8: "32px";
        readonly 10: "40px";
        readonly 12: "48px";
        readonly 16: "64px";
        readonly 20: "80px";
        readonly 24: "96px";
        readonly 32: "128px";
    };
    readonly componentSpacing: {
        readonly button: {
            readonly paddingY: "8px";
            readonly paddingX: "16px";
            readonly gap: "8px";
        };
        readonly input: {
            readonly paddingY: "12px";
            readonly paddingX: "16px";
        };
        readonly card: {
            readonly padding: "24px";
            readonly gap: "16px";
        };
        readonly modal: {
            readonly padding: "24px";
            readonly header: {
                readonly paddingY: "16px";
                readonly paddingX: "24px";
            };
            readonly footer: {
                readonly paddingY: "16px";
                readonly paddingX: "24px";
            };
        };
        readonly table: {
            readonly cell: {
                readonly paddingY: "12px";
                readonly paddingX: "16px";
            };
            readonly header: {
                readonly paddingY: "16px";
                readonly paddingX: "16px";
            };
        };
        readonly list: {
            readonly item: {
                readonly paddingY: "12px";
                readonly paddingX: "16px";
            };
            readonly gap: "8px";
        };
    };
    readonly grid: {
        readonly desktop: {
            readonly columns: 12;
            readonly gutter: "24px";
            readonly margin: "48px";
            readonly maxWidth: "1184px";
        };
        readonly wideDesktop: {
            readonly columns: 12;
            readonly gutter: "24px";
            readonly margin: "48px";
            readonly maxWidth: "1920px";
        };
        readonly tablet: {
            readonly columns: 8;
            readonly gutter: "24px";
            readonly margin: "32px";
            readonly maxWidth: "100%";
        };
        readonly mobile: {
            readonly columns: 4;
            readonly gutter: "16px";
            readonly margin: "16px";
            readonly maxWidth: "100%";
        };
    };
    readonly breakpoints: {
        readonly mobile: "0px";
        readonly tablet: "768px";
        readonly desktop: "1280px";
        readonly wide: "1920px";
    };
    readonly mobileSpacing: {
        readonly xs: "8px";
        readonly sm: "12px";
        readonly md: "16px";
        readonly lg: "24px";
        readonly xl: "32px";
    };
    readonly mobile: {
        readonly touchTargetMin: "44px";
        readonly buttonHeight: "48px";
        readonly inputHeight: "48px";
        readonly navHeight: "56px";
        readonly tabHeight: "48px";
        readonly safeArea: {
            readonly top: "env(safe-area-inset-top)";
            readonly bottom: "env(safe-area-inset-bottom)";
            readonly left: "env(safe-area-inset-left)";
            readonly right: "env(safe-area-inset-right)";
        };
        readonly gestures: {
            readonly swipeThreshold: "60px";
            readonly swipeVelocity: 0.3;
            readonly pullDistance: "80px";
            readonly longPressDuration: "500ms";
        };
        readonly bottomSheet: {
            readonly peekHeight: "80px";
            readonly halfHeight: "50vh";
            readonly fullHeight: "90vh";
            readonly dragIndicatorWidth: "40px";
            readonly dragIndicatorHeight: "4px";
            readonly borderRadius: "16px";
            readonly backdropBlur: "4px";
        };
        readonly fab: {
            readonly sizeStandard: "56px";
            readonly sizeMini: "40px";
            readonly sizeExtendedHeight: "48px";
            readonly borderRadius: "50%";
            readonly extendedBorderRadius: "24px";
            readonly offset: "16px";
            readonly offsetWithNav: "72px";
        };
        readonly nav: {
            readonly itemSize: "56px";
            readonly iconSize: "24px";
            readonly labelSize: "12px";
        };
        readonly swipeAction: {
            readonly width: "80px";
            readonly iconSize: "24px";
        };
        readonly actionSheet: {
            readonly itemHeight: "56px";
            readonly borderRadius: "16px";
            readonly backdropBlur: "8px";
            readonly maxHeight: "80vh";
        };
        readonly pullToRefresh: {
            readonly height: "60px";
            readonly spinnerSize: "24px";
            readonly threshold: "80px";
        };
        readonly modal: {
            readonly maxWidth: "calc(100vw - 32px)";
            readonly maxHeight: "calc(100vh - 64px)";
            readonly borderRadius: "12px";
        };
        readonly card: {
            readonly padding: "16px";
            readonly gap: "12px";
            readonly borderRadius: "8px";
        };
        readonly input: {
            readonly paddingY: "14px";
            readonly paddingX: "16px";
            readonly borderRadius: "8px";
            readonly fontSize: "16px";
        };
        readonly table: {
            readonly cellPadding: "12px";
            readonly rowHeight: "56px";
        };
    };
    readonly radius: {
        readonly sm: "2px";
        readonly base: "4px";
        readonly md: "6px";
        readonly lg: "8px";
        readonly xl: "12px";
        readonly full: "9999px";
    };
    readonly zIndex: {
        readonly base: 1;
        readonly raised: 10;
        readonly dropdown: 1000;
        readonly sticky: 1100;
        readonly overlay: 1200;
        readonly drawer: 1300;
        readonly modalBackdrop: 1400;
        readonly modal: 1410;
        readonly popover: 1500;
        readonly toast: 1600;
        readonly tooltip: 1700;
        readonly max: 9999;
    };
};
export default _default;
