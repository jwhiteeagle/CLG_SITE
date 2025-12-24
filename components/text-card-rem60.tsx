import * as React from 'react';

import { cn } from '@/lib/utils';

type TextCardRem60Props = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  withContainer?: boolean;
};

export function TextCardRem60({
  children,
  className,
  containerClassName,
  withContainer = true,
}: TextCardRem60Props) {
  const card = (
    <div
      className={cn('site-card bg-warm-accent/7 mx-auto max-w-240', className)}
    >
      <div className="prose prose-slate max-w-none text-center">{children}</div>
    </div>
  );

  if (!withContainer) return card;

  return (
    <div className={cn('mx-auto max-w-240 space-y-10', containerClassName)}>
      {card}
    </div>
  );
}
