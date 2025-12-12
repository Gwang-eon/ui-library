# 다크 모드 구현 가이드

## 개요

이 UI 라이브러리는 수동 테마 토글을 지원하는 다크 모드 시스템을 사용합니다. OS 설정에 의존하는 `prefers-color-scheme` 대신 CSS 클래스 기반 선택자를 사용합니다.

## 다크 모드 선택자

### 올바른 패턴

```css
/* CSS Modules에서 다크 모드 스타일 적용 */
:global([data-theme="dark"]) .component,
:global(.dark) .component {
  background-color: var(--surface-primary);
  border-color: var(--text-secondary);
}
```

### 사용하지 않는 패턴

```css
/* ❌ 사용 금지 - OS 설정에만 반응하여 수동 토글 불가 */
@media (prefers-color-scheme: dark) {
  .component {
    /* ... */
  }
}
```

## 시맨틱 디자인 토큰

### 포커스 상태

| 토큰 | 용도 |
|------|------|
| `--focus-ring-color` | 포커스 링 색상 (outline, box-shadow) |
| `--focus-border-color` | 포커스 시 테두리 색상 |

```css
.button:focus-visible {
  outline: 3px solid var(--focus-ring-color);
  outline-offset: 2px;
}

.input:focus {
  border-color: var(--focus-border-color);
  box-shadow: 0 0 0 3px var(--focus-ring-color);
}
```

### 활성/선택 상태

| 토큰 | 용도 |
|------|------|
| `--active-bg` | 활성 상태 배경 (체크박스, 토글, 버튼) |
| `--active-border` | 활성 상태 테두리 |
| `--selected-bg` | 선택된 항목 배경 |
| `--accent-color` | 강조 텍스트 색상 |

```css
.checkbox:checked {
  background-color: var(--active-bg);
  border-color: var(--active-border);
}

.tab.active {
  background: var(--selected-bg);
  color: var(--accent-color);
}
```

### 상태 색상

| 상태 | 배경 토큰 | 텍스트 토큰 |
|------|-----------|-------------|
| Error | `--error-bg` | `--error-text` |
| Success | `--success-bg` | `--success-text` |
| Warning | `--warning-bg` | `--warning-text` |
| Info | `--info-bg` | `--info-text` |

```css
.badge.error {
  background: var(--error-bg);
  color: var(--error-text);
}

:global([data-theme="dark"]) .badge.error,
:global(.dark) .badge.error {
  background: var(--error-bg);
  color: var(--error-text);
}
```

## 컴포넌트 작성 예시

### 완전한 예시

```css
/* 라이트 모드 (기본) */
.card {
  background: var(--surface-primary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
}

.card:focus-visible {
  outline: 3px solid var(--focus-ring-color);
  outline-offset: 2px;
}

.cardActive {
  background: var(--selected-bg);
  border-color: var(--active-border);
}

/* 다크 모드 */
:global([data-theme="dark"]) .card,
:global(.dark) .card {
  background: var(--surface-primary);
  border-color: var(--text-secondary);
}

:global([data-theme="dark"]) .card:hover,
:global(.dark) .card:hover {
  border-color: var(--border-strong);
}

:global([data-theme="dark"]) .cardActive,
:global(.dark) .cardActive {
  background: var(--selected-bg);
  border-color: var(--active-border);
}
```

## 테마 적용 방법

### HTML 속성 방식

```html
<!-- 다크 모드 -->
<html data-theme="dark">

<!-- 라이트 모드 -->
<html data-theme="light">
```

### CSS 클래스 방식

```html
<!-- 다크 모드 -->
<body class="dark">

<!-- 라이트 모드 -->
<body class="light-mode">
```

### JavaScript 토글

```javascript
// 다크 모드 활성화
document.documentElement.setAttribute('data-theme', 'dark');
// 또는
document.body.classList.add('dark');

// 라이트 모드 활성화
document.documentElement.setAttribute('data-theme', 'light');
// 또는
document.body.classList.remove('dark');
```

## 마이그레이션 체크리스트

새 컴포넌트를 작성하거나 기존 컴포넌트를 수정할 때:

- [ ] `@media (prefers-color-scheme: dark)` 대신 `:global([data-theme="dark"])` 및 `:global(.dark)` 사용
- [ ] 포커스 상태에 `--focus-ring-color` 사용
- [ ] 활성/선택 상태에 `--active-bg`, `--selected-bg`, `--accent-color` 사용
- [ ] 상태 배지/아이콘에 `--error-bg/text`, `--success-bg/text` 등 사용
- [ ] 다크 모드에서 테두리에 `--text-secondary` 또는 `--border-strong` 사용

## 변경 이력

- **2025-12**: 89개 컴포넌트에 다크 모드 일관성 패턴 적용
  - `@media (prefers-color-scheme: dark)` 완전 제거
  - 시맨틱 토큰 시스템 도입
  - CSS Module 호환 선택자로 통일
