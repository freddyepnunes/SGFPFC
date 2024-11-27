import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BemVindo.css";

const Welcome = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(true);
    setTimeout(() => navigate("/Login"), 1000); // Navega após a animação
  };

  return (
    <div
      className={`bemvindo-container ${expanded ? "expanded" : ""}`}
      onClick={handleClick}
    >
      <div className="bemvindo-half-moon">
        <div className={`bemvindo-text ${expanded ? "move-text" : ""}`}>
          <h1 className="bemvindo-title">Bem-vindo ao SGF!</h1>
          <p className="bemvindo-description">
            <span className="highlight">Sistema de Gestão Financeira.</span>
            Simplifique o controle, maximize os resultados e tome decisões com
            segurança e praticidade. Cuidar do futuro do seu negócio nunca foi
            tão fácil.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
