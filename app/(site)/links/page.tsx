import { PageTitleCard } from '@/components/app/page-title-card';
import { SocialIconLinks } from '@/components/app/social-icon-links';
import type { ReactNode } from 'react';

import Link from 'next/link';

type LinksHubCardProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

function LinksHubCard({ title, description, children }: LinksHubCardProps) {
  return (
    <section className="bg-background/60 ring-border rounded-xl p-5 ring-1">
      <div className="space-y-3 text-center">
        <div className="bg-background/70 ring-border rounded-lg p-4 shadow-xs ring-1">
          <h3 className="text-foreground text-lg font-semibold">{title}</h3>
          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
            {description}
          </p>
        </div>
        {children ? <div className="space-y-2">{children}</div> : null}
      </div>
    </section>
  );
}

export default function LinksPage() {
  return (
    <div className="site-section">
      <div className="mb-8">
        <PageTitleCard
          title="Links and Other Projects"
          description="I have a lot of interests and projects in the works! This serves as a landing page for some of the main things I am working on."
        />
      </div>

      <section className="mx-auto max-w-240">
        <div className="site-card bg-warm-accent/7 p-5 sm:p-6">
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            <LinksHubCard
              title="eBay Store"
              description="I sculpt custom miniature bases and sell them on eBay:"
            >
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  eBay Store:{' '}
                  <a
                    href="https://www.ebay.com/str/chieflivegaming"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary font-medium underline-offset-4 hover:underline"
                  >
                    ebay.com/str/chieflivegaming
                  </a>
                </p>
                <p className="text-muted-foreground">
                  Resin Bases Store Category:{' '}
                  <a
                    href="https://www.ebay.com/str/chieflivegaming/Resin-Bases/_i.html?store_cat=14198273012"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary font-medium underline-offset-4 hover:underline"
                  >
                    ebay.com/str/chieflivegaming/Resin-Bases
                  </a>
                </p>
                <p className="text-muted-foreground">
                  I also sell some random miniatures I paint for practice, extra
                  bits, and even some TCG cards!
                </p>
              </div>
            </LinksHubCard>

            <LinksHubCard
              title="Paintfinity"
              description="My custom 3D printed miniature painting station project. Designed to work with Gridfinity."
            >
              <Link
                href="/paintfinity"
                className="text-primary inline-flex text-sm font-medium transition-colors hover:opacity-90"
              >
                View the Paintfinity page
              </Link>
            </LinksHubCard>

            <LinksHubCard
              title="3D Printing"
              description="I have designed a few miniature painting related 3D prints:"
            >
              <div className="text-muted-foreground space-y-1 text-sm">
                <p>
                  MakerWorld:{' '}
                  <a
                    href="https://makerworld.com/en/@ChiefLiveGaming"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary font-medium underline-offset-4 hover:underline"
                  >
                    makerworld.com/en/@ChiefLiveGaming
                  </a>
                </p>
              </div>
            </LinksHubCard>

            <LinksHubCard
              title="Social Media"
              description="Not really active any more, but you can find me here:"
            >
              <SocialIconLinks
                instagramHref="https://www.instagram.com/chieflivegaming/"
                youtubeHref="https://www.youtube.com/@ChiefLiveGamingWI"
              />
            </LinksHubCard>
          </div>
        </div>
      </section>
    </div>
  );
}
