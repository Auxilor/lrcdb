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
    const apiKey = getSingle(req.query.apiKey)
    const isAuthorized = await getAuthLevel(apiKey) > 0

    if (!isAuthorized) {
        res.status(403).json({
            message: "You are not authorized to do this!"
        })
    }

    const configs = await prisma.config.findMany({
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
            }
        }
    })

    res.status(200).json({
        configs: configs
    })
}
