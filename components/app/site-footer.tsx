import Link from 'next/link';

import { BuyMeACoffeeButton } from '@/components/app/buy-me-a-coffee-button';

export function SiteFooter() {
  return (
    <footer className="border-border bg-background border-t">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 text-center sm:px-6 lg:px-8">
        <BuyMeACoffeeButton />
        <p className="type-body-sm">
          &copy; {new Date().getFullYear()} Chief Live Gaming. All rights
          reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <Link
            href="/commissions"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Commissions
          </Link>
          <Link
            href="/about"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="/ebay-store"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            eBay Store
          </Link>
          <Link
            href="/paintfinity"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Paintfinity
          </Link>
        </div>
      </div>
    </footer>
  );
}
