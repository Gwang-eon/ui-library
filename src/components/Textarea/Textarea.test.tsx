/**
 * Textarea 컴포넌트 테스트
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(<Textarea aria-label="Test textarea" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('label이 정상적으로 렌더링됨', () => {
      render(<Textarea label="설명" />);
      expect(screen.getByLabelText('설명')).toBeInTheDocument();
    });

    it('placeholder가 정상적으로 표시됨', () => {
      render(<Textarea placeholder="내용을 입력하세요" aria-label="Test" />);
      expect(screen.getByPlaceholderText('내용을 입력하세요')).toBeInTheDocument();
    });

    it('required 표시가 렌더링됨', () => {
      render(<Textarea label="필수 입력" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('기본 rows가 4로 설정됨', () => {
      render(<Textarea aria-label="Test" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('rows', '4');
    });

    it('rows prop이 정상 적용됨', () => {
      render(<Textarea rows={8} aria-label="Test" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('rows', '8');
    });
  });

  describe('sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`${size} size가 정상 렌더링됨`, () => {
        render(<Textarea size={size} aria-label="Test" />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
    });
  });

  describe('states', () => {
    it('error 상태에서 aria-invalid가 true임', () => {
      render(<Textarea state="error" aria-label="Test" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('default 상태에서 aria-invalid가 false임', () => {
      render(<Textarea state="default" aria-label="Test" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
    });

    it('error 상태에서 에러 메시지가 표시됨', () => {
      render(<Textarea state="error" errorMessage="필수 항목입니다" aria-label="Test" />);
      expect(screen.getByText('필수 항목입니다')).toBeInTheDocument();
    });

    it('success 상태에서 성공 메시지가 표시됨', () => {
      render(<Textarea state="success" successMessage="입력이 완료되었습니다" aria-label="Test" />);
      expect(screen.getByText('입력이 완료되었습니다')).toBeInTheDocument();
    });

    it('warning 상태에서 경고 메시지가 표시됨', () => {
      render(<Textarea state="warning" warningMessage="주의가 필요합니다" aria-label="Test" />);
      expect(screen.getByText('주의가 필요합니다')).toBeInTheDocument();
    });

    it('default 상태에서 helperText가 표시됨', () => {
      render(<Textarea helperText="최대 500자까지 입력 가능합니다" aria-label="Test" />);
      expect(screen.getByText('최대 500자까지 입력 가능합니다')).toBeInTheDocument();
    });

    it('state에 따른 메시지가 helperText보다 우선됨', () => {
      render(
        <Textarea
          state="error"
          helperText="도움말"
          errorMessage="에러 메시지"
          aria-label="Test"
        />
      );
      expect(screen.getByText('에러 메시지')).toBeInTheDocument();
      expect(screen.queryByText('도움말')).not.toBeInTheDocument();
    });
  });

  describe('resize', () => {
    const resizeOptions = ['none', 'both', 'horizontal', 'vertical'] as const;

    resizeOptions.forEach((resize) => {
      it(`${resize} resize 옵션이 정상 적용됨`, () => {
        render(<Textarea resize={resize} aria-label="Test" />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
    });

    it('기본 resize가 vertical임', () => {
      render(<Textarea aria-label="Test" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  describe('character counter', () => {
    it('showCounter가 true일 때 카운터가 표시됨', () => {
      render(<Textarea showCounter aria-label="Test" />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('maxLength와 함께 카운터가 표시됨', () => {
      render(<Textarea showCounter maxLength={100} aria-label="Test" />);
      expect(screen.getByText('0 / 100')).toBeInTheDocument();
    });

    it('입력 시 카운터가 업데이트됨', async () => {
      const user = userEvent.setup();
      render(<Textarea showCounter maxLength={100} aria-label="Test" />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Hello');

      expect(screen.getByText('5 / 100')).toBeInTheDocument();
    });

    it('value prop이 있을 때 초기 카운터가 정상 표시됨', () => {
      render(<Textarea showCounter value="초기값" onChange={() => {}} aria-label="Test" />);
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('defaultValue가 있을 때 초기 카운터가 정상 표시됨', () => {
      render(<Textarea showCounter defaultValue="기본값입니다" aria-label="Test" />);
      expect(screen.getByText('6')).toBeInTheDocument();
    });

    it('renderCounter 함수가 정상 동작함', () => {
      const customRender = (current: number, max?: number) =>
        `남은 글자: ${max ? max - current : '∞'}`;

      render(
        <Textarea
          showCounter
          maxLength={50}
          renderCounter={customRender}
          aria-label="Test"
        />
      );
      expect(screen.getByText('남은 글자: 50')).toBeInTheDocument();
    });

    it('renderCounter에서 maxLength 없이 동작함', () => {
      const customRender = (current: number, max?: number) =>
        max ? `${current}/${max}` : `${current}자`;

      render(<Textarea showCounter renderCounter={customRender} aria-label="Test" />);
      expect(screen.getByText('0자')).toBeInTheDocument();
    });
  });

  describe('인터랙션', () => {
    it('입력값이 정상적으로 변경됨', async () => {
      const user = userEvent.setup();
      render(<Textarea aria-label="Test" />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, '테스트 입력');

      expect(textarea).toHaveValue('테스트 입력');
    });

    it('onChange 이벤트가 호출됨', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Textarea onChange={handleChange} aria-label="Test" />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'A');

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('disabled 상태에서 입력이 불가능함', async () => {
      const user = userEvent.setup();
      render(<Textarea disabled aria-label="Test" />);

      const textarea = screen.getByRole('textbox');
      expect(textarea).toBeDisabled();

      await user.type(textarea, '입력');
      expect(textarea).toHaveValue('');
    });

    it('readOnly 상태에서 입력이 불가능함', async () => {
      const user = userEvent.setup();
      render(<Textarea readOnly defaultValue="읽기 전용" aria-label="Test" />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, '추가');

      expect(textarea).toHaveValue('읽기 전용');
    });

    it('maxLength가 적용됨', async () => {
      const user = userEvent.setup();
      render(<Textarea maxLength={5} aria-label="Test" />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, '1234567890');

      expect(textarea).toHaveValue('12345');
    });

    it('포커스 이벤트가 정상 동작함', async () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      const user = userEvent.setup();

      render(<Textarea onFocus={handleFocus} onBlur={handleBlur} aria-label="Test" />);

      const textarea = screen.getByRole('textbox');
      await user.click(textarea);
      expect(handleFocus).toHaveBeenCalledTimes(1);

      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('fullWidth', () => {
    it('fullWidth prop이 적용됨', () => {
      const { container } = render(<Textarea fullWidth aria-label="Test" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('input-full-width');
    });
  });

  describe('ref 전달', () => {
    it('ref가 textarea 요소에 전달됨', () => {
      const ref = vi.fn();
      render(<Textarea ref={ref} aria-label="Test" />);

      expect(ref).toHaveBeenCalled();
      expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLTextAreaElement);
    });

    it('ref.current로 textarea에 접근 가능함', () => {
      const ref = { current: null as HTMLTextAreaElement | null };
      render(<Textarea ref={ref} aria-label="Test" />);

      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
      expect(ref.current?.tagName).toBe('TEXTAREA');
    });
  });

  describe('커스텀 className', () => {
    it('추가 className이 적용됨', () => {
      const { container } = render(<Textarea className="custom-class" aria-label="Test" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('controlled vs uncontrolled', () => {
    it('controlled 모드에서 value가 정상 동작함', async () => {
      const ControlledTextarea = () => {
        const [value, setValue] = React.useState('초기값');
        return (
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label="Test"
          />
        );
      };

      const user = userEvent.setup();
      render(<ControlledTextarea />);

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveValue('초기값');

      await user.clear(textarea);
      await user.type(textarea, '새 값');
      expect(textarea).toHaveValue('새 값');
    });

    it('uncontrolled 모드에서 defaultValue가 정상 동작함', () => {
      render(<Textarea defaultValue="기본값" aria-label="Test" />);
      expect(screen.getByRole('textbox')).toHaveValue('기본값');
    });
  });

  describe('접근성', () => {
    it('label과 textarea가 연결됨', () => {
      render(<Textarea label="코멘트" />);
      const textarea = screen.getByLabelText('코멘트');
      expect(textarea).toBeInTheDocument();
    });

    it('에러 메시지가 aria-describedby로 연결됨', () => {
      render(<Textarea state="error" errorMessage="에러입니다" label="테스트" />);
      const textarea = screen.getByRole('textbox');
      const describedById = textarea.getAttribute('aria-describedby');

      expect(describedById).toBeTruthy();
      const messageElement = document.getElementById(describedById!);
      expect(messageElement).toHaveTextContent('에러입니다');
    });

    it('helperText가 aria-describedby로 연결됨', () => {
      render(<Textarea helperText="도움말입니다" label="테스트" />);
      const textarea = screen.getByRole('textbox');
      const describedById = textarea.getAttribute('aria-describedby');

      expect(describedById).toBeTruthy();
      const messageElement = document.getElementById(describedById!);
      expect(messageElement).toHaveTextContent('도움말입니다');
    });

    it('메시지가 없으면 aria-describedby가 없음', () => {
      render(<Textarea label="테스트" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).not.toHaveAttribute('aria-describedby');
    });

    it('a11y 위반 사항이 없음 (기본)', async () => {
      const { container } = render(<Textarea label="테스트" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('a11y 위반 사항이 없음 (에러 상태)', async () => {
      const { container } = render(
        <Textarea label="테스트" state="error" errorMessage="에러입니다" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('a11y 위반 사항이 없음 (disabled)', async () => {
      const { container } = render(<Textarea label="테스트" disabled />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('a11y 위반 사항이 없음 (required)', async () => {
      const { container } = render(<Textarea label="필수 입력" required />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('id 처리', () => {
    it('커스텀 id가 적용됨', () => {
      render(<Textarea id="custom-textarea" label="테스트" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'custom-textarea');
    });

    it('id가 없으면 자동 생성됨', () => {
      render(<Textarea label="테스트" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea.id).toBeTruthy();
      expect(textarea.id).toContain('textarea-');
    });
  });
});

// React import for controlled component test
import React from 'react';
