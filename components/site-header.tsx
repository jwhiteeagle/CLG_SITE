import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/commissions", label: "Commissions" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link 
            href="/" 
            className="flex h-[72px] w-[72px] items-center justify-center rounded-lg bg-card shadow-[inset_0_2px_0_0_rgba(255,255,255,0.1),inset_0_-2px_0_0_rgba(0,0,0,0.1)] transition-shadow hover:shadow-[inset_0_2px_0_0_rgba(255,255,255,0.1),inset_0_-2px_0_0_rgba(0,0,0,0.1),0_4px_12px_-2px_rgba(0,0,0,0.15)]"
          >
            <Image
              src="/images/brand/clg-logo-2025-crop500.png"
              alt="Chief Live Gaming"
              width={70}
              height={70}
              className="h-[70px] w-[70px]"
              priority
            />
          </Link>
          <Link href="/" className="hidden transition-opacity hover:opacity-80 sm:inline">
            <span className="font-orbitron text-2xl font-extrabold tracking-wide">
              Chief Live Gaming
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-[inset_0_2px_0_0_rgba(255,255,255,0.1),inset_0_-2px_0_0_rgba(0,0,0,0.1)] transition-shadow hover:shadow-[inset_0_2px_0_0_rgba(255,255,255,0.1),inset_0_-2px_0_0_rgba(0,0,0,0.1),0_4px_12px_-2px_rgba(0,0,0,0.15)]"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
