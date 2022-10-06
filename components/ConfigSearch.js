
import { Button, Option, Select, TextField } from "@mui/joy";
import { useEffect, useState } from "react"
import { plugins } from "../lib/plugins"
import ConfigCard from "./ConfigCard"

export default function ConfigSearch(props) {
    const [configs, setConfigs] = useState([])
    const [plugin, setPlugin] = useState("")
    const [query, setQuery] = useState("")

    const updateConfigs = () => {
        fetch(`/api/configs?plugin=${plugin}&query=${query}`)
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
    })

    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-5">
                <div className="col-start-1 p-10">
                    <h1 className="text-center text-7xl font-semibold">lrcdb</h1>
                    <div className="flex flex-col gap-3 self-center py-5">
                        <Select
                            value={plugin}
                            placeholder="Select a plugin..."
                            onChange={(_, pl) => {
                                setPlugin(pl)
                            }}
                        >
                            {plugins.map(pl => {
                                return <Option value={pl.name} key={pl.name}>{pl.name}</Option>
                            })}
                        </Select>

                        <TextField
                            placeholder="Search for a config..."
                            onChange={(e) => {
                                setQuery(e.target.value)
                            }}
                        />
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setPlugin("")
                                setQuery("")
                            }}
                        >
                            Reset
                        </Button>
                    </div>
                </div>
                <div className="col-start-2 col-span-5 p-5 overflow-scroll h-screen bg-slate-100">
                    <div className="grid grid-cols-3">
                        {configs.map(config => {
                            return <ConfigCard config={config} callback={props.callback} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
