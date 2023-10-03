import {Card} from "@mui/joy";
import {useEffect} from "react";
import {FaSpinner} from "react-icons/fa";
import {useInView} from "react-intersection-observer";
import ConfigCard from "./ConfigCard";

export default function ConfigGrid(props) {
  const configs = props.configs
  const apiKey = props.apiKey
  const updateConfigs = props.updateConfigs
  const setConfigPreview = props.setConfigPreview
  const loadMore = props.loadMore
  const isShowingAll = props.isShowingAll
  const authorized = props.authorized

  const {ref, inView} = useInView()

  useEffect(() => {
    loadMore()
  }, [inView])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      {configs.map(config => {
        return <ConfigCard
          config={config}
          setConfigPreview={setConfigPreview}
          key={config.id}
          apiKey={apiKey}
          updateConfigs={updateConfigs}
          authorized={authorized}
        />
      })}

      {
        !isShowingAll &&
        <div
          ref={ref}
          className="place-self-center"
        >
          <Card variant="outlined">
            <FaSpinner className="animate-spin"/>
          </Card>
        </div>
      }
    </div>
  )
}
