import React, { useCallback, useEffect, useState } from "react";
import ConfigPreview from "../components/ConfigPreview";
import ConfigSearch from "../components/ConfigSearch";

export const ShowingConfigContext = React.createContext(null)


export default function Home() {
  const [showing, setShowing] = useState(null)

  const setConfigPreview = (config) => {
    setShowing(config)
  }

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      setShowing(null)
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  return (
    <div id="container" className="h-screen w-screen overflow-hidden">
      {
        showing != null && <ConfigPreview config={showing} setConfigPreview={setConfigPreview} />
      }
      <ConfigSearch setConfigPreview={setConfigPreview}/>
    </div>
  )
}
