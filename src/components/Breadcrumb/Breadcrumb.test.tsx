/**
 * Breadcrumb 컴포넌트 테스트
 */
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from './Breadcrumb';

describe('Breadcrumb', () => {
  describe('items 배열 방식', () => {
    it('items가 렌더링됨', () => {
      const items = [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Detail' },
      ];
      render(<Breadcrumb items={items} />);

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('Detail')).toBeInTheDocument();
    });

    it('마지막 아이템은 링크가 아님', () => {
      const items = [
        { label: 'Home', href: '/' },
        { label: 'Detail' },
      ];
      render(<Breadcrumb items={items} />);

      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'Detail' })).not.toBeInTheDocument();
    });

    it('마지막 아이템에 aria-current="page"가 있음', () => {
      const items = [
        { label: 'Home', href: '/' },
        { label: 'Current Page' },
      ];
      render(<Breadcrumb items={items} />);

      expect(screen.getByText('Current Page')).toHaveAttribute('aria-current', 'page');
    });

    it('기본 separator가 /임', () => {
      const items = [
        { label: 'Home', href: '/' },
        { label: 'Detail' },
      ];
      const { container } = render(<Breadcrumb items={items} />);

      const separators = container.querySelectorAll('.breadcrumb-separator');
      expect(separators).toHaveLength(1);
      expect(separators[0]).toHaveTextContent('/');
    });

    it('커스텀 separator가 적용됨', () => {
      const items = [
        { label: 'Home', href: '/' },
        { label: 'Detail' },
      ];
      render(<Breadcrumb items={items} separator=">" />);

      expect(screen.getByText('>')).toBeInTheDocument();
    });

    it('icon이 렌더링됨', () => {
      const items = [
        { label: 'Home', href: '/', icon: <span data-testid="home-icon">🏠</span> },
        { label: 'Detail' },
      ];
      render(<Breadcrumb items={items} />);

      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });

    it('href가 없는 중간 아이템은 링크가 아님', () => {
      const items = [
        { label: 'Home', href: '/' },
        { label: 'Category' }, // href 없음
        { label: 'Detail' },
      ];
      render(<Breadcrumb items={items} />);

      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'Category' })).not.toBeInTheDocument();
    });
  });

  describe('children (compound) 방식', () => {
    it('children이 렌더링됨', () => {
      render(
        <Breadcrumb>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem current>Current</BreadcrumbItem>
        </Breadcrumb>
      );

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Current')).toBeInTheDocument();
    });

    it('items가 비어있거나 없으면 children을 렌더링', () => {
      render(
        <Breadcrumb items={[]}>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
        </Breadcrumb>
      );

      expect(screen.getByText('Home')).toBeInTheDocument();
    });
  });

  describe('aria-label', () => {
    it('기본 aria-label이 적용됨', () => {
      render(
        <Breadcrumb items={[{ label: 'Home' }]} />
      );
      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Breadcrumb');
    });

    it('커스텀 aria-label이 적용됨', () => {
      render(
        <Breadcrumb items={[{ label: 'Home' }]} aria-label="페이지 경로" />
      );
      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', '페이지 경로');
    });
  });

  describe('className', () => {
    it('커스텀 className이 적용됨', () => {
      const { container } = render(
        <Breadcrumb items={[{ label: 'Home' }]} className="custom-breadcrumb" />
      );
      expect(container.querySelector('.breadcrumb')).toHaveClass('custom-breadcrumb');
    });
  });
});

describe('BreadcrumbItem', () => {
  describe('렌더링', () => {
    it('children이 렌더링됨', () => {
      render(<BreadcrumbItem>Home</BreadcrumbItem>);
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('href가 있으면 링크로 렌더링됨', () => {
      render(<BreadcrumbItem href="/home">Home</BreadcrumbItem>);
      const link = screen.getByRole('link', { name: 'Home' });
      expect(link).toHaveAttribute('href', '/home');
    });

    it('href가 없으면 span으로 렌더링됨', () => {
      render(<BreadcrumbItem>Home</BreadcrumbItem>);
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
      expect(screen.getByText('Home').tagName).toBe('SPAN');
    });
  });

  describe('current', () => {
    it('current가 true면 링크 대신 span으로 렌더링됨', () => {
      render(<BreadcrumbItem href="/home" current>Home</BreadcrumbItem>);
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('current가 true면 aria-current="page"가 있음', () => {
      render(<BreadcrumbItem current>Current Page</BreadcrumbItem>);
      expect(screen.getByText('Current Page')).toHaveAttribute('aria-current', 'page');
    });

    it('current가 false면 aria-current가 없음', () => {
      render(<BreadcrumbItem>Not Current</BreadcrumbItem>);
      expect(screen.getByText('Not Current')).not.toHaveAttribute('aria-current');
    });
  });

  describe('icon', () => {
    it('icon이 렌더링됨', () => {
      render(
        <BreadcrumbItem icon={<span data-testid="icon">📁</span>}>
          Folder
        </BreadcrumbItem>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });

  describe('className', () => {
    it('커스텀 className이 적용됨', () => {
      const { container } = render(
        <BreadcrumbItem className="custom-item">Item</BreadcrumbItem>
      );
      expect(container.querySelector('.breadcrumb-item')).toHaveClass('custom-item');
    });
  });

  describe('추가 props', () => {
    it('anchor props가 전달됨', () => {
      render(
        <BreadcrumbItem href="/test" target="_blank" rel="noopener">
          External
        </BreadcrumbItem>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener');
    });
  });
});

describe('BreadcrumbSeparator', () => {
  describe('렌더링', () => {
    it('기본값 /가 렌더링됨', () => {
      render(<BreadcrumbSeparator />);
      expect(screen.getByText('/')).toBeInTheDocument();
    });

    it('커스텀 separator가 렌더링됨', () => {
      render(<BreadcrumbSeparator>{'>'}</BreadcrumbSeparator>);
      expect(screen.getByText('>')).toBeInTheDocument();
    });

    it('ReactNode separator가 렌더링됨', () => {
      render(
        <BreadcrumbSeparator>
          <span data-testid="arrow">→</span>
        </BreadcrumbSeparator>
      );
      expect(screen.getByTestId('arrow')).toBeInTheDocument();
    });
  });

  describe('className', () => {
    it('커스텀 className이 적용됨', () => {
      const { container } = render(
        <BreadcrumbSeparator className="custom-separator">/</BreadcrumbSeparator>
      );
      expect(container.querySelector('.breadcrumb-separator')).toHaveClass('custom-separator');
    });
  });
});

describe('접근성', () => {
  it('Breadcrumb (items) - a11y 위반 사항이 없음', async () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Current' },
    ];
    const { container } = render(<Breadcrumb items={items} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Breadcrumb (children) - a11y 위반 사항이 없음', async () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem current>Current</BreadcrumbItem>
      </Breadcrumb>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('nav 요소로 렌더링됨', () => {
    render(<Breadcrumb items={[{ label: 'Home' }]} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});

describe('통합 테스트', () => {
  it('복잡한 Breadcrumb 구조가 렌더링됨', () => {
    const items = [
      { label: 'Home', href: '/', icon: <span>🏠</span> },
      { label: 'Category', href: '/category' },
      { label: 'Subcategory', href: '/category/sub' },
      { label: 'Product Detail' },
    ];

    render(<Breadcrumb items={items} separator="›" />);

    // 모든 아이템 확인
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Subcategory')).toBeInTheDocument();
    expect(screen.getByText('Product Detail')).toBeInTheDocument();

    // 링크 확인 (마지막 제외)
    expect(screen.getAllByRole('link')).toHaveLength(3);

    // separator 확인
    expect(screen.getAllByText('›')).toHaveLength(3);
  });

  it('compound 패턴으로 복잡한 구조 렌더링', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/" icon={<span>🏠</span>}>Home</BreadcrumbItem>
        <BreadcrumbSeparator>{'>'}</BreadcrumbSeparator>
        <BreadcrumbItem href="/docs">Documentation</BreadcrumbItem>
        <BreadcrumbSeparator>{'>'}</BreadcrumbSeparator>
        <BreadcrumbItem current>Getting Started</BreadcrumbItem>
      </Breadcrumb>
    );

    expect(screen.getAllByRole('link')).toHaveLength(2);
    expect(screen.getByText('Getting Started')).toHaveAttribute('aria-current', 'page');
  });
});
