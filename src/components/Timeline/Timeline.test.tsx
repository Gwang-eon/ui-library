/**
 * Timeline 컴포넌트 테스트
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Timeline } from './Timeline';
import { CheckCircle, AlertCircle, Clock, Info } from 'lucide-react';

describe('Timeline', () => {
  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(
        <Timeline>
          <Timeline.Item title="Event 1" />
          <Timeline.Item title="Event 2" />
        </Timeline>
      );

      expect(screen.getByText('Event 1')).toBeInTheDocument();
      expect(screen.getByText('Event 2')).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      const { container } = render(
        <Timeline className="custom-timeline">
          <Timeline.Item title="Event" />
        </Timeline>
      );

      expect(container.firstChild).toHaveClass('custom-timeline');
    });
  });

  describe('modes', () => {
    const modes = ['default', 'compact', 'alternate'] as const;

    modes.forEach((mode) => {
      it(`${mode} mode가 정상 렌더링됨`, () => {
        const { container } = render(
          <Timeline mode={mode}>
            <Timeline.Item title="Event" />
          </Timeline>
        );

        expect(container.firstChild).toBeInTheDocument();
      });
    });

    it('compact mode가 적절한 클래스를 가짐', () => {
      const { container } = render(
        <Timeline mode="compact">
          <Timeline.Item title="Event" />
        </Timeline>
      );

      expect(container.querySelector('[class*="Compact"]')).toBeInTheDocument();
    });

    it('alternate mode가 적절한 클래스를 가짐', () => {
      const { container } = render(
        <Timeline mode="alternate">
          <Timeline.Item title="Event" />
        </Timeline>
      );

      expect(container.querySelector('[class*="Alternate"]')).toBeInTheDocument();
    });
  });

  describe('Timeline.Item', () => {
    it('title이 렌더링됨', () => {
      render(
        <Timeline>
          <Timeline.Item title="Test Event" />
        </Timeline>
      );

      expect(screen.getByText('Test Event')).toBeInTheDocument();
    });

    it('description이 렌더링됨', () => {
      render(
        <Timeline>
          <Timeline.Item title="Event" description="Event description" />
        </Timeline>
      );

      expect(screen.getByText('Event description')).toBeInTheDocument();
    });

    it('time이 렌더링됨', () => {
      render(
        <Timeline>
          <Timeline.Item title="Event" time="2 hours ago" />
        </Timeline>
      );

      expect(screen.getByText('2 hours ago')).toBeInTheDocument();
    });

    it('meta가 렌더링됨', () => {
      render(
        <Timeline>
          <Timeline.Item
            title="Event"
            meta={<span data-testid="meta-content">Additional Info</span>}
          />
        </Timeline>
      );

      expect(screen.getByTestId('meta-content')).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      const { container } = render(
        <Timeline>
          <Timeline.Item title="Event" className="custom-item" />
        </Timeline>
      );

      expect(container.querySelector('.custom-item')).toBeInTheDocument();
    });

    it('icon이 렌더링됨', () => {
      render(
        <Timeline>
          <Timeline.Item
            title="Success"
            icon={<CheckCircle data-testid="success-icon" />}
          />
        </Timeline>
      );

      expect(screen.getByTestId('success-icon')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    const variants = ['default', 'success', 'error', 'warning', 'info', 'primary'] as const;

    variants.forEach((variant) => {
      it(`${variant} variant가 정상 렌더링됨`, () => {
        const { container } = render(
          <Timeline>
            <Timeline.Item title="Event" variant={variant} />
          </Timeline>
        );

        expect(container.firstChild).toBeInTheDocument();
      });
    });

    it('success variant가 적절한 클래스를 가짐', () => {
      const { container } = render(
        <Timeline>
          <Timeline.Item title="Event" variant="success" />
        </Timeline>
      );

      expect(container.querySelector('[class*="Success"]')).toBeInTheDocument();
    });

    it('error variant가 적절한 클래스를 가짐', () => {
      const { container } = render(
        <Timeline>
          <Timeline.Item title="Event" variant="error" />
        </Timeline>
      );

      expect(container.querySelector('[class*="Error"]')).toBeInTheDocument();
    });

    it('warning variant가 적절한 클래스를 가짐', () => {
      const { container } = render(
        <Timeline>
          <Timeline.Item title="Event" variant="warning" />
        </Timeline>
      );

      expect(container.querySelector('[class*="Warning"]')).toBeInTheDocument();
    });
  });

  describe('interactive', () => {
    it('interactive item이 role="button"을 가짐', () => {
      const handleClick = vi.fn();
      render(
        <Timeline>
          <Timeline.Item title="Clickable" interactive onClick={handleClick} />
        </Timeline>
      );

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('interactive item이 tabIndex=0을 가짐', () => {
      const handleClick = vi.fn();
      render(
        <Timeline>
          <Timeline.Item title="Clickable" interactive onClick={handleClick} />
        </Timeline>
      );

      expect(screen.getByRole('button')).toHaveAttribute('tabIndex', '0');
    });

    it('onClick이 호출됨', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Timeline>
          <Timeline.Item title="Clickable" interactive onClick={handleClick} />
        </Timeline>
      );

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('Enter 키로 클릭 이벤트가 트리거됨', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Timeline>
          <Timeline.Item title="Clickable" interactive onClick={handleClick} />
        </Timeline>
      );

      const item = screen.getByRole('button');
      item.focus();
      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('Space 키로 클릭 이벤트가 트리거됨', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Timeline>
          <Timeline.Item title="Clickable" interactive onClick={handleClick} />
        </Timeline>
      );

      const item = screen.getByRole('button');
      item.focus();
      await user.keyboard(' ');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('non-interactive item이 role="article"을 가짐', () => {
      render(
        <Timeline>
          <Timeline.Item title="Non-clickable" />
        </Timeline>
      );

      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('interactive가 false면 클릭해도 onClick이 호출되지 않음', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Timeline>
          <Timeline.Item title="Non-clickable" onClick={handleClick} />
        </Timeline>
      );

      await user.click(screen.getByRole('article'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('aria-label', () => {
    it('interactive item이 문자열 title로 aria-label을 가짐', () => {
      render(
        <Timeline>
          <Timeline.Item title="Event Title" interactive onClick={() => {}} />
        </Timeline>
      );

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Event Title');
    });

    it('interactive item이 ReactNode title이면 aria-label이 없음', () => {
      render(
        <Timeline>
          <Timeline.Item
            title={<span>Complex Title</span>}
            interactive
            onClick={() => {}}
          />
        </Timeline>
      );

      expect(screen.getByRole('button')).not.toHaveAttribute('aria-label');
    });
  });

  describe('복합 사용', () => {
    it('activity log 스타일 렌더링', () => {
      render(
        <Timeline>
          <Timeline.Item
            variant="success"
            icon={<CheckCircle data-testid="icon-1" />}
            time="2 hours ago"
            title="Device Connected"
            description="Temperature sensor successfully connected."
          />
          <Timeline.Item
            variant="info"
            icon={<Info data-testid="icon-2" />}
            time="5 hours ago"
            title="Firmware Updated"
            description="Updated to v2.2.0"
          />
          <Timeline.Item
            variant="warning"
            icon={<AlertCircle data-testid="icon-3" />}
            time="1 day ago"
            title="Low Battery Warning"
            description="Battery level below 20%"
          />
        </Timeline>
      );

      expect(screen.getByText('Device Connected')).toBeInTheDocument();
      expect(screen.getByText('Firmware Updated')).toBeInTheDocument();
      expect(screen.getByText('Low Battery Warning')).toBeInTheDocument();
      expect(screen.getByTestId('icon-1')).toBeInTheDocument();
      expect(screen.getByTestId('icon-2')).toBeInTheDocument();
      expect(screen.getByTestId('icon-3')).toBeInTheDocument();
    });

    it('interactive items와 regular items가 혼합됨', async () => {
      const handleClick = vi.fn();

      render(
        <Timeline>
          <Timeline.Item title="Regular Event" time="1h ago" />
          <Timeline.Item
            title="Clickable Event"
            interactive
            onClick={handleClick}
          />
          <Timeline.Item title="Another Regular Event" />
        </Timeline>
      );

      expect(screen.getAllByRole('article')).toHaveLength(2);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('compact mode로 간단한 로그 표시', () => {
      render(
        <Timeline mode="compact">
          <Timeline.Item title="Log 1" time="10:00" />
          <Timeline.Item title="Log 2" time="10:05" />
          <Timeline.Item title="Log 3" time="10:10" />
        </Timeline>
      );

      expect(screen.getByText('Log 1')).toBeInTheDocument();
      expect(screen.getByText('Log 2')).toBeInTheDocument();
      expect(screen.getByText('Log 3')).toBeInTheDocument();
    });

    it('alternate mode로 양쪽 정렬', () => {
      const { container } = render(
        <Timeline mode="alternate">
          <Timeline.Item title="Left Event" />
          <Timeline.Item title="Right Event" />
          <Timeline.Item title="Left Event 2" />
        </Timeline>
      );

      expect(container.querySelector('[class*="Alternate"]')).toBeInTheDocument();
      expect(screen.getByText('Left Event')).toBeInTheDocument();
      expect(screen.getByText('Right Event')).toBeInTheDocument();
    });
  });

  describe('접근성', () => {
    it('기본 Timeline이 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Timeline>
          <Timeline.Item title="Event 1" />
          <Timeline.Item title="Event 2" />
        </Timeline>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('description이 있는 Timeline이 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Timeline>
          <Timeline.Item
            title="Event"
            description="Event description"
            time="2 hours ago"
          />
        </Timeline>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('interactive item이 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Timeline>
          <Timeline.Item title="Clickable" interactive onClick={() => {}} />
        </Timeline>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('icon이 있는 Timeline이 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Timeline>
          <Timeline.Item
            title="Success"
            variant="success"
            icon={<CheckCircle />}
          />
        </Timeline>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('모든 옵션이 있는 Timeline이 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Timeline mode="compact">
          <Timeline.Item
            variant="success"
            icon={<CheckCircle />}
            time="2h ago"
            title="Event"
            description="Description"
            meta={<span>Meta</span>}
          />
        </Timeline>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
