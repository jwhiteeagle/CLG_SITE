import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-border bg-background border-t">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 text-center sm:px-6 lg:px-8">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Chief Live Gaming. All rights
          reserved.
        </p>
        <div className="flex gap-4 text-sm">
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
        </div>
      </div>
    </footer>
  );
}
