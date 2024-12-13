import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useMediaQuery } from "@mui/material"; // Importando useMediaQuery
import "./ContasPag.css";

export default function AlterarDespesaModal() {
  const [open, setOpen] = useState(false); // Controla o estado do modal
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Atualiza os campos do formulário ao alterar os valores
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  // Função para alterar a despesa
  const handleUpdate = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/despesa", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        window.location.reload();
        handleClose();
      } else {
        const errorText = await response.text();
        alert(`Erro ao alterar a despesa: ${errorText}`);
      }
    } catch (error) {
      alert(`Erro ao alterar a despesa: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="AltPag">
        <button
          type="button"
          className="btnAltPag"
          id="btnAltPag"
          onClick={handleOpen}
        >
          <strong>Alterar Despesa</strong>
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
            Alterar Despesa
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="modalIdDesp">
              <div className="label">ID Despesa</div>
              <input
                type="text"
                name="idDespesa"
                value={formData.idDespesa}
                onChange={handleChange}
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
                onChange={handleChange}
                className="input-text"
                required
              />
            </div>
            <div className="modalDataEmissao">
              <div className="label">Data Emissão</div>
              <input
                type="date"
                name="dataEmissao"
                value={formData.dataEmissao}
                onChange={handleChange}
                className="input-text"
                required
              />
            </div>
            <div className="modalPlancontapag">
              <div className="label">Plano de Conta</div>
              <select
                name="planoConta"
                value={formData.planoConta}
                onChange={handleChange}
                className="input-text"
                id="modalPlancontapag-dropbox"
              >
                <option value="Despesas com Ocupação">
                  Despesas com Ocupação
                </option>
                <option value="Despesas com Serviços">
                  Despesas com Serviços
                </option>
                <option value="Despesas com Pessoal">
                  Despesas com Pessoal
                </option>
                <option value="Outras Despesas">Outras Despesas</option>
                <option value="Impostos">Impostos</option>
                <option value="Custos Variáveis">Custos Variáveis</option>
              </select>
            </div>
            <div className="modalTipodocpag">
              <div className="label">Tipo de Documento</div>
              <select
                name="tipoDocumento"
                value={formData.tipoDocumento}
                onChange={handleChange}
                className="input-text"
                id="modalTipodocpag-dropbox"
              >
                <option value="Pix">Pix</option>
                <option value="Crédito">Crédito</option>
                <option value="Débito">Débito</option>
                <option value="NF">NF</option>
                <option value="Transferência">Transferência</option>
                <option value="Fatura">Fatura</option>
              </select>
            </div>
            <div className="modalFornpag">
              <div className="label">Fornecedor</div>
              <input
                type="text"
                name="fornecedor"
                value={formData.fornecedor}
                onChange={handleChange}
                className="input-text"
                required
              />
            </div>
            <div className="modalValor">
              <div className="label">Valor (R$)</div>
              <input
                type="number"
                name="valor"
                value={formData.valor}
                onChange={handleChange}
                className="input-text"
                required
              />
            </div>
            <div className="modalDesc">
              <div className="label">Descrição</div>
              <input
                type="text"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                className="input-text"
                required
              />
            </div>
          </Typography>
          <button onClick={handleClose} className="FecharModalPag">
            X
          </button>
          <button onClick={handleUpdate} className="AlterarDadosPag">
            Alterar Despesa
          </button>
          <button
            onClick={() => {
              handleCancel();
            }}
            className="CancelarDadosPag"
          >
            Cancelar Alteração
          </button>
        </Box>
      </Modal>
    </div>
  );
}
