import { default as React } from 'react';
export interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'full';
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    className?: string;
}
export interface ModalHeaderProps {
    children: React.ReactNode;
    onClose?: () => void;
    showCloseButton?: boolean;
    className?: string;
}
export interface ModalBodyProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
export interface ModalFooterProps {
    children: React.ReactNode;
    className?: string;
}
declare const Modal: {
    ({ open, onClose, children, size, closeOnOverlayClick, closeOnEscape, className, }: ModalProps): React.ReactPortal | null;
    displayName: string;
};
declare const ModalHeader: {
    ({ children, onClose, showCloseButton, className, }: ModalHeaderProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const ModalTitle: {
    ({ children }: {
        children: React.ReactNode;
    }): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const ModalBody: {
    ({ children, className, style }: ModalBodyProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const ModalFooter: {
    ({ children, className }: ModalFooterProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter };
