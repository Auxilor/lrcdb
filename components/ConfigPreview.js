import { Button, Card, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter"

export default function ConfigPreview(props) {
    const [downloadLink, setDownloadLink] = useState('')

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
        <div className="absolute z-10 bg-slate-400/20">
            <div className="flex place-content-center place-items-center w-screen h-screen">
                <Card className="w-4/12 h-1/2">
                    <SyntaxHighlighter language="yaml" className="bg-slate-200 p-8 rounded-lg h-full font-mono text-xs overflow-scroll">
                        {props.config.contents}
                    </SyntaxHighlighter>
                    <div className='grid grid-cols-6 grid-rows-1 mt-3'>
                        <a
                            download={`${props.config.name}.yml`}
                            href={downloadLink}
                            className="col-start-1 col-span-2"
                        >
                            <Button
                                variant="outlined"
                                className="w-full"
                            >
                                Download
                            </Button>
                        </a>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                props.callback(null)
                            }}
                            className="col-start-6"
                        >
                            Close
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}
