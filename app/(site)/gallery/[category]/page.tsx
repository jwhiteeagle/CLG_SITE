import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { getCategoryConfig, listCategoryImages, listCategorySlugs } from '@/lib/gallery';

export const dynamicParams = false;

export function generateStaticParams() {
  return listCategorySlugs().map((category) => ({ category }));
}

export function generateMetadata({
  params,
}: {
  params: { category?: string };
}): Metadata {
  const category = getCategoryConfig(params.category);
  return {
    title: `${category.title} | Gallery`,
    description: category.description
      ? `${category.title} gallery: ${category.description}`
      : `Browse ${category.title} featured work.`,
  };
}

function altFromFilename(filename: string): string {
  const noExt = filename.replace(/\.[^.]+$/, '');
  const noPrefix = noExt.replace(/^\d+[._-]/, '');
  return noPrefix.replace(/[-_]+/g, ' ').trim() || 'Gallery image';
}

export default function GalleryCategoryPage({
  params,
}: {
  params: { category?: string };
}) {
  const slug = params.category;
  if (typeof slug !== 'string') {
    notFound();
  }

  const slugs = new Set(listCategorySlugs());
  if (!slugs.has(slug)) {
    notFound();
  }

  const category = getCategoryConfig(slug);
  const images = listCategoryImages(slug);

  return (
    <div className="site-section">
      <div className="page-header">
        <h1>{category.title}</h1>
        {category.description ? <p>{category.description}</p> : null}
      </div>

      {images.length === 0 ? (
        <div className="text-muted-foreground text-sm">
          No images found in this category yet.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => {
            const src = `/images/gallery/${slug}/${image}`;
            return (
              <a
                key={image}
                href={src}
                target="_blank"
                rel="noreferrer"
                className="site-card group block overflow-hidden p-0"
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={src}
                    alt={altFromFilename(image)}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                  />
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
