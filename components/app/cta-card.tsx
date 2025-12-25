import * as React from 'react';

import { cn } from '@/lib/utils';

export type CtaCardProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  contentClassName?: string;
  withContainer?: boolean;
  align?: 'center' | 'left';
};

export function CtaCard({
  children,
  className,
  containerClassName,
  contentClassName,
  withContainer = true,
  align = 'center',
}: CtaCardProps) {
  const card = (
    <div
      className={cn(
        'site-card bg-warm-accent/12 ring-warm-accent/20 mx-auto max-w-240 ring-1',
        className
      )}
    >
      <div
        className={cn(
          'type-body max-w-none space-y-4',
          align === 'center' ? 'text-center' : 'text-left',
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );

  if (!withContainer) return card;

  return (
    <div className={cn('mx-auto max-w-240 space-y-10', containerClassName)}>
      {card}
    </div>
  );
}
