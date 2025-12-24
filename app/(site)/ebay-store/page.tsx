import { GalleryCategoryHeader } from '@/components/gallery-category-header';
import { TextCardRem60 } from '@/components/text-card-rem60';

export default function EbayStorePage() {
  return (
    <div className="site-section">
      <div className="mb-8">
        <GalleryCategoryHeader
          title="eBay Store"
          description="Placeholder page for the Chief Live Gaming eBay store."
        />
      </div>

      <TextCardRem60>
        <p className="text-muted-foreground">
          Coming soon. This page will link out to my eBay listings and include a
          quick overview of what I sell.
        </p>
      </TextCardRem60>
    </div>
  );
}
