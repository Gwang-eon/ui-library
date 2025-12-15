/**
 * Divider 컴포넌트 테스트
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Divider } from './Divider';

describe('Divider', () => {
  afterEach(() => {
    cleanup();
  });

  describe('렌더링', () => {
    it('Divider가 렌더링됨', () => {
      render(<Divider />);

      expect(screen.getByRole('separator')).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      render(<Divider className="custom-divider" />);

      expect(document.querySelector('.custom-divider')).toBeInTheDocument();
    });

    it('aria-label이 설정됨', () => {
      render(<Divider />);

      expect(screen.getByRole('separator')).toHaveAttribute('aria-label', 'Divider');
    });
  });

  describe('orientation', () => {
    it('기본 orientation은 horizontal', () => {
      render(<Divider />);

      expect(document.querySelector('[class*="divider-vertical"]')).not.toBeInTheDocument();
    });

    it('orientation="vertical"이 적용됨', () => {
      render(<Divider orientation="vertical" />);

      expect(document.querySelector('[class*="divider-vertical"]')).toBeInTheDocument();
    });

    it('orientation="horizontal"이 적용됨', () => {
      render(<Divider orientation="horizontal" />);

      expect(document.querySelector('[class*="divider-vertical"]')).not.toBeInTheDocument();
    });
  });

  describe('thickness', () => {
    const thicknesses = ['thin', 'medium', 'thick'] as const;

    thicknesses.forEach((thickness) => {
      it(`thickness="${thickness}"가 적용됨`, () => {
        render(<Divider thickness={thickness} />);

        expect(document.querySelector(`[class*="divider-${thickness}"]`)).toBeInTheDocument();
      });
    });
  });

  describe('lineStyle', () => {
    it('기본 lineStyle은 solid', () => {
      render(<Divider />);

      expect(document.querySelector('[class*="divider-dashed"]')).not.toBeInTheDocument();
      expect(document.querySelector('[class*="divider-dotted"]')).not.toBeInTheDocument();
    });

    it('lineStyle="dashed"가 적용됨', () => {
      render(<Divider lineStyle="dashed" />);

      expect(document.querySelector('[class*="divider-dashed"]')).toBeInTheDocument();
    });

    it('lineStyle="dotted"가 적용됨', () => {
      render(<Divider lineStyle="dotted" />);

      expect(document.querySelector('[class*="divider-dotted"]')).toBeInTheDocument();
    });
  });

  describe('spacing', () => {
    const spacings = ['sm', 'md', 'lg'] as const;

    spacings.forEach((spacing) => {
      it(`spacing="${spacing}"가 적용됨`, () => {
        render(<Divider spacing={spacing} />);

        expect(document.querySelector(`[class*="divider-spacing-${spacing}"]`)).toBeInTheDocument();
      });
    });

    it('기본 spacing은 md', () => {
      render(<Divider />);

      expect(document.querySelector('[class*="divider-spacing-md"]')).toBeInTheDocument();
    });
  });

  describe('텍스트가 있는 Divider', () => {
    it('children이 렌더링됨', () => {
      render(<Divider>OR</Divider>);

      expect(screen.getByText('OR')).toBeInTheDocument();
    });

    it('텍스트가 있으면 with-text 클래스가 적용됨', () => {
      render(<Divider>Text</Divider>);

      expect(document.querySelector('[class*="divider-with-text"]')).toBeInTheDocument();
    });

    it('텍스트가 있으면 aria-label이 변경됨', () => {
      render(<Divider>OR</Divider>);

      expect(screen.getByRole('separator')).toHaveAttribute('aria-label', 'Divider with text');
    });

    it('React Node children이 렌더링됨', () => {
      render(
        <Divider>
          <span data-testid="icon">★</span>
        </Divider>
      );

      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });

  describe('textAlign', () => {
    it('기본 textAlign은 center', () => {
      render(<Divider>Text</Divider>);

      expect(document.querySelector('[class*="divider-text-left"]')).not.toBeInTheDocument();
      expect(document.querySelector('[class*="divider-text-right"]')).not.toBeInTheDocument();
    });

    it('textAlign="left"가 적용됨', () => {
      render(<Divider textAlign="left">Text</Divider>);

      expect(document.querySelector('[class*="divider-text-left"]')).toBeInTheDocument();
    });

    it('textAlign="right"가 적용됨', () => {
      render(<Divider textAlign="right">Text</Divider>);

      expect(document.querySelector('[class*="divider-text-right"]')).toBeInTheDocument();
    });

    it('vertical에서 children이 있어도 텍스트 span 렌더링 안 됨', () => {
      render(
        <Divider orientation="vertical" textAlign="left">
          Text
        </Divider>
      );

      // Vertical divider doesn't render the text span element
      // The component renders text only for horizontal orientation
      // The classes are still applied, but the span itself is not rendered
      expect(screen.queryByText('Text')).not.toBeInTheDocument();
    });
  });

  describe('접근성', () => {
    it('role="separator"가 설정됨', () => {
      render(<Divider />);

      expect(screen.getByRole('separator')).toBeInTheDocument();
    });

    it('기본 Divider가 a11y 위반 사항이 없음', async () => {
      const { container } = render(<Divider />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('텍스트가 있는 Divider가 a11y 위반 사항이 없음', async () => {
      const { container } = render(<Divider>OR</Divider>);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('vertical Divider가 a11y 위반 사항이 없음', async () => {
      const { container } = render(<Divider orientation="vertical" />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('복합 사용', () => {
    it('로그인 폼 divider', () => {
      render(
        <div>
          <button>Login with Google</button>
          <Divider spacing="lg">or continue with</Divider>
          <input placeholder="Email" />
        </div>
      );

      expect(screen.getByText('or continue with')).toBeInTheDocument();
    });

    it('섹션 구분 divider', () => {
      render(
        <div>
          <div>Section 1</div>
          <Divider thickness="medium" lineStyle="dashed" />
          <div>Section 2</div>
        </div>
      );

      expect(screen.getByRole('separator')).toBeInTheDocument();
    });

    it('아이콘이 있는 divider', () => {
      render(
        <Divider>
          <span role="img" aria-label="star">⭐</span>
        </Divider>
      );

      expect(screen.getByRole('img', { name: 'star' })).toBeInTheDocument();
    });
  });
});
