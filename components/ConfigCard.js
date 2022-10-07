import { Button, Card, Typography } from "@mui/joy";
import { getPluginByName } from "../lib/plugins";
import { FaDownload, FaEye } from "react-icons/fa"

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
                    <div className="flex">
                        <Typography
                            className="text-slate-600 text-sm"
                            startDecorator={<FaDownload className="mr-1" />}
                        >
                            {config.downloads}
                        </Typography>
                        <Typography
                            className="text-slate-600 text-sm"
                            startDecorator={<FaEye className="ml-3" />}
                        >
                            {config.views}
                        </Typography>
                    </div>
                </div>
                <Button
                    variant="outlined"
                    size="md"
                    className="justify-self-end self-center ml-4 mr-1 w-16 px-2 text-l col-span-3"
                    onClick={() => {
                        fetch(`/api/configs`, {
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
                        props.callback(config)
                    }}
                >
                    View .yml
                </Button>
            </div>
        </Card>
    )
}
