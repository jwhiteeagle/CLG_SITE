import { PageTitleCard } from '@/components/app/page-title-card';
import { SocialIconLinks } from '@/components/app/social-icon-links';
import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';

type LinksHubCardProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

function LinksHubCard({ title, description, children }: LinksHubCardProps) {
  return (
    <section className="bg-background/60 ring-border rounded-none p-5 ring-1">
      <div className="space-y-3 text-center">
        <div className="bg-background/70 ring-border rounded-none p-4 shadow-xs ring-1">
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
        <PageTitleCard title="Links" />
      </div>

      <section className="mx-auto max-w-240">
        <div className="site-card bg-warm-accent/7 p-5 sm:p-6">
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 md:[&>*:last-child:nth-child(odd)]:col-span-2 md:[&>*:last-child:nth-child(odd)]:mx-auto md:[&>*:last-child:nth-child(odd)]:w-full md:[&>*:last-child:nth-child(odd)]:max-w-[calc((100%-1.25rem)/2)]">
            <LinksHubCard
              title="Paintfinity"
              description="I designed a 3D printed miniature painting station. I leveraged my knowledge and experience from commission painting to create the best system I could! "
            >
              <Button asChild variant="main">
                <a
                  href="https://paintfinity.chieflivegaming.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Learn more about Paintfinity
                </a>
              </Button>
            </LinksHubCard>

            <LinksHubCard
              title="3D Printing"
              description="I have designed a few miniature painting related 3D printable items. MakerWorld hosts all of my designs which are completely free to download!"
            >
              <Button asChild variant="main">
                <a
                  href="https://makerworld.com/en/@ChiefLiveGaming"
                  target="_blank"
                  rel="noreferrer"
                >
                  My MakerWorld Profile
                </a>
              </Button>
            </LinksHubCard>

            <LinksHubCard
              title="Social Media"
              description="Not much of a social media-er, but you can find me here!"
            >
              <SocialIconLinks
                facebookHref="https://www.facebook.com/chieflivegaming"
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
