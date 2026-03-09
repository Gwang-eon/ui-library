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
export declare const palette: {
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
export declare const semantic: {
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
export declare const component: {
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
export declare const darkMode: {
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
export declare const darkThemes: {
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
export declare const colors: {
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
export default colors;
