import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { FeaturedCarousel } from '@/components/app/featured-carousel';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { listCategories } from '@/lib/gallery';
import { withBasePath } from '@/lib/base-path';
import { CtaCard } from '@/components/app/cta-card';
import { GalleryCategoryCardCycler } from '@/components/app/gallery-category-card-cycler';

function getFeaturedImages(): string[] {
  const featuredDir = join(process.cwd(), 'public', 'images', 'featured');
  const entries = readdirSync(featuredDir, { withFileTypes: true });
  const images = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => /\.(png|jpe?g|webp|avif|gif)$/i.test(name))
    .sort((a, b) =>
      a.localeCompare(b, 'en', { numeric: true, sensitivity: 'base' })
    );

  return images;
}

export default function Home() {
  const featuredImages = getFeaturedImages();
  const featuredCategorySlugs = new Set([
    'armies',
    'big-stuff',
    'characters',
    'vehicles',
    'studio',
    'kingdom-death-monster',
  ]);
  // Reduced from 18 to 8 to prevent rate limiting
  const categories = listCategories().filter(
    (category) => featuredCategorySlugs.has(category.slug)
  );

  return (
    <>
      {/* Featured Work Carousel */}
      <section className="site-hero pt-0 pb-12">
        <FeaturedCarousel images={featuredImages} />
      </section>

      <div className="site-section pt-0">
        {/* Hero intro */}
        <section className="mb-12">
          <CtaCard withContainer={false} className="bg-warm-accent/7 ring-0">
            <h1 className="sr-only">Miniature Painting Services</h1>
            <div className="mx-auto w-full max-w-lg">
              <Image
                src={withBasePath('/images/brand/clg-banner-26-1500x400.webp')}
                alt="Chief Live Gaming banner logo"
                width={1500}
                height={400}
                sizes="(min-width: 640px) 32rem, 90vw"
                className="h-auto w-full"
              />
            </div>

            <div className="type-hero-lede mx-auto max-w-3xl space-y-4">
              <p>
                Hey! Thanks for visiting my website! Chief Live Gaming is a
                solo artist miniature painting studio run by me, Jake.
              </p>
              <p>
                I have been taking painting commissions since 2014. I specialize
                in custom projects for a wide variety of game systems and
                styles- everything from single centerpiece models, large armies,
                big resin kits, army display boards, and more. If you have any
                questions or are interested in booking a commission, don&apos;t
                hesitate to reach out!
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <Button asChild size="lg">
                <Link href="/commissions#contact" prefetch={false}>
                  Commission Info
                </Link>
              </Button>
              <Button asChild size="lg">
                <Link href="/gallery" prefetch={false}>
                  Gallery
                </Link>
              </Button>
              <Button asChild size="lg">
                <Link href="/about" prefetch={false}>
                  About
                </Link>
              </Button>
              <Button asChild size="lg">
                <Link href="/links" prefetch={false}>
                  Links
                </Link>
              </Button>
            </div>
          </CtaCard>
        </section>

     
        <section className="mb-12">      

          <div className="gallery-categories-grid">
            {categories.map((category) => (
              <GalleryCategoryCardCycler
                key={category.slug}
                href={`/gallery/${category.slug}`}
                title={category.title}
                titleAs="h3"
                meta={`${category.imageCount} images`}
                initialImageSrc={
                  category.coverImage
                    ? `/images/gallery/${category.slug}/${category.coverImage}`
                    : null
                }
              />
            ))}
          </div>
        </section>
        
      </div>
    </>
  );
}
