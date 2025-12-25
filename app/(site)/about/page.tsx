import { TextCard } from '@/components/app/text-card';
import { listPublicImages } from '@/lib/public-images';
import { BmacQrBlock } from '@/components/app/bmac.qr.block';
import { PageTitleCard } from '@/components/app/page-title-card';
import { GalleryImageCard } from '@/components/app/gallery-card';
import { SectionHeader } from '@/components/app/section-header';

export default function AboutPage() {
  const images = listPublicImages('images/about');

  return (
    <div className="site-section">
      <div className="mb-8">
        <PageTitleCard
          title="About Jake"
          description="Chief Live Gaming? Who the #$%^&* is that?"
        />
      </div>

      <div className="mx-auto max-w-240 space-y-10">
        <TextCard withContainer={false}>
          <p>
            Jake has been painting miniatures professionally for over a decade,
            running Chief Live Gaming as a home-based commission studio. He
            specializes in painting models for Warhammer 40k, Age of Sigmar,
            Dungeons & Dragons, and Kingdom Death Monster. Jake loves painting
            armies and large projects, but also enjoys working on one-off models
            and studio pieces. To get in touch about a project, check out the
            Commissions page!
          </p>
        </TextCard>

        {images.length > 0 ? (
          <section>
            <SectionHeader title="Photos" className="mb-4" />
            <div className="gallery-images-grid">
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

        <BmacQrBlock />
      </div>
    </div>
  );
}
