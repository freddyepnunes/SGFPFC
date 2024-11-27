import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./ContasPag.css";

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

export default function DeletarDespesaModal() {
  const [open, setOpen] = useState(false); // Controla o estado do modal
  const [despesaIds, setDespesaIds] = useState(""); // ID da despesa a ser excluída

  const handleOpen = () => setOpen(true); // Abre o modal
  const handleClose = () => setOpen(false); // Fecha o modal

  const handleDelete = async () => {
    if (!despesaIds) {
      alert("Por favor, insira um ou mais IDs válidos separados por vírgula.");
      return;
    }

    // Converte a string de IDs em um array
    const ids = despesaIds.split(",").map((id) => id.trim());

    try {
      // Itera sobre os IDs e realiza a exclusão
      for (const id of ids) {
        if (isNaN(id)) {
          alert(`ID inválido: ${id}`);
          continue;
        }

        const response = await fetch(
          `http://localhost:5000/api/despesa/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Erro ao excluir a despesa ${id}: ${errorText}`);
        } else {
          console.log(`Despesa ${id} excluída com sucesso!`);
        }
      }

      setDespesaIds(""); // Limpa o campo de texto
      handleClose(); // Fecha o modal
      window.location.reload();
    } catch (error) {
      alert(`Erro ao excluir as despesa: ${error.message}`);
    }
  };

  const handleClear = () => {
    setDespesaIds(""); // Limpa o valor do ID
  };

  return (
    <div>
      <div className="DelPag">
        <button
          type="button"
          className="btnDelPag"
          id="btnDelPag"
          onClick={handleOpen} // Chama handleOpen ao clicar
        >
          <strong>Excluir Despesa</strong>
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
            Excluir Despesa
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="div"
          >
            <div className="modalIdDespesa">
              <div className="label">ID Despesa</div>
              <div>
                <input
                  type="text"
                  className="input-text"
                  value={despesaIds}
                  onChange={(e) => setDespesaIds(e.target.value)} // Atualiza o ID da despesa
                  required
                />
              </div>
            </div>
          </Typography>
          <button onClick={handleClose} className="DelFecharModalPag">
            X
          </button>
          <button onClick={handleDelete} className="ExcluirDadosPag">
            Excluir Despesas
          </button>
          <button onClick={handleClear} className="DelCancelarDadosPag">
            Cancelar Exclusão
          </button>
        </Box>
      </Modal>
    </div>
  );
}
