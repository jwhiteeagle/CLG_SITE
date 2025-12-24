import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { FeaturedCarousel } from '@/components/featured-carousel';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { listCategories } from '@/lib/gallery';

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
  const categories = listCategories().slice(0, 4);

  return (
    <div className="site-section pt-0">
      {/* Featured Work Carousel */}
      <section className="mb-12">
        <FeaturedCarousel images={featuredImages} />
      </section>

      {/* Hero intro */}
      <section className="mb-12">
        <div className="site-card bg-warm-accent/7">
          <h1 className="font-orbitron text-foreground text-4xl leading-tight font-extrabold tracking-wide sm:text-5xl">
            Miniature Painting Services
          </h1>
          <p className="text-muted-foreground mt-3 max-w-3xl text-base leading-relaxed sm:text-lg">
            High-quality commission painting for armies, characters, and display
            pieces. Clear quotes, steady communication, and polished results.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild size="lg">
              <Link href="/commissions#contact">Start a Commission</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/gallery">View Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust / credibility */}
      <section className="mb-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="site-card">
            <p className="text-primary text-3xl font-semibold">10+ years</p>
            <p className="text-muted-foreground mt-1 text-sm">
              Professional commission experience
            </p>
          </div>
          <div className="site-card">
            <p className="text-primary text-3xl font-semibold">
              Thousands of minis
            </p>
            <p className="text-muted-foreground mt-1 text-sm">
              Armies, units, and centerpiece models
            </p>
          </div>
          <div className="site-card">
            <p className="text-primary text-3xl font-semibold">Clear quotes</p>
            <p className="text-muted-foreground mt-1 text-sm">
              Transparency before work begins
            </p>
          </div>
          <div className="site-card">
            <p className="text-primary text-3xl font-semibold">
              Custom schemes
            </p>
            <p className="text-muted-foreground mt-1 text-sm">
              Built to match your vision
            </p>
          </div>
        </div>
      </section>

      {/* How commissions work */}
      <section className="mb-12">
        <div className="page-header">
          <h2 className="text-primary text-2xl font-semibold">
            How Commissions Work
          </h2>
          <p>Simple process, consistent communication, strong results.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="site-card bg-warm-accent/7">
            <h3 className="mb-2 font-semibold">1) Tell me about your project</h3>
            <p className="text-muted-foreground text-sm">
              Send references, scope, and deadlines. I’ll ask a few questions
              and make sure we’re aligned.
            </p>
          </div>
          <div className="site-card bg-warm-accent/7">
            <h3 className="mb-2 font-semibold">2) Get a clear quote</h3>
            <p className="text-muted-foreground text-sm">
              You’ll get a quote and expectations upfront, including schedule
              and options.
            </p>
          </div>
          <div className="site-card bg-warm-accent/7">
            <h3 className="mb-2 font-semibold">3) Paint, updates, delivery</h3>
            <p className="text-muted-foreground text-sm">
              I paint the project with built-in check-ins, then finish and
              deliver once approved.
            </p>
          </div>
        </div>
      </section>

      {/* Featured categories */}
      <section className="mb-12">
        <div className="page-header">
          <h2 className="text-primary text-2xl font-semibold">
            Featured Categories
          </h2>
          <p>Jump into the gallery by theme.</p>
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
                  <h3 className="gallery-card-title">{category.title}</h3>
                  <p className="gallery-card-meta">{category.imageCount} images</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact CTA footer */}
      <section className="mb-12">
        <div className="site-card bg-warm-accent/7">
          <h2 className="text-primary mb-2 text-2xl font-semibold">
            Ready to start a project?
          </h2>
          <p className="text-muted-foreground mb-4 max-w-2xl">
            Tell me what you’re looking for, and I’ll get back to you with next
            steps and a quote.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="lg">
              <Link href="/commissions#contact">Tell me about your project</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/commissions">Commission Info</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
