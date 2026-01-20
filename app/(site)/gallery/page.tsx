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
                generally book 2-4 simultaneous commissions to avoid creative
                burnout. This allows me to switch between projects, bouncing around to keep things fresh.
              </p>
              <p>
                I love painting a wide variety of subjects, from large armies to single characters,
                vehicles, monsters, and terrain. Each category presents its own unique challenges
                and opportunities for creativity. You will find a mix of work in progress shots, 
                finished pieces, and more candid snaps. 
              </p>
              <p className="type-section-title mt-4">
                Browse some of my work by choosing a category below!
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
