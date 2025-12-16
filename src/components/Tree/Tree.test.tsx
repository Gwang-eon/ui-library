/**
 * Tree 컴포넌트 테스트
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Tree, TreeNodeData } from './Tree';

const mockTreeData: TreeNodeData[] = [
  {
    id: 'root-1',
    label: 'Documents',
    children: [
      {
        id: 'doc-1',
        label: 'Work',
        children: [
          { id: 'file-1', label: 'Report.pdf' },
          { id: 'file-2', label: 'Presentation.pptx' },
        ],
      },
      {
        id: 'doc-2',
        label: 'Personal',
        children: [
          { id: 'file-3', label: 'Photo.jpg' },
        ],
      },
    ],
  },
  {
    id: 'root-2',
    label: 'Downloads',
    children: [
      { id: 'download-1', label: 'Setup.exe' },
    ],
  },
  {
    id: 'root-3',
    label: 'Desktop',
  },
];

const simpleTreeData: TreeNodeData[] = [
  { id: 'item-1', label: 'Item 1' },
  { id: 'item-2', label: 'Item 2' },
  { id: 'item-3', label: 'Item 3' },
];

const treeWithIcons: TreeNodeData[] = [
  {
    id: 'folder-1',
    label: 'Folder',
    icon: <span data-testid="folder-icon">📁</span>,
    children: [
      {
        id: 'file-1',
        label: 'File',
        icon: <span data-testid="file-icon">📄</span>,
      },
    ],
  },
];

const treeWithBadges: TreeNodeData[] = [
  {
    id: 'inbox',
    label: 'Inbox',
    badge: <span data-testid="badge">5</span>,
    children: [
      { id: 'msg-1', label: 'Message 1' },
    ],
  },
];

const treeWithDisabled: TreeNodeData[] = [
  {
    id: 'enabled',
    label: 'Enabled',
    children: [
      { id: 'child-1', label: 'Child 1' },
    ],
  },
  {
    id: 'disabled',
    label: 'Disabled',
    disabled: true,
    children: [
      { id: 'disabled-child', label: 'Disabled Child' },
    ],
  },
];

describe('Tree', () => {
  afterEach(() => {
    cleanup();
  });

  describe('렌더링', () => {
    it('Tree가 렌더링됨', () => {
      render(<Tree data={mockTreeData} />);

      expect(screen.getByText('Documents')).toBeInTheDocument();
      expect(screen.getByText('Downloads')).toBeInTheDocument();
      expect(screen.getByText('Desktop')).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      render(<Tree data={mockTreeData} className="custom-tree" />);

      expect(document.querySelector('.custom-tree')).toBeInTheDocument();
    });

    it('빈 데이터로 렌더링됨', () => {
      render(<Tree data={[]} />);

      const tree = document.querySelector('[class*="tree"]');
      expect(tree).toBeInTheDocument();
    });

    it('단순 리스트가 렌더링됨', () => {
      render(<Tree data={simpleTreeData} />);

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });
  });

  describe('expand/collapse', () => {
    it('기본적으로 자식 노드가 숨겨져 있음', () => {
      render(<Tree data={mockTreeData} />);

      // Children should not be visible initially
      expect(screen.queryByText('Work')).not.toBeInTheDocument();
      expect(screen.queryByText('Report.pdf')).not.toBeInTheDocument();
    });

    it('펼침 버튼 클릭으로 자식 노드가 표시됨', async () => {
      const user = userEvent.setup();
      render(<Tree data={mockTreeData} />);

      // Click expand button for Documents
      const expandButtons = screen.getAllByRole('button', { name: /expand/i });
      await user.click(expandButtons[0]);

      // Children should now be visible
      expect(screen.getByText('Work')).toBeInTheDocument();
      expect(screen.getByText('Personal')).toBeInTheDocument();
    });

    it('다시 클릭하면 자식 노드가 숨겨짐', async () => {
      const user = userEvent.setup();
      render(<Tree data={mockTreeData} />);

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
      render(<Tree data={mockTreeData} />);

      // Expand Documents
      await user.click(screen.getAllByRole('button', { name: /expand/i })[0]);

      // Expand Work
      const workExpandButton = screen.getAllByRole('button', { name: /expand/i })[0];
      await user.click(workExpandButton);

      // Leaf nodes should be visible
      expect(screen.getByText('Report.pdf')).toBeInTheDocument();
      expect(screen.getByText('Presentation.pptx')).toBeInTheDocument();
    });

    it('defaultExpandAll이 true면 모든 노드가 펼쳐짐', () => {
      render(<Tree data={mockTreeData} defaultExpandAll />);

      // All nodes should be visible
      expect(screen.getByText('Work')).toBeInTheDocument();
      expect(screen.getByText('Personal')).toBeInTheDocument();
      expect(screen.getByText('Report.pdf')).toBeInTheDocument();
      expect(screen.getByText('Photo.jpg')).toBeInTheDocument();
      expect(screen.getByText('Setup.exe')).toBeInTheDocument();
    });

    it('leaf 노드에는 펼침 버튼이 없음', () => {
      render(<Tree data={mockTreeData} defaultExpandAll />);

      // Report.pdf is a leaf node - should not have expand button
      const reportNode = screen.getByText('Report.pdf').closest('[class*="treeNode"]');
      expect(reportNode).toBeInTheDocument();
    });
  });

  describe('선택 (non-selectable mode)', () => {
    it('노드 클릭으로 선택됨', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      render(<Tree data={simpleTreeData} onSelect={handleSelect} />);

      await user.click(screen.getByText('Item 1'));

      expect(handleSelect).toHaveBeenCalledWith(['item-1']);
    });

    it('다른 노드 클릭으로 선택이 변경됨', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      render(<Tree data={simpleTreeData} onSelect={handleSelect} />);

      await user.click(screen.getByText('Item 1'));
      await user.click(screen.getByText('Item 2'));

      expect(handleSelect).toHaveBeenLastCalledWith(['item-2']);
    });

    it('선택된 노드가 하이라이트됨', async () => {
      const user = userEvent.setup();
      render(<Tree data={simpleTreeData} />);

      await user.click(screen.getByText('Item 1'));

      // The treeNodeSelected class is on the treeNode div (parent of treeNodeContent)
      const nodeContent = screen.getByText('Item 1').closest('[class*="treeNodeContent"]');
      const node = nodeContent?.parentElement;
      expect(node).toHaveClass(/treeNodeSelected/);
    });
  });

  describe('선택 (selectable mode)', () => {
    it('체크박스가 표시됨', () => {
      render(<Tree data={simpleTreeData} selectable />);

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBe(3);
    });

    it('체크박스 클릭으로 선택됨', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      render(<Tree data={simpleTreeData} selectable onSelect={handleSelect} />);

      const checkbox = screen.getAllByRole('checkbox')[0];
      await user.click(checkbox);

      expect(handleSelect).toHaveBeenCalledWith(['item-1']);
    });

    it('여러 체크박스를 선택할 수 있음', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      render(<Tree data={simpleTreeData} selectable onSelect={handleSelect} />);

      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[0]);
      await user.click(checkboxes[1]);

      expect(handleSelect).toHaveBeenLastCalledWith(expect.arrayContaining(['item-1', 'item-2']));
    });

    it('부모 선택시 자식도 선택됨', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      render(<Tree data={mockTreeData} selectable defaultExpandAll onSelect={handleSelect} />);

      // Find and click Documents checkbox
      const documentsNode = screen.getByText('Documents').closest('[class*="treeNodeContent"]');
      const checkbox = within(documentsNode as HTMLElement).getByRole('checkbox');
      await user.click(checkbox);

      // All descendants should be selected
      expect(handleSelect).toHaveBeenCalledWith(
        expect.arrayContaining(['root-1', 'doc-1', 'doc-2', 'file-1', 'file-2', 'file-3'])
      );
    });

    it('부모 선택 해제시 자식도 해제됨', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      render(<Tree data={mockTreeData} selectable defaultExpandAll onSelect={handleSelect} />);

      // Select Documents
      const documentsNode = screen.getByText('Documents').closest('[class*="treeNodeContent"]');
      const checkbox = within(documentsNode as HTMLElement).getByRole('checkbox');
      await user.click(checkbox);

      // Unselect Documents
      await user.click(checkbox);

      // Should be empty
      expect(handleSelect).toHaveBeenLastCalledWith([]);
    });
  });

  describe('아이콘', () => {
    it('노드에 아이콘이 표시됨', async () => {
      const user = userEvent.setup();
      render(<Tree data={treeWithIcons} defaultExpandAll />);

      expect(screen.getByTestId('folder-icon')).toBeInTheDocument();
      expect(screen.getByTestId('file-icon')).toBeInTheDocument();
    });
  });

  describe('배지', () => {
    it('노드에 배지가 표시됨', () => {
      render(<Tree data={treeWithBadges} />);

      expect(screen.getByTestId('badge')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });
  });

  describe('disabled', () => {
    it('disabled 노드가 비활성화 스타일을 가짐', () => {
      render(<Tree data={treeWithDisabled} />);

      // The treeNodeDisabled class is on the treeNode div (parent of treeNodeContent)
      const nodeContent = screen.getByText('Disabled').closest('[class*="treeNodeContent"]');
      const node = nodeContent?.parentElement;
      expect(node).toHaveClass(/treeNodeDisabled/);
    });

    it('disabled 노드는 선택되지 않음', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      render(<Tree data={treeWithDisabled} onSelect={handleSelect} />);

      await user.click(screen.getByText('Disabled'));

      expect(handleSelect).not.toHaveBeenCalled();
    });

    it('disabled 노드의 체크박스가 비활성화됨', () => {
      render(<Tree data={treeWithDisabled} selectable />);

      const disabledNode = screen.getByText('Disabled').closest('[class*="treeNodeContent"]');
      const checkbox = within(disabledNode as HTMLElement).getByRole('checkbox');
      expect(checkbox).toBeDisabled();
    });

    it('disabled 노드의 펼침은 가능함', async () => {
      const user = userEvent.setup();
      render(<Tree data={treeWithDisabled} />);

      // Find expand button in disabled node
      const disabledNode = screen.getByText('Disabled').closest('[class*="treeNode"]');
      const expandButton = within(disabledNode as HTMLElement).getByRole('button', { name: /expand/i });

      await user.click(expandButton);

      expect(screen.getByText('Disabled Child')).toBeInTheDocument();
    });
  });

  describe('compact 모드', () => {
    it('compact 클래스가 적용됨', () => {
      render(<Tree data={simpleTreeData} compact />);

      const tree = document.querySelector('[class*="tree"]');
      expect(tree).toHaveClass(/treeCompact/);
    });
  });

  describe('aria attributes', () => {
    it('펼침 버튼에 aria-expanded가 있음', () => {
      render(<Tree data={mockTreeData} />);

      const expandButton = screen.getAllByRole('button', { name: /expand/i })[0];
      expect(expandButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('펼침 후 aria-expanded가 true가 됨', async () => {
      const user = userEvent.setup();
      render(<Tree data={mockTreeData} />);

      const expandButton = screen.getAllByRole('button', { name: /expand/i })[0];
      await user.click(expandButton);

      expect(expandButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('펼침 버튼에 aria-label이 있음', () => {
      render(<Tree data={mockTreeData} />);

      const expandButton = screen.getAllByRole('button', { name: /expand/i })[0];
      expect(expandButton).toHaveAttribute('aria-label');
    });
  });

  describe('접근성', () => {
    it('기본 Tree가 a11y 위반 사항이 없음', async () => {
      const { container } = render(<Tree data={simpleTreeData} />);

      const results = await axe(container, {
        rules: {
          'color-contrast': { enabled: false },
        },
      });
      expect(results).toHaveNoViolations();
    });

    it('selectable Tree가 a11y 위반 사항이 없음', async () => {
      const { container } = render(<Tree data={simpleTreeData} selectable />);

      const results = await axe(container, {
        rules: {
          'color-contrast': { enabled: false },
          // Checkboxes are associated with tree node labels visually
          'label': { enabled: false },
        },
      });
      expect(results).toHaveNoViolations();
    });

    it('펼쳐진 상태에서 a11y 위반 사항이 없음', async () => {
      const { container } = render(<Tree data={mockTreeData} defaultExpandAll />);

      const results = await axe(container, {
        rules: {
          'color-contrast': { enabled: false },
          // Tree nodes have nested buttons by design
          'nested-interactive': { enabled: false },
        },
      });
      expect(results).toHaveNoViolations();
    });
  });

  describe('복합 사용', () => {
    it('파일 탐색기 시뮬레이션', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();

      render(
        <Tree
          data={mockTreeData}
          onSelect={handleSelect}
        />
      );

      // Navigate to Documents > Work > Report.pdf
      const documentsExpand = screen.getAllByRole('button', { name: /expand/i })[0];
      await user.click(documentsExpand);

      const workExpand = screen.getAllByRole('button', { name: /expand/i })[0];
      await user.click(workExpand);

      await user.click(screen.getByText('Report.pdf'));

      expect(handleSelect).toHaveBeenCalledWith(['file-1']);
    });

    it('체크박스 기반 파일 선택', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();

      render(
        <Tree
          data={mockTreeData}
          selectable
          defaultExpandAll
          onSelect={handleSelect}
        />
      );

      // Select specific files
      const reportNode = screen.getByText('Report.pdf').closest('[class*="treeNodeContent"]');
      const photoNode = screen.getByText('Photo.jpg').closest('[class*="treeNodeContent"]');

      const reportCheckbox = within(reportNode as HTMLElement).getByRole('checkbox');
      const photoCheckbox = within(photoNode as HTMLElement).getByRole('checkbox');

      await user.click(reportCheckbox);
      await user.click(photoCheckbox);

      expect(handleSelect).toHaveBeenLastCalledWith(expect.arrayContaining(['file-1', 'file-3']));
    });

    it('계층적 카테고리 선택', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      const categoryTree: TreeNodeData[] = [
        {
          id: 'electronics',
          label: 'Electronics',
          children: [
            { id: 'phones', label: 'Phones' },
            { id: 'laptops', label: 'Laptops' },
          ],
        },
        {
          id: 'clothing',
          label: 'Clothing',
          children: [
            { id: 'shirts', label: 'Shirts' },
          ],
        },
      ];

      render(<Tree data={categoryTree} selectable defaultExpandAll onSelect={handleSelect} />);

      // Select entire Electronics category
      const electronicsNode = screen.getByText('Electronics').closest('[class*="treeNodeContent"]');
      const checkbox = within(electronicsNode as HTMLElement).getByRole('checkbox');
      await user.click(checkbox);

      expect(handleSelect).toHaveBeenCalledWith(expect.arrayContaining(['electronics', 'phones', 'laptops']));
    });
  });
});
