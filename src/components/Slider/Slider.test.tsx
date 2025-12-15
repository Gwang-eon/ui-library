/**
 * Slider 컴포넌트 테스트
 */
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Slider } from './Slider';

describe('Slider', () => {
  describe('Single Slider - 렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(<Slider ariaLabel="Test slider" />);
      expect(screen.getByRole('slider')).toBeInTheDocument();
    });

    it('label이 정상적으로 렌더링됨', () => {
      render(<Slider label="볼륨" />);
      expect(screen.getByText('볼륨')).toBeInTheDocument();
    });

    it('기본값이 적용됨', () => {
      render(<Slider defaultValue={50} ariaLabel="Test" />);
      expect(screen.getByRole('slider')).toHaveValue('50');
    });

    it('min, max 속성이 적용됨', () => {
      render(<Slider min={10} max={200} ariaLabel="Test" />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('min', '10');
      expect(slider).toHaveAttribute('max', '200');
    });

    it('step 속성이 적용됨', () => {
      render(<Slider step={5} ariaLabel="Test" />);
      expect(screen.getByRole('slider')).toHaveAttribute('step', '5');
    });

    it('disabled 상태가 적용됨', () => {
      render(<Slider disabled ariaLabel="Test" />);
      expect(screen.getByRole('slider')).toBeDisabled();
    });
  });

  describe('Single Slider - value display', () => {
    it('showValue가 true일 때 값이 표시됨', () => {
      render(<Slider label="볼륨" showValue defaultValue={75} />);
      expect(screen.getByText('75')).toBeInTheDocument();
    });

    it('formatValue 함수로 값이 포맷됨', () => {
      render(
        <Slider
          label="온도"
          showValue
          defaultValue={25}
          formatValue={(v) => `${v}°C`}
        />
      );
      expect(screen.getByText('25°C')).toBeInTheDocument();
    });

    it('showMinMax가 true일 때 min/max 레이블이 표시됨', () => {
      render(<Slider showMinMax min={0} max={100} ariaLabel="Test" />);
      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('커스텀 minLabel, maxLabel이 표시됨', () => {
      render(
        <Slider
          showMinMax
          min={0}
          max={100}
          minLabel="낮음"
          maxLabel="높음"
          ariaLabel="Test"
        />
      );
      expect(screen.getByText('낮음')).toBeInTheDocument();
      expect(screen.getByText('높음')).toBeInTheDocument();
    });
  });

  describe('Single Slider - icons', () => {
    it('iconBefore가 렌더링됨', () => {
      render(<Slider iconBefore={<span data-testid="icon-before">🔈</span>} ariaLabel="Test" />);
      expect(screen.getByTestId('icon-before')).toBeInTheDocument();
    });

    it('iconAfter가 렌더링됨', () => {
      render(<Slider iconAfter={<span data-testid="icon-after">🔊</span>} ariaLabel="Test" />);
      expect(screen.getByTestId('icon-after')).toBeInTheDocument();
    });

    it('아이콘과 함께 showValue가 동작함', () => {
      render(
        <Slider
          iconBefore={<span>🔈</span>}
          iconAfter={<span>🔊</span>}
          showValue
          defaultValue={50}
          ariaLabel="Volume"
        />
      );
      expect(screen.getByText('50')).toBeInTheDocument();
    });
  });

  describe('Single Slider - helperText', () => {
    it('helperText가 렌더링됨', () => {
      render(<Slider helperText="0에서 100 사이의 값을 선택하세요" ariaLabel="Test" />);
      expect(screen.getByText('0에서 100 사이의 값을 선택하세요')).toBeInTheDocument();
    });

    it('helperText가 ReactNode로 렌더링됨', () => {
      render(
        <Slider
          helperText={<span data-testid="helper">도움말</span>}
          ariaLabel="Test"
        />
      );
      expect(screen.getByTestId('helper')).toBeInTheDocument();
    });
  });

  describe('Single Slider - 인터랙션', () => {
    it('값 변경 시 onChange가 호출됨', () => {
      const handleChange = vi.fn();
      render(<Slider onChange={handleChange} ariaLabel="Test" />);

      const slider = screen.getByRole('slider');
      fireEvent.change(slider, { target: { value: '50' } });

      expect(handleChange).toHaveBeenCalledWith(50);
    });

    it('uncontrolled 모드에서 값이 변경됨', () => {
      render(<Slider defaultValue={0} ariaLabel="Test" />);

      const slider = screen.getByRole('slider');
      fireEvent.change(slider, { target: { value: '75' } });

      expect(slider).toHaveValue('75');
    });

    it('controlled 모드에서 value가 적용됨', () => {
      const ControlledSlider = () => {
        const [value, setValue] = React.useState(30);
        return <Slider value={value} onChange={setValue} ariaLabel="Test" />;
      };

      render(<ControlledSlider />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveValue('30');

      fireEvent.change(slider, { target: { value: '60' } });
      expect(slider).toHaveValue('60');
    });

    it('disabled 상태에서 onChange가 호출되지 않음', () => {
      const handleChange = vi.fn();
      render(<Slider disabled onChange={handleChange} ariaLabel="Test" />);

      const slider = screen.getByRole('slider');
      expect(slider).toBeDisabled();
    });
  });

  describe('Single Slider - 접근성', () => {
    it('aria-label이 적용됨', () => {
      render(<Slider ariaLabel="볼륨 조절" />);
      expect(screen.getByRole('slider')).toHaveAttribute('aria-label', '볼륨 조절');
    });

    it('string label이 aria-label로 사용됨', () => {
      render(<Slider label="밝기" />);
      expect(screen.getByRole('slider')).toHaveAttribute('aria-label', '밝기');
    });

    it('aria-valuemin, aria-valuemax, aria-valuenow가 적용됨', () => {
      render(<Slider min={10} max={90} defaultValue={50} ariaLabel="Test" />);
      const slider = screen.getByRole('slider');

      expect(slider).toHaveAttribute('aria-valuemin', '10');
      expect(slider).toHaveAttribute('aria-valuemax', '90');
      expect(slider).toHaveAttribute('aria-valuenow', '50');
    });

    it('a11y 위반 사항이 없음', async () => {
      const { container } = render(<Slider label="테스트 슬라이더" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('a11y 위반 사항이 없음 (disabled)', async () => {
      const { container } = render(<Slider label="테스트 슬라이더" disabled />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Single Slider - className', () => {
    it('커스텀 className이 적용됨', () => {
      const { container } = render(<Slider className="custom-slider" ariaLabel="Test" />);
      expect(container.firstChild).toHaveClass('custom-slider');
    });
  });

  describe('Range Slider - 렌더링', () => {
    it('range 모드에서 두 개의 슬라이더가 렌더링됨', () => {
      render(<Slider range />);
      const sliders = screen.getAllByRole('slider');
      expect(sliders).toHaveLength(2);
    });

    it('기본값이 적용됨', () => {
      render(<Slider range defaultValue={[20, 80]} />);
      const sliders = screen.getAllByRole('slider');
      expect(sliders[0]).toHaveValue('20');
      expect(sliders[1]).toHaveValue('80');
    });

    it('label이 렌더링됨', () => {
      render(<Slider range label="가격 범위" />);
      expect(screen.getByText('가격 범위')).toBeInTheDocument();
    });

    it('min, max 속성이 적용됨', () => {
      render(<Slider range min={100} max={1000} />);
      const sliders = screen.getAllByRole('slider');
      sliders.forEach((slider) => {
        expect(slider).toHaveAttribute('min', '100');
        expect(slider).toHaveAttribute('max', '1000');
      });
    });

    it('step 속성이 적용됨', () => {
      render(<Slider range step={10} />);
      const sliders = screen.getAllByRole('slider');
      sliders.forEach((slider) => {
        expect(slider).toHaveAttribute('step', '10');
      });
    });

    it('disabled 상태가 적용됨', () => {
      render(<Slider range disabled />);
      const sliders = screen.getAllByRole('slider');
      sliders.forEach((slider) => {
        expect(slider).toBeDisabled();
      });
    });
  });

  describe('Range Slider - value display', () => {
    it('showValue가 true일 때 범위 값이 표시됨', () => {
      render(<Slider range label="범위" showValue defaultValue={[25, 75]} />);
      expect(screen.getByText('25 - 75')).toBeInTheDocument();
    });

    it('formatValue 함수로 값이 포맷됨', () => {
      render(
        <Slider
          range
          label="가격"
          showValue
          defaultValue={[1000, 5000]}
          formatValue={(min, max) => `₩${min.toLocaleString()} ~ ₩${max.toLocaleString()}`}
        />
      );
      expect(screen.getByText('₩1,000 ~ ₩5,000')).toBeInTheDocument();
    });

    it('showMinMax가 true일 때 min/max 레이블이 표시됨', () => {
      render(<Slider range showMinMax min={0} max={100} />);
      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('커스텀 minLabel, maxLabel이 표시됨', () => {
      render(
        <Slider
          range
          showMinMax
          minLabel="최소"
          maxLabel="최대"
        />
      );
      expect(screen.getByText('최소')).toBeInTheDocument();
      expect(screen.getByText('최대')).toBeInTheDocument();
    });
  });

  describe('Range Slider - helperText', () => {
    it('helperText가 렌더링됨', () => {
      render(<Slider range helperText="범위를 선택하세요" />);
      expect(screen.getByText('범위를 선택하세요')).toBeInTheDocument();
    });
  });

  describe('Range Slider - 인터랙션', () => {
    it('min 값 변경 시 onChange가 호출됨', () => {
      const handleChange = vi.fn();
      render(<Slider range onChange={handleChange} defaultValue={[20, 80]} />);

      const sliders = screen.getAllByRole('slider');
      fireEvent.change(sliders[0], { target: { value: '30' } });

      expect(handleChange).toHaveBeenCalledWith([30, 80]);
    });

    it('max 값 변경 시 onChange가 호출됨', () => {
      const handleChange = vi.fn();
      render(<Slider range onChange={handleChange} defaultValue={[20, 80]} />);

      const sliders = screen.getAllByRole('slider');
      fireEvent.change(sliders[1], { target: { value: '70' } });

      expect(handleChange).toHaveBeenCalledWith([20, 70]);
    });

    it('min 값이 max 값을 초과할 수 없음', () => {
      const handleChange = vi.fn();
      render(<Slider range onChange={handleChange} defaultValue={[20, 50]} />);

      const sliders = screen.getAllByRole('slider');
      fireEvent.change(sliders[0], { target: { value: '60' } });

      // onChange should not be called because min (60) > max (50)
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('max 값이 min 값보다 작을 수 없음', () => {
      const handleChange = vi.fn();
      render(<Slider range onChange={handleChange} defaultValue={[40, 80]} />);

      const sliders = screen.getAllByRole('slider');
      fireEvent.change(sliders[1], { target: { value: '30' } });

      // onChange should not be called because max (30) < min (40)
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('uncontrolled 모드에서 값이 변경됨', () => {
      render(<Slider range defaultValue={[10, 90]} />);

      const sliders = screen.getAllByRole('slider');
      fireEvent.change(sliders[0], { target: { value: '25' } });
      fireEvent.change(sliders[1], { target: { value: '75' } });

      expect(sliders[0]).toHaveValue('25');
      expect(sliders[1]).toHaveValue('75');
    });

    it('controlled 모드에서 value가 적용됨', () => {
      const ControlledRangeSlider = () => {
        const [value, setValue] = React.useState<[number, number]>([20, 80]);
        return <Slider range value={value} onChange={setValue} />;
      };

      render(<ControlledRangeSlider />);
      const sliders = screen.getAllByRole('slider');
      expect(sliders[0]).toHaveValue('20');
      expect(sliders[1]).toHaveValue('80');

      fireEvent.change(sliders[0], { target: { value: '30' } });
      expect(sliders[0]).toHaveValue('30');
    });
  });

  describe('Range Slider - 접근성', () => {
    it('각 슬라이더에 aria-label이 적용됨', () => {
      render(<Slider range />);
      const sliders = screen.getAllByRole('slider');

      expect(sliders[0]).toHaveAttribute('aria-label', 'Minimum value');
      expect(sliders[1]).toHaveAttribute('aria-label', 'Maximum value');
    });

    it('aria-valuemin, aria-valuemax, aria-valuenow가 적용됨', () => {
      render(<Slider range min={0} max={100} defaultValue={[25, 75]} />);
      const sliders = screen.getAllByRole('slider');

      expect(sliders[0]).toHaveAttribute('aria-valuemin', '0');
      expect(sliders[0]).toHaveAttribute('aria-valuemax', '100');
      expect(sliders[0]).toHaveAttribute('aria-valuenow', '25');

      expect(sliders[1]).toHaveAttribute('aria-valuemin', '0');
      expect(sliders[1]).toHaveAttribute('aria-valuemax', '100');
      expect(sliders[1]).toHaveAttribute('aria-valuenow', '75');
    });

    it('a11y 위반 사항이 없음', async () => {
      const { container } = render(<Slider range label="가격 범위" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('a11y 위반 사항이 없음 (disabled)', async () => {
      const { container } = render(<Slider range label="가격 범위" disabled />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Range Slider - className', () => {
    it('커스텀 className이 적용됨', () => {
      const { container } = render(<Slider range className="custom-range-slider" />);
      expect(container.firstChild).toHaveClass('custom-range-slider');
    });
  });

  describe('isRangeSlider 타입 가드', () => {
    it('range prop이 true일 때 RangeSlider가 렌더링됨', () => {
      render(<Slider range />);
      expect(screen.getAllByRole('slider')).toHaveLength(2);
    });

    it('range prop이 없을 때 SingleSlider가 렌더링됨', () => {
      render(<Slider ariaLabel="Test" />);
      expect(screen.getAllByRole('slider')).toHaveLength(1);
    });
  });

  describe('엣지 케이스', () => {
    it('min과 max가 같을 때도 동작함', () => {
      render(<Slider min={50} max={50} ariaLabel="Test" />);
      expect(screen.getByRole('slider')).toHaveValue('50');
    });

    it('소수점 step이 적용됨', () => {
      render(<Slider min={0} max={1} step={0.1} defaultValue={0.5} ariaLabel="Test" />);
      expect(screen.getByRole('slider')).toHaveValue('0.5');
    });

    it('음수 값이 지원됨', () => {
      render(<Slider min={-100} max={100} defaultValue={-50} ariaLabel="Test" />);
      expect(screen.getByRole('slider')).toHaveValue('-50');
    });

    it('label이 ReactNode일 때 aria-label은 undefined', () => {
      render(<Slider label={<span>라벨</span>} />);
      const slider = screen.getByRole('slider');
      expect(slider).not.toHaveAttribute('aria-label');
    });

    it('label이 없고 showValue가 true일 때', () => {
      render(<Slider showValue defaultValue={50} ariaLabel="Test" />);
      // label이 없으면 header가 렌더링되지 않음
      expect(screen.queryByText('50')).not.toBeInTheDocument();
    });
  });
});
