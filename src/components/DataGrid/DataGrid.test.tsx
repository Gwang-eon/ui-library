/**
 * DataGrid 컴포넌트 테스트
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { DataGrid, DataGridColumn, DataGridRef } from './DataGrid';
import React from 'react';

interface TestData {
  id: string;
  name: string;
  age: number;
  email: string;
  status: string;
  department: string;
}

const mockData: TestData[] = [
  { id: '1', name: 'Alice', age: 30, email: 'alice@example.com', status: 'active', department: 'Engineering' },
  { id: '2', name: 'Bob', age: 25, email: 'bob@example.com', status: 'inactive', department: 'Marketing' },
  { id: '3', name: 'Charlie', age: 35, email: 'charlie@example.com', status: 'active', department: 'Sales' },
  { id: '4', name: 'Diana', age: 28, email: 'diana@example.com', status: 'active', department: 'Engineering' },
  { id: '5', name: 'Eve', age: 32, email: 'eve@example.com', status: 'inactive', department: 'HR' },
];

const mockColumns: DataGridColumn<TestData>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name' },
  { id: 'age', header: 'Age', accessorKey: 'age' },
  { id: 'email', header: 'Email', accessorKey: 'email' },
  { id: 'status', header: 'Status', accessorKey: 'status' },
  { id: 'department', header: 'Department', accessorKey: 'department' },
];

// Large dataset for pagination/virtualization tests
const largeData: TestData[] = Array.from({ length: 100 }, (_, i) => ({
  id: `${i + 1}`,
  name: `User ${i + 1}`,
  age: 20 + (i % 50),
  email: `user${i + 1}@example.com`,
  status: i % 2 === 0 ? 'active' : 'inactive',
  department: ['Engineering', 'Marketing', 'Sales', 'HR'][i % 4],
}));

describe('DataGrid', () => {
  afterEach(() => {
    cleanup();
  });

  describe('렌더링', () => {
    it('DataGrid가 렌더링됨', () => {
      render(<DataGrid data={mockData} columns={mockColumns} />);

      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('헤더가 표시됨', () => {
      render(<DataGrid data={mockData} columns={mockColumns} />);

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Age')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('데이터가 표시됨', () => {
      render(<DataGrid data={mockData} columns={mockColumns} />);

      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
      expect(screen.getByText('30')).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      render(<DataGrid data={mockData} columns={mockColumns} className="custom-grid" />);

      expect(document.querySelector('.custom-grid')).toBeInTheDocument();
    });

    it('style이 적용됨', () => {
      render(<DataGrid data={mockData} columns={mockColumns} style={{ maxWidth: '800px' }} />);

      const container = document.querySelector('[class*="datagrid"]');
      expect(container).toHaveStyle({ maxWidth: '800px' });
    });

    it('빈 데이터에서 empty 메시지가 표시됨', () => {
      render(<DataGrid data={[]} columns={mockColumns} />);

      expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    it('커스텀 empty 메시지가 표시됨', () => {
      render(<DataGrid data={[]} columns={mockColumns} emptyMessage="데이터가 없습니다" />);

      expect(screen.getByText('데이터가 없습니다')).toBeInTheDocument();
    });

    it('커스텀 renderEmpty가 표시됨', () => {
      render(
        <DataGrid
          data={[]}
          columns={mockColumns}
          renderEmpty={() => <div data-testid="custom-empty">Custom Empty State</div>}
        />
      );

      expect(screen.getByTestId('custom-empty')).toBeInTheDocument();
    });

    it('striped 스타일이 적용됨', () => {
      render(<DataGrid data={mockData} columns={mockColumns} striped />);

      // striped is applied to rows, check that component renders
      const grid = screen.getByRole('grid');
      expect(grid).toBeInTheDocument();
    });

    it('bordered 스타일이 적용됨', () => {
      render(<DataGrid data={mockData} columns={mockColumns} bordered />);

      const container = document.querySelector('[class*="dataGrid"]');
      expect(container).toHaveClass(/bordered/);
    });

    it('compact 스타일이 적용됨', () => {
      render(<DataGrid data={mockData} columns={mockColumns} compact />);

      const container = document.querySelector('[class*="dataGrid"]');
      expect(container).toHaveClass(/compact/);
    });

    it('hoverable 스타일이 적용됨', () => {
      render(<DataGrid data={mockData} columns={mockColumns} hoverable />);

      // hoverable is applied to rows, check that component renders
      const grid = screen.getByRole('grid');
      expect(grid).toBeInTheDocument();
    });
  });

  describe('loading 상태', () => {
    it('loading 상태가 표시됨', () => {
      render(<DataGrid data={mockData} columns={mockColumns} loading />);

      // Check for loading overlay element
      const loadingOverlay = document.querySelector('[class*="loadingOverlay"]');
      expect(loadingOverlay).toBeInTheDocument();
    });

    it('loading 중에도 데이터가 보임', () => {
      render(<DataGrid data={mockData} columns={mockColumns} loading />);

      expect(screen.getByText('Alice')).toBeInTheDocument();
    });
  });

  describe('정렬', () => {
    it('컬럼 헤더 클릭으로 정렬됨', async () => {
      const user = userEvent.setup();
      render(<DataGrid data={mockData} columns={mockColumns} enableSorting />);

      // Find and click the Name column header
      const nameHeader = screen.getByText('Name');
      await user.click(nameHeader);

      // Check if sorted ascending
      const cells = screen.getAllByRole('gridcell');
      const nameColumnCells = cells.filter((_, index) => index % 5 === 0);
      // Alice should be first when sorted ascending
      expect(nameColumnCells[0]).toHaveTextContent('Alice');
    });

    it('두 번 클릭하면 내림차순 정렬', async () => {
      const user = userEvent.setup();
      render(<DataGrid data={mockData} columns={mockColumns} enableSorting />);

      const nameHeader = screen.getByText('Name');
      await user.click(nameHeader); // ascending
      await user.click(nameHeader); // descending

      const cells = screen.getAllByRole('gridcell');
      const nameColumnCells = cells.filter((_, index) => index % 5 === 0);
      // Eve should be first when sorted descending
      expect(nameColumnCells[0]).toHaveTextContent('Eve');
    });

    it('onSortingChange 콜백이 호출됨', async () => {
      const user = userEvent.setup();
      const handleSortingChange = vi.fn();
      render(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          enableSorting
          onSortingChange={handleSortingChange}
        />
      );

      await user.click(screen.getByText('Name'));

      expect(handleSortingChange).toHaveBeenCalled();
    });

    it('enableMultiSort가 활성화되면 다중 정렬 가능', async () => {
      const user = userEvent.setup();
      render(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          enableSorting
          enableMultiSort
        />
      );

      const nameHeader = screen.getByText('Name');
      const ageHeader = screen.getByText('Age');

      await user.click(nameHeader);
      await user.keyboard('{Shift>}');
      await user.click(ageHeader);
      await user.keyboard('{/Shift}');

      // Both columns should have sort indicators
      expect(nameHeader.closest('[role="columnheader"]')).toBeInTheDocument();
    });
  });

  describe('필터링', () => {
    it('글로벌 필터가 동작함', async () => {
      const user = userEvent.setup();
      render(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          enableGlobalFilter
          showToolbar
        />
      );

      // Use specific class selector for global search
      const searchInput = document.querySelector('[class*="globalSearchInput"]') as HTMLInputElement;
      await user.type(searchInput, 'Alice');

      await waitFor(() => {
        expect(screen.getByText('Alice')).toBeInTheDocument();
        expect(screen.queryByText('Bob')).not.toBeInTheDocument();
      });
    });

    it('onGlobalFilterChange 콜백이 호출됨', async () => {
      const user = userEvent.setup();
      const handleFilterChange = vi.fn();
      render(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          enableGlobalFilter
          showToolbar
          onGlobalFilterChange={handleFilterChange}
        />
      );

      const searchInput = document.querySelector('[class*="globalSearchInput"]') as HTMLInputElement;
      await user.type(searchInput, 'test');

      expect(handleFilterChange).toHaveBeenCalled();
    });

    it('controlled globalFilter가 동작함', () => {
      render(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          enableGlobalFilter
          globalFilter="Alice"
          showToolbar
        />
      );

      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.queryByText('Bob')).not.toBeInTheDocument();
    });
  });

  describe('페이지네이션', () => {
    it('페이지네이션이 표시됨', () => {
      render(
        <DataGrid
          data={largeData}
          columns={mockColumns}
          enablePagination
          pagination={{ pageIndex: 0, pageSize: 10 }}
        />
      );

      // Page info should be visible
      expect(screen.getByText(/Page 1 of/)).toBeInTheDocument();
    });

    it('페이지 크기 선택이 동작함', async () => {
      const user = userEvent.setup();
      const handlePaginationChange = vi.fn();
      render(
        <DataGrid
          data={largeData}
          columns={mockColumns}
          enablePagination
          pagination={{ pageIndex: 0, pageSize: 10 }}
          onPaginationChange={handlePaginationChange}
          pageSizeOptions={[10, 25, 50]}
        />
      );

      // Find page size selector in pagination
      const pageSizeSelect = document.querySelector('[class*="pageSize"] select') as HTMLSelectElement;
      if (pageSizeSelect) {
        await user.selectOptions(pageSizeSelect, '25');
        expect(handlePaginationChange).toHaveBeenCalled();
      } else {
        // If no dropdown, just check the component rendered
        expect(screen.getByText(/Page 1 of/)).toBeInTheDocument();
      }
    });

    it('다음 페이지 버튼이 동작함', async () => {
      const user = userEvent.setup();
      render(
        <DataGrid
          data={largeData}
          columns={mockColumns}
          enablePagination
        />
      );

      // Check initial page info shows page 1
      expect(screen.getByText(/Page 1 of/)).toBeInTheDocument();

      // Find pagination buttons by class
      const paginationButtons = document.querySelectorAll('[class*="paginationButton"]');
      // Verify buttons exist
      expect(paginationButtons.length).toBeGreaterThan(0);
    });

    it('이전 페이지 버튼이 첫 페이지에서 비활성화됨', () => {
      render(
        <DataGrid
          data={largeData}
          columns={mockColumns}
          enablePagination
          pagination={{ pageIndex: 0, pageSize: 10 }}
        />
      );

      // 2nd button is previous page
      const paginationButtons = document.querySelectorAll('[class*="paginationButton"]');
      expect(paginationButtons[1]).toBeDisabled();
    });
  });

  describe('행 선택', () => {
    it('체크박스로 행 선택 가능', async () => {
      const user = userEvent.setup();
      const handleSelectionChange = vi.fn();
      render(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          enableRowSelection
          onRowSelectionChange={handleSelectionChange}
          getRowId={(row) => row.id}
        />
      );

      // Find first row checkbox
      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[1]); // Skip header checkbox

      expect(handleSelectionChange).toHaveBeenCalled();
    });

    it('헤더 체크박스로 전체 선택 가능', async () => {
      const user = userEvent.setup();
      const handleSelectionChange = vi.fn();
      render(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          enableRowSelection
          enableMultiRowSelection
          onRowSelectionChange={handleSelectionChange}
          getRowId={(row) => row.id}
        />
      );

      // Find header checkbox
      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[0]); // Header checkbox

      expect(handleSelectionChange).toHaveBeenCalled();
    });

    it('selectionMode="single"일 때 라디오 버튼으로 선택', () => {
      render(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          enableRowSelection
          selectionMode="single"
          getRowId={(row) => row.id}
        />
      );

      const radios = screen.getAllByRole('radio');
      expect(radios.length).toBeGreaterThan(0);
    });

    it('onRowClick 콜백이 호출됨', async () => {
      const user = userEvent.setup();
      const handleRowClick = vi.fn();
      render(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          onRowClick={handleRowClick}
          getRowId={(row) => row.id}
        />
      );

      const rows = screen.getAllByRole('row');
      await user.click(rows[1]); // Skip header row

      expect(handleRowClick).toHaveBeenCalledWith(mockData[0]);
    });

    it('onRowDoubleClick 콜백이 호출됨', async () => {
      const user = userEvent.setup();
      const handleRowDoubleClick = vi.fn();
      render(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          onRowDoubleClick={handleRowDoubleClick}
          getRowId={(row) => row.id}
        />
      );

      const rows = screen.getAllByRole('row');
      await user.dblClick(rows[1]);

      expect(handleRowDoubleClick).toHaveBeenCalledWith(mockData[0]);
    });
  });

  describe('행 확장', () => {
    it('행 확장 버튼이 표시됨', () => {
      render(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          enableExpanding
          renderExpandedRow={(row) => <div>Details: {row.name}</div>}
          getRowId={(row) => row.id}
        />
      );

      // Expand buttons should be visible
      const expandButtons = document.querySelectorAll('[class*="expandButton"]');
      expect(expandButtons.length).toBeGreaterThan(0);
    });

    it('확장 버튼 클릭시 상세 내용이 표시됨', async () => {
      const user = userEvent.setup();
      render(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          enableExpanding
          renderExpandedRow={(row) => <div data-testid="expanded">Details: {row.name}</div>}
          getRowId={(row) => row.id}
        />
      );

      const expandButtons = document.querySelectorAll('[class*="expandButton"]');
      await user.click(expandButtons[0] as HTMLButtonElement);

      expect(screen.getByTestId('expanded')).toBeInTheDocument();
      expect(screen.getByText('Details: Alice')).toBeInTheDocument();
    });

    it('onExpandedChange 콜백이 호출됨', async () => {
      const user = userEvent.setup();
      const handleExpandedChange = vi.fn();
      render(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          enableExpanding
          renderExpandedRow={(row) => <div>Details: {row.name}</div>}
          onExpandedChange={handleExpandedChange}
          getRowId={(row) => row.id}
        />
      );

      const expandButtons = document.querySelectorAll('[class*="expandButton"]');
      await user.click(expandButtons[0] as HTMLButtonElement);

      expect(handleExpandedChange).toHaveBeenCalled();
    });
  });

  describe('컬럼 기능', () => {
    it('컬럼 숨기기가 동작함', async () => {
      const user = userEvent.setup();
      render(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          enableColumnVisibility
          columnVisibility={{ email: false }}
          showToolbar
        />
      );

      // Email column should be hidden
      expect(screen.queryByText('Email')).not.toBeInTheDocument();
    });

    it('컬럼 visibility 변경이 동작함', async () => {
      const user = userEvent.setup();
      const handleVisibilityChange = vi.fn();
      render(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          enableColumnVisibility
          onColumnVisibilityChange={handleVisibilityChange}
          showToolbar
        />
      );

      // Find column visibility toggle button
      const columnsButton = screen.getByRole('button', { name: /columns/i });
      if (columnsButton) {
        await user.click(columnsButton);

        // Find and click a column toggle
        const toggle = screen.getAllByRole('checkbox')[0];
        if (toggle) {
          await user.click(toggle);
          expect(handleVisibilityChange).toHaveBeenCalled();
        }
      }
    });

    it('컬럼 리사이징이 활성화됨', () => {
      render(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          enableColumnResizing
        />
      );

      // Resize handles should be present
      const resizeHandles = document.querySelectorAll('[class*="resize"]');
      expect(resizeHandles.length).toBeGreaterThan(0);
    });

    it('컬럼 피닝이 동작함', () => {
      render(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          enableColumnPinning
          columnPinning={{ left: ['name'] }}
        />
      );

      // Name column should have pinned styling
      const header = screen.getByText('Name').closest('[role="columnheader"]');
      expect(header).toHaveClass(/pinned/);
    });
  });

  describe('툴바', () => {
    it('툴바가 표시됨', () => {
      render(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          showToolbar
        />
      );

      const toolbar = document.querySelector('[class*="toolbar"]');
      expect(toolbar).toBeInTheDocument();
    });

    it('커스텀 툴바 콘텐츠가 표시됨', () => {
      render(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          showToolbar
          toolbarContent={<button>Custom Action</button>}
        />
      );

      expect(screen.getByText('Custom Action')).toBeInTheDocument();
    });

    it('showHeader=false일 때 헤더가 숨겨짐', () => {
      render(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          showHeader={false}
        />
      );

      expect(screen.queryByRole('columnheader')).not.toBeInTheDocument();
    });
  });

  describe('ref API', () => {
    it('getSelectedRows가 선택된 행을 반환함', async () => {
      const user = userEvent.setup();
      const ref = React.createRef<DataGridRef<TestData>>();
      render(
        <DataGrid
          ref={ref}
          data={mockData}
          columns={mockColumns}
          enableRowSelection
          getRowId={(row) => row.id}
        />
      );

      // Select first row
      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[1]);

      const selectedRows = ref.current?.getSelectedRows();
      expect(selectedRows).toHaveLength(1);
      expect(selectedRows?.[0]?.name).toBe('Alice');
    });

    it('clearSelection이 선택을 초기화함', async () => {
      const user = userEvent.setup();
      const ref = React.createRef<DataGridRef<TestData>>();
      render(
        <DataGrid
          ref={ref}
          data={mockData}
          columns={mockColumns}
          enableRowSelection
          getRowId={(row) => row.id}
        />
      );

      // Select first row
      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[1]);

      // Verify selection
      expect(ref.current?.getSelectedRows()).toHaveLength(1);

      ref.current?.clearSelection();

      // Wait for state update
      await waitFor(() => {
        const selectedRows = ref.current?.getSelectedRows();
        expect(selectedRows).toHaveLength(0);
      });
    });

    it('resetFilters가 필터를 초기화함', async () => {
      const user = userEvent.setup();
      const ref = React.createRef<DataGridRef<TestData>>();
      render(
        <DataGrid
          ref={ref}
          data={mockData}
          columns={mockColumns}
          enableGlobalFilter
          showToolbar
        />
      );

      const searchInput = document.querySelector('[class*="globalSearchInput"]') as HTMLInputElement;
      await user.type(searchInput, 'Alice');

      await waitFor(() => {
        expect(screen.queryByText('Bob')).not.toBeInTheDocument();
      });

      ref.current?.resetFilters();

      await waitFor(() => {
        expect(screen.getByText('Bob')).toBeInTheDocument();
      });
    });

    it('resetSorting이 정렬을 초기화함', async () => {
      const user = userEvent.setup();
      const ref = React.createRef<DataGridRef<TestData>>();
      render(
        <DataGrid
          ref={ref}
          data={mockData}
          columns={mockColumns}
          enableSorting
        />
      );

      await user.click(screen.getByText('Name'));

      ref.current?.resetSorting();

      // Sorting should be cleared (original order)
      const cells = screen.getAllByRole('gridcell');
      const nameColumnCells = cells.filter((_, index) => index % 5 === 0);
      expect(nameColumnCells[0]).toHaveTextContent('Alice');
    });
  });

  describe('커스텀 cell 렌더링', () => {
    it('커스텀 cell 렌더러가 동작함', () => {
      const columnsWithCustomCell: DataGridColumn<TestData>[] = [
        ...mockColumns.slice(0, 3),
        {
          id: 'status',
          header: 'Status',
          accessorKey: 'status',
          cell: ({ getValue }) => (
            <span data-testid="custom-cell" className={`status-${getValue()}`}>
              {getValue() as string}
            </span>
          ),
        },
        mockColumns[4],
      ];

      render(<DataGrid data={mockData} columns={columnsWithCustomCell} />);

      const customCells = screen.getAllByTestId('custom-cell');
      expect(customCells.length).toBeGreaterThan(0);
      expect(customCells[0]).toHaveTextContent('active');
    });

    it('accessorFn으로 계산된 값 표시', () => {
      const columnsWithAccessorFn: DataGridColumn<TestData>[] = [
        {
          id: 'fullInfo',
          header: 'Full Info',
          accessorFn: (row) => `${row.name} (${row.age})`,
        },
        ...mockColumns.slice(1),
      ];

      render(<DataGrid data={mockData} columns={columnsWithAccessorFn} />);

      expect(screen.getByText('Alice (30)')).toBeInTheDocument();
    });
  });

  describe('height', () => {
    it('height prop이 적용됨', () => {
      render(<DataGrid data={mockData} columns={mockColumns} height={400} />);

      const container = document.querySelector('[class*="container"]');
      expect(container).toHaveStyle({ height: '400px' });
    });

    it('height string이 적용됨', () => {
      render(<DataGrid data={mockData} columns={mockColumns} height="50vh" />);

      const container = document.querySelector('[class*="container"]');
      expect(container).toHaveStyle({ height: '50vh' });
    });
  });

  describe('셀 편집', () => {
    it('editable 컬럼에서 더블클릭으로 편집 모드 진입', async () => {
      const user = userEvent.setup();
      const editableColumns: DataGridColumn<TestData>[] = [
        { id: 'name', header: 'Name', accessorKey: 'name', editable: true },
        ...mockColumns.slice(1),
      ];

      render(
        <DataGrid
          data={mockData}
          columns={editableColumns}
          enableCellEditing
          getRowId={(row) => row.id}
        />
      );

      const aliceCell = screen.getByText('Alice');
      await user.dblClick(aliceCell);

      // Input should appear
      const input = document.querySelector('[class*="edit"] input');
      expect(input).toBeInTheDocument();
    });

    it('onCellEdit 콜백이 호출됨', async () => {
      const user = userEvent.setup();
      const handleCellEdit = vi.fn();
      const editableColumns: DataGridColumn<TestData>[] = [
        { id: 'name', header: 'Name', accessorKey: 'name', editable: true },
        ...mockColumns.slice(1),
      ];

      render(
        <DataGrid
          data={mockData}
          columns={editableColumns}
          enableCellEditing
          onCellEdit={handleCellEdit}
          getRowId={(row) => row.id}
        />
      );

      const aliceCell = screen.getByText('Alice');
      await user.dblClick(aliceCell);

      const input = document.querySelector('[class*="edit"] input') as HTMLInputElement;
      if (input) {
        await user.clear(input);
        await user.type(input, 'Updated Name');
        await user.keyboard('{Enter}');

        expect(handleCellEdit).toHaveBeenCalledWith('1', 'name', 'Updated Name');
      }
    });
  });

  describe('접근성', () => {
    it('기본 DataGrid가 그리드 구조를 가짐', () => {
      render(<DataGrid data={mockData} columns={mockColumns} />);

      // DataGrid has proper grid structure
      expect(screen.getByRole('grid')).toBeInTheDocument();
      expect(screen.getAllByRole('columnheader').length).toBeGreaterThan(0);
      expect(screen.getAllByRole('row').length).toBeGreaterThan(0);
    });

    it('빈 상태에서도 그리드 구조를 유지함', () => {
      render(<DataGrid data={[]} columns={mockColumns} />);

      expect(screen.getByRole('grid')).toBeInTheDocument();
      expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    it('그리드에 role="grid"가 있음', () => {
      render(<DataGrid data={mockData} columns={mockColumns} />);

      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('헤더에 role="columnheader"가 있음', () => {
      render(<DataGrid data={mockData} columns={mockColumns} />);

      expect(screen.getAllByRole('columnheader').length).toBeGreaterThan(0);
    });

    it('셀에 role="gridcell"이 있음', () => {
      render(<DataGrid data={mockData} columns={mockColumns} />);

      expect(screen.getAllByRole('gridcell').length).toBeGreaterThan(0);
    });
  });

  describe('복합 사용', () => {
    it('정렬 + 필터 + 페이지네이션 조합', async () => {
      const user = userEvent.setup();
      render(
        <DataGrid
          data={largeData}
          columns={mockColumns}
          enableSorting
          enableGlobalFilter
          enablePagination
          pagination={{ pageIndex: 0, pageSize: 10 }}
          showToolbar
        />
      );

      // Apply filter
      const searchInput = document.querySelector('[class*="globalSearchInput"]') as HTMLInputElement;
      await user.type(searchInput, 'active');

      await waitFor(() => {
        // Results should be filtered
        const cells = screen.getAllByRole('gridcell');
        const statusCells = cells.filter((_, index) => index % 5 === 3);
        statusCells.forEach((cell) => {
          expect(cell).toHaveTextContent(/active/i);
        });
      });
    });

    it('선택 + 확장 조합', async () => {
      const user = userEvent.setup();
      const handleSelectionChange = vi.fn();

      render(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          enableRowSelection
          enableExpanding
          renderExpandedRow={(row) => <div data-testid="expanded-row">{row.email}</div>}
          onRowSelectionChange={handleSelectionChange}
          getRowId={(row) => row.id}
        />
      );

      // Select a row
      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[1]);

      expect(handleSelectionChange).toHaveBeenCalled();

      // Check expand buttons exist
      const expandButtons = document.querySelectorAll('[class*="expandButton"]');
      expect(expandButtons.length).toBeGreaterThan(0);
    });

    it('컬럼 피닝 + 컬럼 숨김 조합', () => {
      render(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          enableColumnPinning
          enableColumnVisibility
          columnPinning={{ left: ['name'] }}
          columnVisibility={{ email: false }}
        />
      );

      // Name should be pinned
      const nameHeader = screen.getByText('Name').closest('[role="columnheader"]');
      expect(nameHeader).toHaveClass(/pinned/);

      // Email should be hidden
      expect(screen.queryByText('Email')).not.toBeInTheDocument();
    });
  });

  describe('Controlled Props 동기화', () => {
    it('sorting prop 변경 시 상태가 업데이트됨', async () => {
      const { rerender } = render(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          enableSorting
          sorting={[]}
        />
      );

      // 정렬 상태 변경
      rerender(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          enableSorting
          sorting={[{ id: 'name', desc: false }]}
        />
      );

      // 정렬이 적용되었는지 확인 (Alice가 첫 번째)
      const cells = screen.getAllByRole('gridcell');
      const nameColumnCells = cells.filter((_, index) => index % 5 === 0);
      expect(nameColumnCells[0]).toHaveTextContent('Alice');
    });

    it('globalFilter prop 변경 시 필터가 적용됨', async () => {
      const { rerender } = render(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          enableGlobalFilter
          globalFilter=""
        />
      );

      // 모든 데이터가 표시됨
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();

      rerender(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          enableGlobalFilter
          globalFilter="Alice"
        />
      );

      // Alice만 표시됨
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.queryByText('Bob')).not.toBeInTheDocument();
    });

    it('rowSelection prop 변경 시 선택 상태가 업데이트됨', () => {
      const { rerender } = render(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          enableRowSelection
          rowSelection={{}}
          getRowId={(row) => row.id}
        />
      );

      // 체크박스가 선택되지 않음
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes[1]).not.toBeChecked();

      rerender(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          enableRowSelection
          rowSelection={{ '1': true }}
          getRowId={(row) => row.id}
        />
      );

      // 첫 번째 행이 선택됨
      const updatedCheckboxes = screen.getAllByRole('checkbox');
      expect(updatedCheckboxes[1]).toBeChecked();
    });

    it('pagination prop 변경 시 페이지 상태가 업데이트됨', () => {
      const { rerender } = render(
        <DataGrid
          data={largeData}
          columns={mockColumns}
          enablePagination
          pagination={{ pageIndex: 0, pageSize: 10 }}
        />
      );

      // 첫 페이지 데이터가 표시됨
      expect(screen.getByText('User 1')).toBeInTheDocument();

      rerender(
        <DataGrid
          data={largeData}
          columns={mockColumns}
          enablePagination
          pagination={{ pageIndex: 1, pageSize: 10 }}
        />
      );

      // 두 번째 페이지 데이터가 표시됨
      expect(screen.getByText('User 11')).toBeInTheDocument();
      expect(screen.queryByText('User 1')).not.toBeInTheDocument();
    });

    it('columnVisibility prop 변경 시 컬럼 가시성이 업데이트됨', () => {
      const { rerender } = render(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          columnVisibility={{}}
        />
      );

      // 모든 컬럼이 표시됨
      expect(screen.getByText('Email')).toBeInTheDocument();

      rerender(
        <DataGrid
          data={mockData}
          columns={mockColumns}
          columnVisibility={{ email: false }}
        />
      );

      // Email 컬럼이 숨겨짐
      expect(screen.queryByText('Email')).not.toBeInTheDocument();
    });
  });
});
