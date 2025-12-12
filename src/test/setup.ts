/**
 * Vitest 전역 테스트 설정
 * @testing-library/jest-dom 매처 및 브라우저 API 모킹
 */
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi, expect } from 'vitest';
import * as matchers from 'vitest-axe/matchers';

// vitest-axe 매처 확장
expect.extend(matchers);

// 각 테스트 후 자동 정리
afterEach(() => {
  cleanup();
});

// ResizeObserver 모킹
class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;

// IntersectionObserver 모킹
class IntersectionObserverMock {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn().mockReturnValue([]);
}
globalThis.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver;

// matchMedia 모킹
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// scrollTo 모킹
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});

// scrollIntoView 모킹
Element.prototype.scrollIntoView = vi.fn();

// requestAnimationFrame 모킹
globalThis.requestAnimationFrame = vi.fn((cb) => {
  return setTimeout(cb, 0);
}) as unknown as typeof requestAnimationFrame;

globalThis.cancelAnimationFrame = vi.fn((id) => {
  clearTimeout(id);
}) as unknown as typeof cancelAnimationFrame;

// getComputedStyle 모킹 (CSS 모듈용)
const originalGetComputedStyle = window.getComputedStyle;
window.getComputedStyle = (element: Element) => {
  return originalGetComputedStyle(element);
};

// console.error 경고 무시 (React 18 act 경고 등)
const originalError = console.error;
console.error = (...args: unknown[]) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
      args[0].includes('Warning: An update to') ||
      args[0].includes('act(...)'))
  ) {
    return;
  }
  originalError.apply(console, args);
};
