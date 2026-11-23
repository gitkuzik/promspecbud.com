// Extracts all translations (shared dict + per-page dicts) into a single JSON file
// so the static-language build script can bake them into plain HTML.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PAGES = [
  'index.html', 'vidy-robit.html', 'tehnika.html', 'proekty.html',
  'galereya.html', 'video.html', 'licenzii.html', 'kontakty.html'
];

// 1. Extract the SHARED object from js/i18n.js (it is a plain JS object literal).
const i18n = fs.readFileSync(path.join(ROOT, 'js', 'i18n.js'), 'utf8');
const m = i18n.match(/var SHARED = (\{[\s\S]*?\n\s*\});/);
if (!m) { console.error('Could not locate SHARED in js/i18n.js'); process.exit(1); }
const shared = eval('(' + m[1] + ')');

// 2. Extract per-page dicts.
const pages = {};
for (const page of PAGES) {
  const html = fs.readFileSync(path.join(ROOT, 'templates', page), 'utf8');
  const dm = html.match(/<script type="application\/json" id="i18n-page-dict">([\s\S]*?)<\/script>/);
  if (!dm) { console.error('No page dict in ' + page); process.exit(1); }
  pages[page] = JSON.parse(dm[1]);
}

fs.writeFileSync(
  path.join(ROOT, 'tools', 'translations.json'),
  JSON.stringify({ shared, pages }, null, 2)
);
console.log('Extracted translations: shared langs =', Object.keys(shared).join(','),
  '| pages =', Object.keys(pages).length);
