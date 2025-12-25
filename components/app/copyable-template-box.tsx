'use client';

import { useCallback, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

type CopyableTemplateBoxProps = {
  value: string;
  className?: string;
  copiedMessage?: string;
};

async function copyText(text: string, fallbackSelectEl?: HTMLTextAreaElement | null) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    if (!fallbackSelectEl) return false;
    fallbackSelectEl.focus();
    fallbackSelectEl.select();
    try {
      return document.execCommand('copy');
    } catch {
      return false;
    }
  }
}

export function CopyableTemplateBox({
  value,
  className,
  copiedMessage = 'Text copied',
}: CopyableTemplateBoxProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const ok = await copyText(value, textareaRef.current);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }, [value]);

  return (
    <div className={cn('relative', className)}>
      <textarea
        ref={textareaRef}
        readOnly
        rows={4}
        value={value}
        onClick={handleCopy}
        onFocus={handleCopy}
        className="text-foreground w-full resize-none bg-transparent font-mono text-sm leading-relaxed outline-none"
        aria-label="Copyable email template"
      />
      <div
        className={cn(
          'text-muted-foreground pointer-events-none absolute right-3 top-3 rounded-full bg-black/5 px-2 py-1 text-xs font-medium opacity-0 transition-opacity',
          copied && 'opacity-100'
        )}
        aria-live="polite"
      >
        {copiedMessage}
      </div>
    </div>
  );
}
