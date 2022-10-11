
import ConfigCard from "./ConfigCard";

export default function ConfigGrid(props) {
    const configs = props.configs
    const setConfigPreview = props.setConfigPreview

    return (
        <div className="grid grid-cols-2 gap-4">
            {configs.map(config => {
                return <ConfigCard config={config} setConfigPreview={setConfigPreview} key={config.id} />
            })}
        </div>
    )
}
