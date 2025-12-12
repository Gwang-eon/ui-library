/**
 * Card 컴포넌트 테스트
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Card } from './Card';

describe('Card', () => {
  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(<Card>카드 내용</Card>);
      expect(screen.getByText('카드 내용')).toBeInTheDocument();
    });

    it('children이 정상 렌더링됨', () => {
      render(
        <Card>
          <p>내용 1</p>
          <p>내용 2</p>
        </Card>
      );
      expect(screen.getByText('내용 1')).toBeInTheDocument();
      expect(screen.getByText('내용 2')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    const variants = ['default', 'elevated', 'outlined'] as const;

    variants.forEach((variant) => {
      it(`${variant} variant가 정상 렌더링됨`, () => {
        render(<Card variant={variant}>카드</Card>);
        expect(screen.getByText('카드')).toBeInTheDocument();
      });
    });
  });

  describe('인터랙션', () => {
    it('hoverable 카드 클릭 시 onClick 호출', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Card hoverable onClick={handleClick}>카드</Card>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('selectable 카드 클릭 시 onClick 호출', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Card selectable onClick={handleClick}>카드</Card>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('일반 카드는 클릭해도 onClick 미호출', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Card onClick={handleClick}>카드</Card>);

      await user.click(screen.getByText('카드'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('Enter 키로 selectable 카드 활성화', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Card selectable onClick={handleClick}>카드</Card>);

      const card = screen.getByRole('button');
      card.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('Space 키로 selectable 카드 활성화', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Card selectable onClick={handleClick}>카드</Card>);

      const card = screen.getByRole('button');
      card.focus();
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('selected 상태', () => {
    it('selected 상태가 적용됨', () => {
      const { container } = render(<Card selectable selected>카드</Card>);
      expect(container.firstChild).toHaveClass('cardSelected');
    });

    it('aria-pressed가 true임', () => {
      render(<Card selectable selected onClick={() => {}}>카드</Card>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('className', () => {
    it('추가 className이 적용됨', () => {
      const { container } = render(<Card className="custom-card">카드</Card>);
      expect(container.firstChild).toHaveClass('custom-card');
    });
  });

  describe('접근성', () => {
    it('a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Card>
          <Card.Header>
            <Card.Title>제목</Card.Title>
          </Card.Header>
          <Card.Content>내용</Card.Content>
        </Card>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('selectable 카드에 role=button이 있음', () => {
      render(<Card selectable onClick={() => {}}>카드</Card>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('hoverable 카드에 tabIndex가 있음', () => {
      render(<Card hoverable onClick={() => {}}>카드</Card>);
      expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0');
    });
  });
});

describe('Card.Header', () => {
  it('렌더링됨', () => {
    render(
      <Card>
        <Card.Header>헤더 내용</Card.Header>
      </Card>
    );
    expect(screen.getByText('헤더 내용')).toBeInTheDocument();
  });

  it('className이 적용됨', () => {
    render(
      <Card>
        <Card.Header className="custom-header">헤더</Card.Header>
      </Card>
    );
    // Card.Header는 직접 children을 포함하는 div
    expect(screen.getByText('헤더').closest('.cardHeader')).toHaveClass('custom-header');
  });
});

describe('Card.Title', () => {
  it('렌더링됨', () => {
    render(
      <Card>
        <Card.Title>제목</Card.Title>
      </Card>
    );
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('제목');
  });

  it('className이 적용됨', () => {
    render(
      <Card>
        <Card.Title className="custom-title">제목</Card.Title>
      </Card>
    );
    expect(screen.getByRole('heading')).toHaveClass('custom-title');
  });
});

describe('Card.Media', () => {
  it('이미지가 렌더링됨', () => {
    render(
      <Card>
        <Card.Media image="/test.jpg" alt="테스트 이미지" />
      </Card>
    );
    expect(screen.getByAltText('테스트 이미지')).toBeInTheDocument();
  });

  it('children이 렌더링됨', () => {
    render(
      <Card>
        <Card.Media>
          <div data-testid="custom-media">커스텀 미디어</div>
        </Card.Media>
      </Card>
    );
    expect(screen.getByTestId('custom-media')).toBeInTheDocument();
  });

  it('height 스타일이 적용됨', () => {
    render(
      <Card>
        <Card.Media height={200}>미디어</Card.Media>
      </Card>
    );
    // Card.Media에 직접 style이 적용됨
    expect(screen.getByText('미디어').closest('.cardMedia')).toHaveStyle({ height: '200px' });
  });
});

describe('Card.Content', () => {
  it('렌더링됨', () => {
    render(
      <Card>
        <Card.Content>콘텐츠 내용</Card.Content>
      </Card>
    );
    expect(screen.getByText('콘텐츠 내용')).toBeInTheDocument();
  });

  it('className이 적용됨', () => {
    render(
      <Card>
        <Card.Content className="custom-content">내용</Card.Content>
      </Card>
    );
    expect(screen.getByText('내용').closest('.cardContent')).toHaveClass('custom-content');
  });
});

describe('Card.Footer', () => {
  it('렌더링됨', () => {
    render(
      <Card>
        <Card.Footer>
          <button>액션</button>
        </Card.Footer>
      </Card>
    );
    expect(screen.getByText('액션')).toBeInTheDocument();
  });

  it('className이 적용됨', () => {
    render(
      <Card>
        <Card.Footer className="custom-footer">푸터</Card.Footer>
      </Card>
    );
    expect(screen.getByText('푸터').closest('.cardFooter')).toHaveClass('custom-footer');
  });
});

describe('Card 통합 테스트', () => {
  it('전체 구조가 정상 동작함', () => {
    render(
      <Card variant="elevated" hoverable>
        <Card.Header>
          <Card.Title>카드 제목</Card.Title>
        </Card.Header>
        <Card.Media image="/image.jpg" alt="이미지" height="160px" />
        <Card.Content>
          <p>카드 내용입니다.</p>
        </Card.Content>
        <Card.Footer>
          <button>더 보기</button>
        </Card.Footer>
      </Card>
    );

    expect(screen.getByRole('heading')).toHaveTextContent('카드 제목');
    expect(screen.getByAltText('이미지')).toBeInTheDocument();
    expect(screen.getByText('카드 내용입니다.')).toBeInTheDocument();
    expect(screen.getByText('더 보기')).toBeInTheDocument();
  });
});
