import * as React from 'react';

type GalleryCategoryHeaderProps = {
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
};

export function GalleryCategoryHeader({
  title,
  description,
  actions,
}: GalleryCategoryHeaderProps) {
  return (
    <section className="gallery-category-header">
      <div className="gallery-category-header-top">
        <div />
        <h1 className="gallery-category-header-title text-primary">{title}</h1>
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
