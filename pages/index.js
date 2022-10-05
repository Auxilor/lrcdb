
import { useEffect, useState } from "react"
import ConfigCard from "../components/ConfigCard";



export default function Home() {
  const [configs, setConfigs] = useState([])
  const [query, setQuery] = useState("")
  const [plugin, setPlugin] = useState("")

  const updateConfigs = () => {
    fetch(`/api/configs?plugin=${plugin}&query=${query}`)
      .then(res => res.json())
      .then(data => {
        setConfigs(data.configs)
      })
  }

  useEffect(() => {
    updateConfigs()
  })

  /*
  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-col">
        <h1 className="text-center text-7xl font-semibold">lrcdb</h1>
        <Select
          placeholder="Select a plugin..."
          onChange={event => {
            setPlugin(event.target.value)
          }}
          className="mb-2   "
        >
          {
            plugins.map(pl => <Option value={pl}>{pl}</Option>)
          }
        </Select>
        <input
          onChange={e => {
            setQuery(e.target.value)
          }}
          className="outline-2 outline-offset-1 outline rounded mb-1"
          placeholder="Search for configs..."
        />
        <ConfigSelector configs={configs} />
      </div>
    </div>
  )
  */
  return (
    <>
      <ConfigCard config={{
        name: "excavation",
        plugin: "EcoEnchants",
        contents: "some yaml data"
      }} />
    </>
  )
}
