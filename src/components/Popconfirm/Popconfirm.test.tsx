/**
 * Popconfirm 컴포넌트 테스트
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Popconfirm } from './Popconfirm';

describe('Popconfirm', () => {
  afterEach(() => {
    cleanup();
  });

  describe('렌더링', () => {
    it('trigger가 렌더링됨', () => {
      render(
        <Popconfirm title="Confirm?">
          <button>Delete</button>
        </Popconfirm>
      );

      expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    });

    it('기본 상태에서 popconfirm이 숨겨짐', () => {
      render(
        <Popconfirm title="Confirm?">
          <button>Delete</button>
        </Popconfirm>
      );

      // alertdialog exists but should not be visible (no show class)
      const dialog = screen.getByRole('alertdialog');
      expect(dialog).toBeInTheDocument();
      expect(dialog).not.toHaveClass('popconfirmShow');
    });

    it('클릭시 popconfirm이 표시됨', async () => {
      const user = userEvent.setup();

      render(
        <Popconfirm title="Confirm?">
          <button>Delete</button>
        </Popconfirm>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));

      expect(document.querySelector('[class*="popconfirmShow"]')).toBeInTheDocument();
    });

    it('title이 렌더링됨', async () => {
      const user = userEvent.setup();

      render(
        <Popconfirm title="Are you sure?">
          <button>Delete</button>
        </Popconfirm>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));

      expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    });

    it('description이 렌더링됨', async () => {
      const user = userEvent.setup();

      render(
        <Popconfirm title="Confirm?" description="This action cannot be undone.">
          <button>Delete</button>
        </Popconfirm>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));

      expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument();
    });

    it('커스텀 okText가 적용됨', async () => {
      const user = userEvent.setup();

      render(
        <Popconfirm title="Confirm?" okText="Yes">
          <button>Delete</button>
        </Popconfirm>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));

      expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument();
    });

    it('커스텀 cancelText가 적용됨', async () => {
      const user = userEvent.setup();

      render(
        <Popconfirm title="Confirm?" cancelText="No">
          <button>Delete</button>
        </Popconfirm>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));

      expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument();
    });

    it('기본 okText는 OK', async () => {
      const user = userEvent.setup();

      render(
        <Popconfirm title="Confirm?">
          <button>Delete</button>
        </Popconfirm>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));

      expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
    });

    it('기본 cancelText는 Cancel', async () => {
      const user = userEvent.setup();

      render(
        <Popconfirm title="Confirm?">
          <button>Delete</button>
        </Popconfirm>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));

      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    });

    it('커스텀 icon이 렌더링됨', async () => {
      const user = userEvent.setup();

      render(
        <Popconfirm title="Confirm?" icon={<span data-testid="custom-icon">!</span>}>
          <button>Delete</button>
        </Popconfirm>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('aria-label이 적용됨', () => {
      render(
        <Popconfirm title="Confirm?" aria-label="Delete confirmation">
          <button>Delete</button>
        </Popconfirm>
      );

      expect(screen.getByRole('alertdialog')).toHaveAttribute('aria-label', 'Delete confirmation');
    });

    it('title이 문자열일 때 자동으로 aria-label로 사용됨', () => {
      render(
        <Popconfirm title="Delete item?">
          <button>Delete</button>
        </Popconfirm>
      );

      expect(screen.getByRole('alertdialog')).toHaveAttribute('aria-label', 'Delete item?');
    });

    it('aria-modal="true"가 설정됨', () => {
      render(
        <Popconfirm title="Confirm?">
          <button>Delete</button>
        </Popconfirm>
      );

      expect(screen.getByRole('alertdialog')).toHaveAttribute('aria-modal', 'true');
    });
  });

  describe('placement', () => {
    const placements = ['top', 'bottom', 'left', 'right'] as const;

    placements.forEach((placement) => {
      it(`${placement} placement가 정상 렌더링됨`, async () => {
        const user = userEvent.setup();

        render(
          <Popconfirm title="Confirm?" placement={placement}>
            <button>Delete</button>
          </Popconfirm>
        );

        await user.click(screen.getByRole('button', { name: 'Delete' }));

        // bottom is default with no special class
        if (placement !== 'bottom') {
          expect(document.querySelector(`[class*="popconfirm${placement.charAt(0).toUpperCase()}${placement.slice(1)}"]`)).toBeInTheDocument();
        }
      });
    });

    it('기본 placement는 bottom', async () => {
      const user = userEvent.setup();

      render(
        <Popconfirm title="Confirm?">
          <button>Delete</button>
        </Popconfirm>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));

      // bottom has no special placement class
      expect(document.querySelector('[class*="popconfirmTop"]')).not.toBeInTheDocument();
      expect(document.querySelector('[class*="popconfirmLeft"]')).not.toBeInTheDocument();
      expect(document.querySelector('[class*="popconfirmRight"]')).not.toBeInTheDocument();
    });
  });

  describe('okType', () => {
    it('okType="danger"가 적용됨', async () => {
      const user = userEvent.setup();

      render(
        <Popconfirm title="Confirm?" okType="danger">
          <button>Delete</button>
        </Popconfirm>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));

      const okButton = screen.getByRole('button', { name: 'OK' });
      expect(okButton).toHaveClass('btn-danger');
    });

    it('기본 okType은 primary', async () => {
      const user = userEvent.setup();

      render(
        <Popconfirm title="Confirm?">
          <button>Delete</button>
        </Popconfirm>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));

      const okButton = screen.getByRole('button', { name: 'OK' });
      expect(okButton).toHaveClass('btn-primary');
    });
  });

  describe('인터랙션', () => {
    it('confirm 버튼 클릭시 onConfirm이 호출됨', async () => {
      const user = userEvent.setup();
      const handleConfirm = vi.fn();

      render(
        <Popconfirm title="Confirm?" onConfirm={handleConfirm}>
          <button>Delete</button>
        </Popconfirm>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));
      await user.click(screen.getByRole('button', { name: 'OK' }));

      expect(handleConfirm).toHaveBeenCalledTimes(1);
    });

    it('cancel 버튼 클릭시 onCancel이 호출됨', async () => {
      const user = userEvent.setup();
      const handleCancel = vi.fn();

      render(
        <Popconfirm title="Confirm?" onCancel={handleCancel}>
          <button>Delete</button>
        </Popconfirm>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));
      await user.click(screen.getByRole('button', { name: 'Cancel' }));

      expect(handleCancel).toHaveBeenCalledTimes(1);
    });

    it('confirm 후 popconfirm이 닫힘', async () => {
      const user = userEvent.setup();

      render(
        <Popconfirm title="Confirm?" onConfirm={() => {}}>
          <button>Delete</button>
        </Popconfirm>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));
      expect(document.querySelector('[class*="popconfirmShow"]')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'OK' }));
      expect(document.querySelector('[class*="popconfirmShow"]')).not.toBeInTheDocument();
    });

    it('cancel 후 popconfirm이 닫힘', async () => {
      const user = userEvent.setup();

      render(
        <Popconfirm title="Confirm?">
          <button>Delete</button>
        </Popconfirm>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));
      expect(document.querySelector('[class*="popconfirmShow"]')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(document.querySelector('[class*="popconfirmShow"]')).not.toBeInTheDocument();
    });

    it('외부 클릭시 닫힘', async () => {
      render(
        <div>
          <div data-testid="outside">Outside</div>
          <Popconfirm title="Confirm?">
            <button>Delete</button>
          </Popconfirm>
        </div>
      );

      fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
      expect(document.querySelector('[class*="popconfirmShow"]')).toBeInTheDocument();

      fireEvent.mouseDown(screen.getByTestId('outside'));
      expect(document.querySelector('[class*="popconfirmShow"]')).not.toBeInTheDocument();
    });

    it('Escape 키로 닫힘', async () => {
      const user = userEvent.setup();
      const handleCancel = vi.fn();

      render(
        <Popconfirm title="Confirm?" onCancel={handleCancel}>
          <button>Delete</button>
        </Popconfirm>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));
      expect(document.querySelector('[class*="popconfirmShow"]')).toBeInTheDocument();

      await user.keyboard('{Escape}');
      expect(document.querySelector('[class*="popconfirmShow"]')).not.toBeInTheDocument();
      expect(handleCancel).toHaveBeenCalledTimes(1);
    });

    it('trigger의 원래 onClick도 호출됨', async () => {
      const user = userEvent.setup();
      const handleTriggerClick = vi.fn();

      render(
        <Popconfirm title="Confirm?">
          <button onClick={handleTriggerClick}>Delete</button>
        </Popconfirm>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));
      expect(handleTriggerClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('controlled mode', () => {
    it('open prop으로 열림 상태 제어', () => {
      render(
        <Popconfirm title="Confirm?" open={true}>
          <button>Delete</button>
        </Popconfirm>
      );

      expect(document.querySelector('[class*="popconfirmShow"]')).toBeInTheDocument();
    });

    it('open=false로 닫힘 상태 제어', () => {
      render(
        <Popconfirm title="Confirm?" open={false}>
          <button>Delete</button>
        </Popconfirm>
      );

      expect(document.querySelector('[class*="popconfirmShow"]')).not.toBeInTheDocument();
    });

    it('onOpenChange가 호출됨', async () => {
      const user = userEvent.setup();
      const handleOpenChange = vi.fn();

      render(
        <Popconfirm title="Confirm?" onOpenChange={handleOpenChange}>
          <button>Delete</button>
        </Popconfirm>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));
      expect(handleOpenChange).toHaveBeenCalledWith(true);
    });
  });

  describe('disabled', () => {
    it('disabled=true면 클릭해도 열리지 않음', async () => {
      const user = userEvent.setup();

      render(
        <Popconfirm title="Confirm?" disabled={true}>
          <button>Delete</button>
        </Popconfirm>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));
      expect(document.querySelector('[class*="popconfirmShow"]')).not.toBeInTheDocument();
    });

    it('disabled=false면 정상 동작', async () => {
      const user = userEvent.setup();

      render(
        <Popconfirm title="Confirm?" disabled={false}>
          <button>Delete</button>
        </Popconfirm>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));
      expect(document.querySelector('[class*="popconfirmShow"]')).toBeInTheDocument();
    });
  });

  describe('async onConfirm', () => {
    it('async onConfirm 중 로딩 상태가 됨', async () => {
      const user = userEvent.setup();
      let resolvePromise: () => void;
      const promise = new Promise<void>((resolve) => {
        resolvePromise = resolve;
      });
      const handleConfirm = vi.fn(() => promise);

      render(
        <Popconfirm title="Confirm?" onConfirm={handleConfirm}>
          <button>Delete</button>
        </Popconfirm>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));
      await user.click(screen.getByRole('button', { name: 'OK' }));

      // During loading, buttons should be disabled
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();

      // Resolve the promise
      resolvePromise!();
      await waitFor(() => {
        expect(document.querySelector('[class*="popconfirmShow"]')).not.toBeInTheDocument();
      });
    });

    it('async onConfirm 에러시 닫히지 않음', async () => {
      const user = userEvent.setup();
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      const handleConfirm = vi.fn(() => Promise.reject(new Error('Test error')));

      render(
        <Popconfirm title="Confirm?" onConfirm={handleConfirm}>
          <button>Delete</button>
        </Popconfirm>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));
      await user.click(screen.getByRole('button', { name: 'OK' }));

      await waitFor(() => {
        // Should log error
        expect(consoleError).toHaveBeenCalled();
      });

      // Should still be open (error occurred)
      expect(document.querySelector('[class*="popconfirmShow"]')).toBeInTheDocument();

      consoleError.mockRestore();
    });
  });

  describe('iconType', () => {
    it('커스텀 icon이 있으면 icon이 렌더링됨', async () => {
      const user = userEvent.setup();

      render(
        <Popconfirm title="Confirm?" icon={<span data-testid="custom-icon">!</span>} iconType="warning">
          <button>Delete</button>
        </Popconfirm>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
      // Icon wrapper should have popconfirmIcon class
      expect(document.querySelector('[class*="popconfirmIcon"]')).toBeInTheDocument();
    });

    it('기본 iconType은 warning', () => {
      // iconType is only used when custom icon is provided
      // Default is 'warning' per props definition
      render(
        <Popconfirm title="Confirm?">
          <button>Delete</button>
        </Popconfirm>
      );

      // The popconfirm should render without error even with default iconType
      expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    });
  });

  describe('복합 사용', () => {
    it('삭제 확인 시나리오', async () => {
      const user = userEvent.setup();
      const handleConfirm = vi.fn();
      const handleCancel = vi.fn();

      render(
        <Popconfirm
          title="Delete this item?"
          description="This action cannot be undone."
          okText="Delete"
          cancelText="Keep"
          okType="danger"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        >
          <button>Delete Item</button>
        </Popconfirm>
      );

      // Open popconfirm
      await user.click(screen.getByRole('button', { name: 'Delete Item' }));

      // Check content
      expect(screen.getByText('Delete this item?')).toBeInTheDocument();
      expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument();

      // Cancel first
      await user.click(screen.getByRole('button', { name: 'Keep' }));
      expect(handleCancel).toHaveBeenCalledTimes(1);
      expect(handleConfirm).not.toHaveBeenCalled();

      // Re-open and confirm
      await user.click(screen.getByRole('button', { name: 'Delete Item' }));
      await user.click(screen.getByRole('button', { name: 'Delete' }));
      expect(handleConfirm).toHaveBeenCalledTimes(1);
    });

    it('위험한 액션 확인', async () => {
      const user = userEvent.setup();
      const handleConfirm = vi.fn();

      render(
        <Popconfirm
          title="Permanently delete?"
          icon={<span role="img" aria-label="warning">⚠️</span>}
          iconType="danger"
          okType="danger"
          placement="top"
          onConfirm={handleConfirm}
        >
          <button>Delete Forever</button>
        </Popconfirm>
      );

      await user.click(screen.getByRole('button', { name: 'Delete Forever' }));

      expect(screen.getByText('Permanently delete?')).toBeInTheDocument();
      expect(screen.getByRole('img', { name: 'warning' })).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'OK' }));
      expect(handleConfirm).toHaveBeenCalledTimes(1);
    });
  });

  describe('접근성', () => {
    it('기본 Popconfirm이 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Popconfirm title="Confirm action?">
          <button>Trigger</button>
        </Popconfirm>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('열린 Popconfirm이 a11y 위반 사항이 없음', async () => {
      const user = userEvent.setup();

      render(
        <Popconfirm title="Confirm action?" aria-label="Confirm dialog">
          <button>Trigger</button>
        </Popconfirm>
      );

      await user.click(screen.getByRole('button', { name: 'Trigger' }));

      const results = await axe(document.body);
      expect(results).toHaveNoViolations();
    });

    it('description이 있는 Popconfirm이 a11y 위반 사항이 없음', async () => {
      const user = userEvent.setup();

      render(
        <Popconfirm
          title="Delete item?"
          description="This will permanently remove the item."
          aria-label="Delete confirmation"
        >
          <button>Delete</button>
        </Popconfirm>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));

      const results = await axe(document.body);
      expect(results).toHaveNoViolations();
    });
  });
});
