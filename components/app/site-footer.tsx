import Link from 'next/link';

import { BuyMeACoffeeButton } from '@/components/app/buy-me-a-coffee-button';
import { PaypalButton } from '@/components/app/paypal-button';

export function SiteFooter() {
  return (
    <footer className="border-border bg-background border-t">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 text-center sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <PaypalButton />
          <BuyMeACoffeeButton />
        </div>
        <p className="type-body-sm">
          &copy; {new Date().getFullYear()} Chief Live Gaming. All rights
          reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <Link
            href="/commissions"
            prefetch={false}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Commissions
          </Link>
          <Link
            href="/about"
            prefetch={false}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="/links"
            prefetch={false}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Links
          </Link>
          <Link
            href="/paintfinity"
            prefetch={false}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Paintfinity
          </Link>
        </div>
      </div>
    </footer>
  );
}
