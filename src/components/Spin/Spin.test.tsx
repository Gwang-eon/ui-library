/**
 * Spin 컴포넌트 테스트
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Spin, SpinContainer, SpinOverlay, SpinFullscreen } from './Spin';

describe('Spin', () => {
  afterEach(() => {
    cleanup();
  });

  describe('렌더링', () => {
    it('Spin이 렌더링됨', () => {
      render(<Spin />);

      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('기본 aria-label은 Loading', () => {
      render(<Spin />);

      expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
    });

    it('커스텀 aria-label이 적용됨', () => {
      render(<Spin aria-label="Please wait" />);

      expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Please wait');
    });

    it('className이 적용됨', () => {
      render(<Spin className="custom-spin" />);

      expect(document.querySelector('.custom-spin')).toBeInTheDocument();
    });
  });

  describe('size', () => {
    it('기본 size는 md', () => {
      render(<Spin />);

      // md is default, no size class
      expect(document.querySelector('[class*="spin-sm"]')).not.toBeInTheDocument();
      expect(document.querySelector('[class*="spin-lg"]')).not.toBeInTheDocument();
    });

    it('size="sm"이 적용됨', () => {
      render(<Spin size="sm" />);

      expect(document.querySelector('[class*="spin-sm"]')).toBeInTheDocument();
    });

    it('size="lg"가 적용됨', () => {
      render(<Spin size="lg" />);

      expect(document.querySelector('[class*="spin-lg"]')).toBeInTheDocument();
    });
  });

  describe('variant', () => {
    it('기본 variant는 circle', () => {
      render(<Spin />);

      // circle is default, no variant class
      expect(document.querySelector('[class*="spin-dots"]')).not.toBeInTheDocument();
      expect(document.querySelector('[class*="spin-bars"]')).not.toBeInTheDocument();
    });

    it('variant="dots"가 적용됨', () => {
      render(<Spin variant="dots" />);

      const dotsContainer = document.querySelector('[class*="spin-dots"]');
      expect(dotsContainer).toBeInTheDocument();
      // dots variant renders 3 dot elements (use child selector to avoid matching container)
      expect(dotsContainer?.querySelectorAll('[class*="dot"]').length).toBe(3);
    });

    it('variant="bars"가 적용됨', () => {
      render(<Spin variant="bars" />);

      const barsContainer = document.querySelector('[class*="spin-bars"]');
      expect(barsContainer).toBeInTheDocument();
      // bars variant renders 3 bar elements (use child selector to avoid matching container)
      expect(barsContainer?.querySelectorAll('[class*="bar"]').length).toBe(3);
    });

    it('variant="pulse"가 적용됨', () => {
      render(<Spin variant="pulse" />);

      expect(document.querySelector('[class*="spin-pulse"]')).toBeInTheDocument();
    });
  });

  describe('inline', () => {
    it('기본적으로 inline이 아님', () => {
      render(<Spin />);

      expect(document.querySelector('[class*="spin-inline"]')).not.toBeInTheDocument();
    });

    it('inline=true면 inline 클래스가 적용됨', () => {
      render(<Spin inline />);

      expect(document.querySelector('[class*="spin-inline"]')).toBeInTheDocument();
    });
  });

  describe('text', () => {
    it('text가 없으면 텍스트가 렌더링되지 않음', () => {
      render(<Spin />);

      expect(document.querySelector('[class*="spin-text"]')).not.toBeInTheDocument();
    });

    it('text가 있으면 텍스트가 렌더링됨', () => {
      render(<Spin text="Loading..." />);

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('text가 있으면 container로 감싸짐', () => {
      render(<Spin text="Loading..." />);

      expect(document.querySelector('[class*="spin-container"]')).toBeInTheDocument();
    });
  });

  describe('SpinContainer', () => {
    it('SpinContainer가 렌더링됨', () => {
      render(<SpinContainer text="Loading data..." />);

      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByText('Loading data...')).toBeInTheDocument();
    });

    it('SpinContainer에 size와 variant가 적용됨', () => {
      render(<SpinContainer text="Loading" size="lg" variant="dots" />);

      expect(document.querySelector('[class*="spin-lg"]')).toBeInTheDocument();
      expect(document.querySelector('[class*="spin-dots"]')).toBeInTheDocument();
    });

    it('SpinContainer className이 적용됨', () => {
      render(<SpinContainer text="Loading" className="custom-container" />);

      expect(document.querySelector('.custom-container')).toBeInTheDocument();
    });
  });

  describe('SpinOverlay', () => {
    it('SpinOverlay가 렌더링됨', () => {
      render(<SpinOverlay text="Processing..." />);

      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByText('Processing...')).toBeInTheDocument();
      expect(document.querySelector('[class*="spin-overlay"]')).toBeInTheDocument();
    });

    it('SpinOverlay 기본 size는 lg', () => {
      render(<SpinOverlay text="Loading" />);

      expect(document.querySelector('[class*="spin-lg"]')).toBeInTheDocument();
    });

    it('SpinOverlay className이 적용됨', () => {
      render(<SpinOverlay text="Loading" className="custom-overlay" />);

      expect(document.querySelector('.custom-overlay')).toBeInTheDocument();
    });
  });

  describe('SpinFullscreen', () => {
    it('SpinFullscreen이 렌더링됨', () => {
      render(<SpinFullscreen text="Loading application..." />);

      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByText('Loading application...')).toBeInTheDocument();
      expect(document.querySelector('[class*="spin-fullscreen"]')).toBeInTheDocument();
    });

    it('SpinFullscreen 기본 size는 lg', () => {
      render(<SpinFullscreen text="Loading" />);

      expect(document.querySelector('[class*="spin-lg"]')).toBeInTheDocument();
    });

    it('SpinFullscreen className이 적용됨', () => {
      render(<SpinFullscreen text="Loading" className="custom-fullscreen" />);

      expect(document.querySelector('.custom-fullscreen')).toBeInTheDocument();
    });
  });

  describe('접근성', () => {
    it('role="status"가 설정됨', () => {
      render(<Spin />);

      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('기본 Spin이 a11y 위반 사항이 없음', async () => {
      const { container } = render(<Spin />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('text가 있는 Spin이 a11y 위반 사항이 없음', async () => {
      const { container } = render(<Spin text="Loading..." />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('SpinContainer가 a11y 위반 사항이 없음', async () => {
      const { container } = render(<SpinContainer text="Loading" />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('복합 사용', () => {
    it('버튼 내 인라인 spinner', () => {
      render(
        <button disabled>
          <Spin size="sm" inline aria-label="Submitting" />
          Submitting...
        </button>
      );

      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(document.querySelector('[class*="spin-inline"]')).toBeInTheDocument();
    });

    it('데이터 로딩 overlay', () => {
      render(
        <div style={{ position: 'relative' }}>
          <div>Content</div>
          <SpinOverlay text="Fetching data..." />
        </div>
      );

      expect(screen.getByText('Fetching data...')).toBeInTheDocument();
      expect(document.querySelector('[class*="spin-overlay"]')).toBeInTheDocument();
    });

    it('다양한 variant 테스트', () => {
      const { rerender } = render(<Spin variant="circle" />);
      expect(screen.getByRole('status')).toBeInTheDocument();

      rerender(<Spin variant="dots" />);
      const dotsContainer = document.querySelector('[class*="spin-dots"]');
      expect(dotsContainer?.querySelectorAll('[class*="dot"]').length).toBe(3);

      rerender(<Spin variant="bars" />);
      const barsContainer = document.querySelector('[class*="spin-bars"]');
      expect(barsContainer?.querySelectorAll('[class*="bar"]').length).toBe(3);

      rerender(<Spin variant="pulse" />);
      expect(document.querySelector('[class*="spin-pulse"]')).toBeInTheDocument();
    });
  });
});
