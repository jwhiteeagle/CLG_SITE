import Image from 'next/image';

import { BuyMeACoffeeButton } from '@/components/buy-me-a-coffee-button';
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
          <div className="space-y-1.5">
            <h2 className="text-primary text-2xl font-semibold">{title}</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-sm">
              {description}
            </p>
          </div>

          <div className="bg-background/60 ring-border relative aspect-square w-full max-w-[260px] overflow-hidden rounded-xl ring-1">
            <Image
              src="/images/brand/BMAC-QR-Code.png"
              alt="Buy Me a Coffee QR code"
              fill
              sizes="260px"
              className="object-contain p-3"
              priority={false}
            />
          </div>

          <BuyMeACoffeeButton />
        </div>
      </div>
    </section>
  );
}
