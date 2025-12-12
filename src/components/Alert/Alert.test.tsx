/**
 * Alert 컴포넌트 테스트
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Alert } from './Alert';

describe('Alert', () => {
  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(<Alert>알림 메시지입니다</Alert>);
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('알림 메시지입니다')).toBeInTheDocument();
    });

    it('title이 렌더링됨', () => {
      render(<Alert title="제목">내용</Alert>);
      expect(screen.getByText('제목')).toBeInTheDocument();
      expect(screen.getByText('내용')).toBeInTheDocument();
    });

    it('children이 정상 렌더링됨', () => {
      render(
        <Alert>
          <p>단락 내용</p>
          <a href="#">링크</a>
        </Alert>
      );
      expect(screen.getByText('단락 내용')).toBeInTheDocument();
      expect(screen.getByText('링크')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    const variants = ['info', 'success', 'warning', 'error'] as const;

    variants.forEach((variant) => {
      it(`${variant} variant가 정상 렌더링됨`, () => {
        render(<Alert variant={variant}>메시지</Alert>);
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
    });

    it('기본 variant는 info임', () => {
      const { container } = render(<Alert>메시지</Alert>);
      expect(container.firstChild).toHaveClass('alert-info');
    });
  });

  describe('닫기 버튼', () => {
    it('onClose가 있으면 닫기 버튼이 렌더링됨', () => {
      render(<Alert onClose={() => {}}>메시지</Alert>);
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('onClose가 없으면 닫기 버튼이 없음', () => {
      render(<Alert>메시지</Alert>);
      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
    });

    it('닫기 버튼 클릭 시 onClose 호출', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      render(<Alert onClose={handleClose}>메시지</Alert>);

      await user.click(screen.getByRole('button', { name: /close/i }));
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('className', () => {
    it('추가 className이 적용됨', () => {
      const { container } = render(<Alert className="custom-alert">메시지</Alert>);
      expect(container.firstChild).toHaveClass('custom-alert');
    });
  });

  describe('접근성', () => {
    it('a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Alert variant="info" title="정보">
          중요한 알림 메시지입니다.
        </Alert>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('role이 alert임', () => {
      render(<Alert>알림</Alert>);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('닫기 버튼에 aria-label이 있음', () => {
      render(<Alert onClose={() => {}}>알림</Alert>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Close alert');
    });
  });
});
