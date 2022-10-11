import { Switch, TextField, Typography } from "@mui/joy"
import { useState } from "react"

export default function MoreOptions(props) {
    const [shown, setShown] = useState(false)
    const setApiKey = props.setApiKey
    const apiKey = props.apiKey

    return (
        <div>
            <Switch
                checked={shown}
                size="sm"
                endDecorator={
                    <Typography
                        className="text-sm ml-2"
                    >
                        Show more options
                    </Typography>
                }
                onChange={(event) => setShown(event.target.checked)}
            />
            {shown &&
                <TextField
                    placeholder="API key"
                    value={apiKey}
                    onChange={(e) => {
                        setApiKey(e.target.value)
                    }}
                />
            }
        </div>
    )
}
