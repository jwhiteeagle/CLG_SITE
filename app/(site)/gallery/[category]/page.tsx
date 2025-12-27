import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { getCategoryConfig, listCategoryImages, listCategorySlugs } from '@/lib/gallery';
import { PageTitleCard } from '@/components/app/page-title-card';
import { GalleryLightboxGrid, type LightboxImage } from '@/components/app/gallery-lightbox';

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
  const lightboxImages: LightboxImage[] = images.map((image) => ({
    src: `/images/gallery/${slug}/${image}`,
    alt: altFromFilename(image),
  }));

  return (
    <div className="site-section">
      <div className="mb-8">
        <PageTitleCard
          title={category.title}
          description={
            <div className="space-y-1">
              {category.description ? <p>{category.description}</p> : null}
              <p className="type-body-sm">{images.length} images</p>
            </div>
          }
        />
      </div>

      {images.length === 0 ? (
        <div className="type-body-sm">No images found in this category yet.</div>
      ) : (
        <GalleryLightboxGrid images={lightboxImages} />
      )}
    </div>
  );
}
