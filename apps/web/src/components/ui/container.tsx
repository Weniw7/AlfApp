import * as React from "react";
import { cn } from "../utils";

export const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className, children }) => (
  <div className={cn("mx-auto w-full max-w-5xl px-6", className)}>{children}</div>
);