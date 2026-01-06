'use client';

import * as React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { withBasePath } from '@/lib/base-path';
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
  const touchStartRef = React.useRef<{ x: number; y: number; time: number } | null>(
    null
  );
  const lastSwipeAtRef = React.useRef<number>(0);
  const [imageError, setImageError] = React.useState(false);

  const current = images[index];
  const currentSrc = current?.src ? withBasePath(current.src) : null;

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
    // Reset error state when image changes
    setImageError(false);
  }, [index]);

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
          <div
            className="relative h-[80vh] w-full overflow-hidden rounded-lg border border-white/10 bg-black/20 touch-pan-y"
            onTouchStart={(event) => {
              const target = event.target as HTMLElement | null;
              if (target?.closest('button')) return;

              const touch = event.touches[0];
              if (!touch) return;
              touchStartRef.current = {
                x: touch.clientX,
                y: touch.clientY,
                time: Date.now(),
              };
            }}
            onTouchEnd={(event) => {
              const target = event.target as HTMLElement | null;
              if (target?.closest('button')) return;

              const start = touchStartRef.current;
              touchStartRef.current = null;
              if (!start) return;

              const touch = event.changedTouches[0];
              if (!touch) return;

              const now = Date.now();
              if (now - lastSwipeAtRef.current < 250) return;

              const dx = touch.clientX - start.x;
              const dy = touch.clientY - start.y;
              const dt = now - start.time;

              // Quick horizontal swipe only (avoid accidental vertical scroll gestures).
              if (dt > 600) return;
              if (Math.abs(dx) < 50) return;
              if (Math.abs(dx) < Math.abs(dy) + 20) return;

              lastSwipeAtRef.current = now;
              if (dx < 0) onNext();
              else onPrev();
            }}
          >
            {current && !imageError ? (
              <Image
                src={currentSrc ?? current.src}
                alt={current.alt}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-contain"
                priority
                unoptimized={true}
                onError={() => setImageError(true)}
              />
            ) : imageError ? (
              <div className="flex h-full items-center justify-center text-white/60">
                <div className="text-center">
                  <p className="text-lg font-medium">Image not available</p>
                  <p className="mt-1 text-sm">This image could not be loaded</p>
                </div>
              </div>
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
  initialCount = Infinity,
  pageSize = 48,
}: {
  images: LightboxImage[];
  gridClassName?: string;
  className?: string;
  initialCount?: number;
  pageSize?: number;
}) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [failedImages, setFailedImages] = React.useState<Set<string>>(new Set());

  // Filter out invalid images
  const validImages = React.useMemo(() => {
    return images.filter((img) => {
      if (!img || !img.src || typeof img.src !== 'string') return false;
      if (img.src.trim() === '') return false;
      if (failedImages.has(img.src)) return false;
      return true;
    });
  }, [images, failedImages]);

  const isOpen = openIndex !== null && validImages.length > 0;
  const currentIndex =
    openIndex === null ? 0 : ((openIndex % validImages.length) + validImages.length) % validImages.length;

  function handleClose() {
    setOpenIndex(null);
  }

  function handlePrev() {
    setOpenIndex((prev) => (prev === null ? 0 : prev - 1));
  }

  function handleNext() {
    setOpenIndex((prev) => (prev === null ? 0 : prev + 1));
  }

  const handleImageError = React.useCallback((src: string) => {
    setFailedImages((prev) => new Set(prev).add(src));
  }, []);

  const safeInitialCount = React.useMemo(() => {
    if (initialCount === Infinity) return Infinity;
    if (!Number.isFinite(initialCount) || initialCount <= 0) return 1;
    return Math.floor(initialCount);
  }, [initialCount]);

  const safePageSize = React.useMemo(() => {
    if (!Number.isFinite(pageSize) || pageSize <= 0) return 1;
    return Math.floor(pageSize);
  }, [pageSize]);

  const [visibleCount, setVisibleCount] = React.useState(() =>
    Math.min(validImages.length, safeInitialCount)
  );

  React.useEffect(() => {
    setVisibleCount((prev) => {
      const next = Math.min(prev, validImages.length);
      if (next <= 0) return Math.min(validImages.length, safeInitialCount);
      return next;
    });
  }, [safeInitialCount, validImages.length]);

  if (validImages.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        No images available in this gallery.
      </div>
    );
  }

  const visibleImages = validImages.slice(0, Math.min(validImages.length, visibleCount));
  const canLoadMore = visibleImages.length < validImages.length;

  return (
    <>
      <div className={cn(gridClassName ?? 'gallery-images-grid', className)}>
        {visibleImages.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            className={cn('gallery-card w-full text-left', 'focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none')}
            onClick={() => setOpenIndex(index)}
            aria-label={`Open image ${index + 1} of ${validImages.length}`}
          >
            <div className="gallery-card-media gallery-card-media--image">
              <Image
                src={withBasePath(image.src)}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="gallery-card-image"
                unoptimized={true}
                onError={() => handleImageError(image.src)}
                loading="lazy"
              />
            </div>
          </button>
        ))}
      </div>

      {canLoadMore ? (
        <div className="mt-8 flex justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setVisibleCount((prev) =>
                Math.min(validImages.length, Math.max(prev, 0) + safePageSize)
              )
            }
          >
            Load more
          </Button>
        </div>
      ) : null}

      {isOpen ? (
        <GalleryLightbox
          images={validImages}
          index={currentIndex}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      ) : null}
    </>
  );
}
