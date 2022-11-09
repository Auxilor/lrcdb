import yaml from "js-yaml"
import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../lib/db"

// Will prevent identically named configs existing for the same plugin
const IS_STRICT_DUPE_CHECKING = true

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

    if (name.length > 40 || name.includes(" ")) {
        res.status(400).json({
            message: "Invalid config name! (Too long, contains spaces)"
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
        const loaded: any = yaml.load(contents) // js-yaml doesn't have typing
        if (loaded.effects === undefined || loaded.conditions === undefined) {
            throw new Error('Missing effects/conditions!')
        }
    } catch (e) {
        res.status(400).json({
            message: "Invalid config!"
        })
        return
    }

    if (IS_STRICT_DUPE_CHECKING) {
        const existing = await prisma.config.findFirst({
            where: {
                name: {
                    equals: name
                },
                plugin: {
                    equals: plugin,
                    mode: 'insensitive'
                }
            }
        })

        if (existing != null) {
            const isExistingPrivate = existing.isPrivate
            const isNewPrivate = isPrivate

            if (!isNewPrivate && isExistingPrivate) {
                await prisma.config.delete({
                    where: {
                        id: existing.id
                    }
                })
            } else {
                res.status(400).json({
                    message: `Config with identical name already exists for plugin!`
                })

                // Perform cleanup on the database
                await prisma.config.deleteMany({
                    where: {
                        name: {
                            equals: name
                        },
                        plugin: {
                            equals: plugin,
                            mode: 'insensitive'
                        }
                    }
                })

                const data = { ...existing }
                data.isPrivate = false

                await prisma.config.create({
                    data: data
                })

                return
            }
        }
    }

    const existing = await prisma.config.findFirst({
        where: {
            contents: {
                equals: contents
            },
            plugin: {
                equals: plugin,
                mode: 'insensitive'
            }
        }
    })

    if (existing != null) {
        const isExistingPrivate = existing.isPrivate
        const isNewPrivate = isPrivate

        if (!isNewPrivate && isExistingPrivate) {
            await prisma.config.delete({
                where: {
                    id: existing.id
                }
            })
        } else {
            res.status(400).json({
                message: `Identical config already exists!`
            })
            return
        }
    }

    const config = await prisma.config.create({
        data: {
            name: name,
            plugin: plugin,
            contents: contents,
            author: author,
            isPrivate: isPrivate
        }
    })

    res.status(201).json({
        message: `Added ${name} for ${plugin}!`,
        id: config.id
    })
}
