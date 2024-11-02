import React from "react"; // Importa o React, essencial para criar componentes em React
import { StrictMode } from "react"; // Importa StrictMode para destacar possíveis problemas no código
import { createRoot } from "react-dom/client"; // Importa createRoot para renderizar o app na nova API do React 18
import { BrowserRouter as Router } from "react-router-dom"; // Importa BrowserRouter (renomeado como Router) para configurar rotas no app
import App from "./App.jsx"; // Importa o componente principal do aplicativo
import "./index.css"; // Importa o arquivo CSS global

// Renderiza o aplicativo dentro do elemento com id "root" no HTML
createRoot(document.getElementById("root")).render(
  // Envolve o app em StrictMode para monitorar práticas recomendadas no React
  <StrictMode>
    <Router> {/* Envolve o app em Router para ativar o uso de rotas */}
      <App /> {/* Renderiza o componente principal do app */}
    </Router>
  </StrictMode>
);
