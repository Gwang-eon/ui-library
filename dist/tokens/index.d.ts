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
export { default as colors, palette, semantic, component, darkMode, darkThemes } from './colors';
export { default as spacing, componentSpacing, grid, breakpoints, mobileSpacing, mobile, radius, zIndex } from './spacing';
export { default as typography, fontFamily, fontWeight, fontSize, lineHeight, letterSpacing, mobileTypography } from './typography';
export { default as motion, duration, easing, componentMotion, iotMotion, mobileMotion } from './motion';
export { default as shadows, lightShadows, darkShadows, componentShadows } from './shadows';
export declare const tokens: {
    readonly colors: {
        readonly palette: {
            readonly blue: {
                readonly 50: "#E3F2FD";
                readonly 100: "#BBDEFB";
                readonly 200: "#90CAF9";
                readonly 300: "#64B5F6";
                readonly 400: "#42A5F5";
                readonly 500: "#2196F3";
                readonly 600: "#1E88E5";
                readonly 700: "#1976D2";
                readonly 800: "#1565C0";
                readonly 900: "#0D47A1";
                readonly 950: "#082F66";
            };
            readonly green: {
                readonly 50: "#E8F5E9";
                readonly 100: "#C8E6C9";
                readonly 200: "#A5D6A7";
                readonly 300: "#81C784";
                readonly 400: "#66BB6A";
                readonly 500: "#4CAF50";
                readonly 600: "#43A047";
                readonly 700: "#388E3C";
                readonly 800: "#2E7D32";
                readonly 900: "#1B5E20";
                readonly 950: "#0D3C14";
            };
            readonly red: {
                readonly 50: "#FFEBEE";
                readonly 100: "#FFCDD2";
                readonly 200: "#EF9A9A";
                readonly 300: "#E57373";
                readonly 400: "#EF5350";
                readonly 500: "#F44336";
                readonly 600: "#E53935";
                readonly 700: "#D32F2F";
                readonly 800: "#C62828";
                readonly 900: "#B71C1C";
                readonly 950: "#7F1212";
            };
            readonly orange: {
                readonly 50: "#FFF3E0";
                readonly 100: "#FFE0B2";
                readonly 200: "#FFCC80";
                readonly 300: "#FFB74D";
                readonly 400: "#FFA726";
                readonly 500: "#FF9800";
                readonly 600: "#FB8C00";
                readonly 700: "#F57C00";
                readonly 800: "#EF6C00";
                readonly 900: "#E65100";
                readonly 950: "#A13900";
            };
            readonly lightBlue: {
                readonly 50: "#E1F5FE";
                readonly 100: "#B3E5FC";
                readonly 200: "#81D4FA";
                readonly 300: "#4FC3F7";
                readonly 400: "#29B6F6";
                readonly 500: "#03A9F4";
                readonly 600: "#039BE5";
                readonly 700: "#0288D1";
                readonly 800: "#0277BD";
                readonly 900: "#01579B";
                readonly 950: "#013A66";
            };
            readonly purple: {
                readonly 50: "#F3E5F5";
                readonly 100: "#E1BEE7";
                readonly 200: "#CE93D8";
                readonly 300: "#BA68C8";
                readonly 400: "#AB47BC";
                readonly 500: "#9C27B0";
                readonly 600: "#8E24AA";
                readonly 700: "#7B1FA2";
                readonly 800: "#6A1B9A";
                readonly 900: "#4A148C";
                readonly 950: "#2E0C57";
            };
            readonly teal: {
                readonly 50: "#E0F2F1";
                readonly 100: "#B2DFDB";
                readonly 200: "#80CBC4";
                readonly 300: "#4DB6AC";
                readonly 400: "#26A69A";
                readonly 500: "#009688";
                readonly 600: "#00897B";
                readonly 700: "#00796B";
                readonly 800: "#00695C";
                readonly 900: "#004D40";
                readonly 950: "#00332A";
            };
            readonly grey: {
                readonly 50: "#F9FAFB";
                readonly 100: "#F3F4F6";
                readonly 200: "#E5E7EB";
                readonly 300: "#D1D5DB";
                readonly 400: "#BDBDBD";
                readonly 500: "#9E9E9E";
                readonly 600: "#757575";
                readonly 700: "#616161";
                readonly 750: "#4A4A4A";
                readonly 800: "#424242";
                readonly 850: "#333333";
                readonly 900: "#212121";
            };
            readonly warmGrey: {
                readonly 50: "#FAFAF9";
                readonly 100: "#F5F5F4";
                readonly 200: "#E7E5E4";
                readonly 300: "#D6D3D1";
                readonly 400: "#A8A29E";
                readonly 500: "#78716C";
                readonly 600: "#57534E";
                readonly 700: "#44403C";
                readonly 750: "#38342F";
                readonly 800: "#292524";
                readonly 850: "#1F1D1C";
                readonly 900: "#1C1917";
            };
            readonly coolGrey: {
                readonly 50: "#F8FAFC";
                readonly 100: "#F1F5F9";
                readonly 200: "#E2E8F0";
                readonly 300: "#CBD5E1";
                readonly 400: "#94A3B8";
                readonly 500: "#64748B";
                readonly 600: "#475569";
                readonly 700: "#334155";
                readonly 750: "#293548";
                readonly 800: "#1E293B";
                readonly 850: "#15202E";
                readonly 900: "#0F172A";
            };
            readonly darkBlue: {
                readonly 50: "#E8EDF2";
                readonly 100: "#C5D3E0";
                readonly 200: "#9FB7CC";
                readonly 300: "#789AB8";
                readonly 400: "#5B84A8";
                readonly 500: "#3E6E99";
                readonly 600: "#386691";
                readonly 700: "#2F5B86";
                readonly 800: "#27507C";
                readonly 900: "#1A3D6B";
                readonly 950: "#0D1F35";
            };
            readonly darkGreen: {
                readonly 50: "#E7F5F0";
                readonly 100: "#C3E6D9";
                readonly 200: "#9BD6C0";
                readonly 300: "#73C5A6";
                readonly 400: "#55B993";
                readonly 500: "#37AC80";
                readonly 600: "#319F78";
                readonly 700: "#2A906D";
                readonly 800: "#238163";
                readonly 900: "#166450";
                readonly 950: "#0B3228";
            };
            readonly darkViolet: {
                readonly 50: "#EEE8F5";
                readonly 100: "#D4C6E6";
                readonly 200: "#B8A0D6";
                readonly 300: "#9C7AC5";
                readonly 400: "#875EB8";
                readonly 500: "#7242AB";
                readonly 600: "#6A3CA4";
                readonly 700: "#5F339A";
                readonly 800: "#552B91";
                readonly 900: "#421D80";
                readonly 950: "#210F40";
            };
            readonly darkBrown: {
                readonly 50: "#F2EDE8";
                readonly 100: "#DFD2C5";
                readonly 200: "#CAB49F";
                readonly 300: "#B59678";
                readonly 400: "#A57F5B";
                readonly 500: "#96693E";
                readonly 600: "#8E6138";
                readonly 700: "#835630";
                readonly 800: "#794C28";
                readonly 900: "#68391B";
                readonly 950: "#341D0E";
            };
            readonly white: "#FFFFFF";
            readonly black: "#000000";
        };
        readonly semantic: {
            readonly primary: {
                readonly 50: "#E3F2FD";
                readonly 100: "#BBDEFB";
                readonly 200: "#90CAF9";
                readonly 300: "#64B5F6";
                readonly 400: "#42A5F5";
                readonly 500: "#2196F3";
                readonly 600: "#1E88E5";
                readonly 700: "#1976D2";
                readonly 800: "#1565C0";
                readonly 900: "#0D47A1";
                readonly 950: "#082F66";
            };
            readonly secondary: {
                readonly 50: "#E0F2F1";
                readonly 100: "#B2DFDB";
                readonly 200: "#80CBC4";
                readonly 300: "#4DB6AC";
                readonly 400: "#26A69A";
                readonly 500: "#009688";
                readonly 600: "#00897B";
                readonly 700: "#00796B";
                readonly 800: "#00695C";
                readonly 900: "#004D40";
                readonly 950: "#00332A";
            };
            readonly success: {
                readonly 50: "#E8F5E9";
                readonly 100: "#C8E6C9";
                readonly 200: "#A5D6A7";
                readonly 300: "#81C784";
                readonly 400: "#66BB6A";
                readonly 500: "#4CAF50";
                readonly 600: "#43A047";
                readonly 700: "#388E3C";
                readonly 800: "#2E7D32";
                readonly 900: "#1B5E20";
                readonly 950: "#0D3C14";
            };
            readonly error: {
                readonly 50: "#FFEBEE";
                readonly 100: "#FFCDD2";
                readonly 200: "#EF9A9A";
                readonly 300: "#E57373";
                readonly 400: "#EF5350";
                readonly 500: "#F44336";
                readonly 600: "#E53935";
                readonly 700: "#D32F2F";
                readonly 800: "#C62828";
                readonly 900: "#B71C1C";
                readonly 950: "#7F1212";
            };
            readonly warning: {
                readonly 50: "#FFF3E0";
                readonly 100: "#FFE0B2";
                readonly 200: "#FFCC80";
                readonly 300: "#FFB74D";
                readonly 400: "#FFA726";
                readonly 500: "#FF9800";
                readonly 600: "#FB8C00";
                readonly 700: "#F57C00";
                readonly 800: "#EF6C00";
                readonly 900: "#E65100";
                readonly 950: "#A13900";
            };
            readonly info: {
                readonly 50: "#E1F5FE";
                readonly 100: "#B3E5FC";
                readonly 200: "#81D4FA";
                readonly 300: "#4FC3F7";
                readonly 400: "#29B6F6";
                readonly 500: "#03A9F4";
                readonly 600: "#039BE5";
                readonly 700: "#0288D1";
                readonly 800: "#0277BD";
                readonly 900: "#01579B";
                readonly 950: "#013A66";
            };
            readonly gray: {
                readonly 50: "#F9FAFB";
                readonly 100: "#F3F4F6";
                readonly 200: "#E5E7EB";
                readonly 300: "#D1D5DB";
                readonly 400: "#BDBDBD";
                readonly 500: "#9E9E9E";
                readonly 600: "#757575";
                readonly 700: "#616161";
                readonly 800: "#424242";
                readonly 900: "#212121";
            };
            readonly warmGray: {
                readonly 50: "#FAFAF9";
                readonly 100: "#F5F5F4";
                readonly 200: "#E7E5E4";
                readonly 300: "#D6D3D1";
                readonly 400: "#A8A29E";
                readonly 500: "#78716C";
                readonly 600: "#57534E";
                readonly 700: "#44403C";
                readonly 800: "#292524";
                readonly 900: "#1C1917";
            };
            readonly coolGray: {
                readonly 50: "#F8FAFC";
                readonly 100: "#F1F5F9";
                readonly 200: "#E2E8F0";
                readonly 300: "#CBD5E1";
                readonly 400: "#94A3B8";
                readonly 500: "#64748B";
                readonly 600: "#475569";
                readonly 700: "#334155";
                readonly 800: "#1E293B";
                readonly 900: "#0F172A";
            };
        };
        readonly component: {
            readonly button: {
                readonly primary: {
                    readonly bg: "#2196F3";
                    readonly bgHover: "#1E88E5";
                    readonly bgActive: "#1976D2";
                    readonly text: "#FFFFFF";
                };
                readonly secondary: {
                    readonly bg: "transparent";
                    readonly border: "#2196F3";
                    readonly text: "#2196F3";
                    readonly textHover: "#1E88E5";
                };
                readonly danger: {
                    readonly bg: "#F44336";
                    readonly bgHover: "#E53935";
                    readonly text: "#FFFFFF";
                };
                readonly success: {
                    readonly bg: "#4CAF50";
                    readonly bgHover: "#43A047";
                    readonly text: "#FFFFFF";
                };
                readonly warning: {
                    readonly bg: "#FF9800";
                    readonly bgHover: "#FB8C00";
                    readonly text: "#FFFFFF";
                };
                readonly info: {
                    readonly bg: "#03A9F4";
                    readonly bgHover: "#039BE5";
                    readonly text: "#FFFFFF";
                };
            };
            readonly input: {
                readonly bg: "#FFFFFF";
                readonly border: "#BDBDBD";
                readonly borderHover: "#9E9E9E";
                readonly borderFocus: "#2196F3";
                readonly text: "#212121";
                readonly placeholder: "#9E9E9E";
                readonly disabled: {
                    readonly bg: "#F3F4F6";
                    readonly border: "#E5E7EB";
                    readonly text: "#BDBDBD";
                };
                readonly readonly: {
                    readonly bg: "#F9FAFB";
                    readonly border: "#D1D5DB";
                    readonly text: "#616161";
                };
                readonly success: {
                    readonly border: "#4CAF50";
                };
                readonly warning: {
                    readonly border: "#FF9800";
                };
                readonly error: {
                    readonly border: "#F44336";
                };
                readonly info: {
                    readonly border: "#03A9F4";
                };
            };
            readonly table: {
                readonly header: {
                    readonly bg: "#F9FAFB";
                    readonly text: "#212121";
                };
                readonly row: {
                    readonly bg: "#FFFFFF";
                    readonly bgHover: "#F9FAFB";
                    readonly bgSelected: "#E3F2FD";
                    readonly bgStripe: "#F9FAFB";
                    readonly bgSum: "#F5F5F4";
                    readonly textSum: "#1C1917";
                    readonly bgSubSum: "#F1F5F9";
                    readonly textSubSum: "#0F172A";
                };
                readonly cell: {
                    readonly border: "#E5E7EB";
                };
                readonly footer: {
                    readonly bg: "#F9FAFB";
                };
            };
            readonly text: {
                readonly primary: "#212121";
                readonly secondary: "#616161";
                readonly tertiary: "#757575";
                readonly disabled: "#BDBDBD";
                readonly inverse: "#FFFFFF";
                readonly link: "#1E88E5";
                readonly linkHover: "#1976D2";
            };
            readonly surface: {
                readonly primary: "#FFFFFF";
                readonly secondary: "#F9FAFB";
                readonly tertiary: "#F3F4F6";
            };
            readonly border: {
                readonly default: "#D1D5DB";
                readonly subtle: "#E5E7EB";
                readonly strong: "#BDBDBD";
            };
            readonly status: {
                readonly online: "#4CAF50";
                readonly offline: "#9E9E9E";
                readonly error: "#F44336";
                readonly warning: "#FF9800";
                readonly syncing: "#2196F3";
            };
        };
        readonly darkMode: {
            readonly button: {
                readonly primary: {
                    readonly bg: "#1E88E5";
                    readonly bgHover: "#2196F3";
                    readonly bgActive: "#42A5F5";
                    readonly text: "#FFFFFF";
                };
                readonly secondary: {
                    readonly bg: "transparent";
                    readonly border: "#42A5F5";
                    readonly text: "#42A5F5";
                    readonly textHover: "#64B5F6";
                };
                readonly danger: {
                    readonly bg: "#E53935";
                    readonly bgHover: "#F44336";
                    readonly text: "#FFFFFF";
                };
                readonly success: {
                    readonly bg: "#43A047";
                    readonly bgHover: "#4CAF50";
                    readonly text: "#FFFFFF";
                };
                readonly warning: {
                    readonly bg: "#FB8C00";
                    readonly bgHover: "#FF9800";
                    readonly text: "#FFFFFF";
                };
                readonly info: {
                    readonly bg: "#039BE5";
                    readonly bgHover: "#03A9F4";
                    readonly text: "#FFFFFF";
                };
            };
            readonly input: {
                readonly bg: "#424242";
                readonly border: "#616161";
                readonly borderHover: "#757575";
                readonly borderFocus: "#42A5F5";
                readonly text: "#F3F4F6";
                readonly placeholder: "#9E9E9E";
                readonly disabled: {
                    readonly bg: "#212121";
                    readonly border: "#424242";
                    readonly text: "#757575";
                };
                readonly readonly: {
                    readonly bg: "#333333";
                    readonly border: "#616161";
                    readonly text: "#D1D5DB";
                };
                readonly success: {
                    readonly border: "#66BB6A";
                };
                readonly warning: {
                    readonly border: "#FFA726";
                };
                readonly error: {
                    readonly border: "#EF5350";
                };
                readonly info: {
                    readonly border: "#29B6F6";
                };
            };
            readonly table: {
                readonly header: {
                    readonly bg: "#333333";
                    readonly text: "#F3F4F6";
                };
                readonly row: {
                    readonly bg: "#212121";
                    readonly bgHover: "#424242";
                    readonly bgSelected: "#082F66";
                    readonly bgStripe: "#333333";
                    readonly bgSum: "#292524";
                    readonly textSum: "#F5F5F4";
                    readonly bgSubSum: "#1E293B";
                    readonly textSubSum: "#F1F5F9";
                };
                readonly cell: {
                    readonly border: "#616161";
                };
                readonly footer: {
                    readonly bg: "#333333";
                };
            };
            readonly text: {
                readonly primary: "#F3F4F6";
                readonly secondary: "#BDBDBD";
                readonly tertiary: "#9E9E9E";
                readonly disabled: "#9E9E9E";
                readonly inverse: "#212121";
                readonly link: "#42A5F5";
                readonly linkHover: "#64B5F6";
            };
            readonly surface: {
                readonly secondary: "#212121";
                readonly primary: "#333333";
                readonly tertiary: "#424242";
                readonly quaternary: "#4A4A4A";
                readonly quinary: "#616161";
            };
            readonly border: {
                readonly default: "#9E9E9E";
                readonly subtle: "#616161";
                readonly strong: "#BDBDBD";
            };
            readonly status: {
                readonly online: "#66BB6A";
                readonly offline: "#9E9E9E";
                readonly error: "#EF5350";
                readonly warning: "#FFA726";
                readonly syncing: "#42A5F5";
            };
        };
        readonly darkThemes: {
            readonly darkBlue: {
                readonly text: {
                    readonly primary: "#C5D3E0";
                    readonly secondary: "#789AB8";
                    readonly tertiary: "#5B84A8";
                    readonly disabled: "#3E6E99";
                    readonly link: "#42A5F5";
                    readonly linkHover: "#64B5F6";
                };
                readonly surface: {
                    readonly secondary: "#0D1F35";
                    readonly primary: "#1A3D6B";
                    readonly tertiary: "#27507C";
                    readonly quaternary: "#2F5B86";
                    readonly quinary: "#386691";
                };
                readonly border: {
                    readonly default: "#5B84A8";
                    readonly subtle: "#386691";
                    readonly strong: "#789AB8";
                };
            };
            readonly darkGreen: {
                readonly text: {
                    readonly primary: "#C3E6D9";
                    readonly secondary: "#73C5A6";
                    readonly tertiary: "#55B993";
                    readonly disabled: "#37AC80";
                    readonly link: "#66BB6A";
                    readonly linkHover: "#81C784";
                };
                readonly surface: {
                    readonly secondary: "#0B3228";
                    readonly primary: "#166450";
                    readonly tertiary: "#238163";
                    readonly quaternary: "#2A906D";
                    readonly quinary: "#319F78";
                };
                readonly border: {
                    readonly default: "#55B993";
                    readonly subtle: "#319F78";
                    readonly strong: "#73C5A6";
                };
            };
            readonly darkViolet: {
                readonly text: {
                    readonly primary: "#D4C6E6";
                    readonly secondary: "#9C7AC5";
                    readonly tertiary: "#875EB8";
                    readonly disabled: "#7242AB";
                    readonly link: "#AB47BC";
                    readonly linkHover: "#BA68C8";
                };
                readonly surface: {
                    readonly secondary: "#210F40";
                    readonly primary: "#421D80";
                    readonly tertiary: "#552B91";
                    readonly quaternary: "#5F339A";
                    readonly quinary: "#6A3CA4";
                };
                readonly border: {
                    readonly default: "#875EB8";
                    readonly subtle: "#6A3CA4";
                    readonly strong: "#9C7AC5";
                };
            };
            readonly darkBrown: {
                readonly text: {
                    readonly primary: "#DFD2C5";
                    readonly secondary: "#B59678";
                    readonly tertiary: "#A57F5B";
                    readonly disabled: "#96693E";
                    readonly link: "#FFA726";
                    readonly linkHover: "#FFB74D";
                };
                readonly surface: {
                    readonly secondary: "#341D0E";
                    readonly primary: "#68391B";
                    readonly tertiary: "#794C28";
                    readonly quaternary: "#835630";
                    readonly quinary: "#8E6138";
                };
                readonly border: {
                    readonly default: "#A57F5B";
                    readonly subtle: "#8E6138";
                    readonly strong: "#B59678";
                };
            };
        };
    };
    readonly spacing: {
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
    readonly typography: {
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
    readonly motion: {
        readonly duration: {
            readonly instant: "100ms";
            readonly fast: "200ms";
            readonly base: "300ms";
            readonly slow: "400ms";
            readonly slower: "600ms";
        };
        readonly easing: {
            readonly linear: "linear";
            readonly in: "cubic-bezier(0.4, 0, 1, 1)";
            readonly out: "cubic-bezier(0, 0, 0.2, 1)";
            readonly inOut: "cubic-bezier(0.4, 0, 0.2, 1)";
            readonly emphasized: "cubic-bezier(0.4, 0, 0, 1)";
            readonly emphasizedIn: "cubic-bezier(0.4, 0, 0.6, 1)";
            readonly emphasizedOut: "cubic-bezier(0.2, 0, 0, 1)";
            readonly bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
        };
        readonly componentMotion: {
            readonly button: {
                readonly hoverDuration: "100ms";
                readonly hoverEasing: "cubic-bezier(0, 0, 0.2, 1)";
            };
            readonly modal: {
                readonly enterDuration: "300ms";
                readonly enterEasing: "cubic-bezier(0, 0, 0.2, 1)";
                readonly exitDuration: "200ms";
                readonly exitEasing: "cubic-bezier(0.4, 0, 1, 1)";
            };
            readonly dropdown: {
                readonly enterDuration: "200ms";
                readonly enterEasing: "cubic-bezier(0, 0, 0.2, 1)";
                readonly exitDuration: "150ms";
                readonly exitEasing: "cubic-bezier(0.4, 0, 1, 1)";
            };
            readonly tooltip: {
                readonly enterDuration: "200ms";
                readonly enterEasing: "cubic-bezier(0, 0, 0.2, 1)";
                readonly enterDelay: "100ms";
                readonly exitDuration: "150ms";
                readonly exitEasing: "cubic-bezier(0.4, 0, 1, 1)";
            };
            readonly toast: {
                readonly enterDuration: "300ms";
                readonly enterEasing: "cubic-bezier(0, 0, 0.2, 1)";
                readonly exitDuration: "200ms";
                readonly exitEasing: "cubic-bezier(0.4, 0, 1, 1)";
                readonly autoDismissDuration: "5000ms";
            };
            readonly drawer: {
                readonly enterDuration: "400ms";
                readonly enterEasing: "cubic-bezier(0, 0, 0.2, 1)";
                readonly exitDuration: "300ms";
                readonly exitEasing: "cubic-bezier(0.4, 0, 1, 1)";
            };
            readonly accordion: {
                readonly expandDuration: "300ms";
                readonly expandEasing: "cubic-bezier(0, 0, 0.2, 1)";
                readonly collapseDuration: "250ms";
                readonly collapseEasing: "cubic-bezier(0.4, 0, 1, 1)";
            };
            readonly tab: {
                readonly switchDuration: "300ms";
                readonly switchEasing: "cubic-bezier(0.4, 0, 0.2, 1)";
            };
            readonly loading: {
                readonly spinnerDuration: "1000ms";
                readonly spinnerEasing: "linear";
                readonly skeletonDuration: "1500ms";
                readonly skeletonEasing: "cubic-bezier(0.4, 0, 0.2, 1)";
            };
        };
        readonly iotMotion: {
            readonly dataUpdateDuration: "300ms";
            readonly dataUpdateEasing: "cubic-bezier(0, 0, 0.2, 1)";
            readonly statusChangeDuration: "400ms";
            readonly statusChangeEasing: "cubic-bezier(0, 0, 0.2, 1)";
            readonly liveIndicatorDuration: "2000ms";
            readonly liveIndicatorEasing: "cubic-bezier(0.4, 0, 0.2, 1)";
            readonly connectionLostDuration: "400ms";
            readonly connectionLostEasing: "cubic-bezier(0.4, 0, 0.2, 1)";
            readonly refreshDuration: "600ms";
            readonly refreshEasing: "cubic-bezier(0, 0, 0.2, 1)";
            readonly alertPulseDuration: "1000ms";
            readonly alertPulseEasing: "cubic-bezier(0.4, 0, 0.2, 1)";
            readonly chartAnimationDuration: "1000ms";
            readonly chartAnimationEasing: "cubic-bezier(0, 0, 0.2, 1)";
        };
        readonly mobileMotion: {
            readonly transitionFast: "200ms";
            readonly transitionBase: "300ms";
            readonly transitionSlow: "400ms";
            readonly springEasing: "cubic-bezier(0.34, 1.56, 0.64, 1)";
        };
    };
    readonly shadows: {
        readonly sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
        readonly base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)";
        readonly md: "0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -2px rgba(0, 0, 0, 0.15)";
        readonly lg: "0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -4px rgba(0, 0, 0, 0.15)";
        readonly xl: "0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.2)";
        readonly '2xl': "0 25px 50px -12px rgba(0, 0, 0, 0.3)";
        readonly light: {
            readonly sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
            readonly base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)";
            readonly md: "0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -2px rgba(0, 0, 0, 0.15)";
            readonly lg: "0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -4px rgba(0, 0, 0, 0.15)";
            readonly xl: "0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.2)";
            readonly '2xl': "0 25px 50px -12px rgba(0, 0, 0, 0.3)";
        };
        readonly dark: {
            readonly sm: "0 1px 2px 0 rgba(0, 0, 0, 0.3)";
            readonly base: "0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)";
            readonly md: "0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.5)";
            readonly lg: "0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -4px rgba(0, 0, 0, 0.5)";
            readonly xl: "0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 8px 10px -6px rgba(0, 0, 0, 0.6)";
            readonly '2xl': "0 25px 50px -12px rgba(0, 0, 0, 0.8)";
        };
        readonly component: {
            readonly fab: {
                readonly base: "0 6px 20px rgba(0, 0, 0, 0.15)";
                readonly hover: "0 8px 24px rgba(0, 0, 0, 0.2)";
                readonly elevation: "0 6px 20px rgba(0, 0, 0, 0.15)";
                readonly elevationHover: "0 8px 24px rgba(0, 0, 0, 0.2)";
            };
            readonly mobileNav: {
                readonly elevation: "0 -2px 8px rgba(0, 0, 0, 0.1)";
            };
        };
    };
};
export default tokens;
