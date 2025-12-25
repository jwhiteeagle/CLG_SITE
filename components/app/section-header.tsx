import * as React from 'react';

import { cn } from '@/lib/utils';

export type SectionHeaderProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function SectionHeader({
  title,
  description,
  actions,
  align = 'left',
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex gap-4',
        align === 'center'
          ? 'flex-col items-center text-center'
          : 'flex-col sm:flex-row sm:items-end sm:justify-between',
        className
      )}
    >
      <div className={cn('space-y-2', align === 'center' && 'w-full')}>
        <h2 className={cn('type-section-title', titleClassName)}>{title}</h2>
        {description ? (
          <div className={cn('type-section-description', descriptionClassName)}>
            {description}
          </div>
        ) : null}
      </div>

      {actions ? <div className="flex gap-2">{actions}</div> : null}
    </div>
  );
}

