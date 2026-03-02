"use client";

import { useState } from "react";
import { Eye, Download, Loader2 } from "lucide-react";
import type { Config, ConfigWithoutContents } from "@/lib/types";
import { getPluginByName } from "@/lib/plugins";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminCardOptions } from "./admin-card-options";

interface ConfigCardProps {
  config: ConfigWithoutContents;
  setConfigPreview: (config: Config) => void;
  apiKey: string;
  updateConfigs: () => void;
  authorized: boolean;
}

export function ConfigCard({
  config,
  setConfigPreview,
  apiKey,
  updateConfigs,
  authorized,
}: ConfigCardProps) {
  const [loadingPreview, setLoadingPreview] = useState(false);
  const plugin = getPluginByName(config.plugin);

  return (
    <Card className="p-4 transition ease-in-out hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-row gap-4">
        <img
          src={plugin.image}
          alt={plugin.name}
          className="h-0 w-0 md:h-16 md:w-16"
        />
        <div className="flex flex-col place-content-center mb-1 overflow-hidden">
          <div className="flex">
            <span className="text-xl">{config.name}</span>
            <span className="text-slate-400 text-xl">.yml</span>
          </div>
          <span className="text-slate-600 text-sm">by {config.author}</span>
        </div>
        <div className="flex flex-row gap-4 ml-auto">
          <div className="flex flex-col place-content-center items-end">
            <span className="text-slate-600 text-sm flex items-center gap-1">
              {config.views} <Eye className="h-3 w-3" />
            </span>
            <span className="text-slate-600 text-sm flex items-center gap-1">
              {config.downloads} <Download className="h-3 w-3" />
            </span>
          </div>

          {authorized && (
            <AdminCardOptions
              updateConfigs={updateConfigs}
              apiKey={apiKey}
              config={config}
            />
          )}

          <Button
            variant="outline"
            className="self-center"
            onClick={() => {
              setLoadingPreview(true);
              fetch(`/api/v2/configs/${config.id}`)
                .then((res) => res.json())
                .then((data) => setConfigPreview(data.config))
                .catch((err) => console.error(err))
                .finally(() => setLoadingPreview(false));
            }}
          >
            {loadingPreview ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Preview"
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
