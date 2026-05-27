import { useState, useEffect } from "react";
import { fetchAllIndustryNews } from "../lib/newsroom-api";
import type { IndustryNewsItem, IndustryNewsSource } from "../types/newsroom";

interface UseIndustryFeedReturn {
  items: IndustryNewsItem[];
  sources: IndustryNewsSource[];
  loading: boolean;
  error: string | null;
}

export function useIndustryFeed(): UseIndustryFeedReturn {
  const [items, setItems] = useState<IndustryNewsItem[]>([]);
  const [sources, setSources] = useState<IndustryNewsSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchAllIndustryNews()
      .then((result) => {
        if (cancelled) return;
        setItems(result.items);
        setSources(result.sources);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load industry news");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  return { items, sources, loading, error };
}
