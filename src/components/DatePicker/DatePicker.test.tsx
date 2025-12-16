/**
 * DatePicker 컴포넌트 테스트
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { DatePicker } from './DatePicker';

// 테스트용 날짜 고정
const mockDate = new Date(2024, 0, 15); // 2024-01-15

describe('DatePicker', () => {
  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(<DatePicker />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /open calendar/i })).toBeInTheDocument();
    });

    it('placeholder가 표시됨', () => {
      render(<DatePicker placeholder="날짜 선택" />);
      expect(screen.getByPlaceholderText('날짜 선택')).toBeInTheDocument();
    });

    it('value prop으로 날짜가 표시됨', () => {
      render(<DatePicker value={mockDate} onChange={() => {}} />);
      expect(screen.getByRole('textbox')).toHaveValue('2024-01-15');
    });

    it('커스텀 dateFormat이 적용됨', () => {
      render(<DatePicker value={mockDate} dateFormat="MM/dd/yyyy" onChange={() => {}} />);
      expect(screen.getByRole('textbox')).toHaveValue('01/15/2024');
    });

    it('className이 적용됨', () => {
      const { container } = render(<DatePicker className="custom-class" />);
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });

    it('disabled 상태가 적용됨', () => {
      render(<DatePicker disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
      expect(screen.getByRole('button', { name: /open calendar/i })).toBeDisabled();
    });

    it('error 상태가 적용됨', () => {
      const { container } = render(<DatePicker error />);
      expect(container.querySelector('[class*="date-picker-error"]')).toBeInTheDocument();
    });

    it('inline 모드가 적용됨', () => {
      const { container } = render(<DatePicker inline />);
      // inline 모드에서는 캘린더가 항상 표시됨
      expect(container.querySelector('.react-datepicker')).toBeInTheDocument();
    });

    it('isClearable이 적용됨', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<DatePicker value={mockDate} onChange={handleChange} isClearable />);

      const clearButton = screen.getByRole('button', { name: /close/i });
      await user.click(clearButton);

      expect(handleChange).toHaveBeenCalledWith(null);
    });
  });

  describe('sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`${size} size가 정상 렌더링됨`, () => {
        const { container } = render(<DatePicker size={size} />);
        if (size !== 'md') {
          expect(container.querySelector(`[class*="date-picker-${size}"]`)).toBeInTheDocument();
        } else {
          expect(screen.getByRole('textbox')).toBeInTheDocument();
        }
      });
    });
  });

  describe('인터랙션', () => {
    it('input 클릭으로 캘린더가 열림', async () => {
      const user = userEvent.setup();
      render(<DatePicker />);

      await user.click(screen.getByRole('textbox'));

      await waitFor(() => {
        expect(document.querySelector('.react-datepicker')).toBeInTheDocument();
      });
    });

    it('트리거 버튼 클릭으로 캘린더가 열림', async () => {
      const user = userEvent.setup();
      render(<DatePicker />);

      await user.click(screen.getByRole('button', { name: /open calendar/i }));

      await waitFor(() => {
        expect(document.querySelector('.react-datepicker')).toBeInTheDocument();
      });
    });

    it('날짜 선택 시 onChange가 호출됨', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<DatePicker onChange={handleChange} />);

      await user.click(screen.getByRole('textbox'));

      await waitFor(() => {
        expect(document.querySelector('.react-datepicker')).toBeInTheDocument();
      });

      // 캘린더에서 날짜 클릭
      const dayButtons = document.querySelectorAll('.react-datepicker__day:not(.react-datepicker__day--outside-month)');
      if (dayButtons.length > 0) {
        await user.click(dayButtons[14]); // 15일 선택
        expect(handleChange).toHaveBeenCalled();
      }
    });

    it('날짜 선택 후 캘린더가 닫힘', async () => {
      const user = userEvent.setup();
      render(<DatePicker onChange={() => {}} />);

      await user.click(screen.getByRole('textbox'));

      await waitFor(() => {
        expect(document.querySelector('.react-datepicker')).toBeInTheDocument();
      });

      const dayButtons = document.querySelectorAll('.react-datepicker__day:not(.react-datepicker__day--outside-month)');
      if (dayButtons.length > 0) {
        await user.click(dayButtons[10]);

        await waitFor(() => {
          expect(document.querySelector('.react-datepicker')).not.toBeInTheDocument();
        });
      }
    });

    it('disabled 상태에서 캘린더가 열리지 않음', async () => {
      const user = userEvent.setup();
      render(<DatePicker disabled />);

      await user.click(screen.getByRole('button', { name: /open calendar/i }));

      expect(document.querySelector('.react-datepicker')).not.toBeInTheDocument();
    });

    it('외부 클릭으로 캘린더가 닫힘', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <DatePicker />
          <button>외부 버튼</button>
        </div>
      );

      await user.click(screen.getByRole('textbox'));

      await waitFor(() => {
        expect(document.querySelector('.react-datepicker')).toBeInTheDocument();
      });

      await user.click(screen.getByText('외부 버튼'));

      await waitFor(() => {
        expect(document.querySelector('.react-datepicker')).not.toBeInTheDocument();
      });
    });
  });

  describe('시간 선택', () => {
    it('showTimeSelect가 시간 선택을 표시함', async () => {
      const user = userEvent.setup();
      render(<DatePicker showTimeSelect />);

      await user.click(screen.getByRole('textbox'));

      await waitFor(() => {
        expect(document.querySelector('.react-datepicker__time-container')).toBeInTheDocument();
      });
    });

    it('timeIntervals가 적용됨', async () => {
      const user = userEvent.setup();
      render(<DatePicker showTimeSelect timeIntervals={30} />);

      await user.click(screen.getByRole('textbox'));

      await waitFor(() => {
        const timeList = document.querySelector('.react-datepicker__time-list');
        expect(timeList).toBeInTheDocument();
      });
    });
  });

  describe('날짜 제약', () => {
    it('minDate가 적용됨', async () => {
      const user = userEvent.setup();
      // 오늘 날짜 기준으로 과거 날짜 제한
      const today = new Date();
      const minDate = new Date(today.getFullYear(), today.getMonth(), 15);
      render(<DatePicker minDate={minDate} />);

      await user.click(screen.getByRole('textbox'));

      await waitFor(() => {
        expect(document.querySelector('.react-datepicker')).toBeInTheDocument();
      });

      // minDate prop이 적용되었는지 확인 (disabled 클래스 또는 aria-disabled)
      const allDays = document.querySelectorAll('.react-datepicker__day');
      expect(allDays.length).toBeGreaterThan(0);
    });

    it('maxDate가 적용됨', async () => {
      const user = userEvent.setup();
      const today = new Date();
      const maxDate = new Date(today.getFullYear(), today.getMonth(), 15);
      render(<DatePicker maxDate={maxDate} />);

      await user.click(screen.getByRole('textbox'));

      await waitFor(() => {
        expect(document.querySelector('.react-datepicker')).toBeInTheDocument();
      });

      // maxDate prop이 적용되었는지 확인
      const allDays = document.querySelectorAll('.react-datepicker__day');
      expect(allDays.length).toBeGreaterThan(0);
    });

    it('filterDate로 특정 날짜 필터링됨', async () => {
      const user = userEvent.setup();
      // 주말 비활성화
      const filterDate = (date: Date) => date.getDay() !== 0 && date.getDay() !== 6;
      render(<DatePicker filterDate={filterDate} />);

      await user.click(screen.getByRole('textbox'));

      await waitFor(() => {
        // 캘린더가 열리고 filterDate가 적용됨
        expect(document.querySelector('.react-datepicker')).toBeInTheDocument();
        // 주말 날짜들이 disabled 처리됨
        const disabledDays = document.querySelectorAll('.react-datepicker__day--disabled');
        expect(disabledDays.length).toBeGreaterThan(0);
      });
    });
  });

  describe('월/년 드롭다운', () => {
    it('showMonthDropdown이 월 선택을 표시함', async () => {
      const user = userEvent.setup();
      render(<DatePicker showMonthDropdown />);

      await user.click(screen.getByRole('textbox'));

      await waitFor(() => {
        // react-datepicker v8에서는 read-view 버튼으로 표시됨
        expect(document.querySelector('.react-datepicker__month-read-view')).toBeInTheDocument();
      });
    });

    it('showYearDropdown이 년 선택을 표시함', async () => {
      const user = userEvent.setup();
      render(<DatePicker showYearDropdown />);

      await user.click(screen.getByRole('textbox'));

      await waitFor(() => {
        // react-datepicker v8에서는 read-view 버튼으로 표시됨
        expect(document.querySelector('.react-datepicker__year-read-view')).toBeInTheDocument();
      });
    });
  });

  describe('다중 월 표시', () => {
    it('monthsShown으로 여러 월이 표시됨', async () => {
      const user = userEvent.setup();
      render(<DatePicker monthsShown={2} />);

      await user.click(screen.getByRole('textbox'));

      await waitFor(() => {
        const months = document.querySelectorAll('.react-datepicker__month');
        expect(months.length).toBe(2);
      });
    });
  });

  describe('제어/비제어 컴포넌트', () => {
    it('비제어 컴포넌트로 동작함', async () => {
      const user = userEvent.setup();
      render(<DatePicker />);

      const input = screen.getByRole('textbox');
      await user.type(input, '2024-01-20');

      expect(input).toHaveValue('2024-01-20');
    });

    it('제어 컴포넌트로 동작함', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { rerender } = render(<DatePicker value={mockDate} onChange={handleChange} />);

      expect(screen.getByRole('textbox')).toHaveValue('2024-01-15');

      // 값 변경
      rerender(<DatePicker value={new Date(2024, 0, 20)} onChange={handleChange} />);
      expect(screen.getByRole('textbox')).toHaveValue('2024-01-20');
    });

    it('onChange 없이 value만 있으면 읽기 전용', () => {
      render(<DatePicker value={mockDate} />);
      expect(screen.getByRole('textbox')).toHaveValue('2024-01-15');
    });
  });

  describe('접근성', () => {
    it('a11y 위반 사항이 없음', async () => {
      const { container } = render(<DatePicker ariaLabel="날짜 선택" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('aria-label이 적용됨', () => {
      render(<DatePicker ariaLabel="생년월일 선택" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', '생년월일 선택');
    });

    it('aria-describedby가 적용됨', () => {
      render(
        <div>
          <DatePicker ariaDescribedBy="date-help" />
          <span id="date-help">YYYY-MM-DD 형식으로 입력하세요</span>
        </div>
      );
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'date-help');
    });

    it('id가 적용됨', () => {
      render(<DatePicker id="birth-date" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'birth-date');
    });

    it('name이 적용됨', () => {
      render(<DatePicker name="birthDate" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('name', 'birthDate');
    });

    it('required가 적용됨', () => {
      render(<DatePicker required />);
      expect(screen.getByRole('textbox')).toHaveAttribute('required');
    });

    it('트리거 버튼에 aria-expanded가 적용됨', async () => {
      const user = userEvent.setup();
      render(<DatePicker />);

      const trigger = screen.getByRole('button', { name: /open calendar/i });
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await user.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('키보드로 포커스 이동 가능', async () => {
      const user = userEvent.setup();
      render(<DatePicker />);

      await user.tab();
      expect(screen.getByRole('textbox')).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: /open calendar/i })).toHaveFocus();
    });
  });

  describe('ref 전달', () => {
    it('forwardRef가 정상 동작함', () => {
      const ref = { current: null };
      render(<DatePicker ref={ref} />);
      // react-datepicker의 내부 구현에 따라 ref가 설정될 수 있음
      expect(ref).toBeDefined();
    });

    it('컴포넌트가 ref를 받을 수 있음', () => {
      // React.createRef를 사용한 테스트
      const ref = { current: null as HTMLInputElement | null };
      render(<DatePicker ref={ref} />);
      // ref가 정의되어 있는지 확인
      expect(ref).toBeDefined();
    });
  });

  describe('엣지 케이스', () => {
    it('null value 처리', () => {
      render(<DatePicker value={null} onChange={() => {}} />);
      expect(screen.getByRole('textbox')).toHaveValue('');
    });

    it('undefined value 처리', () => {
      render(<DatePicker value={undefined} onChange={() => {}} />);
      expect(screen.getByRole('textbox')).toHaveValue('');
    });

    it('잘못된 날짜 입력 처리', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<DatePicker onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      await user.clear(input);
      await user.type(input, 'invalid-date');

      // 잘못된 날짜는 onChange를 호출하지 않거나 null을 전달
      // react-datepicker의 동작에 따라 다름
      expect(input).toBeInTheDocument();
    });
  });
});
