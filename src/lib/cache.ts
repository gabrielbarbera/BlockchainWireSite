const cache = new Map<string, { data: unknown; expiresAt: number }>();

export function getCached(key: string): unknown | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

export function setCached(key: string, data: unknown, ttl: number = 600000): void {
  cache.set(key, {
    data,
    expiresAt: Date.now() + ttl,
  });
}

export function clearCache(): void {
  cache.clear();
}
