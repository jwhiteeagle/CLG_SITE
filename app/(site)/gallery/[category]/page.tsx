import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { getCategoryConfig, listCategoryImages, listCategorySlugs } from '@/lib/gallery';
import { GalleryCategoryHeader } from '@/components/app/gallery-category-header';

export const dynamicParams = false;

export function generateStaticParams() {
  return listCategorySlugs().map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category?: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryConfig(categorySlug);
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

export default async function GalleryCategoryPage({
  params,
}: {
  params: Promise<{ category?: string }>;
}) {
  const { category: slug } = await params;
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
      <div className="mb-8">
        <GalleryCategoryHeader
          title={category.title}
          description={
            <div className="space-y-1">
              {category.description ? <p>{category.description}</p> : null}
              <p className="text-muted-foreground text-sm">
                {images.length} images
              </p>
            </div>
          }
        />
      </div>

      {images.length === 0 ? (
        <div className="text-muted-foreground text-sm">
          No images found in this category yet.
        </div>
      ) : (
        <div className="gallery-images-grid">
          {images.map((image) => {
            const src = `/images/gallery/${slug}/${image}`;
            return (
              <a
                key={image}
                href={src}
                target="_blank"
                rel="noreferrer"
                className="gallery-card"
              >
                <div className="gallery-card-media gallery-card-media--image">
                  <Image
                    src={src}
                    alt={altFromFilename(image)}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="gallery-card-image"
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
