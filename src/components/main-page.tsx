"use client";

import { useCallback, useEffect, useState } from "react";
import type { Config, ConfigWithoutContents } from "@/lib/types";
import { SearchPane } from "./search-pane";
import { ConfigGrid } from "./config-grid";
import { MoreOptions } from "./more-options";
import { ConfigPreview } from "./config-preview";

const PAGE_SIZE = 50;

export function MainPage() {
  const [configs, setConfigs] = useState<ConfigWithoutContents[]>([]);
  const [amount, setAmount] = useState(0);
  const [plugin, setPlugin] = useState("");
  const [query, setQuery] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [page, setPage] = useState(1);
  const [isShowingAll, setIsShowingAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [showing, setShowing] = useState<Config | null>(null);

  const updateConfigs = useCallback(() => {
    setIsLoading(true);
    fetch(
      `/api/v2/configs?plugin=${plugin}&query=${query}&apiKey=${apiKey}&limit=${PAGE_SIZE * page}`
    )
      .then((res) => res.json())
      .then((data) => setConfigs(data.configs))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));

    fetch(
      `/api/v2/configs/count?plugin=${plugin}&query=${query}&apiKey=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAmount(data.amount);
        if (data.amount === 0) {
          setIsShowingAll(true);
        } else {
          setIsShowingAll(data.amount < PAGE_SIZE * (page - 1));
        }
      })
      .catch((err) => console.error(err));
  }, [plugin, query, apiKey, page]);

  const loadMore = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  useEffect(() => {
    fetch(`/api/v2/auth/level?apiKey=${apiKey}`)
      .then((res) => res.json())
      .then((data) => setAuthorized(data.level > 0))
      .catch((err) => console.error(err));
  }, [apiKey]);

  useEffect(() => {
    updateConfigs();
  }, [updateConfigs]);

  useEffect(() => {
    setPage(1);
  }, [plugin, query, apiKey]);

  const escFunction = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setShowing(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => document.removeEventListener("keydown", escFunction, false);
  }, [escFunction]);

  return (
    <>
      {showing && (
        <ConfigPreview
          config={showing}
          setConfigPreview={setShowing}
        />
      )}
      <div className="md:grid md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7 overflow-scroll md:overflow-hidden">
        <div className="md:col-start-1 p-10 flex flex-col place-items-center">
          <h1 className="text-center text-7xl font-sans">lrcdb</h1>
          <p className="text-center text-md font-sans">
            libreforge config database
          </p>

          <SearchPane
            plugin={plugin}
            setPlugin={setPlugin}
            setQuery={setQuery}
            amount={amount}
            isLoading={isLoading}
          />

          <MoreOptions setApiKey={setApiKey} apiKey={apiKey} />

          <a
            href="https://gamersupps.gg/Auxilor"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4"
          >
            <img
              src="https://i.imgur.com/7mFhlQO.png"
              alt="GamerSupps, Code Auxilor"
              className="rounded-xl w-full"
            />
          </a>
        </div>
        <div className="md:col-start-2 md:col-span-full p-5 md:overflow-scroll h-screen bg-slate-100">
          <ConfigGrid
            configs={configs}
            setConfigPreview={setShowing}
            apiKey={apiKey}
            updateConfigs={updateConfigs}
            loadMore={loadMore}
            isShowingAll={isShowingAll}
            authorized={authorized}
          />
        </div>
      </div>
    </>
  );
}
