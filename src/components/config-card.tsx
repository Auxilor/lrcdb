"use client";

import { useState } from "react";
import { Eye, Download, Loader2 } from "lucide-react";
import type { Config, ConfigWithoutContents } from "@/lib/types";
import { getPluginByName } from "@/lib/plugins";
import { AdminCardOptions } from "./admin-card-options";

interface ConfigCardProps {
  config: ConfigWithoutContents;
  onPreview: (config: Config) => void;
  apiKey: string;
  authorized: boolean;
  invalidateConfigs: () => void;
}

export function ConfigCard({
  config,
  onPreview,
  apiKey,
  authorized,
  invalidateConfigs,
}: ConfigCardProps) {
  const [loadingPreview, setLoadingPreview] = useState(false);
  const plugin = getPluginByName(config.plugin);

  return (
    <div
      className="card-glow group relative rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/25 cursor-pointer"
      onClick={() => {
        if (loadingPreview) return;
        setLoadingPreview(true);
        fetch(`/api/v2/configs/${config.id}`)
          .then((res) => res.json())
          .then((data) => onPreview(data.config))
          .catch((err) => console.error(err))
          .finally(() => setLoadingPreview(false));
      }}
    >
      <div className="flex items-start gap-3">
        {plugin.image ? (
          <img
            src={plugin.image}
            alt={plugin.name}
            className="hidden sm:block h-10 w-10 rounded-lg object-cover"
          />
        ) : (
          <div className="hidden sm:flex h-10 w-10 rounded-lg bg-secondary items-center justify-center ring-1 ring-border">
            <span className="text-xs text-muted-foreground font-mono">
              {config.plugin.charAt(0)}
            </span>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-1">
            <span className="font-medium text-foreground truncate">
              {config.name}
            </span>
            <span className="text-muted-foreground text-sm">.yml</span>
            {loadingPreview && (
              <Loader2 className="h-3 w-3 animate-spin text-primary ml-1" />
            )}
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-muted-foreground">
              by {config.author}
            </span>
            <span className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
              <Eye className="h-3 w-3" />
              {config.views}
            </span>
            <span className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
              <Download className="h-3 w-3" />
              {config.downloads}
            </span>
          </div>
        </div>

        {authorized && (
          <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
            <AdminCardOptions
              config={config}
              apiKey={apiKey}
              invalidateConfigs={invalidateConfigs}
            />
          </div>
        )}
      </div>

      {config.isPrivate && (
        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-dim text-amber border border-amber-muted">
          private
        </div>
      )}
    </div>
  );
}
