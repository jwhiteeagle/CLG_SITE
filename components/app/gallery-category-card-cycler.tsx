'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { useReduceMotionPreference } from '@/components/app/motion-preference';

type GalleryCategoryCardCyclerProps = {
  href: string;
  title: string;
  meta?: React.ReactNode;
  imageAlt?: string;
  initialImageSrc?: string | null;
  candidateImageSrcs?: string[];
  titleAs?: 'h2' | 'h3';
  sizes?: string;
  className?: string;
  placeholder?: React.ReactNode;
  cycleMs?: number;
  staggerMs?: number;
  cardIndex?: number;
};

export function GalleryCategoryCardCycler({
  href,
  title,
  meta,
  imageAlt,
  initialImageSrc,
  candidateImageSrcs = [],
  titleAs: TitleTag = 'h2',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  className,
  placeholder,
  cycleMs = 4500,
  staggerMs = 200,
  cardIndex = 0,
}: GalleryCategoryCardCyclerProps) {
  const { reduceMotion } = useReduceMotionPreference();
  const alt = imageAlt ?? title;
  const pool = React.useMemo(
    () =>
      candidateImageSrcs.filter(
        (src) => src && src !== initialImageSrc
      ),
    [candidateImageSrcs, initialImageSrc]
  );

  const [currentSrc, setCurrentSrc] = React.useState<string | null>(
    initialImageSrc ?? null
  );
  const [incomingSrc, setIncomingSrc] = React.useState<string | null>(null);
  const [incomingVisible, setIncomingVisible] = React.useState(false);
  const swapTimeoutRef = React.useRef<number | null>(null);
  const intervalRef = React.useRef<number | null>(null);
  const startTimeoutRef = React.useRef<number | null>(null);
  const currentSrcRef = React.useRef<string | null>(currentSrc);
  const poolRef = React.useRef<string[]>(pool);

  React.useEffect(() => {
    currentSrcRef.current = currentSrc;
  }, [currentSrc]);

  React.useEffect(() => {
    poolRef.current = pool;
  }, [pool]);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!currentSrcRef.current || poolRef.current.length === 0) return;
    if (reduceMotion) return;

    function pickNext(): string {
      const currentPool = poolRef.current;
      const current = currentSrcRef.current;
      if (currentPool.length === 1) return currentPool[0]!;
      let next = currentPool[Math.floor(Math.random() * currentPool.length)]!;
      for (
        let attempts = 0;
        attempts < 4 && next === current;
        attempts += 1
      ) {
        next = currentPool[Math.floor(Math.random() * currentPool.length)]!;
      }
      return next;
    }

    let cancelled = false;

    function tick() {
      const next = pickNext();
      if (next === currentSrcRef.current) return;

      const preload = new window.Image();
      preload.src = next;

      const commit = () => {
        if (cancelled) return;
        setIncomingSrc(next);
        setIncomingVisible(false);
        window.requestAnimationFrame(() => {
          setIncomingVisible(true);
        });
        if (swapTimeoutRef.current !== null) {
          window.clearTimeout(swapTimeoutRef.current);
        }
        swapTimeoutRef.current = window.setTimeout(() => {
          setCurrentSrc(next);
          setIncomingSrc(null);
          setIncomingVisible(false);
        }, 200);
      };

      if (typeof preload.decode === 'function') {
        preload.decode().then(commit).catch(commit);
      } else {
        preload.onload = commit;
        preload.onerror = commit;
      }
    }

    const startDelay = Math.max(0, cardIndex) * Math.max(0, staggerMs);
    const firstTickDelay = cycleMs;
    startTimeoutRef.current = window.setTimeout(() => {
      tick();
      intervalRef.current = window.setInterval(tick, cycleMs);
    }, firstTickDelay + startDelay);

    return () => {
      cancelled = true;
      if (startTimeoutRef.current !== null) {
        window.clearTimeout(startTimeoutRef.current);
      }
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
      if (swapTimeoutRef.current !== null) {
        window.clearTimeout(swapTimeoutRef.current);
      }
    };
  }, [cycleMs, pool.length, staggerMs, cardIndex, initialImageSrc, reduceMotion]);

  const showPlaceholder = !currentSrc;

  return (
    <Link
      href={href}
      className={cn('gallery-card gallery-category-card', className)}
    >
      <div className="gallery-card-media gallery-card-media--category">
        {showPlaceholder ? (
          <div className="gallery-card-placeholder">
            {placeholder ?? 'No images yet'}
          </div>
        ) : (
          <>
            <Image
              key={String(currentSrc)}
              src={String(currentSrc)}
              alt={alt}
              fill
              sizes={sizes}
              className={cn(
                'gallery-card-image transition-all duration-200',
                incomingSrc && incomingVisible
                  ? 'opacity-0 -translate-x-2'
                  : 'opacity-100 translate-x-0'
              )}
            />
            {incomingSrc ? (
              <Image
                key={incomingSrc}
                src={incomingSrc}
                alt={alt}
                fill
                sizes={sizes}
                className={cn(
                  'gallery-card-image transition-all duration-200',
                  incomingVisible
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-2'
                )}
              />
            ) : null}
          </>
        )}

        <div className="gallery-card-overlay" />
        <div className="gallery-card-caption">
          <TitleTag className="gallery-card-title">{title}</TitleTag>
          {meta ? <div className="gallery-card-meta">{meta}</div> : null}
        </div>
      </div>
    </Link>
  );
}
