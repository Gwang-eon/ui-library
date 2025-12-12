/**
 * Toggle 컴포넌트 테스트
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(<Toggle aria-label="Test toggle" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('label이 정상적으로 렌더링됨', () => {
      render(<Toggle label="알림 설정" />);
      expect(screen.getByLabelText('알림 설정')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`${size} size가 정상 렌더링됨`, () => {
        render(<Toggle size={size} aria-label="Test" />);
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
      });
    });
  });

  describe('인터랙션', () => {
    it('클릭으로 토글 가능', async () => {
      const user = userEvent.setup();
      render(<Toggle label="토글" />);

      const toggle = screen.getByRole('checkbox');
      expect(toggle).not.toBeChecked();

      await user.click(toggle);
      expect(toggle).toBeChecked();
    });

    it('클릭으로 토글 해제 가능', async () => {
      const user = userEvent.setup();
      render(<Toggle label="토글" defaultChecked />);

      const toggle = screen.getByRole('checkbox');
      expect(toggle).toBeChecked();

      await user.click(toggle);
      expect(toggle).not.toBeChecked();
    });

    it('onChange 콜백이 정상 동작함', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Toggle label="토글" onChange={handleChange} />);

      await user.click(screen.getByRole('checkbox'));
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
    });

    it('onChange 콜백에서 false 값 전달', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Toggle label="토글" defaultChecked onChange={handleChange} />);

      await user.click(screen.getByRole('checkbox'));
      expect(handleChange).toHaveBeenCalledWith(false, expect.any(Object));
    });

    it('disabled 상태에서 클릭 불가', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Toggle label="토글" disabled onChange={handleChange} />);

      await user.click(screen.getByRole('checkbox'));
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('disabled 상태에서 토글이 비활성화됨', () => {
      render(<Toggle label="토글" disabled />);
      expect(screen.getByRole('checkbox')).toBeDisabled();
    });
  });

  describe('className', () => {
    it('추가 className이 적용됨', () => {
      const { container } = render(<Toggle className="custom-class" aria-label="Test" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('접근성', () => {
    it('a11y 위반 사항이 없음', async () => {
      const { container } = render(<Toggle label="접근성 테스트" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('aria-label만 있어도 a11y 위반 없음', async () => {
      const { container } = render(<Toggle aria-label="토글 스위치" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Space 키로 토글 가능', async () => {
      const user = userEvent.setup();
      render(<Toggle label="토글" />);

      const toggle = screen.getByRole('checkbox');
      toggle.focus();
      await user.keyboard(' ');
      expect(toggle).toBeChecked();
    });

    it('Enter 키로 토글 불가 (기본 checkbox 동작)', async () => {
      const user = userEvent.setup();
      render(<Toggle label="토글" />);

      const toggle = screen.getByRole('checkbox');
      toggle.focus();
      await user.keyboard('{Enter}');
      expect(toggle).not.toBeChecked();
    });
  });

  describe('Ref 전달', () => {
    it('ref가 input 요소로 전달됨', () => {
      const ref = vi.fn();
      render(<Toggle ref={ref} aria-label="Test" />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
    });

    it('ref.current로 DOM 요소에 접근 가능', () => {
      const ref = { current: null as HTMLInputElement | null };
      render(<Toggle ref={ref} aria-label="Test" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('ref를 통해 focus() 호출 가능', () => {
      const ref = { current: null as HTMLInputElement | null };
      render(<Toggle ref={ref} aria-label="Test" />);
      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  describe('HTML 속성 전달', () => {
    it('name 속성이 전달됨', () => {
      render(<Toggle name="notifications" aria-label="Test" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'notifications');
    });

    it('id 속성이 전달됨', () => {
      render(<Toggle id="my-toggle" aria-label="Test" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'my-toggle');
    });

    it('aria-labelledby 속성이 전달됨', () => {
      render(
        <div>
          <span id="toggle-label">외부 라벨</span>
          <Toggle aria-labelledby="toggle-label" />
        </div>
      );
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-labelledby', 'toggle-label');
    });
  });

  describe('제어/비제어 컴포넌트', () => {
    it('제어 컴포넌트로 동작함', async () => {
      const user = userEvent.setup();
      const ControlledToggle = () => {
        const [checked, setChecked] = React.useState(false);
        return (
          <Toggle
            label="제어 토글"
            checked={checked}
            onChange={(newChecked) => setChecked(newChecked)}
          />
        );
      };

      render(<ControlledToggle />);
      const toggle = screen.getByRole('checkbox');

      expect(toggle).not.toBeChecked();
      await user.click(toggle);
      expect(toggle).toBeChecked();
    });

    it('비제어 컴포넌트로 동작함', async () => {
      const user = userEvent.setup();
      render(<Toggle label="비제어 토글" defaultChecked />);

      const toggle = screen.getByRole('checkbox');
      expect(toggle).toBeChecked();

      await user.click(toggle);
      expect(toggle).not.toBeChecked();
    });
  });
});

import React from 'react';
