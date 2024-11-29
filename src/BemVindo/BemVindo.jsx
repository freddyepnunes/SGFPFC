import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BemVindo.css";
import SGFLogoMenor from "../Imagens/10-reduzido.png"; // Importa o logo do SGF
import BackgroundArrows from "../Imagens/BackgroundArrows.jpg";

const Welcome = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(true);
    setTimeout(() => navigate("/Login"), 1500); // Navega após a animação
  };

  return (
    <div
      className={`bemvindo-container ${expanded ? "expanded" : ""}`}
      onClick={handleClick}
    >
      <img
        className="BackgroundArrows"
        src={BackgroundArrows}
        alt="Welcome Background"
      />
      <div className="bemvindo-half">
        {/* Grupo para imagem e texto */}
        <div className="bemvindo-content">
          <img
            className="SGF_Logo_Menor"
            src={SGFLogoMenor}
            alt="SGF Logo Menor"
          />
          <div className="bemvindo-text">
            <h1 className="bemvindo-title">Bem-vindo ao SGF!</h1>
            <p className="bemvindo-description">
              <span className="highlight">Sistema de Gestão Financeira. </span>
              Simplifique o controle, maximize os resultados e tome decisões com
              segurança e praticidade. Cuidar do futuro do seu negócio nunca foi
              tão fácil.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
