import React from "react";
import { Button } from "./ui/button";
import { useTheme } from "../theme/ThemeProvider";
import { Moon, Sun } from "lucide-react";

export const Navbar: React.FC = () => {
  const { theme, toggle } = useTheme();
  return (
    <nav className="flex items-center justify-between border-b border-border px-6 py-4">
      <h1 className="text-xl font-semibold">AlfApp</h1>
      <Button variant="ghost" onClick={toggle} aria-label="Cambiar tema">
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </Button>
    </nav>
  );
};