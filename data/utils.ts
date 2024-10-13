import { promises as fs } from "fs";

export async function readFileIfExists(
  filePath: string
): Promise<string | null> {
  try {
    await fs.access(filePath);
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}

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
