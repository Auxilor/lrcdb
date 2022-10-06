
import { Option, Select, TextField } from "@mui/joy";
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
            <div className="flex flex-col">
                <h1 className="text-center text-7xl font-semibold">lrcdb</h1>
                <div className="flex flex-col gap-3 self-center py-5">
                    <Select
                        placeholder="Select a plugin..."
                        onChange={(_, pl) => {
                            setPlugin(pl)
                        }}
                    >
                        {plugins.map(pl => {
                            return <Option value={pl.name}>{pl.name}</Option>
                        })}
                    </Select>

                    <TextField
                        placeholder="Search for a config..."
                        onChange={(e) => {
                            setQuery(e.target.value)
                        }}
                    >

                    </TextField>
                </div>

                <div className="grid grid-cols-3 grid-rows-5 gap-8">
                    {configs.map(config => {
                        return <ConfigCard config={config} callback={props.callback} />
                    })}
                </div>
            </div>
        </div>
    )
}
