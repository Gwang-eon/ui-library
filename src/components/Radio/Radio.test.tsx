/**
 * Radio 컴포넌트 테스트
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Radio } from './Radio';

describe('Radio', () => {
  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      render(<Radio aria-label="Test radio" />);
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('label이 정상적으로 렌더링됨', () => {
      render(<Radio label="옵션 1" />);
      expect(screen.getByLabelText('옵션 1')).toBeInTheDocument();
    });

    it('helperText가 렌더링됨', () => {
      render(<Radio label="라디오" helperText="도움말 텍스트" />);
      expect(screen.getByText('도움말 텍스트')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`${size} size가 정상 렌더링됨`, () => {
        render(<Radio size={size} aria-label="Test" />);
        expect(screen.getByRole('radio')).toBeInTheDocument();
      });
    });
  });

  describe('인터랙션', () => {
    it('클릭으로 선택 가능', async () => {
      const user = userEvent.setup();
      render(<Radio label="라디오" />);

      const radio = screen.getByRole('radio');
      expect(radio).not.toBeChecked();

      await user.click(radio);
      expect(radio).toBeChecked();
    });

    it('onChange 이벤트가 정상 동작함', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Radio label="라디오" onChange={handleChange} />);

      await user.click(screen.getByRole('radio'));
      expect(handleChange).toHaveBeenCalled();
    });

    it('disabled 상태에서 클릭 불가', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Radio label="라디오" disabled onChange={handleChange} />);

      await user.click(screen.getByRole('radio'));
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('disabled 상태에서 라디오가 비활성화됨', () => {
      render(<Radio label="라디오" disabled />);
      expect(screen.getByRole('radio')).toBeDisabled();
    });
  });

  describe('라디오 그룹', () => {
    it('같은 name의 라디오 그룹에서 하나만 선택됨', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Radio name="group" label="옵션 1" value="1" />
          <Radio name="group" label="옵션 2" value="2" />
          <Radio name="group" label="옵션 3" value="3" />
        </div>
      );

      const radios = screen.getAllByRole('radio');

      await user.click(radios[0]);
      expect(radios[0]).toBeChecked();
      expect(radios[1]).not.toBeChecked();
      expect(radios[2]).not.toBeChecked();

      await user.click(radios[1]);
      expect(radios[0]).not.toBeChecked();
      expect(radios[1]).toBeChecked();
      expect(radios[2]).not.toBeChecked();
    });

    it('키보드 화살표로 그룹 내 이동 가능', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Radio name="group" label="옵션 1" value="1" />
          <Radio name="group" label="옵션 2" value="2" />
        </div>
      );

      const radios = screen.getAllByRole('radio');
      await user.click(radios[0]);
      expect(radios[0]).toBeChecked();

      await user.keyboard('{ArrowDown}');
      expect(radios[1]).toBeChecked();
    });
  });

  describe('에러 상태', () => {
    it('error 상태에서 aria-invalid가 true임', () => {
      render(<Radio label="라디오" error />);
      expect(screen.getByRole('radio')).toHaveAttribute('aria-invalid', 'true');
    });

    it('error 상태에서 에러 메시지가 표시됨', () => {
      render(<Radio label="라디오" error errorMessage="선택이 필요합니다" />);
      expect(screen.getByText('선택이 필요합니다')).toBeInTheDocument();
    });

    it('에러 메시지에 alert role이 있음', () => {
      render(<Radio label="라디오" error errorMessage="선택이 필요합니다" />);
      expect(screen.getByRole('alert')).toHaveTextContent('선택이 필요합니다');
    });
  });

  describe('className', () => {
    it('추가 className이 적용됨', () => {
      const { container } = render(<Radio className="custom-class" aria-label="Test" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('접근성', () => {
    it('a11y 위반 사항이 없음', async () => {
      const { container } = render(<Radio label="접근성 테스트" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('라디오 그룹에서 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <fieldset>
          <legend>옵션을 선택하세요</legend>
          <Radio name="group" label="옵션 1" value="1" />
          <Radio name="group" label="옵션 2" value="2" />
        </fieldset>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('에러 상태에서 aria-describedby가 메시지를 참조함', () => {
      render(<Radio label="라디오" error errorMessage="에러입니다" id="test-radio" />);
      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('aria-describedby', 'test-radio-message');
    });

    it('Space 키로 선택 가능', async () => {
      const user = userEvent.setup();
      render(<Radio label="라디오" />);

      const radio = screen.getByRole('radio');
      radio.focus();
      await user.keyboard(' ');
      expect(radio).toBeChecked();
    });
  });

  describe('Ref 전달', () => {
    it('ref가 input 요소로 전달됨', () => {
      const ref = vi.fn();
      render(<Radio ref={ref} aria-label="Test" />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
    });

    it('ref.current로 DOM 요소에 접근 가능', () => {
      const ref = { current: null as HTMLInputElement | null };
      render(<Radio ref={ref} aria-label="Test" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('HTML 속성 전달', () => {
    it('name 속성이 전달됨', () => {
      render(<Radio name="option" aria-label="Test" />);
      expect(screen.getByRole('radio')).toHaveAttribute('name', 'option');
    });

    it('value 속성이 전달됨', () => {
      render(<Radio value="option1" aria-label="Test" />);
      expect(screen.getByRole('radio')).toHaveAttribute('value', 'option1');
    });
  });

  describe('제어/비제어 컴포넌트', () => {
    it('제어 컴포넌트로 동작함', async () => {
      const user = userEvent.setup();
      const ControlledRadio = () => {
        const [selected, setSelected] = React.useState('');
        return (
          <div>
            <Radio
              name="controlled"
              label="옵션 1"
              value="option1"
              checked={selected === 'option1'}
              onChange={() => setSelected('option1')}
            />
            <Radio
              name="controlled"
              label="옵션 2"
              value="option2"
              checked={selected === 'option2'}
              onChange={() => setSelected('option2')}
            />
          </div>
        );
      };

      render(<ControlledRadio />);
      const radios = screen.getAllByRole('radio');

      expect(radios[0]).not.toBeChecked();
      expect(radios[1]).not.toBeChecked();

      await user.click(radios[0]);
      expect(radios[0]).toBeChecked();
      expect(radios[1]).not.toBeChecked();
    });

    it('비제어 컴포넌트로 동작함', async () => {
      const user = userEvent.setup();
      render(<Radio label="비제어 라디오" defaultChecked />);

      const radio = screen.getByRole('radio');
      expect(radio).toBeChecked();
    });
  });
});

import React from 'react';
