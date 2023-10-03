import {NextApiRequest, NextApiResponse} from "next"
import {getAuthLevel} from "../../../lib/auth"
import {prisma} from "../../../lib/db"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PATCH') {
        res.status(400).json({
            message: `${req.method} requests are not supported on this route!`
        })
        return
    }

    const id = req.body.id
    const apiKey = req.body.apiKey
    const isAuthorized = await getAuthLevel(apiKey) > 0

    if (!isAuthorized) {
        res.status(403).json({
            message: "You are not authorized to do this!"
        })
    }

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
            message: "Could not find config!"
        })
        return
    }

    await prisma.config.update({
        where: {
            id: id
        },
        data: {
            isPrivate: false
        }
    })

    res.status(200).json({
        message: "Publicized config!"
    })
}
