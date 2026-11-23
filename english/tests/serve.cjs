/* Loopback-only QA server; serves only this English module. No dependencies. */
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const port = Number(process.argv[2] || 8766);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('Expected a port between 1024 and 65535.');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.md': 'text/plain; charset=utf-8' };
const server = http.createServer((req, res) => {
  let target;
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
    target = path.resolve(root, '.' + (pathname === '/' ? '/standalone.html' : pathname));
    const relative = path.relative(root, target);
    if (relative.startsWith('..') || path.isAbsolute(relative)) { res.writeHead(403); res.end('Forbidden'); return; }
  } catch (err) { res.writeHead(400); res.end('Bad request'); return; }
  fs.readFile(target, (error, content) => {
    if (error) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }); res.end(content);
  });
});
server.listen(port, '127.0.0.1', () => console.log(`English preview: http://127.0.0.1:${port}`));
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
