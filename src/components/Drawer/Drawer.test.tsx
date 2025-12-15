/**
 * Drawer 컴포넌트 테스트
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Drawer } from './Drawer';

describe('Drawer', () => {
  beforeEach(() => {
    // Reset body styles
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  });

  afterEach(() => {
    cleanup();
    // Reset body styles after each test
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  });

  describe('렌더링', () => {
    it('open=true일 때 렌더링됨', () => {
      render(
        <Drawer open={true} onClose={() => {}}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('open=false일 때 렌더링되지 않음', () => {
      render(
        <Drawer open={false} onClose={() => {}}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      const { container } = render(
        <Drawer open={true} onClose={() => {}} className="custom-drawer">
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(document.querySelector('.custom-drawer')).toBeInTheDocument();
    });

    it('aria-label이 적용됨', () => {
      render(
        <Drawer open={true} onClose={() => {}} aria-label="Settings drawer">
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Settings drawer');
    });

    it('aria-labelledby가 적용됨', () => {
      render(
        <Drawer open={true} onClose={() => {}} aria-labelledby="drawer-title">
          <Drawer.Header>
            <h2 id="drawer-title">Title</h2>
          </Drawer.Header>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'drawer-title');
    });

    it('aria-modal="true"가 설정됨', () => {
      render(
        <Drawer open={true} onClose={() => {}}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });
  });

  describe('placement', () => {
    const placements = ['left', 'right', 'top', 'bottom'] as const;

    placements.forEach((placement) => {
      it(`${placement} placement가 정상 렌더링됨`, () => {
        render(
          <Drawer open={true} onClose={() => {}} placement={placement}>
            <Drawer.Body>Content</Drawer.Body>
          </Drawer>
        );

        expect(document.querySelector(`[class*="drawer-${placement}"]`)).toBeInTheDocument();
      });
    });

    it('기본 placement는 right', () => {
      render(
        <Drawer open={true} onClose={() => {}}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(document.querySelector('[class*="drawer-right"]')).toBeInTheDocument();
    });
  });

  describe('size', () => {
    it('sm size가 적용됨', () => {
      render(
        <Drawer open={true} onClose={() => {}} size="sm">
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(document.querySelector('[class*="drawer-sm"]')).toBeInTheDocument();
    });

    it('lg size가 적용됨', () => {
      render(
        <Drawer open={true} onClose={() => {}} size="lg">
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(document.querySelector('[class*="drawer-lg"]')).toBeInTheDocument();
    });

    it('md는 기본값 (size 클래스 없음)', () => {
      render(
        <Drawer open={true} onClose={() => {}} size="md">
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(document.querySelector('[class*="drawer-sm"]')).not.toBeInTheDocument();
      expect(document.querySelector('[class*="drawer-lg"]')).not.toBeInTheDocument();
    });
  });

  describe('closeOnOverlayClick', () => {
    it('overlay 클릭시 onClose가 호출됨', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <Drawer open={true} onClose={handleClose} closeOnOverlayClick={true}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      const overlay = document.querySelector('[class*="drawerOverlay"]');
      await user.click(overlay!);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('closeOnOverlayClick=false면 overlay 클릭해도 닫히지 않음', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <Drawer open={true} onClose={handleClose} closeOnOverlayClick={false}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      const overlay = document.querySelector('[class*="drawerOverlay"]');
      await user.click(overlay!);

      expect(handleClose).not.toHaveBeenCalled();
    });

    it('content 클릭시 닫히지 않음', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <Drawer open={true} onClose={handleClose}>
          <Drawer.Body>
            <button>Click me</button>
          </Drawer.Body>
        </Drawer>
      );

      await user.click(screen.getByText('Click me'));
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe('closeOnEsc', () => {
    it('Escape 키로 닫힘', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <Drawer open={true} onClose={handleClose} closeOnEsc={true}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      await user.keyboard('{Escape}');
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('closeOnEsc=false면 Escape 키로 닫히지 않음', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <Drawer open={true} onClose={handleClose} closeOnEsc={false}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      await user.keyboard('{Escape}');
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe('body scroll lock', () => {
    it('열릴 때 body overflow가 hidden이 됨', () => {
      render(
        <Drawer open={true} onClose={() => {}}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('닫힐 때 body overflow가 복원됨', () => {
      const { rerender } = render(
        <Drawer open={true} onClose={() => {}}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(document.body.style.overflow).toBe('hidden');

      rerender(
        <Drawer open={false} onClose={() => {}}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('Drawer.Header', () => {
    it('header가 렌더링됨', () => {
      render(
        <Drawer open={true} onClose={() => {}}>
          <Drawer.Header>Header Title</Drawer.Header>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(screen.getByText('Header Title')).toBeInTheDocument();
    });

    it('close 버튼이 표시됨', () => {
      const handleClose = vi.fn();

      render(
        <Drawer open={true} onClose={handleClose}>
          <Drawer.Header showClose onClose={handleClose}>Title</Drawer.Header>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('close 버튼 클릭시 onClose가 호출됨', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <Drawer open={true} onClose={handleClose}>
          <Drawer.Header showClose onClose={handleClose}>Title</Drawer.Header>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      await user.click(screen.getByRole('button', { name: /close/i }));
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('showClose=false면 close 버튼이 없음', () => {
      render(
        <Drawer open={true} onClose={() => {}}>
          <Drawer.Header showClose={false}>Title</Drawer.Header>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      render(
        <Drawer open={true} onClose={() => {}}>
          <Drawer.Header className="custom-header">Title</Drawer.Header>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      expect(document.querySelector('.custom-header')).toBeInTheDocument();
    });
  });

  describe('Drawer.Body', () => {
    it('body가 렌더링됨', () => {
      render(
        <Drawer open={true} onClose={() => {}}>
          <Drawer.Body>Body Content</Drawer.Body>
        </Drawer>
      );

      expect(screen.getByText('Body Content')).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      render(
        <Drawer open={true} onClose={() => {}}>
          <Drawer.Body className="custom-body">Content</Drawer.Body>
        </Drawer>
      );

      expect(document.querySelector('.custom-body')).toBeInTheDocument();
    });
  });

  describe('Drawer.Footer', () => {
    it('footer가 렌더링됨', () => {
      render(
        <Drawer open={true} onClose={() => {}}>
          <Drawer.Body>Content</Drawer.Body>
          <Drawer.Footer>
            <button>Save</button>
          </Drawer.Footer>
        </Drawer>
      );

      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      render(
        <Drawer open={true} onClose={() => {}}>
          <Drawer.Body>Content</Drawer.Body>
          <Drawer.Footer className="custom-footer">Footer</Drawer.Footer>
        </Drawer>
      );

      expect(document.querySelector('.custom-footer')).toBeInTheDocument();
    });
  });

  describe('복합 사용', () => {
    it('Header, Body, Footer가 함께 렌더링됨', () => {
      const handleClose = vi.fn();

      render(
        <Drawer open={true} onClose={handleClose} placement="right" size="lg">
          <Drawer.Header showClose onClose={handleClose}>Settings</Drawer.Header>
          <Drawer.Body>
            <p>Settings content here</p>
          </Drawer.Body>
          <Drawer.Footer>
            <button>Cancel</button>
            <button>Save</button>
          </Drawer.Footer>
        </Drawer>
      );

      expect(screen.getByText('Settings')).toBeInTheDocument();
      expect(screen.getByText('Settings content here')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    it('filter drawer 스타일 렌더링', () => {
      render(
        <Drawer open={true} onClose={() => {}} placement="left" size="sm">
          <Drawer.Header>Filters</Drawer.Header>
          <Drawer.Body>
            <div>Filter options</div>
          </Drawer.Body>
          <Drawer.Footer>
            <button>Apply Filters</button>
          </Drawer.Footer>
        </Drawer>
      );

      expect(screen.getByText('Filters')).toBeInTheDocument();
      expect(screen.getByText('Filter options')).toBeInTheDocument();
      expect(document.querySelector('[class*="drawer-left"]')).toBeInTheDocument();
    });
  });

  describe('접근성', () => {
    it('기본 Drawer가 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Drawer open={true} onClose={() => {}} aria-label="Test drawer">
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      // Need to check the portal content
      const results = await axe(document.body);
      expect(results).toHaveNoViolations();
    });

    it('Header가 있는 Drawer가 a11y 위반 사항이 없음', async () => {
      render(
        <Drawer open={true} onClose={() => {}} aria-labelledby="drawer-title">
          <Drawer.Header>
            <h2 id="drawer-title">Title</h2>
          </Drawer.Header>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer>
      );

      const results = await axe(document.body);
      expect(results).toHaveNoViolations();
    });
  });
});
