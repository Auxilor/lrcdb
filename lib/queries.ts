import { Config, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const plugins = ["EcoEnchants", "EcoBosses", "Talismans", "EcoArmor",
    "EcoItems", "Reforges", "EcoSkills", "Boosters", "EcoPets", "EcoJobs",
    "Actions"]

export const parseQuery = async (query: string): Promise<Array<Config>> => {
    const isPlugin = plugins.map(p => p.toLowerCase()).includes(query)

    if (isPlugin) {
        return await prisma.config.findMany({
            where: {
                plugin: {
                    equals: query
                }
            }
        })
    } else {
        return prisma.config.findMany({

        })
    }
}
