# LRCDB Rewrite: Next.js 16 + TypeScript + Bun

## Overview

Rewrite the LRCDB (LibreForge Config Database) frontend and backend from Next.js 12 (Pages Router, JS) to Next.js 16.1.6 (App Router, TypeScript). Switch from Yarn to Bun. Replace MUI Joy with Tailwind + shadcn/ui. Keep the Prisma/MongoDB data model unchanged.

## Architecture

### Directory Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (html/body, fonts, Tailwind)
│   ├── page.tsx                # Home page (Server Component shell)
│   ├── globals.css             # Tailwind imports + global styles
│   └── api/
│       ├── v1/                 # Legacy API (frozen, backward-compatible)
│       │   ├── addConfig/route.ts
│       │   ├── deleteConfig/route.ts
│       │   ├── getConfigByID/route.ts
│       │   ├── getConfigs/route.ts
│       │   ├── getConfigsWithoutContents/route.ts
│       │   ├── countConfigs/route.ts
│       │   ├── getAuthorizationLevel/route.ts
│       │   └── publicizeConfig/route.ts
│       └── v2/                 # New API (used by frontend)
│           ├── configs/
│           │   └── route.ts    # GET (list/search), POST (create)
│           ├── configs/
│           │   └── [id]/
│           │       └── route.ts # GET (by ID), DELETE
│           ├── configs/
│           │   └── [id]/
│           │       └── publicize/
│           │           └── route.ts # PATCH
│           ├── configs/
│           │   └── count/
│           │       └── route.ts # GET
│           └── auth/
│               └── level/
│                   └── route.ts # GET
├── components/
│   ├── ui/                     # shadcn/ui primitives
│   ├── main-page.tsx           # Main layout & state (Client Component)
│   ├── search-pane.tsx         # Plugin & query filter
│   ├── config-grid.tsx         # Infinite scroll grid
│   ├── config-card.tsx         # Single config card
│   ├── config-preview.tsx      # Modal with YAML preview
│   ├── import-command.tsx      # Copy command dialog
│   ├── more-options.tsx        # API key input toggle
│   └── admin-card-options.tsx  # Delete/publicize buttons
├── lib/
│   ├── db.ts                   # Prisma client singleton
│   ├── plugins.ts              # Plugin list (typed)
│   ├── auth.ts                 # API key authentication
│   └── utils.ts                # shadcn cn() utility
```

### API Design

#### v1 (Legacy, frozen)

Exact same paths, query params, body formats, and response shapes as the existing API. Implemented as thin wrappers that call shared logic from `src/lib/`.

| Path | Method | Purpose |
|------|--------|---------|
| `/api/v1/addConfig` | POST | Create config |
| `/api/v1/deleteConfig` | DELETE | Delete config |
| `/api/v1/getConfigByID` | GET | Get config by ID |
| `/api/v1/getConfigs` | GET | Get configs by plugin (with contents) |
| `/api/v1/getConfigsWithoutContents` | GET | Paginated config search |
| `/api/v1/countConfigs` | GET | Count matching configs |
| `/api/v1/getAuthorizationLevel` | GET | Check API key level |
| `/api/v1/publicizeConfig` | PATCH | Make config public |

#### v2 (New, used by frontend)

RESTful conventions. Same underlying logic, cleaner interface.

| Path | Method | Purpose |
|------|--------|---------|
| `/api/v2/configs` | GET | List/search configs (query params: plugin, query, page, pageSize, includeContents) |
| `/api/v2/configs` | POST | Create config |
| `/api/v2/configs/count` | GET | Count matching configs |
| `/api/v2/configs/[id]` | GET | Get single config (increments views) |
| `/api/v2/configs/[id]` | DELETE | Delete config |
| `/api/v2/configs/[id]/publicize` | PATCH | Make config public |
| `/api/v2/auth/level` | GET | Check API key auth level |

### Key Decisions

- **Prisma schema unchanged** - same MongoDB models, just upgrade client
- **Shared business logic in `src/lib/`** - both v1 and v2 routes call the same functions
- **Server Components** for the page shell; Client Components for interactive UI
- **shadcn/ui** replaces MUI Joy (Card, Dialog, Button, Input, Select components)
- **react-syntax-highlighter** retained for YAML display
- **react-intersection-observer** retained for infinite scroll
- **Bun** replaces Yarn for package management
- **Dockerfile** updated to use `oven/bun` base image
- **next.config.ts** with `output: "standalone"` for Docker builds

### What Gets Deleted

- `/pages/` directory
- `/components/` directory
- `/lib/` directory (moved to `/src/lib/`)
- `/styles/` directory
- `yarn.lock`
- `next.config.js` (replaced by `next.config.ts`)
- `tailwind.config.js` (replaced by `tailwind.config.ts`)
- `postcss.config.js` (replaced by `postcss.config.mjs`)
