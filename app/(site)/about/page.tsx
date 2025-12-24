import Image from 'next/image';
import { TextCardRem60 } from '@/components/text-card-rem60';
import { listPublicImages } from '@/lib/public-images';
import { BmacQrBlock } from '@/components/bmac.qr.block';
import { GalleryCategoryHeader } from '@/components/gallery-category-header';

export default function AboutPage() {
  const images = listPublicImages('images/about');

  return (
    <div className="site-section">
      <div className="mb-8">
        <GalleryCategoryHeader
          title="About Jake"
          description="Chief Live Gaming? Who the #$%^&* is that?"
        />
      </div>

      <div className="mx-auto max-w-240 space-y-10">
        <TextCardRem60 withContainer={false}>
          <p>
            Jake has been painting miniatures professionally for over a decade,
            running Chief Live Gaming as a home-based commission studio. He
            specializes in painting models for Warhammer 40k, Age of Sigmar,
            Dungeons & Dragons, and Kingdom Death Monster. Jake loves painting
            armies and large projects, but also enjoys working on one-off models
            and studio pieces. To get in touch about a project, check out the
            Commissions page!
          </p>
        </TextCardRem60>

        {images.length > 0 ? (
          <section>
            <h2 className="text-primary mb-4 text-xl font-semibold">Photos</h2>
            <div className="gallery-images-grid">
              {images.map((image) => {
                const src = `/images/about/${image}`;
                return (
                  <a
                    key={image}
                    href={src}
                    target="_blank"
                    rel="noreferrer"
                    className="gallery-card"
                  >
                    <div className="gallery-card-media gallery-card-media--image">
                      <Image
                        src={src}
                        alt="About photo"
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="gallery-card-image"
                      />
                    </div>
                  </a>
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
