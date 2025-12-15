/**
 * EmptyState 컴포넌트 테스트
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  afterEach(() => {
    cleanup();
  });

  describe('렌더링', () => {
    it('EmptyState가 렌더링됨', () => {
      render(<EmptyState title="No data" />);

      expect(screen.getByText('No data')).toBeInTheDocument();
    });

    it('title이 렌더링됨', () => {
      render(<EmptyState title="No items found" />);

      expect(screen.getByRole('heading', { name: 'No items found' })).toBeInTheDocument();
    });

    it('description이 렌더링됨', () => {
      render(
        <EmptyState title="No data" description="Try adjusting your search or filters." />
      );

      expect(screen.getByText('Try adjusting your search or filters.')).toBeInTheDocument();
    });

    it('icon이 렌더링됨', () => {
      render(
        <EmptyState
          title="No data"
          icon={<span data-testid="empty-icon">📭</span>}
        />
      );

      expect(screen.getByTestId('empty-icon')).toBeInTheDocument();
    });

    it('actions가 렌더링됨', () => {
      render(
        <EmptyState
          title="No data"
          actions={<button>Create new</button>}
        />
      );

      expect(screen.getByRole('button', { name: 'Create new' })).toBeInTheDocument();
    });

    it('children이 렌더링됨', () => {
      render(
        <EmptyState title="No data">
          <p data-testid="custom-content">Custom content</p>
        </EmptyState>
      );

      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      render(<EmptyState title="No data" className="custom-empty" />);

      expect(document.querySelector('.custom-empty')).toBeInTheDocument();
    });
  });

  describe('size', () => {
    it('기본 size는 default', () => {
      render(<EmptyState title="No data" />);

      expect(document.querySelector('[class*="emptyStateCompact"]')).not.toBeInTheDocument();
    });

    it('size="compact"가 적용됨', () => {
      render(<EmptyState title="No data" size="compact" />);

      expect(document.querySelector('[class*="emptyStateCompact"]')).toBeInTheDocument();
    });

    it('size="default"가 적용됨', () => {
      render(<EmptyState title="No data" size="default" />);

      expect(document.querySelector('[class*="emptyStateCompact"]')).not.toBeInTheDocument();
    });
  });

  describe('인터랙션', () => {
    it('action 버튼 클릭이 동작함', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <EmptyState
          title="No data"
          actions={<button onClick={handleClick}>Refresh</button>}
        />
      );

      await user.click(screen.getByRole('button', { name: 'Refresh' }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('여러 action 버튼이 동작함', async () => {
      const user = userEvent.setup();
      const handleCreate = vi.fn();
      const handleImport = vi.fn();

      render(
        <EmptyState
          title="No data"
          actions={
            <>
              <button onClick={handleCreate}>Create</button>
              <button onClick={handleImport}>Import</button>
            </>
          }
        />
      );

      await user.click(screen.getByRole('button', { name: 'Create' }));
      expect(handleCreate).toHaveBeenCalledTimes(1);

      await user.click(screen.getByRole('button', { name: 'Import' }));
      expect(handleImport).toHaveBeenCalledTimes(1);
    });
  });

  describe('접근성', () => {
    it('title이 heading으로 렌더링됨', () => {
      render(<EmptyState title="No results" />);

      expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    it('기본 EmptyState가 a11y 위반 사항이 없음', async () => {
      const { container } = render(<EmptyState title="No data" />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('전체 구성 요소가 있는 EmptyState가 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <EmptyState
          title="No items"
          description="Add your first item to get started."
          icon={<span>📦</span>}
          actions={<button>Add item</button>}
        />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('복합 사용', () => {
    it('검색 결과 없음', () => {
      render(
        <EmptyState
          title="No results found"
          description="Try different keywords or remove search filters."
          icon={<span role="img" aria-label="search">🔍</span>}
          actions={<button>Clear filters</button>}
        />
      );

      expect(screen.getByText('No results found')).toBeInTheDocument();
      expect(screen.getByText('Try different keywords or remove search filters.')).toBeInTheDocument();
      expect(screen.getByRole('img', { name: 'search' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Clear filters' })).toBeInTheDocument();
    });

    it('빈 장바구니', () => {
      render(
        <EmptyState
          title="Your cart is empty"
          description="Add items to your cart to see them here."
          icon={<span role="img" aria-label="cart">🛒</span>}
          actions={
            <button>Continue shopping</button>
          }
        />
      );

      expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Continue shopping' })).toBeInTheDocument();
    });

    it('오프라인 상태', () => {
      render(
        <EmptyState
          title="You're offline"
          description="Check your internet connection and try again."
          icon={<span role="img" aria-label="offline">📡</span>}
          actions={<button>Retry</button>}
        />
      );

      expect(screen.getByText("You're offline")).toBeInTheDocument();
    });

    it('compact 모드', () => {
      render(
        <EmptyState
          title="No items"
          size="compact"
        />
      );

      expect(screen.getByText('No items')).toBeInTheDocument();
      expect(document.querySelector('[class*="emptyStateCompact"]')).toBeInTheDocument();
    });
  });
});
