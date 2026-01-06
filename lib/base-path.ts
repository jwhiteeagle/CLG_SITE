const RAW_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

function normalizeBasePath(value: string): string {
  const trimmed = value.trim();
  if (!trimmed || trimmed === '/') return '';
  if (!trimmed.startsWith('/')) return `/${trimmed}`.replace(/\/+$/, '');
  return trimmed.replace(/\/+$/, '');
}

export const BASE_PATH = normalizeBasePath(RAW_BASE_PATH);

export function withBasePath(pathname: string): string {
  if (!BASE_PATH) return pathname;
  if (!pathname.startsWith('/')) return pathname;
  if (pathname === BASE_PATH) return pathname;
  if (pathname.startsWith(`${BASE_PATH}/`)) return pathname;
  return `${BASE_PATH}${pathname}`;
}

