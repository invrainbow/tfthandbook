export function orThrow(message: string): never {
  throw new Error(message);
}

export function find(el: Document | Element, selector: string) {
  return el.querySelector(selector) ?? orThrow(`not found: ${selector}`);
}

export function findAll(el: Document | Element, selector: string) {
  return el.querySelectorAll(selector);
}

export function assert(cond: any, message: string) {
  if (!cond) {
    throw new Error(message);
  }
}
