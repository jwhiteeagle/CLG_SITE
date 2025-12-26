import { TextCard } from '@/components/app/text-card';
import { listPublicImages } from '@/lib/public-images';
import { BmacQrBlock } from '@/components/app/bmac.qr.block';
import { PageTitleCard } from '@/components/app/page-title-card';
import { GalleryImageCard } from '@/components/app/gallery-card';
import { SectionHeader } from '@/components/app/section-header';

export default function AboutPage() {
  const images = listPublicImages('images/about');
  const aboutMeImages = listPublicImages('images/aboutme');

  const aboutText = (
    <TextCard withContainer={false} constrainWidth={false}>
      <p>
        Jake has been painting miniatures professionally for over a decade,
        running Chief Live Gaming as a home-based commission studio. He
        specializes in painting models for Warhammer 40k, Age of Sigmar,
        Dungeons & Dragons, and Kingdom Death Monster. Jake loves painting
        armies and large projects, but also enjoys working on one-off models and
        studio pieces. To get in touch about a project, check out the
        Commissions page!
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
            {aboutText}

            {images.length > 0 ? (
              <section>
                <div className="site-card bg-warm-accent/7 mb-5">
                  <SectionHeader
                    align="center"
                    title="Photos"
                    titleClassName="text-3xl"
                  />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  {images.map((image) => {
                    const src = `/images/about/${image}`;
                    return (
                      <GalleryImageCard
                        key={image}
                        href={src}
                        imageSrc={src}
                        imageAlt="About photo"
                      />
                    );
                  })}
                </div>
              </section>
            ) : null}
          </div>

          <div className="space-y-10">
            {aboutText}

            <section>
              <div className="site-card bg-warm-accent/7 mb-5">
                <SectionHeader
                  align="center"
                  title="About Me Photos"
                  titleClassName="text-3xl"
                />
              </div>
              {aboutMeImages.length > 0 ? (
                <div className="grid grid-cols-2 gap-5">
                  {aboutMeImages.map((image) => {
                    const src = `/images/aboutme/${image}`;
                    return (
                      <GalleryImageCard
                        key={image}
                        href={src}
                        imageSrc={src}
                        imageAlt="About me photo"
                      />
                    );
                  })}
                </div>
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
