import React, {useCallback, useEffect, useState} from "react";
import ConfigPreview from "../components/ConfigPreview";
import MainPage from "../components/MainPage";

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
      <title>lrcdb</title>

      {
        showing != null && <ConfigPreview config={showing} setConfigPreview={setConfigPreview}/>
      }
      <MainPage setConfigPreview={setConfigPreview}/>
    </div>
  )
}
