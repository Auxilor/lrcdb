
import { Button } from "@mui/joy";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import ConfigCard from "./ConfigCard";

export default function ConfigGrid(props) {
    const configs = props.configs
    const apiKey = props.apiKey
    const updateConfigs = props.updateConfigs
    const setConfigPreview = props.setConfigPreview
    const loadMore = props.loadMore
    const isShowingAll = props.isShowingAll

    const { ref, inView } = useInView()

    useEffect(() => {
        loadMore()
    }, [inView])

    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        fetch(`/api/v1/getAuthorizationLevel?apiKey=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                setAuthorized(data.level > 0)
            })
            .catch(err => console.error(err))
    }, [apiKey])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
            {configs.map(config => {
                return <ConfigCard
                    config={config}
                    setConfigPreview={setConfigPreview}
                    key={config.id}
                    apiKey={apiKey}
                    updateConfigs={updateConfigs}
                    authorized={authorized}
                />
            })}

            {
                !isShowingAll &&
                <div
                    ref={ref}   
                    className="place-self-center animate-spin"
                >
                    <FaSpinner />
                </div>
            }
        </div>
    )
}
