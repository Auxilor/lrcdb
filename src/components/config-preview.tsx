"use client";

import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import type { Config } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImportCommand } from "./import-command";

interface ConfigPreviewProps {
  config: Config;
  setConfigPreview: (config: Config | null) => void;
}

export function ConfigPreview({
  config,
  setConfigPreview,
}: ConfigPreviewProps) {
  const [downloadLink, setDownloadLink] = useState("");
  const [showImport, setShowImport] = useState(false);

  useEffect(() => {
    const data = new Blob([config.contents], { type: "text/yml" });

    if (downloadLink !== "") {
      window.URL.revokeObjectURL(downloadLink);
    }

    setDownloadLink(window.URL.createObjectURL(data));
  }, [config]);

  return (
    <div className="absolute z-10 bg-slate-400/20 inset-0">
      <div className="flex place-content-center place-items-center w-screen h-screen">
        {showImport ? (
          <ImportCommand
            config={config}
            close={() => setShowImport(false)}
          />
        ) : (
          <Card className="w-11/12 md:w-1/2 h-5/6 p-6 flex flex-col">
            <div className="flex mb-3">
              <span className="text-xl">{config.name}</span>
              <span className="text-slate-400 text-xl">.yml</span>
            </div>
            <SyntaxHighlighter
              language="yaml"
              className="bg-slate-200 p-4 rounded-lg flex-1 font-mono text-xs overflow-scroll"
            >
              {config.contents}
            </SyntaxHighlighter>
            <div className="grid grid-cols-3 mt-3 gap-4">
              <Button variant="outline" onClick={() => setShowImport(true)}>
                Add to your server
              </Button>
              <a
                download={`${config.name}.yml`}
                href={downloadLink}
                onClick={() => {
                  fetch(
                    `/api/v2/configs/${config.id}?isDownload=true`
                  ).catch((err) => console.error(err));
                }}
              >
                <Button variant="outline" className="w-full">
                  Download .yml file
                </Button>
              </a>
              <Button
                variant="outline"
                onClick={() => setConfigPreview(null)}
              >
                Close
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
