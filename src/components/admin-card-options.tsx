"use client";

import { useState } from "react";
import { Share, Trash2, Loader2 } from "lucide-react";
import type { ConfigWithoutContents } from "@/lib/types";

interface AdminCardOptionsProps {
  config: ConfigWithoutContents;
  apiKey: string;
  invalidateConfigs: () => void;
}

export function AdminCardOptions({
  config,
  apiKey,
  invalidateConfigs,
}: AdminCardOptionsProps) {
  const [deleting, setDeleting] = useState(false);
  const [publicizing, setPublicizing] = useState(false);

  return (
    <div className="flex gap-1">
      {config.isPrivate && (
        <button
          onClick={() => {
            setPublicizing(true);
            fetch(`/api/v2/configs/${config.id}/publicize?apiKey=${apiKey}`, {
              method: "PATCH",
            })
              .then(() => invalidateConfigs())
              .catch((err) => console.error(err))
              .finally(() => setPublicizing(false));
          }}
          className="h-7 w-7 rounded-md flex items-center justify-center text-green-600 dark:text-green-400 hover:bg-green-500/10 border border-green-500/25 hover:border-green-500/40 transition-all"
        >
          {publicizing ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Share className="h-3.5 w-3.5" />
          )}
        </button>
      )}

      <button
        onClick={() => {
          setDeleting(true);
          fetch(`/api/v2/configs/${config.id}?apiKey=${apiKey}`, {
            method: "DELETE",
          })
            .then(() => invalidateConfigs())
            .catch((err) => console.error(err))
            .finally(() => setDeleting(false));
        }}
        className="h-7 w-7 rounded-md flex items-center justify-center text-red-600 dark:text-red-400 hover:bg-red-500/10 border border-red-500/25 hover:border-red-500/40 transition-all"
      >
        {deleting ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Trash2 className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}
