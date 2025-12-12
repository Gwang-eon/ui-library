/**
 * 커스텀 렌더 유틸리티
 * Provider 래핑 및 공통 옵션 제공
 */
import React, { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';

/**
 * 테스트용 Provider 래퍼
 * 필요한 경우 ThemeProvider, ConfigProvider 등 추가
 */
interface WrapperProps {
  children: React.ReactNode;
}

const AllTheProviders = ({ children }: WrapperProps) => {
  return <>{children}</>;
};

/**
 * 커스텀 렌더 함수
 * 기본 Provider들이 적용된 렌더 유틸리티
 */
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';
export { customRender as render };
