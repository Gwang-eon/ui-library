/**
 * Checkbox 컴포넌트 테스트
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(<Checkbox aria-label="Test checkbox" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('label이 정상적으로 렌더링됨', () => {
      render(<Checkbox label="동의합니다" />);
      expect(screen.getByLabelText('동의합니다')).toBeInTheDocument();
    });

    it('helperText가 렌더링됨', () => {
      render(<Checkbox label="체크박스" helperText="도움말 텍스트" />);
      expect(screen.getByText('도움말 텍스트')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`${size} size가 정상 렌더링됨`, () => {
        render(<Checkbox size={size} aria-label="Test" />);
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
      });
    });
  });

  describe('인터랙션', () => {
    it('클릭으로 체크 가능', async () => {
      const user = userEvent.setup();
      render(<Checkbox label="체크박스" />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it('클릭으로 체크 해제 가능', async () => {
      const user = userEvent.setup();
      render(<Checkbox label="체크박스" defaultChecked />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();

      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it('onChange 이벤트가 정상 동작함', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox label="체크박스" onChange={handleChange} />);

      await user.click(screen.getByRole('checkbox'));
      expect(handleChange).toHaveBeenCalled();
    });

    it('disabled 상태에서 클릭 불가', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox label="체크박스" disabled onChange={handleChange} />);

      await user.click(screen.getByRole('checkbox'));
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('disabled 상태에서 체크박스가 비활성화됨', () => {
      render(<Checkbox label="체크박스" disabled />);
      expect(screen.getByRole('checkbox')).toBeDisabled();
    });
  });

  describe('indeterminate 상태', () => {
    it('indeterminate 상태가 적용됨', () => {
      render(<Checkbox label="체크박스" indeterminate />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
    });
  });

  describe('에러 상태', () => {
    it('error 상태에서 aria-invalid가 true임', () => {
      render(<Checkbox label="체크박스" error />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('error 상태에서 에러 메시지가 표시됨', () => {
      render(<Checkbox label="체크박스" error errorMessage="필수 선택입니다" />);
      expect(screen.getByText('필수 선택입니다')).toBeInTheDocument();
    });

    it('에러 메시지에 alert role이 있음', () => {
      render(<Checkbox label="체크박스" error errorMessage="필수 선택입니다" />);
      expect(screen.getByRole('alert')).toHaveTextContent('필수 선택입니다');
    });
  });

  describe('className', () => {
    it('추가 className이 적용됨', () => {
      const { container } = render(<Checkbox className="custom-class" aria-label="Test" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('접근성', () => {
    it('a11y 위반 사항이 없음', async () => {
      const { container } = render(<Checkbox label="접근성 테스트" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('에러 상태에서 aria-describedby가 메시지를 참조함', () => {
      render(<Checkbox label="체크박스" error errorMessage="에러입니다" id="test-checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-describedby', 'test-checkbox-message');
    });

    it('Space 키로 체크 가능', async () => {
      const user = userEvent.setup();
      render(<Checkbox label="체크박스" />);

      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();
      await user.keyboard(' ');
      expect(checkbox).toBeChecked();
    });
  });

  describe('Ref 전달', () => {
    it('ref가 input 요소로 전달됨', () => {
      const ref = vi.fn();
      render(<Checkbox ref={ref} aria-label="Test" />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
    });

    it('ref.current로 DOM 요소에 접근 가능', () => {
      const ref = { current: null as HTMLInputElement | null };
      render(<Checkbox ref={ref} aria-label="Test" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('HTML 속성 전달', () => {
    it('name 속성이 전달됨', () => {
      render(<Checkbox name="agreement" aria-label="Test" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'agreement');
    });

    it('value 속성이 전달됨', () => {
      render(<Checkbox value="agree" aria-label="Test" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('value', 'agree');
    });
  });

  describe('제어/비제어 컴포넌트', () => {
    it('제어 컴포넌트로 동작함', async () => {
      const user = userEvent.setup();
      const ControlledCheckbox = () => {
        const [checked, setChecked] = React.useState(false);
        return (
          <Checkbox
            label="제어 체크박스"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        );
      };

      render(<ControlledCheckbox />);
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).not.toBeChecked();
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it('비제어 컴포넌트로 동작함', async () => {
      const user = userEvent.setup();
      render(<Checkbox label="비제어 체크박스" defaultChecked />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();

      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });
  });
});

import React from 'react';
