import "@fontsource-variable/recursive/casl.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/home.css";
import "./styles/pages.css";
import "./styles/motion.css";
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Synchronous route updates let View Transitions capture the new page (see useTransitionClick). */}
    <BrowserRouter useTransitions={false}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
