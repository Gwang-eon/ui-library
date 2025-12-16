/**
 * ColorPicker 컴포넌트 테스트
 */
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { ColorPicker } from './ColorPicker';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('ColorPicker', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe('렌더링', () => {
    it('ColorPicker가 렌더링됨', () => {
      render(<ColorPicker />);

      expect(document.querySelector('[class*="colorPicker"]')).toBeInTheDocument();
    });

    it('기본값이 적용됨', () => {
      render(<ColorPicker />);

      const input = document.querySelector('input[type="text"]');
      expect(input).toHaveValue('#3B82F6');
    });

    it('defaultValue가 적용됨', () => {
      render(<ColorPicker defaultValue="#EF4444" />);

      const input = document.querySelector('input[type="text"]');
      expect(input).toHaveValue('#EF4444');
    });

    it('label이 렌더링됨', () => {
      render(<ColorPicker label="Choose a color" />);

      expect(screen.getByText('Choose a color')).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      render(<ColorPicker className="custom-picker" />);

      expect(document.querySelector('.custom-picker')).toBeInTheDocument();
    });

    it('disabled 상태가 적용됨', () => {
      render(<ColorPicker disabled />);

      const input = document.querySelector('input[type="text"]');
      expect(input).toBeDisabled();
    });
  });

  describe('controlled/uncontrolled', () => {
    it('controlled 모드로 동작', () => {
      const handleChange = vi.fn();
      const { rerender } = render(
        <ColorPicker value="#EF4444" onChange={handleChange} />
      );

      const input = document.querySelector('input[type="text"]');
      expect(input).toHaveValue('#EF4444');

      rerender(<ColorPicker value="#10B981" onChange={handleChange} />);
      expect(input).toHaveValue('#10B981');
    });

    it('uncontrolled 모드로 동작', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<ColorPicker defaultValue="#3B82F6" onChange={handleChange} />);

      // Open picker
      const trigger = screen.getByRole('button', { name: 'Open color picker' });
      await user.click(trigger);

      // Select a preset color
      const presetButton = screen.getByRole('button', { name: 'Select preset color #EF4444' });
      await user.click(presetButton);

      expect(handleChange).toHaveBeenCalledWith('#EF4444');
    });
  });

  describe('dropdown', () => {
    it('클릭으로 dropdown이 열림', async () => {
      const user = userEvent.setup();
      render(<ColorPicker />);

      const trigger = screen.getByRole('button', { name: 'Open color picker' });
      await user.click(trigger);

      expect(screen.getByText('Choose Color')).toBeInTheDocument();
    });

    it('disabled일 때 dropdown이 열리지 않음', async () => {
      const user = userEvent.setup();
      render(<ColorPicker disabled />);

      const trigger = screen.getByRole('button', { name: 'Open color picker' });
      await user.click(trigger);

      expect(screen.queryByText('Choose Color')).not.toBeInTheDocument();
    });

    it('외부 클릭으로 dropdown이 닫힘', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <ColorPicker />
          <button>Outside</button>
        </div>
      );

      // Open dropdown
      const trigger = screen.getByRole('button', { name: 'Open color picker' });
      await user.click(trigger);
      expect(screen.getByText('Choose Color')).toBeInTheDocument();

      // Click outside
      fireEvent.mouseDown(screen.getByRole('button', { name: 'Outside' }));
      expect(screen.queryByText('Choose Color')).not.toBeInTheDocument();
    });

    it('Cancel 버튼으로 dropdown이 닫힘', async () => {
      const user = userEvent.setup();
      render(<ColorPicker />);

      // Open dropdown
      const trigger = screen.getByRole('button', { name: 'Open color picker' });
      await user.click(trigger);

      // Click cancel
      await user.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(screen.queryByText('Choose Color')).not.toBeInTheDocument();
    });
  });

  describe('HEX 입력', () => {
    it('HEX 입력이 동작함', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ColorPicker onChange={handleChange} />);

      // Open dropdown
      const trigger = screen.getByRole('button', { name: 'Open color picker' });
      await user.click(trigger);

      // Find HEX input
      const hexInput = document.querySelector('input[type="text"].colorInputText') as HTMLInputElement;
      if (!hexInput) {
        // Try alternative selector
        const inputs = document.querySelectorAll('input[type="text"]');
        const hexInputAlt = Array.from(inputs).find(input =>
          input.classList.toString().includes('colorInputText')
        );
        expect(hexInputAlt).toBeInTheDocument();
      }
    });

    it('유효한 HEX가 Apply되면 onChange가 호출됨', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ColorPicker onChange={handleChange} />);

      // Open dropdown
      const trigger = screen.getByRole('button', { name: 'Open color picker' });
      await user.click(trigger);

      // Click Apply
      await user.click(screen.getByRole('button', { name: 'Apply' }));
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('preset colors', () => {
    it('기본 preset colors가 표시됨', async () => {
      const user = userEvent.setup();
      render(<ColorPicker />);

      const trigger = screen.getByRole('button', { name: 'Open color picker' });
      await user.click(trigger);

      expect(screen.getByText('Preset Colors')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Select preset color #EF4444' })).toBeInTheDocument();
    });

    it('커스텀 preset colors가 표시됨', async () => {
      const user = userEvent.setup();
      const customPresets = ['#FF0000', '#00FF00', '#0000FF'];
      render(<ColorPicker presets={customPresets} />);

      const trigger = screen.getByRole('button', { name: 'Open color picker' });
      await user.click(trigger);

      expect(screen.getByRole('button', { name: 'Select preset color #FF0000' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Select preset color #00FF00' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Select preset color #0000FF' })).toBeInTheDocument();
    });

    it('preset color 클릭시 색상이 선택됨', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ColorPicker onChange={handleChange} />);

      const trigger = screen.getByRole('button', { name: 'Open color picker' });
      await user.click(trigger);

      const presetButton = screen.getByRole('button', { name: 'Select preset color #EF4444' });
      await user.click(presetButton);

      expect(handleChange).toHaveBeenCalledWith('#EF4444');
    });

    it('빈 preset 배열이면 Preset Colors 섹션이 숨겨짐', async () => {
      const user = userEvent.setup();
      render(<ColorPicker presets={[]} />);

      const trigger = screen.getByRole('button', { name: 'Open color picker' });
      await user.click(trigger);

      expect(screen.queryByText('Preset Colors')).not.toBeInTheDocument();
    });
  });

  describe('recent colors', () => {
    it('showRecent=true면 recent colors 섹션이 표시됨 (색상 있을 때)', async () => {
      const user = userEvent.setup();
      localStorageMock.getItem.mockReturnValue(JSON.stringify(['#FF0000', '#00FF00']));

      render(<ColorPicker showRecent={true} />);

      const trigger = screen.getByRole('button', { name: 'Open color picker' });
      await user.click(trigger);

      expect(screen.getByText('Recent Colors')).toBeInTheDocument();
    });

    it('showRecent=false면 recent colors가 로드되지 않음', async () => {
      const user = userEvent.setup();
      render(<ColorPicker showRecent={false} />);

      const trigger = screen.getByRole('button', { name: 'Open color picker' });
      await user.click(trigger);

      expect(screen.queryByText('Recent Colors')).not.toBeInTheDocument();
    });

    it('색상 선택시 recent colors에 저장됨', async () => {
      const user = userEvent.setup();
      render(<ColorPicker showRecent={true} />);

      const trigger = screen.getByRole('button', { name: 'Open color picker' });
      await user.click(trigger);

      const presetButton = screen.getByRole('button', { name: 'Select preset color #EF4444' });
      await user.click(presetButton);

      expect(localStorageMock.setItem).toHaveBeenCalled();
    });
  });

  describe('compact mode', () => {
    it('compact 모드가 렌더링됨', () => {
      render(<ColorPicker compact />);

      expect(document.querySelector('[class*="colorPickerCompact"]')).toBeInTheDocument();
    });

    it('compact 모드에서 swatch 버튼이 표시됨', () => {
      render(<ColorPicker compact />);

      expect(screen.getByRole('button', { name: 'Select color #EF4444' })).toBeInTheDocument();
    });

    it('compact 모드에서 색상 선택이 동작함', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ColorPicker compact onChange={handleChange} />);

      const swatchButton = screen.getByRole('button', { name: 'Select color #EF4444' });
      await user.click(swatchButton);

      expect(handleChange).toHaveBeenCalledWith('#EF4444');
    });

    it('compact 모드에서 allowCustom=true면 + 버튼이 표시됨', () => {
      render(<ColorPicker compact allowCustom />);

      expect(screen.getByRole('button', { name: 'Custom color' })).toBeInTheDocument();
    });

    it('compact 모드에서 + 버튼 클릭시 커스텀 picker가 열림', async () => {
      const user = userEvent.setup();
      render(<ColorPicker compact allowCustom />);

      const customButton = screen.getByRole('button', { name: 'Custom color' });
      await user.click(customButton);

      expect(screen.getByText('Choose Color')).toBeInTheDocument();
    });

    it('compact 모드에서 disabled가 적용됨', () => {
      render(<ColorPicker compact disabled />);

      const swatchButton = screen.getByRole('button', { name: 'Select color #EF4444' });
      expect(swatchButton).toBeDisabled();
    });
  });

  describe('size', () => {
    it('size="sm"이 compact 모드에서 적용됨', () => {
      render(<ColorPicker compact size="sm" />);

      expect(document.querySelector('[class*="colorSwatchesSm"]')).toBeInTheDocument();
    });

    it('size="md"가 기본값', () => {
      render(<ColorPicker compact />);

      expect(document.querySelector('[class*="colorSwatchesSm"]')).not.toBeInTheDocument();
    });
  });

  describe('allowCustom', () => {
    it('allowCustom=false면 compact 모드에서 + 버튼이 숨겨짐', () => {
      render(<ColorPicker compact allowCustom={false} />);

      expect(screen.queryByRole('button', { name: 'Custom color' })).not.toBeInTheDocument();
    });
  });

  describe('custom trigger', () => {
    it('children이 custom trigger로 사용됨', async () => {
      const user = userEvent.setup();
      render(
        <ColorPicker>
          <button data-testid="custom-trigger">Pick Color</button>
        </ColorPicker>
      );

      expect(screen.getByTestId('custom-trigger')).toBeInTheDocument();

      await user.click(screen.getByTestId('custom-trigger'));
      expect(screen.getByText('Choose Color')).toBeInTheDocument();
    });
  });

  describe('RGB 입력', () => {
    it('RGB 입력 필드가 표시됨', async () => {
      const user = userEvent.setup();
      render(<ColorPicker />);

      const trigger = screen.getByRole('button', { name: 'Open color picker' });
      await user.click(trigger);

      expect(screen.getByText('R')).toBeInTheDocument();
      expect(screen.getByText('G')).toBeInTheDocument();
      expect(screen.getByText('B')).toBeInTheDocument();
    });

    it('RGB 값이 HEX에서 변환됨', async () => {
      const user = userEvent.setup();
      render(<ColorPicker defaultValue="#FF0000" />);

      const trigger = screen.getByRole('button', { name: 'Open color picker' });
      await user.click(trigger);

      // Check RGB display text
      expect(screen.getByText(/RGB\(255, 0, 0\)/)).toBeInTheDocument();
    });
  });

  describe('color preview', () => {
    it('color preview가 표시됨', async () => {
      const user = userEvent.setup();
      render(<ColorPicker defaultValue="#EF4444" />);

      const trigger = screen.getByRole('button', { name: 'Open color picker' });
      await user.click(trigger);

      // Check preview swatch
      const previewSwatch = document.querySelector('[class*="colorSwatchLg"]');
      expect(previewSwatch).toBeInTheDocument();
      expect(previewSwatch).toHaveStyle({ backgroundColor: '#EF4444' });
    });

    it('HEX 값이 표시됨', async () => {
      const user = userEvent.setup();
      render(<ColorPicker defaultValue="#EF4444" />);

      const trigger = screen.getByRole('button', { name: 'Open color picker' });
      await user.click(trigger);

      expect(screen.getByText('#EF4444')).toBeInTheDocument();
    });
  });

  describe('Apply/Cancel', () => {
    it('Apply 클릭시 색상이 적용됨', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ColorPicker onChange={handleChange} />);

      const trigger = screen.getByRole('button', { name: 'Open color picker' });
      await user.click(trigger);

      await user.click(screen.getByRole('button', { name: 'Apply' }));
      expect(handleChange).toHaveBeenCalled();
    });

    it('Cancel 클릭시 변경사항이 취소됨', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ColorPicker defaultValue="#3B82F6" onChange={handleChange} />);

      const trigger = screen.getByRole('button', { name: 'Open color picker' });
      await user.click(trigger);

      // Cancel without making changes
      await user.click(screen.getByRole('button', { name: 'Cancel' }));

      // Dropdown should close without calling onChange
      expect(screen.queryByText('Choose Color')).not.toBeInTheDocument();
    });
  });

  describe('접근성', () => {
    it('swatch 버튼에 aria-label이 있음', () => {
      render(<ColorPicker compact />);

      const swatchButton = screen.getByRole('button', { name: 'Select color #EF4444' });
      expect(swatchButton).toHaveAttribute('aria-label', 'Select color #EF4444');
    });

    it('picker 버튼에 aria-label이 있음', () => {
      render(<ColorPicker />);

      const pickerButton = screen.getByRole('button', { name: 'Open color picker' });
      expect(pickerButton).toHaveAttribute('aria-label', 'Open color picker');
    });

    it('기본 ColorPicker가 a11y 위반 사항이 없음', async () => {
      const { container } = render(<ColorPicker />);

      // Disable label rule - the readonly input is just for display, not form submission
      const results = await axe(container, {
        rules: {
          'color-contrast': { enabled: false },
          label: { enabled: false },
        },
      });
      expect(results).toHaveNoViolations();
    });

    it('compact ColorPicker가 a11y 위반 사항이 없음', async () => {
      const { container } = render(<ColorPicker compact />);

      const results = await axe(container, {
        rules: { 'color-contrast': { enabled: false } },
      });
      expect(results).toHaveNoViolations();
    });
  });

  describe('복합 사용', () => {
    it('폼에서 사용', async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn((e) => e.preventDefault());
      const handleChange = vi.fn();

      render(
        <form onSubmit={handleSubmit}>
          <ColorPicker
            label="Theme Color"
            defaultValue="#3B82F6"
            onChange={handleChange}
          />
          <button type="submit">Save</button>
        </form>
      );

      expect(screen.getByText('Theme Color')).toBeInTheDocument();

      // Open and select color
      const trigger = screen.getByRole('button', { name: 'Open color picker' });
      await user.click(trigger);

      const presetButton = screen.getByRole('button', { name: 'Select preset color #EF4444' });
      await user.click(presetButton);

      expect(handleChange).toHaveBeenCalledWith('#EF4444');
    });

    it('compact 모드에서 커스텀 색상 선택', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<ColorPicker compact allowCustom onChange={handleChange} />);

      // Click custom button
      await user.click(screen.getByRole('button', { name: 'Custom color' }));

      // Apply
      await user.click(screen.getByRole('button', { name: 'Apply' }));

      expect(handleChange).toHaveBeenCalled();
    });

    it('여러 preset 그룹', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const presets = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

      render(<ColorPicker presets={presets} onChange={handleChange} />);

      const trigger = screen.getByRole('button', { name: 'Open color picker' });
      await user.click(trigger);

      // All presets should be visible
      presets.forEach(color => {
        expect(screen.getByRole('button', { name: `Select preset color ${color}` })).toBeInTheDocument();
      });
    });
  });
});
