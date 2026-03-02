# LRCDB Next.js 16 Rewrite Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite LRCDB from Next.js 12 Pages Router (JS) to Next.js 16.1.6 App Router (TypeScript) with Bun, Tailwind + shadcn/ui, v1 legacy API + v2 REST API.

**Architecture:** Clean rewrite under `/src/`. Server Component page shell with Client Component interactive UI. Shared business logic in `src/lib/` called by both v1 (frozen legacy) and v2 (new REST) API routes. Prisma/MongoDB schema unchanged.

**Tech Stack:** Next.js 16.1.6, React 19.2, TypeScript 5, Bun, Tailwind CSS 4, shadcn/ui, Prisma (latest), MongoDB

---

### Task 1: Project initialization - Bun + Next.js 16 + TypeScript

**Files:**
- Modify: `package.json`
- Create: `next.config.ts`
- Modify: `tsconfig.json`
- Delete: `next.config.js`, `yarn.lock`, `tailwind.config.js`, `postcss.config.js`

**Step 1: Remove yarn.lock and old config files**

```bash
rm -f yarn.lock tailwind.config.js postcss.config.js next.config.js
```

**Step 2: Rewrite package.json**

```json
{
  "name": "lrcdb",
  "version": "0.2.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "postinstall": "prisma generate"
  },
  "dependencies": {
    "@prisma/client": "^6.5.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "js-yaml": "^4.1.0",
    "lucide-react": "^0.474.0",
    "next": "16.1.6",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-intersection-observer": "^9.16.0",
    "react-syntax-highlighter": "^15.6.1",
    "tailwind-merge": "^3.0.2"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.0",
    "@types/js-yaml": "^4.0.9",
    "@types/node": "^22.13.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/react-syntax-highlighter": "^15.5.13",
    "prisma": "^6.5.0",
    "tailwindcss": "^4.1.0",
    "typescript": "^5.7.0"
  },
  "description": "libreforge config database",
  "author": "Auxilor <william.favierparsons1@gmail.com>",
  "license": "MIT"
}
```

**Step 3: Create next.config.ts**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
};

export default nextConfig;
```

**Step 4: Update tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Step 5: Create src/app/globals.css (Tailwind v4)**

```css
@import "tailwindcss";
```

**Step 6: Create postcss.config.mjs**

```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

**Step 7: Install dependencies and generate Prisma client**

```bash
bun install
bunx prisma generate
```

**Step 8: Commit**

```bash
git add -A
git commit -m "feat: initialize Next.js 16 + Bun + Tailwind v4 + TypeScript"
```

---

### Task 2: Shared library files (src/lib/)

**Files:**
- Create: `src/lib/utils.ts`
- Create: `src/lib/db.ts`
- Create: `src/lib/plugins.ts`
- Create: `src/lib/auth.ts`
- Create: `src/lib/types.ts`
- Create: `src/lib/config-service.ts`

**Step 1: Create src/lib/utils.ts (shadcn cn utility)**

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Step 2: Create src/lib/types.ts**

```typescript
export interface Plugin {
  name: string;
  image: string;
}

export interface Config {
  id: string;
  name: string;
  plugin: string;
  author: string;
  contents: string;
  downloads: number;
  views: number;
  isPrivate: boolean;
  category: string | null;
}

export type ConfigWithoutContents = Omit<Config, "contents">;
```

**Step 3: Create src/lib/db.ts**

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

**Step 4: Create src/lib/plugins.ts**

```typescript
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
```

**Step 5: Create src/lib/auth.ts**

```typescript
import crypto from "crypto";
import { prisma } from "./db";

const salt =
  "7314c648755f78e3d42b1421c19e00d4f3d9c78949787852c20b6fd607a42efb";

export async function getAuthLevel(
  key: string | undefined | null
): Promise<number> {
  if (!key) return 0;

  const user = await prisma.user.findFirst({
    where: {
      apiKeyHash: crypto
        .createHash("sha256")
        .update(salt + key)
        .digest("hex"),
    },
  });

  return user?.level ?? 0;
}
```

**Step 6: Create src/lib/config-service.ts (shared business logic)**

```typescript
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
```

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: add shared lib files (db, auth, plugins, config-service, types)"
```

---

### Task 3: v1 Legacy API routes

**Files:**
- Create: `src/app/api/v1/addConfig/route.ts`
- Create: `src/app/api/v1/deleteConfig/route.ts`
- Create: `src/app/api/v1/getConfigByID/route.ts`
- Create: `src/app/api/v1/getConfigs/route.ts`
- Create: `src/app/api/v1/getConfigsWithoutContents/route.ts`
- Create: `src/app/api/v1/countConfigs/route.ts`
- Create: `src/app/api/v1/getAuthorizationLevel/route.ts`
- Create: `src/app/api/v1/publicizeConfig/route.ts`

All v1 routes are thin wrappers around `config-service.ts` that preserve exact legacy request/response shapes.

**Step 1: Create src/app/api/v1/addConfig/route.ts**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createConfig } from "@/lib/config-service";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await createConfig(body);

  if (result.error) {
    return NextResponse.json({ message: result.error }, { status: result.status });
  }

  return NextResponse.json(result.data, { status: result.status });
}
```

**Step 2: Create src/app/api/v1/deleteConfig/route.ts**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getAuthLevel } from "@/lib/auth";
import { deleteConfig } from "@/lib/config-service";

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const isAuthorized = (await getAuthLevel(body.apiKey)) > 0;

  if (!isAuthorized) {
    return NextResponse.json(
      { message: "You are not authorized to do this!" },
      { status: 403 }
    );
  }

  const result = await deleteConfig(body.id);

  if (result.error) {
    return NextResponse.json({ message: result.error }, { status: result.status });
  }

  return NextResponse.json(result.data, { status: result.status });
}
```

**Step 3: Create src/app/api/v1/getConfigByID/route.ts**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getConfigById } from "@/lib/config-service";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id") ?? undefined;
  const isDownload = searchParams.get("isDownload") === "true";

  const result = await getConfigById(id, isDownload);

  if (result.error) {
    return NextResponse.json({ message: result.error }, { status: result.status });
  }

  return NextResponse.json(result.data, { status: result.status });
}
```

**Step 4: Create src/app/api/v1/getConfigs/route.ts**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getAuthLevel } from "@/lib/auth";
import { getConfigs } from "@/lib/config-service";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const plugin = searchParams.get("plugin") ?? undefined;
  const apiKey = searchParams.get("apiKey") ?? undefined;
  const isAuthorized = (await getAuthLevel(apiKey)) > 0;

  if (!isAuthorized) {
    return NextResponse.json(
      { message: "You are not authorized to do this!" },
      { status: 403 }
    );
  }

  const result = await getConfigs(plugin);

  return NextResponse.json(result.data, { status: result.status });
}
```

**Step 5: Create src/app/api/v1/getConfigsWithoutContents/route.ts**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getAuthLevel } from "@/lib/auth";
import { getConfigsWithoutContents } from "@/lib/config-service";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const plugin = searchParams.get("plugin") ?? undefined;
  const query = searchParams.get("query") ?? "";
  const limit = parseInt(searchParams.get("limit") ?? "150");
  const skip = parseInt(searchParams.get("skip") ?? "0");
  const apiKey = searchParams.get("apiKey") ?? "";

  const showPrivate = (await getAuthLevel(apiKey)) > 0;

  const result = await getConfigsWithoutContents({
    plugin,
    query,
    limit,
    skip,
    showPrivate,
  });

  return NextResponse.json(result.data, { status: result.status });
}
```

**Step 6: Create src/app/api/v1/countConfigs/route.ts**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getAuthLevel } from "@/lib/auth";
import { countConfigs } from "@/lib/config-service";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const plugin = searchParams.get("plugin") ?? undefined;
  const query = searchParams.get("query") ?? "";
  const apiKey = searchParams.get("apiKey") ?? "";

  const showPrivate = (await getAuthLevel(apiKey)) > 0;

  const result = await countConfigs({ plugin, query, showPrivate });

  return NextResponse.json(result.data, { status: result.status });
}
```

**Step 7: Create src/app/api/v1/getAuthorizationLevel/route.ts**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getAuthLevel } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const apiKey = searchParams.get("apiKey") ?? undefined;

  const level = await getAuthLevel(apiKey);

  return NextResponse.json({ level });
}
```

**Step 8: Create src/app/api/v1/publicizeConfig/route.ts**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getAuthLevel } from "@/lib/auth";
import { publicizeConfig } from "@/lib/config-service";

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const isAuthorized = (await getAuthLevel(body.apiKey)) > 0;

  if (!isAuthorized) {
    return NextResponse.json(
      { message: "You are not authorized to do this!" },
      { status: 403 }
    );
  }

  const result = await publicizeConfig(body.id);

  if (result.error) {
    return NextResponse.json({ message: result.error }, { status: result.status });
  }

  return NextResponse.json(result.data, { status: result.status });
}
```

**Step 9: Commit**

```bash
git add -A
git commit -m "feat: add v1 legacy API routes (backward-compatible)"
```

---

### Task 4: v2 REST API routes

**Files:**
- Create: `src/app/api/v2/configs/route.ts`
- Create: `src/app/api/v2/configs/count/route.ts`
- Create: `src/app/api/v2/configs/[id]/route.ts`
- Create: `src/app/api/v2/configs/[id]/publicize/route.ts`
- Create: `src/app/api/v2/auth/level/route.ts`

**Step 1: Create src/app/api/v2/configs/route.ts (GET list + POST create)**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getAuthLevel } from "@/lib/auth";
import {
  createConfig,
  getConfigsWithoutContents,
  getConfigs,
} from "@/lib/config-service";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const plugin = searchParams.get("plugin") ?? undefined;
  const query = searchParams.get("query") ?? "";
  const limit = parseInt(searchParams.get("limit") ?? "150");
  const skip = parseInt(searchParams.get("skip") ?? "0");
  const apiKey = searchParams.get("apiKey") ?? "";
  const includeContents = searchParams.get("includeContents") === "true";

  const showPrivate = (await getAuthLevel(apiKey)) > 0;

  if (includeContents) {
    if (!showPrivate) {
      return NextResponse.json(
        { message: "You are not authorized to do this!" },
        { status: 403 }
      );
    }
    const result = await getConfigs(plugin);
    return NextResponse.json(result.data, { status: result.status });
  }

  const result = await getConfigsWithoutContents({
    plugin,
    query,
    limit,
    skip,
    showPrivate,
  });

  return NextResponse.json(result.data, { status: result.status });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await createConfig(body);

  if (result.error) {
    return NextResponse.json({ message: result.error }, { status: result.status });
  }

  return NextResponse.json(result.data, { status: result.status });
}
```

**Step 2: Create src/app/api/v2/configs/count/route.ts**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getAuthLevel } from "@/lib/auth";
import { countConfigs } from "@/lib/config-service";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const plugin = searchParams.get("plugin") ?? undefined;
  const query = searchParams.get("query") ?? "";
  const apiKey = searchParams.get("apiKey") ?? "";

  const showPrivate = (await getAuthLevel(apiKey)) > 0;

  const result = await countConfigs({ plugin, query, showPrivate });

  return NextResponse.json(result.data, { status: result.status });
}
```

**Step 3: Create src/app/api/v2/configs/[id]/route.ts (GET single + DELETE)**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getAuthLevel } from "@/lib/auth";
import { getConfigById, deleteConfig } from "@/lib/config-service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const isDownload =
    request.nextUrl.searchParams.get("isDownload") === "true";

  const result = await getConfigById(id, isDownload);

  if (result.error) {
    return NextResponse.json({ message: result.error }, { status: result.status });
  }

  return NextResponse.json(result.data, { status: result.status });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = request.nextUrl;
  const apiKey = searchParams.get("apiKey") ?? undefined;
  const isAuthorized = (await getAuthLevel(apiKey)) > 0;

  if (!isAuthorized) {
    return NextResponse.json(
      { message: "You are not authorized to do this!" },
      { status: 403 }
    );
  }

  const result = await deleteConfig(id);

  if (result.error) {
    return NextResponse.json({ message: result.error }, { status: result.status });
  }

  return NextResponse.json(result.data, { status: result.status });
}
```

**Step 4: Create src/app/api/v2/configs/[id]/publicize/route.ts**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getAuthLevel } from "@/lib/auth";
import { publicizeConfig } from "@/lib/config-service";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = request.nextUrl;
  const apiKey = searchParams.get("apiKey") ?? undefined;
  const isAuthorized = (await getAuthLevel(apiKey)) > 0;

  if (!isAuthorized) {
    return NextResponse.json(
      { message: "You are not authorized to do this!" },
      { status: 403 }
    );
  }

  const result = await publicizeConfig(id);

  if (result.error) {
    return NextResponse.json({ message: result.error }, { status: result.status });
  }

  return NextResponse.json(result.data, { status: result.status });
}
```

**Step 5: Create src/app/api/v2/auth/level/route.ts**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getAuthLevel } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const apiKey = searchParams.get("apiKey") ?? undefined;

  const level = await getAuthLevel(apiKey);

  return NextResponse.json({ level });
}
```

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: add v2 REST API routes"
```

---

### Task 5: Install shadcn/ui components

**Step 1: Initialize shadcn/ui**

```bash
bunx shadcn@latest init -d
```

Accept defaults (New York style, Zinc color, CSS variables). This creates `src/components/ui/` and `src/lib/utils.ts` (which we already have — keep ours or let it overwrite, they're identical).

**Step 2: Add required shadcn components**

```bash
bunx shadcn@latest add button card dialog input select
```

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add shadcn/ui components (button, card, dialog, input, select)"
```

---

### Task 6: App layout and page shell

**Files:**
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`

**Step 1: Create src/app/layout.tsx**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "lrcdb",
  description: "libreforge config database",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

**Step 2: Create src/app/page.tsx**

This is the Server Component shell. All interactive state lives in client components.

```tsx
import { MainPage } from "@/components/main-page";

export default function Home() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <MainPage />
    </div>
  );
}
```

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add root layout and page shell"
```

---

### Task 7: Client components

**Files:**
- Create: `src/components/main-page.tsx`
- Create: `src/components/search-pane.tsx`
- Create: `src/components/config-grid.tsx`
- Create: `src/components/config-card.tsx`
- Create: `src/components/config-preview.tsx`
- Create: `src/components/import-command.tsx`
- Create: `src/components/more-options.tsx`
- Create: `src/components/admin-card-options.tsx`

**Step 1: Create src/components/main-page.tsx**

```tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import type { Config, ConfigWithoutContents } from "@/lib/types";
import { SearchPane } from "./search-pane";
import { ConfigGrid } from "./config-grid";
import { MoreOptions } from "./more-options";
import { ConfigPreview } from "./config-preview";

const PAGE_SIZE = 50;

export function MainPage() {
  const [configs, setConfigs] = useState<ConfigWithoutContents[]>([]);
  const [amount, setAmount] = useState(0);
  const [plugin, setPlugin] = useState("");
  const [query, setQuery] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [page, setPage] = useState(1);
  const [isShowingAll, setIsShowingAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [showing, setShowing] = useState<Config | null>(null);

  const updateConfigs = useCallback(() => {
    setIsLoading(true);
    fetch(
      `/api/v2/configs?plugin=${plugin}&query=${query}&apiKey=${apiKey}&limit=${PAGE_SIZE * page}`
    )
      .then((res) => res.json())
      .then((data) => setConfigs(data.configs))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));

    fetch(
      `/api/v2/configs/count?plugin=${plugin}&query=${query}&apiKey=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAmount(data.amount);
        if (data.amount === 0) {
          setIsShowingAll(true);
        } else {
          setIsShowingAll(data.amount < PAGE_SIZE * (page - 1));
        }
      })
      .catch((err) => console.error(err));
  }, [plugin, query, apiKey, page]);

  const loadMore = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  useEffect(() => {
    fetch(`/api/v2/auth/level?apiKey=${apiKey}`)
      .then((res) => res.json())
      .then((data) => setAuthorized(data.level > 0))
      .catch((err) => console.error(err));
  }, [apiKey]);

  useEffect(() => {
    updateConfigs();
  }, [updateConfigs]);

  useEffect(() => {
    setPage(1);
  }, [plugin, query, apiKey]);

  const escFunction = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setShowing(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => document.removeEventListener("keydown", escFunction, false);
  }, [escFunction]);

  return (
    <>
      {showing && (
        <ConfigPreview
          config={showing}
          setConfigPreview={setShowing}
        />
      )}
      <div className="md:grid md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7 overflow-scroll md:overflow-hidden">
        <div className="md:col-start-1 p-10 flex flex-col place-items-center">
          <h1 className="text-center text-7xl font-sans">lrcdb</h1>
          <p className="text-center text-md font-sans">
            libreforge config database
          </p>

          <SearchPane
            plugin={plugin}
            setPlugin={setPlugin}
            setQuery={setQuery}
            amount={amount}
            isLoading={isLoading}
          />

          <MoreOptions setApiKey={setApiKey} apiKey={apiKey} />

          <a
            href="https://gamersupps.gg/Auxilor"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4"
          >
            <img
              src="https://i.imgur.com/7mFhlQO.png"
              alt="GamerSupps, Code Auxilor"
              className="rounded-xl w-full"
            />
          </a>
        </div>
        <div className="md:col-start-2 md:col-span-full p-5 md:overflow-scroll h-screen bg-slate-100">
          <ConfigGrid
            configs={configs}
            setConfigPreview={setShowing}
            apiKey={apiKey}
            updateConfigs={updateConfigs}
            loadMore={loadMore}
            isShowingAll={isShowingAll}
            authorized={authorized}
          />
        </div>
      </div>
    </>
  );
}
```

**Step 2: Create src/components/search-pane.tsx**

```tsx
"use client";

import { Loader2 } from "lucide-react";
import { plugins } from "@/lib/plugins";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchPaneProps {
  plugin: string;
  setPlugin: (plugin: string) => void;
  setQuery: (query: string) => void;
  amount: number;
  isLoading: boolean;
}

export function SearchPane({
  plugin,
  setPlugin,
  setQuery,
  amount,
  isLoading,
}: SearchPaneProps) {
  return (
    <div className="flex flex-col gap-3 place-items-center py-5 w-full">
      <Select value={plugin || undefined} onValueChange={setPlugin}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a plugin..." />
        </SelectTrigger>
        <SelectContent>
          {plugins.map((pl) => (
            <SelectItem key={pl.name} value={pl.name}>
              {pl.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        placeholder="Search for a config..."
        onChange={(e) => setQuery(e.target.value)}
        className="w-full"
      />

      <Button
        variant="outline"
        onClick={() => {
          setPlugin("");
          setQuery("");
        }}
        className="w-full"
      >
        Reset Filters
      </Button>

      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <p className="text-xs">Showing {amount} configs</p>
      )}

      <p className="text-red-700 text-xs text-center">
        Configurations here are not officially supported. Download them at
        your own risk.
      </p>
    </div>
  );
}
```

**Step 3: Create src/components/config-grid.tsx**

```tsx
"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useInView } from "react-intersection-observer";
import type { Config, ConfigWithoutContents } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { ConfigCard } from "./config-card";

interface ConfigGridProps {
  configs: ConfigWithoutContents[];
  setConfigPreview: (config: Config) => void;
  apiKey: string;
  updateConfigs: () => void;
  loadMore: () => void;
  isShowingAll: boolean;
  authorized: boolean;
}

export function ConfigGrid({
  configs,
  setConfigPreview,
  apiKey,
  updateConfigs,
  loadMore,
  isShowingAll,
  authorized,
}: ConfigGridProps) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) loadMore();
  }, [inView, loadMore]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      {configs.map((config) => (
        <ConfigCard
          key={config.id}
          config={config}
          setConfigPreview={setConfigPreview}
          apiKey={apiKey}
          updateConfigs={updateConfigs}
          authorized={authorized}
        />
      ))}

      {!isShowingAll && (
        <div ref={ref} className="place-self-center">
          <Card className="p-4">
            <Loader2 className="h-4 w-4 animate-spin" />
          </Card>
        </div>
      )}
    </div>
  );
}
```

**Step 4: Create src/components/config-card.tsx**

```tsx
"use client";

import { useState } from "react";
import { Eye, Download, Loader2 } from "lucide-react";
import type { Config, ConfigWithoutContents } from "@/lib/types";
import { getPluginByName } from "@/lib/plugins";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminCardOptions } from "./admin-card-options";

interface ConfigCardProps {
  config: ConfigWithoutContents;
  setConfigPreview: (config: Config) => void;
  apiKey: string;
  updateConfigs: () => void;
  authorized: boolean;
}

export function ConfigCard({
  config,
  setConfigPreview,
  apiKey,
  updateConfigs,
  authorized,
}: ConfigCardProps) {
  const [loadingPreview, setLoadingPreview] = useState(false);
  const plugin = getPluginByName(config.plugin);

  return (
    <Card className="p-4 transition ease-in-out hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-row gap-4">
        <img
          src={plugin.image}
          alt={plugin.name}
          className="h-0 w-0 md:h-16 md:w-16"
        />
        <div className="flex flex-col place-content-center mb-1 overflow-hidden">
          <div className="flex">
            <span className="text-xl">{config.name}</span>
            <span className="text-slate-400 text-xl">.yml</span>
          </div>
          <span className="text-slate-600 text-sm">by {config.author}</span>
        </div>
        <div className="flex flex-row gap-4 ml-auto">
          <div className="flex flex-col place-content-center items-end">
            <span className="text-slate-600 text-sm flex items-center gap-1">
              {config.views} <Eye className="h-3 w-3" />
            </span>
            <span className="text-slate-600 text-sm flex items-center gap-1">
              {config.downloads} <Download className="h-3 w-3" />
            </span>
          </div>

          {authorized && (
            <AdminCardOptions
              updateConfigs={updateConfigs}
              apiKey={apiKey}
              config={config}
            />
          )}

          <Button
            variant="outline"
            className="self-center"
            onClick={() => {
              setLoadingPreview(true);
              fetch(`/api/v2/configs/${config.id}`)
                .then((res) => res.json())
                .then((data) => setConfigPreview(data.config))
                .catch((err) => console.error(err))
                .finally(() => setLoadingPreview(false));
            }}
          >
            {loadingPreview ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Preview"
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
```

**Step 5: Create src/components/config-preview.tsx**

```tsx
"use client";

import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import type { Config } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImportCommand } from "./import-command";

interface ConfigPreviewProps {
  config: Config;
  setConfigPreview: (config: Config | null) => void;
}

export function ConfigPreview({
  config,
  setConfigPreview,
}: ConfigPreviewProps) {
  const [downloadLink, setDownloadLink] = useState("");
  const [showImport, setShowImport] = useState(false);

  useEffect(() => {
    const data = new Blob([config.contents], { type: "text/yml" });

    if (downloadLink !== "") {
      window.URL.revokeObjectURL(downloadLink);
    }

    setDownloadLink(window.URL.createObjectURL(data));
  }, [config]);

  return (
    <div className="absolute z-10 bg-slate-400/20 inset-0">
      <div className="flex place-content-center place-items-center w-screen h-screen">
        {showImport ? (
          <ImportCommand
            config={config}
            close={() => setShowImport(false)}
          />
        ) : (
          <Card className="w-11/12 md:w-1/2 h-5/6 p-6 flex flex-col">
            <div className="flex mb-3">
              <span className="text-xl">{config.name}</span>
              <span className="text-slate-400 text-xl">.yml</span>
            </div>
            <SyntaxHighlighter
              language="yaml"
              className="bg-slate-200 p-4 rounded-lg flex-1 font-mono text-xs overflow-scroll"
            >
              {config.contents}
            </SyntaxHighlighter>
            <div className="grid grid-cols-3 mt-3 gap-4">
              <Button variant="outline" onClick={() => setShowImport(true)}>
                Add to your server
              </Button>
              <a
                download={`${config.name}.yml`}
                href={downloadLink}
                onClick={() => {
                  fetch(
                    `/api/v2/configs/${config.id}?isDownload=true`
                  ).catch((err) => console.error(err));
                }}
              >
                <Button variant="outline" className="w-full">
                  Download .yml file
                </Button>
              </a>
              <Button
                variant="outline"
                onClick={() => setConfigPreview(null)}
              >
                Close
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
```

**Step 6: Create src/components/import-command.tsx**

```tsx
"use client";

import { useState } from "react";
import type { Config } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ImportCommandProps {
  config: Config;
  close: () => void;
}

export function ImportCommand({ config, close }: ImportCommandProps) {
  const command = `/lrcdb import ${config.id}`;
  const [copied, setCopied] = useState(false);

  return (
    <Card className="w-1/2 p-6 grid grid-rows-2 gap-2">
      <div className="grid grid-cols-6 gap-4">
        <span className="text-2xl col-start-1 col-span-4">
          Run this command:
        </span>
        <Button
          variant="outline"
          className={copied ? "border-green-500 text-green-500" : ""}
          onClick={() => {
            navigator.clipboard.writeText(command);
            setCopied(true);
            setTimeout(() => setCopied(false), 5000);
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
        <Button variant="outline" onClick={close}>
          Close
        </Button>
      </div>
      <p className="bg-slate-200 p-2 rounded-lg font-mono text-md">
        {command}
      </p>
    </Card>
  );
}
```

**Step 7: Create src/components/more-options.tsx**

```tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

interface MoreOptionsProps {
  setApiKey: (key: string) => void;
  apiKey: string;
}

export function MoreOptions({ setApiKey, apiKey }: MoreOptionsProps) {
  const [shown, setShown] = useState(false);

  return (
    <div className="flex flex-col place-items-center gap-4">
      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={shown}
          onChange={(e) => setShown(e.target.checked)}
          className="rounded"
        />
        Show more options
      </label>
      {shown && (
        <Input
          placeholder="API key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      )}
    </div>
  );
}
```

**Step 8: Create src/components/admin-card-options.tsx**

```tsx
"use client";

import { useState } from "react";
import { Share, Trash2, Loader2 } from "lucide-react";
import type { ConfigWithoutContents } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface AdminCardOptionsProps {
  config: ConfigWithoutContents;
  apiKey: string;
  updateConfigs: () => void;
}

export function AdminCardOptions({
  config,
  apiKey,
  updateConfigs,
}: AdminCardOptionsProps) {
  const [deleting, setDeleting] = useState(false);
  const [publicizing, setPublicizing] = useState(false);

  return (
    <div className="self-center flex flex-row gap-2">
      {config.isPrivate && (
        <Button
          variant="outline"
          size="sm"
          className="text-green-600 border-green-600"
          onClick={() => {
            setPublicizing(true);
            fetch(`/api/v2/configs/${config.id}/publicize?apiKey=${apiKey}`, {
              method: "PATCH",
            })
              .then(() => updateConfigs())
              .catch((err) => console.error(err))
              .finally(() => setPublicizing(false));
          }}
        >
          {publicizing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Share className="h-4 w-4" />
          )}
        </Button>
      )}

      <Button
        variant="outline"
        size="sm"
        className="text-red-600 border-red-600"
        onClick={() => {
          setDeleting(true);
          fetch(`/api/v2/configs/${config.id}?apiKey=${apiKey}`, {
            method: "DELETE",
          })
            .then(() => updateConfigs())
            .catch((err) => console.error(err))
            .finally(() => setDeleting(false));
        }}
      >
        {deleting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
```

**Step 9: Commit**

```bash
git add -A
git commit -m "feat: add all client components with shadcn/ui"
```

---

### Task 8: Dockerfile update for Bun

**Files:**
- Modify: `Dockerfile`

**Step 1: Rewrite Dockerfile**

```dockerfile
FROM oven/bun:1 AS deps
WORKDIR /app

COPY package.json bun.lock ./
COPY prisma ./prisma/
RUN bun install --frozen-lockfile

FROM oven/bun:1 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN bunx prisma generate
RUN bun run build

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
```

Note: The runner stage uses `node:22-alpine` (not Bun) because Next.js standalone output produces a Node.js server.js entry point. Bun is used for building only.

**Step 2: Commit**

```bash
git add Dockerfile
git commit -m "feat: update Dockerfile for Bun builds"
```

---

### Task 9: Clean up old files

**Files:**
- Delete: `pages/` (entire directory)
- Delete: `components/` (entire directory)
- Delete: `lib/` (entire directory)
- Delete: `styles/` (entire directory)

**Step 1: Remove old directories**

```bash
rm -rf pages/ components/ lib/ styles/
```

**Step 2: Commit**

```bash
git add -A
git commit -m "chore: remove old Pages Router files"
```

---

### Task 10: Build verification

**Step 1: Run the build**

```bash
bun run build
```

Expected: Build completes successfully with no errors.

**Step 2: Fix any type errors or build issues that arise**

If there are errors, fix them iteratively until the build passes.

**Step 3: Start dev server and manually verify**

```bash
bun run dev
```

Check:
- Home page loads at `http://localhost:3000`
- Configs load in the grid
- Plugin filter works
- Search works
- Preview modal opens and closes (click + ESC)
- Download works
- Import command dialog works
- v1 API routes respond correctly (e.g. `curl http://localhost:3000/api/v1/countConfigs`)

**Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve build issues"
```
