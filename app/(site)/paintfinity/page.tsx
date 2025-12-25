import { GalleryCategoryHeader } from '@/components/app/gallery-category-header';
import { TextCardRem60 } from '@/components/app/text-card-rem60';

export default function PaintfinityPage() {
  return (
    <div className="site-section">
      <div className="mb-8">
        <GalleryCategoryHeader
          title="Paintfinity"
          description="Placeholder page for Paintfinity."
        />
      </div>

      <TextCardRem60>
        <p className="text-muted-foreground">
          Coming soon. This page will describe Paintfinity and how it ties into
          my commission work.
        </p>
      </TextCardRem60>
    </div>
  );
}
