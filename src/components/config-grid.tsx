"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useInView } from "react-intersection-observer";
import type { Config, ConfigWithoutContents } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { ConfigCard } from "./config-card";

interface ConfigGridProps {
  configs: ConfigWithoutContents[];
  setConfigPreview: (config: Config) => void;
  apiKey: string;
  updateConfigs: () => void;
  loadMore: () => void;
  isShowingAll: boolean;
  authorized: boolean;
}

export function ConfigGrid({
  configs,
  setConfigPreview,
  apiKey,
  updateConfigs,
  loadMore,
  isShowingAll,
  authorized,
}: ConfigGridProps) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) loadMore();
  }, [inView, loadMore]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      {configs.map((config) => (
        <ConfigCard
          key={config.id}
          config={config}
          setConfigPreview={setConfigPreview}
          apiKey={apiKey}
          updateConfigs={updateConfigs}
          authorized={authorized}
        />
      ))}

      {!isShowingAll && (
        <div ref={ref} className="place-self-center">
          <Card className="p-4">
            <Loader2 className="h-4 w-4 animate-spin" />
          </Card>
        </div>
      )}
    </div>
  );
}
