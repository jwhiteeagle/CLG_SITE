import * as React from 'react';

import { cn } from '@/lib/utils';

export type PageTitleCardProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
};

export function PageTitleCard({
  title,
  description,
  actions,
  className,
}: PageTitleCardProps) {
  return (
    <section className={cn('gallery-category-header', className)}>
      <div className="gallery-category-header-top">
        <div />
        <h1 className="gallery-category-header-title">{title}</h1>
        <div className="gallery-category-header-actions">
          {actions ? actions : null}
        </div>
      </div>

      {description ? (
        <div className="gallery-category-header-description">{description}</div>
      ) : null}
    </section>
  );
}
