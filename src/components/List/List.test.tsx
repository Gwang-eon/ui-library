/**
 * List 컴포넌트 테스트
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { List } from './List';
import { Star } from 'lucide-react';

describe('List', () => {
  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(
        <List>
          <List.Item>Item 1</List.Item>
          <List.Item>Item 2</List.Item>
        </List>
      );

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('children이 올바르게 렌더링됨', () => {
      render(
        <List>
          <List.Item>
            <span data-testid="custom">Custom Content</span>
          </List.Item>
        </List>
      );

      expect(screen.getByTestId('custom')).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      const { container } = render(
        <List className="custom-list">
          <List.Item>Item</List.Item>
        </List>
      );

      expect(container.firstChild).toHaveClass('custom-list');
    });
  });

  describe('variants', () => {
    const variants = ['default', 'compact', 'divided'] as const;

    variants.forEach((variant) => {
      it(`${variant} variant가 정상 렌더링됨`, () => {
        const { container } = render(
          <List variant={variant}>
            <List.Item>Item</List.Item>
          </List>
        );

        expect(container.firstChild).toBeInTheDocument();
      });
    });

    it('compact variant가 적절한 클래스를 가짐', () => {
      const { container } = render(
        <List variant="compact">
          <List.Item>Item</List.Item>
        </List>
      );

      expect(container.querySelector('[class*="Compact"]')).toBeInTheDocument();
    });

    it('divided variant가 적절한 클래스를 가짐', () => {
      const { container } = render(
        <List variant="divided">
          <List.Item>Item</List.Item>
        </List>
      );

      expect(container.querySelector('[class*="Divided"]')).toBeInTheDocument();
    });
  });

  describe('List.Item', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(
        <List>
          <List.Item>Test Item</List.Item>
        </List>
      );

      expect(screen.getByText('Test Item')).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      render(
        <List>
          <List.Item className="custom-item">Item</List.Item>
        </List>
      );

      expect(screen.getByText('Item')).toHaveClass('custom-item');
    });

    it('interactive prop이 적용됨', () => {
      const { container } = render(
        <List>
          <List.Item interactive>Interactive Item</List.Item>
        </List>
      );

      expect(container.querySelector('[class*="Interactive"]')).toBeInTheDocument();
    });

    it('onClick이 있으면 role="button"과 tabIndex가 설정됨', () => {
      const handleClick = vi.fn();
      render(
        <List>
          <List.Item onClick={handleClick}>Clickable Item</List.Item>
        </List>
      );

      const item = screen.getByRole('button');
      expect(item).toHaveAttribute('tabIndex', '0');
    });

    it('onClick 핸들러가 호출됨', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <List>
          <List.Item onClick={handleClick}>Clickable Item</List.Item>
        </List>
      );

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('Enter 키로 클릭 이벤트가 트리거됨', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <List>
          <List.Item onClick={handleClick}>Clickable Item</List.Item>
        </List>
      );

      const item = screen.getByRole('button');
      item.focus();
      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('Space 키로 클릭 이벤트가 트리거됨', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <List>
          <List.Item onClick={handleClick}>Clickable Item</List.Item>
        </List>
      );

      const item = screen.getByRole('button');
      item.focus();
      await user.keyboard(' ');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('href가 있으면 링크로 렌더링됨', () => {
      render(
        <List>
          <List.Item href="/test">Link Item</List.Item>
        </List>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/test');
    });

    it('href와 onClick이 함께 있으면 링크에 onClick이 적용됨', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn((e) => e.preventDefault());

      render(
        <List>
          <List.Item href="/test" onClick={handleClick}>Link Item</List.Item>
        </List>
      );

      await user.click(screen.getByRole('link'));
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('List.EmptyState', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(
        <List>
          <List.EmptyState title="No items" />
        </List>
      );

      expect(screen.getByText('No items')).toBeInTheDocument();
    });

    it('description이 렌더링됨', () => {
      render(
        <List>
          <List.EmptyState
            title="No items"
            description="Add some items to get started"
          />
        </List>
      );

      expect(screen.getByText('Add some items to get started')).toBeInTheDocument();
    });

    it('커스텀 icon이 렌더링됨', () => {
      render(
        <List>
          <List.EmptyState
            title="No favorites"
            icon={<Star data-testid="custom-icon" />}
          />
        </List>
      );

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('action이 렌더링됨', () => {
      render(
        <List>
          <List.EmptyState
            title="No items"
            action={<button>Add Item</button>}
          />
        </List>
      );

      expect(screen.getByRole('button', { name: 'Add Item' })).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      const { container } = render(
        <List>
          <List.EmptyState title="Empty" className="custom-empty" />
        </List>
      );

      expect(container.querySelector('.custom-empty')).toBeInTheDocument();
    });
  });

  describe('복합 사용', () => {
    it('여러 아이템과 함께 사용됨', () => {
      render(
        <List variant="divided">
          <List.Item>Item 1</List.Item>
          <List.Item>Item 2</List.Item>
          <List.Item>Item 3</List.Item>
        </List>
      );

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('interactive 아이템과 일반 아이템이 혼합됨', () => {
      const handleClick = vi.fn();

      render(
        <List>
          <List.Item>Normal Item</List.Item>
          <List.Item onClick={handleClick}>Clickable Item</List.Item>
          <List.Item href="/link">Link Item</List.Item>
        </List>
      );

      expect(screen.getByText('Normal Item')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('link')).toBeInTheDocument();
    });
  });

  describe('접근성', () => {
    it('기본 List가 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <List>
          <List.Item>Item 1</List.Item>
          <List.Item>Item 2</List.Item>
        </List>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('interactive item이 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <List>
          <List.Item onClick={() => {}}>Clickable</List.Item>
        </List>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('link item이 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <List>
          <List.Item href="/test">Link Item</List.Item>
        </List>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('EmptyState가 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <List>
          <List.EmptyState
            title="No items"
            description="Add items to see them here"
          />
        </List>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
