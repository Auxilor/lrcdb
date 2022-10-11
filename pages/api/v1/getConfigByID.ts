import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
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

    res.status(200).json({
      ...config
    })
  } else {
    res.status(400).json({
      message: `${req.method} requests are not supported!`
    })
  }
}