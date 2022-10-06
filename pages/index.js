import React, { useState } from "react";
import ConfigPreview from "../components/ConfigPreview";
import ConfigSearch from "../components/ConfigSearch";

export const ShowingConfigContext = React.createContext(null)


export default function Home() {
  const [showing, setShowing] = useState(null)

  const callback = (config) => {
    setShowing(config)
  }

  return (
    <div id="container" className="h-screen w-screen">
      {
        showing != null && <ConfigPreview config={showing} callback={callback} />
      }
      <ConfigSearch callback={callback} />
    </div>
  )
}
