import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeProvider";
import { Questionnaire } from "./pages/Questionnaire";
import { Dashboard } from "./pages/Dashboard";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <Questionnaire /> },
  { path: "/dashboard", element: <Dashboard /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);