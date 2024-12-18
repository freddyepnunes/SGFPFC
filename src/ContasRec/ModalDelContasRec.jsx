import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useMediaQuery } from "@mui/material"; // Importando useMediaQuery
import "./ContasRec.css";

export default function DeletarReceitaModal() {
  const [open, setOpen] = useState(false); // Controle do modal
  const [formData, setFormData] = useState({
    idReceita: "",
    banco: "",
    dataEmissao: "",
    planoConta: "",
    tipoDocumento: "",
    cliente: "",
    valor: "",
    descricao: "",
  });

  const isSmallScreen = useMediaQuery("(max-width: 1366px)");

  const style = {
    position: "absolute",
    top: isSmallScreen ? "35%" : "50%",
    left: isSmallScreen ? "35%" : "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 500,
    bgcolor: "#e2e2e2",
    border: "2px solid #000",
    p: 4,
    borderRadius: 2.5,
  };

  // Abre e fecha o modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Função para buscar os dados pelo ID ao pressionar Enter
  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      try {
        const response = await fetch(
          `http://localhost:5000/api/receita/${formData.idReceita}`
        );
        if (!response.ok) {
          throw new Error("Receita não encontrada.");
        }
        const data = await response.json();
        setFormData({
          idReceita: data.id_receita,
          banco: data.tipo_banco,
          dataEmissao: data.data,
          planoConta: data.plano_conta_receita,
          tipoDocumento: data.documento,
          cliente: data.cliente,
          valor: data.valor,
          descricao: data.descricao,
        });
      } catch (error) {
        alert(error.message);
      }
    }
  };

  // Função para deletar a receita
  const handleDelete = async () => {
    if (!formData.idReceita) {
      alert("Por favor, insira o ID da receita.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/receita/${formData.idReceita}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Receita excluída com sucesso!");
        setFormData({
          idReceita: "",
          banco: "",
          dataEmissao: "",
          planoConta: "",
          tipoDocumento: "",
          cliente: "",
          valor: "",
          descricao: "",
        });
        handleClose();
        window.location.reload();
      } else {
        const errorText = await response.text();
        alert(`Erro ao excluir a receita: ${errorText}`);
      }
    } catch (error) {
      console.error("Erro ao excluir a receita:", error);
      alert("Erro ao excluir a receita.");
    }
  };

  const handleCancel = () => {
    setFormData({
      idReceita: "",
      banco: "",
      dataEmissao: "",
      planoConta: "",
      tipoDocumento: "",
      cliente: "",
      valor: "",
      descricao: "",
    });
  };

  return (
    <div>
      <div className="DelRec">
        <button
          type="button"
          className="btnDelRec"
          id="btnDelRec"
          onClick={handleOpen}
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
            sx={{ ml: 25 }}
          >
            Excluir Receita
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="modalIdRec">
              <div className="label">ID Receita</div>
              <input
                type="text"
                name="idReceita"
                value={formData.idReceita}
                onChange={(e) =>
                  setFormData({ ...formData, idReceita: e.target.value })
                }
                onKeyDown={handleSearch}
                className="input-text"
                required
              />
            </div>
            <div className="modalBanco">
              <div className="label">Banco</div>
              <input
                type="text"
                name="banco"
                value={formData.banco}
                readOnly
                className="input-text readOnly"
              />
            </div>
            <div className="modalDataEmissaO">
              <div className="label">Data Emissão</div>
              <input
                type="date"
                name="dataEmissao"
                value={formData.dataEmissao}
                readOnly
                className="input-text readOnly"
              />
            </div>
            <div className="modalPlanoConta">
              <div className="label">Plano de Conta</div>
              <input
                type="text"
                name="planoConta"
                value={formData.planoConta}
                readOnly
                className="input-text readOnly"
              />
            </div>
            <div className="modalTipoDocRec">
              <div className="label">Tipo de Documento</div>
              <input
                type="text"
                name="tipoDocumento"
                value={formData.tipoDocumento}
                readOnly
                className="input-text readOnly"
              />
            </div>
            <div className="modalCliente">
              <div className="label">Cliente</div>
              <input
                type="text"
                name="cliente"
                value={formData.cliente}
                readOnly
                className="input-text readOnly"
              />
            </div>
            <div className="modalValoR">
              <div className="label">Valor (R$)</div>
              <input
                type="text"
                name="valor"
                value={formData.valor}
                readOnly
                className="input-text readOnly"
              />
            </div>
            <div className="modalDescricao">
              <div className="label">Descrição</div>
              <input
                type="text"
                name="descricao"
                value={formData.descricao}
                readOnly
                className="input-text readOnly"
              />
            </div>
          </Typography>
          <button onClick={handleClose} className="FecharModalRec">
            X
          </button>
          <button onClick={handleDelete} className="ExcluirDadosRec">
            Excluir Receita
          </button>
          <button
            onClick={() => {
              handleCancel();
            }}
            className="CancelarDadosRec"
          >
            Cancelar Exclusão
          </button>
        </Box>
      </Modal>
    </div>
  );
}
