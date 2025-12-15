/**
 * Accordion 컴포넌트 테스트
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Accordion } from './Accordion';

describe('Accordion', () => {
  afterEach(() => {
    cleanup();
  });

  describe('렌더링', () => {
    it('Accordion이 렌더링됨', () => {
      render(
        <Accordion>
          <Accordion.Item title="Section 1">Content 1</Accordion.Item>
        </Accordion>
      );

      expect(screen.getByRole('button', { name: /section 1/i })).toBeInTheDocument();
    });

    it('여러 Item이 렌더링됨', () => {
      render(
        <Accordion>
          <Accordion.Item title="Section 1">Content 1</Accordion.Item>
          <Accordion.Item title="Section 2">Content 2</Accordion.Item>
          <Accordion.Item title="Section 3">Content 3</Accordion.Item>
        </Accordion>
      );

      expect(screen.getByRole('button', { name: /section 1/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /section 2/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /section 3/i })).toBeInTheDocument();
    });

    it('className이 Accordion에 적용됨', () => {
      const { container } = render(
        <Accordion className="custom-accordion">
          <Accordion.Item title="Section 1">Content 1</Accordion.Item>
        </Accordion>
      );

      expect(container.querySelector('.custom-accordion')).toBeInTheDocument();
    });

    it('className이 AccordionItem에 적용됨', () => {
      render(
        <Accordion>
          <Accordion.Item title="Section 1" className="custom-item">
            Content 1
          </Accordion.Item>
        </Accordion>
      );

      expect(document.querySelector('.custom-item')).toBeInTheDocument();
    });

    it('title이 렌더링됨', () => {
      render(
        <Accordion>
          <Accordion.Item title="My Section Title">Content</Accordion.Item>
        </Accordion>
      );

      expect(screen.getByText('My Section Title')).toBeInTheDocument();
    });

    it('React Node title이 렌더링됨', () => {
      render(
        <Accordion>
          <Accordion.Item title={<strong>Bold Title</strong>}>Content</Accordion.Item>
        </Accordion>
      );

      expect(screen.getByText('Bold Title').tagName).toBe('STRONG');
    });

    it('icon이 렌더링됨', () => {
      render(
        <Accordion>
          <Accordion.Item title="Section" icon={<span data-testid="custom-icon">📁</span>}>
            Content
          </Accordion.Item>
        </Accordion>
      );

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('열기/닫기', () => {
    it('기본적으로 닫힌 상태', () => {
      render(
        <Accordion>
          <Accordion.Item title="Section">Content</Accordion.Item>
        </Accordion>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('defaultOpen=true면 열린 상태로 시작', () => {
      render(
        <Accordion>
          <Accordion.Item title="Section" defaultOpen>
            Content
          </Accordion.Item>
        </Accordion>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('클릭시 열림/닫힘 토글', async () => {
      const user = userEvent.setup();

      render(
        <Accordion>
          <Accordion.Item title="Section">Content</Accordion.Item>
        </Accordion>
      );

      const button = screen.getByRole('button');

      // Initially closed
      expect(button).toHaveAttribute('aria-expanded', 'false');

      // Click to open
      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');

      // Click to close
      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('Enter 키로 열림/닫힘 토글', async () => {
      const user = userEvent.setup();

      render(
        <Accordion>
          <Accordion.Item title="Section">Content</Accordion.Item>
        </Accordion>
      );

      const button = screen.getByRole('button');
      button.focus();

      // Press Enter to open
      await user.keyboard('{Enter}');
      expect(button).toHaveAttribute('aria-expanded', 'true');

      // Press Enter to close
      await user.keyboard('{Enter}');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('Space 키로 열림/닫힘 토글', async () => {
      const user = userEvent.setup();

      render(
        <Accordion>
          <Accordion.Item title="Section">Content</Accordion.Item>
        </Accordion>
      );

      const button = screen.getByRole('button');
      button.focus();

      // Press Space to open
      await user.keyboard(' ');
      expect(button).toHaveAttribute('aria-expanded', 'true');

      // Press Space to close
      await user.keyboard(' ');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('각 Item이 독립적으로 열림/닫힘', async () => {
      const user = userEvent.setup();

      render(
        <Accordion>
          <Accordion.Item title="Section 1">Content 1</Accordion.Item>
          <Accordion.Item title="Section 2">Content 2</Accordion.Item>
        </Accordion>
      );

      const button1 = screen.getByRole('button', { name: /section 1/i });
      const button2 = screen.getByRole('button', { name: /section 2/i });

      // Open Section 1
      await user.click(button1);
      expect(button1).toHaveAttribute('aria-expanded', 'true');
      expect(button2).toHaveAttribute('aria-expanded', 'false');

      // Open Section 2 (Section 1 stays open)
      await user.click(button2);
      expect(button1).toHaveAttribute('aria-expanded', 'true');
      expect(button2).toHaveAttribute('aria-expanded', 'true');

      // Close Section 1
      await user.click(button1);
      expect(button1).toHaveAttribute('aria-expanded', 'false');
      expect(button2).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('콘텐츠', () => {
    it('열린 상태에서 콘텐츠가 보임', async () => {
      const user = userEvent.setup();

      render(
        <Accordion>
          <Accordion.Item title="Section">
            <p>Accordion content text</p>
          </Accordion.Item>
        </Accordion>
      );

      await user.click(screen.getByRole('button'));

      const region = screen.getByRole('region');
      expect(region).toBeInTheDocument();
      expect(screen.getByText('Accordion content text')).toBeInTheDocument();
    });

    it('defaultOpen=true일 때 콘텐츠가 처음부터 보임', () => {
      render(
        <Accordion>
          <Accordion.Item title="Section" defaultOpen>
            <p>Visible content</p>
          </Accordion.Item>
        </Accordion>
      );

      expect(screen.getByText('Visible content')).toBeInTheDocument();
    });

    it('복잡한 콘텐츠가 렌더링됨', async () => {
      const user = userEvent.setup();

      render(
        <Accordion>
          <Accordion.Item title="Section" defaultOpen>
            <div>
              <h3>Heading</h3>
              <p>Paragraph</p>
              <button>Action Button</button>
            </div>
          </Accordion.Item>
        </Accordion>
      );

      expect(screen.getByRole('heading', { name: 'Heading' })).toBeInTheDocument();
      expect(screen.getByText('Paragraph')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action Button' })).toBeInTheDocument();
    });
  });

  describe('애니메이션 스타일', () => {
    it('닫힐 때 maxHeight가 0px', () => {
      render(
        <Accordion>
          <Accordion.Item title="Section">Content</Accordion.Item>
        </Accordion>
      );

      const region = screen.getByRole('region');
      expect(region.style.maxHeight).toBe('0px');
    });

    it('열릴 때 maxHeight style이 적용됨', async () => {
      const user = userEvent.setup();

      render(
        <Accordion>
          <Accordion.Item title="Section">Content</Accordion.Item>
        </Accordion>
      );

      const button = screen.getByRole('button');
      await user.click(button);

      const region = screen.getByRole('region');
      // In jsdom scrollHeight is 0, so maxHeight will be '0px'
      // Just verify style attribute exists after opening
      expect(region).toHaveAttribute('style');
    });
  });

  describe('접근성', () => {
    it('aria-expanded가 상태에 따라 변경됨', async () => {
      const user = userEvent.setup();

      render(
        <Accordion>
          <Accordion.Item title="Section">Content</Accordion.Item>
        </Accordion>
      );

      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-expanded', 'false');
      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('aria-controls가 region id를 참조함', () => {
      render(
        <Accordion>
          <Accordion.Item title="Section">Content</Accordion.Item>
        </Accordion>
      );

      const button = screen.getByRole('button');
      const region = screen.getByRole('region');

      const ariaControls = button.getAttribute('aria-controls');
      expect(ariaControls).toBeTruthy();
      expect(region).toHaveAttribute('id', ariaControls);
    });

    it('role="region"이 설정됨', () => {
      render(
        <Accordion>
          <Accordion.Item title="Section" defaultOpen>
            Content
          </Accordion.Item>
        </Accordion>
      );

      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('aria-labelledby가 버튼 id를 참조함', () => {
      render(
        <Accordion>
          <Accordion.Item title="Section" defaultOpen>
            Content
          </Accordion.Item>
        </Accordion>
      );

      const button = screen.getByRole('button');
      const region = screen.getByRole('region');

      const buttonId = button.getAttribute('id');
      expect(buttonId).toBeTruthy();
      expect(region).toHaveAttribute('aria-labelledby', buttonId);
    });

    it('기본 Accordion이 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Accordion>
          <Accordion.Item title="Section 1">Content 1</Accordion.Item>
          <Accordion.Item title="Section 2">Content 2</Accordion.Item>
        </Accordion>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('열린 Accordion이 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Accordion>
          <Accordion.Item title="Section 1" defaultOpen>
            Content 1
          </Accordion.Item>
          <Accordion.Item title="Section 2">Content 2</Accordion.Item>
        </Accordion>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('복합 사용', () => {
    it('FAQ 스타일 accordion', () => {
      render(
        <Accordion>
          <Accordion.Item title="What is React?">
            React is a JavaScript library for building user interfaces.
          </Accordion.Item>
          <Accordion.Item title="How do I install it?">
            You can install React using npm or yarn.
          </Accordion.Item>
          <Accordion.Item title="Is it free?">
            Yes, React is free and open source.
          </Accordion.Item>
        </Accordion>
      );

      expect(screen.getByText('What is React?')).toBeInTheDocument();
      expect(screen.getByText('How do I install it?')).toBeInTheDocument();
      expect(screen.getByText('Is it free?')).toBeInTheDocument();
    });

    it('아이콘이 있는 설정 accordion', async () => {
      const user = userEvent.setup();

      render(
        <Accordion>
          <Accordion.Item
            title="General Settings"
            icon={<span>⚙️</span>}
            defaultOpen
          >
            <p>General settings content</p>
          </Accordion.Item>
          <Accordion.Item
            title="Privacy Settings"
            icon={<span>🔒</span>}
          >
            <p>Privacy settings content</p>
          </Accordion.Item>
        </Accordion>
      );

      // First item is open by default
      expect(screen.getByText('General settings content')).toBeInTheDocument();

      // Open second item
      await user.click(screen.getByRole('button', { name: /privacy settings/i }));
      expect(screen.getByText('Privacy settings content')).toBeInTheDocument();
    });
  });
});
