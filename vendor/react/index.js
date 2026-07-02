export const Fragment = Symbol.for('react.fragment');
export function createElement(type, props, ...children) {
  return { type, props: props || {}, children: children.flat(Infinity) };
}
export default { createElement, Fragment };
