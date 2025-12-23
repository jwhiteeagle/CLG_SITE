'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

type FeaturedCarouselProps = {
  images: string[];
};

export function FeaturedCarousel({ images }: FeaturedCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={image}>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 dark:border-white/5">
                {/* Gradient overlay for iOS-style depth */}
                <div
                  className="pointer-events-none absolute inset-0 z-10 rounded-lg opacity-[0.08]"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--primary) 0%, transparent 50%)',
                  }}
                />
                <Image
                  src={`/images/featured/${image}`}
                  alt={`Featured work ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
}
