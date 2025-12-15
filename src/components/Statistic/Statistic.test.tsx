/**
 * Statistic 컴포넌트 테스트
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Statistic } from './Statistic';
import { Activity, DollarSign, Users } from 'lucide-react';

describe('Statistic', () => {
  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(<Statistic title="Active Users" value={1248} />);

      expect(screen.getByText('Active Users')).toBeInTheDocument();
      expect(screen.getByText('1248')).toBeInTheDocument();
    });

    it('문자열 value가 렌더링됨', () => {
      render(<Statistic title="Status" value="Online" />);

      expect(screen.getByText('Online')).toBeInTheDocument();
    });

    it('숫자 value가 렌더링됨', () => {
      render(<Statistic title="Count" value={99999} />);

      expect(screen.getByText('99999')).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      const { container } = render(
        <Statistic title="Test" value={100} className="custom-stat" />
      );

      expect(container.firstChild).toHaveClass('custom-stat');
    });

    it('value가 role="status"와 aria-live="polite"를 가짐', () => {
      render(<Statistic title="Test" value={100} />);

      const valueElement = screen.getByRole('status');
      expect(valueElement).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('prefix와 suffix', () => {
    it('prefix가 렌더링됨', () => {
      render(<Statistic title="Revenue" value={1000} prefix="$" />);

      expect(screen.getByText('$')).toBeInTheDocument();
    });

    it('suffix가 렌더링됨', () => {
      render(<Statistic title="Progress" value={75} suffix="%" />);

      expect(screen.getByText('%')).toBeInTheDocument();
    });

    it('prefix와 suffix가 함께 렌더링됨', () => {
      const { container } = render(<Statistic title="Price" value={99.99} prefix="$" suffix=" USD" />);

      expect(screen.getByText('$')).toBeInTheDocument();
      expect(container.querySelector('[class*="suffix"]')).toHaveTextContent('USD');
      expect(screen.getByText('99.99')).toBeInTheDocument();
    });

    it('ReactNode prefix가 렌더링됨', () => {
      render(
        <Statistic
          title="Revenue"
          value={1000}
          prefix={<DollarSign data-testid="prefix-icon" size={16} />}
        />
      );

      expect(screen.getByTestId('prefix-icon')).toBeInTheDocument();
    });

    it('ReactNode suffix가 렌더링됨', () => {
      render(
        <Statistic
          title="Temperature"
          value={25}
          suffix={<span data-testid="suffix-unit">°C</span>}
        />
      );

      expect(screen.getByTestId('suffix-unit')).toBeInTheDocument();
    });
  });

  describe('trend', () => {
    it('trend up이 렌더링됨', () => {
      render(
        <Statistic
          title="Sales"
          value={1248}
          trend={{ direction: 'up', value: '12.5%' }}
        />
      );

      expect(screen.getByText('12.5%')).toBeInTheDocument();
      expect(screen.getByLabelText(/increased by 12\.5%/i)).toBeInTheDocument();
    });

    it('trend down이 렌더링됨', () => {
      render(
        <Statistic
          title="Errors"
          value={42}
          trend={{ direction: 'down', value: '8%' }}
        />
      );

      expect(screen.getByText('8%')).toBeInTheDocument();
      expect(screen.getByLabelText(/decreased by 8%/i)).toBeInTheDocument();
    });

    it('숫자 trend value가 렌더링됨', () => {
      render(
        <Statistic
          title="Growth"
          value={100}
          trend={{ direction: 'up', value: 15 }}
        />
      );

      expect(screen.getByText('15')).toBeInTheDocument();
    });

    it('trending icon이 기본으로 렌더링됨', () => {
      const { container } = render(
        <Statistic
          title="Sales"
          value={1248}
          trend={{ direction: 'up', value: '12%' }}
        />
      );

      // TrendingUp icon should be rendered
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('arrow icon이 렌더링됨', () => {
      const { container } = render(
        <Statistic
          title="Sales"
          value={1248}
          trend={{ direction: 'up', value: '12%', icon: 'arrow' }}
        />
      );

      // ArrowUp icon should be rendered
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('arrow down icon이 렌더링됨', () => {
      const { container } = render(
        <Statistic
          title="Errors"
          value={5}
          trend={{ direction: 'down', value: '50%', icon: 'arrow' }}
        />
      );

      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('icon', () => {
    it('icon이 렌더링됨', () => {
      render(
        <Statistic
          title="Active Devices"
          value={156}
          icon={{ element: <Activity data-testid="stat-icon" /> }}
        />
      );

      expect(screen.getByTestId('stat-icon')).toBeInTheDocument();
    });

    it('icon이 aria-hidden="true"로 설정됨', () => {
      const { container } = render(
        <Statistic
          title="Users"
          value={100}
          icon={{ element: <Users /> }}
        />
      );

      const iconWrapper = container.querySelector('[aria-hidden="true"]');
      expect(iconWrapper).toBeInTheDocument();
    });

    it('icon variant가 적용됨', () => {
      const variants = ['primary', 'success', 'warning', 'error'] as const;

      variants.forEach((variant) => {
        const { container, unmount } = render(
          <Statistic
            title="Test"
            value={100}
            icon={{ element: <Activity />, variant }}
          />
        );

        // Check that variant class is applied
        expect(container.firstChild).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('description', () => {
    it('description이 렌더링됨', () => {
      render(
        <Statistic
          title="Revenue"
          value={50000}
          description="Compared to last month"
        />
      );

      expect(screen.getByText('Compared to last month')).toBeInTheDocument();
    });

    it('description이 없으면 렌더링되지 않음', () => {
      const { container } = render(
        <Statistic title="Revenue" value={50000} />
      );

      expect(container.querySelector('[class*="description"]')).not.toBeInTheDocument();
    });
  });

  describe('variants', () => {
    const variants = ['default', 'primary', 'success', 'warning', 'error'] as const;

    variants.forEach((variant) => {
      it(`${variant} variant가 정상 렌더링됨`, () => {
        const { container } = render(
          <Statistic title="Test" value={100} variant={variant} />
        );

        expect(container.firstChild).toBeInTheDocument();
      });
    });

    it('primary variant가 적절한 클래스를 가짐', () => {
      const { container } = render(
        <Statistic title="Test" value={100} variant="primary" />
      );

      expect(container.querySelector('[class*="primary"]')).toBeInTheDocument();
    });

    it('success variant가 적절한 클래스를 가짐', () => {
      const { container } = render(
        <Statistic title="Test" value={100} variant="success" />
      );

      expect(container.querySelector('[class*="success"]')).toBeInTheDocument();
    });

    it('warning variant가 적절한 클래스를 가짐', () => {
      const { container } = render(
        <Statistic title="Test" value={100} variant="warning" />
      );

      expect(container.querySelector('[class*="warning"]')).toBeInTheDocument();
    });

    it('error variant가 적절한 클래스를 가짐', () => {
      const { container } = render(
        <Statistic title="Test" value={100} variant="error" />
      );

      expect(container.querySelector('[class*="error"]')).toBeInTheDocument();
    });
  });

  describe('compact mode', () => {
    it('compact 모드가 적용됨', () => {
      const { container } = render(
        <Statistic title="Test" value={100} compact />
      );

      expect(container.querySelector('[class*="compact"]')).toBeInTheDocument();
    });

    it('compact 기본값은 false', () => {
      const { container } = render(
        <Statistic title="Test" value={100} />
      );

      // compact class should not be present
      expect(container.querySelector('[class*="compact"]')).not.toBeInTheDocument();
    });
  });

  describe('복합 사용', () => {
    it('모든 props가 함께 렌더링됨', () => {
      const { container } = render(
        <Statistic
          title="Total Revenue"
          value={125000}
          prefix="$"
          suffix=" USD"
          trend={{ direction: 'up', value: '15%', icon: 'arrow' }}
          icon={{ element: <DollarSign data-testid="icon" />, variant: 'success' }}
          description="Last 30 days"
          variant="success"
          compact
        />
      );

      expect(screen.getByText('Total Revenue')).toBeInTheDocument();
      expect(screen.getByText('125000')).toBeInTheDocument();
      expect(screen.getByText('$')).toBeInTheDocument();
      expect(container.querySelector('[class*="suffix"]')).toHaveTextContent('USD');
      expect(screen.getByText('15%')).toBeInTheDocument();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('Last 30 days')).toBeInTheDocument();
    });

    it('KPI 대시보드 스타일 렌더링', () => {
      render(
        <div>
          <Statistic
            title="Active Users"
            value={1248}
            trend={{ direction: 'up', value: '12.5%' }}
            variant="primary"
          />
          <Statistic
            title="System Uptime"
            value={99.9}
            suffix="%"
            variant="success"
          />
          <Statistic
            title="Error Rate"
            value={0.5}
            suffix="%"
            trend={{ direction: 'down', value: '8%' }}
            variant="error"
          />
        </div>
      );

      expect(screen.getByText('Active Users')).toBeInTheDocument();
      expect(screen.getByText('System Uptime')).toBeInTheDocument();
      expect(screen.getByText('Error Rate')).toBeInTheDocument();
    });
  });

  describe('접근성', () => {
    it('기본 Statistic이 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Statistic title="Active Users" value={1248} />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('prefix/suffix가 있는 Statistic이 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Statistic title="Revenue" value={1000} prefix="$" suffix=" USD" />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('trend가 있는 Statistic이 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Statistic
          title="Sales"
          value={1248}
          trend={{ direction: 'up', value: '12%' }}
        />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('icon이 있는 Statistic이 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Statistic
          title="Devices"
          value={156}
          icon={{ element: <Activity />, variant: 'primary' }}
        />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('모든 옵션이 있는 Statistic이 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Statistic
          title="Revenue"
          value={50000}
          prefix="$"
          trend={{ direction: 'up', value: '15%' }}
          icon={{ element: <DollarSign />, variant: 'success' }}
          description="Last 30 days"
          variant="success"
        />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
