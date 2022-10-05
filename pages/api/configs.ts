import { NextApiRequest, NextApiResponse } from "next"
import yaml from "js-yaml"
import { Config, PrismaClient } from "@prisma/client"
import { parseQuery } from "../../lib/queries"

const prisma = new PrismaClient()


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const id = req.body.id
    const plugin = req.body.plugin
    const config = req.body.config

    if (id === undefined) {
      res.status(400).json({
        message: "Didn't get a config ID!"
      })
      return
    }

    if (plugin === undefined) {
      res.status(400).json({
        message: "Didn't get a plugin!"
      })
      return;
    }

    if (config === undefined) {
      res.status(400).json({
        message: "Didn't get a config!"
      })
      return;
    }

    try {
      yaml.load(config)
    } catch (e) {
      res.status(400).json({
        message: "Invalid config!"
      })
      return
    }

    const existing = await prisma.config.findFirst({
      where: {
        AND: [
          {
            contents: {
              equals: config
            }
          },
          {
            plugin: {
              equals: plugin.toLowerCase()
            }
          }
        ]
      }
    })

    const exists = existing != null

    if (exists) {
      res.status(400).json({
        message: `Identical config already exists!`
      })
      return
    }

    await prisma.config.create({
      data: {
        name: id,
        plugin: plugin.toLowerCase(),
        contents: config
      }
    })

    res.status(201).json({
      message: `Added ${id} for ${plugin}!`
    })
  } else if (req.method === 'GET') {
    const getSingle = (param: string | string[] | undefined): string | undefined => {
      if (param === undefined) {
        return param
      }

      if (typeof param === 'string') {
        return param
      }

      return (param as string[]).pop()
    }

    const plugin: string = getSingle(req.query.plugin) || ""
    const query = getSingle(req.query.query) || null
    const limit: number = parseInt(getSingle(req.query.limit) || "50")

    const configs: Config[] = []

    if (query != null) {
      configs.push(
        ...(await parseQuery(query))
      )
    } else if (plugin.length >= 1) {
      configs.push(
        ...(await prisma.config.findMany({
          take: limit,
          where: {
            plugin: {
              equals: plugin
            }
          }
        }))
      )
    } else {
      configs.push(
        ...(await prisma.config.findMany({}))
      )
    }


    res.status(200).json({
      configs: configs.map(config => {
        return {
          id: config.name,
          plugin: config.plugin,
          config: config.contents
        }
      })
    })
  } else {
    res.status(400).json({
      message: `${req.method} requests are not supported!`
    })
  }
}
