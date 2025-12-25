import { cn } from '@/lib/utils';
import { Coffee } from 'lucide-react';

type BuyMeACoffeeButtonProps = {
  slug?: string;
  text?: string;
  className?: string;
};

export function BuyMeACoffeeButton({
  slug = 'chieflivegaming',
  text = 'Buy me a coffee',
  className,
}: BuyMeACoffeeButtonProps) {
  return (
    <a
      href={`https://www.buymeacoffee.com/${slug}`}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'inline-flex h-11 min-w-[180px] items-center justify-center gap-2 rounded-lg bg-[#FFDD00] px-4 text-sm font-semibold text-black shadow-sm ring-1 ring-black/20 transition-colors hover:bg-[#ffdd00]/90 focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
      aria-label={text}
    >
      <Coffee className="size-4" aria-hidden="true" />
      <span className="leading-none">{text}</span>
    </a>
  );
}
