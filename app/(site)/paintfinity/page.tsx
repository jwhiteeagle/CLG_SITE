import { PageTitleCard } from '@/components/app/page-title-card';
import { TextCard } from '@/components/app/text-card';

export default function PaintfinityPage() {
  return (
    <div className="site-section">
      <div className="mb-8">
        <PageTitleCard
          title="Paintfinity"
          description="Placeholder page for Paintfinity."
        />
      </div>

      <TextCard>
        <p>
          Coming soon. This page will describe Paintfinity and how it ties into
          my commission work.
        </p>
      </TextCard>
    </div>
  );
}
