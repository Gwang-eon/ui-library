/**
 * Badge 컴포넌트 테스트
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Badge } from './Badge';

describe('Badge', () => {
  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(<Badge>뱃지</Badge>);
      expect(screen.getByText('뱃지')).toBeInTheDocument();
    });

    it('children이 정상 렌더링됨', () => {
      render(<Badge>New</Badge>);
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('숫자 children이 정상 렌더링됨', () => {
      render(<Badge>42</Badge>);
      expect(screen.getByText('42')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    const variants = ['default', 'primary', 'success', 'warning', 'error'] as const;

    variants.forEach((variant) => {
      it(`${variant} variant가 정상 렌더링됨`, () => {
        render(<Badge variant={variant}>뱃지</Badge>);
        expect(screen.getByText('뱃지')).toBeInTheDocument();
      });
    });

    it('기본 variant는 default임', () => {
      const { container } = render(<Badge>뱃지</Badge>);
      expect(container.firstChild).toHaveClass('badge-default');
    });

    it('variant 클래스가 적용됨', () => {
      const { container } = render(<Badge variant="primary">뱃지</Badge>);
      expect(container.firstChild).toHaveClass('badge-primary');
    });
  });

  describe('sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`${size} size가 정상 렌더링됨`, () => {
        render(<Badge size={size}>뱃지</Badge>);
        expect(screen.getByText('뱃지')).toBeInTheDocument();
      });
    });

    it('sm size 클래스가 적용됨', () => {
      const { container } = render(<Badge size="sm">뱃지</Badge>);
      expect(container.firstChild).toHaveClass('badge-sm');
    });

    it('lg size 클래스가 적용됨', () => {
      const { container } = render(<Badge size="lg">뱃지</Badge>);
      expect(container.firstChild).toHaveClass('badge-lg');
    });

    it('md size는 추가 클래스가 없음 (기본값)', () => {
      const { container } = render(<Badge size="md">뱃지</Badge>);
      expect(container.firstChild).not.toHaveClass('badge-md');
    });
  });

  describe('className', () => {
    it('추가 className이 적용됨', () => {
      const { container } = render(<Badge className="custom-badge">뱃지</Badge>);
      expect(container.firstChild).toHaveClass('custom-badge');
    });
  });

  describe('style', () => {
    it('인라인 스타일이 적용됨', () => {
      const { container } = render(<Badge style={{ marginLeft: '8px' }}>뱃지</Badge>);
      expect(container.firstChild).toHaveStyle({ marginLeft: '8px' });
    });
  });

  describe('접근성', () => {
    it('a11y 위반 사항이 없음', async () => {
      const { container } = render(<Badge variant="success">완료</Badge>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('span 요소로 렌더링됨', () => {
      render(<Badge>뱃지</Badge>);
      const badge = screen.getByText('뱃지');
      expect(badge.tagName).toBe('SPAN');
    });
  });
});
