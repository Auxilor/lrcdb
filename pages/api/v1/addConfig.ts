import { PrismaClient } from "@prisma/client"
import yaml from "js-yaml"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(400).json({
            message: `${req.method} requests are not supported on this route!`
        })
        return
    }

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
}
