/**
 * PresetRanges 컴포넌트 테스트
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { PresetRanges } from './PresetRanges';
import type { PresetRange, DateRange } from './types';
import { createDefaultPresets } from './utils';

// 테스트용 프리셋
const mockPresets: PresetRange[] = [
  {
    label: 'Today',
    getValue: () => ({
      startDate: new Date(2024, 0, 15),
      endDate: new Date(2024, 0, 15),
    }),
  },
  {
    label: 'Yesterday',
    getValue: () => ({
      startDate: new Date(2024, 0, 14),
      endDate: new Date(2024, 0, 14),
    }),
  },
  {
    label: 'Last 7 days',
    getValue: () => ({
      startDate: new Date(2024, 0, 9),
      endDate: new Date(2024, 0, 15),
    }),
  },
];

describe('PresetRanges', () => {
  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(<PresetRanges presets={mockPresets} onSelect={() => {}} />);
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('모든 프리셋이 옵션으로 렌더링됨', () => {
      render(<PresetRanges presets={mockPresets} onSelect={() => {}} />);

      expect(screen.getByRole('option', { name: 'Today' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Yesterday' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Last 7 days' })).toBeInTheDocument();
    });

    it('기본 프리셋이 렌더링됨', () => {
      const defaultPresets = createDefaultPresets();
      render(<PresetRanges presets={defaultPresets} onSelect={() => {}} />);

      expect(screen.getByRole('option', { name: 'Today' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Yesterday' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Last 7 days' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Last 30 days' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'This month' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Last month' })).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      const { container } = render(
        <PresetRanges presets={mockPresets} onSelect={() => {}} className="custom-class" />
      );
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });
  });

  describe('위치', () => {
    it('position="left"가 기본값으로 적용됨', () => {
      const { container } = render(<PresetRanges presets={mockPresets} onSelect={() => {}} />);
      expect(container.querySelector('[class*="preset-ranges-left"]')).toBeInTheDocument();
    });

    it('position="top"이 적용됨', () => {
      const { container } = render(
        <PresetRanges presets={mockPresets} onSelect={() => {}} position="top" />
      );
      expect(container.querySelector('[class*="preset-ranges-top"]')).toBeInTheDocument();
    });
  });

  describe('인터랙션', () => {
    it('프리셋 클릭이 onSelect를 호출함', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      render(<PresetRanges presets={mockPresets} onSelect={handleSelect} />);

      await user.click(screen.getByRole('option', { name: 'Today' }));

      expect(handleSelect).toHaveBeenCalledWith({
        startDate: new Date(2024, 0, 15),
        endDate: new Date(2024, 0, 15),
      });
    });

    it('다른 프리셋 클릭이 해당 값으로 호출됨', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      render(<PresetRanges presets={mockPresets} onSelect={handleSelect} />);

      await user.click(screen.getByRole('option', { name: 'Last 7 days' }));

      expect(handleSelect).toHaveBeenCalledWith({
        startDate: new Date(2024, 0, 9),
        endDate: new Date(2024, 0, 15),
      });
    });

    it('각 프리셋 클릭이 독립적으로 동작함', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      render(<PresetRanges presets={mockPresets} onSelect={handleSelect} />);

      await user.click(screen.getByRole('option', { name: 'Today' }));
      await user.click(screen.getByRole('option', { name: 'Yesterday' }));

      expect(handleSelect).toHaveBeenCalledTimes(2);
    });
  });

  describe('선택 상태', () => {
    it('선택된 프리셋이 강조 표시됨', () => {
      const selectedRange: DateRange = {
        startDate: new Date(2024, 0, 15),
        endDate: new Date(2024, 0, 15),
      };

      render(
        <PresetRanges
          presets={mockPresets}
          onSelect={() => {}}
          selectedRange={selectedRange}
        />
      );

      const todayOption = screen.getByRole('option', { name: 'Today' });
      expect(todayOption).toHaveAttribute('aria-selected', 'true');
    });

    it('선택되지 않은 프리셋은 aria-selected="false"', () => {
      const selectedRange: DateRange = {
        startDate: new Date(2024, 0, 15),
        endDate: new Date(2024, 0, 15),
      };

      render(
        <PresetRanges
          presets={mockPresets}
          onSelect={() => {}}
          selectedRange={selectedRange}
        />
      );

      const yesterdayOption = screen.getByRole('option', { name: 'Yesterday' });
      expect(yesterdayOption).toHaveAttribute('aria-selected', 'false');
    });

    it('selectedRange가 없으면 모든 프리셋이 선택 안됨', () => {
      render(<PresetRanges presets={mockPresets} onSelect={() => {}} />);

      const options = screen.getAllByRole('option');
      options.forEach((option) => {
        expect(option).toHaveAttribute('aria-selected', 'false');
      });
    });
  });

  describe('접근성', () => {
    it('a11y 위반 사항이 없음', async () => {
      const { container } = render(<PresetRanges presets={mockPresets} onSelect={() => {}} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('listbox role이 적용됨', () => {
      render(<PresetRanges presets={mockPresets} onSelect={() => {}} />);
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('aria-label이 적용됨', () => {
      render(<PresetRanges presets={mockPresets} onSelect={() => {}} />);
      expect(screen.getByRole('listbox')).toHaveAttribute('aria-label', 'Date range presets');
    });

    it('각 프리셋에 option role이 적용됨', () => {
      render(<PresetRanges presets={mockPresets} onSelect={() => {}} />);

      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(mockPresets.length);
    });
  });

  describe('빈 상태', () => {
    it('프리셋이 비어있으면 빈 listbox 렌더링', () => {
      render(<PresetRanges presets={[]} onSelect={() => {}} />);
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      expect(screen.queryAllByRole('option')).toHaveLength(0);
    });
  });
});
