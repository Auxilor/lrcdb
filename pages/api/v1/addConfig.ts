import yaml from "js-yaml"
import {NextApiRequest, NextApiResponse} from "next"
import {prisma} from "../../../lib/db"

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
    const plugin: string = req.body.plugin
    const contents = req.body.contents
    const author = req.body.author || "Unknown Author"
    const isPrivate = req.body.isPrivate || false
    const category = req.body.category || null

    if (name === undefined) {
        res.status(400).json({
            message: "Didn't get a config name!"
        })
        return
    }

    if (name.length > 40) {
        res.status(400).json({
            message: "Invalid config name! (Too long)"
        })
        return
    }

    if (!/[a-z0-9_]+/.test(name)) {
        res.status(400).json({
            message: "Invalid config name! (Must be a-z, 9-0, and _ only)"
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
            if (plugin.toLowerCase() !== 'ecoskills' && plugin.toLowerCase() !== 'ecoquests') {
                throw new Error('Missing effects/conditions!')
            }
        }
    } catch (e) {
        res.status(400).json({
            message: `Invalid config! Make sure you have effects and conditions defined.`
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
                },
                isPrivate: false
            }
        })

        if (existing != null) {
            res.status(400).json({
                message: `There's already a config called ${name} for ${plugin}, pick something else!`
            })

            return
        }
    }

    const existing = await prisma.config.findFirst({
        where: {
            contents: {
                equals: contents
            },
            plugin: {
                equals: plugin,
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
                message: `Identical config already exists under a different name!`
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
            isPrivate: isPrivate,
            category: category
        }
    })

    res.status(201).json({
        message: `Added ${name} for ${plugin}!`,
        id: config.id
    })
}
