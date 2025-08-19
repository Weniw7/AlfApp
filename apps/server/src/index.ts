import express, { Request, Response } from "express";
import cors from "cors";
import { randomUUID } from "node:crypto";

const app = express();
app.use(cors());
app.use(express.json());

type AnswerPayload = {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
};

const MESSAGES: string[] = [
  "La idea no te hará libre; la ejecución sí. Empieza hoy.",
  "Mide, mejora, repite. El progreso diario gana batallas.",
  "Vende antes de construir: valida y luego escala.",
  "Cliente > Ego. Escucha, itera y vuelve a ofrecer.",
  "Pequeños sprints, grandes resultados. Ritmo > Intensidad.",
  "Tu agenda muestra tus prioridades: bloquéala para crear.",
  "No perfecciones, lanza. La versión 1 abre puertas.",
  "Aprende del ‘no’. Ajusta la propuesta y vuelve.",
  "Flujos de caja primero. Crece con números, no con humo.",
  "Sin distribución, no hay producto. Diseña tu canal.",
  "Habla con 5 clientes cada semana. Tu roadmap está ahí.",
  "Automatiza lo repetitivo y enfoca tu energía en vender.",
  "Cada día, una venta; cada semana, una mejora.",
  "Si no se mide, se imagina. Define métricas clave.",
  "Velocidad con criterio: rápido, pero sin romper al cliente.",
  "Marca es confianza repetida: sé consistente.",
  "Pricing valiente: cobra por el valor que aportas.",
  "Tu competencia es tu maestro gratis. Obsérvala.",
  "Nadie vendrá a rescatarte. Disciplina y foco.",
  "El mejor momento para empezar fue ayer. El segundo mejor es ahora."
];

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ ok: true });
});

app.get("/api/messages", (_req: Request, res: Response) => {
  res.json(MESSAGES);
});

app.post("/api/answers", (req: Request, res: Response) => {
  const body = req.body as Partial<AnswerPayload>;
  const q1 = body.q1 ?? "";
  const q2 = body.q2 ?? "";
  const q3 = body.q3 ?? "";
  const q4 = body.q4 ?? "";

  if (!q1 || !q2 || !q3 || !q4) {
    return res.status(400).json({ error: "Faltan campos q1..q4" });
  }

  const id = makeId();
  return res.json({ id });
});

function makeId(): string {
  try {
    return randomUUID();
  } catch {
    return Math.random().toString(36).slice(2);
  }
}

const PORT = Number.parseInt(process.env.PORT ?? "4000", 10);
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});