import { TextCard } from '@/components/app/text-card';
import { listPublicImages } from '@/lib/public-images';
import { BmacQrBlock } from '@/components/app/bmac.qr.block';
import { PageTitleCard } from '@/components/app/page-title-card';
import { GalleryLightboxGrid, type LightboxImage } from '@/components/app/gallery-lightbox';

export default function AboutPage() {
  const images = listPublicImages('images/about');
  const aboutTopRightImages = listPublicImages('images/abouttopright');
  const leftGallery: LightboxImage[] = images.map((image) => ({
    src: `/images/about/${image}`,
    alt: 'About photo',
  }));
  const topRightGallery: LightboxImage[] = aboutTopRightImages.map((image) => ({
    src: `/images/abouttopright/${image}`,
    alt: 'About photo',
  }));

  const aboutTextLeft = (
    <TextCard withContainer={false} constrainWidth={false} align="left">
      <p>
        I&apos;ve been painting miniatures full time &ldquo;professionally&rdquo; now for over a
        decade, running Chief Live Gaming as an in home commission studio. I am 35 years old.
        I live in Wisconsin, USA with my amazing wife and our pet rabbit, Baxter! I started 
        painting miniatures and playing Warhammer Fantasy sometime back in high school, but set the
        hobby aside for a number of years during college.
      </p>
      <p>
        In 2013, I got in a pretty nasty motorcycle accident that led to me dropping out of college
        and re-evaluating what I wanted to do with my life. While recovering from my injuries, 
        I decided to pick up some brushes again. I painted some models for a few friends, and
        all of the sudden, people I didn&apos;t know started asking me to paint for them!
      </p>
    </TextCard>
  );

  const otherInterestsCard = (
    <TextCard withContainer={false} constrainWidth={false} align="left">
      <div className="space-y-3">
        <h3 className="text-foreground text-xl font-semibold tracking-tight">
          Other Interests
        </h3>
        <p>
          I love learning. I am always obsessively studying new things. I am a self taught artist
          and have learned most of what I know about miniature painting through books, videos,
          and practice. I am fascinated by a wide variety of subjects, and I love to dive deep
          into new hobbies and interests.
        </p>
        <p>
          A few other things I&apos;m into outside of miniature painting:
        </p>
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <span className="text-foreground font-medium">Woodworking</span>
          </li>
          <li>
            <span className="text-foreground font-medium">Painting, Sketching, pretty much any art medium</span>
          </li>
          <li>
            <span className="text-foreground font-medium">Coding / Development</span>
            <ul className="mt-1 list-[circle] space-y-1 pl-5">
              <li>I built this site!</li>
            </ul>
          </li>
          <li>
            <span className="text-foreground font-medium">Games</span>
            <ul className="mt-1 list-[circle] space-y-1 pl-5">
              <li>Video Games!</li>
              <li>Board Games!</li>
              <li>Dungeons and Dragons</li>
            </ul>
          </li>
          <li>
            <span className="text-foreground font-medium">While Painting</span>
            <ul className="mt-1 list-[circle] space-y-1 pl-5">
              <li>Audiobooks/Podcasts are my go to!</li>
            </ul>
          </li>
        </ul>
      </div>
    </TextCard>
  );

  const aboutTextRight = (
    <TextCard withContainer={false} constrainWidth={false} align="left">
      <p>
        At the time, I was streaming video games on Twitch as a hobby and making gaming content
        on YouTube. I&apos;m Native American, and I have always used &ldquo;Chief&rdquo; as my online handle.
        The name Chief Live Gaming has its roots in those days of streaming- it&apos;s
        the name I used for my channel. I decided to use that name for my painting commissions as well,
        since I figured it would be a short term thing. Well, here we are over a decade later!
      </p>
      <p>
        I feel so fortunate to be able to do what I love every day, and to have the support of
        such an amazing community of hobbyists and miniature painters. I have had the opportunity
        to work with many talented artists and collectors over the years. I have painted more models
        than I can count, and had the privilege of working on models that I would have never been able
        to otherwise. Thank you all for being a part of this journey with me!
      </p>
    </TextCard>
  );

  return (
    <div className="site-section">
      <div className="mb-8 mx-auto max-w-240">
        <PageTitleCard
          title="About Jake"
          description="Chief Live Who?"
        />
      </div>

      <div className="mx-auto max-w-240">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-10">
            {aboutTextLeft}

            {images.length > 0 ? (
              <section>
                <GalleryLightboxGrid
                  images={leftGallery}
                  gridClassName="grid grid-cols-2 gap-5"
                />
              </section>
            ) : null}

            {otherInterestsCard}
          </div>

          <div className="space-y-10">
            <BmacQrBlock />

            <section>
              {topRightGallery.length > 0 ? (
                <GalleryLightboxGrid
                  images={topRightGallery}
                  gridClassName="grid grid-cols-2 gap-5"
                />
              ) : (
                <div className="type-body-sm text-center">
                  No images found in <code>/public/images/abouttopright</code>{' '}
                  yet.
                </div>
              )}
            </section>

            {aboutTextRight}
          </div>
        </div>
      </div>
    </div>
  );
}
