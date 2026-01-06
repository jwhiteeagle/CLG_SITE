import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

type GalleryCategoryCardProps = {
  href: string;
  title: string;
  meta?: React.ReactNode;
  imageSrc?: string | null;
  imageAlt?: string;
  sizes?: string;
  titleAs?: 'h2' | 'h3';
  className?: string;
  placeholder?: React.ReactNode;
};

export function GalleryCategoryCard({
  href,
  title,
  meta,
  imageSrc,
  imageAlt,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  titleAs: TitleTag = 'h2',
  className,
  placeholder,
}: GalleryCategoryCardProps) {
  const [imageError, setImageError] = React.useState(false);
  const alt = imageAlt ?? title;

  return (
    <Link
      href={href}
      prefetch={false}
      className={cn('gallery-card gallery-category-card', className)}
    >
      <div className="gallery-card-media gallery-card-media--category">
        {imageSrc && !imageError ? (
          <Image
            src={imageSrc}
            alt={alt}
            fill
            sizes={sizes}
            className="gallery-card-image"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="gallery-card-placeholder">
            {placeholder ?? 'No images yet'}
          </div>
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

type GalleryImageCardProps = {
  imageSrc: string;
  imageAlt: string;
  href?: string;
  sizes?: string;
  className?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
};

export function GalleryImageCard({
  imageSrc,
  imageAlt,
  href,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  className,
  target = '_blank',
  rel = 'noreferrer',
}: GalleryImageCardProps) {
  const [imageError, setImageError] = React.useState(false);
  const resolvedHref = href ?? imageSrc;

  return (
    <a
      href={resolvedHref}
      target={target}
      rel={rel}
      className={cn('gallery-card', className)}
    >
      <div className="gallery-card-media gallery-card-media--image">
        {!imageError ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes={sizes}
            className="gallery-card-image"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-black/10 text-muted-foreground">
            Image unavailable
          </div>
        )}
      </div>
    </a>
  );
}
