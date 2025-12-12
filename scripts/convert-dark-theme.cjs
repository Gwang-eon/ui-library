const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all CSS files with prefers-color-scheme: dark
const files = execSync('grep -rl "prefers-color-scheme: dark" src/components --include="*.css"')
  .toString()
  .trim()
  .split('\n')
  .filter(f => f);

console.log(`Found ${files.length} files to convert`);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Check if already converted (has both patterns)
  if (content.includes(':global([data-theme="dark"])') && !content.includes('@media (prefers-color-scheme: dark)')) {
    console.log(`Skipping ${file} - already converted`);
    return;
  }

  // Find all @media (prefers-color-scheme: dark) blocks
  const mediaRegex = /@media\s*\(\s*prefers-color-scheme:\s*dark\s*\)\s*\{([\s\S]*?)\n\}/g;

  let match;
  let newRules = [];

  // Clone content for searching
  let searchContent = content;

  while ((match = mediaRegex.exec(searchContent)) !== null) {
    const mediaContent = match[1];

    // Parse individual rules inside the media query
    // Handle nested selectors and pseudo-classes
    const ruleRegex = /(\.[a-zA-Z_][a-zA-Z0-9_-]*(?:[.:\[\]a-zA-Z0-9_="\-\s,>+~]*)*)\s*\{([^}]+)\}/g;
    let ruleMatch;

    while ((ruleMatch = ruleRegex.exec(mediaContent)) !== null) {
      const selector = ruleMatch[1].trim();
      const properties = ruleMatch[2];

      // Handle comma-separated selectors
      const selectors = selector.split(',').map(s => s.trim());
      const darkSelectors = selectors.flatMap(s => [
        `:global([data-theme="dark"]) ${s}`,
        `:global(.dark) ${s}`
      ]);

      newRules.push(`${darkSelectors.join(',\n')} {${properties}}`);
    }
  }

  if (newRules.length > 0) {
    // Remove old media query blocks
    content = content.replace(/@media\s*\(\s*prefers-color-scheme:\s*dark\s*\)\s*\{[\s\S]*?\n\}/g, '');

    // Clean up extra blank lines
    content = content.replace(/\n{3,}/g, '\n\n');

    // Add dark mode header and new rules
    const darkModeSection = `
/* ========================================
   DARK MODE (data-theme)
   ======================================== */

${newRules.join('\n\n')}
`;

    // Try to insert before mobile responsive section
    const mobileMatch = content.match(/\/\* =+\s*\n\s*MOBILE/);
    if (mobileMatch) {
      const mobileIndex = content.indexOf(mobileMatch[0]);
      content = content.slice(0, mobileIndex) + darkModeSection + '\n' + content.slice(mobileIndex);
    } else {
      // Try before REDUCED MOTION
      const reducedMatch = content.match(/\/\* =+\s*\n\s*REDUCED/);
      if (reducedMatch) {
        const reducedIndex = content.indexOf(reducedMatch[0]);
        content = content.slice(0, reducedIndex) + darkModeSection + '\n' + content.slice(reducedIndex);
      } else {
        content += darkModeSection;
      }
    }

    fs.writeFileSync(file, content);
    console.log(`Converted ${file} (${newRules.length} rules)`);
  } else {
    console.log(`No rules found in ${file}`);
  }
});

console.log('Done!');
