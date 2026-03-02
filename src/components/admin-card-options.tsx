"use client";

import { useState } from "react";
import { Share, Trash2, Loader2 } from "lucide-react";
import type { ConfigWithoutContents } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface AdminCardOptionsProps {
  config: ConfigWithoutContents;
  apiKey: string;
  updateConfigs: () => void;
}

export function AdminCardOptions({
  config,
  apiKey,
  updateConfigs,
}: AdminCardOptionsProps) {
  const [deleting, setDeleting] = useState(false);
  const [publicizing, setPublicizing] = useState(false);

  return (
    <div className="self-center flex flex-row gap-2">
      {config.isPrivate && (
        <Button
          variant="outline"
          size="sm"
          className="text-green-600 border-green-600"
          onClick={() => {
            setPublicizing(true);
            fetch(`/api/v2/configs/${config.id}/publicize?apiKey=${apiKey}`, {
              method: "PATCH",
            })
              .then(() => updateConfigs())
              .catch((err) => console.error(err))
              .finally(() => setPublicizing(false));
          }}
        >
          {publicizing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Share className="h-4 w-4" />
          )}
        </Button>
      )}

      <Button
        variant="outline"
        size="sm"
        className="text-red-600 border-red-600"
        onClick={() => {
          setDeleting(true);
          fetch(`/api/v2/configs/${config.id}?apiKey=${apiKey}`, {
            method: "DELETE",
          })
            .then(() => updateConfigs())
            .catch((err) => console.error(err))
            .finally(() => setDeleting(false));
        }}
      >
        {deleting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
