"use client";

import { useState } from "react";
import type { Config } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ImportCommandProps {
  config: Config;
  close: () => void;
}

export function ImportCommand({ config, close }: ImportCommandProps) {
  const command = `/lrcdb import ${config.id}`;
  const [copied, setCopied] = useState(false);

  return (
    <Card className="w-1/2 p-6 grid grid-rows-2 gap-2">
      <div className="grid grid-cols-6 gap-4">
        <span className="text-2xl col-start-1 col-span-4">
          Run this command:
        </span>
        <Button
          variant="outline"
          className={copied ? "border-green-500 text-green-500" : ""}
          onClick={() => {
            navigator.clipboard.writeText(command);
            setCopied(true);
            setTimeout(() => setCopied(false), 5000);
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
        <Button variant="outline" onClick={close}>
          Close
        </Button>
      </div>
      <p className="bg-slate-200 p-2 rounded-lg font-mono text-md">
        {command}
      </p>
    </Card>
  );
}
