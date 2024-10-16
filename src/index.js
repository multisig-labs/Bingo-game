import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "typeface-poppins"
import App from "./App";
import { SupabaseProvider } from "./SupabaseContext";
import { BingoProvider } from "./BingoContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SupabaseProvider>
      <BingoProvider>
        <App />
      </BingoProvider>
    </SupabaseProvider>
  </React.StrictMode>
);
