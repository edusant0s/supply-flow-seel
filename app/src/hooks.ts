import { useCallback, useEffect, useRef, useState } from "react";
import type React from "react";

const asyncDataCache = new Map<string, { data: unknown; error: string }>();
const asyncDataInvalidationEvent = "supply-flow:async-data-invalidated";
type RefreshOptions = { preserveScroll?: boolean; silent?: boolean };
type InvalidateOptions = { clearCache?: boolean };
type ScrollSnapshot = { x: number; y: number };

export function invalidateAsyncData(keys?: string | string[], options: InvalidateOptions = {}) {
  const targetKeys = Array.isArray(keys) ? keys : keys ? [keys] : [];
  if (options.clearCache) {
    if (targetKeys.length) targetKeys.forEach((key) => asyncDataCache.delete(key));
    else asyncDataCache.clear();
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(asyncDataInvalidationEvent, { detail: { keys: targetKeys } }));
  }
}

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
  const dataRef = useRef<T | null>((cached?.data as T | undefined) ?? null);

  const refresh = useCallback(async (refreshOptionsInput?: unknown) => {
    const refreshOptions = isRefreshOptions(refreshOptionsInput) ? refreshOptionsInput : {};
    const scrollSnapshot = refreshOptions.preserveScroll ? getScrollSnapshot() : null;
    const hasVisibleData = dataRef.current !== null;
    setLoading(!refreshOptions.silent && !asyncDataCache.has(cacheKey) && !hasVisibleData);
    setError("");
    try {
      const nextData = await loader();
      asyncDataCache.set(cacheKey, { data: nextData, error: "" });
      dataRef.current = nextData;
      setData(nextData);
    } catch (err) {
      const nextError = err instanceof Error ? err.message : "Falha ao carregar dados.";
      asyncDataCache.set(cacheKey, { data: asyncDataCache.get(cacheKey)?.data ?? null, error: nextError });
      setError(nextError);
    } finally {
      setLoading(false);
      restoreScrollSnapshot(scrollSnapshot);
    }
  }, [cacheKey, ...deps]);

  useEffect(() => {
    if (!asyncDataCache.has(cacheKey)) refresh();
  }, [refresh]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    function handleInvalidation(event: Event) {
      const keys = (event as CustomEvent<{ keys?: string[] }>).detail?.keys || [];
      if (!keys.length || keys.includes(cacheKey)) void refresh({ preserveScroll: true, silent: true });
    }
    window.addEventListener(asyncDataInvalidationEvent, handleInvalidation);
    return () => window.removeEventListener(asyncDataInvalidationEvent, handleInvalidation);
  }, [cacheKey, refresh]);

  return { data, loading, error, refresh };
}

function getScrollSnapshot(): ScrollSnapshot | null {
  if (typeof window === "undefined") return null;
  return { x: window.scrollX, y: window.scrollY };
}

function isRefreshOptions(value: unknown): value is RefreshOptions {
  return Boolean(value && typeof value === "object" && ("preserveScroll" in value || "silent" in value));
}

function restoreScrollSnapshot(snapshot: ScrollSnapshot | null) {
  if (!snapshot || typeof window === "undefined") return;
  window.requestAnimationFrame(() => {
    window.scrollTo({ left: snapshot.x, top: snapshot.y, behavior: "auto" });
    window.requestAnimationFrame(() => window.scrollTo({ left: snapshot.x, top: snapshot.y, behavior: "auto" }));
  });
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
