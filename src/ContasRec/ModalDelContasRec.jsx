import React, { useState } from "react";
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

export default function DeletarReceitaModal() {
  const [open, setOpen] = useState(false); // Controla o estado do modal
  const [receitaId, setReceitaId] = useState(""); // ID da despesa a ser excluída

  const handleOpen = () => setOpen(true); // Abre o modal
  const handleClose = () => setOpen(false); // Fecha o modal

  const handleDelete = async () => {
    if (!receitaId || isNaN(receitaId)) {
      alert("Por favor, insira um ID válido.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/receita/${receitaId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Receita excluída com sucesso!");
        setReceitaId(""); // Limpa o campo de texto
        handleClose(); // Fecha o modal
        window.location.reload();
      } else {
        const errorText = await response.text();
        alert(`Erro ao excluir a receita: ${errorText}`);
      }
    } catch (error) {
      alert(`Erro ao excluir a receita: ${error.message}`);
    }
  };

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
              <div className="label">ID Receita</div>
              <div>
                <input
                  type="text"
                  className="input-text"
                  value={receitaId}
                  onChange={(e) => setReceitaId(e.target.value)} // Atualiza o ID da receita
                  required
                />
              </div>
            </div>
          </Typography>
          <button onClick={handleClose} className="DelFecharModalRec">
            X
          </button>
          <button onClick={handleDelete} className="ExcluirDadosRec">
            Excluir Receita
          </button>
          <button onClick={handleClose} className="DelCancelarDadosRec">
            Cancelar Exclusão
          </button>
        </Box>
      </Modal>
    </div>
  );
}
