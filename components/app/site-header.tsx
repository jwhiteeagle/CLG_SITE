import Link from 'next/link';
import { ThemeToggle } from '@/components/app/theme-toggle';
import { Button } from '@/components/ui/button';
import { BrandMark } from '@/components/app/brand-mark';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/commissions', label: 'Commissions' },
  { href: '/ebay-store', label: 'eBay Store' },
  { href: '/paintfinity', label: 'Paintfinity' },
];

export function SiteHeader() {
  return (
    <header className="border-border bg-background border-b">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <BrandMark />

        {/* Navigation */}
        <nav className="flex items-center gap-1 overflow-x-auto sm:gap-2">
          {navLinks.map((link) => (
            <Button key={link.href} asChild variant="nav" size="nav">
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
