import { NextApiRequest, NextApiResponse } from "next"
import yaml from "js-yaml"
import { Config, PrismaClient } from "@prisma/client"

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
    const plugin: string = req.body.plugin
    const limit = req.body.limit || 50

    let configs: Array<Config> = []

    if (plugin === undefined) {
      configs = await prisma.config.findMany({
        take: limit
      })
    } else {
      configs = await prisma.config.findMany({
        take: limit,
        where: {
          plugin: {
            equals: plugin.toLowerCase()
          }
        }
      })
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
