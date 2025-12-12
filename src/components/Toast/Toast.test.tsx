/**
 * Toast 컴포넌트 테스트
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Toast } from './Toast';

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(<Toast message="토스트 메시지" />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('토스트 메시지')).toBeInTheDocument();
    });

    it('title이 렌더링됨', () => {
      render(<Toast title="알림" message="메시지" />);
      expect(screen.getByText('알림')).toBeInTheDocument();
      expect(screen.getByText('메시지')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    const variants = ['info', 'success', 'warning', 'error'] as const;

    variants.forEach((variant) => {
      it(`${variant} variant가 정상 렌더링됨`, () => {
        render(<Toast variant={variant} message="메시지" />);
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
    });

    it('기본 variant는 info임', () => {
      const { container } = render(<Toast message="메시지" />);
      expect(container.firstChild).toHaveClass('toast-info');
    });
  });

  describe('자동 닫기', () => {
    it('duration 후 자동으로 onClose 호출', () => {
      const handleClose = vi.fn();
      render(<Toast message="메시지" duration={3000} onClose={handleClose} />);

      expect(handleClose).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('duration이 0이면 자동 닫기 안함', () => {
      const handleClose = vi.fn();
      render(<Toast message="메시지" duration={0} onClose={handleClose} />);

      act(() => {
        vi.advanceTimersByTime(10000);
      });

      expect(handleClose).not.toHaveBeenCalled();
    });

    it('onClose가 없으면 타이머 설정 안함', () => {
      render(<Toast message="메시지" duration={3000} />);

      // 타이머가 설정되지 않아도 에러 없이 동작
      act(() => {
        vi.advanceTimersByTime(3000);
      });

      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('언마운트 시 타이머 정리됨', () => {
      const handleClose = vi.fn();
      const { unmount } = render(<Toast message="메시지" duration={3000} onClose={handleClose} />);

      unmount();

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe('닫기 버튼', () => {
    it('onClose가 있으면 닫기 버튼이 렌더링됨', () => {
      vi.useRealTimers();
      render(<Toast message="메시지" onClose={() => {}} />);
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('onClose가 없으면 닫기 버튼이 없음', () => {
      vi.useRealTimers();
      render(<Toast message="메시지" />);
      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
    });

    it('닫기 버튼 클릭 시 onClose 호출', async () => {
      vi.useRealTimers();
      const user = userEvent.setup();
      const handleClose = vi.fn();
      render(<Toast message="메시지" onClose={handleClose} />);

      await user.click(screen.getByRole('button', { name: /close/i }));
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('접근성', () => {
    it('a11y 위반 사항이 없음', async () => {
      vi.useRealTimers();
      const { container } = render(<Toast variant="success" title="성공" message="저장되었습니다" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('role이 alert임', () => {
      vi.useRealTimers();
      render(<Toast message="알림" />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('닫기 버튼에 aria-label이 있음', () => {
      vi.useRealTimers();
      render(<Toast message="알림" onClose={() => {}} />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Close toast');
    });
  });
});
