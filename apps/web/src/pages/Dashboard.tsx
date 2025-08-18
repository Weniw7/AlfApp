import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { useTheme } from "../theme/ThemeProvider";
import { Moon, Sun } from "lucide-react";

export const Dashboard: React.FC = () => {
  const { theme, toggle } = useTheme();
  const [messages, setMessages] = React.useState<string[]>([]);

  React.useEffect(() => {
    fetch("/api/messages")
      .then(r => r.json())
      .then(setMessages)
      .catch(() => setMessages([]));
  }, []);

  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between border-b border-border px-6 py-4">
        <h1 className="text-xl font-semibold">AlfApp</h1>
        <Button variant="ghost" onClick={toggle} aria-label="Cambiar tema">
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
      </nav>
      <main className="mx-auto grid max-w-5xl grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {messages.map((m, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="text-sm text-muted-foreground">Motivación</div>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed">{m}</p>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
};