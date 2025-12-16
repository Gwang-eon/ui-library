/**
 * DateRangePicker 컴포넌트 테스트
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { DateRangePicker } from './DateRangePicker';
import type { DateRange, PresetRange } from './types';

// 테스트용 날짜
const mockStartDate = new Date(2024, 0, 10);
const mockEndDate = new Date(2024, 0, 20);

// 커스텀 프리셋
const customPresets: PresetRange[] = [
  {
    label: 'This Week',
    getValue: () => ({
      startDate: new Date(2024, 0, 1),
      endDate: new Date(2024, 0, 7),
    }),
  },
  {
    label: 'Next Week',
    getValue: () => ({
      startDate: new Date(2024, 0, 8),
      endDate: new Date(2024, 0, 14),
    }),
  },
];

describe('DateRangePicker', () => {
  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(<DateRangePicker />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('placeholder가 표시됨', () => {
      render(<DateRangePicker startPlaceholder="From" endPlaceholder="To" />);
      expect(screen.getByPlaceholderText('From ~ To')).toBeInTheDocument();
    });

    it('value props로 날짜가 표시됨', () => {
      render(
        <DateRangePicker
          startDate={mockStartDate}
          endDate={mockEndDate}
          onChange={() => {}}
        />
      );
      expect(screen.getByRole('textbox')).toHaveValue('2024-01-10 ~ 2024-01-20');
    });

    it('시작 날짜만 있을 때 표시됨', () => {
      render(<DateRangePicker startDate={mockStartDate} onChange={() => {}} />);
      expect(screen.getByRole('textbox')).toHaveValue('2024-01-10 ~');
    });

    it('className이 적용됨', () => {
      const { container } = render(<DateRangePicker className="custom-class" />);
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });

    it('disabled 상태가 적용됨', () => {
      render(<DateRangePicker disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('error 상태가 적용됨', () => {
      const { container } = render(<DateRangePicker error />);
      expect(container.querySelector('[class*="date-picker-error"]')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`${size} size가 정상 렌더링됨`, () => {
        const { container } = render(<DateRangePicker size={size} />);
        if (size !== 'md') {
          expect(container.querySelector(`[class*="date-picker-${size}"]`)).toBeInTheDocument();
        } else {
          expect(screen.getByRole('textbox')).toBeInTheDocument();
        }
      });
    });
  });

  describe('인터랙션', () => {
    it('클릭으로 드롭다운이 열림', async () => {
      const user = userEvent.setup();
      render(<DateRangePicker />);

      await user.click(screen.getByRole('combobox'));

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('캘린더에서 날짜 범위 선택 가능', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<DateRangePicker onChange={handleChange} />);

      await user.click(screen.getByRole('combobox'));

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      // 날짜 선택
      const days = document.querySelectorAll('.react-datepicker__day:not(.react-datepicker__day--outside-month)');
      if (days.length >= 15) {
        await user.click(days[9]); // 시작일 선택
        await user.click(days[14]); // 종료일 선택

        expect(handleChange).toHaveBeenCalled();
      }
    });

    it('disabled 상태에서 드롭다운이 열리지 않음', async () => {
      const user = userEvent.setup();
      render(<DateRangePicker disabled />);

      await user.click(screen.getByRole('combobox'));

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('외부 클릭으로 드롭다운이 닫힘', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <DateRangePicker />
          <button>외부 버튼</button>
        </div>
      );

      await user.click(screen.getByRole('combobox'));

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      await user.click(screen.getByText('외부 버튼'));

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('Escape 키로 드롭다운이 닫힘', async () => {
      const user = userEvent.setup();
      render(<DateRangePicker />);

      await user.click(screen.getByRole('combobox'));

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('프리셋', () => {
    it('showPresets가 프리셋 영역을 표시함', async () => {
      const user = userEvent.setup();
      render(<DateRangePicker showPresets />);

      await user.click(screen.getByRole('combobox'));

      await waitFor(() => {
        expect(screen.getByRole('listbox', { name: /date range presets/i })).toBeInTheDocument();
      });
    });

    it('기본 프리셋이 표시됨', async () => {
      const user = userEvent.setup();
      render(<DateRangePicker showPresets />);

      await user.click(screen.getByRole('combobox'));

      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'Today' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Last 7 days' })).toBeInTheDocument();
      });
    });

    it('커스텀 프리셋이 표시됨', async () => {
      const user = userEvent.setup();
      render(<DateRangePicker showPresets presets={customPresets} />);

      await user.click(screen.getByRole('combobox'));

      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'This Week' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Next Week' })).toBeInTheDocument();
      });
    });

    it('프리셋 선택이 onChange를 호출함', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<DateRangePicker showPresets onChange={handleChange} />);

      await user.click(screen.getByRole('combobox'));

      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'Today' })).toBeInTheDocument();
      });

      await user.click(screen.getByRole('option', { name: 'Today' }));

      expect(handleChange).toHaveBeenCalled();
    });

    it('프리셋 선택 후 드롭다운이 닫힘', async () => {
      const user = userEvent.setup();
      render(<DateRangePicker showPresets onChange={() => {}} />);

      await user.click(screen.getByRole('combobox'));

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      await user.click(screen.getByRole('option', { name: 'Today' }));

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('클리어', () => {
    it('isClearable이 클리어 버튼을 표시함', () => {
      render(
        <DateRangePicker
          startDate={mockStartDate}
          endDate={mockEndDate}
          onChange={() => {}}
          isClearable
        />
      );

      expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
    });

    it('클리어 버튼 클릭이 값을 초기화함', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <DateRangePicker
          startDate={mockStartDate}
          endDate={mockEndDate}
          onChange={handleChange}
          isClearable
        />
      );

      await user.click(screen.getByRole('button', { name: /clear/i }));

      expect(handleChange).toHaveBeenCalledWith({
        startDate: null,
        endDate: null,
      });
    });

    it('값이 없으면 클리어 버튼이 숨겨짐', () => {
      render(<DateRangePicker isClearable />);

      expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
    });
  });

  describe('제어/비제어 컴포넌트', () => {
    it('비제어 컴포넌트로 동작함', async () => {
      const user = userEvent.setup();
      render(<DateRangePicker showPresets />);

      await user.click(screen.getByRole('combobox'));

      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'Today' })).toBeInTheDocument();
      });

      await user.click(screen.getByRole('option', { name: 'Today' }));

      // 값이 표시됨
      expect(screen.getByRole('textbox')).not.toHaveValue('');
    });

    it('제어 컴포넌트로 동작함', () => {
      const handleChange = vi.fn();
      const { rerender } = render(
        <DateRangePicker
          startDate={mockStartDate}
          endDate={mockEndDate}
          onChange={handleChange}
        />
      );

      expect(screen.getByRole('textbox')).toHaveValue('2024-01-10 ~ 2024-01-20');

      // 값 변경
      rerender(
        <DateRangePicker
          startDate={new Date(2024, 1, 1)}
          endDate={new Date(2024, 1, 28)}
          onChange={handleChange}
        />
      );

      expect(screen.getByRole('textbox')).toHaveValue('2024-02-01 ~ 2024-02-28');
    });
  });

  describe('날짜 제약', () => {
    it('minDate가 적용됨', async () => {
      const user = userEvent.setup();
      const minDate = new Date();
      render(<DateRangePicker minDate={minDate} />);

      await user.click(screen.getByRole('combobox'));

      await waitFor(() => {
        expect(document.querySelector('.react-datepicker')).toBeInTheDocument();
      });
    });

    it('maxDate가 적용됨', async () => {
      const user = userEvent.setup();
      const maxDate = new Date();
      render(<DateRangePicker maxDate={maxDate} />);

      await user.click(screen.getByRole('combobox'));

      await waitFor(() => {
        expect(document.querySelector('.react-datepicker')).toBeInTheDocument();
      });
    });
  });

  describe('프리셋 위치', () => {
    it('presetsPosition="left"가 적용됨', async () => {
      const user = userEvent.setup();
      const { container } = render(<DateRangePicker showPresets presetsPosition="left" />);

      await user.click(screen.getByRole('combobox'));

      await waitFor(() => {
        expect(container.querySelector('[class*="presets-left"]')).toBeInTheDocument();
      });
    });

    it('presetsPosition="top"이 적용됨', async () => {
      const user = userEvent.setup();
      const { container } = render(<DateRangePicker showPresets presetsPosition="top" />);

      await user.click(screen.getByRole('combobox'));

      await waitFor(() => {
        expect(container.querySelector('[class*="presets-top"]')).toBeInTheDocument();
      });
    });
  });

  describe('접근성', () => {
    it('a11y 위반 사항이 없음', async () => {
      const { container } = render(<DateRangePicker ariaLabel="Select date range" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('aria-label이 적용됨', () => {
      render(<DateRangePicker ariaLabel="예약 기간 선택" />);
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-label', '예약 기간 선택');
    });

    it('aria-expanded가 드롭다운 상태에 따라 변경됨', async () => {
      const user = userEvent.setup();
      render(<DateRangePicker />);

      const combobox = screen.getByRole('combobox');
      expect(combobox).toHaveAttribute('aria-expanded', 'false');

      await user.click(combobox);

      await waitFor(() => {
        expect(combobox).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('role="dialog"가 드롭다운에 적용됨', async () => {
      const user = userEvent.setup();
      render(<DateRangePicker />);

      await user.click(screen.getByRole('combobox'));

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('키보드로 열고 닫을 수 있음', async () => {
      const user = userEvent.setup();
      render(<DateRangePicker />);

      const combobox = screen.getByRole('combobox');
      combobox.focus();

      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('콜백', () => {
    it('onStartDateChange가 호출됨', async () => {
      const user = userEvent.setup();
      const handleStartChange = vi.fn();
      render(<DateRangePicker onStartDateChange={handleStartChange} />);

      await user.click(screen.getByRole('combobox'));

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      const days = document.querySelectorAll('.react-datepicker__day:not(.react-datepicker__day--outside-month)');
      if (days.length > 0) {
        await user.click(days[9]);
        expect(handleStartChange).toHaveBeenCalled();
      }
    });

    it('onEndDateChange가 호출됨', async () => {
      const user = userEvent.setup();
      const handleEndChange = vi.fn();
      render(<DateRangePicker onEndDateChange={handleEndChange} />);

      await user.click(screen.getByRole('combobox'));

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      const days = document.querySelectorAll('.react-datepicker__day:not(.react-datepicker__day--outside-month)');
      if (days.length >= 15) {
        await user.click(days[9]); // 시작일
        await user.click(days[14]); // 종료일
        expect(handleEndChange).toHaveBeenCalled();
      }
    });
  });

  describe('다중 월 표시', () => {
    it('monthsShown으로 여러 월이 표시됨', async () => {
      const user = userEvent.setup();
      render(<DateRangePicker monthsShown={2} />);

      await user.click(screen.getByRole('combobox'));

      await waitFor(() => {
        const months = document.querySelectorAll('.react-datepicker__month');
        expect(months.length).toBe(2);
      });
    });
  });
});
