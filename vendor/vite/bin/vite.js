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
function transformDevJs(code, base = '/') {
  return code
    .replace(/import React from ['"]react['"];?/g, `import React from '${assetPath(base, 'node_modules/react/index.js')}';`)
    .replace(/import \{ Fragment \} from ['"]react['"];?/g, `import { Fragment } from '${assetPath(base, 'node_modules/react/index.js')}';`)
    .replace(/import \{ createRoot \} from ['"]react-dom\/client['"];?/g, `import { createRoot } from '${assetPath(base, 'node_modules/react-dom/client.js')}';`)
    .replace(/import ['"]\.\/styles\.css['"];?/g, `const __style = document.createElement('link'); __style.rel = 'stylesheet'; __style.href = '${assetPath(base, 'src/styles.css')}'; document.head.appendChild(__style);`);
}
function bundleApp() {
  const app = readFileSync(join(root, 'src/main.jsx'), 'utf8')
    .replace(/import React from ['"]react['"];?\n?/, '')
    .replace(/import \{ createRoot \} from ['"]react-dom\/client['"];?\n?/, '')
    .replace(/import ['"]\.\/styles\.css['"];?\n?/, '');
  return `const React = {\n  Fragment: Symbol.for('react.fragment'),\n  createElement(type, props, ...children) {\n    return { type, props: props || {}, children: children.flat(Infinity) };\n  },\n};\nfunction setProp(node, key, value) {\n  if (key === 'className') node.setAttribute('class', value);\n  else if (key === 'htmlFor') node.setAttribute('for', value);\n  else if (key.startsWith('on') && typeof value === 'function') node.addEventListener(key.slice(2).toLowerCase(), value);\n  else if (key !== 'children' && key !== 'key' && value !== false && value != null) node.setAttribute(key, value === true ? '' : value);\n}\nfunction renderNode(vnode) {\n  if (vnode == null || vnode === false) return document.createTextNode('');\n  if (typeof vnode === 'string' || typeof vnode === 'number') return document.createTextNode(String(vnode));\n  if (Array.isArray(vnode)) {\n    const fragment = document.createDocumentFragment();\n    vnode.forEach((child) => fragment.appendChild(renderNode(child)));\n    return fragment;\n  }\n  if (typeof vnode.type === 'function') return renderNode(vnode.type({ ...vnode.props, children: vnode.children }));\n  if (vnode.type === React.Fragment) return renderNode(vnode.children);\n  const node = document.createElement(vnode.type);\n  Object.entries(vnode.props || {}).forEach(([key, value]) => setProp(node, key, value));\n  (vnode.children || []).forEach((child) => node.appendChild(renderNode(child)));\n  return node;\n}\nfunction createRoot(container) {\n  return { render(vnode) { container.replaceChildren(renderNode(vnode)); } };\n}\n${app}`;
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
    if (ext === '.js' || ext === '.jsx') body = transformDevJs(body.toString(), publicBase);
    send(res, 200, body, mime[ext] || 'application/octet-stream');
  });
  server.listen(port, '0.0.0.0', () => console.log(`  Local:   http://localhost:${port}${withSlash(publicBase)}`));
}
function build() {
  const base = readBase();
  const dist = join(root, 'dist');
  rmSync(dist, { recursive: true, force: true });
  mkdirSync(join(dist, 'assets'), { recursive: true });
  const html = readFileSync(join(root, 'index.html'), 'utf8')
    .replace('<script type="module" src="/src/main.jsx"></script>', `<link rel="stylesheet" href="${assetPath(base, 'assets/styles.css')}" />\n    <script type="module" src="${assetPath(base, 'assets/main.js')}"></script>`);
  writeFileSync(join(dist, 'index.html'), html);
  writeFileSync(join(dist, '.nojekyll'), '');
  writeFileSync(join(dist, 'assets/main.js'), bundleApp());
  cpSync(join(root, 'src/styles.css'), join(dist, 'assets/styles.css'));
  console.log('vite v0.0.0-local building for production...');
  console.log(`base: ${base}`);
  console.log('✓ built in dist');
}
if (command === 'build') build();
else if (command === 'preview') serve(join(root, 'dist'), 4173, readBase());
else serve(root, 5173, '/');
