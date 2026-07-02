#!/usr/bin/env node
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync, cpSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const root = process.cwd();
const args = process.argv.slice(2);
const command = args[0] === 'build' || args[0] === 'preview' ? args[0] : 'dev';
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.jsx': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };

function transformJs(code) {
  return code
    .replace(/import React from ['"]react['"];?/g, "import React from '/node_modules/react/index.js';")
    .replace(/import \{ Fragment \} from ['"]react['"];?/g, "import { Fragment } from '/node_modules/react/index.js';")
    .replace(/import \{ createRoot \} from ['"]react-dom\/client['"];?/g, "import { createRoot } from '/node_modules/react-dom/client.js';")
    .replace(/import ['"]\.\/styles\.css['"];?/g, "const __style = document.createElement('link'); __style.rel = 'stylesheet'; __style.href = '/src/styles.css'; document.head.appendChild(__style);");
}
function safePath(urlPath, base = root) {
  const clean = decodeURIComponent(urlPath.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const file = normalize(join(base, clean));
  if (!file.startsWith(base)) return null;
  return file;
}
function send(res, status, body, type = 'text/plain') { res.writeHead(status, { 'content-type': type }); res.end(body); }
function serve(base, port = 5173) {
  const server = createServer((req, res) => {
    let file = safePath(req.url === '/' ? '/index.html' : req.url, base);
    if (!file || !existsSync(file)) return send(res, 404, 'Not found');
    if (statSync(file).isDirectory()) file = join(file, 'index.html');
    let body = readFileSync(file);
    const ext = extname(file);
    if (ext === '.js' || ext === '.jsx') body = transformJs(body.toString());
    send(res, 200, body, mime[ext] || 'application/octet-stream');
  });
  server.listen(port, '0.0.0.0', () => console.log(`  Local:   http://localhost:${port}/`));
}
function build() {
  const dist = join(root, 'dist');
  rmSync(dist, { recursive: true, force: true });
  mkdirSync(join(dist, 'src'), { recursive: true });
  mkdirSync(join(dist, 'node_modules/react'), { recursive: true });
  mkdirSync(join(dist, 'node_modules/react-dom'), { recursive: true });
  writeFileSync(join(dist, 'index.html'), readFileSync(join(root, 'index.html')));
  writeFileSync(join(dist, 'src/main.jsx'), transformJs(readFileSync(join(root, 'src/main.jsx'), 'utf8')));
  cpSync(join(root, 'src/styles.css'), join(dist, 'src/styles.css'));
  cpSync(join(root, 'node_modules/react/index.js'), join(dist, 'node_modules/react/index.js'));
  cpSync(join(root, 'node_modules/react-dom/client.js'), join(dist, 'node_modules/react-dom/client.js'));
  console.log('vite v0.0.0-local building for production...');
  console.log('✓ built in dist');
}
if (command === 'build') build();
else if (command === 'preview') serve(join(root, 'dist'), 4173);
else serve(root, 5173);
