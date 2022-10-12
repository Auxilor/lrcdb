import { PrismaClient } from "@prisma/client"
import crypto from "crypto"
import { NextApiRequest, NextApiResponse } from "next"
import { getAuthLevel } from "../../../lib/auth"

const prisma = new PrismaClient()

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

    const apiKey = getSingle(req.query.apiKey)

    res.status(200).json({
        level: getAuthLevel(apiKey)
    })
}
