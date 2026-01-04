import type { ReactNode } from 'react';

import { Instagram, Youtube } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type SocialIconLinkProps = {
  href: string;
  label: string;
  icon: ReactNode;
  className?: string;
};

function SocialIconLink({ href, label, icon, className }: SocialIconLinkProps) {
  return (
    <Button
      asChild
      variant="nav"
      size="nav-icon"
      className={cn(
        'group relative h-[68px] w-[68px] overflow-visible',
        className
      )}
    >
      <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
        {icon}
        <span className="sr-only">{label}</span>
        <span
          aria-hidden="true"
          className="bg-popover text-popover-foreground ring-border pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium opacity-0 shadow-sm ring-1 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          {label}
        </span>
      </a>
    </Button>
  );
}

export type SocialIconLinksProps = {
  className?: string;
  instagramHref?: string;
  youtubeHref?: string;
};

export function SocialIconLinks({
  className,
  instagramHref = 'https://www.instagram.com/',
  youtubeHref = 'https://www.youtube.com/',
}: SocialIconLinksProps) {
  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <SocialIconLink
        href={instagramHref}
        label="Instagram"
        icon={<Instagram className="size-6" aria-hidden="true" />}
      />
      <SocialIconLink
        href={youtubeHref}
        label="YouTube"
        icon={<Youtube className="size-6" aria-hidden="true" />}
      />
    </div>
  );
}
