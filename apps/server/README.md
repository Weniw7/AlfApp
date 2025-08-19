# Server (Express + TypeScript)

Endpoints:

- `GET /api/health` → `{ ok: true }`
- `GET /api/messages` → array de 20 frases
- `POST /api/answers` → guarda `{ q1, q2, q3, q4 }` y devuelve `{ id }`

Scripts:

- `pnpm dev` → desarrollo con tsx
- `pnpm build` → compilar
- `pnpm start` → ejecutar compilado
- `pnpm prisma:migrate` → migración inicial
- `pnpm prisma:generate` → generar cliente