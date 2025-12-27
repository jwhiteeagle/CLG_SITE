import { TextCard } from '@/components/app/text-card';
import { listPublicImages } from '@/lib/public-images';
import { BmacQrBlock } from '@/components/app/bmac.qr.block';
import { PageTitleCard } from '@/components/app/page-title-card';
import { GalleryLightboxGrid, type LightboxImage } from '@/components/app/gallery-lightbox';

export default function AboutPage() {
  const images = listPublicImages('images/about');
  const aboutMeImages = listPublicImages('images/aboutme');
  const aboutTopRightImages = listPublicImages('images/abouttopright');
  const leftGallery: LightboxImage[] = images.map((image) => ({
    src: `/images/about/${image}`,
    alt: 'About photo',
  }));
  const topRightGallery: LightboxImage[] = aboutTopRightImages.map((image) => ({
    src: `/images/abouttopright/${image}`,
    alt: 'About photo',
  }));
  const aboutMeGallery: LightboxImage[] = aboutMeImages.map((image) => ({
    src: `/images/aboutme/${image}`,
    alt: 'About me photo',
  }));

  const aboutTextLeft = (
    <TextCard withContainer={false} constrainWidth={false}>
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

  const aboutTextRight = (
    <TextCard withContainer={false} constrainWidth={false}>
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
          </div>

          <div className="space-y-10">
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

            <section>
              {aboutMeGallery.length > 0 ? (
                <GalleryLightboxGrid
                  images={aboutMeGallery}
                  gridClassName="grid grid-cols-2 gap-5"
                />
              ) : (
                <div className="type-body-sm text-center">
                  No images found in <code>/public/images/aboutme</code> yet.
                </div>
              )}
            </section>

            <BmacQrBlock />
          </div>
        </div>
      </div>
    </div>
  );
}
