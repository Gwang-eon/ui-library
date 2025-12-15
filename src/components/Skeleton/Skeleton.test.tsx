/**
 * Skeleton 컴포넌트 테스트
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  afterEach(() => {
    cleanup();
  });

  describe('렌더링', () => {
    it('Skeleton이 렌더링됨', () => {
      const { container } = render(<Skeleton />);

      expect(container.querySelector('[class*="skeleton"]')).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      render(<Skeleton className="custom-skeleton" />);

      expect(document.querySelector('.custom-skeleton')).toBeInTheDocument();
    });
  });

  describe('variant', () => {
    it('기본 variant는 line', () => {
      render(<Skeleton />);

      expect(document.querySelector('[class*="skeletonLine"]')).toBeInTheDocument();
    });

    it('variant="line"이 적용됨', () => {
      render(<Skeleton variant="line" />);

      expect(document.querySelector('[class*="skeletonLine"]')).toBeInTheDocument();
    });

    it('variant="rect"이 적용됨', () => {
      render(<Skeleton variant="rect" />);

      expect(document.querySelector('[class*="skeletonRect"]')).toBeInTheDocument();
    });

    it('variant="circle"이 적용됨', () => {
      render(<Skeleton variant="circle" />);

      expect(document.querySelector('[class*="skeletonCircle"]')).toBeInTheDocument();
    });
  });

  describe('animation', () => {
    it('기본 animation은 shimmer', () => {
      render(<Skeleton />);

      expect(document.querySelector('[class*="skeletonPulse"]')).not.toBeInTheDocument();
    });

    it('animation="shimmer"가 기본값', () => {
      render(<Skeleton animation="shimmer" />);

      expect(document.querySelector('[class*="skeletonPulse"]')).not.toBeInTheDocument();
    });

    it('animation="pulse"가 적용됨', () => {
      render(<Skeleton animation="pulse" />);

      expect(document.querySelector('[class*="skeletonPulse"]')).toBeInTheDocument();
    });
  });

  describe('크기', () => {
    it('width가 적용됨 (number)', () => {
      const { container } = render(<Skeleton width={200} />);

      const skeleton = container.querySelector('[class*="skeleton"]');
      expect(skeleton).toHaveStyle({ width: '200px' });
    });

    it('width가 적용됨 (string)', () => {
      const { container } = render(<Skeleton width="50%" />);

      const skeleton = container.querySelector('[class*="skeleton"]');
      expect(skeleton).toHaveStyle({ width: '50%' });
    });

    it('height가 적용됨 (number)', () => {
      const { container } = render(<Skeleton height={100} />);

      const skeleton = container.querySelector('[class*="skeleton"]');
      expect(skeleton).toHaveStyle({ height: '100px' });
    });

    it('height가 적용됨 (string)', () => {
      const { container } = render(<Skeleton height="3rem" />);

      const skeleton = container.querySelector('[class*="skeleton"]');
      expect(skeleton).toHaveStyle({ height: '3rem' });
    });

    it('width와 height가 함께 적용됨', () => {
      const { container } = render(<Skeleton width={150} height={50} />);

      const skeleton = container.querySelector('[class*="skeleton"]');
      expect(skeleton).toHaveStyle({ width: '150px', height: '50px' });
    });
  });

  describe('style', () => {
    it('커스텀 style이 적용됨', () => {
      const { container } = render(
        <Skeleton style={{ marginTop: '20px', borderRadius: '8px' }} />
      );

      const skeleton = container.querySelector('[class*="skeleton"]');
      expect(skeleton).toHaveStyle({ marginTop: '20px', borderRadius: '8px' });
    });

    it('width/height와 style이 함께 적용됨', () => {
      const { container } = render(
        <Skeleton width={100} height={100} style={{ margin: '10px' }} />
      );

      const skeleton = container.querySelector('[class*="skeleton"]');
      expect(skeleton).toHaveStyle({ width: '100px', height: '100px', margin: '10px' });
    });
  });

  describe('접근성', () => {
    it('기본 Skeleton이 a11y 위반 사항이 없음', async () => {
      const { container } = render(<Skeleton />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('rect Skeleton이 a11y 위반 사항이 없음', async () => {
      const { container } = render(<Skeleton variant="rect" width={200} height={150} />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('circle Skeleton이 a11y 위반 사항이 없음', async () => {
      const { container } = render(<Skeleton variant="circle" width={50} height={50} />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('복합 사용', () => {
    it('프로필 카드 skeleton', () => {
      const { container } = render(
        <div>
          <Skeleton variant="circle" width={80} height={80} />
          <Skeleton variant="line" width="60%" />
          <Skeleton variant="line" width="40%" />
        </div>
      );

      expect(container.querySelector('[class*="skeletonCircle"]')).toBeInTheDocument();
      expect(container.querySelectorAll('[class*="skeletonLine"]').length).toBe(2);
    });

    it('이미지 placeholder skeleton', () => {
      const { container } = render(
        <Skeleton variant="rect" width="100%" height={200} animation="pulse" />
      );

      expect(container.querySelector('[class*="skeletonRect"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="skeletonPulse"]')).toBeInTheDocument();
    });

    it('리스트 아이템 skeleton', () => {
      const { container } = render(
        <div>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <Skeleton variant="circle" width={40} height={40} />
              <div style={{ flex: 1 }}>
                <Skeleton variant="line" width="80%" />
                <Skeleton variant="line" width="50%" />
              </div>
            </div>
          ))}
        </div>
      );

      expect(container.querySelectorAll('[class*="skeletonCircle"]').length).toBe(3);
      expect(container.querySelectorAll('[class*="skeletonLine"]').length).toBe(6);
    });
  });
});
