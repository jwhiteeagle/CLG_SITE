'use client';

import * as React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type LightboxImage = {
  src: string;
  alt: string;
};

type GalleryLightboxProps = {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

function GalleryLightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps) {
  const closeButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const lastActiveElementRef = React.useRef<HTMLElement | null>(null);

  const current = images[index];

  React.useEffect(() => {
    lastActiveElementRef.current =
      (document.activeElement as HTMLElement | null) ?? null;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = '';
      lastActiveElementRef.current?.focus?.();
    };
  }, []);

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onPrev();
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNext();
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, onNext, onPrev]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={current?.alt ?? 'Image viewer'}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative mx-auto flex h-full max-w-6xl items-center justify-center px-4 py-6">
        <div className="relative w-full">
          <div className="relative h-[80vh] w-full overflow-hidden rounded-lg border border-white/10 bg-black/20">
            {current ? (
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-contain"
                priority
              />
            ) : null}
          </div>

          <Button
            ref={closeButtonRef}
            type="button"
            variant="outline"
            size="icon"
            className="absolute top-3 right-3 rounded-full bg-background/80 backdrop-blur"
            onClick={onClose}
          >
            <X />
            <span className="sr-only">Close</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur"
            onClick={onPrev}
          >
            <ChevronLeft />
            <span className="sr-only">Previous image</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur"
            onClick={onNext}
          >
            <ChevronRight />
            <span className="sr-only">Next image</span>
          </Button>

          <div className="mt-3 text-center text-sm text-white/80">
            {index + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export function GalleryLightboxGrid({
  images,
  gridClassName,
  className,
}: {
  images: LightboxImage[];
  gridClassName?: string;
  className?: string;
}) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const isOpen = openIndex !== null && images.length > 0;
  const currentIndex =
    openIndex === null ? 0 : ((openIndex % images.length) + images.length) % images.length;

  function handleClose() {
    setOpenIndex(null);
  }

  function handlePrev() {
    setOpenIndex((prev) => (prev === null ? 0 : prev - 1));
  }

  function handleNext() {
    setOpenIndex((prev) => (prev === null ? 0 : prev + 1));
  }

  return (
    <>
      <div className={cn(gridClassName ?? 'gallery-images-grid', className)}>
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className={cn('gallery-card w-full text-left', 'focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none')}
            onClick={() => setOpenIndex(index)}
            aria-label={`Open image ${index + 1} of ${images.length}`}
          >
            <div className="gallery-card-media gallery-card-media--image">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="gallery-card-image"
              />
            </div>
          </button>
        ))}
      </div>

      {isOpen ? (
        <GalleryLightbox
          images={images}
          index={currentIndex}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      ) : null}
    </>
  );
}
