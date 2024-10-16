import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "typeface-poppins"
import App from "./App";
import { SupabaseProvider } from "./SupabaseContext";
import { BingoProvider } from "./BingoContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SupabaseProvider>
        <BingoProvider>
          <App />
        </BingoProvider>
      </SupabaseProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
