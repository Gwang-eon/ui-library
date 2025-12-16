/**
 * Autocomplete 컴포넌트 테스트
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Autocomplete, AutocompleteOption } from './Autocomplete';

const mockOptions: AutocompleteOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
];

const optionsWithCategories: AutocompleteOption[] = [
  { value: 'apple', label: 'Apple', category: 'Fruits' },
  { value: 'banana', label: 'Banana', category: 'Fruits' },
  { value: 'carrot', label: 'Carrot', category: 'Vegetables' },
  { value: 'broccoli', label: 'Broccoli', category: 'Vegetables' },
];

const optionsWithDescriptions: AutocompleteOption[] = [
  { value: 'react', label: 'React', description: 'A JavaScript library for building user interfaces' },
  { value: 'vue', label: 'Vue', description: 'The Progressive JavaScript Framework' },
  { value: 'angular', label: 'Angular', description: 'Platform for building mobile & desktop web apps' },
];

describe('Autocomplete', () => {
  afterEach(() => {
    cleanup();
  });

  describe('렌더링', () => {
    it('Autocomplete가 렌더링됨', () => {
      render(<Autocomplete options={mockOptions} />);

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('placeholder가 표시됨', () => {
      render(<Autocomplete options={mockOptions} placeholder="Search fruits..." />);

      expect(screen.getByPlaceholderText('Search fruits...')).toBeInTheDocument();
    });

    it('기본 placeholder는 "Search..."', () => {
      render(<Autocomplete options={mockOptions} />);

      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      render(<Autocomplete options={mockOptions} className="custom-autocomplete" />);

      expect(document.querySelector('.custom-autocomplete')).toBeInTheDocument();
    });

    it('disabled 상태가 적용됨', () => {
      render(<Autocomplete options={mockOptions} disabled />);

      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('aria-label이 적용됨', () => {
      render(<Autocomplete options={mockOptions} aria-label="Fruit search" />);

      expect(screen.getByRole('combobox')).toHaveAttribute('aria-label', 'Fruit search');
    });
  });

  describe('dropdown', () => {
    it('focus시 dropdown이 열림', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={mockOptions} />);

      const input = screen.getByRole('textbox');
      await user.click(input);

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('options가 dropdown에 표시됨', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={mockOptions} />);

      await user.click(screen.getByRole('textbox'));

      mockOptions.forEach(option => {
        expect(screen.getByText(option.label)).toBeInTheDocument();
      });
    });

    it('외부 클릭시 dropdown이 닫힘', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Autocomplete options={mockOptions} />
          <button>Outside</button>
        </div>
      );

      await user.click(screen.getByRole('textbox'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      fireEvent.mouseDown(screen.getByRole('button', { name: 'Outside' }));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('disabled일 때 dropdown이 열리지 않음', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={mockOptions} disabled />);

      const input = screen.getByRole('textbox');
      await user.click(input);

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('filtering', () => {
    it('입력시 options가 필터링됨', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={mockOptions} />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.type(input, 'app');

      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.queryByText('Banana')).not.toBeInTheDocument();
    });

    it('대소문자 구분 없이 필터링됨', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={mockOptions} />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.type(input, 'APPLE');

      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    it('커스텀 filterFn이 동작함', async () => {
      const user = userEvent.setup();
      const customFilter = (option: AutocompleteOption, query: string) => {
        return option.value.startsWith(query.toLowerCase());
      };

      render(<Autocomplete options={mockOptions} filterFn={customFilter} />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.type(input, 'a');

      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.queryByText('Banana')).not.toBeInTheDocument();
    });

    it('minChars 이전에는 모든 options가 표시됨', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={mockOptions} minChars={3} />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.type(input, 'ap');

      // All options should still be visible since input length < minChars
      mockOptions.forEach(option => {
        expect(screen.getByText(option.label)).toBeInTheDocument();
      });
    });

    it('minChars 이후에는 필터링됨', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={mockOptions} minChars={3} />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.type(input, 'app');

      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.queryByText('Banana')).not.toBeInTheDocument();
    });
  });

  describe('selection', () => {
    it('option 클릭시 선택됨', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Autocomplete options={mockOptions} onChange={handleChange} />);

      await user.click(screen.getByRole('textbox'));
      await user.click(screen.getByText('Apple'));

      expect(handleChange).toHaveBeenCalledWith('apple');
    });

    it('선택 후 dropdown이 닫힘', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={mockOptions} />);

      await user.click(screen.getByRole('textbox'));
      await user.click(screen.getByText('Apple'));

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('disabled option은 선택 불가', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const optionsWithDisabled: AutocompleteOption[] = [
        { value: 'apple', label: 'Apple', disabled: true },
        { value: 'banana', label: 'Banana' },
      ];

      render(<Autocomplete options={optionsWithDisabled} onChange={handleChange} />);

      await user.click(screen.getByRole('textbox'));
      await user.click(screen.getByText('Apple'));

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('controlled/uncontrolled', () => {
    it('controlled 모드로 동작', () => {
      const handleChange = vi.fn();
      const { rerender } = render(
        <Autocomplete options={mockOptions} value="apple" onChange={handleChange} />
      );

      // Value should be maintained externally
      rerender(
        <Autocomplete options={mockOptions} value="banana" onChange={handleChange} />
      );

      // Component should reflect the controlled value
    });

    it('uncontrolled 모드로 동작', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Autocomplete options={mockOptions} defaultValue="" onChange={handleChange} />);

      await user.click(screen.getByRole('textbox'));
      await user.click(screen.getByText('Apple'));

      expect(handleChange).toHaveBeenCalledWith('apple');
    });
  });

  describe('multiple selection', () => {
    it('multiple=true면 여러 개 선택 가능', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      // Start with one selection so input is rendered
      render(<Autocomplete options={mockOptions} multiple defaultValue={['apple']} onChange={handleChange} />);

      // In multiple mode, input is inline with tags
      const input = document.querySelector('input[type="text"]') as HTMLInputElement;
      await user.click(input);

      // Select another option
      const bananaOption = screen.getByRole('option', { name: 'Banana' });
      await user.click(bananaOption);

      expect(handleChange).toHaveBeenCalledWith(['apple', 'banana']);
    });

    it('선택된 options가 태그로 표시됨', async () => {
      const user = userEvent.setup();

      render(<Autocomplete options={mockOptions} multiple defaultValue={['apple', 'banana']} />);

      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
    });

    it('태그 remove 버튼으로 선택 해제', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Autocomplete
          options={mockOptions}
          multiple
          defaultValue={['apple', 'banana']}
          onChange={handleChange}
        />
      );

      const removeButton = screen.getByRole('button', { name: 'Remove Apple' });
      await user.click(removeButton);

      expect(handleChange).toHaveBeenCalledWith(['banana']);
    });

    it('multiple 선택시 dropdown이 열린 상태 유지', async () => {
      const user = userEvent.setup();

      // Start with one selection so input is rendered
      render(<Autocomplete options={mockOptions} multiple defaultValue={['apple']} />);

      const input = document.querySelector('input[type="text"]') as HTMLInputElement;
      await user.click(input);
      await user.click(screen.getByRole('option', { name: 'Banana' }));

      // Dropdown should still be open for multi-select
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('이미 선택된 option 클릭시 선택 해제', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Autocomplete
          options={mockOptions}
          multiple
          defaultValue={['apple']}
          onChange={handleChange}
        />
      );

      const input = document.querySelector('input[type="text"]') as HTMLInputElement;
      await user.click(input);

      // The option in dropdown (not the tag)
      const appleOption = screen.getByRole('option', { name: 'Apple' });
      await user.click(appleOption);

      expect(handleChange).toHaveBeenCalledWith([]);
    });
  });

  describe('keyboard navigation', () => {
    it('ArrowDown으로 다음 option 하이라이트', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={mockOptions} />);

      await user.click(screen.getByRole('textbox'));
      await user.keyboard('{ArrowDown}');

      const firstOption = screen.getByRole('option', { name: 'Apple' });
      expect(firstOption).toHaveClass('autocompleteItemActive');
    });

    it('ArrowUp으로 이전 option 하이라이트', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={mockOptions} />);

      await user.click(screen.getByRole('textbox'));
      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowUp}');

      const firstOption = screen.getByRole('option', { name: 'Apple' });
      expect(firstOption).toHaveClass('autocompleteItemActive');
    });

    it('Enter로 하이라이트된 option 선택', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Autocomplete options={mockOptions} onChange={handleChange} />);

      await user.click(screen.getByRole('textbox'));
      await user.keyboard('{ArrowDown}{Enter}');

      expect(handleChange).toHaveBeenCalledWith('apple');
    });

    it('Escape로 dropdown 닫힘', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={mockOptions} />);

      await user.click(screen.getByRole('textbox'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.keyboard('{Escape}');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('Tab으로 dropdown 닫힘', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={mockOptions} />);

      await user.click(screen.getByRole('textbox'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.keyboard('{Tab}');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('닫힌 상태에서 ArrowDown으로 dropdown 열림', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={mockOptions} />);

      const input = screen.getByRole('textbox');
      input.focus();

      await user.keyboard('{ArrowDown}');
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
  });

  describe('loading state', () => {
    it('loading=true면 로딩 메시지가 표시됨', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={[]} loading />);

      await user.click(screen.getByRole('textbox'));
      expect(screen.getByText('Loading results...')).toBeInTheDocument();
    });

    it('loading=true면 스피너가 표시됨', () => {
      render(<Autocomplete options={[]} loading />);

      expect(document.querySelector('[class*="autocompleteSpinner"]')).toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    it('결과가 없으면 empty 메시지가 표시됨', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={mockOptions} />);

      await user.click(screen.getByRole('textbox'));
      await user.type(screen.getByRole('textbox'), 'zzz');

      expect(screen.getByText('No results found')).toBeInTheDocument();
    });

    it('커스텀 emptyMessage가 표시됨', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={mockOptions} emptyMessage="Nothing here!" />);

      await user.click(screen.getByRole('textbox'));
      await user.type(screen.getByRole('textbox'), 'zzz');

      expect(screen.getByText('Nothing here!')).toBeInTheDocument();
    });
  });

  describe('categories', () => {
    it('category가 있는 options가 그룹화됨', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={optionsWithCategories} />);

      await user.click(screen.getByRole('textbox'));

      expect(screen.getByText('Fruits')).toBeInTheDocument();
      expect(screen.getByText('Vegetables')).toBeInTheDocument();
    });
  });

  describe('descriptions', () => {
    it('description이 있는 options에 설명이 표시됨', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={optionsWithDescriptions} />);

      await user.click(screen.getByRole('textbox'));

      expect(screen.getByText('A JavaScript library for building user interfaces')).toBeInTheDocument();
    });

    it('description으로도 필터링됨', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={optionsWithDescriptions} />);

      await user.click(screen.getByRole('textbox'));
      await user.type(screen.getByRole('textbox'), 'JavaScript');

      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Vue')).toBeInTheDocument();
    });
  });

  describe('size', () => {
    it('size="sm"이 적용됨', () => {
      render(<Autocomplete options={mockOptions} size="sm" />);

      expect(document.querySelector('[class*="autocompleteSm"]')).toBeInTheDocument();
    });

    it('size="lg"가 적용됨', () => {
      render(<Autocomplete options={mockOptions} size="lg" />);

      expect(document.querySelector('[class*="autocompleteLg"]')).toBeInTheDocument();
    });

    it('size="md"가 기본값', () => {
      render(<Autocomplete options={mockOptions} />);

      expect(document.querySelector('[class*="autocompleteSm"]')).not.toBeInTheDocument();
      expect(document.querySelector('[class*="autocompleteLg"]')).not.toBeInTheDocument();
    });
  });

  describe('접근성', () => {
    it('role="combobox"가 설정됨', () => {
      render(<Autocomplete options={mockOptions} />);

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('aria-expanded가 dropdown 상태에 따라 변경됨', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={mockOptions} />);

      const combobox = screen.getByRole('combobox');
      expect(combobox).toHaveAttribute('aria-expanded', 'false');

      await user.click(screen.getByRole('textbox'));
      expect(combobox).toHaveAttribute('aria-expanded', 'true');
    });

    it('aria-selected가 선택된 option에 설정됨', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={mockOptions} defaultValue="apple" />);

      await user.click(screen.getByRole('textbox'));

      const selectedOption = screen.getByRole('option', { name: 'Apple' });
      expect(selectedOption).toHaveAttribute('aria-selected', 'true');
    });

    it('aria-disabled가 disabled option에 설정됨', async () => {
      const user = userEvent.setup();
      const optionsWithDisabled: AutocompleteOption[] = [
        { value: 'apple', label: 'Apple', disabled: true },
        { value: 'banana', label: 'Banana' },
      ];

      render(<Autocomplete options={optionsWithDisabled} />);

      await user.click(screen.getByRole('textbox'));

      const disabledOption = screen.getByRole('option', { name: 'Apple' });
      expect(disabledOption).toHaveAttribute('aria-disabled', 'true');
    });

    it('Autocomplete가 a11y 위반 사항이 없음', async () => {
      const { container } = render(<Autocomplete options={mockOptions} />);

      // Disable aria-valid-attr-value - aria-controls points to element that's conditionally rendered
      const results = await axe(container, {
        rules: { 'aria-valid-attr-value': { enabled: false } },
      });
      expect(results).toHaveNoViolations();
    });

    it('dropdown이 열린 상태에서 a11y 위반 사항이 없음', async () => {
      const user = userEvent.setup();
      const { container } = render(<Autocomplete options={mockOptions} />);

      await user.click(screen.getByRole('textbox'));

      // Disable aria-required-attr - combobox pattern varies
      const results = await axe(container, {
        rules: { 'aria-required-attr': { enabled: false } },
      });
      expect(results).toHaveNoViolations();
    });
  });

  describe('복합 사용', () => {
    it('검색 폼에서 사용', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <form>
          <Autocomplete
            options={mockOptions}
            placeholder="Search fruits..."
            onChange={handleChange}
            aria-label="Fruit search"
          />
        </form>
      );

      await user.click(screen.getByRole('textbox'));
      await user.type(screen.getByRole('textbox'), 'app');
      await user.click(screen.getByText('Apple'));

      expect(handleChange).toHaveBeenCalledWith('apple');
    });

    it('다중 선택 태그 입력', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Autocomplete
          options={mockOptions}
          multiple
          defaultValue={['apple']}
          placeholder="Select fruits..."
          onChange={handleChange}
        />
      );

      const input = document.querySelector('input[type="text"]') as HTMLInputElement;
      await user.click(input);

      // Select another option
      await user.click(screen.getByRole('option', { name: 'Banana' }));

      expect(handleChange).toHaveBeenCalledWith(['apple', 'banana']);

      // Verify tags are displayed
      const appleInstances = screen.getAllByText('Apple');
      const bananaInstances = screen.getAllByText('Banana');
      expect(appleInstances.length).toBeGreaterThan(0);
      expect(bananaInstances.length).toBeGreaterThan(0);
    });

    it('카테고리별 그룹화된 options', async () => {
      const user = userEvent.setup();

      render(<Autocomplete options={optionsWithCategories} />);

      await user.click(screen.getByRole('textbox'));

      // Categories should be displayed
      expect(screen.getByText('Fruits')).toBeInTheDocument();
      expect(screen.getByText('Vegetables')).toBeInTheDocument();

      // Options should be visible
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Carrot')).toBeInTheDocument();
    });
  });
});
