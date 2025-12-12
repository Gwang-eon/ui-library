/**
 * Tag 컴포넌트 테스트
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Tag, TagGroup } from './Tag';

describe('Tag', () => {
  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(<Tag>태그</Tag>);
      expect(screen.getByText('태그')).toBeInTheDocument();
    });

    it('children이 정상 렌더링됨', () => {
      render(<Tag>카테고리</Tag>);
      expect(screen.getByText('카테고리')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    const variants = ['default', 'primary', 'success', 'warning', 'error', 'code'] as const;

    variants.forEach((variant) => {
      it(`${variant} variant가 정상 렌더링됨`, () => {
        render(<Tag variant={variant}>태그</Tag>);
        expect(screen.getByText('태그')).toBeInTheDocument();
      });
    });
  });

  describe('sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`${size} size가 정상 렌더링됨`, () => {
        render(<Tag size={size}>태그</Tag>);
        expect(screen.getByText('태그')).toBeInTheDocument();
      });
    });
  });

  describe('removable', () => {
    it('removable이면 삭제 버튼이 표시됨', () => {
      render(<Tag removable>태그</Tag>);
      expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument();
    });

    it('삭제 버튼 클릭 시 onRemove 호출', async () => {
      const user = userEvent.setup();
      const handleRemove = vi.fn();
      render(<Tag removable onRemove={handleRemove}>태그</Tag>);

      await user.click(screen.getByRole('button', { name: /remove/i }));
      expect(handleRemove).toHaveBeenCalledTimes(1);
    });

    it('삭제 버튼 클릭 시 이벤트 전파 중단', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const handleRemove = vi.fn();
      render(
        <div onClick={handleClick}>
          <Tag removable onRemove={handleRemove}>태그</Tag>
        </div>
      );

      await user.click(screen.getByRole('button', { name: /remove/i }));
      expect(handleRemove).toHaveBeenCalledTimes(1);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('removable=false면 삭제 버튼이 없음', () => {
      render(<Tag removable={false}>태그</Tag>);
      expect(screen.queryByRole('button', { name: /remove/i })).not.toBeInTheDocument();
    });
  });

  describe('clickable', () => {
    it('clickable이면 버튼으로 렌더링됨', () => {
      render(<Tag clickable onClick={() => {}}>태그</Tag>);
      expect(screen.getByRole('button', { name: '태그' })).toBeInTheDocument();
    });

    it('클릭 시 onClick 호출', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Tag clickable onClick={handleClick}>태그</Tag>);

      await user.click(screen.getByRole('button', { name: '태그' }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('clickable=false면 span으로 렌더링됨', () => {
      render(<Tag>태그</Tag>);
      const tag = screen.getByText('태그');
      expect(tag.tagName).toBe('SPAN');
    });
  });

  describe('icon', () => {
    it('icon이 렌더링됨', () => {
      render(<Tag icon={<span data-testid="tag-icon">★</span>}>태그</Tag>);
      expect(screen.getByTestId('tag-icon')).toBeInTheDocument();
    });
  });

  describe('className', () => {
    it('추가 className이 적용됨', () => {
      render(<Tag className="custom-tag">태그</Tag>);
      expect(screen.getByText('태그')).toHaveClass('custom-tag');
    });
  });

  describe('접근성', () => {
    it('a11y 위반 사항이 없음', async () => {
      const { container } = render(<Tag variant="primary">태그</Tag>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('removable 태그에 적절한 aria-label이 있음', () => {
      render(<Tag removable>카테고리</Tag>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Remove 카테고리 tag');
    });
  });
});

describe('TagGroup', () => {
  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(
        <TagGroup>
          <Tag>태그 1</Tag>
          <Tag>태그 2</Tag>
        </TagGroup>
      );
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });

    it('children 태그들이 렌더링됨', () => {
      render(
        <TagGroup>
          <Tag>A</Tag>
          <Tag>B</Tag>
          <Tag>C</Tag>
        </TagGroup>
      );
      expect(screen.getByText('A')).toBeInTheDocument();
      expect(screen.getByText('B')).toBeInTheDocument();
      expect(screen.getByText('C')).toBeInTheDocument();
    });
  });

  describe('className', () => {
    it('추가 className이 적용됨', () => {
      render(
        <TagGroup className="custom-group">
          <Tag>태그</Tag>
        </TagGroup>
      );
      expect(screen.getByRole('list')).toHaveClass('custom-group');
    });
  });

  describe('ariaLabel', () => {
    it('aria-label이 적용됨', () => {
      render(
        <TagGroup ariaLabel="필터 태그">
          <Tag>태그</Tag>
        </TagGroup>
      );
      expect(screen.getByRole('list')).toHaveAttribute('aria-label', '필터 태그');
    });
  });

  describe('접근성', () => {
    it('a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <TagGroup ariaLabel="카테고리 태그">
          <Tag variant="primary">온도</Tag>
          <Tag variant="success">습도</Tag>
        </TagGroup>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('role=list가 있음', () => {
      render(
        <TagGroup>
          <Tag>태그</Tag>
        </TagGroup>
      );
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('각 태그가 listitem으로 감싸짐', () => {
      render(
        <TagGroup>
          <Tag>태그 1</Tag>
          <Tag>태그 2</Tag>
        </TagGroup>
      );
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });
  });
});
