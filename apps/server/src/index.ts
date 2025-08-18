import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const messages: string[] = [
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

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/messages", (_req, res) => {
  res.json(shuffle(messages));
});

app.post("/api/answers", async (req, res) => {
  const { q1, q2, q3, q4 } = req.body ?? {};
  if (
    typeof q1 !== "string" ||
    typeof q2 !== "string" ||
    typeof q3 !== "string" ||
    typeof q4 !== "string" ||
    !q1.trim() || !q2.trim() || !q3.trim() || !q4.trim()
  ) {
    return res.status(400).json({ error: "Campos inválidos" });
  }

  try {
    const created = await prisma.userAnswer.create({
      data: { q1, q2, q3, q4 },
      select: { id: true },
    });
    res.status(201).json(created);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ error: "Error al guardar" });
  }
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${PORT}`);
});