import { Button, Card, Typography } from "@mui/joy";

export default function ConfigPreview(props) {
    const downloadConfig = () => {
        console.log("test")
        const element = document.createElement("dl");
        const file = new Blob(["test"], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${props.config.name}.yml`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    return (
        <div className="absolute z-10 bg-slate-400/20">
            <div className="flex place-content-center place-items-center w-screen h-screen">
                <Card className="w-4/12 h-1/2">
                    <Typography className="bg-slate-200 p-4 rounded-lg h-full">
                        {props.config.contents}
                    </Typography>
                    <div className='grid grid-cols-6 grid-rows-1'>
                        <Button
                            variant="outlined"
                            onClick={downloadConfig}
                            className="col-start-1 col-span-2 mt-3"
                            href={`https://paste.willfp.com/raw/${props.config.token}`}
                        >
                            Download
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                props.callback(null)
                            }}
                            className="col-start-6 mt-3"
                        >
                            Close
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}
