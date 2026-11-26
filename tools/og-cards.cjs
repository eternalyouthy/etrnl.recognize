/* Builds link-preview cards (Open Graph / X) for every main section.
 *
 * Hash routes (#/roots) never reach a crawler, so each section gets a real path
 * that crawlers can read: /recognize/roots/ -> roots/index.html with its own
 * og:* tags, which forwards people to ../#/roots. Images go to icons/og/.
 *
 * Usage:  node tools/og-cards.cjs          (needs Google Chrome; fonts load online)
 * Edit SECTIONS below, run again, commit the generated folders and icons/og/.
 * tools/ is not deployed (excluded in deploy.ps1). */
const fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process');

const SITE = 'https://etrnl.world/recognize/';
const ROOT = path.resolve(__dirname, '..');
const TAGLINE = 'A different approach to learning words. Open source, free, no data collection.';
const CHIPS = ['Open source', 'Free', 'No tracking'];

// path (folder under the app) · hash route · eyebrow · title · description
const SECTIONS = [
  { path: '', hash: '', title: 'Multilingual vocabulary trainer', desc: 'German, English and Russian through word roots, grammar and spaced repetition.' },
  { path: 'de', hash: 'start?lang=de', eyebrow: 'German', title: 'Learn German', desc: 'Words, roots, cases and grammar from B1 to C1, with Russian and English translations.' },
  { path: 'en', hash: 'start?lang=en', eyebrow: 'English', title: 'Learn English', desc: 'Words, phrasal verbs, idioms and grammar, with Russian and German translations.' },
  { path: 'ru', hash: 'start?lang=ru', eyebrow: 'Russian', title: 'Learn Russian', desc: 'Words, roots and grammar from A2 to C1, with stress marks and English and German translations.' },
  { path: 'words', hash: 'words', eyebrow: 'Words', title: 'Words by topic', desc: 'Everyday vocabulary grouped by theme, with examples, translations and spaced repetition.' },
  { path: 'roots', hash: 'roots', eyebrow: 'Roots', title: 'One root, many words', desc: 'Learn a base verb once, then see how every prefix and particle changes its meaning.' },
  { path: 'grammar', hash: 'grammar', eyebrow: 'Grammar', title: 'Grammar, explained', desc: 'Short lessons from B1 to C1 with examples and practice.' },
  { path: 'professional', hash: 'professional', eyebrow: 'Professional', title: 'Language for work', desc: 'Meetings, emails, clients and careers — then your own field, up to C1–C2.' },
  { path: 'professional/for-everyone', hash: 'professional/for-everyone', eyebrow: 'Professional', title: 'For everyone', desc: 'Office communication, meetings, clients, presentations and careers — the core every job shares.' },
  { path: 'professional/it', hash: 'professional/it', eyebrow: 'Professional', title: 'IT professions', desc: 'Software engineering, cloud, cybersecurity, UX, AI and data, agile product work.' },
  { path: 'professional/bureaucracy', hash: 'professional/bureaucracy', eyebrow: 'Professional', title: 'Bureaucracy & administration', desc: 'Public offices, permits, taxes, payroll, social security and official letters.' },
  { path: 'professional/legal', hash: 'professional/legal', eyebrow: 'Professional', title: 'Legal & law', desc: 'Contracts, intellectual property, courts, labour law and compliance.' },
  { path: 'professional/service', hash: 'professional/service', eyebrow: 'Professional', title: 'Service, hospitality & retail', desc: 'Hotels, gastronomy, retail sales and customer support.' },
  { path: 'professional/business', hash: 'professional/business', eyebrow: 'Professional', title: 'Finance, HR & marketing', desc: 'Accounting, sales, marketing and PR, recruiting and HR.' },
  { path: 'professional/operations', hash: 'professional/operations', eyebrow: 'Professional', title: 'Healthcare, logistics & trades', desc: 'Healthcare, supply chain, engineering, construction and technical trades.' },
  { path: 'expressions', hash: 'expressions', eyebrow: 'Expressions', title: 'Idioms, slang & everyday speech', desc: 'How people actually talk — idioms, slang and set phrases with real examples.' },
  { path: 'chunks', hash: 'chunks/all', eyebrow: 'Chunks', title: 'Ready-made phrases', desc: 'Word combinations you can use as they are, so speech sounds natural.' },
  { path: 'literature', hash: 'literature/all', eyebrow: 'Literary', title: 'Literary phrases', desc: 'Quotes and turns of phrase from books, with context and translation.' },
  { path: 'vocabulary', hash: 'vocabulary', eyebrow: 'Catalogue', title: 'The whole catalogue', desc: 'Search every word, root and phrase across all packs.' },
  { path: 'practice', hash: 'practice', eyebrow: 'Practice', title: 'Practice', desc: 'Flashcards with spaced repetition (FSRS), so you review just before you forget.' }
];

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slug = p => p ? p.replace(/\//g, '-') : '';
const imgRel = s => s.path ? 'icons/og/' + slug(s.path) + '.png' : 'icons/og-image.png';
const pageTitle = s => s.path ? s.title + ' · RECGZ' : 'RECGZ — multilingual vocabulary trainer';
const fullDesc = s => s.desc + ' ' + TAGLINE;

const EYE = '<svg width="SIZE" height="SIZE" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0b1320" stroke="rgba(140,203,255,.35)"/>' +
  '<g transform="translate(8 8) scale(2)" fill="none" stroke="#8ccbff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
  '<defs><clipPath id="c"><path d="M1 12C4.5 8 8 6.5 12 6.5s7.5 1.5 11 5.5c-3.5 4-7 5.5-11 5.5S4.5 16 1 12Z"/></clipPath></defs>' +
  '<path d="M1 12C4.5 8 8 6.5 12 6.5s7.5 1.5 11 5.5c-3.5 4-7 5.5-11 5.5S4.5 16 1 12Z"/>' +
  '<circle cx="17" cy="12" r="2.8" fill="#8ccbff" stroke="none" clip-path="url(#c)"/></g></svg>';
const STARS = '<svg class="stars" viewBox="0 0 1200 630"><g stroke="rgba(140,203,255,.22)" stroke-width="1.5">' +
  '<line x1="900" y1="90" x2="990" y2="150"/><line x1="990" y1="150" x2="1080" y2="118"/><line x1="1080" y1="118" x2="1140" y2="210"/><line x1="990" y1="150" x2="968" y2="244"/><line x1="968" y1="244" x2="1040" y2="270"/>' +
  '<line x1="930" y1="480" x2="1020" y2="540"/><line x1="1020" y1="540" x2="1110" y2="512"/></g><g fill="#8ccbff" opacity=".7">' +
  [[900, 90], [990, 150], [1080, 118], [1140, 210], [968, 244], [1040, 270], [930, 480], [1020, 540], [1110, 512]].map(p => '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="3"/>').join('') + '</g></svg>';

function cardHTML(s) {
  const main = !s.path;
  return '<!doctype html><html><head><meta charset="utf-8">' +
    '<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet"><style>' +
    'html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#04060a}' +
    '.c{position:relative;width:1200px;height:630px;box-sizing:border-box;padding:' + (main ? '88px' : '72px') + ' 96px;color:#e6edf6;font-family:Inter,sans-serif;' +
    'background:radial-gradient(900px 520px at 88% 12%,rgba(140,203,255,.16),transparent 60%),radial-gradient(700px 500px at 0% 110%,rgba(120,110,255,.12),transparent 60%),#04060a}' +
    '.stars{position:absolute;inset:0}.logo{display:flex;align-items:center;gap:' + (main ? 28 : 18) + 'px;position:relative}' +
    '.brand{font-family:"Space Grotesk";font-weight:700;font-size:' + (main ? 112 : 44) + 'px;letter-spacing:.04em;line-height:1}' +
    '.eb{margin:56px 0 0;font-family:"JetBrains Mono";font-weight:500;font-size:24px;letter-spacing:.14em;text-transform:uppercase;color:#8ccbff}' +
    'h2{margin:' + (main ? '52px' : '14px') + ' 0 0;font-family:"Space Grotesk";font-weight:' + (main ? 500 : 700) + ';font-size:' + (main ? 46 : 64) + 'px;line-height:1.1;max-width:1000px;position:relative}' +
    'p{margin:22px 0 0;font-size:28px;color:#93a1b5;max-width:960px;line-height:1.4;position:relative}' +
    '.chips{position:absolute;left:96px;bottom:72px;display:flex;gap:16px}' +
    '.chip{font-family:"JetBrains Mono";font-weight:500;font-size:22px;padding:10px 22px;border:1.5px solid rgba(140,203,255,.45);border-radius:999px;color:#8ccbff;background:rgba(140,203,255,.06)}' +
    '</style></head><body><div class="c">' + STARS +
    '<div class="logo">' + EYE.replace(/SIZE/g, main ? 120 : 56) + '<div class="brand">RECGZ</div></div>' +
    (main ? '' : '<div class="eb">' + esc(s.eyebrow) + '</div>') +
    '<h2>' + esc(s.title) + '</h2><p>' + esc(main ? 'A different approach to learning words — through roots, grammar and spaced repetition.' : s.desc) + '</p>' +
    '<div class="chips">' + (main ? ['DE', 'EN', 'RU'] : []).concat(CHIPS).map(c => '<span class="chip">' + c + '</span>').join('') + '</div>' +
    '</div></body></html>';
}

function metaTags(s) {
  // ?v=<content hash>: X and Telegram cache previews by image URL, so a changed card needs a new URL.
  const ver = require('crypto').createHash('sha1').update(fs.readFileSync(path.join(ROOT, imgRel(s)))).digest('hex').slice(0, 8);
  const url = SITE + (s.path ? s.path + '/' : ''), img = SITE + imgRel(s) + '?v=' + ver, t = esc(pageTitle(s)), d = esc(fullDesc(s)), alt = esc(pageTitle(s));
  return [
    '<link rel="canonical" href="' + url + '">',
    '<meta name="description" content="' + d + '">',
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="RECGZ">',
    '<meta property="og:title" content="' + t + '">',
    '<meta property="og:description" content="' + d + '">',
    '<meta property="og:url" content="' + url + '">',
    '<meta property="og:image" content="' + img + '">',
    '<meta property="og:image:type" content="image/png">',
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta property="og:image:alt" content="' + alt + '">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="twitter:title" content="' + t + '">',
    '<meta name="twitter:description" content="' + d + '">',
    '<meta name="twitter:image" content="' + img + '">',
    '<meta name="twitter:image:alt" content="' + alt + '">'
  ].join('\n');
}

function stubHTML(s) {
  const up = '../'.repeat(s.path.split('/').length), target = up + '#/' + s.hash;
  return '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    '<title>' + esc(pageTitle(s)) + '</title>\n' + metaTags(s) + '\n<meta name="theme-color" content="#04060a">\n' +
    '<link rel="icon" href="' + up + 'icons/icon.svg?v=4" type="image/svg+xml">\n' +
    '<!-- Generated by tools/og-cards.cjs. Crawlers read the tags above; people are sent on to the app. -->\n' +
    '<meta http-equiv="refresh" content="0; url=' + target + '">\n<script>location.replace(' + JSON.stringify(target) + ');</script>\n' +
    '<style>body{margin:0;background:#04060a;color:#93a1b5;font:16px/1.5 system-ui,sans-serif;display:grid;place-items:center;min-height:100vh}a{color:#8ccbff}</style>\n' +
    '</head>\n<body><a href="' + target + '">Open RECGZ · ' + esc(s.title) + '</a></body>\n</html>\n';
}

function findChrome() {
  const c = [process.env.CHROME, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean);
  const hit = c.find(p => fs.existsSync(p));
  if (!hit) throw new Error('Chrome not found; set CHROME=/path/to/chrome');
  return hit;
}

const chrome = findChrome(), tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'og-')), stubs = [];
fs.mkdirSync(path.join(ROOT, 'icons/og'), { recursive: true });
for (const s of SECTIONS) {
  const html = path.join(tmp, (slug(s.path) || 'main') + '.html');
  fs.writeFileSync(html, cardHTML(s));
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--window-size=1200,630',
    '--virtual-time-budget=5000', '--user-data-dir=' + path.join(tmp, 'profile'), '--screenshot=' + path.join(ROOT, imgRel(s)),
    'file:///' + html.replace(/\\/g, '/')], { stdio: 'ignore' });
  if (s.path) {
    fs.mkdirSync(path.join(ROOT, s.path), { recursive: true });
    fs.writeFileSync(path.join(ROOT, s.path, 'index.html'), stubHTML(s));
    stubs.push(s.path);
  }
  console.log('ok', s.path || '(main)', '->', imgRel(s));
}
// Keep the app's own index.html tags in sync with the main card.
const idx = path.join(ROOT, 'index.html'), main = SECTIONS[0];
let src = fs.readFileSync(idx, 'utf8');
src = src.replace(/<link rel="canonical"[\s\S]*?<meta name="twitter:image:alt"[^>]*>/, metaTags(main).replace('<meta name="description" content="' + esc(fullDesc(main)) + '">\n', '<!-- Link previews (Telegram, Reddit, X, Discord, WhatsApp…). Generated by tools/og-cards.cjs. -->\n'));
src = src.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="' + esc(fullDesc(main)) + '">');
fs.writeFileSync(idx, src);
fs.rmSync(tmp, { recursive: true, force: true });
console.log('\nShare links:\n' + stubs.map(p => '  ' + SITE + p + '/').join('\n'));
