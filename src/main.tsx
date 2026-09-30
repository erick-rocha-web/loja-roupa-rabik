import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow-condensed/800.css";
import "@fontsource-variable/inter/index.css";
import "./styles/tokens.css";
import "./styles/global.css";
import App from "./App";
import { SelectionProvider } from "./state/SelectionProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SelectionProvider>
      <App />
    </SelectionProvider>
  </StrictMode>,
);
