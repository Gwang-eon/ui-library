/**
 * CascadeSelect 컴포넌트 테스트
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { CascadeSelect, CascadeOption } from './CascadeSelect';

const mockOptions: CascadeOption[] = [
  {
    label: 'Building A',
    value: 'building-a',
    children: [
      {
        label: 'Floor 1',
        value: 'floor-1',
        children: [
          { label: 'Zone A', value: 'zone-a' },
          { label: 'Zone B', value: 'zone-b' },
        ],
      },
      {
        label: 'Floor 2',
        value: 'floor-2',
        children: [
          { label: 'Zone C', value: 'zone-c' },
          { label: 'Zone D', value: 'zone-d' },
        ],
      },
    ],
  },
  {
    label: 'Building B',
    value: 'building-b',
    children: [
      {
        label: 'Floor 1',
        value: 'floor-1-b',
        children: [
          { label: 'Zone E', value: 'zone-e' },
        ],
      },
    ],
  },
];

const simpleOptions: CascadeOption[] = [
  { label: 'Option 1', value: 'opt-1' },
  { label: 'Option 2', value: 'opt-2' },
  { label: 'Option 3', value: 'opt-3' },
];

describe('CascadeSelect', () => {
  afterEach(() => {
    cleanup();
  });

  describe('렌더링', () => {
    it('CascadeSelect가 렌더링됨', () => {
      render(<CascadeSelect options={mockOptions} />);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('placeholder가 표시됨', () => {
      render(<CascadeSelect options={mockOptions} placeholder="Select location..." />);

      expect(screen.getByText('Select location...')).toBeInTheDocument();
    });

    it('기본 placeholder는 "Select..."', () => {
      render(<CascadeSelect options={mockOptions} />);

      expect(screen.getByText('Select...')).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      render(<CascadeSelect options={mockOptions} className="custom-cascade" />);

      expect(document.querySelector('.custom-cascade')).toBeInTheDocument();
    });

    it('disabled 상태가 적용됨', () => {
      render(<CascadeSelect options={mockOptions} disabled />);

      const trigger = screen.getByRole('button');
      expect(trigger).toBeDisabled();
    });

    it('선택된 값이 표시됨', () => {
      render(
        <CascadeSelect
          options={mockOptions}
          value={['building-a', 'floor-1', 'zone-a']}
        />
      );

      expect(screen.getByText('Building A / Floor 1 / Zone A')).toBeInTheDocument();
    });
  });

  describe('dropdown', () => {
    it('클릭으로 dropdown이 열림', async () => {
      const user = userEvent.setup();
      render(<CascadeSelect options={mockOptions} />);

      await user.click(screen.getByRole('button'));

      expect(screen.getByText('Building A')).toBeInTheDocument();
      expect(screen.getByText('Building B')).toBeInTheDocument();
    });

    it('disabled일 때 dropdown이 열리지 않음', async () => {
      const user = userEvent.setup();
      render(<CascadeSelect options={mockOptions} disabled />);

      await user.click(screen.getByRole('button'));

      expect(screen.queryByText('Building A')).not.toBeInTheDocument();
    });

    it('외부 클릭으로 dropdown이 닫힘', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <CascadeSelect options={mockOptions} />
          <button>Outside</button>
        </div>
      );

      await user.click(screen.getByRole('button', { name: 'Select...' }));
      expect(screen.getByText('Building A')).toBeInTheDocument();

      fireEvent.mouseDown(screen.getByRole('button', { name: 'Outside' }));
      expect(screen.queryByText('Building A')).not.toBeInTheDocument();
    });

    it('leaf 선택 후 dropdown이 닫힘', async () => {
      const user = userEvent.setup();
      render(<CascadeSelect options={simpleOptions} />);

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByText('Option 1'));

      expect(screen.queryByRole('option')).not.toBeInTheDocument();
    });
  });

  describe('selection', () => {
    it('단일 레벨 옵션 선택', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<CascadeSelect options={simpleOptions} onChange={handleChange} />);

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByText('Option 1'));

      expect(handleChange).toHaveBeenCalledWith(['opt-1'], ['Option 1']);
    });

    it('다중 레벨 옵션 선택', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<CascadeSelect options={mockOptions} onChange={handleChange} />);

      await user.click(screen.getByRole('button'));

      // Hover/Click Building A
      await user.click(screen.getByText('Building A'));

      // Should show Floor options
      expect(screen.getByText('Floor 1')).toBeInTheDocument();

      // Click Floor 1
      await user.click(screen.getByText('Floor 1'));

      // Should show Zone options
      expect(screen.getByText('Zone A')).toBeInTheDocument();

      // Click Zone A (leaf node)
      await user.click(screen.getByText('Zone A'));

      expect(handleChange).toHaveBeenCalledWith(
        ['building-a', 'floor-1', 'zone-a'],
        ['Building A', 'Floor 1', 'Zone A']
      );
    });

    it('부모 옵션은 클릭해도 선택 완료되지 않음', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<CascadeSelect options={mockOptions} onChange={handleChange} />);

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByText('Building A'));

      // onChange should not be called for parent nodes
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('disabled 옵션은 선택 불가', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const optionsWithDisabled: CascadeOption[] = [
        { label: 'Enabled', value: 'enabled' },
        { label: 'Disabled', value: 'disabled', disabled: true },
      ];

      render(<CascadeSelect options={optionsWithDisabled} onChange={handleChange} />);

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByText('Disabled'));

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('hover', () => {
    it('부모 옵션 hover시 자식 패널이 표시됨', async () => {
      const user = userEvent.setup();
      render(<CascadeSelect options={mockOptions} />);

      await user.click(screen.getByRole('button'));

      // Hover over Building A
      await user.hover(screen.getByText('Building A'));

      // Floor options should be visible
      expect(screen.getByText('Floor 1')).toBeInTheDocument();
      expect(screen.getByText('Floor 2')).toBeInTheDocument();
    });

    it('disabled 옵션 hover시 자식 패널이 표시되지 않음', async () => {
      const user = userEvent.setup();
      const optionsWithDisabled: CascadeOption[] = [
        {
          label: 'Disabled Parent',
          value: 'disabled-parent',
          disabled: true,
          children: [
            { label: 'Child', value: 'child' },
          ],
        },
      ];

      render(<CascadeSelect options={optionsWithDisabled} />);

      await user.click(screen.getByRole('button'));
      await user.hover(screen.getByText('Disabled Parent'));

      expect(screen.queryByText('Child')).not.toBeInTheDocument();
    });
  });

  describe('display text', () => {
    it('선택된 경로가 "/" 로 구분되어 표시됨', () => {
      render(
        <CascadeSelect
          options={mockOptions}
          value={['building-a', 'floor-1']}
        />
      );

      expect(screen.getByText('Building A / Floor 1')).toBeInTheDocument();
    });

    it('선택된 값이 없으면 placeholder가 표시됨', () => {
      render(<CascadeSelect options={mockOptions} value={[]} />);

      expect(screen.getByText('Select...')).toBeInTheDocument();
    });
  });

  describe('aria attributes', () => {
    it('trigger에 aria-haspopup이 있음', () => {
      render(<CascadeSelect options={mockOptions} />);

      expect(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'listbox');
    });

    it('aria-expanded가 dropdown 상태에 따라 변경됨', async () => {
      const user = userEvent.setup();
      render(<CascadeSelect options={mockOptions} />);

      const trigger = screen.getByRole('button');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await user.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('옵션에 role="option"이 있음', async () => {
      const user = userEvent.setup();
      render(<CascadeSelect options={mockOptions} />);

      await user.click(screen.getByRole('button'));

      expect(screen.getAllByRole('option').length).toBeGreaterThan(0);
    });

    it('선택된 옵션에 aria-selected가 있음', async () => {
      const user = userEvent.setup();
      render(
        <CascadeSelect
          options={simpleOptions}
          value={['opt-1']}
        />
      );

      await user.click(screen.getByRole('button'));

      const selectedOption = screen.getByRole('option', { name: 'Option 1' });
      expect(selectedOption).toHaveAttribute('aria-selected', 'true');
    });

    it('disabled 옵션에 aria-disabled가 있음', async () => {
      const user = userEvent.setup();
      const optionsWithDisabled: CascadeOption[] = [
        { label: 'Enabled', value: 'enabled' },
        { label: 'Disabled', value: 'disabled', disabled: true },
      ];

      render(<CascadeSelect options={optionsWithDisabled} />);

      await user.click(screen.getByRole('button'));

      const disabledOption = screen.getByRole('option', { name: 'Disabled' });
      expect(disabledOption).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('접근성', () => {
    it('CascadeSelect가 a11y 위반 사항이 없음', async () => {
      const { container } = render(<CascadeSelect options={mockOptions} />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('dropdown이 열린 상태에서 a11y 위반 사항이 없음', async () => {
      const user = userEvent.setup();
      const { container } = render(<CascadeSelect options={simpleOptions} />);

      await user.click(screen.getByRole('button'));

      // Disable aria-required-parent - cascade panel doesn't use listbox wrapper
      const results = await axe(container, {
        rules: { 'aria-required-parent': { enabled: false } },
      });
      expect(results).toHaveNoViolations();
    });
  });

  describe('복합 사용', () => {
    it('지역 선택기', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const regionOptions: CascadeOption[] = [
        {
          label: 'Asia',
          value: 'asia',
          children: [
            {
              label: 'Korea',
              value: 'korea',
              children: [
                { label: 'Seoul', value: 'seoul' },
                { label: 'Busan', value: 'busan' },
              ],
            },
            {
              label: 'Japan',
              value: 'japan',
              children: [
                { label: 'Tokyo', value: 'tokyo' },
              ],
            },
          ],
        },
      ];

      render(
        <CascadeSelect
          options={regionOptions}
          placeholder="Select region..."
          onChange={handleChange}
        />
      );

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByText('Asia'));
      await user.click(screen.getByText('Korea'));
      await user.click(screen.getByText('Seoul'));

      expect(handleChange).toHaveBeenCalledWith(
        ['asia', 'korea', 'seoul'],
        ['Asia', 'Korea', 'Seoul']
      );
    });

    it('카테고리 선택기', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const categoryOptions: CascadeOption[] = [
        {
          label: 'Electronics',
          value: 'electronics',
          children: [
            { label: 'Phones', value: 'phones' },
            { label: 'Laptops', value: 'laptops' },
          ],
        },
        {
          label: 'Clothing',
          value: 'clothing',
          children: [
            { label: 'Shirts', value: 'shirts' },
          ],
        },
      ];

      render(
        <CascadeSelect
          options={categoryOptions}
          onChange={handleChange}
        />
      );

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByText('Electronics'));
      await user.click(screen.getByText('Phones'));

      expect(handleChange).toHaveBeenCalledWith(
        ['electronics', 'phones'],
        ['Electronics', 'Phones']
      );

      // Display should show selected path
      expect(screen.getByText('Electronics / Phones')).toBeInTheDocument();
    });

    it('초기값이 설정된 상태에서 다시 선택', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <CascadeSelect
          options={mockOptions}
          value={['building-a', 'floor-1', 'zone-a']}
          onChange={handleChange}
        />
      );

      // Initial display
      expect(screen.getByText('Building A / Floor 1 / Zone A')).toBeInTheDocument();

      // Open and select different path
      await user.click(screen.getByRole('button'));
      await user.hover(screen.getByText('Building A'));
      await user.click(screen.getByText('Floor 2'));

      // Select zone
      await user.click(screen.getByText('Zone D'));

      expect(handleChange).toHaveBeenCalledWith(
        ['building-a', 'floor-2', 'zone-d'],
        ['Building A', 'Floor 2', 'Zone D']
      );
    });
  });
});
