"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useInView } from "react-intersection-observer";
import type { Config, ConfigWithoutContents } from "@/lib/types";
import { ConfigCard } from "./config-card";

interface ConfigGridProps {
  configs: ConfigWithoutContents[];
  onPreview: (config: Config) => void;
  apiKey: string;
  authorized: boolean;
  invalidateConfigs: () => void;
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
}

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-start gap-3">
        <div className="hidden sm:block h-10 w-10 rounded-lg skeleton" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 skeleton" />
          <div className="h-3 w-1/3 skeleton" />
        </div>
        <div className="h-8 w-16 rounded-lg skeleton" />
      </div>
    </div>
  );
}

export function ConfigGrid({
  configs,
  onPreview,
  apiKey,
  authorized,
  invalidateConfigs,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: ConfigGridProps) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) onLoadMore();
  }, [inView, hasNextPage, isFetchingNextPage, onLoadMore]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (configs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center mb-4">
          <span className="text-xl text-muted-foreground">?</span>
        </div>
        <p className="text-muted-foreground text-sm">No configs found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {configs.map((config, i) => (
          <div
            key={config.id}
            className="animate-fade-up"
            style={{ animationDelay: `${(i % 12) * 35}ms` }}
          >
            <ConfigCard
              config={config}
              onPreview={onPreview}
              apiKey={apiKey}
              authorized={authorized}
              invalidateConfigs={invalidateConfigs}
            />
          </div>
        ))}
      </div>

      {hasNextPage && (
        <div ref={ref} className="flex justify-center py-8">
          {isFetchingNextPage && (
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          )}
        </div>
      )}
    </div>
  );
}
