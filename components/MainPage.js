
import { Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import ConfigGrid from "./ConfigGrid";
import MoreOptions from "./MoreOptions";
import SearchPane from "./SearchPane";

export default function MainPage(props) {
    const [configs, setConfigs] = useState([])
    const [plugin, setPlugin] = useState("")
    const [query, setQuery] = useState("")
    const [apiKey, setApiKey] = useState("")
    const setConfigPreview = props.setConfigPreview

    const updateConfigs = () => {
        fetch(`/api/v1/getConfigsWithoutContents?plugin=${plugin}&query=${query}&apiKey=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                setConfigs(data.configs)
            })
            .catch(err => {
                console.error(err)
            })
    }

    useEffect(() => {
        updateConfigs()
    }, [plugin, query, apiKey])

    return (
        <div className="md:grid md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7">
            <div className="col-start-1 p-10 flex flex-col place-items-center">
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
                <SearchPane plugin={plugin} setPlugin={setPlugin} setQuery={setQuery} amount={configs.length} />
                <MoreOptions setApiKey={setApiKey} apiKey={apiKey} className="place-self-end" />
            </div>
            <div className="col-start-2 col-span-full p-5 overflow-scroll h-screen bg-slate-100">
                <ConfigGrid configs={configs} setConfigPreview={setConfigPreview} apiKey={apiKey} updateConfigs={updateConfigs} />
            </div>
        </div>
    )
}
