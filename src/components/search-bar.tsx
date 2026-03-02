"use client";

import { useRef } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative flex-1 max-w-md group">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search configs..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full h-9 rounded-lg border border-border bg-card pl-9 pr-9 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary/40 transition-all"
      />
      <button
        type="button"
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.value = "";
            onSearch("");
          }
        }}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors opacity-0 group-focus-within:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
