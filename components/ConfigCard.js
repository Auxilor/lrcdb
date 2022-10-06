import { Button, Card, Typography } from "@mui/joy";
import { useState } from "react";
import { callbackify } from "util";
import { getPluginByName } from "../lib/plugins";

export default function ConfigCard(props) {
    const config = props.config
    const plugin = getPluginByName(config.plugin)

    return (
        <Card variant="outlined" className="mr-4 mb-4">
            <div className="grid grid-flow-col grid-cols-8">
                <img src={plugin.image} className="h-16 w-16 mr-4 col-span-3" />
                <div className="flex flex-col place-content-center mb-1 col-span-7">
                    <div className="flex">
                        <Typography className="text-xl">
                            {config.name}
                        </Typography>
                        <Typography className="text-slate-400 text-xl">
                            .yml
                        </Typography>
                    </div>
                    <Typography className="text-slate-600 text-sm">
                        {plugin.name}
                    </Typography>
                </div>
                <Button
                    variant="outlined"
                    size="md"
                    className="justify-self-end self-center ml-4 mr-1 w-16 px-2 text-l col-span-3"
                    onClick={() => {
                        props.callback(config)
                    }}
                >
                    View .yml
                </Button>
            </div>
        </Card>
    )
}
