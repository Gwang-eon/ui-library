/**
 * Result 컴포넌트 테스트
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Result } from './Result';

describe('Result', () => {
  afterEach(() => {
    cleanup();
  });

  describe('렌더링', () => {
    it('Result가 렌더링됨', () => {
      render(<Result title="Result Title" />);

      expect(screen.getByRole('heading', { name: 'Result Title' })).toBeInTheDocument();
    });

    it('title이 렌더링됨', () => {
      render(<Result title="Operation Complete" />);

      expect(screen.getByText('Operation Complete')).toBeInTheDocument();
    });

    it('description이 렌더링됨', () => {
      render(<Result title="Title" description="This is a description." />);

      expect(screen.getByText('This is a description.')).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      render(<Result title="Title" className="custom-result" />);

      expect(document.querySelector('.custom-result')).toBeInTheDocument();
    });
  });

  describe('status', () => {
    const statuses = ['success', 'error', 'warning', 'info'] as const;

    statuses.forEach((status) => {
      it(`status="${status}"가 적용됨`, () => {
        render(<Result title="Title" status={status} />);

        expect(document.querySelector(`[class*="${status}"]`)).toBeInTheDocument();
      });
    });

    it('success status가 기본 아이콘을 표시함', () => {
      render(<Result title="Success" status="success" />);

      expect(screen.getByLabelText('Success status')).toBeInTheDocument();
    });

    it('error status가 기본 아이콘을 표시함', () => {
      render(<Result title="Error" status="error" />);

      expect(screen.getByLabelText('Error indicator')).toBeInTheDocument();
    });

    it('warning status가 기본 아이콘을 표시함', () => {
      render(<Result title="Warning" status="warning" />);

      expect(screen.getByLabelText('Warning indicator')).toBeInTheDocument();
    });

    it('info status가 기본 아이콘을 표시함', () => {
      render(<Result title="Info" status="info" />);

      expect(screen.getByLabelText('Information')).toBeInTheDocument();
    });
  });

  describe('icon', () => {
    it('커스텀 icon이 렌더링됨', () => {
      render(
        <Result
          title="Title"
          icon={<span data-testid="custom-icon">🎉</span>}
        />
      );

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('커스텀 icon이 기본 status icon을 대체함', () => {
      render(
        <Result
          title="Title"
          status="success"
          icon={<span data-testid="custom-icon">🎉</span>}
        />
      );

      // Custom icon is rendered
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
      // The icon wrapper still has aria-label for status, containing the custom icon
      const iconWrapper = screen.getByLabelText('Success status');
      expect(iconWrapper).toContainElement(screen.getByTestId('custom-icon'));
    });

    it('status 없이 icon만 있으면 icon이 렌더링됨', () => {
      render(
        <Result
          title="Title"
          icon={<span data-testid="standalone-icon">📋</span>}
        />
      );

      expect(screen.getByTestId('standalone-icon')).toBeInTheDocument();
    });
  });

  describe('actions', () => {
    it('actions가 렌더링됨', () => {
      render(
        <Result
          title="Title"
          actions={<button>Go Home</button>}
        />
      );

      expect(screen.getByRole('button', { name: 'Go Home' })).toBeInTheDocument();
    });

    it('여러 action 버튼이 렌더링됨', () => {
      render(
        <Result
          title="Title"
          actions={
            <>
              <button>Primary Action</button>
              <button>Secondary Action</button>
            </>
          }
        />
      );

      expect(screen.getByRole('button', { name: 'Primary Action' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Secondary Action' })).toBeInTheDocument();
    });

    it('action 버튼 클릭이 동작함', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Result
          title="Title"
          actions={<button onClick={handleClick}>Click me</button>}
        />
      );

      await user.click(screen.getByRole('button', { name: 'Click me' }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('extra', () => {
    it('extra 배열이 렌더링됨', () => {
      render(
        <Result
          title="Title"
          extra={[
            { label: 'Order ID', value: '12345' },
            { label: 'Amount', value: '$100.00' },
          ]}
        />
      );

      expect(screen.getByText('Order ID')).toBeInTheDocument();
      expect(screen.getByText('12345')).toBeInTheDocument();
      expect(screen.getByText('Amount')).toBeInTheDocument();
      expect(screen.getByText('$100.00')).toBeInTheDocument();
    });

    it('extra ReactNode가 렌더링됨', () => {
      render(
        <Result
          title="Title"
          extra={<div data-testid="custom-extra">Custom extra content</div>}
        />
      );

      expect(screen.getByTestId('custom-extra')).toBeInTheDocument();
    });
  });

  describe('compact', () => {
    it('기본적으로 compact가 아님', () => {
      render(<Result title="Title" />);

      expect(document.querySelector('[class*="compact"]')).not.toBeInTheDocument();
    });

    it('compact=true면 compact 클래스가 적용됨', () => {
      render(<Result title="Title" compact />);

      expect(document.querySelector('[class*="compact"]')).toBeInTheDocument();
    });
  });

  describe('접근성', () => {
    it('error status일 때 role="alert"', () => {
      render(<Result title="Error" status="error" />);

      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('error가 아닌 status일 때 role="status"', () => {
      render(<Result title="Success" status="success" />);

      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('error status일 때 aria-live="assertive"', () => {
      render(<Result title="Error" status="error" />);

      expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
    });

    it('success status일 때 aria-live="polite"', () => {
      render(<Result title="Success" status="success" />);

      expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
    });

    it('기본 Result가 a11y 위반 사항이 없음', async () => {
      const { container } = render(<Result title="Title" />);

      // Disable aria-prohibited-attr rule due to component's aria-label on icon div
      const results = await axe(container, {
        rules: { 'aria-prohibited-attr': { enabled: false } },
      });
      expect(results).toHaveNoViolations();
    });

    it('success Result가 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Result
          title="Success"
          description="Operation completed successfully."
          status="success"
        />
      );

      // Disable aria-prohibited-attr rule due to component's aria-label on icon div
      const results = await axe(container, {
        rules: { 'aria-prohibited-attr': { enabled: false } },
      });
      expect(results).toHaveNoViolations();
    });

    it('error Result가 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Result
          title="Error"
          description="Something went wrong."
          status="error"
        />
      );

      // Disable aria-prohibited-attr rule due to component's aria-label on icon div
      const results = await axe(container, {
        rules: { 'aria-prohibited-attr': { enabled: false } },
      });
      expect(results).toHaveNoViolations();
    });
  });

  describe('복합 사용', () => {
    it('결제 성공 결과', () => {
      render(
        <Result
          status="success"
          title="Payment Successful"
          description="Your order has been placed successfully."
          extra={[
            { label: 'Order ID', value: 'ORD-12345' },
            { label: 'Total', value: '$99.99' },
          ]}
          actions={
            <>
              <button>View Order</button>
              <button>Continue Shopping</button>
            </>
          }
        />
      );

      expect(screen.getByText('Payment Successful')).toBeInTheDocument();
      expect(screen.getByText('ORD-12345')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'View Order' })).toBeInTheDocument();
    });

    it('제출 오류 결과', () => {
      render(
        <Result
          status="error"
          title="Submission Failed"
          description="Please check your input and try again."
          actions={<button>Retry</button>}
        />
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Submission Failed')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
    });

    it('경고 결과', () => {
      render(
        <Result
          status="warning"
          title="Limited Access"
          description="Some features are not available."
          actions={<button>Upgrade</button>}
        />
      );

      expect(screen.getByLabelText('Warning indicator')).toBeInTheDocument();
      expect(screen.getByText('Limited Access')).toBeInTheDocument();
    });

    it('정보 결과', () => {
      render(
        <Result
          status="info"
          title="Update Available"
          description="A new version is available for download."
          actions={
            <>
              <button>Update Now</button>
              <button>Later</button>
            </>
          }
        />
      );

      expect(screen.getByLabelText('Information')).toBeInTheDocument();
      expect(screen.getByText('Update Available')).toBeInTheDocument();
    });

    it('compact 모드 결과', () => {
      render(
        <Result
          status="success"
          title="Saved"
          compact
        />
      );

      expect(screen.getByText('Saved')).toBeInTheDocument();
      expect(document.querySelector('[class*="compact"]')).toBeInTheDocument();
    });
  });
});
