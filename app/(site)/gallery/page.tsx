import Image from 'next/image';
import Link from 'next/link';
import { listCategories } from '@/lib/gallery';

export default function GalleryPage() {
  const categories = listCategories();

  return (
    <div className="site-section">
      <div className="page-header">
        <h1>Gallery</h1>
        <p>Browse featured work by category</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/gallery/${category.slug}`}
            className="site-card group block overflow-hidden p-0"
          >
            <div className="relative aspect-video w-full">
              {category.coverImage ? (
                <Image
                  src={`/images/gallery/${category.slug}/${category.coverImage}`}
                  alt={category.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="bg-muted text-muted-foreground flex h-full w-full items-center justify-center">
                  No images yet
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h2 className="text-lg font-semibold text-white">
                  {category.title}
                </h2>
                <p className="text-sm text-white/80">
                  {category.imageCount} images
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
