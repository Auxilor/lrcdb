interface Plugin {
    name: string,
    image: HTMLImageElement
}

export const plugins: Plugin[] = [
    {
        name: "EcoEnchants",
        image: require("../assets/images/ecoenchants.png")
    },
    {
        name: "EcoBosses",
        image: require("../assets/images/ecobosses.png")
    },
    {
        name: "Talismans",
        image: require("../assets/images/talismans.png")
    },
    {
        name: "EcoArmor",
        image: require("../assets/images/ecoarmor.png")
    },
    {
        name: "EcoItems",
        image: require("../assets/images/ecoitems.png")
    },
    {
        name: "Reforges",
        image: require("../assets/images/reforges.png")
    },
    {
        name: "EcoSkills",
        image: require("../assets/images/ecoskills.png")
    },
    {
        name: "Boosters",
        image: require("../assets/images/boosters.png")
    },
    {
        name: "EcoPets",
        image: require("../assets/images/ecopets.png")
    },
    {
        name: "EcoJobs",
        image: require("../assets/images/ecojobs.png")
    },
    {
        name: "Actions",
        image: require("../assets/images/actions.png")
    }
]

export function getPluginByName(name: String): Plugin {
    return plugins.find(pl => pl.name.toLowerCase() === name.toLowerCase())!!
}
