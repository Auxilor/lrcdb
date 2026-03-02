import type { Plugin } from "./types";

export const plugins: Plugin[] = [
  { name: "EcoEnchants", image: "/plugins/ecoenchants.png" },
  { name: "EcoMobs", image: "/plugins/ecomobs.png" },
  { name: "Talismans", image: "/plugins/talismans.png" },
  { name: "EcoArmor", image: "/plugins/ecoarmor.png" },
  { name: "EcoItems", image: "/plugins/ecoitems.png" },
  { name: "Reforges", image: "/plugins/reforges.png" },
  { name: "EcoSkills", image: "/plugins/ecoskills.png" },
  { name: "Boosters", image: "/plugins/boosters.png" },
  { name: "EcoPets", image: "/plugins/ecopets.png" },
  { name: "EcoJobs", image: "/plugins/ecojobs.png" },
  { name: "Actions", image: "/plugins/actions.png" },
  { name: "EcoQuests", image: "/plugins/ecoquests.png" },
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

const UNKNOWN_PLUGIN: Plugin = { name: "Unknown", image: "" };

export function getPluginByName(name: string): Plugin {
  return (
    plugins.find((pl) => pl.name.toLowerCase() === name.toLowerCase()) ??
    UNKNOWN_PLUGIN
  );
}

export function getDefaultCategory(plugin: string): string {
  return CATEGORY_MAP[plugin.toLowerCase()] ?? plugin.toLowerCase();
}
