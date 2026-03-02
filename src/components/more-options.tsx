"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

interface MoreOptionsProps {
  setApiKey: (key: string) => void;
  apiKey: string;
}

export function MoreOptions({ setApiKey, apiKey }: MoreOptionsProps) {
  const [shown, setShown] = useState(false);

  return (
    <div className="flex flex-col place-items-center gap-4">
      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={shown}
          onChange={(e) => setShown(e.target.checked)}
          className="rounded"
        />
        Show more options
      </label>
      {shown && (
        <Input
          placeholder="API key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      )}
    </div>
  );
}
