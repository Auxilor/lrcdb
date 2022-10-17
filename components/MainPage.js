
import { Button, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import ConfigGrid from "./ConfigGrid";
import MoreOptions from "./MoreOptions";
import SearchPane from "./SearchPane";

const PAGE_SIZE = 50

export default function MainPage(props) {
    const [isLoading, setLoading] = useState(false)
    const [configs, setConfigs] = useState([])
    const [amount, setAmount] = useState(0)
    const [plugin, setPlugin] = useState("")
    const [query, setQuery] = useState("")
    const [apiKey, setApiKey] = useState("")
    const [page, setPage] = useState(1)
    const [isShowingAll, setShowingAll] = useState(false)
    const setConfigPreview = props.setConfigPreview

    const updateConfigs = () => {
        setLoading(true)
        fetch(`/api/v1/getConfigsWithoutContents?plugin=${plugin}&query=${query}&apiKey=${apiKey}&limit=${PAGE_SIZE * page}`).then(res => res.json())
            .then(data => setConfigs(data.configs))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))

        fetch(`/api/v1/countConfigs?plugin=${plugin}&query=${query}&apiKey=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                setAmount(data.amount)
                setShowingAll(amount < PAGE_SIZE * (page - 1))
            })
            .catch(err => console.error(err))
    }

    const loadMore = () => {
        setPage(page + 1)
        updateConfigs()
    }

    useEffect(() => {
        updateConfigs()
    }, [plugin, query, apiKey, page])

    useEffect(() => {
        setPage(1)
    }, [plugin, query, apiKey])

    return (
        <div className="md:grid md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7 overflow-scroll md:overflow-hidden">
            <div className="md:col-start-1 p-10 flex flex-col place-items-center">
                <Typography
                    className="text-center text-7xl font-sans"
                >
                    lrcdb
                </Typography>
                <Typography
                    className="text-center text-md font-sans"
                >
                    libreforge config database
                </Typography>

                <SearchPane plugin={plugin} setPlugin={setPlugin} setQuery={setQuery} amount={amount} isLoading={isLoading} />
                <MoreOptions setApiKey={setApiKey} apiKey={apiKey} className="place-self-end" />

                <a
                    href="https://gamersupps.gg/Auxilor"
                    target="_blank"
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
                    setConfigPreview={setConfigPreview}
                    apiKey={apiKey}
                    updateConfigs={updateConfigs}
                    loadMore={loadMore}
                    isShowingAll={isShowingAll}
                />
            </div>
        </div>
    )
}
