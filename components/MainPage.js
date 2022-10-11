
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
        fetch(`/api/v1/configs?plugin=${plugin}&query=${query}&apiKey=${apiKey}`)
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
        <div className="grid grid-cols-5">
            <div className="col-start-1 p-10">
                <h1 className="text-center text-7xl font-semibold">lrcdb</h1>
                <SearchPane plugin={plugin} setPlugin={setPlugin} setQuery={setQuery} />
                <MoreOptions setApiKey={setApiKey} apiKey={apiKey} className="place-self-end" />
            </div>
            <div className="col-start-2 col-span-5 p-5 overflow-scroll h-screen bg-slate-100">
                <ConfigGrid configs={configs} setConfigPreview={setConfigPreview} />
            </div>
        </div>
    )
}
