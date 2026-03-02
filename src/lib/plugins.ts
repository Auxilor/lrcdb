import type { Plugin } from "./types";

export const plugins: Plugin[] = [
  { name: "EcoEnchants", image: "https://i.imgur.com/bF6y4xz.png" },
  { name: "EcoMobs", image: "https://i.imgur.com/fvo8fBv.png" },
  { name: "Talismans", image: "https://i.imgur.com/B512GRQ.png" },
  { name: "EcoArmor", image: "https://i.imgur.com/lJkjcQQ.png" },
  { name: "EcoItems", image: "https://i.imgur.com/qJLnOW2.png" },
  { name: "Reforges", image: "https://i.imgur.com/YEVnsGW.png" },
  { name: "EcoSkills", image: "https://i.imgur.com/STRh0rl.png" },
  { name: "Boosters", image: "https://i.imgur.com/cNsrhU9.png" },
  { name: "EcoPets", image: "https://i.imgur.com/uflkTN3.png" },
  { name: "EcoJobs", image: "https://i.imgur.com/lfiEn6H.png" },
  { name: "Actions", image: "https://i.imgur.com/XBpZRQj.png" },
  { name: "EcoQuests", image: "https://i.imgur.com/kcRIdiY.png" },
];

const CATEGORY_MAP: Record<string, string> = {
  ecoenchants: "enchant",
  ecomobs: "mob",
  talismans: "talisman",
  ecoarmor: "set",
  ecoitems: "item",
  reforges: "reforge",
  ecoskills: "skill",
  boosters: "booster",
  ecopets: "pet",
  ecojobs: "job",
  actions: "action",
  ecoquests: "task",
};

export function getPluginByName(name: string): Plugin {
  return plugins.find(
    (pl) => pl.name.toLowerCase() === name.toLowerCase()
  )!;
}

export function getDefaultCategory(plugin: string): string {
  return CATEGORY_MAP[plugin.toLowerCase()] ?? plugin.toLowerCase();
}
