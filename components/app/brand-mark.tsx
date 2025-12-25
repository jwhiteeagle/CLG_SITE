import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Link
        href="/"
        className="surface-clickable flex h-[72px] w-[72px] items-center justify-center rounded-lg hover:-translate-y-0.5"
      >
        <Image
          src="/images/brand/CLG 2026 Brush Logo.png"
          alt="Chief Live Gaming"
          width={70}
          height={70}
          className="h-[70px] w-[70px]"
        />
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
