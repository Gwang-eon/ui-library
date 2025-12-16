/**
 * 팝오버 상태 관리 훅
 */
interface UsePopoverOptions {
    /** 초기 열림 상태 */
    initialOpen?: boolean;
    /** 열기 콜백 */
    onOpen?: () => void;
    /** 닫기 콜백 */
    onClose?: () => void;
    /** 외부 클릭 시 닫기 */
    closeOnClickOutside?: boolean;
    /** ESC 키 시 닫기 */
    closeOnEscape?: boolean;
}
interface UsePopoverReturn {
    /** 열림 상태 */
    isOpen: boolean;
    /** 열기 */
    open: () => void;
    /** 닫기 */
    close: () => void;
    /** 토글 */
    toggle: () => void;
    /** 트리거 ref */
    triggerRef: React.RefObject<HTMLElement | null>;
    /** 팝오버 ref */
    popoverRef: React.RefObject<HTMLDivElement | null>;
    /** 트리거 props */
    triggerProps: {
        ref: React.RefObject<HTMLElement | null>;
        onClick: () => void;
        'aria-expanded': boolean;
        'aria-haspopup': 'dialog';
    };
    /** 팝오버 props */
    popoverProps: {
        ref: React.RefObject<HTMLDivElement | null>;
        role: 'dialog';
        'aria-modal': boolean;
    };
}
export declare const usePopover: (options?: UsePopoverOptions) => UsePopoverReturn;
type Placement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
interface UsePopoverPositionOptions {
    /** 배치 위치 */
    placement?: Placement;
    /** 오프셋 */
    offset?: number;
}
interface Position {
    top: number;
    left: number;
}
export declare const usePopoverPosition: (triggerRef: React.RefObject<HTMLElement>, popoverRef: React.RefObject<HTMLElement>, isOpen: boolean, options?: UsePopoverPositionOptions) => Position;
export {};
