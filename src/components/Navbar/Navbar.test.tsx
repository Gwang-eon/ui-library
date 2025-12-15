/**
 * Navbar 컴포넌트 테스트
 */
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarItem,
  NavbarSearch,
  NavbarActions,
  NavbarDropdown,
  NavbarDropdownItem,
  NavbarDropdownDivider,
} from './Navbar';

describe('Navbar', () => {
  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(
        <Navbar>
          <NavbarBrand>Brand</NavbarBrand>
        </Navbar>
      );
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('children이 렌더링됨', () => {
      render(
        <Navbar>
          <NavbarBrand>My App</NavbarBrand>
        </Navbar>
      );
      expect(screen.getByText('My App')).toBeInTheDocument();
    });

    it('햄버거 버튼이 렌더링됨', () => {
      render(
        <Navbar>
          <NavbarNav>
            <NavbarItem>Home</NavbarItem>
          </NavbarNav>
        </Navbar>
      );
      expect(screen.getByRole('button', { name: /toggle navigation/i })).toBeInTheDocument();
    });
  });

  describe('모바일 메뉴', () => {
    it('햄버거 버튼 클릭 시 모바일 메뉴가 열림', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Navbar>
          <NavbarNav>
            <NavbarItem>Home</NavbarItem>
          </NavbarNav>
        </Navbar>
      );

      const hamburger = screen.getByRole('button', { name: /toggle navigation/i });
      await user.click(hamburger);

      const nav = container.querySelector('.navbarNav');
      expect(nav).toHaveClass('mobileMenuOpen');
    });

    it('모바일 메뉴 열림 시 backdrop이 표시됨', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Navbar>
          <NavbarNav>
            <NavbarItem>Home</NavbarItem>
          </NavbarNav>
        </Navbar>
      );

      const hamburger = screen.getByRole('button', { name: /toggle navigation/i });
      await user.click(hamburger);

      expect(container.querySelector('.navbarBackdrop')).toBeInTheDocument();
    });

    it('backdrop 클릭 시 모바일 메뉴가 닫힘', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Navbar>
          <NavbarNav>
            <NavbarItem>Home</NavbarItem>
          </NavbarNav>
        </Navbar>
      );

      const hamburger = screen.getByRole('button', { name: /toggle navigation/i });
      await user.click(hamburger);

      const backdrop = container.querySelector('.navbarBackdrop');
      fireEvent.click(backdrop!);

      await waitFor(() => {
        expect(container.querySelector('.navbarBackdrop')).not.toBeInTheDocument();
      });
    });

    it('모바일 메뉴 열림 시 body overflow가 hidden', async () => {
      const user = userEvent.setup();
      render(
        <Navbar>
          <NavbarNav>
            <NavbarItem>Home</NavbarItem>
          </NavbarNav>
        </Navbar>
      );

      const hamburger = screen.getByRole('button', { name: /toggle navigation/i });
      await user.click(hamburger);

      expect(document.body.style.overflow).toBe('hidden');
    });
  });

  describe('className', () => {
    it('커스텀 className이 적용됨', () => {
      const { container } = render(
        <Navbar className="custom-navbar">
          <NavbarBrand>Brand</NavbarBrand>
        </Navbar>
      );
      expect(container.querySelector('.navbar')).toHaveClass('custom-navbar');
    });
  });
});

describe('NavbarBrand', () => {
  it('children이 렌더링됨', () => {
    render(<NavbarBrand>Brand Name</NavbarBrand>);
    expect(screen.getByText('Brand Name')).toBeInTheDocument();
  });

  it('logo가 렌더링됨', () => {
    render(
      <NavbarBrand logo={<span data-testid="logo">🏠</span>}>Brand</NavbarBrand>
    );
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('logo만 있어도 렌더링됨', () => {
    render(<NavbarBrand logo={<span data-testid="logo-only">Logo</span>} />);
    expect(screen.getByTestId('logo-only')).toBeInTheDocument();
  });

  it('커스텀 className이 적용됨', () => {
    const { container } = render(
      <NavbarBrand className="custom-brand">Brand</NavbarBrand>
    );
    expect(container.querySelector('.navbarBrand')).toHaveClass('custom-brand');
  });
});

describe('NavbarNav', () => {
  it('children이 렌더링됨', () => {
    render(
      <NavbarNav>
        <NavbarItem>Home</NavbarItem>
      </NavbarNav>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('커스텀 className이 적용됨', () => {
    const { container } = render(
      <NavbarNav className="custom-nav">
        <NavbarItem>Home</NavbarItem>
      </NavbarNav>
    );
    expect(container.querySelector('.navbarNav')).toHaveClass('custom-nav');
  });
});

describe('NavbarItem', () => {
  describe('렌더링', () => {
    it('children이 렌더링됨', () => {
      render(<NavbarItem>Home</NavbarItem>);
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('href가 있으면 링크로 렌더링됨', () => {
      render(<NavbarItem href="/home">Home</NavbarItem>);
      const link = screen.getByRole('link', { name: 'Home' });
      expect(link).toHaveAttribute('href', '/home');
    });

    it('href가 없으면 버튼으로 렌더링됨', () => {
      render(<NavbarItem>Action</NavbarItem>);
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });
  });

  describe('active', () => {
    it('active 상태에서 active 클래스가 적용됨', () => {
      render(<NavbarItem active>Active</NavbarItem>);
      expect(screen.getByRole('button')).toHaveClass('active');
    });

    it('active 상태에서 aria-current="page"가 있음', () => {
      render(<NavbarItem active>Active</NavbarItem>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-current', 'page');
    });

    it('active가 아닐 때 aria-current가 없음', () => {
      render(<NavbarItem>Not Active</NavbarItem>);
      expect(screen.getByRole('button')).not.toHaveAttribute('aria-current');
    });
  });

  describe('onClick', () => {
    it('클릭 시 onClick이 호출됨', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<NavbarItem onClick={handleClick}>Click Me</NavbarItem>);
      await user.click(screen.getByRole('button'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('링크 클릭 시에도 onClick이 호출됨', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<NavbarItem href="/test" onClick={handleClick}>Link</NavbarItem>);
      await user.click(screen.getByRole('link'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('className', () => {
    it('커스텀 className이 적용됨', () => {
      render(<NavbarItem className="custom-item">Item</NavbarItem>);
      expect(screen.getByRole('button')).toHaveClass('custom-item');
    });
  });
});

describe('NavbarSearch', () => {
  it('children이 렌더링됨', () => {
    render(
      <NavbarSearch>
        <input type="search" placeholder="Search" />
      </NavbarSearch>
    );
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('커스텀 className이 적용됨', () => {
    const { container } = render(
      <NavbarSearch className="custom-search">
        <input />
      </NavbarSearch>
    );
    expect(container.querySelector('.navbarSearch')).toHaveClass('custom-search');
  });
});

describe('NavbarActions', () => {
  it('children이 렌더링됨', () => {
    render(
      <NavbarActions>
        <button>Login</button>
      </NavbarActions>
    );
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('커스텀 className이 적용됨', () => {
    const { container } = render(
      <NavbarActions className="custom-actions">
        <button>Action</button>
      </NavbarActions>
    );
    expect(container.querySelector('.navbarActions')).toHaveClass('custom-actions');
  });
});

describe('NavbarDropdown', () => {
  it('trigger가 렌더링됨', () => {
    render(
      <NavbarDropdown trigger={<button>Menu</button>}>
        <NavbarDropdownItem>Item 1</NavbarDropdownItem>
      </NavbarDropdown>
    );
    expect(screen.getByRole('button', { name: 'Menu' })).toBeInTheDocument();
  });

  it('trigger 클릭 시 드롭다운이 열림', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <NavbarDropdown trigger={<button>Menu</button>}>
        <NavbarDropdownItem>Item 1</NavbarDropdownItem>
      </NavbarDropdown>
    );

    await user.click(screen.getByRole('button', { name: 'Menu' }));

    const dropdownMenu = container.querySelector('.navbarDropdownMenu');
    expect(dropdownMenu).toHaveClass('show');
  });

  it('외부 클릭 시 드롭다운이 닫힘', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <>
        <NavbarDropdown trigger={<button>Menu</button>}>
          <NavbarDropdownItem>Item 1</NavbarDropdownItem>
        </NavbarDropdown>
        <div data-testid="outside">Outside</div>
      </>
    );

    await user.click(screen.getByRole('button', { name: 'Menu' }));
    expect(container.querySelector('.navbarDropdownMenu')).toHaveClass('show');

    await user.click(screen.getByTestId('outside'));

    await waitFor(() => {
      expect(container.querySelector('.navbarDropdownMenu')).not.toHaveClass('show');
    });
  });

  it('align="right"가 적용됨', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <NavbarDropdown trigger={<button>Menu</button>} align="right">
        <NavbarDropdownItem>Item 1</NavbarDropdownItem>
      </NavbarDropdown>
    );

    await user.click(screen.getByRole('button', { name: 'Menu' }));

    const dropdownMenu = container.querySelector('.navbarDropdownMenu');
    expect(dropdownMenu).toHaveClass('navbarDropdownMenuRight');
  });

  it('커스텀 className이 적용됨', () => {
    const { container } = render(
      <NavbarDropdown trigger={<button>Menu</button>} className="custom-dropdown">
        <NavbarDropdownItem>Item</NavbarDropdownItem>
      </NavbarDropdown>
    );
    expect(container.querySelector('.navbarDropdown')).toHaveClass('custom-dropdown');
  });
});

describe('NavbarDropdownItem', () => {
  it('children이 렌더링됨', () => {
    render(<NavbarDropdownItem>Dropdown Item</NavbarDropdownItem>);
    expect(screen.getByText('Dropdown Item')).toBeInTheDocument();
  });

  it('href가 있으면 링크로 렌더링됨', () => {
    render(<NavbarDropdownItem href="/profile">Profile</NavbarDropdownItem>);
    const link = screen.getByRole('link', { name: 'Profile' });
    expect(link).toHaveAttribute('href', '/profile');
  });

  it('href가 없으면 버튼으로 렌더링됨', () => {
    render(<NavbarDropdownItem>Action</NavbarDropdownItem>);
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('onClick이 호출됨', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<NavbarDropdownItem onClick={handleClick}>Click</NavbarDropdownItem>);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('커스텀 className이 적용됨', () => {
    render(<NavbarDropdownItem className="custom-item">Item</NavbarDropdownItem>);
    expect(screen.getByRole('button')).toHaveClass('custom-item');
  });
});

describe('NavbarDropdownDivider', () => {
  it('렌더링됨', () => {
    const { container } = render(<NavbarDropdownDivider />);
    expect(container.querySelector('.navbarDropdownDivider')).toBeInTheDocument();
  });
});

describe('접근성', () => {
  it('Navbar - a11y 위반 사항이 없음', async () => {
    const { container } = render(
      <Navbar>
        <NavbarBrand>Brand</NavbarBrand>
        <NavbarNav>
          <NavbarItem href="/" active>Home</NavbarItem>
          <NavbarItem href="/about">About</NavbarItem>
        </NavbarNav>
      </Navbar>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('NavbarItem (active) - aria-current="page"가 있음', () => {
    render(<NavbarItem href="/" active>Home</NavbarItem>);
    expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page');
  });
});

describe('통합 테스트', () => {
  it('전체 Navbar 구조가 렌더링됨', () => {
    render(
      <Navbar>
        <NavbarBrand logo={<span>🏠</span>}>My App</NavbarBrand>
        <NavbarNav>
          <NavbarItem href="/" active>Home</NavbarItem>
          <NavbarItem href="/products">Products</NavbarItem>
          <NavbarDropdown trigger={<NavbarItem>More</NavbarItem>}>
            <NavbarDropdownItem href="/about">About</NavbarDropdownItem>
            <NavbarDropdownDivider />
            <NavbarDropdownItem href="/contact">Contact</NavbarDropdownItem>
          </NavbarDropdown>
        </NavbarNav>
        <NavbarSearch>
          <input placeholder="Search..." />
        </NavbarSearch>
        <NavbarActions>
          <button>Login</button>
        </NavbarActions>
      </Navbar>
    );

    expect(screen.getByText('My App')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('More')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
