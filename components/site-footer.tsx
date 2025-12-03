import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Chief Live Gaming. All rights
          reserved.
        </p>
        <div className="flex gap-4 text-sm">
          <Link
            href="/commissions"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Commissions
          </Link>
          <Link
            href="/about"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}
