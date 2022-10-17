import { Button, Card, Typography } from "@mui/joy";
import { useState } from "react";
import { FaDownload, FaEye, FaSpinner } from "react-icons/fa";
import { getPluginByName } from "../lib/plugins";
import AdminCardOptions from "./AdminCardOptions"

export default function ConfigCard(props) {
    const [loadingPreview, setLoadingPreview] = useState(false)

    const config = props.config
    const plugin = getPluginByName(config.plugin)
    const apiKey = props.apiKey
    const authorized = props.authorized
    const setConfigPreview = props.setConfigPreview
    const updateConfigs = props.updateConfigs

    return (
        <Card variant="outlined transition ease-in-out hover:-translate-y-1 hover:shadow-lg">
            <div className="flex flex-row gap-4">
                <img src={plugin.image} className="h-0 w-0 md:h-16 md:w-16 col-span-3" />
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
                            className="text-slate-600 text-sm"
                        >
                            by {config.author}
                        </Typography>
                    </div>
                </div>
                <div className="flex flex-row gap-4 ml-auto">
                    <div className="flex flex-col place-content-center items-end">
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

                    {
                        authorized && <AdminCardOptions
                            updateConfigs={updateConfigs}
                            apiKey={apiKey}
                            config={config}
                        />
                    }

                    <Button
                        variant="outlined"
                        size="md"
                        className="self-center text-l"
                        onClick={() => {
                            setLoadingPreview(true)

                            fetch(`/api/v1/getConfigByID?id=${config.id}`)
                                .then(res => res.json())
                                .then(data => {
                                    setConfigPreview(data.config)
                                })
                                .catch(err => {
                                    console.error(err)
                                })
                                .finally(() => setLoadingPreview(false))
                        }}
                    >
                        {loadingPreview ? <FaSpinner className="animate-spin" /> : "Preview"}
                    </Button>
                </div>
            </div>
        </Card>
    )
}
