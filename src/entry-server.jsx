import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppContent } from "./App.jsx";

export function render(location) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={location}>
        <AppContent />
      </StaticRouter>
    </StrictMode>,
  );
}
