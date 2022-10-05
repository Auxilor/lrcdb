import { useState } from "react"
import ConfigList from "../components/ConfigList";

export default function Home() {
  const [configs, setConfigs] = useState([])

  const updateWithQuery = (query) => {
    fetch(`/api/configs?query=${query}`)
    .then(res => res.json())
      .then(data => {
        setConfigs(data.configs)
      })
  }

  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-col">
        <h1 className="text-center text-7xl">lrcdb</h1>
        <input
          onChange={e => {
            updateWithQuery(e.target.value.toLowerCase())
          }}
          className="outline-2 outline-offset-1 outline rounded"
          placeholder="Search for configs..."
        />
        <ConfigList configs={configs} />
      </div>
    </div>
  )
}
