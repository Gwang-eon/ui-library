/**
 * Input 컴포넌트 테스트
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Input } from './Input';

describe('Input', () => {
  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(<Input aria-label="Test input" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('label이 정상적으로 렌더링됨', () => {
      render(<Input label="이메일" />);
      expect(screen.getByLabelText('이메일')).toBeInTheDocument();
    });

    it('placeholder가 정상적으로 표시됨', () => {
      render(<Input placeholder="입력하세요" aria-label="Test" />);
      expect(screen.getByPlaceholderText('입력하세요')).toBeInTheDocument();
    });

    it('required 표시가 렌더링됨', () => {
      render(<Input label="필수 입력" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    const variants = ['outlined', 'filled', 'underline', 'flush'] as const;

    variants.forEach((variant) => {
      it(`${variant} variant가 정상 렌더링됨`, () => {
        render(<Input variant={variant} aria-label="Test" />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
    });
  });

  describe('sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`${size} size가 정상 렌더링됨`, () => {
        render(<Input size={size} aria-label="Test" />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
    });
  });

  describe('states', () => {
    it('error 상태에서 aria-invalid가 true임', () => {
      render(<Input state="error" aria-label="Test" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('error 상태에서 에러 메시지가 표시됨', () => {
      render(<Input state="error" errorMessage="유효하지 않은 입력입니다" aria-label="Test" />);
      expect(screen.getByText('유효하지 않은 입력입니다')).toBeInTheDocument();
    });

    it('success 상태에서 성공 메시지가 표시됨', () => {
      render(<Input state="success" successMessage="확인되었습니다" aria-label="Test" />);
      expect(screen.getByText('확인되었습니다')).toBeInTheDocument();
    });

    it('warning 상태에서 경고 메시지가 표시됨', () => {
      render(<Input state="warning" warningMessage="주의가 필요합니다" aria-label="Test" />);
      expect(screen.getByText('주의가 필요합니다')).toBeInTheDocument();
    });

    it('default 상태에서 helperText가 표시됨', () => {
      render(<Input helperText="도움말 텍스트입니다" aria-label="Test" />);
      expect(screen.getByText('도움말 텍스트입니다')).toBeInTheDocument();
    });
  });

  describe('인터랙션', () => {
    it('입력이 정상 동작함', async () => {
      const user = userEvent.setup();
      render(<Input aria-label="Test" />);

      const input = screen.getByRole('textbox');
      await user.type(input, '테스트 입력');
      expect(input).toHaveValue('테스트 입력');
    });

    it('onChange 이벤트가 정상 동작함', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} aria-label="Test" />);

      await user.type(screen.getByRole('textbox'), 'a');
      expect(handleChange).toHaveBeenCalled();
    });

    it('onFocus 이벤트가 정상 동작함', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      render(<Input onFocus={handleFocus} aria-label="Test" />);

      await user.click(screen.getByRole('textbox'));
      expect(handleFocus).toHaveBeenCalled();
    });

    it('onBlur 이벤트가 정상 동작함', async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();
      render(<Input onBlur={handleBlur} aria-label="Test" />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.tab();
      expect(handleBlur).toHaveBeenCalled();
    });

    it('disabled 상태에서 입력 불가', () => {
      render(<Input disabled aria-label="Test" />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('readOnly 상태에서 수정 불가', () => {
      render(<Input readOnly value="읽기 전용" aria-label="Test" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    });
  });

  describe('아이콘', () => {
    it('leftIcon이 정상 렌더링됨', () => {
      render(<Input leftIcon={<span data-testid="left-icon">🔍</span>} aria-label="Test" />);
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('rightIcon이 정상 렌더링됨', () => {
      render(<Input rightIcon={<span data-testid="right-icon">✓</span>} aria-label="Test" />);
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('양쪽 아이콘이 동시에 렌더링됨', () => {
      render(
        <Input
          leftIcon={<span data-testid="left-icon">🔍</span>}
          rightIcon={<span data-testid="right-icon">✓</span>}
          aria-label="Test"
        />
      );
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
  });

  describe('label position', () => {
    it('top labelPosition이 기본값으로 적용됨', () => {
      render(<Input label="라벨" />);
      expect(screen.getByLabelText('라벨')).toBeInTheDocument();
    });

    it('horizontal labelPosition이 정상 적용됨', () => {
      render(<Input label="라벨" labelPosition="horizontal" helperText="도움말" />);
      expect(screen.getByLabelText('라벨')).toBeInTheDocument();
      expect(screen.getByText('도움말')).toBeInTheDocument();
    });
  });

  describe('className', () => {
    it('추가 className이 적용됨', () => {
      render(<Input className="custom-class" aria-label="Test" />);
      expect(screen.getByRole('textbox')).toHaveClass('custom-class');
    });

    it('wrapperClassName이 적용됨', () => {
      const { container } = render(<Input wrapperClassName="wrapper-class" aria-label="Test" />);
      expect(container.firstChild).toHaveClass('wrapper-class');
    });
  });

  describe('fullWidth', () => {
    it('fullWidth가 적용됨', () => {
      const { container } = render(<Input fullWidth aria-label="Test" />);
      expect(container.firstChild).toHaveClass('input-full-width');
    });
  });

  describe('접근성', () => {
    it('a11y 위반 사항이 없음', async () => {
      const { container } = render(<Input label="접근성 테스트" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('에러 상태에서 aria-describedby가 메시지를 참조함', () => {
      render(<Input label="입력" state="error" errorMessage="에러입니다" id="test-input" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'test-input-message');
    });

    it('Tab 키로 포커스 이동 가능', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Input label="첫번째" />
          <Input label="두번째" />
        </div>
      );

      await user.tab();
      expect(screen.getByLabelText('첫번째')).toHaveFocus();

      await user.tab();
      expect(screen.getByLabelText('두번째')).toHaveFocus();
    });
  });

  describe('Ref 전달', () => {
    it('ref가 input 요소로 전달됨', () => {
      const ref = vi.fn();
      render(<Input ref={ref} aria-label="Test" />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
    });

    it('ref.current로 DOM 요소에 접근 가능', () => {
      const ref = { current: null as HTMLInputElement | null };
      render(<Input ref={ref} aria-label="Test" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('ref를 통해 focus() 호출 가능', () => {
      const ref = { current: null as HTMLInputElement | null };
      render(<Input ref={ref} aria-label="Test" />);
      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  describe('HTML 속성 전달', () => {
    it('type 속성이 전달됨', () => {
      render(<Input type="email" aria-label="Email" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
    });

    it('name 속성이 전달됨', () => {
      render(<Input name="username" aria-label="Username" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('name', 'username');
    });

    it('maxLength 속성이 전달됨', () => {
      render(<Input maxLength={10} aria-label="Test" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '10');
    });

    it('autoComplete 속성이 전달됨', () => {
      render(<Input autoComplete="email" aria-label="Email" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('autocomplete', 'email');
    });

    it('data-* 속성이 전달됨', () => {
      render(<Input data-testid="custom-input" aria-label="Test" />);
      expect(screen.getByTestId('custom-input')).toBeInTheDocument();
    });
  });

  describe('제어/비제어 컴포넌트', () => {
    it('제어 컴포넌트로 동작함', async () => {
      const user = userEvent.setup();
      const ControlledInput = () => {
        const [value, setValue] = React.useState('');
        return (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label="Controlled"
          />
        );
      };

      render(<ControlledInput />);
      const input = screen.getByRole('textbox');

      await user.type(input, '제어 입력');
      expect(input).toHaveValue('제어 입력');
    });

    it('비제어 컴포넌트로 동작함', async () => {
      const user = userEvent.setup();
      render(<Input defaultValue="초기값" aria-label="Uncontrolled" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('초기값');

      await user.clear(input);
      await user.type(input, '새 값');
      expect(input).toHaveValue('새 값');
    });
  });
});

// React import for controlled component test
import React from 'react';
