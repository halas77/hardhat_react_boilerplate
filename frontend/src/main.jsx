import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TokenProvider } from "./context/TokenContext.jsx";

createRoot(document.getElementById("root")).render(
  <TokenProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </TokenProvider>
);
