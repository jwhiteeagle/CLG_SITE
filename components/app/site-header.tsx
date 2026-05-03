import Link from 'next/link';
import { ThemeToggle } from '@/components/app/theme-toggle';
import { Button } from '@/components/ui/button';
import { BrandMark } from '@/components/app/brand-mark';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/commissions', label: 'Commissions' },
  { href: '/links', label: 'Links' },
  {
    href: 'https://paintfinity.chieflivegaming.com/',
    label: 'Paintfinity',
    external: true,
  },
];

export function SiteHeader() {
  return (
    <header className="border-border bg-background border-b">
      <div className="mx-auto flex h-20 max-w-[90rem] items-center justify-between px-4 sm:px-6 lg:px-8">
        <BrandMark />

        {/* Navigation */}
        <nav className="flex items-center gap-1 overflow-x-auto sm:gap-2">
          {navLinks.map((link) => (
            <Button key={link.href} asChild variant="nav" size="nav">
              {link.external ? (
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ) : (
                <Link href={link.href} prefetch={false}>
                  {link.label}
                </Link>
              )}
            </Button>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
