'use client';

import * as React from 'react';
import Image from 'next/image';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';

type FeaturedCarouselProps = {
  images: string[];
};

export function FeaturedCarousel({ images }: FeaturedCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const preloadedSrcsRef = React.useRef<Set<string>>(new Set());

  React.useEffect(() => {
    if (!api) return;

    const emblaApi = api;
    const totalSlides = images.length;
    const preloadCount = 3;

    function preloadNearbySlides(selectedIndex: number) {
      if (typeof window === 'undefined') return;
      if (!totalSlides) return;

      const targets: number[] = [];
      for (let offset = 1; offset <= preloadCount; offset += 1) {
        targets.push((selectedIndex + offset) % totalSlides);
      }

      for (const index of targets) {
        const filename = images[index];
        if (!filename) continue;
        const src = `/images/featured/${filename}`;
        if (preloadedSrcsRef.current.has(src)) continue;
        preloadedSrcsRef.current.add(src);
        const img = new window.Image();
        img.decoding = 'async';
        img.src = src;
      }
    }

    function handleSelect() {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
      preloadNearbySlides(emblaApi.selectedScrollSnap());
    }

    function handleAutoplayPlay() {
      setIsPlaying(true);
    }

    function handleAutoplayStop() {
      setIsPlaying(false);
    }

    handleSelect();
    setIsPlaying(plugin.current.isPlaying());

    emblaApi.on('select', handleSelect);
    emblaApi.on('reInit', handleSelect);
    emblaApi.on('autoplay:play', handleAutoplayPlay);
    emblaApi.on('autoplay:stop', handleAutoplayStop);

    return () => {
      emblaApi.off('select', handleSelect);
      emblaApi.off('reInit', handleSelect);
      emblaApi.off('autoplay:play', handleAutoplayPlay);
      emblaApi.off('autoplay:stop', handleAutoplayStop);
    };
  }, [api, images]);

  function handlePrev() {
    api?.scrollPrev();
    plugin.current.reset();
  }

  function handleNext() {
    api?.scrollNext();
    plugin.current.reset();
  }

  function handleTogglePlayPause() {
    if (plugin.current.isPlaying()) {
      plugin.current.stop();
    } else {
      plugin.current.play();
    }
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      <Carousel
        plugins={[plugin.current]}
        setApi={setApi}
        className="w-full"
        aria-label="Featured work"
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={image}>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-black/10 dark:border-white/5 dark:bg-black/30">
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
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="object-scale-down object-center"
                  priority={index < 2}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex justify-center">
          <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/10 bg-background/70 px-1.5 py-1 shadow-sm backdrop-blur sm:gap-2 sm:px-2">
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="rounded-full sm:size-9"
              onClick={handlePrev}
              disabled={!canScrollPrev}
              aria-label="Previous slide"
            >
              <SkipBack />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="rounded-full sm:size-9"
              onClick={handleTogglePlayPause}
              aria-pressed={!isPlaying}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? <Pause /> : <Play />}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="rounded-full sm:size-9"
              onClick={handleNext}
              disabled={!canScrollNext}
              aria-label="Next slide"
            >
              <SkipForward />
            </Button>
          </div>
        </div>
      </Carousel>
    </div>
  );
}
