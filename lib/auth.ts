import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

const salt = '7314c648755f78e3d42b1421c19e00d4f3d9c78949787852c20b6fd607a42efb'

export const getAuthLevel = async (key: string | undefined): Promise<number> => {
    if (key === undefined) {
        return 0
    }

    const user = await prisma.user.findFirst({
        where: {
            apiKeyHash: crypto.createHash('sha256').update(salt + key).digest('hex')
        }
    })

    if (user == null) {
        return 0
    }

    return user.level
}
