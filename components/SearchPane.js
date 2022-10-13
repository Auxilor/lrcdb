import { Button, Option, Select, TextField, Typography } from "@mui/joy";
import { FaSpinner } from "react-icons/fa";
import { plugins } from "../lib/plugins";

export default function SearchPane(props) {
    const plugin = props.plugin
    const setPlugin = props.setPlugin
    const setQuery = props.setQuery
    const amount = props.amount
    const isLoading = props.isLoading

    return (
        <div className="flex flex-col gap-3 place-items-center py-5">
            <Select
                value={plugin}
                placeholder="Select a plugin..."
                onChange={(_, pl) => {
                    setPlugin(pl)
                }}
                className="w-full"
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
                className="w-full"
            />
            <Button
                variant="outlined"
                onClick={() => {
                    setPlugin("")
                    setQuery("")
                }}
                className="w-full"
            >
                Reset Filters
            </Button>

            {isLoading ?
                <FaSpinner className="animate-spin" /> :
                <Typography
                    className="text-xs"
                >
                    Showing {amount} configs
                </Typography>}

            <Typography
                className="text-red-700 text-xs text-center"
            >
                Configurations here are not officially supported.
                Download them at your own risk.
            </Typography>

        </div>
    )
}
