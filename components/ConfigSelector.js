import { React, useState } from 'react'
import { Config } from '@prisma/client'
import { Option, Select } from '@mui/joy';

export default function ConfigSelector(props) {
    const configs = {}
    props.configs.forEach(element => {
        configs[element.id] = element
    });

    const undefinedConfig = {
        id: "<none>",
        config: ""
    }

    const [currentConfig, setCurrentConfig] = useState(undefinedConfig);

    const getCurrentConfig = () => {
        return currentConfig || undefinedConfig
    }

    return (
        <div id="config-selection">
            <Select
                placeholder="Select a config..."
                onChange={event => {
                    setCurrentConfig(configs[event.target.value])
                }}
                className="mb-2   "
            >
                {
                    props.configs.map(config => {
                        return <Option value={config.id}>
                            {config.id}.yml
                        </Option>
                    })
                }
            </Select>
            <p className='font-mono bg-slate-200 p-4'>
                {getCurrentConfig().config}
            </p>
        </div>
    )
}
