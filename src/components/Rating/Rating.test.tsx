/**
 * Rating 컴포넌트 테스트
 */
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Rating } from './Rating';

describe('Rating', () => {
  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(<Rating />);
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    it('기본 5개의 별이 렌더링됨', () => {
      render(<Rating />);
      const stars = screen.getAllByRole('radio');
      expect(stars).toHaveLength(5);
    });

    it('count prop에 따라 별 개수가 변경됨', () => {
      render(<Rating count={10} />);
      const stars = screen.getAllByRole('radio');
      expect(stars).toHaveLength(10);
    });

    it('label이 렌더링됨', () => {
      render(<Rating label="평점" />);
      expect(screen.getByText('평점')).toBeInTheDocument();
    });

    it('description이 렌더링됨', () => {
      render(<Rating description="이 제품을 평가해주세요" />);
      expect(screen.getByText('이 제품을 평가해주세요')).toBeInTheDocument();
    });
  });

  describe('value와 defaultValue', () => {
    it('defaultValue가 적용됨', () => {
      render(<Rating defaultValue={3} />);
      const stars = screen.getAllByRole('radio');
      // 처음 3개 별이 체크됨
      expect(stars[0]).toHaveAttribute('aria-checked', 'true');
      expect(stars[1]).toHaveAttribute('aria-checked', 'true');
      expect(stars[2]).toHaveAttribute('aria-checked', 'true');
      expect(stars[3]).toHaveAttribute('aria-checked', 'false');
    });

    it('controlled 모드에서 value가 적용됨', () => {
      const ControlledRating = () => {
        const [value, setValue] = React.useState(2);
        return <Rating value={value} onChange={setValue} />;
      };

      render(<ControlledRating />);
      const stars = screen.getAllByRole('radio');
      expect(stars[0]).toHaveAttribute('aria-checked', 'true');
      expect(stars[1]).toHaveAttribute('aria-checked', 'true');
      expect(stars[2]).toHaveAttribute('aria-checked', 'false');
    });

    it('value가 0일 때 모든 별이 비어있음', () => {
      render(<Rating value={0} />);
      const stars = screen.getAllByRole('radio');
      stars.forEach((star) => {
        expect(star).toHaveAttribute('aria-checked', 'false');
      });
    });
  });

  describe('sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`${size} size가 정상 렌더링됨`, () => {
        render(<Rating size={size} />);
        expect(screen.getByRole('radiogroup')).toBeInTheDocument();
      });
    });
  });

  describe('icon variants', () => {
    it('star 아이콘이 기본으로 렌더링됨', () => {
      render(<Rating icon="star" />);
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    it('heart 아이콘이 렌더링됨', () => {
      render(<Rating icon="heart" />);
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    it('circle 아이콘이 렌더링됨', () => {
      render(<Rating icon="circle" />);
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    it('커스텀 ReactNode 아이콘이 렌더링됨', () => {
      render(<Rating icon={<span data-testid="custom-icon">★</span>} />);
      const icons = screen.getAllByTestId('custom-icon');
      expect(icons).toHaveLength(5);
    });
  });

  describe('showValue와 reviewCount', () => {
    it('showValue가 true일 때 현재 값이 표시됨', () => {
      render(<Rating defaultValue={4} showValue />);
      expect(screen.getByText('4 / 5')).toBeInTheDocument();
    });

    it('reviewCount가 표시됨', () => {
      render(<Rating reviewCount={128} />);
      expect(screen.getByText('(128 reviews)')).toBeInTheDocument();
    });

    it('showValue와 reviewCount가 함께 표시됨', () => {
      render(<Rating defaultValue={4.5} showValue reviewCount={256} />);
      expect(screen.getByText('4.5 / 5')).toBeInTheDocument();
      expect(screen.getByText('(256 reviews)')).toBeInTheDocument();
    });
  });

  describe('인터랙션', () => {
    it('별 클릭 시 onChange가 호출됨', async () => {
      const handleChange = vi.fn();
      render(<Rating onChange={handleChange} />);

      const stars = screen.getAllByRole('radio');
      await userEvent.click(stars[3]);

      expect(handleChange).toHaveBeenCalledWith(4);
    });

    it('uncontrolled 모드에서 클릭 시 값이 변경됨', async () => {
      render(<Rating defaultValue={2} />);

      const stars = screen.getAllByRole('radio');
      await userEvent.click(stars[4]);

      // 5개 별이 모두 체크됨
      expect(stars[4]).toHaveAttribute('aria-checked', 'true');
    });

    it('controlled 모드에서 클릭 시 onChange가 호출됨', async () => {
      const handleChange = vi.fn();
      render(<Rating value={3} onChange={handleChange} />);

      const stars = screen.getAllByRole('radio');
      await userEvent.click(stars[1]);

      expect(handleChange).toHaveBeenCalledWith(2);
    });
  });

  describe('readOnly 모드', () => {
    it('readOnly 상태에서 role이 img로 변경됨', () => {
      render(<Rating readOnly defaultValue={4} />);
      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument();
    });

    it('readOnly 상태에서 클릭해도 onChange가 호출되지 않음', async () => {
      const handleChange = vi.fn();
      render(<Rating readOnly defaultValue={3} onChange={handleChange} />);

      const container = screen.getByRole('img');
      const stars = container.querySelectorAll('[data-value]');
      fireEvent.click(stars[0]);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('readOnly 상태에서 aria-label이 적절히 설정됨', () => {
      render(<Rating readOnly defaultValue={4} count={5} />);
      expect(screen.getByRole('img')).toHaveAttribute(
        'aria-label',
        'Rated 4 out of 5'
      );
    });

    it('readOnly 상태에서 reviewCount가 aria-label에 포함됨', () => {
      render(<Rating readOnly defaultValue={4} reviewCount={100} />);
      expect(screen.getByRole('img')).toHaveAttribute(
        'aria-label',
        'Rated 4 out of 5 based on 100 reviews'
      );
    });
  });

  describe('disabled 상태', () => {
    it('disabled 상태에서 role이 img로 변경됨', () => {
      render(<Rating disabled />);
      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument();
    });

    it('disabled 상태에서 클릭해도 onChange가 호출되지 않음', async () => {
      const handleChange = vi.fn();
      render(<Rating disabled onChange={handleChange} />);

      const container = screen.getByRole('img');
      const stars = container.querySelectorAll('[data-value]');
      fireEvent.click(stars[0]);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('disabled 클래스가 적용됨', () => {
      const { container } = render(<Rating disabled />);
      const ratingContainer = container.querySelector('.rating');
      expect(ratingContainer).toHaveClass('disabled');
    });
  });

  describe('allowHalf', () => {
    it('allowHalf가 true일 때 0.5 단위 값이 표시됨', () => {
      render(<Rating allowHalf defaultValue={3.5} showValue />);
      expect(screen.getByText('3.5 / 5')).toBeInTheDocument();
    });

    it('allowHalf가 false일 때 정수 값만 표시됨', () => {
      render(<Rating defaultValue={3} showValue />);
      expect(screen.getByText('3 / 5')).toBeInTheDocument();
    });
  });

  describe('hover 상태', () => {
    it('hover 시 별 상태가 변경됨', async () => {
      render(<Rating defaultValue={2} />);

      const stars = screen.getAllByRole('radio');
      fireEvent.mouseEnter(stars[4]);

      // hover 상태 확인 (클래스로 확인)
      expect(stars[4].className).toContain('hover');
    });

    it('mouse leave 시 원래 상태로 복원됨', async () => {
      render(<Rating defaultValue={2} />);

      const stars = screen.getAllByRole('radio');
      const container = screen.getByRole('radiogroup');

      fireEvent.mouseEnter(stars[4]);
      fireEvent.mouseLeave(container);

      // hover 클래스가 제거됨
      expect(stars[4].className).not.toContain('hover');
    });
  });

  describe('키보드 네비게이션', () => {
    it('Tab으로 포커스를 받을 수 있음', async () => {
      const user = userEvent.setup();
      render(<Rating defaultValue={3} />);

      await user.tab();
      expect(screen.getByRole('radiogroup')).toHaveFocus();
    });

    it('ArrowRight로 다음 별로 이동', async () => {
      const user = userEvent.setup();
      render(<Rating defaultValue={2} />);

      const container = screen.getByRole('radiogroup');
      await user.tab();
      await user.keyboard('{ArrowRight}');

      // focused 클래스 확인
      const stars = container.querySelectorAll('[data-value]');
      expect(stars[3].className).toContain('focused');
    });

    it('ArrowLeft로 이전 별로 이동', async () => {
      const user = userEvent.setup();
      render(<Rating defaultValue={3} />);

      const container = screen.getByRole('radiogroup');
      await user.tab();
      // 초기 포커스는 Math.floor(currentValue) = 3 (인덱스 3, 즉 4번째 별)
      // ArrowLeft를 누르면 인덱스 2로 이동
      await user.keyboard('{ArrowLeft}');

      const stars = container.querySelectorAll('[data-value]');
      expect(stars[2].className).toContain('focused');
    });

    it('Enter로 별 선택', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Rating onChange={handleChange} defaultValue={2} />);

      await user.tab();
      await user.keyboard('{ArrowRight}');
      await user.keyboard('{Enter}');

      expect(handleChange).toHaveBeenCalledWith(4);
    });

    it('Space로 별 선택', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Rating onChange={handleChange} defaultValue={2} />);

      await user.tab();
      await user.keyboard(' ');

      expect(handleChange).toHaveBeenCalled();
    });

    it('Home 키로 첫 번째 별로 이동', async () => {
      const user = userEvent.setup();
      render(<Rating defaultValue={3} />);

      const container = screen.getByRole('radiogroup');
      await user.tab();
      await user.keyboard('{Home}');

      const stars = container.querySelectorAll('[data-value]');
      expect(stars[0].className).toContain('focused');
    });

    it('End 키로 마지막 별로 이동', async () => {
      const user = userEvent.setup();
      render(<Rating defaultValue={2} />);

      const container = screen.getByRole('radiogroup');
      await user.tab();
      await user.keyboard('{End}');

      const stars = container.querySelectorAll('[data-value]');
      expect(stars[4].className).toContain('focused');
    });

    it('readOnly 상태에서 키보드가 동작하지 않음', async () => {
      const handleChange = vi.fn();
      render(<Rating readOnly defaultValue={3} onChange={handleChange} />);

      // readOnly에서는 img role이므로 radiogroup이 없음
      const container = screen.getByRole('img');
      fireEvent.keyDown(container, { key: 'Enter' });

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('disabled 상태에서 키보드가 동작하지 않음', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Rating disabled onChange={handleChange} />);

      await user.tab();
      await user.keyboard('{Enter}');

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('className', () => {
    it('커스텀 className이 적용됨', () => {
      const { container } = render(<Rating className="custom-rating" />);
      const ratingContainer = container.querySelector('.rating');
      expect(ratingContainer).toHaveClass('custom-rating');
    });
  });

  describe('ariaLabel', () => {
    it('커스텀 ariaLabel이 적용됨 (interactive)', () => {
      render(<Rating ariaLabel="제품 평점 선택" />);
      expect(screen.getByRole('radiogroup')).toHaveAttribute(
        'aria-label',
        '제품 평점 선택'
      );
    });

    it('커스텀 ariaLabel이 적용됨 (readOnly)', () => {
      render(<Rating readOnly ariaLabel="제품 평점" defaultValue={4} />);
      expect(screen.getByRole('img')).toHaveAttribute(
        'aria-label',
        '제품 평점'
      );
    });

    it('기본 ariaLabel이 아이콘 타입을 반영함', () => {
      render(<Rating icon="heart" count={5} />);
      expect(screen.getByRole('radiogroup')).toHaveAttribute(
        'aria-label',
        'Rate from 1 to 5 hearts'
      );
    });
  });

  describe('접근성', () => {
    it('각 별에 role="radio"가 있음', () => {
      render(<Rating />);
      const stars = screen.getAllByRole('radio');
      expect(stars).toHaveLength(5);
    });

    it('각 별에 aria-checked가 있음', () => {
      render(<Rating defaultValue={3} />);
      const stars = screen.getAllByRole('radio');
      stars.forEach((star, index) => {
        const isChecked = index < 3 ? 'true' : 'false';
        expect(star).toHaveAttribute('aria-checked', isChecked);
      });
    });

    it('각 별에 aria-label이 있음', () => {
      render(<Rating />);
      const stars = screen.getAllByRole('radio');
      expect(stars[0]).toHaveAttribute('aria-label', '1 star');
      expect(stars[1]).toHaveAttribute('aria-label', '2 stars');
    });

    it('각 별에 aria-setsize와 aria-posinset이 있음', () => {
      render(<Rating count={5} />);
      const stars = screen.getAllByRole('radio');
      stars.forEach((star, index) => {
        expect(star).toHaveAttribute('aria-setsize', '5');
        expect(star).toHaveAttribute('aria-posinset', String(index + 1));
      });
    });

    it('tabIndex가 0임 (interactive)', () => {
      render(<Rating />);
      expect(screen.getByRole('radiogroup')).toHaveAttribute('tabindex', '0');
    });

    it('a11y 위반 사항이 없음 (interactive)', async () => {
      const { container } = render(<Rating label="평점" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('a11y 위반 사항이 없음 (readOnly)', async () => {
      const { container } = render(<Rating readOnly defaultValue={4} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('a11y 위반 사항이 없음 (disabled)', async () => {
      const { container } = render(<Rating disabled label="평점" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('엣지 케이스', () => {
    it('count가 1일 때도 동작함', () => {
      render(<Rating count={1} />);
      const stars = screen.getAllByRole('radio');
      expect(stars).toHaveLength(1);
    });

    it('value가 count보다 클 때', () => {
      render(<Rating value={10} count={5} showValue />);
      expect(screen.getByText('10 / 5')).toBeInTheDocument();
    });

    it('value가 음수일 때', () => {
      render(<Rating value={-1} showValue />);
      expect(screen.getByText('-1 / 5')).toBeInTheDocument();
    });

    it('blur 시 focusedIndex가 리셋됨', async () => {
      const user = userEvent.setup();
      render(
        <>
          <Rating defaultValue={2} />
          <button>Other</button>
        </>
      );

      await user.tab(); // Rating에 포커스
      await user.tab(); // 버튼으로 이동

      const container = screen.getByRole('radiogroup');
      const stars = container.querySelectorAll('[data-value]');
      // 포커스가 없으므로 focused 클래스 없음
      stars.forEach((star) => {
        expect(star.className).not.toContain('focused');
      });
    });
  });
});
