/**
 * Convert hardcoded palette-gray colors to semantic tokens in CSS files
 *
 * Mapping Rules (based on usage context):
 * - background: gray-800 → surface-primary, gray-900 → surface-secondary, gray-750/850 → surface-tertiary
 * - text/color: gray-100 → text-primary, gray-200/300 → text-secondary, gray-400/500 → text-tertiary
 * - border: gray-700 → border-default, gray-600 → border-strong
 */

const fs = require('fs');
const path = require('path');

// Get all CSS files with palette-gray
const componentsDir = path.join(__dirname, '../src/components');

function findCssFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      findCssFiles(fullPath, files);
    } else if (item.endsWith('.module.css')) {
      files.push(fullPath);
    }
  }
  return files;
}

const cssFiles = findCssFiles(componentsDir);
let totalReplacements = 0;

for (const file of cssFiles) {
  let content = fs.readFileSync(file, 'utf8');
  const originalContent = content;
  let fileReplacements = 0;

  // Context-aware replacements
  // Background colors
  content = content.replace(/background(-color)?:\s*var\(--palette-gray-800\)/g, (match, suffix) => {
    fileReplacements++;
    return `background${suffix || ''}: var(--surface-primary)`;
  });
  content = content.replace(/background(-color)?:\s*var\(--palette-gray-900\)/g, (match, suffix) => {
    fileReplacements++;
    return `background${suffix || ''}: var(--surface-secondary)`;
  });
  content = content.replace(/background(-color)?:\s*var\(--palette-gray-750\)/g, (match, suffix) => {
    fileReplacements++;
    return `background${suffix || ''}: var(--surface-tertiary)`;
  });
  content = content.replace(/background(-color)?:\s*var\(--palette-gray-850\)/g, (match, suffix) => {
    fileReplacements++;
    return `background${suffix || ''}: var(--surface-tertiary)`;
  });
  content = content.replace(/background(-color)?:\s*var\(--palette-gray-700\)/g, (match, suffix) => {
    fileReplacements++;
    return `background${suffix || ''}: var(--surface-quaternary)`;
  });
  content = content.replace(/background(-color)?:\s*var\(--palette-gray-600\)/g, (match, suffix) => {
    fileReplacements++;
    return `background${suffix || ''}: var(--surface-quaternary)`;
  });
  content = content.replace(/background(-color)?:\s*var\(--palette-gray-500\)/g, (match, suffix) => {
    fileReplacements++;
    return `background${suffix || ''}: var(--surface-quinary)`;
  });
  content = content.replace(/background(-color)?:\s*var\(--palette-gray-200\)/g, (match, suffix) => {
    fileReplacements++;
    return `background${suffix || ''}: var(--surface-tertiary)`;
  });
  content = content.replace(/background(-color)?:\s*var\(--palette-gray-400\)/g, (match, suffix) => {
    fileReplacements++;
    return `background${suffix || ''}: var(--surface-quaternary)`;
  });

  // Text/Color
  content = content.replace(/color:\s*var\(--palette-gray-100\)/g, () => {
    fileReplacements++;
    return 'color: var(--text-primary)';
  });
  content = content.replace(/color:\s*var\(--palette-gray-200\)/g, () => {
    fileReplacements++;
    return 'color: var(--text-primary)';
  });
  content = content.replace(/color:\s*var\(--palette-gray-300\)/g, () => {
    fileReplacements++;
    return 'color: var(--text-secondary)';
  });
  content = content.replace(/color:\s*var\(--palette-gray-400\)/g, () => {
    fileReplacements++;
    return 'color: var(--text-tertiary)';
  });
  content = content.replace(/color:\s*var\(--palette-gray-500\)/g, () => {
    fileReplacements++;
    return 'color: var(--text-tertiary)';
  });
  content = content.replace(/color:\s*var\(--palette-gray-700\)/g, () => {
    fileReplacements++;
    return 'color: var(--text-secondary)';
  });

  // Border colors
  content = content.replace(/border(-[a-z]+)?-color:\s*var\(--palette-gray-700\)/g, (match, suffix) => {
    fileReplacements++;
    return `border${suffix || ''}-color: var(--border-default)`;
  });
  content = content.replace(/border(-[a-z]+)?-color:\s*var\(--palette-gray-600\)/g, (match, suffix) => {
    fileReplacements++;
    return `border${suffix || ''}-color: var(--border-strong)`;
  });
  content = content.replace(/border(-[a-z]+)?-color:\s*var\(--palette-gray-800\)/g, (match, suffix) => {
    fileReplacements++;
    return `border${suffix || ''}-color: var(--border-subtle)`;
  });

  // Border shorthand (1px solid var(...))
  content = content.replace(/border:\s*1px\s+solid\s+var\(--palette-gray-700\)/g, () => {
    fileReplacements++;
    return 'border: 1px solid var(--border-default)';
  });
  content = content.replace(/border:\s*1px\s+solid\s+var\(--palette-gray-600\)/g, () => {
    fileReplacements++;
    return 'border: 1px solid var(--border-strong)';
  });

  // Fill (SVG)
  content = content.replace(/fill:\s*var\(--palette-gray-400\)/g, () => {
    fileReplacements++;
    return 'fill: var(--text-tertiary)';
  });
  content = content.replace(/fill:\s*var\(--palette-gray-500\)/g, () => {
    fileReplacements++;
    return 'fill: var(--text-tertiary)';
  });
  content = content.replace(/fill:\s*var\(--palette-gray-600\)/g, () => {
    fileReplacements++;
    return 'fill: var(--text-secondary)';
  });

  // Stroke (SVG)
  content = content.replace(/stroke:\s*var\(--palette-gray-400\)/g, () => {
    fileReplacements++;
    return 'stroke: var(--text-tertiary)';
  });
  content = content.replace(/stroke:\s*var\(--palette-gray-600\)/g, () => {
    fileReplacements++;
    return 'stroke: var(--text-secondary)';
  });

  // Box-shadow with gray
  content = content.replace(/box-shadow:\s*([^;]*?)var\(--palette-gray-900\)/g, (match, prefix) => {
    fileReplacements++;
    return `box-shadow: ${prefix}var(--surface-secondary)`;
  });

  // Outline color
  content = content.replace(/outline-color:\s*var\(--palette-gray-600\)/g, () => {
    fileReplacements++;
    return 'outline-color: var(--border-strong)';
  });

  // Additional color gray-600 (text-disabled)
  content = content.replace(/color:\s*var\(--palette-gray-600\)/g, () => {
    fileReplacements++;
    return 'color: var(--text-disabled)';
  });

  // Additional color gray-50 (text-primary for brightest)
  content = content.replace(/color:\s*var\(--palette-gray-50\)/g, () => {
    fileReplacements++;
    return 'color: var(--text-primary)';
  });

  // Border color gray-750 (border-subtle)
  content = content.replace(/border(-[a-z]+)?-color:\s*var\(--palette-gray-750\)/g, (match, suffix) => {
    fileReplacements++;
    return `border${suffix || ''}-color: var(--border-subtle)`;
  });

  // Linear gradients with gray (skeleton loading) - use surface tokens
  content = content.replace(/var\(--palette-gray-750\)/g, () => {
    fileReplacements++;
    return 'var(--surface-tertiary)';
  });
  content = content.replace(/var\(--palette-gray-700\)/g, () => {
    fileReplacements++;
    return 'var(--surface-quaternary)';
  });

  // Remaining palette-gray usages
  content = content.replace(/stroke:\s*var\(--palette-gray-800\)/g, () => {
    fileReplacements++;
    return 'stroke: var(--surface-primary)';
  });
  content = content.replace(/var\(--palette-gray-900\)/g, () => {
    fileReplacements++;
    return 'var(--surface-secondary)';
  });
  content = content.replace(/var\(--palette-gray-800\)/g, () => {
    fileReplacements++;
    return 'var(--surface-primary)';
  });
  content = content.replace(/var\(--palette-gray-600\)/g, () => {
    fileReplacements++;
    return 'var(--surface-quaternary)';
  });
  content = content.replace(/var\(--palette-gray-200\)/g, () => {
    fileReplacements++;
    return 'var(--surface-tertiary)';
  });
  content = content.replace(/var\(--palette-gray-300\)/g, () => {
    fileReplacements++;
    return 'var(--surface-quaternary)';
  });

  // Orange → Warning semantic tokens
  content = content.replace(/var\(--palette-orange-(\d+)\)/g, (match, shade) => {
    fileReplacements++;
    return `var(--color-warning-${shade})`;
  });

  // Grey (typo) → use same mapping as gray (surface/text/border)
  content = content.replace(/background:\s*var\(--palette-grey-800\)/g, () => {
    fileReplacements++;
    return 'background: var(--surface-primary)';
  });
  content = content.replace(/background:\s*var\(--palette-grey-700\)/g, () => {
    fileReplacements++;
    return 'background: var(--surface-quaternary)';
  });
  content = content.replace(/background:\s*var\(--palette-grey-600\)/g, () => {
    fileReplacements++;
    return 'background: var(--surface-quaternary)';
  });
  content = content.replace(/background:\s*var\(--palette-grey-500\)/g, () => {
    fileReplacements++;
    return 'background: var(--surface-quinary)';
  });
  content = content.replace(/color:\s*var\(--palette-grey-100\)/g, () => {
    fileReplacements++;
    return 'color: var(--text-primary)';
  });
  content = content.replace(/color:\s*var\(--palette-grey-400\)/g, () => {
    fileReplacements++;
    return 'color: var(--text-tertiary)';
  });
  content = content.replace(/border-color:\s*var\(--palette-grey-700\)/g, () => {
    fileReplacements++;
    return 'border-color: var(--border-default)';
  });
  content = content.replace(/border-color:\s*var\(--palette-grey-900\)/g, () => {
    fileReplacements++;
    return 'border-color: var(--border-subtle)';
  });

  // Yellow → Warning (already mapped to orange/warning)
  content = content.replace(/var\(--palette-yellow-(\d+)\)/g, (match, shade) => {
    fileReplacements++;
    return `var(--color-warning-${shade})`;
  });

  // Red → Error semantic tokens
  content = content.replace(/var\(--palette-red-(\d+)\)/g, (match, shade) => {
    fileReplacements++;
    return `var(--color-error-${shade})`;
  });

  // Blue → Primary semantic tokens
  content = content.replace(/var\(--palette-blue-(\d+)\)/g, (match, shade) => {
    fileReplacements++;
    return `var(--color-primary-${shade})`;
  });

  // Green → Success semantic tokens
  content = content.replace(/var\(--palette-green-(\d+)\)/g, (match, shade) => {
    fileReplacements++;
    return `var(--color-success-${shade})`;
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`✅ ${path.relative(componentsDir, file)}: ${fileReplacements} replacements`);
    totalReplacements += fileReplacements;
  }
}

console.log(`\n📊 Total: ${totalReplacements} replacements in ${cssFiles.length} files`);

// Check remaining palette-gray usages
const { execSync } = require('child_process');
try {
  const remaining = execSync(`grep -r "palette-gray" "${componentsDir}" --include="*.css" | wc -l`, { encoding: 'utf8' });
  console.log(`⚠️  Remaining palette-gray usages: ${remaining.trim()}`);
} catch (e) {
  console.log('✅ No remaining palette-gray usages');
}
