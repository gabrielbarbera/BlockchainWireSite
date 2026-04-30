import { useState, useEffect, useCallback } from "react";
import { fetchNewsroomFeed } from "../lib/newsroom-api";
import type { NewsItem } from "../types/newsroom";

interface UseNewsroomFeedReturn {
  data: NewsItem[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useNewsroomFeed(): UseNewsroomFeedReturn {
  const [data, setData] = useState<NewsItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await fetchNewsroomFeed();
      if (items.length === 0) {
        setError("No items found in feed");
      } else {
        setData(items);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}
