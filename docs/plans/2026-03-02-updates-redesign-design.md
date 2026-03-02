# LRCDB Updates + UI Redesign

## Overview

Multiple improvements: Prisma index optimization, TanStack Query infinite scroll, local plugin images, API key UX, ad removal, and full UI redesign.

## Changes

### 1. Prisma Indexes
Add descending indexes on `downloads` and `views` to optimize the sort-by-popularity queries used on every page load.

### 2. Plugin Images to /public/
Fetch all 12 imgur plugin images into `/public/plugins/<name>.png`. Update `plugins.ts` to use local paths (`/plugins/<name>.png`).

### 3. TanStack Query + useInfiniteQuery
- Install `@tanstack/react-query`
- Add `QueryClientProvider` wrapper
- Replace manual fetch/page state with `useInfiniteQuery` for config listing
- Use `useQuery` for count and auth level
- Cursor-based pagination via `skip` param

### 4. API Key Input
Move to a small settings icon (gear) in the corner that opens a popover. Nearly invisible since only ~3 people use it.

### 5. Remove GamerSupps Ad
Delete the ad block from the sidebar.

### 6. Full UI Redesign
Complete visual overhaul using frontend-design skill with full creative freedom. Constraints:
- Plugin filter, search, config grid, preview modal, import command must all work
- Admin actions (delete/publicize) when authorized
- Responsive (mobile + desktop)
