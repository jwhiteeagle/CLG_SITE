import { listCategories } from '@/lib/gallery';
import { PageTitleCard } from '@/components/app/page-title-card';
import { GalleryCategoryCardCycler } from '@/components/app/gallery-category-card-cycler';

export default function GalleryPage() {
  // Reduced from 24 to 8 to prevent rate limiting
  const categories = listCategories();

  return (
    <div className="site-section">
      <div className="mb-8">
        <PageTitleCard
          title="Gallery"
          description={
            <>
              <p>
                I have been painting miniatures for over a decade now (woah). My strategy is to 
                always book multiple projects at once- this allows me to bounce back and forth to avoid creative
                burnout.
              </p>
              <br />
              <p>
                I love painting a wide variety of subjects. Large armies, single characters,
                vehicles, monsters, terrain- I just love painting! Each category presents its own unique challenges
                and opportunities for creativity.
              </p>
            </>
          }
        />
      </div>

      <div className="gallery-categories-grid">
        {categories.map((category) => (
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
          />
        ))}
      </div>
    </div>
  );
}
