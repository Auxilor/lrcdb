"use client";

import { Loader2 } from "lucide-react";
import { plugins } from "@/lib/plugins";

interface PluginFilterProps {
  selected: string;
  onSelect: (plugin: string) => void;
  amount: number;
  isLoading: boolean;
}

export function PluginFilter({
  selected,
  onSelect,
  amount,
  isLoading,
}: PluginFilterProps) {
  return (
    <div className="flex items-center gap-1.5 py-2.5 overflow-x-auto scrollbar-none">
      <button
        onClick={() => onSelect("")}
        className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
          selected === ""
            ? "bg-primary text-primary-foreground shadow-sm"
            : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent"
        }`}
      >
        All
        {selected === "" && (
          isLoading ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <span className="opacity-60">{amount}</span>
          )
        )}
      </button>

      {plugins.map((pl) => (
        <button
          key={pl.name}
          onClick={() => onSelect(selected === pl.name ? "" : pl.name)}
          className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            selected === pl.name
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent"
          }`}
        >
          <img
            src={pl.image}
            alt={pl.name}
            className="h-4 w-4 rounded-sm object-cover"
          />
          {pl.name}
          {selected === pl.name && (
            isLoading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <span className="opacity-60">{amount}</span>
            )
          )}
        </button>
      ))}
    </div>
  );
}
