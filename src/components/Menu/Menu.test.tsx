/**
 * Menu 컴포넌트 테스트
 */
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Menu, MenuItem, MenuDivider, MenuHeader } from './Menu';

describe('Menu', () => {
  describe('렌더링', () => {
    it('trigger가 렌더링됨', () => {
      render(
        <Menu trigger={<button>Open Menu</button>}>
          <MenuItem>Item 1</MenuItem>
        </Menu>
      );
      expect(screen.getByRole('button', { name: 'Open Menu' })).toBeInTheDocument();
    });

    it('초기에 메뉴 내용이 숨겨져 있음', () => {
      render(
        <Menu trigger={<button>Open Menu</button>}>
          <MenuItem>Item 1</MenuItem>
        </Menu>
      );
      expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    });

    it('trigger 클릭 시 메뉴가 열림', async () => {
      const user = userEvent.setup();
      render(
        <Menu trigger={<button>Open Menu</button>}>
          <MenuItem>Item 1</MenuItem>
        </Menu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    it('trigger 재클릭 시 메뉴가 닫힘', async () => {
      const user = userEvent.setup();
      render(
        <Menu trigger={<button>Open Menu</button>}>
          <MenuItem>Item 1</MenuItem>
        </Menu>
      );

      const trigger = screen.getByRole('button', { name: 'Open Menu' });
      await user.click(trigger);
      expect(screen.getByText('Item 1')).toBeInTheDocument();

      await user.click(trigger);
      expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    });
  });

  describe('controlled 모드', () => {
    it('open prop으로 메뉴 상태를 제어함', () => {
      render(
        <Menu trigger={<button>Open Menu</button>} open={true}>
          <MenuItem>Item 1</MenuItem>
        </Menu>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    it('open이 false일 때 메뉴가 닫혀 있음', () => {
      render(
        <Menu trigger={<button>Open Menu</button>} open={false}>
          <MenuItem>Item 1</MenuItem>
        </Menu>
      );
      expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    });

    it('onOpenChange가 호출됨', async () => {
      const handleOpenChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Menu
          trigger={<button>Open Menu</button>}
          open={false}
          onOpenChange={handleOpenChange}
        >
          <MenuItem>Item 1</MenuItem>
        </Menu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      expect(handleOpenChange).toHaveBeenCalledWith(true);
    });
  });

  describe('align', () => {
    it('기본 align은 left', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Menu trigger={<button>Open Menu</button>}>
          <MenuItem>Item 1</MenuItem>
        </Menu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      const menu = container.querySelector('.menu');
      expect(menu).not.toHaveClass('menu-right');
    });

    it('align="right"가 적용됨', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Menu trigger={<button>Open Menu</button>} align="right">
          <MenuItem>Item 1</MenuItem>
        </Menu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      const menu = container.querySelector('.menu');
      expect(menu).toHaveClass('menu-right');
    });
  });

  describe('wide', () => {
    it('wide prop이 적용됨', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Menu trigger={<button>Open Menu</button>} wide>
          <MenuItem>Item 1</MenuItem>
        </Menu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      const menu = container.querySelector('.menu');
      expect(menu).toHaveClass('menu-wide');
    });
  });

  describe('외부 클릭', () => {
    it('외부 클릭 시 메뉴가 닫힘', async () => {
      const user = userEvent.setup();
      render(
        <>
          <Menu trigger={<button>Open Menu</button>}>
            <MenuItem>Item 1</MenuItem>
          </Menu>
          <div data-testid="outside">Outside</div>
        </>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      expect(screen.getByText('Item 1')).toBeInTheDocument();

      fireEvent.mouseDown(screen.getByTestId('outside'));
      await waitFor(() => {
        expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
      });
    });

    it('메뉴 내부 클릭 시 닫히지 않음', async () => {
      const user = userEvent.setup();
      render(
        <Menu trigger={<button>Open Menu</button>}>
          <MenuHeader>Header</MenuHeader>
          <MenuItem>Item 1</MenuItem>
        </Menu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      fireEvent.mouseDown(screen.getByText('Header'));

      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });
  });

  describe('className', () => {
    it('커스텀 className이 적용됨', () => {
      const { container } = render(
        <Menu trigger={<button>Open</button>} className="custom-menu">
          <MenuItem>Item</MenuItem>
        </Menu>
      );
      expect(container.firstChild).toHaveClass('custom-menu');
    });
  });
});

describe('MenuItem', () => {
  describe('렌더링', () => {
    it('기본 렌더링 (anchor)', () => {
      render(<MenuItem>Click me</MenuItem>);
      const item = screen.getByRole('link', { name: 'Click me' });
      expect(item).toBeInTheDocument();
      expect(item.tagName).toBe('A');
    });

    it('button으로 렌더링', () => {
      render(<MenuItem as="button">Click me</MenuItem>);
      const item = screen.getByRole('button', { name: 'Click me' });
      expect(item).toBeInTheDocument();
      expect(item.tagName).toBe('BUTTON');
    });

    it('icon이 렌더링됨', () => {
      render(
        <MenuItem icon={<span data-testid="icon">🔧</span>}>Settings</MenuItem>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('shortcut이 렌더링됨', () => {
      render(<MenuItem shortcut="⌘K">Search</MenuItem>);
      expect(screen.getByText('⌘K')).toBeInTheDocument();
    });

    it('href가 적용됨', () => {
      render(<MenuItem href="/settings">Settings</MenuItem>);
      expect(screen.getByRole('link')).toHaveAttribute('href', '/settings');
    });

    it('href가 없으면 기본값 #', () => {
      render(<MenuItem>Item</MenuItem>);
      expect(screen.getByRole('link')).toHaveAttribute('href', '#');
    });
  });

  describe('danger', () => {
    it('danger 스타일이 적용됨', () => {
      render(<MenuItem danger>Delete</MenuItem>);
      expect(screen.getByRole('link')).toHaveClass('menu-item-danger');
    });
  });

  describe('disabled', () => {
    it('disabled 스타일이 적용됨', () => {
      const { container } = render(<MenuItem disabled>Disabled Item</MenuItem>);
      const anchor = container.querySelector('a');
      expect(anchor).toHaveClass('menu-item-disabled');
    });

    it('disabled 상태에서 href가 없음', () => {
      const { container } = render(<MenuItem disabled>Disabled Item</MenuItem>);
      const anchor = container.querySelector('a');
      expect(anchor).not.toHaveAttribute('href');
    });

    it('disabled 상태에서 onClick이 호출되지 않음', async () => {
      const handleClick = vi.fn();
      const { container } = render(<MenuItem disabled onClick={handleClick}>Item</MenuItem>);

      const anchor = container.querySelector('a');
      fireEvent.click(anchor!);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('disabled button에서 onClick이 호출되지 않음', async () => {
      const handleClick = vi.fn();

      render(<MenuItem as="button" disabled onClick={handleClick}>Item</MenuItem>);
      // disabled button은 클릭 이벤트가 발생하지 않음
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('onClick', () => {
    it('클릭 시 onClick이 호출됨', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<MenuItem onClick={handleClick}>Item</MenuItem>);
      await user.click(screen.getByRole('link'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('button에서 클릭 시 onClick이 호출됨', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<MenuItem as="button" onClick={handleClick}>Item</MenuItem>);
      await user.click(screen.getByRole('button'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('className', () => {
    it('커스텀 className이 적용됨', () => {
      render(<MenuItem className="custom-item">Item</MenuItem>);
      expect(screen.getByRole('link')).toHaveClass('custom-item');
    });
  });
});

describe('MenuDivider', () => {
  it('렌더링됨', () => {
    const { container } = render(<MenuDivider />);
    expect(container.querySelector('.menu-divider')).toBeInTheDocument();
  });

  it('커스텀 className이 적용됨', () => {
    const { container } = render(<MenuDivider className="custom-divider" />);
    expect(container.querySelector('.menu-divider')).toHaveClass('custom-divider');
  });
});

describe('MenuHeader', () => {
  it('렌더링됨', () => {
    render(<MenuHeader>Section Title</MenuHeader>);
    expect(screen.getByText('Section Title')).toBeInTheDocument();
  });

  it('커스텀 className이 적용됨', () => {
    render(<MenuHeader className="custom-header">Title</MenuHeader>);
    expect(screen.getByText('Title')).toHaveClass('custom-header');
  });
});

describe('접근성', () => {
  it('Menu - a11y 위반 사항이 없음', async () => {
    const { container } = render(
      <Menu trigger={<button>Open Menu</button>} open={true}>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
      </Menu>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('MenuItem (anchor) - a11y 위반 사항이 없음', async () => {
    const { container } = render(
      <MenuItem href="/test">Test Item</MenuItem>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('MenuItem (button) - a11y 위반 사항이 없음', async () => {
    const { container } = render(
      <MenuItem as="button">Test Item</MenuItem>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('통합 테스트', () => {
  it('전체 메뉴 구조가 렌더링됨', async () => {
    const user = userEvent.setup();
    render(
      <Menu trigger={<button>Open Menu</button>}>
        <MenuHeader>Actions</MenuHeader>
        <MenuItem icon={<span>📝</span>}>Edit</MenuItem>
        <MenuItem icon={<span>📋</span>} shortcut="⌘C">Copy</MenuItem>
        <MenuDivider />
        <MenuItem danger>Delete</MenuItem>
      </Menu>
    );

    await user.click(screen.getByRole('button', { name: 'Open Menu' }));

    expect(screen.getByText('Actions')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Copy')).toBeInTheDocument();
    expect(screen.getByText('⌘C')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('MenuItem 클릭 후 메뉴가 유지됨 (기본 동작)', async () => {
    const user = userEvent.setup();
    render(
      <Menu trigger={<button>Open Menu</button>}>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
      </Menu>
    );

    await user.click(screen.getByRole('button', { name: 'Open Menu' }));
    await user.click(screen.getByText('Item 1'));

    // 메뉴가 여전히 열려 있음 (Menu 컴포넌트 자체적으로 닫지 않음)
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
});
