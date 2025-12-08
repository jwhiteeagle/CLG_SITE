import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FeaturedCarousel } from "@/components/featured-carousel";

export default function Home() {
  return (
    <div className="site-section pt-0">
      {/* Featured Work Carousel */}
      <section className="mb-12">
        <FeaturedCarousel />
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
          <p className="mb-4 text-sm text-muted-foreground">
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
