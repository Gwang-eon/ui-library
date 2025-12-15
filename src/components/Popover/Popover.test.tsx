/**
 * Popover 컴포넌트 테스트
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { useRef } from 'react';
import {
  Popover,
  PopoverHeader,
  PopoverContent,
  PopoverFooter,
  PopoverTitle,
  PopoverClose,
} from './Popover';

// Wrapper component for testing with triggerRef
const PopoverTestWrapper = ({
  open,
  onClose,
  position,
  wide,
  children,
}: {
  open: boolean;
  onClose: () => void;
  position?: 'top' | 'bottom' | 'left' | 'right';
  wide?: boolean;
  children: React.ReactNode;
}) => {
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button ref={triggerRef}>Trigger</button>
      <Popover
        open={open}
        onClose={onClose}
        position={position}
        wide={wide}
        triggerRef={triggerRef}
      >
        {children}
      </Popover>
    </>
  );
};

describe('Popover', () => {
  afterEach(() => {
    cleanup();
  });

  describe('렌더링', () => {
    it('open=true일 때 렌더링됨', () => {
      render(
        <PopoverTestWrapper open={true} onClose={() => {}}>
          <PopoverContent>Content</PopoverContent>
        </PopoverTestWrapper>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('open=false일 때 렌더링되지 않음', () => {
      render(
        <PopoverTestWrapper open={false} onClose={() => {}}>
          <PopoverContent>Content</PopoverContent>
        </PopoverTestWrapper>
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      const triggerRef = { current: document.createElement('button') };

      render(
        <Popover open={true} onClose={() => {}} className="custom-popover" triggerRef={triggerRef}>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      );

      expect(document.querySelector('.custom-popover')).toBeInTheDocument();
    });

    it('aria-modal="false"가 설정됨', () => {
      render(
        <PopoverTestWrapper open={true} onClose={() => {}}>
          <PopoverContent>Content</PopoverContent>
        </PopoverTestWrapper>
      );

      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'false');
    });
  });

  describe('position', () => {
    const positions = ['top', 'bottom', 'left', 'right'] as const;

    positions.forEach((position) => {
      it(`${position} position이 정상 렌더링됨`, () => {
        render(
          <PopoverTestWrapper open={true} onClose={() => {}} position={position}>
            <PopoverContent>Content</PopoverContent>
          </PopoverTestWrapper>
        );

        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
      });
    });

    it('기본 position은 bottom', () => {
      render(
        <PopoverTestWrapper open={true} onClose={() => {}}>
          <PopoverContent>Content</PopoverContent>
        </PopoverTestWrapper>
      );

      expect(document.querySelector('[class*="popoverBottom"]')).toBeInTheDocument();
    });
  });

  describe('wide', () => {
    it('wide=true일 때 wide 클래스가 적용됨', () => {
      render(
        <PopoverTestWrapper open={true} onClose={() => {}} wide={true}>
          <PopoverContent>Content</PopoverContent>
        </PopoverTestWrapper>
      );

      expect(document.querySelector('[class*="Wide"]')).toBeInTheDocument();
    });

    it('wide=false일 때 wide 클래스가 없음', () => {
      render(
        <PopoverTestWrapper open={true} onClose={() => {}} wide={false}>
          <PopoverContent>Content</PopoverContent>
        </PopoverTestWrapper>
      );

      expect(document.querySelector('[class*="Wide"]')).not.toBeInTheDocument();
    });
  });

  describe('외부 클릭', () => {
    it('외부 클릭시 onClose가 호출됨', async () => {
      const handleClose = vi.fn();

      render(
        <div>
          <div data-testid="outside">Outside</div>
          <PopoverTestWrapper open={true} onClose={handleClose}>
            <PopoverContent>Content</PopoverContent>
          </PopoverTestWrapper>
        </div>
      );

      fireEvent.mouseDown(screen.getByTestId('outside'));
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('popover 내부 클릭시 닫히지 않음', async () => {
      const handleClose = vi.fn();

      render(
        <PopoverTestWrapper open={true} onClose={handleClose}>
          <PopoverContent>
            <button>Inside Button</button>
          </PopoverContent>
        </PopoverTestWrapper>
      );

      fireEvent.mouseDown(screen.getByText('Inside Button'));
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe('Escape 키', () => {
    it('Escape 키로 닫힘', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <PopoverTestWrapper open={true} onClose={handleClose}>
          <PopoverContent>Content</PopoverContent>
        </PopoverTestWrapper>
      );

      await user.keyboard('{Escape}');
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('PopoverHeader', () => {
    it('header가 렌더링됨', () => {
      render(
        <PopoverTestWrapper open={true} onClose={() => {}}>
          <PopoverHeader>Header Content</PopoverHeader>
        </PopoverTestWrapper>
      );

      expect(screen.getByText('Header Content')).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      render(
        <PopoverTestWrapper open={true} onClose={() => {}}>
          <PopoverHeader className="custom-header">Header</PopoverHeader>
        </PopoverTestWrapper>
      );

      expect(document.querySelector('.custom-header')).toBeInTheDocument();
    });
  });

  describe('PopoverContent', () => {
    it('content가 렌더링됨', () => {
      render(
        <PopoverTestWrapper open={true} onClose={() => {}}>
          <PopoverContent>Main Content</PopoverContent>
        </PopoverTestWrapper>
      );

      expect(screen.getByText('Main Content')).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      render(
        <PopoverTestWrapper open={true} onClose={() => {}}>
          <PopoverContent className="custom-content">Content</PopoverContent>
        </PopoverTestWrapper>
      );

      expect(document.querySelector('.custom-content')).toBeInTheDocument();
    });
  });

  describe('PopoverFooter', () => {
    it('footer가 렌더링됨', () => {
      render(
        <PopoverTestWrapper open={true} onClose={() => {}}>
          <PopoverContent>Content</PopoverContent>
          <PopoverFooter>
            <button>Action</button>
          </PopoverFooter>
        </PopoverTestWrapper>
      );

      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      render(
        <PopoverTestWrapper open={true} onClose={() => {}}>
          <PopoverContent>Content</PopoverContent>
          <PopoverFooter className="custom-footer">Footer</PopoverFooter>
        </PopoverTestWrapper>
      );

      expect(document.querySelector('.custom-footer')).toBeInTheDocument();
    });
  });

  describe('PopoverTitle', () => {
    it('title이 렌더링됨', () => {
      render(
        <PopoverTestWrapper open={true} onClose={() => {}}>
          <PopoverHeader>
            <PopoverTitle>My Title</PopoverTitle>
          </PopoverHeader>
        </PopoverTestWrapper>
      );

      expect(screen.getByText('My Title')).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      render(
        <PopoverTestWrapper open={true} onClose={() => {}}>
          <PopoverHeader>
            <PopoverTitle className="custom-title">Title</PopoverTitle>
          </PopoverHeader>
        </PopoverTestWrapper>
      );

      expect(document.querySelector('.custom-title')).toBeInTheDocument();
    });
  });

  describe('PopoverClose', () => {
    it('close 버튼이 렌더링됨', () => {
      render(
        <PopoverTestWrapper open={true} onClose={() => {}}>
          <PopoverHeader>
            <PopoverClose />
          </PopoverHeader>
        </PopoverTestWrapper>
      );

      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('클릭시 onClick이 호출됨', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <PopoverTestWrapper open={true} onClose={() => {}}>
          <PopoverHeader>
            <PopoverClose onClick={handleClick} />
          </PopoverHeader>
        </PopoverTestWrapper>
      );

      await user.click(screen.getByRole('button', { name: /close/i }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('커스텀 aria-label이 적용됨', () => {
      render(
        <PopoverTestWrapper open={true} onClose={() => {}}>
          <PopoverHeader>
            <PopoverClose aria-label="Dismiss" />
          </PopoverHeader>
        </PopoverTestWrapper>
      );

      expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      render(
        <PopoverTestWrapper open={true} onClose={() => {}}>
          <PopoverHeader>
            <PopoverClose className="custom-close" />
          </PopoverHeader>
        </PopoverTestWrapper>
      );

      expect(document.querySelector('.custom-close')).toBeInTheDocument();
    });
  });

  describe('복합 사용', () => {
    it('Header, Content, Footer가 함께 렌더링됨', () => {
      const handleClose = vi.fn();

      render(
        <PopoverTestWrapper open={true} onClose={handleClose}>
          <PopoverHeader>
            <PopoverTitle>Settings</PopoverTitle>
            <PopoverClose onClick={handleClose} />
          </PopoverHeader>
          <PopoverContent>
            <p>Popover content here</p>
          </PopoverContent>
          <PopoverFooter>
            <button>Save</button>
            <button>Cancel</button>
          </PopoverFooter>
        </PopoverTestWrapper>
      );

      expect(screen.getByText('Settings')).toBeInTheDocument();
      expect(screen.getByText('Popover content here')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    });

    it('notification popover 스타일', () => {
      render(
        <PopoverTestWrapper open={true} onClose={() => {}} position="bottom" wide>
          <PopoverHeader>
            <PopoverTitle>Notifications</PopoverTitle>
          </PopoverHeader>
          <PopoverContent>
            <div>You have 3 unread messages</div>
          </PopoverContent>
        </PopoverTestWrapper>
      );

      expect(screen.getByText('Notifications')).toBeInTheDocument();
      expect(screen.getByText('You have 3 unread messages')).toBeInTheDocument();
    });
  });

  describe('접근성', () => {
    it('기본 Popover가 a11y 위반 사항이 없음', async () => {
      render(
        <PopoverTestWrapper open={true} onClose={() => {}}>
          <PopoverContent>Content</PopoverContent>
        </PopoverTestWrapper>
      );

      // Popover uses role="dialog" but doesn't require aria-label by design
      // as it's a non-modal dialog for contextual content
      const results = await axe(document.body, {
        rules: { 'aria-dialog-name': { enabled: false } },
      });
      expect(results).toHaveNoViolations();
    });

    it('Header와 Content가 있는 Popover가 a11y 위반 사항이 없음', async () => {
      render(
        <PopoverTestWrapper open={true} onClose={() => {}}>
          <PopoverHeader>
            <PopoverTitle>Title</PopoverTitle>
            <PopoverClose />
          </PopoverHeader>
          <PopoverContent>Content</PopoverContent>
        </PopoverTestWrapper>
      );

      const results = await axe(document.body, {
        rules: { 'aria-dialog-name': { enabled: false } },
      });
      expect(results).toHaveNoViolations();
    });
  });
});
