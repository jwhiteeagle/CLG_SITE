import * as React from 'react';

import { cn } from '@/lib/utils';

export type TextCardProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  contentClassName?: string;
  withContainer?: boolean;
  align?: 'center' | 'left';
};

export function TextCard({
  children,
  className,
  containerClassName,
  contentClassName,
  withContainer = true,
  align = 'center',
}: TextCardProps) {
  const card = (
    <div className={cn('site-card bg-warm-accent/7 mx-auto max-w-240', className)}>
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
