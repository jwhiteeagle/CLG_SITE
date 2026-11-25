'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

const subscribeNoop = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // false during SSR/hydration, true on the client: avoids a theme mismatch flash
  const mounted = React.useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <Button variant="nav" size="nav-icon" disabled type="button">
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      variant="nav"
      size="nav-icon"
      type="button"
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="h-[18px] w-[18px] text-yellow-400" />
      ) : (
        <Moon className="h-[18px] w-[18px] text-slate-700" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
