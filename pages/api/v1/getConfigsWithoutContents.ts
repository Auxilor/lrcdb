import {NextApiRequest, NextApiResponse} from "next"
import {getAuthLevel} from "../../../lib/auth"

import {prisma} from "../../../lib/db"

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

    const plugin = getSingle(req.query.plugin)
    let query = getSingle(req.query.query) || ""
    const limit: number = parseInt(getSingle(req.query.limit) || "150") // Jank
    const skip: number = parseInt(getSingle(req.query.skip) || "0") // Jank
    const apiKey = getSingle(req.query.apiKey) || ""

    const showPrivate = await getAuthLevel(apiKey) > 0

    await prisma.config.deleteMany({
        where: {
            plugin: {
                contains: "ecobosses",
                mode: 'insensitive'
            },
        }
    })

    const configs = await prisma.config.findMany({
        skip: skip,
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

    const filtered = configs.map(config => {
        const {contents, ...rest} = config
        return rest
    })

    res.status(200).json({
        configs: filtered
    })
}
