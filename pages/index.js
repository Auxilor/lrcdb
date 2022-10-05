import { useEffect, useState } from "react"

export default function Home() {
  const [configs, setConfigs] = useState([])

  const updateConfigs = () => {
    fetch('/api/configs')
      .then((res) => res.json())
      .then((data) => {
        setConfigs(data.configs)
      })
  }

  useEffect(() => {
    updateConfigs()
  }, [])


  return (
    <div>
      <button onClick={updateConfigs}>Refresh</button>
      <ul>
        {
          configs.map(config =>
            <li>
              id: {config.id}
              <br />
              plugin: {config.plugin}
              <br />
              config: {config.config}
            </li>
          )
        }
      </ul>
    </div>
  )
}
