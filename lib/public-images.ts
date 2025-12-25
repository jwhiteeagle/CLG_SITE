import 'server-only';

import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

function getNumericPrefix(filename: string): number {
  const match = /^(\d+)[_-]/.exec(filename);
  if (!match) return 0;
  const value = Number.parseInt(match[1], 10);
  return Number.isFinite(value) ? value : 0;
}

export function listPublicImages(publicSubdir: string): string[] {
  const dir = join(process.cwd(), 'public', publicSubdir);
  if (!existsSync(dir)) return [];

  const entries = readdirSync(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => {
      const lower = name.toLowerCase();
      const dotIndex = lower.lastIndexOf('.');
      if (dotIndex === -1) return false;
      const ext = lower.slice(dotIndex);
      return IMAGE_EXTENSIONS.has(ext);
    })
    .sort((a, b) => {
      const aPrefix = getNumericPrefix(a);
      const bPrefix = getNumericPrefix(b);
      if (aPrefix !== bPrefix) return bPrefix - aPrefix; // desc
      return a.localeCompare(b, 'en', { numeric: true, sensitivity: 'base' });
    });
}
