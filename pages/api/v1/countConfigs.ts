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
    const apiKey = getSingle(req.query.apiKey) || ""

    const showPrivate = await getAuthLevel(apiKey) > 0

    const configs = await prisma.config.count({
        where: {
            plugin: {
                contains: plugin,
            },
            name: {
                contains: query,
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
        amount: configs
    })
}
