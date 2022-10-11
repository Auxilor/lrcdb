import { PrismaClient } from "@prisma/client"
import crypto from "crypto"
import yaml from "js-yaml"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const name = req.body.name
    const plugin = req.body.plugin
    const contents = req.body.contents
    const author = req.body.author || "Unknown Author"
    const isPrivate = req.body.isPrivate || false

    if (name === undefined) {
      res.status(400).json({
        message: "Didn't get a config name!"
      })
      return
    }

    if (name.length > 40) {
      res.status(400).json({
        message: "Name is too long!"
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
              equals: plugin,
              mode: 'insensitive'
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
        plugin: plugin,
        contents: contents,
        author: author,
        isPrivate: isPrivate
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
    let query = getSingle(req.query.query) || ""
    const limit: number = parseInt(getSingle(req.query.limit) || "1000000000") // Jank
    const apiKey = getSingle(req.query.apiKey) || ""

    const showPrivate = (await prisma.apiKey.findFirst({
      where: {
        hash: crypto.createHash('sha256').update(apiKey).digest('hex')
      }
    })) != null

    const configs = await prisma.config.findMany({
      take: limit,
      orderBy: [
        {
          downloads: 'desc'
        },
        {
          views: 'desc'
        }
      ],
      where: {
        plugin: {
          contains: plugin,
          mode: 'insensitive'
        },
        name: {
          contains: query,
          mode: 'insensitive'
        },
        OR: [
          {
            isPrivate: false
          },
          {
            isPrivate: showPrivate
          }
        ]
      }
    })

    res.status(200).json({
      configs: configs
    })
  } else if (req.method === 'PATCH') {
    const id: string = req.body.id
    const views = req.body.views
    const downloads = req.body.downloads

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
        message: `Could not find a config matching ID ${id}!`
      })
      return
    }

    if (views !== undefined) {
      await prisma.config.update({
        where: {
          id: id
        },
        data: {
          views: views
        }
      })
    }

    if (downloads !== undefined) {
      await prisma.config.update({
        where: {
          id: id
        },
        data: {
          downloads: downloads
        }
      })
    }

    res.status(200).json({
      message: `Updated config ID ${id}!`
    })
  } else {
    res.status(400).json({
      message: `${req.method} requests are not supported!`
    })
  }
}
