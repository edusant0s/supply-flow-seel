import { useCallback, useEffect, useState } from "react";
import type React from "react";

const asyncDataCache = new Map<string, { data: unknown; error: string }>();

export function useAsyncData<T>(
  loader: () => Promise<T>,
  deps: React.DependencyList = [],
  options: { cacheKey?: string } = {}
) {
  const cacheKey = options.cacheKey || loader.toString();
  const cached = asyncDataCache.get(cacheKey);
  const [data, setData] = useState<T | null>((cached?.data as T | undefined) ?? null);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState(cached?.error || "");

  const refresh = useCallback(async () => {
    setLoading(!asyncDataCache.has(cacheKey));
    setError("");
    try {
      const nextData = await loader();
      asyncDataCache.set(cacheKey, { data: nextData, error: "" });
      setData(nextData);
    } catch (err) {
      const nextError = err instanceof Error ? err.message : "Falha ao carregar dados.";
      asyncDataCache.set(cacheKey, { data: asyncDataCache.get(cacheKey)?.data ?? null, error: nextError });
      setError(nextError);
    } finally {
      setLoading(false);
    }
  }, [cacheKey, ...deps]);

  useEffect(() => {
    if (!asyncDataCache.has(cacheKey)) refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useSessionState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const stored = window.sessionStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      // UI state cache only; failing to persist should not break the app.
    }
  }, [key, value]);

  return [value, setValue] as const;
}
