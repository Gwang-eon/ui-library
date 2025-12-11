import { useState } from 'react';
import { Copy, Check, Sun, Moon } from 'lucide-react';
import './TokensDemos.css';

// ============================================
// Token Data
// ============================================

const colorTokens = {
  primary: [
    { name: '--color-primary-50', value: '#EFF6FF', desc: 'Lightest' },
    { name: '--color-primary-100', value: '#DBEAFE', desc: 'Very Light' },
    { name: '--color-primary-200', value: '#BFDBFE', desc: 'Light' },
    { name: '--color-primary-300', value: '#93C5FD', desc: 'Light Medium' },
    { name: '--color-primary-400', value: '#60A5FA', desc: 'Medium' },
    { name: '--color-primary-500', value: '#3B82F6', desc: 'Base' },
    { name: '--color-primary-600', value: '#2563EB', desc: 'Dark Medium' },
    { name: '--color-primary-700', value: '#1D4ED8', desc: 'Dark' },
    { name: '--color-primary-800', value: '#1E40AF', desc: 'Very Dark' },
    { name: '--color-primary-900', value: '#1E3A8A', desc: 'Darkest' },
  ],
  success: [
    { name: '--color-success-50', value: '#F0FDF4', desc: 'Lightest' },
    { name: '--color-success-500', value: '#22C55E', desc: 'Base' },
    { name: '--color-success-700', value: '#15803D', desc: 'Dark' },
  ],
  warning: [
    { name: '--color-warning-50', value: '#FFF3E0', desc: 'Lightest' },
    { name: '--color-warning-500', value: '#FF9800', desc: 'Base' },
    { name: '--color-warning-700', value: '#F57C00', desc: 'Dark' },
  ],
  error: [
    { name: '--color-error-50', value: '#FFEBEE', desc: 'Lightest' },
    { name: '--color-error-500', value: '#F44336', desc: 'Base' },
    { name: '--color-error-700', value: '#D32F2F', desc: 'Dark' },
  ],
  info: [
    { name: '--color-info-50', value: '#E1F5FE', desc: 'Lightest' },
    { name: '--color-info-500', value: '#03A9F4', desc: 'Base' },
    { name: '--color-info-700', value: '#0288D1', desc: 'Dark' },
  ],
};

const semanticTokens = {
  text: [
    { name: '--text-primary', lightValue: 'gray-900', darkValue: 'dark-blue-100', usage: 'Main content text' },
    { name: '--text-secondary', lightValue: 'gray-700', darkValue: 'dark-blue-300', usage: 'Secondary text, descriptions' },
    { name: '--text-tertiary', lightValue: 'gray-600', darkValue: 'dark-blue-400', usage: 'Muted text, captions' },
    { name: '--text-disabled', lightValue: 'gray-400', darkValue: 'dark-blue-500', usage: 'Disabled state text' },
    { name: '--text-inverse', lightValue: 'white', darkValue: 'dark-blue-900', usage: 'Text on dark/light backgrounds' },
    { name: '--text-link', lightValue: 'primary-700', darkValue: 'primary-400', usage: 'Link text' },
  ],
  surface: [
    { name: '--surface-primary', lightValue: 'white', darkValue: '#102A43', usage: 'Cards, Modals (elevated)' },
    { name: '--surface-secondary', lightValue: 'gray-50', darkValue: '#091E34', usage: 'Page background (body)' },
    { name: '--surface-tertiary', lightValue: 'gray-100', darkValue: '#243B53', usage: 'Sections (nested)' },
    { name: '--surface-quaternary', lightValue: 'gray-200', darkValue: '#334E68', usage: 'Widget backgrounds' },
    { name: '--surface-quinary', lightValue: 'gray-300', darkValue: '#486581', usage: 'Sub-components, highest layer' },
  ],
  border: [
    { name: '--border-default', lightValue: 'gray-300', darkValue: 'dark-blue-400', usage: 'Default borders' },
    { name: '--border-subtle', lightValue: 'gray-200', darkValue: 'dark-blue-600', usage: 'Subtle dividers' },
    { name: '--border-strong', lightValue: 'gray-400', darkValue: 'dark-blue-300', usage: 'Emphasized borders' },
    { name: '--border-hover', lightValue: 'gray-500', darkValue: 'dark-blue-300', usage: 'Hover state borders' },
  ],
};

const spacingTokens = [
  { name: '--spacing-0', value: '0px', desc: 'None' },
  { name: '--spacing-1', value: '4px', desc: 'Tiny' },
  { name: '--spacing-2', value: '8px', desc: 'Small' },
  { name: '--spacing-3', value: '12px', desc: 'Medium-Small' },
  { name: '--spacing-4', value: '16px', desc: 'Medium' },
  { name: '--spacing-5', value: '20px', desc: 'Medium-Large' },
  { name: '--spacing-6', value: '24px', desc: 'Large' },
  { name: '--spacing-8', value: '32px', desc: 'X-Large' },
  { name: '--spacing-10', value: '40px', desc: 'XX-Large' },
  { name: '--spacing-12', value: '48px', desc: 'XXX-Large' },
  { name: '--spacing-16', value: '64px', desc: 'Huge' },
];

const typographyTokens = {
  fontSizes: [
    { name: '--font-size-xs', value: '11px', usage: 'Tiny labels' },
    { name: '--font-size-sm', value: '12px', usage: 'Small text, captions' },
    { name: '--font-size-body-small', value: '12px', usage: 'Small body text' },
    { name: '--font-size-body-medium', value: '14px', usage: 'Default body text' },
    { name: '--font-size-body-large', value: '16px', usage: 'Large body text' },
    { name: '--font-size-lg', value: '18px', usage: 'Subheadings' },
    { name: '--font-size-xl', value: '20px', usage: 'Section headers' },
    { name: '--font-size-2xl', value: '24px', usage: 'Page titles' },
    { name: '--font-size-3xl', value: '30px', usage: 'Large titles' },
  ],
  fontWeights: [
    { name: '--font-weight-regular', value: '400', usage: 'Body text' },
    { name: '--font-weight-medium', value: '500', usage: 'Emphasized text' },
    { name: '--font-weight-semibold', value: '600', usage: 'Headings' },
    { name: '--font-weight-bold', value: '700', usage: 'Strong emphasis' },
  ],
  lineHeights: [
    { name: '--line-height-tight', value: '1.25', usage: 'Headings' },
    { name: '--line-height-normal', value: '1.5', usage: 'Body text' },
    { name: '--line-height-relaxed', value: '1.75', usage: 'Long-form content' },
  ],
};

const shadowTokens = [
  { name: '--shadow-sm', value: '0 1px 2px 0 rgba(0,0,0,0.05)', usage: 'Subtle elevation' },
  { name: '--shadow-base', value: '0 1px 3px 0 rgba(0,0,0,0.1)', usage: 'Default elevation' },
  { name: '--shadow-md', value: '0 4px 6px -1px rgba(0,0,0,0.15)', usage: 'Cards, dropdowns' },
  { name: '--shadow-lg', value: '0 10px 15px -3px rgba(0,0,0,0.2)', usage: 'Modals, popovers' },
  { name: '--shadow-xl', value: '0 20px 25px -5px rgba(0,0,0,0.25)', usage: 'Dialogs' },
  { name: '--shadow-2xl', value: '0 25px 50px -12px rgba(0,0,0,0.3)', usage: 'Maximum depth' },
];

const radiusTokens = [
  { name: '--border-radius-none', value: '0px', usage: 'No rounding' },
  { name: '--border-radius-sm', value: '2px', usage: 'Subtle rounding' },
  { name: '--border-radius-md', value: '4px', usage: 'Default rounding' },
  { name: '--border-radius-lg', value: '8px', usage: 'Large rounding' },
  { name: '--border-radius-xl', value: '12px', usage: 'Extra large' },
  { name: '--border-radius-2xl', value: '16px', usage: 'Very large' },
  { name: '--border-radius-full', value: '9999px', usage: 'Pill/Circle' },
];

// ============================================
// Components
// ============================================

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="copy-btn"
      title={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}

function ColorSwatch({ name, value, desc }: { name: string; value: string; desc?: string }) {
  return (
    <div className="token-swatch">
      <div
        className="swatch-color"
        style={{ backgroundColor: value }}
      />
      <div className="swatch-info">
        <code className="token-name">{name}</code>
        <span className="token-value">{value}</span>
        {desc && <span className="token-desc">{desc}</span>}
      </div>
      <CopyButton text={`var(${name})`} />
    </div>
  );
}

function TokenRow({ name, value, usage }: { name: string; value: string; usage?: string }) {
  return (
    <tr className="token-row">
      <td><code className="token-name">{name}</code></td>
      <td><code className="token-value">{value}</code></td>
      {usage && <td className="token-usage">{usage}</td>}
      <td className="token-copy"><CopyButton text={`var(${name})`} /></td>
    </tr>
  );
}

function SemanticTokenRow({ name, lightValue, darkValue, usage }: {
  name: string;
  lightValue: string;
  darkValue: string;
  usage: string;
}) {
  return (
    <tr className="token-row">
      <td><code className="token-name">{name}</code></td>
      <td><span className="light-value"><Sun size={12} /> {lightValue}</span></td>
      <td><span className="dark-value"><Moon size={12} /> {darkValue}</span></td>
      <td className="token-usage">{usage}</td>
      <td className="token-copy"><CopyButton text={`var(${name})`} /></td>
    </tr>
  );
}

function SpacingDemo({ name, value }: { name: string; value: string }) {
  return (
    <div className="spacing-demo">
      <div className="spacing-bar" style={{ width: value, height: '24px' }} />
      <div className="spacing-info">
        <code className="token-name">{name}</code>
        <span className="token-value">{value}</span>
      </div>
      <CopyButton text={`var(${name})`} />
    </div>
  );
}

function ShadowDemo({ name, value, usage }: { name: string; value: string; usage: string }) {
  return (
    <div className="shadow-demo">
      <div className="shadow-box" style={{ boxShadow: value }} />
      <div className="shadow-info">
        <code className="token-name">{name}</code>
        <span className="token-usage">{usage}</span>
      </div>
      <CopyButton text={`var(${name})`} />
    </div>
  );
}

function RadiusDemo({ name, value, usage }: { name: string; value: string; usage: string }) {
  return (
    <div className="radius-demo">
      <div className="radius-box" style={{ borderRadius: value }} />
      <div className="radius-info">
        <code className="token-name">{name}</code>
        <span className="token-value">{value}</span>
        <span className="token-usage">{usage}</span>
      </div>
      <CopyButton text={`var(${name})`} />
    </div>
  );
}

// ============================================
// Main Component
// ============================================

export default function TokensDemos() {
  return (
    <div className="tokens-guide">
      {/* Introduction */}
      <section className="tokens-section">
        <h2>Design Tokens</h2>
        <p className="section-intro">
          Design tokens are the visual design atoms of our design system. They're the single source of truth for
          colors, typography, spacing, and other design decisions. Using tokens ensures consistency and makes
          theming (like dark mode) automatic.
        </p>

        <div className="usage-box">
          <h4>How to Use</h4>
          <pre><code>{`/* In your CSS */
.my-component {
  color: var(--text-primary);
  background: var(--surface-primary);
  border: 1px solid var(--border-default);
  padding: var(--spacing-4);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
}

/* Automatically adapts to dark mode! */`}</code></pre>
        </div>
      </section>

      {/* Semantic Colors */}
      <section className="tokens-section">
        <h3>Semantic Colors</h3>
        <p className="section-intro">
          Use semantic tokens instead of raw palette colors. These automatically adapt to light/dark mode.
        </p>

        <h4>Text Colors</h4>
        <table className="tokens-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Light Mode</th>
              <th>Dark Mode</th>
              <th>Usage</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {semanticTokens.text.map((token) => (
              <SemanticTokenRow key={token.name} {...token} />
            ))}
          </tbody>
        </table>

        <h4>Surface Colors (5-Layer System)</h4>
        <table className="tokens-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Light Mode</th>
              <th>Dark Mode</th>
              <th>Usage</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {semanticTokens.surface.map((token) => (
              <SemanticTokenRow key={token.name} {...token} />
            ))}
          </tbody>
        </table>

        <h4>Border Colors</h4>
        <table className="tokens-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Light Mode</th>
              <th>Dark Mode</th>
              <th>Usage</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {semanticTokens.border.map((token) => (
              <SemanticTokenRow key={token.name} {...token} />
            ))}
          </tbody>
        </table>
      </section>

      {/* Color Palette */}
      <section className="tokens-section">
        <h3>Color Palette</h3>
        <p className="section-intro">
          Status colors for semantic meaning. Each includes a full 10-step scale.
        </p>

        <div className="color-group">
          <h4>Primary (Blue)</h4>
          <div className="swatches-grid">
            {colorTokens.primary.map((token) => (
              <ColorSwatch key={token.name} {...token} />
            ))}
          </div>
        </div>

        <div className="color-groups-row">
          <div className="color-group">
            <h4>Success (Green)</h4>
            <div className="swatches-list">
              {colorTokens.success.map((token) => (
                <ColorSwatch key={token.name} {...token} />
              ))}
            </div>
          </div>

          <div className="color-group">
            <h4>Warning (Orange)</h4>
            <div className="swatches-list">
              {colorTokens.warning.map((token) => (
                <ColorSwatch key={token.name} {...token} />
              ))}
            </div>
          </div>

          <div className="color-group">
            <h4>Error (Red)</h4>
            <div className="swatches-list">
              {colorTokens.error.map((token) => (
                <ColorSwatch key={token.name} {...token} />
              ))}
            </div>
          </div>

          <div className="color-group">
            <h4>Info (Light Blue)</h4>
            <div className="swatches-list">
              {colorTokens.info.map((token) => (
                <ColorSwatch key={token.name} {...token} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <section className="tokens-section">
        <h3>Spacing Scale</h3>
        <p className="section-intro">
          Based on an 8px grid system. Use these for consistent margins, padding, and gaps.
        </p>

        <div className="spacing-demos">
          {spacingTokens.map((token) => (
            <SpacingDemo key={token.name} name={token.name} value={token.value} />
          ))}
        </div>

        <div className="usage-box">
          <h4>Component Spacing Aliases</h4>
          <pre><code>{`--button-padding-y: var(--spacing-2);   /* 8px */
--button-padding-x: var(--spacing-4);   /* 16px */
--card-padding: var(--spacing-6);       /* 24px */
--modal-padding: var(--spacing-6);      /* 24px */
--table-cell-padding: var(--spacing-3); /* 12px */`}</code></pre>
        </div>
      </section>

      {/* Typography */}
      <section className="tokens-section">
        <h3>Typography</h3>

        <h4>Font Sizes</h4>
        <table className="tokens-table">
          <thead>
            <tr><th>Token</th><th>Value</th><th>Usage</th><th></th></tr>
          </thead>
          <tbody>
            {typographyTokens.fontSizes.map((token) => (
              <TokenRow key={token.name} name={token.name} value={token.value} usage={token.usage} />
            ))}
          </tbody>
        </table>

        <h4>Font Weights</h4>
        <table className="tokens-table">
          <thead>
            <tr><th>Token</th><th>Value</th><th>Usage</th><th></th></tr>
          </thead>
          <tbody>
            {typographyTokens.fontWeights.map((token) => (
              <TokenRow key={token.name} name={token.name} value={token.value} usage={token.usage} />
            ))}
          </tbody>
        </table>

        <h4>Line Heights</h4>
        <table className="tokens-table">
          <thead>
            <tr><th>Token</th><th>Value</th><th>Usage</th><th></th></tr>
          </thead>
          <tbody>
            {typographyTokens.lineHeights.map((token) => (
              <TokenRow key={token.name} name={token.name} value={token.value} usage={token.usage} />
            ))}
          </tbody>
        </table>
      </section>

      {/* Shadows */}
      <section className="tokens-section">
        <h3>Shadows</h3>
        <p className="section-intro">
          Elevation system for depth perception. Automatically stronger in dark mode.
        </p>

        <div className="shadow-demos">
          {shadowTokens.map((token) => (
            <ShadowDemo key={token.name} {...token} />
          ))}
        </div>
      </section>

      {/* Border Radius */}
      <section className="tokens-section">
        <h3>Border Radius</h3>
        <p className="section-intro">
          Consistent corner rounding across all components.
        </p>

        <div className="radius-demos">
          {radiusTokens.map((token) => (
            <RadiusDemo key={token.name} {...token} />
          ))}
        </div>
      </section>

      {/* Import Guide */}
      <section className="tokens-section">
        <h3>Import Guide</h3>

        <div className="usage-box">
          <h4>CSS Import</h4>
          <pre><code>{`/* Option 1: All styles (design tokens + base + components) */
import '@gractor/ui/dist/ui.css';

/* Option 2: Design tokens only */
import '@gractor/ui/dist/styles/design-tokens.css';

/* Option 3: Tokens + base styles */
import '@gractor/ui/dist/styles/design-tokens.css';
import '@gractor/ui/dist/styles/base.css';`}</code></pre>
        </div>

        <div className="usage-box">
          <h4>Dark Mode Setup</h4>
          <pre><code>{`/* The tokens automatically respond to these selectors */

/* OS preference */
@media (prefers-color-scheme: dark) { ... }

/* Manual toggle - any of these work: */
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.classList.add('dark');
document.body.classList.add('dark-mode');`}</code></pre>
        </div>
      </section>
    </div>
  );
}
