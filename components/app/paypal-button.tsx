import { cn } from '@/lib/utils';

type PaypalButtonProps = {
  text?: string;
  ariaLabel?: string;
  className?: string;
};

export function PaypalButton({
  text = 'Donate with PayPal',
  ariaLabel = 'Donate with PayPal',
  className,
}: PaypalButtonProps) {
  const showWordmarkOnly = text === 'PayPal';
  const showDonateWith = text === 'Donate with PayPal';

  return (
    <a
      href={`https://www.paypal.com/donate/?hosted_button_id=RNAQ4X8MUK5A8`}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'inline-flex h-11 min-w-[180px] items-center justify-center gap-2 rounded-lg border border-[#003087]/20 bg-white px-4 text-sm font-semibold text-[#003087] shadow-sm transition-colors hover:bg-[#f5f8ff] focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
      aria-label={ariaLabel}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-4"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M5 3h7a5 5 0 0 1 0 10H9v8H5z"
          fill="#003087"
        />
        <path
          d="M8 5h6a4 4 0 0 1 0 8h-3v6H8z"
          fill="#009cde"
        />
      </svg>
      {showDonateWith ? (
        <span className="leading-none whitespace-nowrap">
          <span className="text-[#003087]">Donate with </span>
          <span className="text-[#003087]">Pay</span>
          <span className="text-[#009cde]">Pal</span>
        </span>
      ) : showWordmarkOnly ? (
        <span className="leading-none whitespace-nowrap">
          <span className="text-[#003087]">Pay</span>
          <span className="text-[#009cde]">Pal</span>
        </span>
      ) : (
        <span className="leading-none whitespace-nowrap text-[#003087]">
          {text}
        </span>
      )}
    </a>
  );
}
