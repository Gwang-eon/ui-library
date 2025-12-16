/**
 * CalendarPopover - 캘린더 팝오버 컨테이너
 */
import React from 'react';
interface CalendarPopoverProps {
    /** 열림 상태 */
    isOpen: boolean;
    /** 트리거 요소 ref */
    triggerRef: React.RefObject<HTMLElement>;
    /** 닫기 콜백 */
    onClose: () => void;
    /** 자식 요소 */
    children: React.ReactNode;
    /** 추가 클래스 */
    className?: string;
}
export declare const CalendarPopover: React.FC<CalendarPopoverProps>;
export default CalendarPopover;
