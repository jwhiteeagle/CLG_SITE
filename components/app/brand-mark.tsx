'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { withBasePath } from '@/lib/base-path';
import { cn } from '@/lib/utils';

type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className }: BrandMarkProps) {
  const [logoError, setLogoError] = React.useState(false);

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Link
        href="/"
        className="surface-clickable flex h-[72px] w-[72px] items-center justify-center rounded-lg hover:-translate-y-0.5"
      >
        {!logoError ? (
          <Image
            src={withBasePath('/images/brand/clg-26-brush-logo.webp')}
            alt="Chief Live Gaming"
            width={70}
            height={70}
            className="h-[70px] w-[70px]"
            onError={() => setLogoError(true)}
          />
        ) : (
          <div className="flex h-[70px] w-[70px] items-center justify-center rounded-lg bg-primary/10 text-primary font-orbitron font-bold text-2xl">
            CLG
          </div>
        )}
      </Link>

      <Link
        href="/"
        className="hidden flex-col transition-opacity hover:opacity-80 sm:flex"
      >
        <span className="font-orbitron text-2xl leading-tight font-extrabold tracking-wide">
          Chief Live Gaming
        </span>
        <span className="font-orbitron text-muted-foreground text-sm font-bold tracking-widest">
          Miniature Painting Services
        </span>
      </Link>
    </div>
  );
}
