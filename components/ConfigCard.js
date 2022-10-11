import { Button, Card, Typography } from "@mui/joy";
import { getPluginByName } from "../lib/plugins";
import { FaDownload, FaEye } from "react-icons/fa"

export default function ConfigCard(props) {
    const config = props.config
    const plugin = getPluginByName(config.plugin)

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
                            className="text-slate-600 text-sm"
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
                    <Button
                        variant="outlined"
                        size="md"
                        className="self-center text-l"
                        onClick={() => {
                            fetch(`/api/v1/configs`, {
                                method: 'PATCH',
                                body: JSON.stringify({
                                    id: config.id,
                                    views: config.views + 1
                                }),
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }).then(res => res.json())
                                .catch(err => {
                                    console.error(err)
                                })
                            props.setConfigPreview(config)
                        }}
                    >
                        Preview
                    </Button>
                </div>
            </div>
        </Card>
    )
}
