import { PaypalButton } from '@/components/app/paypal-button';
import { SectionHeader } from '@/components/app/section-header';
import { cn } from '@/lib/utils';
import { BuyMeACoffeeButton } from '@/components/app/buy-me-a-coffee-button';

type BmacQrBlockProps = {
  title?: string;
  description?: string;
  className?: string;
};

export function BmacQrBlock({
  title = 'Support My Work',
  description = 'Use any of the buttons below to make a one time donation to support me directly. Donations are greatly appreciated and are super helpful for any artist!',
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

          <div className="flex flex-wrap items-center justify-center gap-3">
            <PaypalButton />
            <BuyMeACoffeeButton />
          </div>
        </div>
      </div>
    </section>
  );
}
