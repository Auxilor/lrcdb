import ConfigCard from "./ConfigCard"

export default function ConfigList(props) {
    return (
        <div className="grid grid-cols-3">
            {props.configs.map(config => {
                return <ConfigCard config={config} callback={props.callback} />
            })}
        </div>
    )
}
