"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Config, ConfigWithoutContents } from "@/lib/types";
import { SearchBar } from "./search-bar";
import { PluginFilter } from "./plugin-filter";
import { ConfigGrid } from "./config-grid";
import { ConfigPreview } from "./config-preview";
import { SettingsPopover } from "./settings-popover";

const PAGE_SIZE = 24;

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

async function fetchConfigs({
  plugin,
  query,
  apiKey,
  skip,
}: {
  plugin: string;
  query: string;
  apiKey: string;
  skip: number;
}): Promise<{ configs: ConfigWithoutContents[] }> {
  const params = new URLSearchParams({
    plugin,
    query,
    apiKey,
    limit: String(PAGE_SIZE),
    skip: String(skip),
  });
  const res = await fetch(`/api/v2/configs?${params}`);
  return res.json();
}

async function fetchCount({
  plugin,
  query,
  apiKey,
}: {
  plugin: string;
  query: string;
  apiKey: string;
}): Promise<{ amount: number }> {
  const params = new URLSearchParams({ plugin, query, apiKey });
  const res = await fetch(`/api/v2/configs/count?${params}`);
  return res.json();
}

export function MainPage() {
  const [plugin, setPlugin] = useState("");
  const [query, setQuery] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showing, setShowing] = useState<Config | null>(null);
  const queryClient = useQueryClient();

  const debouncedApiKey = useDebouncedValue(apiKey, 500);

  const { data: authData } = useQuery({
    queryKey: ["authLevel", debouncedApiKey],
    queryFn: async () => {
      const res = await fetch(`/api/v2/auth/level?apiKey=${debouncedApiKey}`);
      return res.json() as Promise<{ level: number }>;
    },
  });

  const authorized = (authData?.level ?? 0) > 0;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["configs", plugin, query, debouncedApiKey],
    queryFn: ({ pageParam = 0 }) =>
      fetchConfigs({ plugin, query, apiKey: debouncedApiKey, skip: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce(
        (sum, page) => sum + page.configs.length,
        0
      );
      if (lastPage.configs.length < PAGE_SIZE) return undefined;
      return totalFetched;
    },
    initialPageParam: 0,
  });

  const { data: countData } = useQuery({
    queryKey: ["configCount", plugin, query, debouncedApiKey],
    queryFn: () => fetchCount({ plugin, query, apiKey: debouncedApiKey }),
  });

  const configs = Array.from(
    new Map(
      (data?.pages.flatMap((page) => page.configs) ?? []).map((c) => [c.id, c])
    ).values()
  );
  const amount = countData?.amount ?? 0;

  const invalidateConfigs = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["configs"] });
    queryClient.invalidateQueries({ queryKey: ["configCount"] });
  }, [queryClient]);

  const escFunction = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") setShowing(null);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => document.removeEventListener("keydown", escFunction, false);
  }, [escFunction]);

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {showing && (
        <ConfigPreview config={showing} onClose={() => setShowing(null)} />
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <h1 className="font-display text-xl font-bold tracking-tight text-amber">
                lrcdb
              </h1>
              <span className="hidden sm:block text-xs text-muted-foreground font-mono mt-0.5">
                libreforge config database
              </span>
            </div>

            <SearchBar onSearch={setQuery} />

            <SettingsPopover apiKey={apiKey} setApiKey={setApiKey} />
          </div>
        </div>
      </header>

      {/* Plugin filter strip */}
      <div className="border-b border-border bg-surface/50">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
          <PluginFilter
            selected={plugin}
            onSelect={setPlugin}
            amount={amount}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Main grid */}
      <main className="flex-1 mx-auto w-full container px-4 sm:px-6 lg:px-8 py-6">
        <ConfigGrid
          configs={configs}
          onPreview={setShowing}
          apiKey={apiKey}
          authorized={authorized}
          invalidateConfigs={invalidateConfigs}
          isLoading={isLoading}
          hasNextPage={hasNextPage ?? false}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={fetchNextPage}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-muted-foreground">
            Configurations here are not officially supported. Download at your own risk.
          </p>
        </div>
      </footer>
    </div>
  );
}
