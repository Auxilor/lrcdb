import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

export const getAuthLevel = async (key: string | undefined): Promise<number> => {
    if (key === undefined) {
        return 0
    }

    const user = await prisma.apiKey.findFirst({
        where: {
            hash: crypto.createHash('sha256').update(key).digest('hex')
        }
    })

    if (user == null) {
        return 0
    }

    return user.level
}
