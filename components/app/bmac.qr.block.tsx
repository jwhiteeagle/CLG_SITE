import Image from 'next/image';

import { BuyMeACoffeeButton } from '@/components/app/buy-me-a-coffee-button';
import { PayPalDonateButton } from '@/components/app/paypal-donate-button';
import { SectionHeader } from '@/components/app/section-header';
import { cn } from '@/lib/utils';

type BmacQrBlockProps = {
  title?: string;
  description?: string;
  className?: string;
};

export function BmacQrBlock({
  title = 'Support My Work',
  description = 'Scan the QR code or use the button below to donate.',
  className,
}: BmacQrBlockProps) {
  return (
    <section className={cn('mx-auto max-w-lg', className)}>
      <div className="site-card bg-warm-accent/7 p-5 sm:p-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionHeader
            align="center"
            title={title}
            description={description}
            className="w-full"
          />

          <div className="bg-background/60 ring-border relative aspect-square w-full max-w-[260px] overflow-hidden rounded-xl ring-1">
            <Image
              src="/images/brand/BMAC-QR-Code.webp"
              alt="Buy Me a Coffee QR code"
              fill
              sizes="260px"
              className="object-contain p-3"
              priority={false}
            />
          </div>

          <BuyMeACoffeeButton />
          <PayPalDonateButton />
        </div>
      </div>
    </section>
  );
}
