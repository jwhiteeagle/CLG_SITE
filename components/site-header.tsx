import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/theme-toggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/commissions', label: 'Commissions' },
];

export function SiteHeader() {
  return (
    <header className="border-border bg-background border-b">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group relative flex h-[72px] w-[72px] items-center justify-center rounded-lg border border-white/10 transition-all duration-200 hover:-translate-y-0.5 dark:border-white/5"
            style={{
              background:
                'linear-gradient(135deg, var(--card) 0%, var(--card) 100%)',
              boxShadow:
                '0 8px 16px -4px rgba(0, 0, 0, 0.1), 0 4px 8px -2px rgba(0, 0, 0, 0.06), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-lg opacity-[0.08]"
              style={{
                background:
                  'linear-gradient(135deg, var(--primary) 0%, transparent 50%)',
              }}
            />
            <Image
              src="/images/brand/CLG 2026 Brush Logo.png"
              alt="Chief Live Gaming"
              width={70}
              height={70}
              className="relative z-10 h-[70px] w-[70px]"
              priority
            />
          </Link>
          <Link
            href="/"
            className="hidden flex-col transition-opacity hover:opacity-80 sm:flex"
          >
            <span className="font-orbitron text-2xl leading-tight font-extrabold tracking-wide">
              Chief Live Gaming
            </span>
            <span className="font-orbitron text-muted-foreground text-sm font-bold tracking-widest">
              Miniature Painting Services
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group text-foreground relative rounded-md border border-white/10 px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 dark:border-white/5"
              style={{
                background:
                  'linear-gradient(135deg, var(--card) 0%, var(--card) 100%)',
                boxShadow:
                  '0 8px 16px -4px rgba(0, 0, 0, 0.1), 0 4px 8px -2px rgba(0, 0, 0, 0.06), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-md opacity-[0.08]"
                style={{
                  background:
                    'linear-gradient(135deg, var(--primary) 0%, transparent 50%)',
                }}
              />
              <span className="relative z-10">{link.label}</span>
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
