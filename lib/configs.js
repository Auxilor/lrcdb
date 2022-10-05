const _configs = []

export const getConfigs = () => {
    return _configs
}

export const addConfig = (config) => {
    if (config in _configs || _configs.some(c => c.config === config.config && c.plugin === config.plugin)) {
        return false
    }

    _configs.push(config)
    return true
}
