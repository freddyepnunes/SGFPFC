import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./ContasRec.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 300,
  bgcolor: "#e2e2e2",
  border: "2px solid #000",
  p: 4,
  borderRadius: 2.5,
};

const messageStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "white",
  border: "2px solid #f44336",
  borderRadius: 4,
  boxShadow: 24,
  p: 3,
  textAlign: "center",
};

export default function DeletarReceitaModal() {
  const [open, setOpen] = useState(false); // Controla o estado do modal
  const [receitaIds, setReceitaIds] = useState(""); // IDs das receitas a serem excluídas
  const [errorMessage, setErrorMessage] = useState(""); // Mensagem de erro
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // Controla o estado do modal de erro

  const handleOpen = () => setOpen(true); // Abre o modal
  const handleClose = () => setOpen(false); // Fecha o modal
  const closeErrorModal = () => setIsErrorModalOpen(false); // Fecha o modal de erro

  const handleDelete = async () => {
    if (!receitaIds) {
      setErrorMessage(
        "Por favor, insira um ou mais IDs válidos separados por vírgula."
      );
      setIsErrorModalOpen(true);
      return;
    }

    // Converte a string de IDs em um array
    const ids = receitaIds.split(",").map((id) => id.trim());

    try {
      // Itera sobre os IDs e realiza a exclusão
      for (const id of ids) {
        if (isNaN(id)) {
          setErrorMessage(`ID inválido: ${id}`);
          setIsErrorModalOpen(true);
          continue;
        }

        const response = await fetch(
          `http://localhost:5000/api/receita/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Erro ao excluir a receita ${id}: ${errorText}`);
        } else {
          console.log(`Receita ${id} excluída com sucesso!`);
        }
      }

      setReceitaIds(""); // Limpa o campo de texto
      handleClose(); // Fecha o modal
      window.location.reload();
    } catch (error) {
      setErrorMessage(`Erro ao excluir as receitas: ${error.message}`);
      setIsErrorModalOpen(true);
    }
  };

  const handleClear = () => {
    setReceitaIds(""); // Limpa o valor dos IDs
  };

  useEffect(() => {
    if (isErrorModalOpen) {
      const timer = setTimeout(() => {
        closeErrorModal(); // Fecha o modal de erro automaticamente após 5 segundos
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isErrorModalOpen]);

  return (
    <div>
      <div className="DelRec">
        <button
          type="button"
          className="btnDelRec"
          id="btnDelRec"
          onClick={handleOpen} // Chama handleOpen ao clicar
        >
          <strong>Excluir Receita</strong>
        </button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ ml: 13 }}
          >
            Excluir Receita
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="div"
          >
            <div className="modalIdReceita">
              <div className="label">IDs de Receitas</div>
              <div>
                <input
                  type="text"
                  className="input-text"
                  value={receitaIds}
                  onChange={(e) => setReceitaIds(e.target.value)} // Atualiza o ID da receita
                  required
                />
              </div>
            </div>
          </Typography>
          <button onClick={handleClose} className="DelFecharModalRec">
            X
          </button>
          <button onClick={handleDelete} className="ExcluirDadosRec">
            Excluir Receitas
          </button>
          <button onClick={handleClear} className="DelCancelarDadosRec">
            Cancelar Exclusão
          </button>
        </Box>
      </Modal>
      <Modal
        open={isErrorModalOpen}
        onClose={closeErrorModal}
        aria-labelledby="modal-error-title"
        aria-describedby="modal-error-description"
      >
        <Box sx={messageStyle}>
          <Typography
            id="modal-error-title"
            variant="h6"
            component="h2"
            color="#f44336"
          >
            Erro
          </Typography>
          <Typography id="modal-error-description" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
