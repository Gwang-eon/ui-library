/**
 * Tooltip 컴포넌트 테스트
 */
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen, cleanup, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  describe('렌더링', () => {
    it('trigger가 렌더링됨', () => {
      render(
        <Tooltip content="Tooltip text">
          <button>Hover me</button>
        </Tooltip>
      );

      expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
    });

    it('기본 상태에서 tooltip이 숨겨짐', () => {
      render(
        <Tooltip content="Tooltip text">
          <button>Hover me</button>
        </Tooltip>
      );

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('hover시 tooltip이 표시됨', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Tooltip content="Tooltip text">
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      await act(async () => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.getByRole('tooltip')).toBeInTheDocument();
      expect(screen.getByText('Tooltip text')).toBeInTheDocument();
    });

    it('content가 렌더링됨', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Tooltip content="Help information">
          <button>Info</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      await act(async () => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.getByText('Help information')).toBeInTheDocument();
    });

    it('React Node content가 렌더링됨', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Tooltip content={<strong>Bold tooltip</strong>}>
          <button>Info</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      await act(async () => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.getByText('Bold tooltip').tagName).toBe('STRONG');
    });

    it('className이 적용됨', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Tooltip content="Tooltip" className="custom-tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      await act(async () => {
        vi.advanceTimersByTime(300);
      });

      expect(document.querySelector('.custom-tooltip')).toBeInTheDocument();
    });

    it('커스텀 id가 적용됨', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Tooltip content="Tooltip" id="my-tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      await act(async () => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.getByRole('tooltip')).toHaveAttribute('id', 'my-tooltip');
    });
  });

  describe('position', () => {
    const positions = ['top', 'bottom', 'left', 'right'] as const;

    positions.forEach((position) => {
      it(`${position} position이 정상 렌더링됨`, async () => {
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

        render(
          <Tooltip content="Tooltip" position={position}>
            <button>Hover me</button>
          </Tooltip>
        );

        await user.hover(screen.getByRole('button'));
        await act(async () => {
          vi.advanceTimersByTime(300);
        });

        const capitalizedPosition = position.charAt(0).toUpperCase() + position.slice(1);
        expect(document.querySelector(`[class*="tooltip${capitalizedPosition}"]`)).toBeInTheDocument();
      });
    });

    it('기본 position은 top', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Tooltip content="Tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      await act(async () => {
        vi.advanceTimersByTime(300);
      });

      expect(document.querySelector('[class*="tooltipTop"]')).toBeInTheDocument();
    });
  });

  describe('delay', () => {
    it('기본 delay는 300ms', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Tooltip content="Tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));

      // Before delay
      await act(async () => {
        vi.advanceTimersByTime(200);
      });
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

      // After delay
      await act(async () => {
        vi.advanceTimersByTime(100);
      });
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    it('커스텀 delay가 적용됨', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Tooltip content="Tooltip" delay={500}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));

      // Before custom delay
      await act(async () => {
        vi.advanceTimersByTime(400);
      });
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

      // After custom delay
      await act(async () => {
        vi.advanceTimersByTime(100);
      });
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    it('delay=0이면 즉시 표시됨', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Tooltip content="Tooltip" delay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      await act(async () => {
        vi.advanceTimersByTime(0);
      });

      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });

  describe('rich mode', () => {
    it('rich=true면 rich 클래스가 적용됨', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Tooltip content="Rich tooltip content" rich={true}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      await act(async () => {
        vi.advanceTimersByTime(300);
      });

      expect(document.querySelector('[class*="tooltipRich"]')).toBeInTheDocument();
    });

    it('rich=false면 rich 클래스가 없음', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Tooltip content="Simple tooltip" rich={false}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      await act(async () => {
        vi.advanceTimersByTime(300);
      });

      expect(document.querySelector('[class*="tooltipRich"]')).not.toBeInTheDocument();
    });
  });

  describe('마우스 인터랙션', () => {
    it('mouseenter시 tooltip이 표시됨', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Tooltip content="Tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      await act(async () => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    it('mouseleave시 tooltip이 숨겨짐', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Tooltip content="Tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      await act(async () => {
        vi.advanceTimersByTime(300);
      });
      expect(screen.getByRole('tooltip')).toBeInTheDocument();

      await user.unhover(screen.getByRole('button'));

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('hover 중 leave하면 tooltip이 표시되지 않음', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Tooltip content="Tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      await act(async () => {
        vi.advanceTimersByTime(100); // Before delay completes
      });
      await user.unhover(screen.getByRole('button'));
      await act(async () => {
        vi.advanceTimersByTime(200);
      });

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('원래 onMouseEnter가 호출됨', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const handleMouseEnter = vi.fn();

      render(
        <Tooltip content="Tooltip">
          <button onMouseEnter={handleMouseEnter}>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
    });

    it('원래 onMouseLeave가 호출됨', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const handleMouseLeave = vi.fn();

      render(
        <Tooltip content="Tooltip">
          <button onMouseLeave={handleMouseLeave}>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      await user.unhover(screen.getByRole('button'));
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });
  });

  describe('포커스 인터랙션', () => {
    it('focus시 tooltip이 표시됨', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Tooltip content="Tooltip">
          <button>Focus me</button>
        </Tooltip>
      );

      await user.tab();
      await act(async () => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    it('blur시 tooltip이 숨겨짐', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <div>
          <Tooltip content="Tooltip">
            <button>Focus me</button>
          </Tooltip>
          <button>Other</button>
        </div>
      );

      await user.tab();
      await act(async () => {
        vi.advanceTimersByTime(300);
      });
      expect(screen.getByRole('tooltip')).toBeInTheDocument();

      await user.tab(); // Move to next button

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('원래 onFocus가 호출됨', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const handleFocus = vi.fn();

      render(
        <Tooltip content="Tooltip">
          <button onFocus={handleFocus}>Focus me</button>
        </Tooltip>
      );

      await user.tab();
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('원래 onBlur가 호출됨', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const handleBlur = vi.fn();

      render(
        <div>
          <Tooltip content="Tooltip">
            <button onBlur={handleBlur}>Focus me</button>
          </Tooltip>
          <button>Other</button>
        </div>
      );

      await user.tab();
      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Portal 렌더링', () => {
    it('tooltip이 document.body에 렌더링됨', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      const { container } = render(
        <Tooltip content="Tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      await act(async () => {
        vi.advanceTimersByTime(300);
      });

      // Tooltip should be in body, not in container
      expect(container.querySelector('[role="tooltip"]')).not.toBeInTheDocument();
      expect(document.body.querySelector('[role="tooltip"]')).toBeInTheDocument();
    });
  });

  describe('접근성', () => {
    it('role="tooltip"이 설정됨', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Tooltip content="Tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      await act(async () => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    it('aria-describedby가 trigger에 설정됨', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Tooltip content="Tooltip" id="test-tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      // Before visible - no aria-describedby
      expect(screen.getByRole('button')).not.toHaveAttribute('aria-describedby');

      await user.hover(screen.getByRole('button'));
      await act(async () => {
        vi.advanceTimersByTime(300);
      });

      // After visible - aria-describedby should be set
      expect(screen.getByRole('button')).toHaveAttribute('aria-describedby', 'test-tooltip');
    });

    it('기본 Tooltip이 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Tooltip content="Help text">
          <button>Info</button>
        </Tooltip>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('표시된 Tooltip이 a11y 위반 사항이 없음', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Tooltip content="Help text">
          <button>Info</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      await act(async () => {
        vi.advanceTimersByTime(300);
      });

      // Disable region rule since tooltip is portaled to body (outside landmarks)
      const results = await axe(document.body, {
        rules: { region: { enabled: false } },
      });
      expect(results).toHaveNoViolations();
    });
  });

  describe('복합 사용', () => {
    it('아이콘 버튼 tooltip', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Tooltip content="Delete item" position="bottom">
          <button aria-label="Delete">🗑️</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button', { name: 'Delete' }));
      await act(async () => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.getByText('Delete item')).toBeInTheDocument();
      expect(document.querySelector('[class*="tooltipBottom"]')).toBeInTheDocument();
    });

    it('rich tooltip with content', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Tooltip
          content={
            <div>
              <strong>Title</strong>
              <p>Detailed description here</p>
            </div>
          }
          rich
        >
          <button>More info</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      await act(async () => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Detailed description here')).toBeInTheDocument();
      expect(document.querySelector('[class*="tooltipRich"]')).toBeInTheDocument();
    });

    it('키보드 및 마우스 모두 지원', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Tooltip content="Accessible tooltip">
          <button>Trigger</button>
        </Tooltip>
      );

      // Mouse interaction
      await user.hover(screen.getByRole('button'));
      await act(async () => {
        vi.advanceTimersByTime(300);
      });
      expect(screen.getByRole('tooltip')).toBeInTheDocument();

      await user.unhover(screen.getByRole('button'));
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

      // Keyboard interaction
      await user.tab();
      await act(async () => {
        vi.advanceTimersByTime(300);
      });
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });
});
