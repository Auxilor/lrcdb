import {Button} from "@mui/joy"
import {useState} from "react"
import {FaShare, FaSpinner, FaTrash} from "react-icons/fa"

export default function AdminOptions(props) {
  const [deleting, setDeleting] = useState(false)
  const [publicizing, setPublicizing] = useState(false)

  const config = props.config
  const apiKey = props.apiKey
  const updateConfigs = props.updateConfigs

  return (
    <div className="self-center flex flex-row gap-4">
      {config.isPrivate &&
        <Button
          variant="outlined"
          size="md"
          className="text-l"
          color="success"
          onClick={() => {
            setPublicizing(true)

            fetch(`/api/v1/publicizeConfig`, {
              method: 'PATCH',
              body: JSON.stringify({
                apiKey: apiKey,
                id: config.id
              }),
              headers: {
                "Content-Type": "application/json"
              }
            })
              .then(() => updateConfigs())
              .catch(err => console.error(err))
              .finally(() => setPublicizing(false))
          }}
        >
          {publicizing ? <FaSpinner className="animate-spin"/> : <FaShare/>}
        </Button>
      }

      <Button
        variant="outlined"
        size="md"
        className="text-l"
        color="danger"
        onClick={() => {
          setDeleting(true)

          fetch(`/api/v1/deleteConfig`, {
            method: 'DELETE',
            body: JSON.stringify({
              apiKey: apiKey,
              id: config.id
            }),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(() => updateConfigs())
            .catch(err => {
              console.error(err)
            })
            .finally(() => setDeleting(false))
        }}
      >
        {deleting ? <FaSpinner className="animate-spin"/> : <FaTrash/>}
      </Button>
    </div>
  )
}
