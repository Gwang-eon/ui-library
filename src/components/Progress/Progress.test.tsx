/**
 * Progress 컴포넌트 테스트
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Progress, ProgressBar, ProgressCircular, ProgressSpinner } from './Progress';

describe('Progress', () => {
  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(
        <Progress>
          <ProgressBar value={50} aria-label="진행률" />
        </Progress>
      );
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('children이 렌더링됨', () => {
      render(
        <Progress>
          <ProgressBar value={30} aria-label="진행률" />
        </Progress>
      );
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`${size} size가 정상 렌더링됨`, () => {
        render(
          <Progress size={size}>
            <ProgressBar value={50} aria-label="진행률" />
          </Progress>
        );
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
      });
    });
  });

  describe('className', () => {
    it('추가 className이 적용됨', () => {
      const { container } = render(
        <Progress className="custom-progress">
          <ProgressBar value={50} aria-label="진행률" />
        </Progress>
      );
      expect(container.firstChild).toHaveClass('custom-progress');
    });
  });
});

describe('ProgressBar', () => {
  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(<ProgressBar value={50} aria-label="진행률" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('value에 따라 width가 설정됨', () => {
      render(<ProgressBar value={75} aria-label="진행률" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveStyle({ width: '75%' });
    });

    it('value가 0-100 범위로 제한됨', () => {
      render(<ProgressBar value={150} aria-label="진행률" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveStyle({ width: '100%' });
    });

    it('value가 음수면 0%로 설정됨', () => {
      render(<ProgressBar value={-10} aria-label="진행률" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveStyle({ width: '0%' });
    });
  });

  describe('variants', () => {
    const variants = ['primary', 'success', 'warning', 'error'] as const;

    variants.forEach((variant) => {
      it(`${variant} variant가 정상 렌더링됨`, () => {
        render(<ProgressBar value={50} variant={variant} aria-label="진행률" />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
      });
    });
  });

  describe('indeterminate', () => {
    it('indeterminate 모드가 적용됨', () => {
      render(<ProgressBar indeterminate aria-label="로딩 중" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).not.toHaveAttribute('aria-valuenow');
    });
  });

  describe('striped/animated', () => {
    it('striped가 적용됨', () => {
      const { container } = render(<ProgressBar value={50} striped aria-label="진행률" />);
      expect(container.firstChild).toHaveClass('progressBarStriped');
    });

    it('animated가 적용됨', () => {
      const { container } = render(<ProgressBar value={50} animated aria-label="진행률" />);
      expect(container.firstChild).toHaveClass('progressBarAnimated');
    });
  });

  describe('접근성', () => {
    it('a11y 위반 사항이 없음', async () => {
      const { container } = render(<ProgressBar value={50} aria-label="진행률" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('role=progressbar가 있음', () => {
      render(<ProgressBar value={50} aria-label="진행률" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('aria-valuenow가 설정됨', () => {
      render(<ProgressBar value={75} aria-label="진행률" />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');
    });

    it('aria-valuemin/max가 설정됨', () => {
      render(<ProgressBar value={50} aria-label="진행률" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuemin', '0');
      expect(progressbar).toHaveAttribute('aria-valuemax', '100');
    });
  });
});

describe('ProgressCircular', () => {
  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(<ProgressCircular value={50} aria-label="진행률" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('value가 레이블로 표시됨', () => {
      render(<ProgressCircular value={75} aria-label="진행률" />);
      expect(screen.getByText('75%')).toBeInTheDocument();
    });

    it('showLabel=false면 레이블이 없음', () => {
      render(<ProgressCircular value={75} showLabel={false} aria-label="진행률" />);
      expect(screen.queryByText('75%')).not.toBeInTheDocument();
    });
  });

  describe('variants', () => {
    const variants = ['primary', 'success', 'warning', 'error'] as const;

    variants.forEach((variant) => {
      it(`${variant} variant가 정상 렌더링됨`, () => {
        render(<ProgressCircular value={50} variant={variant} aria-label="진행률" />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
      });
    });
  });

  describe('접근성', () => {
    it('a11y 위반 사항이 없음', async () => {
      const { container } = render(<ProgressCircular value={50} aria-label="진행률" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('aria-valuenow가 설정됨', () => {
      render(<ProgressCircular value={65} aria-label="진행률" />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '65');
    });
  });
});

describe('ProgressSpinner', () => {
  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(<ProgressSpinner />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`${size} size가 정상 렌더링됨`, () => {
        render(<ProgressSpinner size={size} />);
        expect(screen.getByRole('status')).toBeInTheDocument();
      });
    });
  });

  describe('variants', () => {
    const variants = ['primary', 'success', 'warning', 'error', 'danger'] as const;

    variants.forEach((variant) => {
      it(`${variant} variant가 정상 렌더링됨`, () => {
        render(<ProgressSpinner variant={variant} />);
        expect(screen.getByRole('status')).toBeInTheDocument();
      });
    });
  });

  describe('접근성', () => {
    it('a11y 위반 사항이 없음', async () => {
      const { container } = render(<ProgressSpinner aria-label="로딩 중" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('role=status가 있음', () => {
      render(<ProgressSpinner />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('기본 aria-label이 Loading임', () => {
      render(<ProgressSpinner />);
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
    });

    it('커스텀 aria-label이 적용됨', () => {
      render(<ProgressSpinner aria-label="데이터 로딩 중" />);
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', '데이터 로딩 중');
    });
  });

  describe('className', () => {
    it('추가 className이 적용됨', () => {
      render(<ProgressSpinner className="custom-spinner" />);
      expect(screen.getByRole('status')).toHaveClass('custom-spinner');
    });
  });
});
