/**
 * Pagination 컴포넌트 테스트
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Pagination, PaginationInfo, SimplePagination, PaginationButton } from './Pagination';

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    onPageChange: vi.fn(),
  };

  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(<Pagination {...defaultProps} />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('페이지 버튼들이 렌더링됨', () => {
      render(<Pagination {...defaultProps} />);
      // 여러 페이지 버튼이 있으므로 getAllByRole 사용
      const pageButtons = screen.getAllByRole('button');
      expect(pageButtons.length).toBeGreaterThan(2); // 이전, 다음 + 페이지 번호들
    });

    it('현재 페이지가 활성화됨', () => {
      render(<Pagination {...defaultProps} currentPage={3} />);
      expect(screen.getByRole('button', { name: /go to page 3/i })).toHaveAttribute('aria-current', 'page');
    });
  });

  describe('네비게이션', () => {
    it('이전 버튼 클릭 시 onPageChange 호출', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Pagination {...defaultProps} currentPage={5} onPageChange={handleChange} />);

      await user.click(screen.getByRole('button', { name: /previous/i }));
      expect(handleChange).toHaveBeenCalledWith(4);
    });

    it('다음 버튼 클릭 시 onPageChange 호출', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Pagination {...defaultProps} currentPage={5} onPageChange={handleChange} />);

      await user.click(screen.getByRole('button', { name: /next/i }));
      expect(handleChange).toHaveBeenCalledWith(6);
    });

    it('페이지 번호 클릭 시 onPageChange 호출', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Pagination {...defaultProps} onPageChange={handleChange} />);

      // 페이지 2 클릭 (1페이지와 10페이지는 항상 표시됨)
      await user.click(screen.getByRole('button', { name: /go to page 2/i }));
      expect(handleChange).toHaveBeenCalledWith(2);
    });

    it('첫 페이지에서 이전 버튼 비활성화', () => {
      render(<Pagination {...defaultProps} currentPage={1} />);
      expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
    });

    it('마지막 페이지에서 다음 버튼 비활성화', () => {
      render(<Pagination {...defaultProps} currentPage={10} />);
      expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    });
  });

  describe('showFirstLast', () => {
    it('showFirstLast=true면 처음/마지막 버튼 표시', () => {
      render(<Pagination {...defaultProps} showFirstLast />);
      expect(screen.getByRole('button', { name: /first/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /last/i })).toBeInTheDocument();
    });

    it('처음 버튼 클릭 시 1페이지로 이동', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Pagination {...defaultProps} currentPage={5} showFirstLast onPageChange={handleChange} />);

      await user.click(screen.getByRole('button', { name: /first/i }));
      expect(handleChange).toHaveBeenCalledWith(1);
    });

    it('마지막 버튼 클릭 시 마지막 페이지로 이동', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Pagination {...defaultProps} currentPage={5} showFirstLast onPageChange={handleChange} />);

      await user.click(screen.getByRole('button', { name: /last/i }));
      expect(handleChange).toHaveBeenCalledWith(10);
    });
  });

  describe('showPrevNext', () => {
    it('showPrevNext=false면 이전/다음 버튼 숨김', () => {
      render(<Pagination {...defaultProps} showPrevNext={false} />);
      expect(screen.queryByRole('button', { name: /previous/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument();
    });
  });

  describe('ellipsis', () => {
    it('페이지가 많을 때 ellipsis 표시', () => {
      render(<Pagination {...defaultProps} currentPage={5} totalPages={20} />);
      expect(screen.getAllByText('...')).toHaveLength(2);
    });
  });

  describe('className', () => {
    it('추가 className이 적용됨', () => {
      render(<Pagination {...defaultProps} className="custom-pagination" />);
      expect(screen.getByRole('navigation')).toHaveClass('custom-pagination');
    });
  });

  describe('접근성', () => {
    it('a11y 위반 사항이 없음', async () => {
      const { container } = render(<Pagination {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('role=navigation이 있음', () => {
      render(<Pagination {...defaultProps} />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('aria-label이 있음', () => {
      render(<Pagination {...defaultProps} aria-label="검색 결과 페이지네이션" />);
      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', '검색 결과 페이지네이션');
    });

    it('현재 페이지에 aria-current=page가 있음', () => {
      render(<Pagination {...defaultProps} currentPage={3} />);
      expect(screen.getByRole('button', { name: /go to page 3/i })).toHaveAttribute('aria-current', 'page');
    });
  });
});

describe('PaginationButton', () => {
  it('기본 렌더링이 정상적으로 됨', () => {
    render(<PaginationButton>1</PaginationButton>);
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
  });

  it('active 상태가 적용됨', () => {
    render(<PaginationButton active>1</PaginationButton>);
    expect(screen.getByRole('button', { name: '1' })).toHaveClass('active');
  });

  it('className이 적용됨', () => {
    render(<PaginationButton className="custom-btn">1</PaginationButton>);
    expect(screen.getByRole('button', { name: '1' })).toHaveClass('custom-btn');
  });
});

describe('PaginationInfo', () => {
  it('페이지 정보가 표시됨', () => {
    render(<PaginationInfo currentPage={3} totalPages={10} />);
    expect(screen.getByText(/page 3 of 10/i)).toBeInTheDocument();
  });

  it('아이템 범위 정보가 표시됨', () => {
    render(<PaginationInfo currentPage={2} totalPages={10} totalItems={100} pageSize={10} />);
    expect(screen.getByText('11-20')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('className이 적용됨', () => {
    render(<PaginationInfo currentPage={1} totalPages={10} className="custom-info" />);
    expect(screen.getByText(/page 1 of 10/i)).toHaveClass('custom-info');
  });
});

describe('SimplePagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    onPageChange: vi.fn(),
  };

  it('기본 렌더링이 정상적으로 됨', () => {
    render(<SimplePagination {...defaultProps} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('이전/다음 버튼이 표시됨', () => {
    render(<SimplePagination {...defaultProps} currentPage={5} />);
    expect(screen.getByText(/previous/i)).toBeInTheDocument();
    expect(screen.getByText(/next/i)).toBeInTheDocument();
  });

  it('페이지 정보가 표시됨', () => {
    render(<SimplePagination {...defaultProps} currentPage={3} />);
    expect(screen.getByText(/page 3 of 10/i)).toBeInTheDocument();
  });

  it('showInfo=false면 페이지 정보 숨김', () => {
    render(<SimplePagination {...defaultProps} showInfo={false} />);
    expect(screen.queryByText(/page/i)).not.toBeInTheDocument();
  });

  it('이전 버튼 클릭 시 onPageChange 호출', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<SimplePagination {...defaultProps} currentPage={5} onPageChange={handleChange} />);

    await user.click(screen.getByRole('button', { name: /previous/i }));
    expect(handleChange).toHaveBeenCalledWith(4);
  });

  it('다음 버튼 클릭 시 onPageChange 호출', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<SimplePagination {...defaultProps} currentPage={5} onPageChange={handleChange} />);

    await user.click(screen.getByRole('button', { name: /next/i }));
    expect(handleChange).toHaveBeenCalledWith(6);
  });

  it('커스텀 라벨이 적용됨', () => {
    render(
      <SimplePagination
        {...defaultProps}
        prevLabel="이전"
        nextLabel="다음"
      />
    );
    expect(screen.getByText('이전')).toBeInTheDocument();
    expect(screen.getByText('다음')).toBeInTheDocument();
  });

  it('a11y 위반 사항이 없음', async () => {
    const { container } = render(<SimplePagination {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
