import { listCategories } from '@/lib/gallery';
import { PageTitleCard } from '@/components/app/page-title-card';
import { GalleryCategoryCard } from '@/components/app/gallery-card';

export default function GalleryPage() {
  const categories = listCategories();

  return (
    <div className="site-section">
      <div className="mb-8">
        <PageTitleCard
          title="Gallery"
          description={
            <>
              <p>
                I try to take pictures of most of the things I paint. I
                generally work on 2-4 commissions at once to avoid creative
                burnout. Unfortunately, that means I often forget to take
                pictures of finished projects.
              </p>
              <p className="type-section-title mt-4">
                Browse some of my work below in <em>organized-ish</em> categories.
              </p>
            </>
          }
        />
      </div>

      <div className="gallery-categories-grid">
        {categories.map((category) => (
          <GalleryCategoryCard
            key={category.slug}
            href={`/gallery/${category.slug}`}
            title={category.title}
            meta={`${category.imageCount} images`}
            imageSrc={
              category.coverImage
                ? `/images/gallery/${category.slug}/${category.coverImage}`
                : null
            }
          />
        ))}
      </div>
    </div>
  );
}
