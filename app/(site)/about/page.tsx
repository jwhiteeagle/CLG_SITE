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
        decade, running Chief Live Gaming as an in home commission studio. I am 36 years old.
        I live in Wisconsin, USA with my amazing wife and our pet rabbit, Baxter!
      </p>
      <p>
        In 2013, I was in a motorcycle accident that led to me dropping out of college
        and re-evaluating what I wanted to do with my life. While recovering from my injuries, 
        I decided to pick up miniature painting again, which had been a hobby of mine when I was younger. 
      </p>
      <p>
        I loved it. I had forgotted how therapeutic it was. Mini Painting really helped me stay focused and
        positive during a pretty rough time in my life. My girlfriend (now wifey!) at the time was super supportive and encouraged 
        me to take the plunge and start taking commissions. 
        </p>
      <p>
        I have had the opportunity
        to work with many talented artists and collectors over the years and have painted more models
        than I can count! Thank you all for being a part of this journey with me! If you&apos;re reading this and are thinking
        about starting to take commissions yourself- feel free to reach out. I would be happy to share advice or answer any questions you might have about getting started!
      </p>
    </TextCard>
  );

  const aboutTextRight = (
    <TextCard withContainer={false} constrainWidth={false} align="left">
      <div className="space-y-3">
        <h3 className="text-foreground text-xl font-semibold tracking-tight">
          Other Interests
        </h3>
        <p>
          I love learning and am usually obsessively studying some random new-to-me thing. I&apos;m a fully self taught artist
          and have learned most of what I know about miniature painting through books, videos (yay youtube),
          and practice. 
        </p>
        <p>
          I also like:
        </p>
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <span className="text-foreground font-medium">Woodworking</span>
          </li>
          <li>
            <span className="text-foreground font-medium">Painting, Sketching, pretty much any art medium</span>
          </li>
          <li>
            <span className="text-foreground font-medium">3D modeling and design - Paintfinity!</span>
          </li>
          <li>
            <span className="text-foreground font-medium">Coding / Development</span>
          </li>
          <li>
            <span className="text-foreground font-medium">Video Games</span>
          </li>
          <li><span className="text-foreground font-medium">Board Games</span></li>
          <li><span className="text-foreground font-medium">DnD</span></li>
        </ul>
      </div>
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
