/**
 * Sidemenu 컴포넌트 테스트
 */
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Sidemenu, type SidemenuItem, type SidemenuGroup } from './Sidemenu';

const defaultItems: SidemenuItem[] = [
  { key: 'home', title: 'Home', icon: <span>🏠</span> },
  { key: 'products', title: 'Products', icon: <span>📦</span> },
  { key: 'settings', title: 'Settings', icon: <span>⚙️</span> },
];

const nestedItems: SidemenuItem[] = [
  { key: 'home', title: 'Home' },
  {
    key: 'products',
    title: 'Products',
    children: [
      { key: 'products-list', title: 'Product List' },
      { key: 'products-add', title: 'Add Product' },
    ],
  },
];

const groupedItems: (SidemenuItem | SidemenuGroup)[] = [
  { key: 'home', title: 'Home' },
  {
    title: 'Management',
    items: [
      { key: 'users', title: 'Users' },
      { key: 'roles', title: 'Roles' },
    ],
  },
];

describe('Sidemenu', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(<Sidemenu items={defaultItems} />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('모든 메뉴 항목이 렌더링됨', () => {
      render(<Sidemenu items={defaultItems} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('아이콘이 렌더링됨', () => {
      render(<Sidemenu items={defaultItems} />);
      expect(screen.getByText('🏠')).toBeInTheDocument();
      expect(screen.getByText('📦')).toBeInTheDocument();
    });

    it('brandText가 렌더링됨', () => {
      render(<Sidemenu items={defaultItems} brandText="My App" />);
      expect(screen.getByText('My App')).toBeInTheDocument();
    });

    it('brandIcon이 렌더링됨', () => {
      render(
        <Sidemenu
          items={defaultItems}
          brandIcon={<span data-testid="brand-icon">🎯</span>}
        />
      );
      expect(screen.getByTestId('brand-icon')).toBeInTheDocument();
    });
  });

  describe('activeKey', () => {
    it('활성 항목이 active 클래스를 가짐', () => {
      const { container } = render(<Sidemenu items={defaultItems} activeKey="home" />);
      const activeItem = container.querySelector('.active');
      expect(activeItem).toBeInTheDocument();
      expect(activeItem).toHaveTextContent('Home');
    });

    it('활성 항목에 aria-current="page"가 있음', () => {
      render(<Sidemenu items={defaultItems} activeKey="home" />);
      expect(screen.getByText('Home').closest('[aria-current]')).toHaveAttribute(
        'aria-current',
        'page'
      );
    });
  });

  describe('collapsed', () => {
    it('defaultCollapsed가 적용됨', () => {
      const { container } = render(
        <Sidemenu items={defaultItems} defaultCollapsed={true} storageKey="" />
      );
      expect(container.querySelector('.sidemenu')).toHaveClass('collapsed');
    });

    it('collapse 버튼 클릭 시 토글됨', async () => {
      const user = userEvent.setup();
      const { container } = render(<Sidemenu items={defaultItems} storageKey="" />);

      const collapseBtn = screen.getByRole('button', { name: /collapse/i });
      await user.click(collapseBtn);

      expect(container.querySelector('.sidemenu')).toHaveClass('collapsed');
    });

    it('controlled collapsed가 적용됨', () => {
      const { container } = render(
        <Sidemenu items={defaultItems} collapsed={true} />
      );
      expect(container.querySelector('.sidemenu')).toHaveClass('collapsed');
    });

    it('onCollapse가 호출됨', async () => {
      const handleCollapse = vi.fn();
      const user = userEvent.setup();

      render(
        <Sidemenu items={defaultItems} onCollapse={handleCollapse} storageKey="" />
      );

      const collapseBtn = screen.getByRole('button', { name: /collapse/i });
      await user.click(collapseBtn);

      expect(handleCollapse).toHaveBeenCalledWith(true);
    });

    it('collapse 버튼의 aria-expanded가 업데이트됨', async () => {
      const user = userEvent.setup();
      render(<Sidemenu items={defaultItems} storageKey="" />);

      const collapseBtn = screen.getByRole('button', { name: /collapse/i });
      expect(collapseBtn).toHaveAttribute('aria-expanded', 'true');

      await user.click(collapseBtn);
      expect(collapseBtn).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('onSelect', () => {
    it('항목 클릭 시 onSelect가 호출됨', async () => {
      const handleSelect = vi.fn();
      const user = userEvent.setup();

      render(<Sidemenu items={defaultItems} onSelect={handleSelect} />);

      await user.click(screen.getByText('Home'));
      expect(handleSelect).toHaveBeenCalledWith('home');
    });

    it('href가 있는 항목도 onSelect가 호출됨', async () => {
      const handleSelect = vi.fn();
      const user = userEvent.setup();
      const items = [{ key: 'home', title: 'Home', href: '/home' }];

      render(<Sidemenu items={items} onSelect={handleSelect} />);

      await user.click(screen.getByText('Home'));
      expect(handleSelect).toHaveBeenCalledWith('home');
    });
  });

  describe('nested items (children)', () => {
    it('children이 있는 항목에 chevron이 표시됨', () => {
      render(<Sidemenu items={nestedItems} />);
      expect(screen.getByText('▶')).toBeInTheDocument();
    });

    it('부모 항목 클릭 시 확장됨', async () => {
      const user = userEvent.setup();
      render(<Sidemenu items={nestedItems} />);

      await user.click(screen.getByText('Products'));

      expect(screen.getByText('Product List')).toBeInTheDocument();
      expect(screen.getByText('Add Product')).toBeInTheDocument();
    });

    it('확장된 항목 재클릭 시 접힘', async () => {
      const user = userEvent.setup();
      render(<Sidemenu items={nestedItems} />);

      await user.click(screen.getByText('Products'));
      expect(screen.getByText('Product List')).toBeInTheDocument();

      await user.click(screen.getByText('Products'));
      expect(screen.queryByText('Product List')).not.toBeInTheDocument();
    });

    it('확장 시 chevron이 ▼로 변경됨', async () => {
      const user = userEvent.setup();
      render(<Sidemenu items={nestedItems} />);

      await user.click(screen.getByText('Products'));
      expect(screen.getByText('▼')).toBeInTheDocument();
    });

    it('부모 항목에 aria-expanded가 있음', () => {
      render(<Sidemenu items={nestedItems} />);
      const parent = screen.getByText('Products').closest('[aria-expanded]');
      expect(parent).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('grouped items', () => {
    it('그룹 헤더가 렌더링됨', () => {
      render(<Sidemenu items={groupedItems} />);
      expect(screen.getByText('Management')).toBeInTheDocument();
    });

    it('그룹 내 항목이 렌더링됨', () => {
      render(<Sidemenu items={groupedItems} />);
      expect(screen.getByText('Users')).toBeInTheDocument();
      expect(screen.getByText('Roles')).toBeInTheDocument();
    });
  });

  describe('disabled', () => {
    it('disabled 항목이 disabled 클래스를 가짐', () => {
      const items = [{ key: 'disabled', title: 'Disabled', disabled: true }];
      const { container } = render(<Sidemenu items={items} />);
      expect(container.querySelector('.disabled')).toBeInTheDocument();
    });

    it('disabled 항목 클릭 시 onSelect가 호출되지 않음', async () => {
      const handleSelect = vi.fn();
      const user = userEvent.setup();
      const items = [{ key: 'disabled', title: 'Disabled', disabled: true }];

      render(<Sidemenu items={items} onSelect={handleSelect} />);

      await user.click(screen.getByText('Disabled'));
      expect(handleSelect).not.toHaveBeenCalled();
    });
  });

  describe('badge', () => {
    it('badge가 렌더링됨', () => {
      const items = [{ key: 'home', title: 'Home', badge: '5' }];
      render(<Sidemenu items={items} />);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('ReactNode badge가 렌더링됨', () => {
      const items = [
        { key: 'home', title: 'Home', badge: <span data-testid="badge">New</span> },
      ];
      render(<Sidemenu items={items} />);
      expect(screen.getByTestId('badge')).toBeInTheDocument();
    });
  });

  describe('search', () => {
    it('showSearch가 true일 때 검색 입력이 표시됨', () => {
      render(<Sidemenu items={defaultItems} showSearch />);
      expect(screen.getByRole('textbox', { name: /search/i })).toBeInTheDocument();
    });

    it('검색 placeholder가 적용됨', () => {
      render(
        <Sidemenu items={defaultItems} showSearch searchPlaceholder="Find menu..." />
      );
      expect(screen.getByPlaceholderText('Find menu...')).toBeInTheDocument();
    });

    it('검색어에 따라 항목이 필터링됨', async () => {
      const user = userEvent.setup();
      render(<Sidemenu items={defaultItems} showSearch />);

      const searchInput = screen.getByRole('textbox', { name: /search/i });
      await user.type(searchInput, 'Home');

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.queryByText('Products')).not.toBeInTheDocument();
    });

    it('collapsed 상태에서 검색이 숨겨짐', () => {
      render(<Sidemenu items={defaultItems} showSearch collapsed />);
      expect(screen.queryByRole('textbox', { name: /search/i })).not.toBeInTheDocument();
    });
  });

  describe('userInfo', () => {
    it('userInfo가 렌더링됨', () => {
      render(
        <Sidemenu
          items={defaultItems}
          userInfo={{ name: 'John Doe', email: 'john@example.com' }}
        />
      );
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });

    it('이니셜 아바타가 렌더링됨', () => {
      render(
        <Sidemenu items={defaultItems} userInfo={{ name: 'John Doe' }} />
      );
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('문자열 아바타가 렌더링됨', () => {
      render(
        <Sidemenu
          items={defaultItems}
          userInfo={{ name: 'John', avatar: '👤' }}
        />
      );
      expect(screen.getByText('👤')).toBeInTheDocument();
    });

    it('이미지 URL 아바타가 렌더링됨', () => {
      render(
        <Sidemenu
          items={defaultItems}
          userInfo={{ name: 'John', avatar: 'https://example.com/avatar.jpg' }}
        />
      );
      const img = screen.getByRole('img', { name: 'John' });
      expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    it('ReactNode 아바타가 렌더링됨', () => {
      render(
        <Sidemenu
          items={defaultItems}
          userInfo={{ name: 'John', avatar: <span data-testid="custom-avatar">🎭</span> }}
        />
      );
      expect(screen.getByTestId('custom-avatar')).toBeInTheDocument();
    });
  });

  describe('href', () => {
    it('href가 있으면 anchor로 렌더링됨', () => {
      const items = [{ key: 'home', title: 'Home', href: '/home' }];
      render(<Sidemenu items={items} />);
      const link = screen.getByRole('link', { name: /home/i });
      expect(link).toHaveAttribute('href', '/home');
    });

    it('href가 없으면 div로 렌더링됨', () => {
      const items = [{ key: 'home', title: 'Home' }];
      render(<Sidemenu items={items} />);
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
  });

  describe('className', () => {
    it('커스텀 className이 적용됨', () => {
      const { container } = render(
        <Sidemenu items={defaultItems} className="custom-sidemenu" />
      );
      expect(container.querySelector('.sidemenu')).toHaveClass('custom-sidemenu');
    });
  });

  describe('localStorage persistence', () => {
    it('collapsed 상태가 localStorage에 저장됨', async () => {
      const user = userEvent.setup();
      render(<Sidemenu items={defaultItems} storageKey="test-sidemenu" />);

      const collapseBtn = screen.getByRole('button', { name: /collapse/i });
      await user.click(collapseBtn);

      expect(localStorage.getItem('test-sidemenu')).toBe('true');
    });

    it('localStorage에서 초기 상태를 복원함', () => {
      localStorage.setItem('test-sidemenu', 'true');
      const { container } = render(
        <Sidemenu items={defaultItems} storageKey="test-sidemenu" />
      );
      expect(container.querySelector('.sidemenu')).toHaveClass('collapsed');
    });
  });

  describe('접근성', () => {
    it('aria-label이 navigation에 있음', () => {
      render(<Sidemenu items={defaultItems} />);
      expect(screen.getByRole('navigation')).toHaveAttribute(
        'aria-label',
        'Main navigation'
      );
    });

    it('a11y 위반 사항이 없음', async () => {
      const { container } = render(<Sidemenu items={defaultItems} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('a11y 위반 사항이 없음 (with userInfo)', async () => {
      const { container } = render(
        <Sidemenu
          items={defaultItems}
          userInfo={{ name: 'John Doe', email: 'john@example.com' }}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('a11y 위반 사항이 없음 (collapsed)', async () => {
      const { container } = render(
        <Sidemenu items={defaultItems} collapsed />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('tooltip (collapsed mode)', () => {
    it('collapsed 모드에서 data-tooltip이 설정됨', () => {
      const items = [{ key: 'home', title: 'Home', tooltip: 'Go to Home' }];
      const { container } = render(<Sidemenu items={items} collapsed />);

      const item = container.querySelector('[data-tooltip]');
      expect(item).toHaveAttribute('data-tooltip', 'Go to Home');
    });

    it('tooltip이 없으면 title이 사용됨', () => {
      const items = [{ key: 'home', title: 'Home' }];
      const { container } = render(<Sidemenu items={items} collapsed />);

      const item = container.querySelector('[data-tooltip]');
      expect(item).toHaveAttribute('data-tooltip', 'Home');
    });
  });
});
