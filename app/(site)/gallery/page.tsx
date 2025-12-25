import Image from 'next/image';
import Link from 'next/link';
import { listCategories } from '@/lib/gallery';
import { GalleryCategoryHeader } from '@/components/app/gallery-category-header';

export default function GalleryPage() {
  const categories = listCategories();

  return (
    <div className="site-section">
      <div className="mb-8">
        <GalleryCategoryHeader
          title="Gallery"
          description={
            <>
              <p>
                I try to take pictures of most of the things I paint. I
                generally work on 2-4 commissions at once to avoid creative
                burnout. Unfortunately, that means I often forget to take
                pictures of finished projects.
              </p>
              <p className="mt-4 text-2xl font-bold">
                Browse some of my work below in <em>organized-ish</em> categories.
              </p>
            </>
          }
        />
      </div>

      <div className="gallery-categories-grid">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/gallery/${category.slug}`}
            className="gallery-card gallery-category-card"
          >
            <div className="gallery-card-media gallery-card-media--category">
              {category.coverImage ? (
                <Image
                  src={`/images/gallery/${category.slug}/${category.coverImage}`}
                  alt={category.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="gallery-card-image"
                />
              ) : (
                <div className="gallery-card-placeholder">No images yet</div>
              )}

              <div className="gallery-card-overlay" />
              <div className="gallery-card-caption">
                <h2 className="gallery-card-title">{category.title}</h2>
                <p className="gallery-card-meta">{category.imageCount} images</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
