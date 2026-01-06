'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { withBasePath } from '@/lib/base-path';

type GalleryCategoryCardCyclerProps = {
  href: string;
  title: string;
  meta?: React.ReactNode;
  imageAlt?: string;
  initialImageSrc?: string | null;
  titleAs?: 'h2' | 'h3';
  sizes?: string;
  className?: string;
  placeholder?: React.ReactNode;
};

export function GalleryCategoryCardCycler({
  href,
  title,
  meta,
  imageAlt,
  initialImageSrc,
  titleAs: TitleTag = 'h2',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  className,
  placeholder,
}: GalleryCategoryCardCyclerProps) {
  const alt = imageAlt ?? title;
  const src = initialImageSrc ? withBasePath(initialImageSrc) : null;
  const [imageError, setImageError] = React.useState(false);
  const showPlaceholder = !src || imageError;

  return (
    <Link
      href={href}
      prefetch={false}
      className={cn('gallery-card gallery-category-card', className)}
    >
      <div className="gallery-card-media gallery-card-media--category">
        {showPlaceholder ? (
          <div className="gallery-card-placeholder">
            {placeholder ?? 'No images yet'}
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className="gallery-card-image"
            loading="lazy"
            unoptimized={true}
            onError={() => setImageError(true)}
          />
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
