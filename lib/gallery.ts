import 'server-only';

import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { GALLERY_CATEGORIES, type GalleryCategoryConfig } from './gallery-config';

export type GalleryCategory = GalleryCategoryConfig & {
  coverImage: string | null;
  imageCount: number;
};

export type GalleryCategoryWithCoverPool = GalleryCategory & {
  /**
   * Additional cover images to cycle through on the client, excluding `coverImage`.
   * Values are filenames relative to `public/images/gallery/<category>/`.
   */
  coverPool: string[];
};

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

function galleryRootDir(): string {
  return join(process.cwd(), 'public', 'images', 'gallery');
}

function categoryDir(slug: string): string {
  return join(galleryRootDir(), slug);
}

function getNumericPrefix(filename: string): number {
  const match = /^(\d+)[_-]/.exec(filename);
  if (!match) return 0;
  const value = Number.parseInt(match[1], 10);
  return Number.isFinite(value) ? value : 0;
}

export function listCategorySlugs(): string[] {
  const root = galleryRootDir();
  return readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

export function listCategoryImages(slug: string): string[] {
  const dir = categoryDir(slug);
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

function titleFromSlug(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function buildOrderedCategorySlugs(): string[] {
  const slugsOnDisk = new Set(listCategorySlugs());
  return [
    ...GALLERY_CATEGORIES.filter((c) => slugsOnDisk.has(c.slug)).map((c) => c.slug),
    ...Array.from(slugsOnDisk)
      .filter((slug) => !GALLERY_CATEGORIES.some((c) => c.slug === slug))
      .sort((a, b) => a.localeCompare(b, 'en')),
  ];
}

function buildCoverPool(images: string[], poolSize: number): string[] {
  const others = images.slice(1);
  if (others.length <= 1) return others;
  if (others.length <= poolSize) return others;

  const selected = new Set<string>();
  const step = others.length / poolSize;
  for (let i = 0; i < poolSize; i += 1) {
    const index = Math.floor(i * step);
    const candidate = others[index];
    if (candidate) selected.add(candidate);
  }

  return Array.from(selected);
}

export function getCategoryConfig(
  slug: string | undefined | null
): GalleryCategoryConfig {
  if (!slug) {
    return { slug: '', title: 'Gallery', description: '' };
  }

  const match = GALLERY_CATEGORIES.find((c) => c.slug === slug);
  return match ?? { slug, title: titleFromSlug(slug), description: '' };
}

export function listCategories(): GalleryCategory[] {
  const ordered = buildOrderedCategorySlugs();

  return ordered.map((slug) => {
    const images = listCategoryImages(slug);
    return {
      ...getCategoryConfig(slug),
      coverImage: images[0] ?? null,
      imageCount: images.length,
    };
  });
}

export function listCategoriesWithCoverPool({
  poolSize = 24,
}: {
  poolSize?: number;
} = {}): GalleryCategoryWithCoverPool[] {
  const ordered = buildOrderedCategorySlugs();

  return ordered.map((slug) => {
    const images = listCategoryImages(slug);
    return {
      ...getCategoryConfig(slug),
      coverImage: images[0] ?? null,
      coverPool: buildCoverPool(images, poolSize),
      imageCount: images.length,
    };
  });
}
