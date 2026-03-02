import yaml from "js-yaml";
import { prisma } from "./db";
import { getDefaultCategory } from "./plugins";

const IS_STRICT_DUPE_CHECKING = true;

export async function createConfig(body: {
  name?: string;
  plugin?: string;
  contents?: string;
  author?: string;
  isPrivate?: boolean;
  category?: string | null;
}) {
  const { name, plugin, contents } = body;
  const author = body.author || "Unknown Author";
  const isPrivate = body.isPrivate || false;
  const category = body.category || null;

  if (!name) {
    return { error: "Didn't get a config name!", status: 400 };
  }

  if (name.length > 40) {
    return { error: "Invalid config name! (Too long)", status: 400 };
  }

  if (!/[a-z0-9_]+/.test(name)) {
    return {
      error: "Invalid config name! (Must be a-z, 9-0, and _ only)",
      status: 400,
    };
  }

  if (!plugin) {
    return { error: "Didn't get a plugin!", status: 400 };
  }

  if (!contents) {
    return { error: "Didn't get any contents!", status: 400 };
  }

  try {
    const loaded = yaml.load(contents) as Record<string, unknown>;
    if (
      loaded.effects === undefined ||
      loaded.conditions === undefined
    ) {
      if (
        plugin.toLowerCase() !== "ecoskills" &&
        plugin.toLowerCase() !== "ecoquests"
      ) {
        throw new Error("Missing effects/conditions!");
      }
    }
  } catch {
    return {
      error:
        "Invalid config! Make sure you have effects and conditions defined.",
      status: 400,
    };
  }

  if (IS_STRICT_DUPE_CHECKING) {
    const existing = await prisma.config.findFirst({
      where: {
        name: { equals: name },
        plugin: { equals: plugin },
        isPrivate: false,
      },
    });

    if (existing) {
      return {
        error: `There's already a config called ${name} for ${plugin}, pick something else!`,
        status: 400,
      };
    }
  }

  const existing = await prisma.config.findFirst({
    where: {
      contents: { equals: contents },
      plugin: { equals: plugin },
    },
  });

  if (existing) {
    if (!isPrivate && existing.isPrivate) {
      await prisma.config.delete({ where: { id: existing.id } });
    } else {
      return {
        error: "Identical config already exists under a different name!",
        status: 400,
      };
    }
  }

  const config = await prisma.config.create({
    data: { name, plugin, contents, author, isPrivate, category },
  });

  return {
    data: { message: `Added ${name} for ${plugin}!`, id: config.id },
    status: 201,
  };
}

export async function deleteConfig(id: string | undefined) {
  if (!id) {
    return { error: "You must specify a config ID!", status: 400 };
  }

  const config = await prisma.config.findFirst({ where: { id } });

  if (!config) {
    return { error: "Could not find config!", status: 400 };
  }

  await prisma.config.delete({ where: { id } });

  return { data: { message: "Deleted config!" }, status: 200 };
}

export async function getConfigById(
  id: string | undefined,
  isDownload = false
) {
  if (!id) {
    return { error: "You must specify a config ID!", status: 400 };
  }

  const config = await prisma.config.findFirst({ where: { id } });

  if (!config) {
    return { error: "Could not find config!", status: 400 };
  }

  await prisma.config.update({
    where: { id },
    data: {
      views: config.views + 1,
      downloads: config.downloads + (isDownload ? 1 : 0),
    },
  });

  return {
    data: {
      config: {
        ...config,
        category:
          config.category || getDefaultCategory(config.plugin),
      },
    },
    status: 200,
  };
}

export async function getConfigs(plugin?: string) {
  const configs = await prisma.config.findMany({
    orderBy: [{ downloads: "desc" }, { views: "desc" }],
    where: {
      plugin: { contains: plugin },
    },
  });

  return { data: { configs }, status: 200 };
}

export async function getConfigsWithoutContents(params: {
  plugin?: string;
  query?: string;
  limit?: number;
  skip?: number;
  showPrivate?: boolean;
}) {
  const {
    plugin,
    query = "",
    limit = 150,
    skip = 0,
    showPrivate = false,
  } = params;

  const configs = await prisma.config.findMany({
    skip,
    take: limit,
    orderBy: [{ downloads: "desc" }, { views: "desc" }],
    where: {
      plugin: { contains: plugin },
      name: { contains: query },
      OR: [{ isPrivate: false }, { isPrivate: showPrivate }],
    },
  });

  const filtered = configs.map(({ contents, ...rest }) => rest);

  return { data: { configs: filtered }, status: 200 };
}

export async function countConfigs(params: {
  plugin?: string;
  query?: string;
  showPrivate?: boolean;
}) {
  const { plugin, query = "", showPrivate = false } = params;

  const amount = await prisma.config.count({
    where: {
      plugin: { contains: plugin },
      name: { contains: query },
      OR: [{ isPrivate: false }, { isPrivate: showPrivate }],
    },
  });

  return { data: { amount }, status: 200 };
}

export async function publicizeConfig(id: string | undefined) {
  if (!id) {
    return { error: "You must specify a config ID!", status: 400 };
  }

  const config = await prisma.config.findFirst({ where: { id } });

  if (!config) {
    return { error: "Could not find config!", status: 400 };
  }

  await prisma.config.update({
    where: { id },
    data: { isPrivate: false },
  });

  return { data: { message: "Publicized config!" }, status: 200 };
}
