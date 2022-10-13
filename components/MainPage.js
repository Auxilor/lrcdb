
import { Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import ConfigGrid from "./ConfigGrid";
import MoreOptions from "./MoreOptions";
import SearchPane from "./SearchPane";
import { FaSpinner } from "react-icons/fa";

export default function MainPage(props) {
    const [isLoading, setLoading] = useState(false)
    const [configs, setConfigs] = useState([])
    const [plugin, setPlugin] = useState("")
    const [query, setQuery] = useState("")
    const [apiKey, setApiKey] = useState("")
    const setConfigPreview = props.setConfigPreview

    const updateConfigs = () => {
        setLoading(true)
        fetch(`/api/v1/getConfigsWithoutContents?plugin=${plugin}&query=${query}&apiKey=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                setConfigs(data.configs)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
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

                <SearchPane plugin={plugin} setPlugin={setPlugin} setQuery={setQuery} amount={configs.length} isLoading={isLoading} />
                <MoreOptions setApiKey={setApiKey} apiKey={apiKey} className="place-self-end" />

                <a
                href="https://gamersupps.gg/discount/Auxilor?afmc=Auxilor"
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
            <div className="col-start-2 col-span-full p-5 overflow-scroll h-screen bg-slate-100">
                <ConfigGrid
                    configs={configs}
                    setConfigPreview={setConfigPreview}
                    apiKey={apiKey}
                    updateConfigs={updateConfigs}
                />
            </div>
        </div>
    )
}
