/**
 * Carousel 컴포넌트 테스트
 */
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen, cleanup, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Carousel } from './Carousel';

describe('Carousel', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  describe('렌더링', () => {
    it('Carousel이 렌더링됨', () => {
      render(
        <Carousel>
          <Carousel.Slide>Slide 1</Carousel.Slide>
          <Carousel.Slide>Slide 2</Carousel.Slide>
        </Carousel>
      );

      expect(screen.getByRole('region', { name: 'Carousel' })).toBeInTheDocument();
    });

    it('slides가 렌더링됨', () => {
      render(
        <Carousel>
          <Carousel.Slide>Slide 1</Carousel.Slide>
          <Carousel.Slide>Slide 2</Carousel.Slide>
          <Carousel.Slide>Slide 3</Carousel.Slide>
        </Carousel>
      );

      expect(screen.getByText('Slide 1')).toBeInTheDocument();
      expect(screen.getByText('Slide 2')).toBeInTheDocument();
      expect(screen.getByText('Slide 3')).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      render(
        <Carousel className="custom-carousel">
          <Carousel.Slide>Slide 1</Carousel.Slide>
        </Carousel>
      );

      expect(document.querySelector('.custom-carousel')).toBeInTheDocument();
    });

    it('첫 번째 slide가 기본으로 활성화됨', () => {
      render(
        <Carousel>
          <Carousel.Slide>Slide 1</Carousel.Slide>
          <Carousel.Slide>Slide 2</Carousel.Slide>
        </Carousel>
      );

      // Check active class on first slide
      expect(document.querySelectorAll('[class*="active"]').length).toBeGreaterThan(0);
      expect(screen.getByLabelText('Slide 1 of 2')).toHaveAttribute('aria-hidden', 'false');
    });

    it('defaultIndex로 초기 slide 설정', () => {
      render(
        <Carousel defaultIndex={1}>
          <Carousel.Slide>Slide 1</Carousel.Slide>
          <Carousel.Slide>Slide 2</Carousel.Slide>
        </Carousel>
      );

      expect(screen.getByLabelText('Slide 1 of 2')).toHaveAttribute('aria-hidden', 'true');
      expect(screen.getByLabelText('Slide 2 of 2')).toHaveAttribute('aria-hidden', 'false');
    });
  });

  describe('Carousel.Slide', () => {
    it('slide content가 렌더링됨', () => {
      render(
        <Carousel>
          <Carousel.Slide>
            <img src="test.jpg" alt="Test" />
          </Carousel.Slide>
        </Carousel>
      );

      expect(screen.getByRole('img', { name: 'Test' })).toBeInTheDocument();
    });

    it('caption이 렌더링됨', () => {
      render(
        <Carousel>
          <Carousel.Slide caption={{ title: 'Title', description: 'Description' }}>
            Content
          </Carousel.Slide>
        </Carousel>
      );

      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
    });

    it('slide className이 적용됨', () => {
      render(
        <Carousel>
          <Carousel.Slide className="custom-slide">Content</Carousel.Slide>
        </Carousel>
      );

      expect(document.querySelector('.custom-slide')).toBeInTheDocument();
    });
  });

  describe('네비게이션 화살표', () => {
    it('showArrows=true면 화살표가 표시됨', () => {
      render(
        <Carousel showArrows={true}>
          <Carousel.Slide>Slide 1</Carousel.Slide>
          <Carousel.Slide>Slide 2</Carousel.Slide>
        </Carousel>
      );

      expect(screen.getByRole('button', { name: 'Previous slide' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Next slide' })).toBeInTheDocument();
    });

    it('showArrows=false면 화살표가 숨겨짐', () => {
      render(
        <Carousel showArrows={false}>
          <Carousel.Slide>Slide 1</Carousel.Slide>
          <Carousel.Slide>Slide 2</Carousel.Slide>
        </Carousel>
      );

      expect(screen.queryByRole('button', { name: 'Previous slide' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Next slide' })).not.toBeInTheDocument();
    });

    it('slide가 1개면 화살표가 숨겨짐', () => {
      render(
        <Carousel showArrows={true}>
          <Carousel.Slide>Only Slide</Carousel.Slide>
        </Carousel>
      );

      expect(screen.queryByRole('button', { name: 'Previous slide' })).not.toBeInTheDocument();
    });

    it('Next 클릭시 다음 slide로 이동', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Carousel>
          <Carousel.Slide>Slide 1</Carousel.Slide>
          <Carousel.Slide>Slide 2</Carousel.Slide>
        </Carousel>
      );

      await user.click(screen.getByRole('button', { name: 'Next slide' }));

      expect(screen.getByLabelText('Slide 1 of 2')).toHaveAttribute('aria-hidden', 'true');
      expect(screen.getByLabelText('Slide 2 of 2')).toHaveAttribute('aria-hidden', 'false');
    });

    it('Previous 클릭시 이전 slide로 이동', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Carousel defaultIndex={1}>
          <Carousel.Slide>Slide 1</Carousel.Slide>
          <Carousel.Slide>Slide 2</Carousel.Slide>
        </Carousel>
      );

      await user.click(screen.getByRole('button', { name: 'Previous slide' }));

      expect(screen.getByLabelText('Slide 1 of 2')).toHaveAttribute('aria-hidden', 'false');
      expect(screen.getByLabelText('Slide 2 of 2')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('인디케이터', () => {
    it('showIndicators=true면 인디케이터가 표시됨', () => {
      render(
        <Carousel showIndicators={true}>
          <Carousel.Slide>Slide 1</Carousel.Slide>
          <Carousel.Slide>Slide 2</Carousel.Slide>
        </Carousel>
      );

      expect(screen.getByRole('button', { name: 'Go to slide 1' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Go to slide 2' })).toBeInTheDocument();
    });

    it('showIndicators=false면 인디케이터가 숨겨짐', () => {
      render(
        <Carousel showIndicators={false}>
          <Carousel.Slide>Slide 1</Carousel.Slide>
          <Carousel.Slide>Slide 2</Carousel.Slide>
        </Carousel>
      );

      expect(screen.queryByRole('button', { name: 'Go to slide 1' })).not.toBeInTheDocument();
    });

    it('인디케이터 클릭시 해당 slide로 이동', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Carousel>
          <Carousel.Slide>Slide 1</Carousel.Slide>
          <Carousel.Slide>Slide 2</Carousel.Slide>
          <Carousel.Slide>Slide 3</Carousel.Slide>
        </Carousel>
      );

      await user.click(screen.getByRole('button', { name: 'Go to slide 3' }));

      expect(screen.getByLabelText('Slide 3 of 3')).toHaveAttribute('aria-hidden', 'false');
    });
  });

  describe('loop', () => {
    it('loop=true면 마지막에서 처음으로 순환', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Carousel loop={true} defaultIndex={1}>
          <Carousel.Slide>Slide 1</Carousel.Slide>
          <Carousel.Slide>Slide 2</Carousel.Slide>
        </Carousel>
      );

      await user.click(screen.getByRole('button', { name: 'Next slide' }));

      const slides = screen.getAllByRole('group');
      expect(slides[0]).toHaveAttribute('aria-hidden', 'false');
    });

    it('loop=false면 처음/마지막에서 버튼 비활성화', () => {
      render(
        <Carousel loop={false}>
          <Carousel.Slide>Slide 1</Carousel.Slide>
          <Carousel.Slide>Slide 2</Carousel.Slide>
        </Carousel>
      );

      expect(screen.getByRole('button', { name: 'Previous slide' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Next slide' })).not.toBeDisabled();
    });
  });

  describe('키보드 네비게이션', () => {
    it('ArrowRight로 다음 slide', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Carousel>
          <Carousel.Slide>Slide 1</Carousel.Slide>
          <Carousel.Slide>Slide 2</Carousel.Slide>
        </Carousel>
      );

      const carousel = screen.getByRole('region');
      carousel.focus();
      await user.keyboard('{ArrowRight}');

      expect(screen.getByLabelText('Slide 2 of 2')).toHaveAttribute('aria-hidden', 'false');
    });

    it('ArrowLeft로 이전 slide', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <Carousel defaultIndex={1}>
          <Carousel.Slide>Slide 1</Carousel.Slide>
          <Carousel.Slide>Slide 2</Carousel.Slide>
        </Carousel>
      );

      const carousel = screen.getByRole('region');
      carousel.focus();
      await user.keyboard('{ArrowLeft}');

      expect(screen.getByLabelText('Slide 1 of 2')).toHaveAttribute('aria-hidden', 'false');
    });
  });

  describe('autoPlay', () => {
    it('autoPlay로 자동 재생', async () => {
      render(
        <Carousel autoPlay={1000}>
          <Carousel.Slide>Slide 1</Carousel.Slide>
          <Carousel.Slide>Slide 2</Carousel.Slide>
        </Carousel>
      );

      expect(screen.getByLabelText('Slide 1 of 2')).toHaveAttribute('aria-hidden', 'false');

      await act(async () => {
        vi.advanceTimersByTime(1000);
      });

      expect(screen.getByLabelText('Slide 2 of 2')).toHaveAttribute('aria-hidden', 'false');
    });

    it('autoPlay=0이면 자동 재생 안 함', async () => {
      render(
        <Carousel autoPlay={0}>
          <Carousel.Slide>Slide 1</Carousel.Slide>
          <Carousel.Slide>Slide 2</Carousel.Slide>
        </Carousel>
      );

      expect(screen.getByLabelText('Slide 1 of 2')).toHaveAttribute('aria-hidden', 'false');

      await act(async () => {
        vi.advanceTimersByTime(5000);
      });

      expect(screen.getByLabelText('Slide 1 of 2')).toHaveAttribute('aria-hidden', 'false');
    });
  });

  describe('onChange', () => {
    it('slide 변경시 onChange가 호출됨', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const handleChange = vi.fn();

      render(
        <Carousel onChange={handleChange}>
          <Carousel.Slide>Slide 1</Carousel.Slide>
          <Carousel.Slide>Slide 2</Carousel.Slide>
        </Carousel>
      );

      await user.click(screen.getByRole('button', { name: 'Next slide' }));

      expect(handleChange).toHaveBeenCalledWith(1);
    });
  });

  describe('controlled mode', () => {
    it('activeIndex로 slide 제어', () => {
      const { rerender } = render(
        <Carousel activeIndex={0}>
          <Carousel.Slide>Slide 1</Carousel.Slide>
          <Carousel.Slide>Slide 2</Carousel.Slide>
        </Carousel>
      );

      expect(screen.getByLabelText('Slide 1 of 2')).toHaveAttribute('aria-hidden', 'false');

      rerender(
        <Carousel activeIndex={1}>
          <Carousel.Slide>Slide 1</Carousel.Slide>
          <Carousel.Slide>Slide 2</Carousel.Slide>
        </Carousel>
      );

      expect(screen.getByLabelText('Slide 2 of 2')).toHaveAttribute('aria-hidden', 'false');
    });
  });

  describe('effect', () => {
    it('effect="slide"가 기본값', () => {
      render(
        <Carousel>
          <Carousel.Slide>Slide 1</Carousel.Slide>
        </Carousel>
      );

      expect(document.querySelector('[class*="carouselFade"]')).not.toBeInTheDocument();
    });

    it('effect="fade"가 적용됨', () => {
      render(
        <Carousel effect="fade">
          <Carousel.Slide>Slide 1</Carousel.Slide>
        </Carousel>
      );

      expect(document.querySelector('[class*="carouselFade"]')).toBeInTheDocument();
    });
  });

  describe('접근성', () => {
    it('role="region"이 설정됨', () => {
      render(
        <Carousel>
          <Carousel.Slide>Slide 1</Carousel.Slide>
        </Carousel>
      );

      expect(screen.getByRole('region', { name: 'Carousel' })).toBeInTheDocument();
    });

    it('slide에 aria-label이 설정됨', () => {
      render(
        <Carousel>
          <Carousel.Slide>Slide 1</Carousel.Slide>
          <Carousel.Slide>Slide 2</Carousel.Slide>
        </Carousel>
      );

      expect(screen.getByLabelText('Slide 1 of 2')).toBeInTheDocument();
      expect(screen.getByLabelText('Slide 2 of 2')).toBeInTheDocument();
    });

    it('aria-live="polite"가 설정됨', () => {
      render(
        <Carousel>
          <Carousel.Slide>Slide 1</Carousel.Slide>
        </Carousel>
      );

      expect(screen.getByRole('region')).toHaveAttribute('aria-live', 'polite');
    });

    it('기본 Carousel이 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Carousel>
          <Carousel.Slide>Slide 1</Carousel.Slide>
          <Carousel.Slide>Slide 2</Carousel.Slide>
        </Carousel>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
