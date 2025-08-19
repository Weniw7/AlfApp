import React from "react";

export function useToast() {
  const show = React.useCallback((message: string) => {
    // Minimal inline toast. For production, integrate a library.
    // This creates a floating div that auto-removes.
    const el = document.createElement("div");
    el.className = "fixed inset-x-0 top-4 z-50 mx-auto w-fit rounded bg-card px-4 py-2 text-card-foreground shadow";
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => {
      el.remove();
    }, 2200);
  }, []);
  return { toast: show };
}