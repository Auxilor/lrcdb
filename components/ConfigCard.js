import { Button, Card, Option, Select, Typography } from "@mui/joy";
import Image from "next/image";
import { getPluginByName } from "../lib/plugins";

export default function ConfigCard(props) {
    const config = props.config
    const plugin = getPluginByName(config.plugin)

    return (
        <Card variant="outlined" sx={{ width: 320 }}>
            <div className="flex">
                <img src={plugin.image} className="h-12 w-12 mr-4" />
                <div className="align-middle">
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
                    className="place-self-end ml-4 w-16 px-2 text-l"
                >
                    View .yml
                </Button>
            </div>
        </Card>
    )
}
