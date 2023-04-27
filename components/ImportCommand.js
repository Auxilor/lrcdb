import { Button, Card, Typography } from "@mui/joy"
import { useState } from "react"

export default function ImportCommand(props) {
    const config = props.config
    const close = props.close
    const command = `/lrcdb import ${config.id}`
    const [copied, setCopied] = useState(false)

    return (
        <Card className="w-1/2 grid grid-rows-2 gap-2">
            <div className="grid grid-cols-6 gap-4">
                <Typography className="text-2xl col-start-1 col-span-4">
                    Run this command:
                </Typography>
                <Button
                    variant="outlined"
                    color={copied ? "success" : undefined}
                    onClick={() => {
                        navigator.clipboard.writeText(command)
                        setCopied(true)
                        setTimeout(() => setCopied(false), 5000)
                    }}
                >
                    {copied ? "Copied!" : "Copy"}
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => {
                        close()
                    }}
                >
                    Close
                </Button>
            </div>
            <Typography
                className="bg-slate-200 p-2 rounded-lg h-full font-mono text-md"
            >
                {command}
            </Typography>
        </Card>
    )
}
