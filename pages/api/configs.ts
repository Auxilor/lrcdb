import { Config, PrismaClient } from "@prisma/client"
import yaml from "js-yaml"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const name = req.body.name
    const plugin = req.body.plugin
    const contents = req.body.contents

    if (name === undefined) {
      res.status(400).json({
        message: "Didn't get a config name!"
      })
      return
    }

    if (plugin === undefined) {
      res.status(400).json({
        message: "Didn't get a plugin!"
      })
      return;
    }

    if (contents === undefined) {
      res.status(400).json({
        message: "Didn't get any contents!"
      })
      return;
    }

    try {
      yaml.load(contents)
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
              equals: contents
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
        name: name,
        plugin: plugin.toLowerCase(),
        contents: contents
      }
    })

    res.status(201).json({
      message: `Added ${name} for ${plugin}!`
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

    const plugin = getSingle(req.query.plugin)
    const query = getSingle(req.query.query) || ""
    const limit: number = parseInt(getSingle(req.query.limit) || "50")

    if (plugin === undefined) {
      res.status(400).json({
        message: "You must specify a plugin!"
      })
      return
    }

    let configs: Config[] = []

    if (plugin === undefined || plugin.length === 0) {
      configs = (await prisma.config.findMany({
        take: limit
      })).filter(config => {
        if (query.length === 0) {
          return true
        }

        return config.name.toLowerCase().includes(query.toLowerCase())
      })
    } else {
      configs = (await prisma.config.findMany({
        take: limit,
        where: {
          plugin: {
            equals: plugin.toLowerCase()
          }
        }
      })).filter(config => {
        if (query.length === 0) {
          return true
        }

        return config.name.toLowerCase().includes(query.toLowerCase())
      })
    }

    res.status(200).json({
      configs: configs
    })
  } else {
    res.status(400).json({
      message: `${req.method} requests are not supported!`
    })
  }
}
