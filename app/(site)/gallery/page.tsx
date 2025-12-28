import { listCategoriesWithCoverPool } from '@/lib/gallery';
import { PageTitleCard } from '@/components/app/page-title-card';
import { GalleryCategoryCardCycler } from '@/components/app/gallery-category-card-cycler';
import { GalleryReduceMotionToggle } from '@/components/app/gallery-reduce-motion-toggle';

export default function GalleryPage() {
  const categories = listCategoriesWithCoverPool({ poolSize: 24 });

  return (
    <div className="site-section">
      <div className="mb-8">
        <PageTitleCard
          title="Gallery"
          actions={<GalleryReduceMotionToggle />}
          description={
            <>
              <p>
                I try to take pictures of most of the things I paint. I
                generally work on 2-4 commissions at once to avoid creative
                burnout. I try to snag pictures of finished pieces in my lightbox before I ship them
                out. There are some work-in-progress and more candid phone camera shots sprinkled in too!
              </p>
              <p className="type-section-title mt-4">
                Browse some of my work below in <em>organized-ish</em> categories.
              </p>
            </>
          }
        />
      </div>

      <div className="gallery-categories-grid">
        {categories.map((category, index) => (
          <GalleryCategoryCardCycler
            key={category.slug}
            href={`/gallery/${category.slug}`}
            title={category.title}
            meta={`${category.imageCount} images`}
            initialImageSrc={
              category.coverImage
                ? `/images/gallery/${category.slug}/${category.coverImage}`
                : null
            }
            candidateImageSrcs={category.coverPool.map(
              (filename) => `/images/gallery/${category.slug}/${filename}`
            )}
            cardIndex={index}
          />
        ))}
      </div>
    </div>
  );
}
