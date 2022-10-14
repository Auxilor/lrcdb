import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../lib/db"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(400).json({
      message: `${req.method} requests are not supported on this route!`
    })
    return
  }

  const getSingle = (param: string | string[] | undefined): string | undefined => {
    if (param === undefined) {
      return param
    }

    if (typeof param === 'string') {
      return param
    }

    return (param as string[]).pop()
  }

  const id = getSingle(req.query.id)
  const isDownload = getSingle(req.query.isDownload) || false

  if (id === undefined) {
    res.status(400).json({
      message: "You must specify a config ID!"
    })
    return
  }

  const config = await prisma.config.findFirst({
    where: {
      id: id
    }
  })

  if (config == null) {
    res.status(400).json({
      message: "Could not find config!"
    })
    return
  }

  const dlIncrement = isDownload ? 1 : 0

  await prisma.config.update({
    where: {
      id: id
    },
    data: {
      views: config.views + 1,
      downloads: config.downloads + dlIncrement
    }
  })

  res.status(200).json({
    config: config
  })
}
