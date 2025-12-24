import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FeaturedCarousel } from '@/components/featured-carousel';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

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

  return (
    <div className="site-section pt-0">
      {/* Featured Work Carousel */}
      <section className="mb-12">
        <FeaturedCarousel images={featuredImages} />
      </section>

      {/* Quick links */}
      <section className="mb-12">
        <div className="flex flex-wrap gap-2">
          <Link href="/gallery" className="link-pill">
            Gallery
          </Link>
          <Link href="/commissions" className="link-pill">
            Commissions
          </Link>
          <Link href="/about" className="link-pill">
            About
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mb-12">
        <div className="site-card max-w-md">
          <h2 className="mb-2 text-xl font-semibold">
            Ready to start a project?
          </h2>
          <p className="text-muted-foreground mb-4 text-sm">
            Get in touch to discuss your commission.
          </p>
          <Button asChild>
            <Link href="/commissions">View Commission Info</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
