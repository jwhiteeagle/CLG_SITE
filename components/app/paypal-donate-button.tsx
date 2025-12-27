import { cn } from '@/lib/utils';

type PayPalDonateButtonProps = {
  hostedButtonId?: string;
  className?: string;
};

export function PayPalDonateButton({
  hostedButtonId = 'RNAQ4X8MUK5A8',
  className,
}: PayPalDonateButtonProps) {
  return (
    <form
      action="https://www.paypal.com/donate"
      method="post"
      target="_top"
      className={cn('flex justify-center', className)}
    >
      <input type="hidden" name="hosted_button_id" value={hostedButtonId} />

      <button
        type="submit"
        className={cn(
          'inline-flex h-11 min-w-[180px] items-center justify-center gap-2 rounded-lg bg-[#003087] px-4 text-sm font-semibold text-white shadow-sm ring-1 ring-black/20 transition-colors hover:bg-[#003087]/90 focus-visible:ring-2 focus-visible:ring-ring'
        )}
        aria-label="Donate via PayPal"
      >
        <span className="leading-none">Donate via</span>
        <span className="rounded bg-white/90 px-2 py-1 shadow-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.paypalobjects.com/webstatic/i/logo/rebrand/ppcom.svg"
            alt="PayPal"
            className="h-5 w-auto"
          />
        </span>
      </button>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src="https://www.paypal.com/en_US/i/scr/pixel.gif"
        width="1"
        height="1"
      />
    </form>
  );
}
