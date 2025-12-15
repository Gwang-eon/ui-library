/**
 * Steps 컴포넌트 테스트
 */
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Steps } from './Steps';

const defaultItems = [
  { title: 'Step 1', description: 'First step' },
  { title: 'Step 2', description: 'Second step' },
  { title: 'Step 3', description: 'Third step' },
];

describe('Steps', () => {
  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(<Steps items={defaultItems} />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('모든 step이 렌더링됨', () => {
      render(<Steps items={defaultItems} />);
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('Step 3')).toBeInTheDocument();
    });

    it('description이 렌더링됨', () => {
      render(<Steps items={defaultItems} />);
      expect(screen.getByText('First step')).toBeInTheDocument();
      expect(screen.getByText('Second step')).toBeInTheDocument();
    });

    it('step 번호가 표시됨', () => {
      render(<Steps items={defaultItems} current={-1} />);
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });

  describe('current', () => {
    it('current step이 active 상태임', () => {
      const { container } = render(<Steps items={defaultItems} current={1} />);
      const steps = container.querySelectorAll('.step');
      expect(steps[1]).toHaveClass('step-active');
    });

    it('current 이전 step들이 completed 상태임', () => {
      const { container } = render(<Steps items={defaultItems} current={2} />);
      const steps = container.querySelectorAll('.step');
      expect(steps[0]).toHaveClass('step-completed');
      expect(steps[1]).toHaveClass('step-completed');
      expect(steps[2]).toHaveClass('step-active');
    });

    it('current 이후 step들이 wait 상태임', () => {
      const { container } = render(<Steps items={defaultItems} current={0} />);
      const steps = container.querySelectorAll('.step');
      expect(steps[0]).toHaveClass('step-active');
      expect(steps[1]).toHaveClass('step-wait');
      expect(steps[2]).toHaveClass('step-wait');
    });

    it('기본 current는 0임', () => {
      const { container } = render(<Steps items={defaultItems} />);
      const steps = container.querySelectorAll('.step');
      expect(steps[0]).toHaveClass('step-active');
    });
  });

  describe('status', () => {
    it('명시적 status가 current보다 우선함', () => {
      const items = [
        { title: 'Step 1', status: 'error' as const },
        { title: 'Step 2', status: 'finish' as const },
        { title: 'Step 3' },
      ];
      const { container } = render(<Steps items={items} current={0} />);
      const steps = container.querySelectorAll('.step');

      expect(steps[0]).toHaveClass('step-error');
      expect(steps[1]).toHaveClass('step-completed');
    });

    it('finish status에 체크 아이콘이 표시됨', () => {
      const items = [{ title: 'Done', status: 'finish' as const }];
      const { container } = render(<Steps items={items} />);
      // Check 아이콘 (lucide-react)의 존재 확인
      expect(container.querySelector('.lucide-check')).toBeInTheDocument();
    });

    it('error status에 X 아이콘이 표시됨', () => {
      const items = [{ title: 'Failed', status: 'error' as const }];
      const { container } = render(<Steps items={items} />);
      expect(container.querySelector('.lucide-x')).toBeInTheDocument();
    });

    it('process status가 active로 렌더링됨', () => {
      const items = [{ title: 'Processing', status: 'process' as const }];
      const { container } = render(<Steps items={items} />);
      expect(container.querySelector('.step')).toHaveClass('step-active');
    });

    it('wait status가 wait로 렌더링됨', () => {
      const items = [{ title: 'Waiting', status: 'wait' as const }];
      const { container } = render(<Steps items={items} />);
      expect(container.querySelector('.step')).toHaveClass('step-wait');
    });
  });

  describe('direction', () => {
    it('기본 direction은 horizontal', () => {
      const { container } = render(<Steps items={defaultItems} />);
      expect(container.querySelector('.steps')).not.toHaveClass('stepsVertical');
    });

    it('vertical direction이 적용됨', () => {
      const { container } = render(<Steps items={defaultItems} direction="vertical" />);
      expect(container.querySelector('.steps')).toHaveClass('stepsVertical');
    });
  });

  describe('size', () => {
    it('기본 size는 default', () => {
      const { container } = render(<Steps items={defaultItems} />);
      expect(container.querySelector('.steps')).not.toHaveClass('stepsSm');
    });

    it('small size가 적용됨', () => {
      const { container } = render(<Steps items={defaultItems} size="small" />);
      expect(container.querySelector('.steps')).toHaveClass('stepsSm');
    });
  });

  describe('clickable', () => {
    it('clickable이 true일 때 버튼으로 렌더링됨 (completed/active steps만)', () => {
      render(<Steps items={defaultItems} current={1} clickable />);
      // index 0 (completed), index 1 (active)는 버튼
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
    });

    it('clickable이 false일 때 버튼이 없음', () => {
      render(<Steps items={defaultItems} current={1} />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('completed step 클릭 시 onChange가 호출됨', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Steps items={defaultItems} current={2} clickable onChange={handleChange} />);

      const buttons = screen.getAllByRole('button');
      await user.click(buttons[0]); // first step (completed)

      expect(handleChange).toHaveBeenCalledWith(0);
    });

    it('active step 클릭 시 onChange가 호출됨', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Steps items={defaultItems} current={1} clickable onChange={handleChange} />);

      const buttons = screen.getAllByRole('button');
      await user.click(buttons[1]); // second step (active)

      expect(handleChange).toHaveBeenCalledWith(1);
    });

    it('wait step은 클릭할 수 없음', () => {
      render(<Steps items={defaultItems} current={0} clickable />);
      // only active step (index 0) should be a button
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(1);
    });
  });

  describe('disabled', () => {
    it('disabled step은 클릭할 수 없음', async () => {
      const handleChange = vi.fn();
      const items = [
        { title: 'Step 1' },
        { title: 'Step 2', disabled: true },
        { title: 'Step 3' },
      ];

      render(<Steps items={items} current={2} clickable onChange={handleChange} />);

      // Step 2 (disabled)는 버튼이 아님
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2); // Step 1, Step 3
    });

    it('disabled step이 disabled 상태로 표시됨', () => {
      const items = [
        { title: 'Step 1' },
        { title: 'Step 2', disabled: true },
      ];

      const { container } = render(<Steps items={items} current={0} />);
      const steps = container.querySelectorAll('.step');
      expect(steps[1]).toHaveClass('step-disabled');
    });
  });

  describe('custom icon', () => {
    it('커스텀 icon이 렌더링됨', () => {
      const items = [
        { title: 'Step 1', icon: <span data-testid="custom-icon">🎯</span> },
      ];
      render(<Steps items={items} />);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('커스텀 icon이 기본 숫자보다 우선함', () => {
      const items = [
        { title: 'Step 1', icon: <span data-testid="custom-icon">★</span> },
      ];
      render(<Steps items={items} />);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
      expect(screen.queryByText('1')).not.toBeInTheDocument();
    });
  });

  describe('className', () => {
    it('커스텀 className이 적용됨', () => {
      const { container } = render(
        <Steps items={defaultItems} className="custom-steps" />
      );
      expect(container.querySelector('.steps')).toHaveClass('custom-steps');
    });
  });

  describe('접근성', () => {
    it('aria-label이 navigation에 있음', () => {
      render(<Steps items={defaultItems} />);
      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Step progress');
    });

    it('active step에 aria-current="step"이 있음', () => {
      render(<Steps items={defaultItems} current={1} />);
      const activeStep = screen.getByLabelText(/Step 2 of 3.*active/i);
      expect(activeStep).toHaveAttribute('aria-current', 'step');
    });

    it('각 step에 aria-label이 있음', () => {
      render(<Steps items={defaultItems} current={0} />);
      expect(screen.getByLabelText(/Step 1 of 3: Step 1, active/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Step 2 of 3: Step 2, wait/i)).toBeInTheDocument();
    });

    it('a11y 위반 사항이 없음', async () => {
      const { container } = render(<Steps items={defaultItems} current={1} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('a11y 위반 사항이 없음 (clickable)', async () => {
      const { container } = render(
        <Steps items={defaultItems} current={1} clickable onChange={() => {}} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('a11y 위반 사항이 없음 (vertical)', async () => {
      const { container } = render(
        <Steps items={defaultItems} direction="vertical" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('엣지 케이스', () => {
    it('빈 items 배열도 렌더링됨', () => {
      render(<Steps items={[]} />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('단일 item도 렌더링됨', () => {
      render(<Steps items={[{ title: 'Only Step' }]} />);
      expect(screen.getByText('Only Step')).toBeInTheDocument();
    });

    it('description 없이 title만 렌더링됨', () => {
      const items = [{ title: 'Title Only' }];
      render(<Steps items={items} />);
      expect(screen.getByText('Title Only')).toBeInTheDocument();
    });

    it('ReactNode title이 렌더링됨', () => {
      const items = [{ title: <strong data-testid="bold-title">Bold Title</strong> }];
      render(<Steps items={items} />);
      expect(screen.getByTestId('bold-title')).toBeInTheDocument();
    });

    it('ReactNode description이 렌더링됨', () => {
      const items = [
        { title: 'Step', description: <em data-testid="italic-desc">Italic</em> },
      ];
      render(<Steps items={items} />);
      expect(screen.getByTestId('italic-desc')).toBeInTheDocument();
    });
  });
});
