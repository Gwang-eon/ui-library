import React from 'react';
export type BottomSheetHeight = 'peek' | 'half' | 'full';
export interface BottomSheetProps {
    open: boolean;
    onClose: () => void;
    height?: BottomSheetHeight;
    title?: string;
    showHandle?: boolean;
    showBackdrop?: boolean;
    closeButton?: boolean;
    footer?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}
export declare const BottomSheet: React.FC<BottomSheetProps>;
declare const _default: {
    BottomSheet: React.FC<BottomSheetProps>;
};
export default _default;
