interface Plugin {
    name: string,
    image: string
}

export const plugins: Plugin[] = [
    {
        name: "EcoEnchants",
        image: "https://i.imgur.com/bF6y4xz.png"
    },
    {
        name: "EcoBosses",
        image: "https://i.imgur.com/NfHn90A.png"
    },
    {
        name: "Talismans",
        image: "https://i.imgur.com/B512GRQ.png"
    },
    {
        name: "EcoArmor",
        image: "https://i.imgur.com/lJkjcQQ.png"
    },
    {
        name: "EcoItems",
        image: "https://i.imgur.com/qJLnOW2.png"
    },
    {
        name: "Reforges",
        image: "https://i.imgur.com/YEVnsGW.png"
    },
    {
        name: "EcoSkills",
        image: "https://i.imgur.com/STRh0rl.png"
    },
    {
        name: "Boosters",
        image: "https://i.imgur.com/cNsrhU9.png"
    },
    {
        name: "EcoPets",
        image: "https://i.imgur.com/uflkTN3.png"
    },
    {
        name: "EcoJobs",
        image: "https://i.imgur.com/lfiEn6H.png"
    },
    {
        name: "Actions",
        image: "https://i.imgur.com/XBpZRQj.png"
    },
    {
        name: "EcoQuests",
        image: "https://i.imgur.com/kcRIdiY.png"
    }
]

export function getPluginByName(name: String): Plugin {
    return plugins.find(pl => pl.name.toLowerCase() === name.toLowerCase())!!
}
