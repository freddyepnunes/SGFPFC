import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useMediaQuery } from "@mui/material"; // Importando useMediaQuery
import "./ContasPag.css";

export default function DeletarDespesaModal() {
  const [open, setOpen] = useState(false); // Controle do modal
  const [formData, setFormData] = useState({
    idDespesa: "",
    banco: "",
    dataEmissao: "",
    planoConta: "",
    tipoDocumento: "",
    fornecedor: "",
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
          `http://localhost:5000/api/despesa/${formData.idDespesa}`
        );
        if (!response.ok) {
          throw new Error("Despesa não encontrada.");
        }
        const data = await response.json();
        setFormData({
          idDespesa: data.id_despesa,
          banco: data.tipo_banco,
          dataEmissao: data.data,
          planoConta: data.plano_conta,
          tipoDocumento: data.documento,
          fornecedor: data.fornecedor,
          valor: data.valor,
          descricao: data.descricao,
        });
      } catch (error) {
        alert(error.message);
      }
    }
  };

  // Função para deletar a despesa
  const handleDelete = async () => {
    if (!formData.idDespesa) {
      alert("Por favor, insira o ID da despesa.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/despesa/${formData.idDespesa}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Despesa excluída com sucesso!");
        setFormData({
          idDespesa: "",
          banco: "",
          dataEmissao: "",
          planoConta: "",
          tipoDocumento: "",
          fornecedor: "",
          valor: "",
          descricao: "",
        });
        handleClose();
        window.location.reload();
      } else {
        const errorText = await response.text();
        alert(`Erro ao excluir a despesa: ${errorText}`);
      }
    } catch (error) {
      console.error("Erro ao excluir a despesa:", error);
      alert("Erro ao excluir a despesa.");
    }
  };

  const handleCancel = () => {
    setFormData({
      idDespesa: "",
      banco: "",
      dataEmissao: "",
      planoConta: "",
      tipoDocumento: "",
      fornecedor: "",
      valor: "",
      descricao: "",
    });
  };

  return (
    <div>
      <div className="DelPag">
        <button
          type="button"
          className="btnDelPag"
          id="btnDelPag"
          onClick={handleOpen}
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
            sx={{ ml: 25 }}
          >
            Excluir Despesa
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="modalIdDesp">
              <div className="label">ID Despesa</div>
              <input
                type="text"
                name="idDespesa"
                value={formData.idDespesa}
                onChange={(e) =>
                  setFormData({ ...formData, idDespesa: e.target.value })
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
            <div className="modalPlancontapag">
              <div className="label">Plano de Conta</div>
              <input
                type="text"
                name="planoConta"
                value={formData.planoConta}
                id="modalPlancontapag-dropbox"
                readOnly
                className="input-text readOnly"
              />
            </div>
            <div className="modalTipodocpag">
              <div className="label">Tipo de Documento</div>
              <input
                type="text"
                name="tipoDocumento"
                value={formData.tipoDocumento}
                id="modalTipodocpag-dropbox"
                readOnly
                className="input-text readOnly"
              />
            </div>
            <div className="modalFornpag">
              <div className="label">Fornecedor</div>
              <input
                type="text"
                name="fornecedor"
                value={formData.fornecedor}
                readOnly
                className="input-text readOnly"
              />
            </div>
            <div className="modalValor">
              <div className="label">Valor (R$)</div>
              <input
                type="text"
                name="valor"
                value={formData.valor}
                readOnly
                className="input-text readOnly"
              />
            </div>
            <div className="modalDesc">
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
          <button onClick={handleClose} className="FecharModalPag">
            X
          </button>
          <button onClick={handleDelete} className="ExcluirDadosPag">
            Excluir Despesa
          </button>
          <button
            onClick={() => {
              handleCancel();
            }}
            className="CancelarDadosPag"
          >
            Cancelar Exclusão
          </button>
        </Box>
      </Modal>
    </div>
  );
}
