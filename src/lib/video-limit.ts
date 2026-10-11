// A tiny shared playback budget so dense video mosaics do not decode dozens of
// clips at once. Callers acquire a slot before playing and release it when they
// stop or unmount; waiters are re-notified whenever a slot frees up.
export function createVideoLimiter(max: number) {
  const active = new Set<HTMLVideoElement>();
  const listeners = new Set<() => void>();
  const notify = () => listeners.forEach((listener) => listener());

  return {
    acquire(element: HTMLVideoElement): boolean {
      if (active.has(element)) return true;
      if (active.size >= max) return false;
      active.add(element);
      notify();
      return true;
    },
    release(element: HTMLVideoElement): void {
      if (active.delete(element)) notify();
    },
    subscribe(listener: () => void): () => void {
      listeners.add(listener);
      return () => { listeners.delete(listener); };
    },
    size(): number {
      return active.size;
    },
  };
}

export type VideoLimiter = ReturnType<typeof createVideoLimiter>;
