#!/usr/bin/env node
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync, cpSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const root = process.cwd();
const args = process.argv.slice(2);
const command = args[0] === 'build' || args[0] === 'preview' ? args[0] : 'dev';
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.jsx': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };

function readBase() {
  const configPath = join(root, 'vite.config.js');
  if (!existsSync(configPath)) return '/';
  const match = readFileSync(configPath, 'utf8').match(/base\s*:\s*['"]([^'"]+)['"]/);
  return match?.[1] || '/';
}
function withSlash(path) {
  return path.endsWith('/') ? path : `${path}/`;
}
function assetPath(base, path) {
  return `${withSlash(base)}${path.replace(/^\/+/, '')}`;
}
function transformJs(code, base = '/') {
  return code
    .replace(/import React from ['"]react['"];?/g, `import React from '${assetPath(base, 'node_modules/react/index.js')}';`)
    .replace(/import \{ Fragment \} from ['"]react['"];?/g, `import { Fragment } from '${assetPath(base, 'node_modules/react/index.js')}';`)
    .replace(/import \{ createRoot \} from ['"]react-dom\/client['"];?/g, `import { createRoot } from '${assetPath(base, 'node_modules/react-dom/client.js')}';`)
    .replace(/import ['"]\.\/styles\.css['"];?/g, `const __style = document.createElement('link'); __style.rel = 'stylesheet'; __style.href = '${assetPath(base, 'src/styles.css')}'; document.head.appendChild(__style);`);
}
function safePath(urlPath, baseDir = root, publicBase = '/') {
  let requestPath = decodeURIComponent(urlPath.split('?')[0]);
  const normalizedBase = withSlash(publicBase);
  if (normalizedBase !== '/' && requestPath.startsWith(normalizedBase)) {
    requestPath = `/${requestPath.slice(normalizedBase.length)}`;
  }
  const clean = requestPath.replace(/^\/+/, '') || 'index.html';
  const file = normalize(join(baseDir, clean));
  if (!file.startsWith(baseDir)) return null;
  return file;
}
function send(res, status, body, type = 'text/plain') { res.writeHead(status, { 'content-type': type }); res.end(body); }
function serve(baseDir, port = 5173, publicBase = '/') {
  const server = createServer((req, res) => {
    let file = safePath(req.url === '/' ? '/index.html' : req.url, baseDir, publicBase);
    if (!file || !existsSync(file)) return send(res, 404, 'Not found');
    if (statSync(file).isDirectory()) file = join(file, 'index.html');
    let body = readFileSync(file);
    const ext = extname(file);
    if (ext === '.js' || ext === '.jsx') body = transformJs(body.toString(), publicBase);
    send(res, 200, body, mime[ext] || 'application/octet-stream');
  });
  server.listen(port, '0.0.0.0', () => console.log(`  Local:   http://localhost:${port}${withSlash(publicBase)}`));
}
function build() {
  const base = readBase();
  const dist = join(root, 'dist');
  rmSync(dist, { recursive: true, force: true });
  mkdirSync(join(dist, 'src'), { recursive: true });
  mkdirSync(join(dist, 'node_modules/react'), { recursive: true });
  mkdirSync(join(dist, 'node_modules/react-dom'), { recursive: true });
  const html = readFileSync(join(root, 'index.html'), 'utf8').replace('src="/src/main.jsx"', `src="${assetPath(base, 'src/main.jsx')}"`);
  writeFileSync(join(dist, 'index.html'), html);
  writeFileSync(join(dist, '.nojekyll'), '');
  writeFileSync(join(dist, 'src/main.jsx'), transformJs(readFileSync(join(root, 'src/main.jsx'), 'utf8'), base));
  cpSync(join(root, 'src/styles.css'), join(dist, 'src/styles.css'));
  cpSync(join(root, 'node_modules/react/index.js'), join(dist, 'node_modules/react/index.js'));
  cpSync(join(root, 'node_modules/react-dom/client.js'), join(dist, 'node_modules/react-dom/client.js'));
  console.log('vite v0.0.0-local building for production...');
  console.log(`base: ${base}`);
  console.log('✓ built in dist');
}
if (command === 'build') build();
else if (command === 'preview') serve(join(root, 'dist'), 4173, readBase());
else serve(root, 5173, '/');
