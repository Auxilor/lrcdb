"use client";

import { useEffect, useState } from "react";
import { Settings, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface SettingsPopoverProps {
  apiKey: string;
  setApiKey: (key: string) => void;
}

export function SettingsPopover({ apiKey, setApiKey }: SettingsPopoverProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const themeOptions = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
  ] as const;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="shrink-0 flex items-center justify-center h-9 w-9 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all">
          <Settings className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 p-4">
        <div className="space-y-4">
          {/* Theme selector */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Theme</h4>
            {mounted && (
              <div className="flex rounded-lg border border-border bg-secondary p-0.5">
                {themeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setTheme(opt.value)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-medium transition-all ${
                      theme === opt.value
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <opt.icon className="h-3.5 w-3.5" />
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* API key */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">
              API Key
            </h4>
            <Input
              type="password"
              placeholder="Enter API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="h-8 text-sm"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
