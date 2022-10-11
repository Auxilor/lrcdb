
import { Button, Option, Select, TextField } from "@mui/joy";
import { plugins } from "../lib/plugins";

export default function SearchPane(props) {
    const plugin = props.plugin
    const setPlugin = props.setPlugin
    const setQuery = props.setQuery
    return (
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
    )
}
