"use client";

import { Loader2 } from "lucide-react";
import { plugins } from "@/lib/plugins";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchPaneProps {
  plugin: string;
  setPlugin: (plugin: string) => void;
  setQuery: (query: string) => void;
  amount: number;
  isLoading: boolean;
}

export function SearchPane({
  plugin,
  setPlugin,
  setQuery,
  amount,
  isLoading,
}: SearchPaneProps) {
  return (
    <div className="flex flex-col gap-3 place-items-center py-5 w-full">
      <Select value={plugin || undefined} onValueChange={setPlugin}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a plugin..." />
        </SelectTrigger>
        <SelectContent>
          {plugins.map((pl) => (
            <SelectItem key={pl.name} value={pl.name}>
              {pl.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        placeholder="Search for a config..."
        onChange={(e) => setQuery(e.target.value)}
        className="w-full"
      />

      <Button
        variant="outline"
        onClick={() => {
          setPlugin("");
          setQuery("");
        }}
        className="w-full"
      >
        Reset Filters
      </Button>

      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <p className="text-xs">Showing {amount} configs</p>
      )}

      <p className="text-red-700 text-xs text-center">
        Configurations here are not officially supported. Download them at
        your own risk.
      </p>
    </div>
  );
}
