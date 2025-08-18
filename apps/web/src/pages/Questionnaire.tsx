import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/toast";

const questions = [
  { key: "q1", label: "¿Cuál es tu objetivo principal este mes?" },
  { key: "q2", label: "¿Qué hábito te acercará más a ese objetivo?" },
  { key: "q3", label: "¿Qué obstáculo anticipas y cómo lo sortearás?" },
  { key: "q4", label: "¿Qué acción harás hoy para avanzar?" },
] as const;

type Answers = Record<(typeof questions)[number]["key"], string>;

export const Questionnaire: React.FC = () => {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Answers>({ q1: "", q2: "", q3: "", q4: "" });
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const current = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAnswers(a => ({ ...a, [current.key]: e.target.value }));
  }

  async function submit() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      if (!res.ok) throw new Error("No se pudo guardar");
      const data = await res.json();
      toast(`Guardado con id: ${data.id}`);
      navigate("/dashboard");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col p-6">
      <div className="mb-10 mt-8">
        <div className="mb-2 text-sm text-muted-foreground">Progreso</div>
        <div className="h-2 w-full rounded bg-muted">
          <div className="h-2 rounded bg-primary" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <h1 className="text-2xl font-semibold">{current.label}</h1>
            <Input
              autoFocus
              placeholder="Escribe tu respuesta..."
              value={answers[current.key]}
              onChange={onChange}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Button variant="ghost" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0 || saving}>
          Atrás
        </Button>
        {step < questions.length - 1 ? (
          <Button
            onClick={() => setStep(s => (answers[current.key].trim() ? s + 1 : s))}
            disabled={!answers[current.key].trim() || saving}
          >
            Siguiente
          </Button>
        ) : (
          <Button onClick={submit} disabled={!answers[current.key].trim() || saving}>
            Guardar y continuar
          </Button>
        )}
      </div>
    </div>
  );
};