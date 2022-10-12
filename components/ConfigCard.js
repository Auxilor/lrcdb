import { Button, Card, Typography } from "@mui/joy";
import { getPluginByName } from "../lib/plugins";
import { FaDownload, FaEye, FaTrash } from "react-icons/fa"
import { useEffect, useState } from "react";

export default function ConfigCard(props) {
    const [authorized, setAuthorized] = useState(false)

    const config = props.config
    const plugin = getPluginByName(config.plugin)
    const apiKey = props.apiKey
    const setConfigPreview = props.setConfigPreview
    const updateConfigs = props.updateConfigs

    useEffect(() => {
        fetch(`/api/v1/getAuthorizationLevel?apiKey=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                setAuthorized(data.level > 0)
            })
            .catch(err => console.error(err))
    }, [apiKey])

    return (
        <Card variant="outlined">
            <div className="flex flex-row gap-4">
                <img src={plugin.image} className="h-16 w-16 col-span-3" />
                <div className="flex flex-col place-content-center mb-1 col-span-7 overflow-hidden">
                    <div className="flex">
                        <Typography className="text-xl">
                            {config.name}
                        </Typography>
                        <Typography className="text-slate-400 text-xl">
                            .yml
                        </Typography>
                    </div>
                    <div className="flex gap-2">
                        <Typography
                            className="text-slate-600 text-s"
                        >
                            by {config.author}
                        </Typography>
                    </div>
                </div>
                <div className="flex flex-row gap-4 ml-auto">
                    <div className="flex flex-col place-content-center">
                        <Typography
                            className="text-slate-600 text-sm"
                            endDecorator={<FaEye />}
                        >
                            {config.views}
                        </Typography>
                        <Typography
                            className="text-slate-600 text-sm"
                            endDecorator={<FaDownload />}
                        >
                            {config.downloads}
                        </Typography>
                    </div>
                    {authorized &&
                        <Button
                            variant="outlined"
                            size="md"
                            className="self-center text-l"
                            color="danger"
                            onClick={() => {
                                fetch(`/api/v1/deleteConfig`, {
                                    method: 'DELETE',
                                    body: JSON.stringify({
                                        apiKey: apiKey,
                                        id: config.id
                                    }),
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                }).then(() => updateConfigs())
                                    .catch(err => {
                                        console.error(err)
                                    })
                            }}
                        >
                            <FaTrash />
                        </Button>
                    }
                    <Button
                        variant="outlined"
                        size="md"
                        className="self-center text-l"
                        onClick={() => {
                            fetch(`/api/v1/getConfigByID?id=${config.id}`)
                                .then(res => res.json())
                                .then(data => {
                                    setConfigPreview(data.config)
                                })
                                .catch(err => {
                                    console.error(err)
                                })
                        }}
                    >
                        Preview
                    </Button>
                </div>
            </div>
        </Card>
    )
}
