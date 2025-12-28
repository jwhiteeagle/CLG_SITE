'use client';

import * as React from 'react';
import { EyeOff, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  setReduceMotionOverride,
  useReduceMotionPreference,
} from '@/components/app/motion-preference';

export function GalleryReduceMotionToggle() {
  const { reduceMotion } = useReduceMotionPreference();

  const motionEffectEnabled = !reduceMotion;
  const label = motionEffectEnabled
    ? 'Gallery motion effect: on'
    : 'Gallery motion effect: off';

  return (
    <Button
      type="button"
      variant="nav"
      size="nav"
      className="border-primary/40 ring-primary/30 hover:border-primary/60 hover:ring-primary/40 ring-1"
      onClick={() =>
        setReduceMotionOverride(motionEffectEnabled ? 'reduce' : 'full')
      }
      aria-pressed={motionEffectEnabled}
    >
      {motionEffectEnabled ? (
        <Sparkles className="size-4" />
      ) : (
        <EyeOff className="size-4" />
      )}
      <span>{label}</span>
    </Button>
  );
}
