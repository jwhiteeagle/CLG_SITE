import { PageTitleCard } from '@/components/app/page-title-card';
import { TextCard } from '@/components/app/text-card';

export default function EbayStorePage() {
  return (
    <div className="site-section">
      <div className="mb-8">
        <PageTitleCard
          title="eBay Store"
          description="Placeholder page for the Chief Live Gaming eBay store."
        />
      </div>

      <TextCard>
        <p>
          Coming soon. This page will link out to my eBay listings and include a
          quick overview of what I sell.
        </p>
      </TextCard>
    </div>
  );
}
