# AlfApp Monorepo

Apps:

- `apps/web`: React + Vite + Tailwind + TS
- `apps/server`: Express + TS + Prisma (SQLite)

Prisma DB: `./prisma/dev.db`

## Setup

1. Requisitos: Node 20+, pnpm (corepack enable)
2. Instalar dependencias:

```bash
pnpm i
```

3. Generar Prisma client y migrar:

```bash
pnpm --filter @alfapp/server prisma:generate
pnpm --filter @alfapp/server prisma:migrate
```

4. Desarrollo (en paralelo):

```bash
pnpm -r dev
```

- API: http://localhost:3001
- Web: http://localhost:5173

## Lint/Build

```bash
pnpm -r lint
pnpm -r build
```