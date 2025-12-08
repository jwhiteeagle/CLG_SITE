"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="group relative flex h-[34px] w-[34px] items-center justify-center rounded-md border border-white/10 transition-all duration-200 hover:-translate-y-0.5 dark:border-white/5"
      style={{
        background: 'linear-gradient(135deg, var(--card) 0%, var(--card) 100%)',
        boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.1), 0 4px 8px -2px rgba(0, 0, 0, 0.06), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      <div 
        className="absolute inset-0 rounded-md opacity-[0.08] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, var(--primary) 0%, transparent 50%)'
        }}
      />
      {resolvedTheme === "dark" ? (
        <Sun className="relative z-10 h-[18px] w-[18px] text-yellow-400" />
      ) : (
        <Moon className="relative z-10 h-[18px] w-[18px] text-slate-700" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
