/**
 * Modal 컴포넌트 테스트
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from './Modal';

describe('Modal', () => {
  const defaultProps = {
    open: true,
    onClose: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Create portal root if it doesn't exist
    if (!document.getElementById('portal-root')) {
      const portalRoot = document.createElement('div');
      portalRoot.setAttribute('id', 'portal-root');
      document.body.appendChild(portalRoot);
    }
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  describe('렌더링', () => {
    it('open이 true일 때 렌더링됨', () => {
      render(
        <Modal {...defaultProps}>
          <div>모달 내용</div>
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('모달 내용')).toBeInTheDocument();
    });

    it('open이 false일 때 렌더링되지 않음', () => {
      render(
        <Modal {...defaultProps} open={false}>
          <div>모달 내용</div>
        </Modal>
      );
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('aria-modal이 true임', () => {
      render(
        <Modal {...defaultProps}>
          <div>모달 내용</div>
        </Modal>
      );
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });
  });

  describe('sizes', () => {
    const sizes = ['sm', 'md', 'lg', 'full'] as const;

    sizes.forEach((size) => {
      it(`${size} size가 정상 렌더링됨`, () => {
        render(
          <Modal {...defaultProps} size={size}>
            <div>모달 내용</div>
          </Modal>
        );
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });
  });

  describe('닫기 동작', () => {
    it('오버레이 클릭으로 닫힘', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(
        <Modal open={true} onClose={onClose}>
          <div>모달 내용</div>
        </Modal>
      );

      // Click on overlay (the presentation element)
      const overlay = screen.getByRole('presentation');
      await user.click(overlay);

      expect(onClose).toHaveBeenCalled();
    });

    it('closeOnOverlayClick이 false면 오버레이 클릭으로 닫히지 않음', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(
        <Modal open={true} onClose={onClose} closeOnOverlayClick={false}>
          <div>모달 내용</div>
        </Modal>
      );

      const overlay = screen.getByRole('presentation');
      await user.click(overlay);

      expect(onClose).not.toHaveBeenCalled();
    });

    it('Escape 키로 닫힘', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(
        <Modal open={true} onClose={onClose}>
          <div>모달 내용</div>
        </Modal>
      );

      await user.keyboard('{Escape}');

      expect(onClose).toHaveBeenCalled();
    });

    it('closeOnEscape이 false면 Escape로 닫히지 않음', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(
        <Modal open={true} onClose={onClose} closeOnEscape={false}>
          <div>모달 내용</div>
        </Modal>
      );

      await user.keyboard('{Escape}');

      expect(onClose).not.toHaveBeenCalled();
    });

    it('내부 클릭으로 닫히지 않음', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(
        <Modal open={true} onClose={onClose}>
          <div data-testid="modal-content">모달 내용</div>
        </Modal>
      );

      await user.click(screen.getByTestId('modal-content'));

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('body scroll 잠금', () => {
    it('열릴 때 body overflow가 hidden으로 설정됨', () => {
      render(
        <Modal {...defaultProps}>
          <div>모달 내용</div>
        </Modal>
      );
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('닫힐 때 body overflow가 복원됨', () => {
      const { rerender } = render(
        <Modal {...defaultProps}>
          <div>모달 내용</div>
        </Modal>
      );

      expect(document.body.style.overflow).toBe('hidden');

      rerender(
        <Modal {...defaultProps} open={false}>
          <div>모달 내용</div>
        </Modal>
      );

      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('className', () => {
    it('추가 className이 적용됨', () => {
      render(
        <Modal {...defaultProps} className="custom-modal">
          <div>모달 내용</div>
        </Modal>
      );
      expect(screen.getByRole('dialog')).toHaveClass('custom-modal');
    });
  });

  describe('접근성', () => {
    it('a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Modal {...defaultProps}>
          <ModalHeader onClose={defaultProps.onClose}>
            <ModalTitle>접근성 테스트</ModalTitle>
          </ModalHeader>
          <ModalBody>모달 본문</ModalBody>
          <ModalFooter>
            <button>확인</button>
          </ModalFooter>
        </Modal>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('role이 dialog임', () => {
      render(
        <Modal {...defaultProps}>
          <div>모달 내용</div>
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });
});

describe('ModalHeader', () => {
  it('children이 렌더링됨', () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <ModalHeader>
          <span>헤더 내용</span>
        </ModalHeader>
      </Modal>
    );
    expect(screen.getByText('헤더 내용')).toBeInTheDocument();
  });

  it('닫기 버튼이 렌더링됨', () => {
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose}>
        <ModalHeader onClose={onClose}>
          <span>헤더</span>
        </ModalHeader>
      </Modal>
    );
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('닫기 버튼 클릭 시 onClose 호출', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose}>
        <ModalHeader onClose={onClose}>
          <span>헤더</span>
        </ModalHeader>
      </Modal>
    );

    await user.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('showCloseButton이 false면 닫기 버튼이 없음', () => {
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose}>
        <ModalHeader onClose={onClose} showCloseButton={false}>
          <span>헤더</span>
        </ModalHeader>
      </Modal>
    );
    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
  });

  it('className이 적용됨', () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <ModalHeader className="custom-header">
          <span>헤더</span>
        </ModalHeader>
      </Modal>
    );
    expect(screen.getByText('헤더').parentElement).toHaveClass('custom-header');
  });
});

describe('ModalTitle', () => {
  it('타이틀이 렌더링됨', () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <ModalHeader>
          <ModalTitle>모달 제목</ModalTitle>
        </ModalHeader>
      </Modal>
    );
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('모달 제목');
  });
});

describe('ModalBody', () => {
  it('children이 렌더링됨', () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <ModalBody>
          <p>본문 내용</p>
        </ModalBody>
      </Modal>
    );
    expect(screen.getByText('본문 내용')).toBeInTheDocument();
  });

  it('className이 적용됨', () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <ModalBody className="custom-body">
          <p>본문</p>
        </ModalBody>
      </Modal>
    );
    expect(screen.getByText('본문').parentElement).toHaveClass('custom-body');
  });

  it('style이 적용됨', () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <ModalBody style={{ maxHeight: '300px' }}>
          <p>본문</p>
        </ModalBody>
      </Modal>
    );
    expect(screen.getByText('본문').parentElement).toHaveStyle({ maxHeight: '300px' });
  });
});

describe('ModalFooter', () => {
  it('children이 렌더링됨', () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <ModalFooter>
          <button>확인</button>
          <button>취소</button>
        </ModalFooter>
      </Modal>
    );
    expect(screen.getByText('확인')).toBeInTheDocument();
    expect(screen.getByText('취소')).toBeInTheDocument();
  });

  it('className이 적용됨', () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <ModalFooter className="custom-footer">
          <button>확인</button>
        </ModalFooter>
      </Modal>
    );
    expect(screen.getByText('확인').parentElement).toHaveClass('custom-footer');
  });
});

describe('Modal 통합 테스트', () => {
  it('전체 구조가 정상 동작함', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal open={true} onClose={onClose}>
        <ModalHeader onClose={onClose}>
          <ModalTitle>확인</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p>정말 삭제하시겠습니까?</p>
        </ModalBody>
        <ModalFooter>
          <button onClick={onClose}>취소</button>
          <button>삭제</button>
        </ModalFooter>
      </Modal>
    );

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('확인');
    expect(screen.getByText('정말 삭제하시겠습니까?')).toBeInTheDocument();
    expect(screen.getByText('삭제')).toBeInTheDocument();

    await user.click(screen.getByText('취소'));
    expect(onClose).toHaveBeenCalled();
  });
});
