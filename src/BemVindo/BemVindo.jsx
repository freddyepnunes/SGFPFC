// src/Welcome.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./BemVindo.css"; // Importa o CSS para o estilo

const Welcome = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/Login"); // Altere '/outra-pagina' para o caminho desejado
  };

  return (
    <div className="welcome-container">
      <h1>Bem-vindo!</h1>
      <button className="redirect-button" onClick={handleRedirect}>
        Ir para outra página
      </button>
    </div>
  );
};

export default Welcome;
