import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { FeaturedCarousel } from '@/components/app/featured-carousel';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { listCategories } from '@/lib/gallery';
import { withBasePath } from '@/lib/base-path';
import { SectionHeader } from '@/components/app/section-header';
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

            <p className="type-hero-lede mx-auto max-w-3xl">
              High-quality commission miniature painting for armies, characters,
              and display pieces. Custom projects for a wide variety of game
              systems and styles!
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Button asChild size="lg">
                <Link href="/commissions#contact" prefetch={false}>
                  Start a Commission
                </Link>
              </Button>
              <Button asChild size="lg">
                <Link href="/gallery" prefetch={false}>
                  View Gallery
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

        {/* Trust / credibility */}
        <section className="mb-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="site-card">
              <p className="type-stat-value">Commissions Since 2014</p>
              <p className="type-stat-label mt-1">
                I&apos;ve been painting miniatures as my full time job
                for over a decade!
              </p>
            </div>
            <div className="site-card">
              <p className="type-stat-value">Many Game Systems</p>
              <p className="type-stat-label mt-1">
                Warhammer, D&D, Kingdom Death, board games, 3dprints, and more!
              </p>
            </div>
            <div className="site-card">
              <p className="type-stat-value">Models of any size</p>
              <p className="type-stat-label mt-1">
                I paint everything from single minis to entire armies. From tiny
                characters to 20lb resin models!
              </p>
            </div>
          </div>
        </section>

        {/* Featured categories */}
        <section className="mb-12">
          <SectionHeader
            align="center"
            title="Featured Categories"
            description="Jump into the gallery by theme."
            className="mx-auto mb-4 max-w-240"
          />

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

        {/* Contact CTA footer */}
        <section className="mb-12">
          <div className="site-card bg-warm-accent/7 text-center">
            <h2 className="type-section-title mb-3">
              Interested in a commission?
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              <Button asChild size="lg">
                <Link href="/commissions#contact" prefetch={false}>
                  Tell me about your project
                </Link>
              </Button>
              <Button asChild size="lg">
                <Link href="/commissions" prefetch={false}>
                  Commission Info
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
