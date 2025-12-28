'use client';

import * as React from 'react';

const STORAGE_KEY = 'clg_reduce_motion';
const EVENT_NAME = 'clg:motion-preference';

type MotionOverride = 'reduce' | 'full' | null;

function readOverrideFromStorage(): MotionOverride {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === '1') return 'reduce';
  if (raw === '0') return 'full';
  return null;
}

function readSystemReduceMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
  );
}

function getSnapshot(): string {
  const override = readOverrideFromStorage();
  const system = readSystemReduceMotion();
  return `${override ?? 'system'}|${system ? '1' : '0'}`;
}

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};

  const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');

  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) callback();
  };
  const onCustom = () => callback();
  const onMediaChange = () => callback();

  window.addEventListener('storage', onStorage);
  window.addEventListener(EVENT_NAME, onCustom);

  if (media?.addEventListener) {
    media.addEventListener('change', onMediaChange);
  } else if (media?.addListener) {
    media.addListener(onMediaChange);
  }

  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(EVENT_NAME, onCustom);
    if (media?.removeEventListener) {
      media.removeEventListener('change', onMediaChange);
    } else if (media?.removeListener) {
      media.removeListener(onMediaChange);
    }
  };
}

export function setReduceMotionOverride(next: MotionOverride) {
  if (typeof window === 'undefined') return;
  if (next === null) {
    window.localStorage.removeItem(STORAGE_KEY);
  } else {
    window.localStorage.setItem(STORAGE_KEY, next === 'reduce' ? '1' : '0');
  }
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function useReduceMotionPreference(): {
  reduceMotion: boolean;
  source: 'system' | 'override';
  override: MotionOverride;
} {
  const snapshot = React.useSyncExternalStore(subscribe, getSnapshot, () => {
    // Server render: default to no-reduce so output is stable; client will correct.
    return 'system|0';
  });

  const [overrideRaw, systemRaw] = snapshot.split('|');
  const override =
    overrideRaw === 'reduce'
      ? 'reduce'
      : overrideRaw === 'full'
        ? 'full'
        : null;
  const systemReduce = systemRaw === '1';

  if (override === 'reduce') {
    return { reduceMotion: true, source: 'override', override };
  }
  if (override === 'full') {
    return { reduceMotion: false, source: 'override', override };
  }

  return { reduceMotion: systemReduce, source: 'system', override: null };
}

