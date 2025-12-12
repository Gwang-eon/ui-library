/**
 * Tabs 컴포넌트 테스트
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Tabs, TabsList, Tab, TabPanel, TabContent } from './Tabs';

describe('Tabs', () => {
  const renderBasicTabs = (props = {}) => {
    return render(
      <Tabs defaultValue="tab1" {...props}>
        <TabsList>
          <Tab value="tab1">탭 1</Tab>
          <Tab value="tab2">탭 2</Tab>
          <Tab value="tab3">탭 3</Tab>
        </TabsList>
        <TabContent>
          <TabPanel value="tab1">패널 1 내용</TabPanel>
          <TabPanel value="tab2">패널 2 내용</TabPanel>
          <TabPanel value="tab3">패널 3 내용</TabPanel>
        </TabContent>
      </Tabs>
    );
  };

  describe('렌더링', () => {
    it('기본 렌더링이 정상적으로 됨', () => {
      renderBasicTabs();
      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getAllByRole('tab')).toHaveLength(3);
    });

    it('defaultValue에 따라 초기 탭이 선택됨', () => {
      renderBasicTabs({ defaultValue: 'tab2' });
      expect(screen.getByRole('tab', { name: '탭 2' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('패널 2 내용')).toBeVisible();
    });

    it('선택된 탭 패널만 표시됨', () => {
      renderBasicTabs({ defaultValue: 'tab1' });
      expect(screen.getByText('패널 1 내용')).toBeInTheDocument();
      expect(screen.queryByText('패널 2 내용')).not.toBeInTheDocument();
    });
  });

  describe('variants', () => {
    const variants = ['line', 'contained', 'pills'] as const;

    variants.forEach((variant) => {
      it(`${variant} variant가 정상 렌더링됨`, () => {
        renderBasicTabs({ variant });
        expect(screen.getByRole('tablist')).toBeInTheDocument();
      });
    });
  });

  describe('sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`${size} size가 정상 렌더링됨`, () => {
        renderBasicTabs({ size });
        expect(screen.getByRole('tablist')).toBeInTheDocument();
      });
    });
  });

  describe('인터랙션', () => {
    it('탭 클릭 시 해당 패널이 표시됨', async () => {
      const user = userEvent.setup();
      renderBasicTabs();

      await user.click(screen.getByRole('tab', { name: '탭 2' }));

      expect(screen.getByRole('tab', { name: '탭 2' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('패널 2 내용')).toBeVisible();
    });

    it('onChange 콜백이 호출됨', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      renderBasicTabs({ onChange: handleChange });

      await user.click(screen.getByRole('tab', { name: '탭 2' }));

      expect(handleChange).toHaveBeenCalledWith('tab2');
    });

    it('disabled 탭 클릭 시 변경 안됨', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <Tabs defaultValue="tab1" onChange={handleChange}>
          <TabsList>
            <Tab value="tab1">탭 1</Tab>
            <Tab value="tab2" disabled>탭 2</Tab>
          </TabsList>
        </Tabs>
      );

      await user.click(screen.getByRole('tab', { name: '탭 2' }));

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('제어/비제어 컴포넌트', () => {
    it('제어 컴포넌트로 동작함', async () => {
      const user = userEvent.setup();
      const ControlledTabs = () => {
        const [value, setValue] = React.useState('tab1');
        return (
          <Tabs value={value} onChange={setValue}>
            <TabsList>
              <Tab value="tab1">탭 1</Tab>
              <Tab value="tab2">탭 2</Tab>
            </TabsList>
            <TabContent>
              <TabPanel value="tab1">패널 1</TabPanel>
              <TabPanel value="tab2">패널 2</TabPanel>
            </TabContent>
          </Tabs>
        );
      };

      render(<ControlledTabs />);

      await user.click(screen.getByRole('tab', { name: '탭 2' }));
      expect(screen.getByText('패널 2')).toBeVisible();
    });

    it('비제어 컴포넌트로 동작함', async () => {
      const user = userEvent.setup();
      renderBasicTabs();

      await user.click(screen.getByRole('tab', { name: '탭 2' }));
      expect(screen.getByText('패널 2 내용')).toBeVisible();

      await user.click(screen.getByRole('tab', { name: '탭 1' }));
      expect(screen.getByText('패널 1 내용')).toBeVisible();
    });
  });

  describe('className', () => {
    it('Tabs에 className이 적용됨', () => {
      const { container } = renderBasicTabs({ className: 'custom-tabs' });
      expect(container.firstChild).toHaveClass('custom-tabs');
    });

    it('TabsList에 className이 적용됨', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList className="custom-tabslist">
            <Tab value="tab1">탭</Tab>
          </TabsList>
        </Tabs>
      );
      expect(screen.getByRole('tablist')).toHaveClass('custom-tabslist');
    });
  });

  describe('접근성', () => {
    it('a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <Tab value="tab1">탭 1</Tab>
            <Tab value="tab2">탭 2</Tab>
          </TabsList>
          <TabContent>
            <TabPanel value="tab1">패널 1 내용</TabPanel>
            <TabPanel value="tab2">패널 2 내용</TabPanel>
          </TabContent>
        </Tabs>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('TabsList에 role=tablist가 있음', () => {
      renderBasicTabs();
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('Tab에 role=tab이 있음', () => {
      renderBasicTabs();
      expect(screen.getAllByRole('tab')).toHaveLength(3);
    });

    it('TabPanel에 role=tabpanel이 있음', () => {
      renderBasicTabs();
      expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    });

    it('선택된 Tab에 aria-selected=true가 있음', () => {
      renderBasicTabs({ defaultValue: 'tab1' });
      expect(screen.getByRole('tab', { name: '탭 1' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('tab', { name: '탭 2' })).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('TabPanel keepMounted', () => {
    it('keepMounted=true일 때 비활성 패널도 DOM에 유지됨', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <Tab value="tab1">탭 1</Tab>
            <Tab value="tab2">탭 2</Tab>
          </TabsList>
          <TabContent>
            <TabPanel value="tab1">패널 1</TabPanel>
            <TabPanel value="tab2" keepMounted>패널 2</TabPanel>
          </TabContent>
        </Tabs>
      );

      // keepMounted로 인해 DOM에 유지됨
      expect(screen.getByText('패널 2')).toBeInTheDocument();
      // TabPanel에 role=tabpanel과 hidden 속성이 있음
      const panel = screen.getByText('패널 2').closest('[role="tabpanel"]');
      expect(panel).toHaveAttribute('hidden');
    });
  });
});

import React from 'react';
