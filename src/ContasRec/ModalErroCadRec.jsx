import React, { useEffect } from "react";
import "./ContasRec.css";

const ErroCadastroRec = ({ message, onClose, type }) => {
  useEffect(() => {
    if (message) {
      // Fecha o modal após 7 segundos
      const timer = setTimeout(onClose, 7000);
      return () => clearTimeout(timer); // Limpa o timeout caso o modal seja desmontado antes
    }
  }, [message, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target.className === "modal-backdrop") {
      onClose(); // Fecha o modal ao clicar fora dele
    }
  };

  if (!message) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className={`modal ${type === "success" ? "success" : "error"}`}>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErroCadastroRec;
