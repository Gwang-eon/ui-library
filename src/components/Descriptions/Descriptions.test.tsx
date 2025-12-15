/**
 * Descriptions 컴포넌트 테스트
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Descriptions } from './Descriptions';

describe('Descriptions', () => {
  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(
        <Descriptions>
          <Descriptions.Item label="Name">John Doe</Descriptions.Item>
          <Descriptions.Item label="Email">john@example.com</Descriptions.Item>
        </Descriptions>
      );

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      const { container } = render(
        <Descriptions className="custom-descriptions">
          <Descriptions.Item label="Test">Value</Descriptions.Item>
        </Descriptions>
      );

      expect(container.firstChild).toHaveClass('custom-descriptions');
    });
  });

  describe('title과 extra', () => {
    it('title이 렌더링됨', () => {
      render(
        <Descriptions title="User Information">
          <Descriptions.Item label="Name">John</Descriptions.Item>
        </Descriptions>
      );

      expect(screen.getByRole('heading', { name: 'User Information' })).toBeInTheDocument();
    });

    it('extra가 렌더링됨', () => {
      render(
        <Descriptions extra={<button>Edit</button>}>
          <Descriptions.Item label="Name">John</Descriptions.Item>
        </Descriptions>
      );

      expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
    });

    it('title과 extra가 함께 렌더링됨', () => {
      render(
        <Descriptions title="Details" extra={<button>Save</button>}>
          <Descriptions.Item label="Name">John</Descriptions.Item>
        </Descriptions>
      );

      expect(screen.getByRole('heading', { name: 'Details' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    it('title이 없으면 header가 렌더링되지 않음', () => {
      const { container } = render(
        <Descriptions>
          <Descriptions.Item label="Name">John</Descriptions.Item>
        </Descriptions>
      );

      expect(container.querySelector('[class*="Header"]')).not.toBeInTheDocument();
    });
  });

  describe('bordered', () => {
    it('bordered가 적용됨', () => {
      const { container } = render(
        <Descriptions bordered>
          <Descriptions.Item label="Name">John</Descriptions.Item>
        </Descriptions>
      );

      expect(container.querySelector('[class*="Bordered"]')).toBeInTheDocument();
    });

    it('bordered 기본값은 false', () => {
      const { container } = render(
        <Descriptions>
          <Descriptions.Item label="Name">John</Descriptions.Item>
        </Descriptions>
      );

      expect(container.querySelector('[class*="Bordered"]')).not.toBeInTheDocument();
    });
  });

  describe('column', () => {
    it('column=1이 기본값', () => {
      const { container } = render(
        <Descriptions>
          <Descriptions.Item label="Name">John</Descriptions.Item>
        </Descriptions>
      );

      // Should not have Col2 or Col3 class
      expect(container.querySelector('[class*="Col2"]')).not.toBeInTheDocument();
      expect(container.querySelector('[class*="Col3"]')).not.toBeInTheDocument();
    });

    it('column=2가 적용됨', () => {
      const { container } = render(
        <Descriptions column={2}>
          <Descriptions.Item label="Name">John</Descriptions.Item>
          <Descriptions.Item label="Email">john@example.com</Descriptions.Item>
        </Descriptions>
      );

      expect(container.querySelector('[class*="Col2"]')).toBeInTheDocument();
    });

    it('column=3이 적용됨', () => {
      const { container } = render(
        <Descriptions column={3}>
          <Descriptions.Item label="Name">John</Descriptions.Item>
          <Descriptions.Item label="Email">john@example.com</Descriptions.Item>
          <Descriptions.Item label="Phone">123-456-7890</Descriptions.Item>
        </Descriptions>
      );

      expect(container.querySelector('[class*="Col3"]')).toBeInTheDocument();
    });
  });

  describe('size', () => {
    it('size=md가 기본값', () => {
      const { container } = render(
        <Descriptions>
          <Descriptions.Item label="Name">John</Descriptions.Item>
        </Descriptions>
      );

      // md is default, so no size-specific class should be present
      expect(container.querySelector('[class*="Sm"]')).not.toBeInTheDocument();
      expect(container.querySelector('[class*="Lg"]')).not.toBeInTheDocument();
    });

    it('size=sm이 적용됨', () => {
      const { container } = render(
        <Descriptions size="sm">
          <Descriptions.Item label="Name">John</Descriptions.Item>
        </Descriptions>
      );

      expect(container.querySelector('[class*="Sm"]')).toBeInTheDocument();
    });

    it('size=lg가 적용됨', () => {
      const { container } = render(
        <Descriptions size="lg">
          <Descriptions.Item label="Name">John</Descriptions.Item>
        </Descriptions>
      );

      expect(container.querySelector('[class*="Lg"]')).toBeInTheDocument();
    });
  });

  describe('vertical', () => {
    it('vertical이 적용됨', () => {
      const { container } = render(
        <Descriptions vertical>
          <Descriptions.Item label="Name">John</Descriptions.Item>
        </Descriptions>
      );

      expect(container.querySelector('[class*="Vertical"]')).toBeInTheDocument();
    });

    it('vertical 기본값은 false', () => {
      const { container } = render(
        <Descriptions>
          <Descriptions.Item label="Name">John</Descriptions.Item>
        </Descriptions>
      );

      expect(container.querySelector('[class*="Vertical"]')).not.toBeInTheDocument();
    });
  });

  describe('Descriptions.Item', () => {
    it('label과 children이 렌더링됨', () => {
      render(
        <Descriptions>
          <Descriptions.Item label="Status">Active</Descriptions.Item>
        </Descriptions>
      );

      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      const { container } = render(
        <Descriptions>
          <Descriptions.Item label="Test" className="custom-item">
            Value
          </Descriptions.Item>
        </Descriptions>
      );

      expect(container.querySelector('.custom-item')).toBeInTheDocument();
    });

    it('span이 적용됨', () => {
      const { container } = render(
        <Descriptions column={2}>
          <Descriptions.Item label="Name">John</Descriptions.Item>
          <Descriptions.Item label="Description" span>
            A long description that spans full width
          </Descriptions.Item>
        </Descriptions>
      );

      expect(container.querySelector('[class*="Span"]')).toBeInTheDocument();
    });

    it('ReactNode label이 렌더링됨', () => {
      render(
        <Descriptions>
          <Descriptions.Item label={<strong data-testid="strong-label">Bold Label</strong>}>
            Value
          </Descriptions.Item>
        </Descriptions>
      );

      expect(screen.getByTestId('strong-label')).toBeInTheDocument();
    });

    it('ReactNode children이 렌더링됨', () => {
      render(
        <Descriptions>
          <Descriptions.Item label="Badge">
            <span data-testid="badge-content">Admin</span>
          </Descriptions.Item>
        </Descriptions>
      );

      expect(screen.getByTestId('badge-content')).toBeInTheDocument();
    });
  });

  describe('복합 사용', () => {
    it('여러 아이템이 함께 렌더링됨', () => {
      render(
        <Descriptions title="User Profile" bordered column={2}>
          <Descriptions.Item label="Full Name">John Doe</Descriptions.Item>
          <Descriptions.Item label="Email">john@example.com</Descriptions.Item>
          <Descriptions.Item label="Phone">+1 234-567-8900</Descriptions.Item>
          <Descriptions.Item label="Role">Administrator</Descriptions.Item>
          <Descriptions.Item label="Bio" span>
            Software developer with 10 years of experience.
          </Descriptions.Item>
        </Descriptions>
      );

      expect(screen.getByText('Full Name')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Bio')).toBeInTheDocument();
    });

    it('order details 스타일 렌더링', () => {
      render(
        <Descriptions title="Order Details" bordered>
          <Descriptions.Item label="Order ID">#12345</Descriptions.Item>
          <Descriptions.Item label="Date">2025-01-15</Descriptions.Item>
          <Descriptions.Item label="Status">Shipped</Descriptions.Item>
          <Descriptions.Item label="Total">$299.00</Descriptions.Item>
        </Descriptions>
      );

      expect(screen.getByText('#12345')).toBeInTheDocument();
      expect(screen.getByText('$299.00')).toBeInTheDocument();
    });

    it('device info 스타일 렌더링', () => {
      render(
        <Descriptions
          title="Device Information"
          extra={<button>Configure</button>}
          column={3}
          size="sm"
        >
          <Descriptions.Item label="Device ID">DEV-001</Descriptions.Item>
          <Descriptions.Item label="Type">Temperature Sensor</Descriptions.Item>
          <Descriptions.Item label="Status">Online</Descriptions.Item>
          <Descriptions.Item label="Firmware">v2.1.0</Descriptions.Item>
          <Descriptions.Item label="Last Seen">2 mins ago</Descriptions.Item>
          <Descriptions.Item label="Location">Room 101</Descriptions.Item>
        </Descriptions>
      );

      expect(screen.getByText('DEV-001')).toBeInTheDocument();
      expect(screen.getByText('Temperature Sensor')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Configure' })).toBeInTheDocument();
    });
  });

  describe('접근성', () => {
    it('기본 Descriptions가 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Descriptions>
          <Descriptions.Item label="Name">John Doe</Descriptions.Item>
          <Descriptions.Item label="Email">john@example.com</Descriptions.Item>
        </Descriptions>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('title이 있는 Descriptions가 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Descriptions title="User Information">
          <Descriptions.Item label="Name">John</Descriptions.Item>
        </Descriptions>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('bordered Descriptions가 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Name">John</Descriptions.Item>
          <Descriptions.Item label="Email">john@example.com</Descriptions.Item>
        </Descriptions>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('모든 옵션이 있는 Descriptions가 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Descriptions
          title="Details"
          extra={<button>Edit</button>}
          bordered
          column={2}
          size="sm"
          vertical
        >
          <Descriptions.Item label="Name">John</Descriptions.Item>
          <Descriptions.Item label="Email" span>john@example.com</Descriptions.Item>
        </Descriptions>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
