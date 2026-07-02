import { Fragment } from 'react';

function setProp(node, key, value) {
  if (key === 'className') node.setAttribute('class', value);
  else if (key === 'htmlFor') node.setAttribute('for', value);
  else if (key.startsWith('on') && typeof value === 'function') node.addEventListener(key.slice(2).toLowerCase(), value);
  else if (key !== 'children' && value !== false && value != null) node.setAttribute(key, value === true ? '' : value);
}

function renderNode(vnode) {
  if (vnode == null || vnode === false) return document.createTextNode('');
  if (typeof vnode === 'string' || typeof vnode === 'number') return document.createTextNode(String(vnode));
  if (Array.isArray(vnode)) {
    const fragment = document.createDocumentFragment();
    vnode.forEach((child) => fragment.appendChild(renderNode(child)));
    return fragment;
  }
  if (typeof vnode.type === 'function') return renderNode(vnode.type({ ...vnode.props, children: vnode.children }));
  if (vnode.type === Fragment) return renderNode(vnode.children);
  const node = document.createElement(vnode.type);
  Object.entries(vnode.props || {}).forEach(([key, value]) => setProp(node, key, value));
  (vnode.children || []).forEach((child) => node.appendChild(renderNode(child)));
  return node;
}

export function createRoot(container) {
  return { render(vnode) { container.replaceChildren(renderNode(vnode)); } };
}
