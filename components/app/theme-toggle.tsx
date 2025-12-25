'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

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
