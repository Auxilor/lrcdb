"use client";

import { useEffect, useState } from "react";
import { X, Download, Terminal, Copy, Check } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import type { Config } from "@/lib/types";

interface ConfigPreviewProps {
  config: Config;
  onClose: () => void;
}

export function ConfigPreview({ config, onClose }: ConfigPreviewProps) {
  const [downloadLink, setDownloadLink] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [copied, setCopied] = useState(false);

  const importCommand = `/lrcdb import ${config.id}`;

  useEffect(() => {
    const data = new Blob([config.contents], { type: "text/yml" });

    if (downloadLink !== "") {
      window.URL.revokeObjectURL(downloadLink);
    }

    setDownloadLink(window.URL.createObjectURL(data));
  }, [config]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl max-h-[85vh] rounded-2xl border border-border bg-card shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-lg font-semibold text-foreground">
              {config.name}
            </span>
            <span className="text-muted-foreground">.yml</span>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* YAML content — always dark for readability */}
        <div className="flex-1 overflow-auto yaml-preview min-h-0">
          <SyntaxHighlighter
            language="yaml"
            style={atomOneDark}
            customStyle={{
              margin: 0,
              padding: "1.25rem",
              background: "#0e0e11",
              minHeight: "100%",
            }}
          >
            {config.contents}
          </SyntaxHighlighter>
        </div>

        {/* Actions */}
        <div className="border-t border-border px-5 py-4 space-y-3">
          {/* Import command section */}
          {showImport ? (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                Run this in your Minecraft server console:
              </p>
              <div className="relative">
                <pre className="rounded-lg bg-secondary border border-border p-3 pr-12 font-mono text-sm text-primary overflow-x-auto">
                  {importCommand}
                </pre>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(importCommand);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 3000);
                  }}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-md flex items-center justify-center transition-all ${
                    copied
                      ? "bg-green-500/15 text-green-500"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
              <button
                onClick={() => setShowImport(false)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Back
              </button>
            </div>
          ) : (
            <div className="flex gap-2.5">
              <button
                onClick={() => setShowImport(true)}
                className="flex-1 flex items-center justify-center gap-2 h-10 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <Terminal className="h-4 w-4" />
                Add to your server
              </button>
              <a
                download={`${config.name}.yml`}
                href={downloadLink}
                onClick={() => {
                  fetch(
                    `/api/v2/configs/${config.id}?isDownload=true`
                  ).catch((err) => console.error(err));
                }}
                className="flex-1 flex items-center justify-center gap-2 h-10 rounded-lg text-sm font-medium border border-border bg-secondary text-foreground hover:bg-accent transition-colors"
              >
                <Download className="h-4 w-4" />
                Download .yml
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
