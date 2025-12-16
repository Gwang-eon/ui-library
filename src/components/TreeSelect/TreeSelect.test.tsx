/**
 * TreeSelect 컴포넌트 테스트
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { TreeSelect, TreeSelectNode } from './TreeSelect';

const mockTreeData: TreeSelectNode[] = [
  {
    value: 'root-1',
    label: 'Documents',
    children: [
      {
        value: 'doc-1',
        label: 'Work',
        children: [
          { value: 'file-1', label: 'Report.pdf' },
          { value: 'file-2', label: 'Presentation.pptx' },
        ],
      },
      {
        value: 'doc-2',
        label: 'Personal',
        children: [
          { value: 'file-3', label: 'Photo.jpg' },
        ],
      },
    ],
  },
  {
    value: 'root-2',
    label: 'Downloads',
    children: [
      { value: 'download-1', label: 'Setup.exe' },
    ],
  },
  {
    value: 'root-3',
    label: 'Desktop',
  },
];

const simpleTreeData: TreeSelectNode[] = [
  { value: 'item-1', label: 'Item 1' },
  { value: 'item-2', label: 'Item 2' },
  { value: 'item-3', label: 'Item 3' },
];

const treeWithIcons: TreeSelectNode[] = [
  {
    value: 'folder-1',
    label: 'Folder',
    icon: <span data-testid="folder-icon">📁</span>,
    children: [
      {
        value: 'file-1',
        label: 'File',
        icon: <span data-testid="file-icon">📄</span>,
      },
    ],
  },
];

const treeWithDisabled: TreeSelectNode[] = [
  { value: 'enabled', label: 'Enabled' },
  { value: 'disabled', label: 'Disabled', disabled: true },
];

describe('TreeSelect', () => {
  afterEach(() => {
    cleanup();
  });

  describe('렌더링', () => {
    it('TreeSelect가 렌더링됨', () => {
      render(<TreeSelect data={mockTreeData} />);

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('placeholder가 표시됨', () => {
      render(<TreeSelect data={mockTreeData} placeholder="Select a file..." />);

      expect(screen.getByText('Select a file...')).toBeInTheDocument();
    });

    it('기본 placeholder는 "Select..."', () => {
      render(<TreeSelect data={mockTreeData} />);

      expect(screen.getByText('Select...')).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      render(<TreeSelect data={mockTreeData} className="custom-treeselect" />);

      expect(document.querySelector('.custom-treeselect')).toBeInTheDocument();
    });

    it('disabled 상태가 적용됨', () => {
      render(<TreeSelect data={mockTreeData} disabled />);

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('tabindex', '-1');
    });
  });

  describe('dropdown', () => {
    it('클릭으로 dropdown이 열림', async () => {
      const user = userEvent.setup();
      render(<TreeSelect data={mockTreeData} />);

      await user.click(screen.getByRole('combobox'));

      expect(screen.getByText('Documents')).toBeInTheDocument();
      expect(screen.getByText('Downloads')).toBeInTheDocument();
      expect(screen.getByText('Desktop')).toBeInTheDocument();
    });

    it('disabled일 때 dropdown이 열리지 않음', async () => {
      const user = userEvent.setup();
      render(<TreeSelect data={mockTreeData} disabled />);

      await user.click(screen.getByRole('combobox'));

      expect(screen.queryByText('Documents')).not.toBeInTheDocument();
    });

    it('외부 클릭으로 dropdown이 닫힘', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <TreeSelect data={mockTreeData} />
          <button>Outside</button>
        </div>
      );

      await user.click(screen.getByRole('combobox'));
      expect(screen.getByText('Documents')).toBeInTheDocument();

      fireEvent.mouseDown(screen.getByRole('button', { name: 'Outside' }));
      expect(screen.queryByText('Documents')).not.toBeInTheDocument();
    });

    it('단일 선택 후 dropdown이 닫힘', async () => {
      const user = userEvent.setup();
      render(<TreeSelect data={simpleTreeData} />);

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByText('Item 1'));

      expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
    });
  });

  describe('단일 선택', () => {
    it('노드 선택', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TreeSelect data={simpleTreeData} onChange={handleChange} />);

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByText('Item 1'));

      expect(handleChange).toHaveBeenCalledWith('item-1');
    });

    it('선택된 값이 표시됨', async () => {
      const user = userEvent.setup();
      render(<TreeSelect data={simpleTreeData} />);

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByText('Item 1'));

      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    it('controlled value가 동작함', () => {
      render(<TreeSelect data={simpleTreeData} value="item-2" />);

      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('defaultValue가 동작함', () => {
      render(<TreeSelect data={simpleTreeData} defaultValue="item-3" />);

      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });
  });

  describe('다중 선택', () => {
    it('체크박스가 표시됨', async () => {
      const user = userEvent.setup();
      render(<TreeSelect data={simpleTreeData} multiple />);

      await user.click(screen.getByRole('combobox'));

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBe(3);
    });

    it('여러 노드 선택 가능', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TreeSelect data={simpleTreeData} multiple onChange={handleChange} />);

      await user.click(screen.getByRole('combobox'));

      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[0]);
      await user.click(checkboxes[1]);

      expect(handleChange).toHaveBeenLastCalledWith(['item-1', 'item-2']);
    });

    it('선택 해제 가능', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TreeSelect data={simpleTreeData} multiple onChange={handleChange} />);

      await user.click(screen.getByRole('combobox'));

      const checkbox = screen.getAllByRole('checkbox')[0];
      await user.click(checkbox); // select
      await user.click(checkbox); // deselect

      expect(handleChange).toHaveBeenLastCalledWith([]);
    });

    it('선택된 값들이 쉼표로 구분되어 표시됨', async () => {
      const user = userEvent.setup();
      render(<TreeSelect data={simpleTreeData} multiple defaultValue={['item-1', 'item-2']} />);

      expect(screen.getByText('Item 1, Item 2')).toBeInTheDocument();
    });

    it('다중 선택 후에도 dropdown이 열려있음', async () => {
      const user = userEvent.setup();
      render(<TreeSelect data={simpleTreeData} multiple />);

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getAllByRole('checkbox')[0]);

      // Dropdown should still be open
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });
  });

  describe('expand/collapse', () => {
    it('펼침 버튼 클릭으로 자식 노드가 표시됨', async () => {
      const user = userEvent.setup();
      render(<TreeSelect data={mockTreeData} />);

      await user.click(screen.getByRole('combobox'));

      // Children should not be visible initially
      expect(screen.queryByText('Work')).not.toBeInTheDocument();

      // Click expand button
      const expandButtons = screen.getAllByRole('button', { name: /expand/i });
      await user.click(expandButtons[0]);

      // Children should be visible
      expect(screen.getByText('Work')).toBeInTheDocument();
      expect(screen.getByText('Personal')).toBeInTheDocument();
    });

    it('다시 클릭하면 자식 노드가 숨겨짐', async () => {
      const user = userEvent.setup();
      render(<TreeSelect data={mockTreeData} />);

      await user.click(screen.getByRole('combobox'));

      // Expand
      const expandButton = screen.getAllByRole('button', { name: /expand/i })[0];
      await user.click(expandButton);

      expect(screen.getByText('Work')).toBeInTheDocument();

      // Collapse
      const collapseButton = screen.getByRole('button', { name: /collapse/i });
      await user.click(collapseButton);

      expect(screen.queryByText('Work')).not.toBeInTheDocument();
    });

    it('중첩된 노드 펼침이 동작함', async () => {
      const user = userEvent.setup();
      render(<TreeSelect data={mockTreeData} />);

      await user.click(screen.getByRole('combobox'));

      // Expand Documents
      await user.click(screen.getAllByRole('button', { name: /expand/i })[0]);

      // Expand Work
      await user.click(screen.getAllByRole('button', { name: /expand/i })[0]);

      // Leaf nodes should be visible
      expect(screen.getByText('Report.pdf')).toBeInTheDocument();
      expect(screen.getByText('Presentation.pptx')).toBeInTheDocument();
    });
  });

  describe('검색', () => {
    it('showSearch=true일 때 검색창이 표시됨', async () => {
      const user = userEvent.setup();
      render(<TreeSelect data={mockTreeData} showSearch />);

      await user.click(screen.getByRole('combobox'));

      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    it('검색 placeholder가 적용됨', async () => {
      const user = userEvent.setup();
      render(<TreeSelect data={mockTreeData} showSearch searchPlaceholder="Find..." />);

      await user.click(screen.getByRole('combobox'));

      expect(screen.getByPlaceholderText('Find...')).toBeInTheDocument();
    });

    it('검색으로 노드 필터링', async () => {
      const user = userEvent.setup();
      render(<TreeSelect data={mockTreeData} showSearch />);

      await user.click(screen.getByRole('combobox'));

      const searchInput = screen.getByPlaceholderText('Search...');
      await user.type(searchInput, 'Downloads');

      // Only matching nodes should be visible
      expect(screen.getByText('Downloads')).toBeInTheDocument();
      expect(screen.queryByText('Documents')).not.toBeInTheDocument();
    });

    it('검색 결과가 없을 때 empty 메시지가 표시됨', async () => {
      const user = userEvent.setup();
      render(<TreeSelect data={mockTreeData} showSearch />);

      await user.click(screen.getByRole('combobox'));

      const searchInput = screen.getByPlaceholderText('Search...');
      await user.type(searchInput, 'nonexistent');

      expect(screen.getByText('No results found')).toBeInTheDocument();
    });

    it('자식 노드 검색시 부모 노드가 자동 펼쳐짐', async () => {
      const user = userEvent.setup();
      render(<TreeSelect data={mockTreeData} showSearch />);

      await user.click(screen.getByRole('combobox'));

      const searchInput = screen.getByPlaceholderText('Search...');
      await user.type(searchInput, 'Report');

      // Parent nodes should be expanded to show matching child
      await waitFor(() => {
        expect(screen.getByText('Report.pdf')).toBeInTheDocument();
      });
    });
  });

  describe('아이콘', () => {
    it('노드에 아이콘이 표시됨', async () => {
      const user = userEvent.setup();
      render(<TreeSelect data={treeWithIcons} />);

      await user.click(screen.getByRole('combobox'));

      expect(screen.getByTestId('folder-icon')).toBeInTheDocument();
    });

    it('자식 노드에도 아이콘이 표시됨', async () => {
      const user = userEvent.setup();
      render(<TreeSelect data={treeWithIcons} />);

      await user.click(screen.getByRole('combobox'));

      // Expand parent
      await user.click(screen.getByRole('button', { name: /expand/i }));

      expect(screen.getByTestId('file-icon')).toBeInTheDocument();
    });
  });

  describe('disabled', () => {
    it('disabled 노드가 비활성화 스타일을 가짐', async () => {
      const user = userEvent.setup();
      render(<TreeSelect data={treeWithDisabled} />);

      await user.click(screen.getByRole('combobox'));

      const disabledNode = screen.getByText('Disabled').closest('[class*="treeNodeContent"]');
      expect(disabledNode).toHaveClass(/treeNodeDisabled/);
    });

    it('다중 선택에서 disabled 체크박스가 비활성화됨', async () => {
      const user = userEvent.setup();
      render(<TreeSelect data={treeWithDisabled} multiple />);

      await user.click(screen.getByRole('combobox'));

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes[1]).toBeDisabled();
    });
  });

  describe('clearable', () => {
    it('clearable=true이고 값이 있으면 clear 버튼이 표시됨', async () => {
      const user = userEvent.setup();
      render(<TreeSelect data={simpleTreeData} clearable defaultValue="item-1" />);

      expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
    });

    it('clearable=false면 clear 버튼이 표시되지 않음', () => {
      render(<TreeSelect data={simpleTreeData} defaultValue="item-1" />);

      expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
    });

    it('clear 버튼 클릭으로 선택이 해제됨', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TreeSelect data={simpleTreeData} clearable defaultValue="item-1" onChange={handleChange} />);

      await user.click(screen.getByRole('button', { name: /clear/i }));

      expect(handleChange).toHaveBeenCalledWith('');
    });

    it('다중 선택에서 clear 버튼 클릭으로 모든 선택이 해제됨', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <TreeSelect
          data={simpleTreeData}
          multiple
          clearable
          defaultValue={['item-1', 'item-2']}
          onChange={handleChange}
        />
      );

      await user.click(screen.getByRole('button', { name: /clear/i }));

      expect(handleChange).toHaveBeenCalledWith([]);
    });
  });

  describe('aria attributes', () => {
    it('trigger에 aria-haspopup="tree"가 있음', () => {
      render(<TreeSelect data={mockTreeData} />);

      expect(screen.getByRole('combobox')).toHaveAttribute('aria-haspopup', 'tree');
    });

    it('aria-expanded가 dropdown 상태에 따라 변경됨', async () => {
      const user = userEvent.setup();
      render(<TreeSelect data={mockTreeData} />);

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await user.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('펼침 버튼에 aria-label이 있음', async () => {
      const user = userEvent.setup();
      render(<TreeSelect data={mockTreeData} />);

      await user.click(screen.getByRole('combobox'));

      const expandButton = screen.getAllByRole('button', { name: /expand/i })[0];
      expect(expandButton).toHaveAttribute('aria-label');
    });
  });

  describe('접근성', () => {
    it('기본 TreeSelect가 테이블 구조를 가짐', () => {
      render(<TreeSelect data={simpleTreeData} />);

      // TreeSelect has proper combobox structure
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-haspopup', 'tree');
    });

    it('dropdown이 열린 상태에서 트리가 표시됨', async () => {
      const user = userEvent.setup();
      render(<TreeSelect data={simpleTreeData} />);

      await user.click(screen.getByRole('combobox'));

      // Tree nodes should be visible
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('multiple 모드에서 체크박스가 표시됨', async () => {
      const user = userEvent.setup();
      render(<TreeSelect data={simpleTreeData} multiple />);

      await user.click(screen.getByRole('combobox'));

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBe(3);
    });
  });

  describe('복합 사용', () => {
    it('파일 선택기', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <TreeSelect
          data={mockTreeData}
          onChange={handleChange}
          placeholder="Select file..."
          showSearch
        />
      );

      await user.click(screen.getByRole('combobox'));

      // Navigate to Documents > Work > Report.pdf
      await user.click(screen.getAllByRole('button', { name: /expand/i })[0]);
      await user.click(screen.getAllByRole('button', { name: /expand/i })[0]);

      await user.click(screen.getByText('Report.pdf'));

      expect(handleChange).toHaveBeenCalledWith('file-1');
    });

    it('다중 파일 선택기', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <TreeSelect
          data={simpleTreeData}
          onChange={handleChange}
          multiple
          clearable
          placeholder="Select files..."
        />
      );

      await user.click(screen.getByRole('combobox'));

      // Select multiple files
      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[0]);
      await user.click(checkboxes[1]);

      expect(handleChange).toHaveBeenLastCalledWith(['item-1', 'item-2']);
    });

    it('카테고리 선택기', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const categoryTree: TreeSelectNode[] = [
        {
          value: 'electronics',
          label: 'Electronics',
          children: [
            { value: 'phones', label: 'Phones' },
            { value: 'laptops', label: 'Laptops' },
          ],
        },
        {
          value: 'clothing',
          label: 'Clothing',
          children: [
            { value: 'shirts', label: 'Shirts' },
          ],
        },
      ];

      render(
        <TreeSelect
          data={categoryTree}
          onChange={handleChange}
          placeholder="Select category..."
        />
      );

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getAllByRole('button', { name: /expand/i })[0]);
      await user.click(screen.getByText('Phones'));

      expect(handleChange).toHaveBeenCalledWith('phones');
      expect(screen.getByText('Phones')).toBeInTheDocument();
    });
  });
});
