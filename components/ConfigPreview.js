import { Button, Card, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import ImportCommand from "./ImportCommand";

export default function ConfigPreview(props) {
    const config = props.config
    const [downloadLink, setDownloadLink] = useState('')
    const [shownCommand, setShownCommand] = useState(null)

    const close = () => {
        setShownCommand(null)
    }

    const createDownloadable = () => {
        const data = new Blob([props.config.contents], { type: 'text/yml' })

        // anti mem leak, supposedly
        if (downloadLink !== '') {
            window.URL.revokeObjectURL(downloadLink)
        }

        setDownloadLink(window.URL.createObjectURL(data))
    }

    useEffect(() => {
        createDownloadable()
    }, [props.config])

    return (
        <div
            className="absolute z-10 bg-slate-400/20"
        >
            <div className="flex place-content-center place-items-center w-screen h-screen">
                {
                    shownCommand != null && <ImportCommand config={config} close={close} />
                }
                {
                    shownCommand == null &&
                    <Card className="w-11/12 md:w-1/2 h-5/6" id='preview-card'>
                        <div className="flex mb-3">
                            <Typography className="text-xl">
                                {config.name}
                            </Typography>
                            <Typography className="text-slate-400 text-xl">
                                .yml
                            </Typography>
                        </div>
                        <SyntaxHighlighter language="yaml" className="bg-slate-200 p-4 rounded-lg h-full font-mono text-xs overflow-scroll">
                            {config.contents}
                        </SyntaxHighlighter>
                        <div className='grid grid-cols-3 grid-rows-1 mt-3 gap-4'>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setShownCommand(config)
                                }}
                                className="col-start-1"
                            >
                                Add to your server
                            </Button>
                            <a
                                download={`${config.name}.yml`}
                                href={downloadLink}
                                onClick={() => {
                                    fetch(`/api/v1/getConfigByID?id=${config.id}&isDownload=true`)
                                        .catch(err => console.error(err))
                                }}
                                className="col-start-2"
                            >
                                <Button
                                    variant="outlined"
                                    className="w-full"
                                >
                                    Download .yml file
                                </Button>
                            </a>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    props.setConfigPreview(null)
                                }}
                                className="col-start-3"
                            >
                                Close
                            </Button>
                        </div>
                    </Card>
                }
            </div>
        </div>
    )
}
